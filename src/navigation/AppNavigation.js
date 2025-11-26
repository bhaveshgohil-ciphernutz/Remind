import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="TaskList"
        screenOptions={{ headerShown:false}}>
        <Stack.Screen name="TaskList" component={TaskListScreen}/>
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen}/>
        <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen}/>
      </Stack.Navigator>
  );
};

export default AppNavigator;