import { View, Text, StyleSheet } from 'react-native';
import { Flame } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type StreakIndicatorProps = {
  streak: number;
};

export default function StreakIndicator({ streak }: StreakIndicatorProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
      }
    ]}>
      <Flame size={24} color="#FF3B30" />
      <Text style={[
        styles.streakText,
        { color: isDarkMode ? '#ffffff' : '#000000' }
      ]}>
        {streak} Day Streak!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});