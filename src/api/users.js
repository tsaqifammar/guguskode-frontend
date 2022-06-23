import axios from './axios';

async function login(identifier, password) {
  const response = await axios.post('/auth/local', {
    identifier,
    password,
  });
  const data = response.data;
  return { token: data.jwt, ...data.user };
}

async function getProfile(id, token) {
  const response = await axios.get(`/users/${id}?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.data;
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    name: data.name,
    role: data.role.name,
    thumbnailAvatar: data.profile_picture?.formats.thumbnail.url,
    smallAvatar: data.profile_picture?.formats.small.url,
    avatar: data.profile_picture?.url,
  };
}

export { login, getProfile };
