import Axios from 'axios';

const axios = Axios.create({
  baseURL:
    'https://aa44-2001-448a-3052-3c42-110d-26c5-22bd-87dc.ap.ngrok.io/api',
});

export default axios;
