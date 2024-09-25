import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',  // Corrigido para a base URL correta
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT, se necessário
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
