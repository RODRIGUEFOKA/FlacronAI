import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Firebase services
export const firebaseAuth = auth;
export const firebaseFirestore = firestore;
export const firebaseStorage = storage;

// Authentication helpers
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // Update profile with display name
    if (displayName) {
      await userCredential.user.updateProfile({ displayName });
    }

    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => {
  return auth().currentUser;
};

export const onAuthStateChanged = (callback) => {
  return auth().onAuthStateChanged(callback);
};

// Firestore helpers
export const getUserProfile = async (userId) => {
  try {
    const doc = await firestore().collection('users').doc(userId).get();
    return { success: true, data: doc.data() };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    await firestore().collection('users').doc(userId).update(data);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default {
  auth,
  firestore,
  storage,
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  onAuthStateChanged,
  getUserProfile,
  updateUserProfile,
};
