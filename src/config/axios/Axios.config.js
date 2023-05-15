import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'https://2d2e-2001-448a-3052-3c42-ac89-faab-de04-b2a6.ap.ngrok.io/api',
});

export default axios;
