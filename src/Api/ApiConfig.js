import Axios from 'axios';

const config = Axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  referrerPolicy: 'no-referrer-when-downgrade',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

config.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('user'));
  if (token?.jwt) {
    config.headers['Authorization'] = `Bearer ${token?.jwt}`; // Dodawanie tokena do nagłówka
  }
  return config;
});

export default config;
