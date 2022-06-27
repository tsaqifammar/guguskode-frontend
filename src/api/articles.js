import axios from './axios';
import qs from 'qs';
import { formatDate } from '../utilities/formatData';

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
      profile_picture: data.attributes.author.data.attributes.profile_picture.data.attributes.url
    },
    thumbnail: data.attributes.thumbnail.data.attributes.url,
    createdAt: formatDate(data.attributes.createdAt)
  };
}

export { getTopics, getArticleById };
