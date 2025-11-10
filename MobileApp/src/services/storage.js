import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

// Generic storage methods
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return { success: true };
  } catch (error) {
    console.error('Error storing data:', error);
    return { success: false, error: error.message };
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return { success: true };
  } catch (error) {
    console.error('Error removing data:', error);
    return { success: false, error: error.message };
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return { success: true };
  } catch (error) {
    console.error('Error clearing storage:', error);
    return { success: false, error: error.message };
  }
};

// User-specific methods
export const saveUserToken = async (token) => {
  return storeData(STORAGE_KEYS.USER_TOKEN, token);
};

export const getUserToken = async () => {
  return getData(STORAGE_KEYS.USER_TOKEN);
};

export const removeUserToken = async () => {
  return removeData(STORAGE_KEYS.USER_TOKEN);
};

export const saveUserData = async (userData) => {
  return storeData(STORAGE_KEYS.USER_DATA, userData);
};

export const getUserData = async () => {
  return getData(STORAGE_KEYS.USER_DATA);
};

// Draft reports (offline support)
export const saveDraftReport = async (reportData) => {
  const drafts = await getData(STORAGE_KEYS.DRAFT_REPORTS) || [];
  const newDraft = {
    id: Date.now().toString(),
    ...reportData,
    createdAt: new Date().toISOString(),
  };
  drafts.push(newDraft);
  return storeData(STORAGE_KEYS.DRAFT_REPORTS, drafts);
};

export const getDraftReports = async () => {
  return getData(STORAGE_KEYS.DRAFT_REPORTS) || [];
};

export const deleteDraftReport = async (draftId) => {
  const drafts = await getData(STORAGE_KEYS.DRAFT_REPORTS) || [];
  const updated = drafts.filter(draft => draft.id !== draftId);
  return storeData(STORAGE_KEYS.DRAFT_REPORTS, updated);
};

export const clearDraftReports = async () => {
  return storeData(STORAGE_KEYS.DRAFT_REPORTS, []);
};

// Offline queue
export const addToOfflineQueue = async (action) => {
  const queue = await getData(STORAGE_KEYS.OFFLINE_QUEUE) || [];
  queue.push({
    id: Date.now().toString(),
    ...action,
    timestamp: new Date().toISOString(),
  });
  return storeData(STORAGE_KEYS.OFFLINE_QUEUE, queue);
};

export const getOfflineQueue = async () => {
  return getData(STORAGE_KEYS.OFFLINE_QUEUE) || [];
};

export const clearOfflineQueue = async () => {
  return storeData(STORAGE_KEYS.OFFLINE_QUEUE, []);
};

export const removeFromOfflineQueue = async (actionId) => {
  const queue = await getData(STORAGE_KEYS.OFFLINE_QUEUE) || [];
  const updated = queue.filter(item => item.id !== actionId);
  return storeData(STORAGE_KEYS.OFFLINE_QUEUE, updated);
};

// App settings
export const saveAppSettings = async (settings) => {
  return storeData(STORAGE_KEYS.APP_SETTINGS, settings);
};

export const getAppSettings = async () => {
  return getData(STORAGE_KEYS.APP_SETTINGS) || {
    notifications: true,
    autoSave: true,
    theme: 'light',
  };
};

export default {
  storeData,
  getData,
  removeData,
  clearAll,
  saveUserToken,
  getUserToken,
  removeUserToken,
  saveUserData,
  getUserData,
  saveDraftReport,
  getDraftReports,
  deleteDraftReport,
  clearDraftReports,
  addToOfflineQueue,
  getOfflineQueue,
  clearOfflineQueue,
  removeFromOfflineQueue,
  saveAppSettings,
  getAppSettings,
};
