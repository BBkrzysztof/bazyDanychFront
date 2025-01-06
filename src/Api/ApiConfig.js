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

export default config;
