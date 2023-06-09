import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
