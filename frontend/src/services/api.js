import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const transacaoService = {
  create: (data) => api.post('/transacoes', data).then((r) => r.data),
  getAll: () => api.get('/transacoes').then((r) => r.data),
  getById: (id) => api.get(`/transacoes/${id}`).then((r) => r.data),
  update: (id, data) => api.put(`/transacoes/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/transacoes/${id}`).then((r) => r.data),
  resumoCategorias: () => api.get('/resumo/categorias').then((r) => r.data),
};

