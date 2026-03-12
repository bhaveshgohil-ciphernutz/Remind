import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTasks } from '../context/TaskContext';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    addTask(title.trim(), description.trim());
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={30} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.title}>New Task</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add notes (optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles same as before
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#E5E7EB' },
  title: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  saveText: { color: '#4F46E5', fontSize: 17, fontWeight: '600' },
  form: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 10 },
  input: { borderWidth: 1.5, borderColor: '#D1D5DB', borderRadius: 14, padding: 16, fontSize: 16, backgroundColor: '#FBFCFD', marginBottom: 24 },
  textArea: { height: 130 },
});

export default AddTaskScreen;