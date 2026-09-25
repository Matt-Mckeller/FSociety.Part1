/**
 * Home Screen
 * 
 * Landing screen for the 4eye mobile app.
 */

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4eye</Text>
      <Text style={styles.subtitle}>AI-Powered Learning</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Rooms')}
      >
        <Text style={styles.buttonText}>View Rooms</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Character')}
      >
        <Text style={styles.buttonText}>Meet your 4eye</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.secondaryButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
