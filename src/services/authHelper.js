import axios from 'axios';

const apiInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV_URL
      : process.env.REACT_APP_PROD_URL,
});

export default apiInstance;
