import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';
import WeeklyProgress from '@/components/progress/WeeklyProgress';
import PlatformStats from '@/components/progress/PlatformStats';
import StreakCalendar from '@/components/progress/StreakCalendar';
import PremiumFeatureBanner from '@/components/common/PremiumFeatureBanner';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useTheme();
  const { isPremium } = useTasks();

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
          Progress
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[
          styles.sectionTitle,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          This Week
        </Text>
        
        <WeeklyProgress />
        
        <Text style={[
          styles.sectionTitle,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          Monthly Streak
        </Text>
        
        <StreakCalendar />
        
        <Text style={[
          styles.sectionTitle,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          Platform Performance
        </Text>
        
        <PlatformStats />
        
        {!isPremium && (
          <PremiumFeatureBanner 
            title="Unlock Advanced Analytics"
            description="Get detailed insights, performance trends, and content growth tracking with PostPilot Pro."
            featureList={[
              "Full progress tracking dashboards",
              "Analytics dashboard", 
              "Track follower growth", 
              "Weekly email reports"
            ]}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
});