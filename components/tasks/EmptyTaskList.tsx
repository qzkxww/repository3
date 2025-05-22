import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function EmptyTaskList() {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=300' }}
        style={styles.image}
      />
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#ffffff' : '#000000' }
      ]}>
        No Tasks Yet
      </Text>
      <Text style={[
        styles.subtitle,
        { color: isDarkMode ? '#bbbbbb' : '#555555' }
      ]}>
        Add tasks to start building your social media habits
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    height: 300,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});