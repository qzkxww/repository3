import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function WeeklyProgress() {
  const { isDarkMode } = useTheme();
  
  // Sample data for the week
  const weekData = [
    { day: 'M', completed: 3, total: 4 },
    { day: 'T', completed: 5, total: 5 },
    { day: 'W', completed: 4, total: 5 },
    { day: 'T', completed: 3, total: 6 },
    { day: 'F', completed: 2, total: 4 },
    { day: 'S', completed: 1, total: 2 },
    { day: 'S', completed: 0, total: 0 },
  ];
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }
    ]}>
      <View style={styles.chartContainer}>
        {weekData.map((day, index) => {
          const percentage = day.total > 0 ? (day.completed / day.total) * 100 : 0;
          
          return (
            <View key={index} style={styles.dayColumn}>
              <View style={styles.barContainer}>
                <View style={[
                  styles.barBackground,
                  { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }
                ]}>
                  <View 
                    style={[
                      styles.barFill,
                      { 
                        height: `${percentage}%`,
                        backgroundColor: percentage === 100 ? '#4CAF50' : '#000000',
                      }
                    ]}
                  />
                </View>
              </View>
              
              <Text style={[
                styles.dayLabel,
                { color: isDarkMode ? '#bbbbbb' : '#555555' }
              ]}>
                {day.day}
              </Text>
              
              <Text style={[
                styles.taskCount,
                { color: isDarkMode ? '#ffffff' : '#000000' }
              ]}>
                {day.completed}
              </Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[
            styles.statValue,
            { color: isDarkMode ? '#ffffff' : '#000000' }
          ]}>
            18
          </Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? '#bbbbbb' : '#555555' }
          ]}>
            Completed
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[
            styles.statValue,
            { color: isDarkMode ? '#ffffff' : '#000000' }
          ]}>
            26
          </Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? '#bbbbbb' : '#555555' }
          ]}>
            Total Tasks
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[
            styles.statValue,
            { color: isDarkMode ? '#ffffff' : '#000000' }
          ]}>
            69%
          </Text>
          <Text style={[
            styles.statLabel,
            { color: isDarkMode ? '#bbbbbb' : '#555555' }
          ]}>
            Completion
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 140,
    marginBottom: 16,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: 24,
  },
  barBackground: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 4,
  },
  dayLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  taskCount: {
    marginTop: 4,
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
});