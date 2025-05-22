import { View, Text, StyleSheet } from 'react-native';
import { Rocket } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type WelcomeHeaderProps = {
  greeting: string;
};

export default function WelcomeHeader({ greeting }: WelcomeHeaderProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Rocket 
          size={32} 
          color={isDarkMode ? '#ffffff' : '#000000'} 
          style={styles.logo}
        />
        <Text style={[
          styles.heading,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          PostPilot
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  logo: {
    marginRight: 12,
    transform: [{ rotate: '45deg' }],
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
  },
});