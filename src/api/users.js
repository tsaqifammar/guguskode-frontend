import axios from './axios';

async function login(identifier, password) {
  const response = await axios.post('/auth/local', {
    identifier,
    password
  });
  return response.data;
}

export { login };
