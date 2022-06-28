import axios from './axios';
import qs from 'qs';
import { formatDate } from '../utilities/formatData';
import { DEFAULT_PROFILE_PICTURE } from '../utilities/defaults';

async function getTopics() {
  const response = await axios.get('/topics');
  const data = response.data.data;
  return data.map((c) => ({
    id: c.id,
    name: c.attributes.name,
    code: c.attributes.code
  }));
}

async function getArticleById(id) {
  const query = qs.stringify({
    populate: {
      category: {
        fields: ['name'],
        populate: ['topic']
      },
      author: {
        fields: ['name'],
        populate: ['profile_picture']
      },
      thumbnail: { fields: ['url'] }
    }
  }, {
    encodeValuesOnly: true,
  });

  const response = await axios.get(`/articles/${id}?${query}`);
  const data = response.data.data;

  return {
    id: data.id,
    title: data.attributes.title,
    content: data.attributes.content,
    topic: data.attributes.category.data.attributes.topic.data.attributes.name,
    category: data.attributes.category.data.attributes.name,
    author: {
      name: data.attributes.author.data.attributes.name,
      profile_picture: data.attributes.author.data.attributes.profile_picture?.data.attributes.url || DEFAULT_PROFILE_PICTURE
    },
    thumbnail: data.attributes.thumbnail?.data?.attributes?.url,
    createdAt: formatDate(data.attributes.createdAt)
  };
}

async function findCategoryId(category, topic) {
  // find category id
  const query = qs.stringify({
    filters: {
      name: {
        $eq: category
      },
      topic: {
        name: {
          $eq: topic
        }
      }
    }
  }, {
    encodeValuesOnly: true,
  });

  const response = await axios.get(`/categories?${query}`);
  return response.data.data[0].id;
}

async function saveArticle(token, article) {
  const categoryId = await findCategoryId(article.category, article.topic);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.put(`/articles/${article.id}`, {
    data: {
      title: article.title,
      content: article.content,
      category: categoryId,
    },
  }, config);

  if (typeof article.thumbnail !== 'string') {
    // article.thumbnail got updated and now is a file

    // remove previous thumbnail first (why strapi???????????????????)
    await axios.put(`/articles/${article.id}`, {
      data: {
        thumbnail: null
      },
    }, config);

    const fd = new FormData();
    fd.append('files', article.thumbnail);
    fd.append('ref', 'api::article.article');
    fd.append('refId', article.id);
    fd.append('field', 'thumbnail');

    await axios.post('/upload', fd, config);
  }
}

async function updateArticleStatus(token, article_id, status) {
  await axios.put(`/articles/${article_id}`, {
    data: {
      status
    },
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export {
  getTopics,
  getArticleById,
  saveArticle,
  updateArticleStatus
};
