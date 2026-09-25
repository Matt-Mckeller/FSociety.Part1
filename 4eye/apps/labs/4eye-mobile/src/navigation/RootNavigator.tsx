/**
 * Root Navigator
 * 
 * Main navigation structure for the mobile app.
 */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RoomsScreen } from '../screens/RoomsScreen';
import { CharacterScreen } from '../screens/CharacterScreen';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Rooms: undefined;
  Character: undefined;
  Room: { id: string };
  Session: { roomId: string; sessionId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Rooms" component={RoomsScreen} />
      <Stack.Screen name="Character" component={CharacterScreen} />
    </Stack.Navigator>
  );
}
