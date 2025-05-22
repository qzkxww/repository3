import { View, Text, StyleSheet } from 'react-native';
import { Instagram, Twitter, BookText as TikTok, Linkedin } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type PlatformSummaryProps = {
  platform: string;
  count: number;
  total: number;
};

export default function PlatformSummary({ 
  platform, 
  count, 
  total 
}: PlatformSummaryProps) {
  const { isDarkMode } = useTheme();
  
  const getPlatformIcon = () => {
    const iconSize = 20;
    const iconColor = isDarkMode ? '#ffffff' : '#000000';
    
    switch (platform) {
      case 'Instagram':
        return <Instagram size={iconSize} color={iconColor} />;
      case 'Twitter':
        return <Twitter size={iconSize} color={iconColor} />;
      case 'TikTok':
        return <TikTok size={iconSize} color={iconColor} />;
      case 'LinkedIn':
        return <Linkedin size={iconSize} color={iconColor} />;
      default:
        return null;
    }
  };
  
  const getProgress = () => {
    return total > 0 ? (count / total) * 100 : 0;
  };
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
      }
    ]}>
      <View style={styles.platformInfo}>
        <View style={styles.platformName}>
          {getPlatformIcon()}
          <Text style={[
            styles.platformText,
            { color: isDarkMode ? '#ffffff' : '#000000' }
          ]}>
            {platform}
          </Text>
        </View>
        
        <Text style={[
          styles.countText,
          { color: isDarkMode ? '#bbbbbb' : '#555555' }
        ]}>
          {count}/{total}
        </Text>
      </View>
      
      <View style={[
        styles.progressBarContainer,
        { backgroundColor: isDarkMode ? '#333333' : '#e0e0e0' }
      ]}>
        <View 
          style={[
            styles.progressBar,
            { 
              width: `${getProgress()}%`,
              backgroundColor: count === total ? '#4CAF50' : '#000000', 
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  platformInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  platformName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  countText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
});