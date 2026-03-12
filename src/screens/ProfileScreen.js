// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const ProfileScreen = () => {
  const { userName, userImage, updateProfileImage, removeProfileImage, logout } = useAuth();
  const { tasks, clearAllTasks } = useTasks();

  // Local state for image editing
  const [tempImage, setTempImage] = useState(userImage);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync tempImage when userImage changes (e.g. after login)
  useEffect(() => {
    setTempImage(userImage);
    setHasChanges(false);
  }, [userImage]);

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setTempImage(uri);
          setHasChanges(true);
        }
      }
    );
  };

  const saveImage = () => {
    if (tempImage !== userImage) {
      updateProfileImage(tempImage);
    }
    setHasChanges(false);
    Alert.alert('Success', 'Profile picture updated!', [{ text: 'OK' }]);
  };

  const cancelImageChange = () => {
    setTempImage(userImage);
    setHasChanges(false);
  };

  const handleDeleteAllTasks = () => {
    if (tasks.length === 0) {
      Alert.alert('No Tasks', 'You have no tasks to delete.');
      return;
    }
    Alert.alert('Delete All Tasks', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete All', style: 'destructive', onPress: () => clearAllTasks() },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'All your tasks will be permanently deleted. Continue?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout & Delete',
        style: 'destructive',
        onPress: async () => {
          const success = await clearAllTasks();
          if (success) logout();
          else Alert.alert('Error', 'Could not delete tasks.');
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.content}>

        {/* PROFILE IMAGE — Tap to change */}
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {tempImage ? (
            <Image source={{ uri: tempImage }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person-circle-outline" size={120} color="#fff" />
            </View>
          )}
          <View style={styles.cameraOverlay}>
            <Ionicons name="camera" size={28} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Save & Cancel Buttons — Only when image changed */}
        {hasChanges && (
          <View style={styles.imageActions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={cancelImageChange}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={saveImage}>
              <Text style={styles.saveText}>Save Photo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Remove Photo — Only if image exists and no changes pending */}
        {tempImage && !hasChanges && (
          <TouchableOpacity onPress={removeProfileImage} style={styles.removeBtn}>
            <Text style={styles.removeText}>Remove Photo</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.subtitle}>Your Profile</Text>

        <TouchableOpacity style={styles.deleteAllBtn} onPress={handleDeleteAllTasks}>
          <Ionicons name="trash-outline" size={22} color="#EF4444" />
          <Text style={styles.deleteAllText}>Delete All Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4F46E5' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },

  avatarContainer: { position: 'relative', marginBottom: 20 },
  avatarImage: { width: 140, height: 140, borderRadius: 70 },
  avatarPlaceholder: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  cameraOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff',
  },

  imageActions: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  saveBtn: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
  },
  saveText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  cancelBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  cancelText: { color: '#E0E7FF', fontSize: 17, fontWeight: '600' },

  removeBtn: { marginTop: -10, marginBottom: 20 },
  removeText: { color: '#E0E7FF', fontSize: 15, fontWeight: '500' },

  name: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#E0E7FF', marginBottom: 50 },

  deleteAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 18,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  deleteAllText: { marginLeft: 10, fontSize: 17, color: '#EF4444', fontWeight: '600' },

  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    padding: 18,
    borderRadius: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { marginLeft: 10, color: '#fff', fontSize: 17, fontWeight: '700' },
});

export default ProfileScreen;