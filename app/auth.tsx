import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { createClient } from '@supabase/supabase-js';
import { useTheme } from '@/context/ThemeContext';

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AuthScreen() {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        router.replace('/(tabs)');
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (signUpError) throw signUpError;
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }
    ]}>
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>
          Welcome to PostPilot
        </Text>
        <Text style={[
          styles.subtitle,
          { color: isDarkMode ? '#bbbbbb' : '#666666' }
        ]}>
          {isLogin ? 'Sign in to continue' : 'Create your account'}
        </Text>
      </View>

      <View style={styles.form}>
        {!isLogin && (
          <TextInput
            style={[
              styles.input,
              { 
                backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
                color: isDarkMode ? '#ffffff' : '#000000',
                borderColor: isDarkMode ? '#333333' : '#e0e0e0'
              }
            ]}
            placeholder="Full Name"
            placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
            value={fullName}
            onChangeText={setFullName}
          />
        )}

        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
              color: isDarkMode ? '#ffffff' : '#000000',
              borderColor: isDarkMode ? '#333333' : '#e0e0e0'
            }
          ]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input,
            { 
              backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5',
              color: isDarkMode ? '#ffffff' : '#000000',
              borderColor: isDarkMode ? '#333333' : '#e0e0e0'
            }
          ]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? '#888888' : '#999999'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        <TouchableOpacity 
          style={[
            styles.button,
            { opacity: loading ? 0.7 : 1 }
          ]}
          onPress={handleAuth}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={[
            styles.switchText,
            { color: isDarkMode ? '#bbbbbb' : '#666666' }
          ]}>
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  form: {
    gap: 16,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#000000',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchText: {
    fontSize: 14,
  },
});