import React, { createContext, useState, useContext, useEffect } from 'react';
import { firebaseAuth, signIn as firebaseSignIn, signUp as firebaseSignUp, signOut as firebaseSignOut } from '../config/firebase';
import { saveUserToken, getUserToken, removeUserToken, saveUserData, getUserData } from '../services/storage';
import { verifyToken, getUserProfile } from '../services/api';
import Toast from 'react-native-toast-message';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    checkStoredAuth();
  }, []);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userToken = await firebaseUser.getIdToken();
        await handleAuthSuccess(firebaseUser, userToken);
      } else {
        setUser(null);
        setToken(null);
      }
      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedToken = await getUserToken();
      const storedUser = await getUserData();

      if (storedToken && storedUser) {
        // Verify token is still valid
        const result = await verifyToken(storedToken);
        if (result.success) {
          setToken(storedToken);
          setUser(storedUser);
        } else {
          // Token invalid, clear storage
          await removeUserToken();
        }
      }
    } catch (error) {
      console.error('Error checking stored auth:', error);
    } finally {
      setLoading(false);
      setInitializing(false);
    }
  };

  const handleAuthSuccess = async (firebaseUser, userToken) => {
    try {
      // Get additional user data from backend
      const profileResult = await getUserProfile();

      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || profileResult?.user?.displayName || 'User',
        photoURL: firebaseUser.photoURL,
        tier: profileResult?.user?.tier || 'starter',
        ...profileResult?.user,
      };

      await saveUserToken(userToken);
      await saveUserData(userData);

      setToken(userToken);
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Still set basic user data even if profile fetch fails
      const basicUserData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'User',
        tier: 'starter',
      };
      await saveUserData(basicUserData);
      setUser(basicUserData);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await firebaseSignIn(email, password);

      if (result.success) {
        const userToken = await result.user.getIdToken();
        await handleAuthSuccess(result.user, userToken);
        Toast.show({
          type: 'success',
          text1: 'Welcome back!',
          text2: 'You have successfully logged in.',
        });
        return { success: true };
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: result.error,
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, displayName) => {
    try {
      setLoading(true);
      const result = await firebaseSignUp(email, password, displayName);

      if (result.success) {
        const userToken = await result.user.getIdToken();
        await handleAuthSuccess(result.user, userToken);
        Toast.show({
          type: 'success',
          text1: 'Welcome to FlacronAI!',
          text2: 'Your account has been created successfully.',
        });
        return { success: true };
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: result.error,
        });
        return { success: false, error: result.error };
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Error',
        text2: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
      await removeUserToken();
      setUser(null);
      setToken(null);
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been successfully logged out.',
      });
      return { success: true };
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Error',
        text2: error.message,
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async () => {
    try {
      const profileResult = await getUserProfile();
      if (profileResult.success) {
        const updatedUser = { ...user, ...profileResult.user };
        setUser(updatedUser);
        await saveUserData(updatedUser);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const value = {
    user,
    token,
    loading,
    initializing,
    login,
    register,
    logout,
    refreshUserData,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
