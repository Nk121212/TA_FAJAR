import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'https://8ec7-2001-448a-3052-3c42-e5b8-850f-2046-7c35.ap.ngrok.io/api',
});

export default axios;
