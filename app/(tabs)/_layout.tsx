import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Chrome as Home, SquareCheck as CheckSquare, Calendar, Settings } from 'lucide-react-native';
import { ThemeProvider } from '@/context/ThemeContext';
import { TaskProvider } from '@/context/TaskContext';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function TabLayout() {
  useFrameworkReady();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Set the tab bar colors based on the theme
  const tabBarStyle = {
    backgroundColor: isDark ? '#121212' : '#ffffff',
    borderTopColor: isDark ? '#333333' : '#f0f0f0',
  };

  const activeColor = isDark ? '#ffffff' : '#000000';
  const inactiveColor = isDark ? '#777777' : '#888888';

  return (
    <ThemeProvider>
      <TaskProvider>
        <Tabs
          screenOptions={{
            tabBarStyle,
            tabBarActiveTintColor: activeColor,
            tabBarInactiveTintColor: inactiveColor,
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
            headerShown: false,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Home size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="tasks"
            options={{
              title: 'Tasks',
              tabBarIcon: ({ color, size }) => (
                <CheckSquare size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="progress"
            options={{
              title: 'Progress',
              tabBarIcon: ({ color, size }) => (
                <Calendar size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Settings size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </TaskProvider>
    </ThemeProvider>
  );
}