import axios from 'axios';
import { getToken, removeTokens } from '../utils/auth';

const axiosClient = axios.create({
  baseURL: 'http://192.168.1.10:4000/api',

  timeout: 15000,
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.response?.status === 401) {
      await removeTokens();
      // Navigation handled in components
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;