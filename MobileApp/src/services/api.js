import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, STORAGE_KEYS } from '../config/constants';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, clear storage and redirect to login
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    }
    return Promise.reject(error);
  }
);

// API Methods

// Authentication
export const verifyToken = async (token) => {
  return api.post('/auth/verify', { token });
};

// Reports
export const generateReport = async (reportData) => {
  return api.post('/reports/generate', reportData);
};

export const getReports = async () => {
  return api.get('/reports');
};

export const getReport = async (reportId) => {
  return api.get(`/reports/${reportId}`);
};

export const deleteReport = async (reportId) => {
  return api.delete(`/reports/${reportId}`);
};

export const exportReport = async (reportId, format) => {
  return api.post(`/reports/${reportId}/export`, { format });
};

export const uploadReportImages = async (reportId, images) => {
  const formData = new FormData();

  images.forEach((image, index) => {
    formData.append('images', {
      uri: image.uri,
      type: image.type || 'image/jpeg',
      name: image.fileName || `photo_${index}.jpg`,
    });
  });

  return api.post(`/reports/${reportId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// User
export const getUserProfile = async () => {
  return api.get('/users/profile');
};

export const updateUserProfile = async (data) => {
  return api.put('/users/profile', data);
};

export const getUserUsage = async () => {
  return api.get('/users/usage');
};

export const getTiers = async () => {
  return api.get('/users/tiers');
};

// Payments
export const createCheckoutSession = async (tier, userId) => {
  return api.post('/payment/create-checkout-session', { tier, userId });
};

export const getSubscriptions = async () => {
  return api.get('/payment/subscriptions');
};

export const getBillingHistory = async () => {
  return api.get('/payment/billing-history');
};

// CRM
export const getClients = async () => {
  return api.get('/crm/clients');
};

export const getClient = async (clientId) => {
  return api.get(`/crm/clients/${clientId}`);
};

export const createClient = async (clientData) => {
  return api.post('/crm/clients', clientData);
};

export const updateClient = async (clientId, clientData) => {
  return api.put(`/crm/clients/${clientId}`, clientData);
};

export const deleteClient = async (clientId) => {
  return api.delete(`/crm/clients/${clientId}`);
};

export const getClaims = async () => {
  return api.get('/crm/claims');
};

export const createClaim = async (claimData) => {
  return api.post('/crm/claims', claimData);
};

export const updateClaimStatus = async (claimId, status) => {
  return api.put(`/crm/claims/${claimId}/status`, { status });
};

export const getCRMAnalytics = async () => {
  return api.get('/crm/analytics/dashboard');
};

export default api;
