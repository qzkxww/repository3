import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { createClient } from '@supabase/supabase-js';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Index() {
  useEffect(() => {
    // Hide the splash screen after a short delay
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();

  // Redirect to auth screen if not authenticated
  if (!session) {
    return <Redirect href="/auth" />;
  }

  // Redirect to the main tabs layout if authenticated
  return <Redirect href="/(tabs)" />;
}