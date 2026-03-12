// App.js
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TaskProvider } from './src/context/TaskContext';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
          <SafeAreaView style={styles.container}>
            <AppNavigation />
          </SafeAreaView>
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default App;