import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://admin.gunungku.com/api',
});

export default axios;
