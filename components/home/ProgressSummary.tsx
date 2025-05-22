import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type ProgressSummaryProps = {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
};

export default function ProgressSummary({ 
  completedTasks, 
  totalTasks, 
  percentage 
}: ProgressSummaryProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
      }
    ]}>
      <View style={styles.progressInfo}>
        <Text style={[
          styles.percentage,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          {percentage}%
        </Text>
        
        <Text style={[
          styles.completed,
          { color: isDarkMode ? '#bbbbbb' : '#555555' }
        ]}>
          {completedTasks}/{totalTasks} completed
        </Text>
      </View>
      
      <View style={[
        styles.progressBarContainer,
        { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }
      ]}>
        <View 
          style={[
            styles.progressBar,
            { 
              width: `${percentage}%`,
              backgroundColor: percentage === 100 ? '#4CAF50' : '#000000',
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  percentage: {
    fontSize: 24,
    fontWeight: '700',
  },
  completed: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
});