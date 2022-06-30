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
    avatar: data.profile_picture?.url,
  };
}

async function updateProfile(token, user_id, updatedData, newProfilePic) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.put(`/users/${user_id}`, updatedData, config);

  if (newProfilePic) {
    // remove previous profile pic first...
    await axios.put(`/users/${user_id}`, { profile_picture: null }, config);

    const fd = new FormData();
    fd.append('files', newProfilePic);
    fd.append('ref', 'plugin::users-permissions.user');
    fd.append('refId', user_id);
    fd.append('field', 'profile_picture');

    await axios.post('/upload', fd, config);
  }
}

export { login, getProfile, updateProfile };
