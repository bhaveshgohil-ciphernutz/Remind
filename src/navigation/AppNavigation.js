// src/navigation/AppNavigation.js (Updated with ProfileScreen)
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

// Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
  </Stack.Navigator>
);

// Dashboard Stack (Main App)
const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
    <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  const { userName, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4F46E5' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return userName ? <DashboardStack /> : <AuthStack />;
};

export default AppNavigation;