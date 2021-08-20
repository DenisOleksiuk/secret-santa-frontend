import axios from 'axios';

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default apiInstance;
