import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'https://5ebe-2001-448a-3052-3c42-940f-4269-eb04-e46e.ap.ngrok.io/api',
});

export default axios;
