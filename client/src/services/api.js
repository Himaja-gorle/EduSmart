import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const checkHealth = async () => {
  const response = await API.get('/health');
  return response.data;
};

export const loginUserApi = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

export const registerUserApi = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const fetchMeApi = async () => {
  const response = await API.get('/auth/me');
  return response.data;
};

export default API;

