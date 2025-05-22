import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { TaskType } from '@/types/task';

type TaskItemProps = {
  task: TaskType;
  onToggle: () => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  const { isDarkMode } = useTheme();
  const [checkmarkOpacity] = useState(new Animated.Value(task.completed ? 1 : 0));
  
  const handleToggle = () => {
    Animated.timing(checkmarkOpacity, {
      toValue: task.completed ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    onToggle();
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
        }
      ]}
      onPress={handleToggle}
      activeOpacity={0.7}
    >
      <TouchableOpacity 
        style={[
          styles.checkbox,
          {
            backgroundColor: task.completed ? '#000000' : 'transparent',
            borderColor: isDarkMode ? '#555555' : '#cccccc',
          }
        ]}
        onPress={handleToggle}
      >
        <Animated.View style={{ opacity: checkmarkOpacity }}>
          <Check size={16} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>
      
      <View style={styles.taskContent}>
        <Text 
          style={[
            styles.title,
            { 
              color: isDarkMode ? '#ffffff' : '#000000',
              textDecorationLine: task.completed ? 'line-through' : 'none',
              opacity: task.completed ? 0.6 : 1,
            }
          ]}
        >
          {task.title}
        </Text>
        
        <View style={styles.taskMeta}>
          <Text 
            style={[
              styles.platform,
              { 
                backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
                color: isDarkMode ? '#bbbbbb' : '#555555',
              }
            ]}
          >
            {task.platform}
          </Text>
          
          <Text 
            style={[
              styles.frequency,
              { color: isDarkMode ? '#777777' : '#888888' }
            ]}
          >
            {task.frequency}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.deleteButton}>
        <Trash2 
          size={20} 
          color={isDarkMode ? '#555555' : '#cccccc'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platform: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  frequency: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});