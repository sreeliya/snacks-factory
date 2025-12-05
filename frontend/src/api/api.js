// ===================================
// API SERVICE - AXIOS CONFIGURATION
// ===================================
// Centralized API calls for all backend endpoints

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== MATERIAL APIS =====
export const MaterialAPI = {
  getAll: () => api.get('/materials'),
  getById: (id) => api.get(`/materials/${id}`),
  create: (data) => api.post('/materials', data),
  update: (id, data) => api.put(`/materials/${id}`, data),
  delete: (id) => api.delete(`/materials/${id}`),
  reduceQuantity: (data) => api.post('/materials/reduce-quantity', data),
};

// ===== PRODUCTION APIS =====
export const ProductionAPI = {
  getAll: () => api.get('/production'),
  getById: (id) => api.get(`/production/${id}`),
  create: (data) => api.post('/production', data),
  update: (id, data) => api.put(`/production/${id}`, data),
  delete: (id) => api.delete(`/production/${id}`),
};

// ===== INVENTORY APIS =====
export const InventoryAPI = {
  getAll: () => api.get('/inventory'),
  getById: (id) => api.get(`/inventory/${id}`),
  create: (data) => api.post('/inventory', data),
  update: (id, data) => api.put(`/inventory/${id}`, data),
  delete: (id) => api.delete(`/inventory/${id}`),
  updateStock: (data) => api.post('/inventory/update-stock', data),
  reduceStock: (data) => api.post('/inventory/reduce-stock', data),
};

// ===== ORDER APIS =====
export const OrderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  updateStatus: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`),
  getByStatus: (status) => api.get(`/orders/status/${status}`),
};

// ===== FEEDBACK APIS =====
export const FeedbackAPI = {
  create: (data) => api.post('/feedback', data),
  getAll: () => api.get('/feedback'),
  getById: (id) => api.get(`/feedback/${id}`),
  getUserFeedback: () => api.get('/feedback/user/my-feedback'),
  updateStatus: (id, status) => api.put(`/feedback/${id}/status`, { status }),
  delete: (id) => api.delete(`/feedback/${id}`),
  getStats: () => api.get('/feedback/stats/overview'),
};

export default api;
