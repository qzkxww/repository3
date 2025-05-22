import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';

export default function TaskSummary() {
  const { isDarkMode } = useTheme();
  const { tasks, toggleTask } = useTasks();
  
  // Get only top 3 tasks for summary view
  const limitedTasks = tasks.slice(0, 3);
  
  const handleViewAllTasks = () => {
    router.push('/(tabs)/tasks');
  };
  
  return (
    <View style={styles.container}>
      {limitedTasks.map((task) => (
        <TouchableOpacity 
          key={task.id}
          style={[
            styles.taskItem,
            { 
              backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
            }
          ]}
          onPress={() => toggleTask(task.id)}
        >
          <View style={[
            styles.checkCircle,
            {
              backgroundColor: task.completed ? '#000000' : 'transparent',
              borderColor: isDarkMode ? '#555555' : '#cccccc',
            }
          ]} />
          
          <View style={styles.taskContent}>
            <Text style={[
              styles.taskText,
              { 
                color: isDarkMode ? '#ffffff' : '#000000',
                textDecorationLine: task.completed ? 'line-through' : 'none',
              }
            ]}>
              {task.title}
            </Text>
            <Text style={[
              styles.platformTag,
              { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }
            ]}>
              {task.platform}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity 
        style={[
          styles.viewAllButton,
          { borderColor: isDarkMode ? '#333333' : '#e0e0e0' }
        ]}
        onPress={handleViewAllTasks}
      >
        <Text style={[
          styles.viewAllText,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          View All Tasks
        </Text>
        <ChevronRight size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  platformTag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 4,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 4,
  },
});