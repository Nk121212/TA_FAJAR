import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'https://3f44-2001-448a-3052-3c42-60c6-4d3b-3c7-643e.ap.ngrok.io/api',
});

export default axios;
