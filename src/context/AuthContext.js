// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userImage, setUserImage] = useState(null);  // ← NEW
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const name = await AsyncStorage.getItem('userName');
      const image = await AsyncStorage.getItem('userImage');
      setUserName(name);
      setUserImage(image);
    } catch (e) {
      console.log('Failed to load user');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (name, image = null) => {
    await AsyncStorage.setItem('userName', name.trim());
    if (image) await AsyncStorage.setItem('userImage', image);
    setUserName(name.trim());
    setUserImage(image);
  };

  const updateProfileImage = async (imageUri) => {
    await AsyncStorage.setItem('userImage', imageUri);
    setUserImage(imageUri);
  };

  const removeProfileImage = async () => {
    await AsyncStorage.removeItem('userImage');
    setUserImage(null);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userImage'); // optional: keep image or remove
    setUserName(null);
    setUserImage(null);
  };

  return (
    <AuthContext.Provider value={{
      userName,
      userImage,
      isLoading,
      login,
      updateProfileImage,
      removeProfileImage,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};