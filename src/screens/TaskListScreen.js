// src/screens/TaskListScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

const TaskListScreen = ({ navigation }) => {
  const { tasks, toggleComplete, deleteTask } = useTasks();
  const { userName,userImage } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteTask(id) },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => navigation.navigate('TaskDetailsScreen', { task: item })}
    >
      <TouchableOpacity onPress={() => toggleComplete(item.id)}>
        <Ionicons
          name={item.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
          size={28}
          color={item.completed ? '#10B981' : '#9CA3AF'}
        />
      </TouchableOpacity>

      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, item.completed && styles.completedTitle]}>
          {item.title}
        </Text>
        {item.description ? (
          <Text style={styles.taskDesc} numberOfLines={1}>
            {item.description}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* NEW: Greeting Card - Clickable to Profile */}
      <TouchableOpacity
        style={styles.greetingCard}
        onPress={() => navigation.navigate('ProfileScreen')}
        activeOpacity={0.8}
      >
        <View style={styles.userRow}>
          {/* In TaskListScreen - Greeting Card */}
          <View style={styles.avatarPlaceholder}>
            {userImage ? (
              <Image source={{ uri: userImage }} style={{ width: 56, height: 56, borderRadius: 28 }} />
            ) : (
              <Ionicons name="person" size={36} color="#4F46E5" />
            )}
          </View>
          <View style={styles.greetingText}>
            <Text style={styles.greeting}>Hello, {userName || 'User'}!</Text>
            <Text style={styles.statsText}>
              {tasks.length} Total • {completedCount} Done • {pendingCount} Pending
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
      </TouchableOpacity>

      {/* ORIGINAL HEADER - Kept exactly as you had */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <Text style={styles.count}>{tasks.length} tasks</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySub}>Tap + to create one</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTaskScreen')}
      >
        <Ionicons name="add" size={34} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// === YOUR ORIGINAL STYLES + ONLY NEW STYLES ADDED BELOW ===
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 30, fontWeight: '800', color: '#1F2937' },
  count: { fontSize: 16, color: '#6B7280' },

  // NEW: Greeting Card
  greetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  userRow: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  greetingText: { flex: 1 },
  greeting: { fontSize: 20, fontWeight: '700', color: '#1F2937' },
  statsText: { fontSize: 14, color: '#6B7280', marginTop: 4 },

  // YOUR ORIGINAL STYLES (100% unchanged)
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 7,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },
  taskContent: { flex: 1, marginHorizontal: 14 },
  taskTitle: { fontSize: 16.5, fontWeight: '600', color: '#1F2937' },
  completedTitle: { textDecorationLine: 'line-through', color: '#9CA3AF' },
  taskDesc: { fontSize: 13.5, color: '#6B7280', marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 120 },
  emptyText: { fontSize: 21, color: '#6B7280', fontWeight: '600' },
  emptySub: { fontSize: 15, color: '#9CA3AF', marginTop: 8 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#4F46E5',
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
});

export default TaskListScreen;