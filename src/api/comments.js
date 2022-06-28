import axios from './axios';
import qs from 'qs';

function formatComments(comments) {
  return comments.map(c => ({
    id: c.id,
    content: c.attributes.content,
    author: {
      id: c.attributes.author.data.id,
      name: c.attributes.author.data.attributes.name,
      profile_picture: c.attributes.author.data.attributes.profile_picture.data?.attributes.url
    },
    subcomments: c.attributes.subcomments.data.map(sc => ({
      id: sc.id,
      content: sc.attributes.content,
      author: {
        id: sc.attributes.author.data.id,
        name: sc.attributes.author.data.attributes.name,
        profile_picture: sc.attributes.author.data.attributes.profile_picture.data?.attributes.url
      }
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

export { getCommentsByArticleId };
