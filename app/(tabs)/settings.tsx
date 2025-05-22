import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Moon, Crown, Bell, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isPremium } = useTasks();

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const sectionBgColor = isDarkMode ? '#1e1e1e' : '#f5f5f5';
  const itemBgColor = isDarkMode ? '#252525' : '#ffffff';
  const borderColor = isDarkMode ? '#333333' : '#e0e0e0';

  return (
    <View style={[
      styles.container,
      { 
        paddingTop: insets.top,
        backgroundColor: isDarkMode ? '#121212' : '#f8f8f8'
      }
    ]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          Settings
        </Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: sectionBgColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Appearance
          </Text>
          
          <View style={[styles.settingItem, { backgroundColor: itemBgColor, borderColor }]}>
            <View style={styles.settingContent}>
              <Moon size={20} color={textColor} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: '#767577', true: '#999999' }}
              thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: sectionBgColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Subscription
          </Text>
          
          {isPremium ? (
            <View style={[styles.settingItem, { backgroundColor: itemBgColor, borderColor }]}>
              <View style={styles.settingContent}>
                <Crown size={20} color="#FFD700" />
                <Text style={[styles.settingText, { color: textColor }]}>
                  PostPilot Pro
                </Text>
              </View>
              <Text style={[styles.activeText, { color: '#00AA55' }]}>
                Active
              </Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={[styles.upgradeButton, { backgroundColor: '#000000' }]}
            >
              <Crown size={20} color="#FFD700" />
              <Text style={styles.upgradeText}>
                Upgrade to PostPilot Pro
              </Text>
            </TouchableOpacity>
          )}
          
          <View style={[styles.settingItem, { backgroundColor: itemBgColor, borderColor }]}>
            <View style={styles.settingContent}>
              <Bell size={20} color={textColor} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Reminders
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: '#767577', true: '#999999' }}
              thumbColor={true ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: sectionBgColor }]}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Support
          </Text>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: itemBgColor, borderColor }]}>
            <View style={styles.settingContent}>
              <HelpCircle size={20} color={textColor} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Help & Support
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={[styles.logoutButton, { borderColor }]}>
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>
          PostPilot v1.0.0
        </Text>
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
  section: {
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  upgradeText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 12,
    marginBottom: 20,
  },
  logoutText: {
    color: '#FF3B30',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 14,
  },
});