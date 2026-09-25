/**
 * Rooms Screen
 * 
 * List of available rooms.
 * Will integrate with @4eye/core rooms module.
 */

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';

type RoomsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Rooms'>;

// TODO: Replace with real data from @4eye/core
const MOCK_ROOMS = [
  { id: '1', name: 'Sunday Service', memberCount: 150 },
  { id: '2', name: 'Bible Study', memberCount: 25 },
  { id: '3', name: 'Youth Group', memberCount: 40 },
];

export function RoomsScreen() {
  const navigation = useNavigation<RoomsNavigationProp>();

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ROOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomCard}
            onPress={() => navigation.navigate('Room', { id: item.id })}
          >
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.memberCount}>{item.memberCount} members</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  roomCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 14,
    color: '#666',
  },
});
