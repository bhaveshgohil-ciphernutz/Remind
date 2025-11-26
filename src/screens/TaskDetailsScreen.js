import React from 'react';
import { View, Text, Button } from 'react-native';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId } = route.params || {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Task Details Screen</Text>
      <Text>Task ID: {taskId || 'No ID'}</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default TaskDetailsScreen;