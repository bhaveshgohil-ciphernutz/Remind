// src/context/TaskContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const saved = await AsyncStorage.getItem('tasks');
      if (saved) setTasks(JSON.parse(saved));
    } catch (e) {
      console.log('Failed to load tasks');
    }
  };

  const saveTasks = async (newTasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } catch (e) {
      console.log('Failed to save tasks');
    }
  };

  const addTask = (title, description = '') => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
    };
    saveTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    const updated = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    saveTasks(updated);
  };

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) updateTask(id, { completed: !task.completed });
  };

  const deleteTask = (id) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  // NEW: Clear all tasks
  const clearAllTasks = async () => {
    try {
      await AsyncStorage.removeItem('tasks');
      setTasks([]);
      return true;
    } catch (error) {
      console.log('Failed to clear tasks:', error);
      return false;
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      toggleComplete,
      deleteTask,
      clearAllTasks,   // ← NEW
    }}>
      {children}
    </TaskContext.Provider>
  );
};