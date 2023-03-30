import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
