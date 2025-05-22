import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTasks } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';
import ProgressSummary from '@/components/home/ProgressSummary';
import PlatformSummary from '@/components/home/PlatformSummary';
import WelcomeHeader from '@/components/home/WelcomeHeader';
import TaskSummary from '@/components/home/TaskSummary';
import StreakIndicator from '@/components/home/StreakIndicator';
import { getGreeting } from '@/utils/helpers';

export default function HomeScreen() {
  const { tasks, completedToday } = useTasks();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = completedToday();
  const completionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  return (
    <View style={[
      styles.container,
      { 
        paddingTop: insets.top,
        backgroundColor: isDarkMode ? '#121212' : '#ffffff'
      }
    ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeHeader greeting={greeting} />
        
        <StreakIndicator streak={7} />
        
        <View style={styles.statsContainer}>
          <ProgressSummary 
            completedTasks={completedTasks} 
            totalTasks={totalTasks} 
            percentage={completionPercentage} 
          />
        </View>
        
        <Text style={[
          styles.sectionTitle,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          Today's Tasks
        </Text>
        
        <TaskSummary />
        
        <Text style={[
          styles.sectionTitle,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          Platform Activity
        </Text>
        
        <View style={styles.platformContainer}>
          <PlatformSummary platform="Instagram" count={2} total={3} />
          <PlatformSummary platform="Twitter" count={1} total={2} />
          <PlatformSummary platform="TikTok" count={0} total={1} />
          <PlatformSummary platform="LinkedIn" count={1} total={1} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  statsContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  platformContainer: {
    marginBottom: 16,
  }
});