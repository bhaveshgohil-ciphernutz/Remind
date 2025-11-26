import React from 'react';
import { View, Text, Button } from 'react-native';

const AddTaskScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Add Task Screen</Text>
      <Button title="Back to List" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default AddTaskScreen;