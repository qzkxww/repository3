import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Instagram, Twitter, BookText as TikTok, Linkedin, Youtube, Facebook } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type PlatformFilterProps = {
  selectedPlatform: string;
  onSelectPlatform: (platform: string) => void;
};

export default function PlatformFilter({ 
  selectedPlatform, 
  onSelectPlatform 
}: PlatformFilterProps) {
  const { isDarkMode } = useTheme();
  
  const platforms = [
    { name: 'All', icon: null },
    { name: 'Instagram', icon: Instagram },
    { name: 'Twitter', icon: Twitter },
    { name: 'TikTok', icon: TikTok },
    { name: 'LinkedIn', icon: Linkedin },
    { name: 'YouTube', icon: Youtube },
    { name: 'Facebook', icon: Facebook },
  ];
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {platforms.map((platform) => {
        const isSelected = selectedPlatform === platform.name;
        const Icon = platform.icon;
        
        return (
          <TouchableOpacity
            key={platform.name}
            style={[
              styles.filterButton,
              { 
                backgroundColor: isSelected 
                  ? '#000000' 
                  : isDarkMode ? '#333333' : '#f0f0f0',
              }
            ]}
            onPress={() => onSelectPlatform(platform.name)}
          >
            {Icon && <Icon 
              size={16} 
              color={isSelected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#000000')} 
              style={styles.icon} 
            />}
            <Text style={[
              styles.filterText,
              { color: isSelected ? '#ffffff' : (isDarkMode ? '#ffffff' : '#000000') }
            ]}>
              {platform.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  contentContainer: {
    paddingRight: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  icon: {
    marginRight: 4,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});