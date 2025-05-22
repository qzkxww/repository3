import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Plus, Filter } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';
import TaskItem from '@/components/tasks/TaskItem';
import PlatformFilter from '@/components/tasks/PlatformFilter';
import AddTaskModal from '@/components/tasks/AddTaskModal';
import EmptyTaskList from '@/components/tasks/EmptyTaskList';

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const { tasks, toggleTask, filterTasks } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = filterTasks(selectedPlatform, searchQuery);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleAddTask = () => {
    setModalVisible(true);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <View style={[
      styles.container,
      { 
        paddingTop: insets.top,
        backgroundColor: isDarkMode ? '#121212' : '#ffffff'
      }
    ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          My Tasks
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[
              styles.filterButton,
              { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }
            ]}
            onPress={handleToggleFilters}
          >
            <Filter size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.addButton,
              { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }
            ]}
            onPress={handleAddTask}
          >
            <Plus size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
          </TouchableOpacity>
        </View>
      </View>
      
      {showFilters && (
        <View style={styles.filtersContainer}>
          <TextInput
            style={[
              styles.searchInput,
              { 
                backgroundColor: isDarkMode ? '#333333' : '#f0f0f0',
                color: isDarkMode ? '#ffffff' : '#000000'
              }
            ]}
            placeholder="Search tasks..."
            placeholderTextColor={isDarkMode ? '#888888' : '#888888'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          <PlatformFilter 
            selectedPlatform={selectedPlatform}
            onSelectPlatform={handlePlatformSelect}
          />
        </View>
      )}
      
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyTaskList />}
      />
      
      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
});