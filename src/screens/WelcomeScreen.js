// src/screens/WelcomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

const WelcomeScreen = () => {
  const [name, setName] = useState('');
  const { login } = useAuth();

  const handleContinue = async () => {
    if (!name.trim()) {
      Alert.alert('Oops!', 'Please enter your name');
      return;
    }

    await login(name.trim());
    // No navigation needed — AuthContext updates → AppNavigation auto switches to Dashboard
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>What's your name?</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoFocus
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4F46E5' },
  content: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 42, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 18, color: '#E0E7FF', textAlign: 'center', marginBottom: 50 },
  input: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    fontSize: 18,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#4F46E5', fontSize: 18, fontWeight: '700' },
});

export default WelcomeScreen;