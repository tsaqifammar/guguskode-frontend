import axios from './axios';
import qs from 'qs';
import { DEFAULT_PROFILE_PICTURE } from '../utilities/defaults';

function formatComments(comments) {
  // adapted to https://riyanegi.github.io/react-comments-documentation/#Welcome
  return comments.map((c) => ({
    userId: c.attributes.author.data.id,
    comId: `c-${c.id}`,
    fullName: c.attributes.author.data.attributes.name,
    text: c.attributes.content,
    avatarUrl:
      c.attributes.author.data.attributes.profile_picture.data?.attributes
        .url || DEFAULT_PROFILE_PICTURE,
    replies: c.attributes.subcomments.data.map((sc) => ({
      userId: sc.attributes.author.data.id,
      comId: `sc-${sc.id}`,
      fullName: sc.attributes.author.data.attributes.name,
      text: sc.attributes.content,
      avatarUrl:
        sc.attributes.author.data.attributes.profile_picture.data?.attributes
          .url || DEFAULT_PROFILE_PICTURE,
    })),
  }));
}

async function getCommentsByArticleId(article_id) {
  const query = qs.stringify(
    {
      filters: {
        article: { id: { $eq: article_id } },
      },
      populate: {
        subcomments: {
          populate: {
            author: {
              fields: ['name'],
              populate: { profile_picture: { fields: ['url'] } },
            },
          },
        },
        author: {
          fields: ['name'],
          populate: { profile_picture: { fields: ['url'] } },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await axios.get(`/comments?${query}`);
  const data = response.data;

  return formatComments(data.data);
}

async function postComment(token, article_id, comment) {
  const { userId, text } = comment;
  await axios.post(
    '/comments',
    {
      data: {
        content: text,
        article: article_id,
        author: userId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

async function postSubcomment(token, subcomment) {
  const { userId, parentOfRepliedCommentId, repliedToCommentId, text } =
    subcomment;
  const comment_id = parentOfRepliedCommentId || repliedToCommentId;

  await axios.post(
    '/subcomments',
    {
      data: {
        content: text,
        parent_comment: comment_id.split('-')[1],
        author: userId,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

async function editComment(token, commentData) {
  const { comId, text } = commentData;
  const data = {
    data: {
      content: text,
    },
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (comId.startsWith('sc')) {
    // subcomment
    await axios.put(`/subcomments/${comId.split('-')[1]}`, data, config);
  } else {
    // comment
    await axios.put(`/comments/${comId.split('-')[1]}`, data, config);
  }
}

async function deleteComment(token, commentData) {
  const { comIdToDelete } = commentData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (comIdToDelete.startsWith('sc')) {
    // subcomment
    await axios.delete(`/subcomments/${comIdToDelete.split('-')[1]}`, config);
  } else {
    // comment
    await axios.delete(`/comments/${comIdToDelete.split('-')[1]}`, config);
  }
}

export {
  getCommentsByArticleId,
  postComment,
  postSubcomment,
  editComment,
  deleteComment,
};
