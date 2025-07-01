// app/assets/screens/AddFriendsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFriends } from './FriendsContext'; // Import our custom hook

// Define your bot accounts
const botAccounts = [
  { id: 'bot1', name: 'Brandon' },//////////////changed this only the name *********************************
  { id: 'bot2', name: 'Anjal' },
  { id: 'bot3', name: 'Yarik' },
  { id: 'bot4', name: 'Faiq' },
  { id: 'bot5', name: 'Nao' },
  { id: 'bot6', name: 'Choi' },
];

export default function AddFriendsScreen() {
  const navigation = useNavigation();
  const { addFriend, friends } = useFriends(); // Get addFriend function and current friends list

  const handleAddBot = (bot) => {
    // Check if the bot is already in the friends list
    const isAlreadyAdded = friends.some(friend => friend.id === bot.id);
    if (isAlreadyAdded) {
      Alert.alert('Already Added', `${bot.name} is already in your friends list!`);
    } else {
      addFriend(bot); // Add the bot using the context function
      Alert.alert('Friend Added!', `${bot.name} has been added to your friends list.`);
    }
  };

  const renderBotItem = ({ item }) => {
    const isAlreadyAdded = friends.some(friend => friend.id === item.id);
    return (
      <View style={styles.botItem}>
        <Ionicons name="person" size={40} color="#6A0DAD" />
        <Text style={styles.botName}>{item.name}</Text>
        <TouchableOpacity
          style={[styles.addButton, isAlreadyAdded && styles.addedButton]}
          onPress={() => handleAddBot(item)}
          disabled={isAlreadyAdded} // Disable button if already added
        >
          <Text style={styles.addButtonText}>{isAlreadyAdded ? 'Added' : 'Add'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Friends</Text>
        <View style={{ width: 28 }} /> {/* Placeholder to balance header */}
      </View>

      <FlatList
        data={botAccounts}
        renderItem={renderBotItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.botList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'android' ? 25 : 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  botList: {
    paddingHorizontal: 20,
  },
  botItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  botName: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1, // Allows name to take up available space
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addedButton: {
    backgroundColor: '#ccc', // Gray out if already added
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
