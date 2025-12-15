import axios from 'axios';
// const { VITE_BASE_API_URL } = import.meta.env;

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;
