import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://guguskode-backend.herokuapp.com/api'
});

export default instance;
