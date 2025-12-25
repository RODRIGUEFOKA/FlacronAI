import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_URL = 'https://flacronai.onrender.com/api';

// Helper function to get auth token
const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Helper function to make authenticated API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Auth Services
export const authService = {
  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.success && data.token) {
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userEmail', data.user.email);
      await AsyncStorage.setItem('userName', data.user.displayName || '');
      await AsyncStorage.setItem('userId', data.user.userId);
    }

    return data;
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['userToken', 'userEmail', 'userName', 'userId']);
  },

  getUserData: async () => {
    const [email, name, userId] = await Promise.all([
      AsyncStorage.getItem('userEmail'),
      AsyncStorage.getItem('userName'),
      AsyncStorage.getItem('userId'),
    ]);
    return { email, name, userId };
  },
};

// Report Services
export const reportService = {
  generateReport: async (reportData, photos = []) => {
    const formData = new FormData();

    // Add report data
    Object.keys(reportData).forEach(key => {
      formData.append(key, reportData[key]);
    });

    // Add photos
    if (photos && photos.length > 0) {
      photos.forEach((photo, index) => {
        const uriParts = photo.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('photos', {
          uri: photo.uri,
          name: `photo_${index}.${fileType}`,
          type: `image/${fileType}`,
        });
      });
    }

    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/reports/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate report');
    }

    return data;
  },

  getMyReports: async () => {
    return await apiCall('/reports', {
      method: 'GET',
    });
  },

  getReportById: async (reportId) => {
    return await apiCall(`/reports/${reportId}`, {
      method: 'GET',
    });
  },

  downloadReport: async (reportId, format = 'pdf') => {
    const token = await getAuthToken();
    const response = await fetch(`${API_URL}/reports/${reportId}/download?format=${format}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to download report');
    }

    return response.blob();
  },
};

// User Services
export const userService = {
  getStats: async () => {
    return await apiCall('/user/stats', {
      method: 'GET',
    });
  },

  getProfile: async () => {
    return await apiCall('/user/profile', {
      method: 'GET',
    });
  },
};

export default {
  authService,
  reportService,
  userService,
};
