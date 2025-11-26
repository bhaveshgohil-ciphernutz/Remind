import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TaskListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List Screen</Text>
      <Button
        title="Go to Add Task"
        onPress={() => navigation.navigate('AddTaskScreen')}
      />
      <Button
        title="Go to Task Details (Test)"
        onPress={() => navigation.navigate('TaskDetailsScreen', { taskId: 999 })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
});

export default TaskListScreen;