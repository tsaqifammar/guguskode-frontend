import axios from './axios';

async function login(identifier, password) {
  const response = await axios.post('/auth/local', {
    identifier,
    password,
  });
  const data = response.data;
  return { token: data.jwt, ...data.user };
}

async function getProfile(token) {
  const response = await axios.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export { login, getProfile };
