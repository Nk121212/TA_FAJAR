import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'https://68aa-2001-448a-3052-3c42-70c7-1b8d-1d7e-75e8.ap.ngrok.io/api',
});

export default axios;
