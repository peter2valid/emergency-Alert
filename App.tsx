import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { AppNavigator } from './src/navigation/AppNavigator';

const emergencyThemeColors = [
  // Light theme colors (not used but required)
  {
    label: '#FFFFFF',
    card: '#1A1A1A',
    overlay: 'rgba(0,0,0,0.6)',
    success: '#00FF00',
    danger: '#FF0000',
    warning: '#FFA500',
  },
  // Dark theme colors (used)
  {
    label: '#FFFFFF',
    card: '#1A1A1A',
    overlay: 'rgba(0,0,0,0.8)',
    success: '#00FF00',
    danger: '#FF0000',
    warning: '#FFA500',
  },
] as const;

export default function App() {
  const content = (
    <>
      <AppNavigator />
      <StatusBar style="light" />
    </>
  );

  // Only use AlertNotificationRoot on native platforms (iOS/Android)
  // Web doesn't support this library
  if (Platform.OS === 'web') {
    return content;
  }

  return (
    <AlertNotificationRoot
      theme="dark"
      colors={emergencyThemeColors as any}
      toastConfig={{
        autoClose: 3000,
      }}
      dialogConfig={{
        closeOnOverlayTap: true,
        autoClose: false,
      }}
    >
      {content}
    </AlertNotificationRoot>
  );
}
