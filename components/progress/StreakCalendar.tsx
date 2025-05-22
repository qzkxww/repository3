import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function StreakCalendar() {
  const { isDarkMode } = useTheme();
  
  // Generate fake calendar data for the month
  const daysInMonth = 30;
  const completedDays = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 18, 19, 22, 23, 24, 25];
  const currentDay = 25;
  
  // Generate calendar days
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const isCompleted = completedDays.includes(day);
    const isCurrent = day === currentDay;
    const isPast = day < currentDay;
    
    return { day, isCompleted, isCurrent, isPast };
  });
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }
    ]}>
      <View style={styles.calendarGrid}>
        {calendarDays.map(({ day, isCompleted, isCurrent, isPast }) => (
          <View
            key={day}
            style={[
              styles.calendarDay,
              isCurrent && { 
                borderColor: '#000000',
                borderWidth: 2,
              },
              isCompleted && { 
                backgroundColor: '#000000',
              },
              isPast && !isCompleted && { 
                backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
              },
            ]}
          >
            <Text style={[
              styles.dayText,
              isCompleted && { color: '#ffffff' },
              !isCompleted && { 
                color: isPast 
                  ? (isDarkMode ? '#777777' : '#aaaaaa') 
                  : (isDarkMode ? '#bbbbbb' : '#555555')
              },
            ]}>
              {day}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#000000' }]} />
          <Text style={{ color: isDarkMode ? '#bbbbbb' : '#555555' }}>
            Completed
          </Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[
            styles.legendDot, 
            { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }
          ]} />
          <Text style={{ color: isDarkMode ? '#bbbbbb' : '#555555' }}>
            Missed
          </Text>
        </View>
        
        <View style={styles.legendItem}>
          <View style={[
            styles.legendDot, 
            { 
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: isDarkMode ? '#777777' : '#cccccc'
            }
          ]} />
          <Text style={{ color: isDarkMode ? '#bbbbbb' : '#555555' }}>
            Upcoming
          </Text>
        </View>
      </View>
      
      <View style={styles.streakInfo}>
        <Text style={[
          styles.currentStreak,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          Current Streak: 7 days
        </Text>
        <Text style={[
          styles.bestStreak,
          { color: isDarkMode ? '#bbbbbb' : '#555555' }
        ]}>
          Best Streak: 12 days
        </Text>
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
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  calendarDay: {
    width: '13%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '500',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  streakInfo: {
    borderTopWidth: 1,
    borderTopColor: '#333333',
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentStreak: {
    fontSize: 16,
    fontWeight: '600',
  },
  bestStreak: {
    fontSize: 14,
  },
});