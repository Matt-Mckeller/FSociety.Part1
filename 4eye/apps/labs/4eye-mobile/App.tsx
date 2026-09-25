/**
 * 4eye Mobile App
 * 
 * Thin UI shell - all logic comes from packages.
 */

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';

// Providers from packages
// import { AuthProvider } from '@expanse/auth';
// import { ThemeProvider } from '@expanse/theme';

export default function App() {
  return (
    // TODO: Wrap with providers when packages are ready
    // <AuthProvider>
    //   <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
    //   </ThemeProvider>
    // </AuthProvider>
  );
}
