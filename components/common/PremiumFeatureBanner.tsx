import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Crown } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

type PremiumFeatureBannerProps = {
  title: string;
  description: string;
  featureList?: string[];
};

export default function PremiumFeatureBanner({ 
  title, 
  description, 
  featureList = [] 
}: PremiumFeatureBannerProps) {
  const { isDarkMode } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
        borderColor: isDarkMode ? '#333333' : '#e0e0e0',
      }
    ]}>
      <View style={styles.crownContainer}>
        <Crown size={24} color="#FFD700" />
      </View>
      
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#ffffff' : '#000000' }
      ]}>
        {title}
      </Text>
      
      <Text style={[
        styles.description,
        { color: isDarkMode ? '#bbbbbb' : '#555555' }
      ]}>
        {description}
      </Text>
      
      {featureList.length > 0 && (
        <View style={styles.featureList}>
          {featureList.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Crown size={14} color="#FFD700" style={styles.featureIcon} />
              <Text style={[
                styles.featureText,
                { color: isDarkMode ? '#bbbbbb' : '#555555' }
              ]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>
      )}
      
      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeText}>
          Upgrade to Pro
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  crownContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  featureList: {
    width: '100%',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureIcon: {
    marginRight: 6,
  },
  featureText: {
    fontSize: 14,
  },
  upgradeButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  upgradeText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});