import axios from 'axios';
import { config } from '../config';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('chatUser') || 'null');
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('chatUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const chatApi = {
  async sendMessage(question: string, history: { content: string; role: 'user' | 'assistant' }[]) {
    try {
      const response = await api.post('/consultar', {
        question,
        history,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al enviar mensaje');
    }
  },

  async getUserMetrics() {
    try {
      const response = await api.get('/api/user/metrics');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Error al obtener métricas');
    }
  }
};