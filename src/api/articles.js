import axios from './axios';
import qs from 'qs';
import { formatDate } from '../utilities/formatData';

async function getArticleById(id) {
  const query = qs.stringify({
    populate: {
      category: { fields: ['name'] },
      author: {
        fields: ['name'],
        populate: ['profile_picture']
      },
      thumbnail: { fields: ['formats'] }
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
    category: data.attributes.category.data.attributes.name,
    author: {
      name: data.attributes.author.data.attributes.name,
      profile_picture: data.attributes.author.data.attributes.profile_picture.data.attributes.formats.thumbnail.url
    },
    thumbnail: data.attributes.thumbnail.data.attributes.formats.medium.url,
    createdAt: formatDate(data.attributes.createdAt)
  };
}

export { getArticleById };
