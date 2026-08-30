import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

export const shouldUseMockData = () => {
  return process.env.REACT_APP_USE_MOCK_DATA === 'true' || !API_BASE_URL;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL || undefined,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    const payload = error.response?.data ?? error.message ?? 'Request failed';
    throw payload;
  }
);

export default axiosInstance;
