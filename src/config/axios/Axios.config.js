import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://6da6-103-213-128-1.ap.ngrok.io/api',
});

export default axios;
