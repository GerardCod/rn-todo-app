import { SplashScreen, Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import "./global.css";
import {useFonts} from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    
    if (fontsLoaded) SplashScreen.hideAsync();
    
  }, [fontsLoaded, error])
  
  if (!fontsLoaded || error) return null;

  return (
    <PaperProvider theme={{
      mode: 'adaptive',
    }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='signup' />
        <Stack.Screen name="(tasks)" />
      </Stack>
    </PaperProvider>
  );
}