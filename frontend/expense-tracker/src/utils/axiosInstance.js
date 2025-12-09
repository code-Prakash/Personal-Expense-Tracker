import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach token to all requests
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Only redirect on 401 (Unauthorized)
      if (status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }

      // Log server errors instead of redirecting
      if (status === 500) {
        console.error('Server error. Please check backend.');
      }
    } else if (error.code === 'ECONNABORTED') {
      console.log('Request timeout. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
