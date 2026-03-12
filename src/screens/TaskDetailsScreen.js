// src/screens/TaskDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTasks } from '../context/TaskContext';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { task: originalTask } = route.params;
  const { updateTask, deleteTask } = useTasks();   // ← deleteTask is now used!

  // Local state (changes only saved when pressing Save)
  const [title, setTitle] = useState(originalTask.title);
  const [description, setDescription] = useState(originalTask.description || '');
  const [completed, setCompleted] = useState(originalTask.completed);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Task title cannot be empty');
      return;
    }

    updateTask(originalTask.id, {
      title: title.trim(),
      description: description.trim(),
      completed: completed,
    });

    navigation.goBack();
  };

  // ← THIS IS THE FIXED DELETE FUNCTION
  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(originalTask.id);   // ← Actually removes from context + AsyncStorage
            navigation.goBack();          // ← Go back to list
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Task</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          <TextInput
            style={styles.titleInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Task title"
            placeholderTextColor="#9CA3AF"
            multiline
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descInput}
            value={description}
            onChangeText={setDescription}
            placeholder="Add notes or details..."
            placeholderTextColor="#9CA3AF"
            multiline
            textAlignVertical="top"
          />

          {/* Toggle Button – local only */}
          <TouchableOpacity
            style={[styles.toggleBtn, completed && styles.toggleBtnCompleted]}
            onPress={() => setCompleted(!completed)}
          >
            <Ionicons
              name={completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={26}
              color={completed ? '#10B981' : '#6B7280'}
            />
            <Text style={[styles.toggleText, completed && styles.toggleTextCompleted]}>
              {completed ? 'Completed' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Delete Button – NOW WORKS */}
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={22} color="#EF4444" />
            <Text style={styles.deleteText}>Delete Task</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  saveText: { color: '#4F46E5', fontSize: 17, fontWeight: '600' },

  scrollView: { flex: 1, padding: 20 },

  titleInput: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 24,
    paddingTop: 8,
  },

  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 10 },

  descInput: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    minHeight: 140,
    textAlignVertical: 'top',
    backgroundColor: '#FBFCFD',
    marginBottom: 30,
  },

  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  toggleBtnCompleted: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  toggleText: {
    marginLeft: 12,
    fontSize: 17,
    color: '#6B7280',
    fontWeight: '600',
  },
  toggleTextCompleted: { color: '#10B981' },

  bottomAction: {
    padding: 20,
    paddingTop: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  deleteText: {
    marginLeft: 10,
    fontSize: 17,
    color: '#EF4444',
    fontWeight: '600',
  },
});

export default TaskDetailsScreen;