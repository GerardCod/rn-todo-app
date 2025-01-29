import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import "./global.css";

export default function RootLayout() {
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