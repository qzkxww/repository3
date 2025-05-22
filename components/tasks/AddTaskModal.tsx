import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';

const PLATFORMS = [
  'Instagram',
  'Twitter',
  'TikTok',
  'LinkedIn',
  'YouTube',
  'Facebook',
];

const FREQUENCY = [
  'Daily',
  'Weekly',
  'Custom',
];

type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddTaskModal({ visible, onClose }: AddTaskModalProps) {
  const { isDarkMode } = useTheme();
  const { addTask, isPremium } = useTasks();
  
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [frequency, setFrequency] = useState('Daily');
  
  const bgColor = isDarkMode ? '#121212' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const borderColor = isDarkMode ? '#333333' : '#e0e0e0';
  
  const handleAddTask = () => {
    if (title.trim()) {
      addTask({
        title,
        platform,
        frequency,
      });
      
      // Reset form
      setTitle('');
      
      // Close modal
      onClose();
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[
          styles.modalContent,
          { backgroundColor: bgColor }
        ]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: textColor }]}>
              Add New Task
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={textColor} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.formContainer}>
            <Text style={[styles.inputLabel, { color: textColor }]}>
              Task Title
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
                  color: textColor,
                  borderColor: borderColor
                }
              ]}
              placeholder="e.g., Post a Reel"
              placeholderTextColor={isDarkMode ? '#777777' : '#aaaaaa'}
              value={title}
              onChangeText={setTitle}
            />
            
            <Text style={[styles.inputLabel, { color: textColor }]}>
              Platform
            </Text>
            <View style={styles.optionsContainer}>
              {PLATFORMS.map((item, index) => {
                const isSelected = platform === item;
                const isDisabled = index > 2 && !isPremium;
                
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.optionButton,
                      { 
                        backgroundColor: isSelected 
                          ? '#000000' 
                          : isDarkMode ? '#1e1e1e' : '#f5f5f5',
                        opacity: isDisabled ? 0.5 : 1,
                      }
                    ]}
                    onPress={() => !isDisabled && setPlatform(item)}
                    disabled={isDisabled}
                  >
                    {isDisabled && (
                      <Text style={styles.crownIcon}>👑</Text>
                    )}
                    <Text style={[
                      styles.optionText,
                      { color: isSelected ? '#ffffff' : textColor }
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            <Text style={[styles.inputLabel, { color: textColor }]}>
              Frequency
            </Text>
            <View style={styles.optionsContainer}>
              {FREQUENCY.map((item) => {
                const isSelected = frequency === item;
                const isDisabled = item === 'Custom' && !isPremium;
                
                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.optionButton,
                      { 
                        backgroundColor: isSelected 
                          ? '#000000' 
                          : isDarkMode ? '#1e1e1e' : '#f5f5f5',
                        opacity: isDisabled ? 0.5 : 1,
                      }
                    ]}
                    onPress={() => !isDisabled && setFrequency(item)}
                    disabled={isDisabled}
                  >
                    {isDisabled && (
                      <Text style={styles.crownIcon}>👑</Text>
                    )}
                    <Text style={[
                      styles.optionText,
                      { color: isSelected ? '#ffffff' : textColor }
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            style={[styles.addButton, { opacity: title.trim() ? 1 : 0.5 }]}
            onPress={handleAddTask}
            disabled={!title.trim()}
          >
            <Text style={styles.addButtonText}>
              Add Task
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    height: '80%',
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  formContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  crownIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  addButton: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});