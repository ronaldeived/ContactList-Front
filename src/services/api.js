import axios from 'axios';

const urlConnection = process.env.NODE_ENV !== 'production' ? "http://localhost:5030" : process.env.REACT_APP_URL_API;

const api = axios.create({
  baseURL: urlConnection
});

export default api;