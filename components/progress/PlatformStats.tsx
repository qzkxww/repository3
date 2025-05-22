import { View, Text, StyleSheet } from 'react-native';
import { ChartBar as BarChart } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';
import PremiumFeatureBanner from '@/components/common/PremiumFeatureBanner';

export default function PlatformStats() {
  const { isDarkMode } = useTheme();
  const { isPremium } = useTasks();
  
  // For non-premium users, show limited stats with upgrade prompt
  if (!isPremium) {
    return (
      <View style={styles.container}>
        <View style={[
          styles.emptyStatsContainer,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }
        ]}>
          <BarChart size={32} color={isDarkMode ? '#555555' : '#cccccc'} />
          <Text style={[
            styles.emptyStatsText,
            { color: isDarkMode ? '#bbbbbb' : '#555555' }
          ]}>
            Platform statistics are a Pro feature
          </Text>
        </View>
        
        <PremiumFeatureBanner
          title="Unlock Platform Analytics"
          description="Track your performance across all platforms with detailed analytics."
          featureList={[
            "See platform growth over time",
            "Compare engagement across platforms",
            "Identify your most effective content types"
          ]}
        />
      </View>
    );
  }
  
  // Display platform statistics for premium users
  return (
    <View style={styles.container}>
      <Text style={[
        styles.comingSoon,
        { color: isDarkMode ? '#ffffff' : '#000000' }
      ]}>
        Platform analytics activated with Pro!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  emptyStatsContainer: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyStatsText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    textAlign: 'center',
  },
  comingSoon: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 16,
  },
});