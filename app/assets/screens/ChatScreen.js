// app/assets/screens/ChatScreen.js
import React, { useState } from 'react'; // <--- Import useState
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, 
  TextInput,        
  FlatList,       
  KeyboardAvoidingView, 
  Platform,       
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // <--- Import Ionicons for the send icon
import { useNavigation, useRoute } from '@react-navigation/native'; // Keep useNavigation and useRoute
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const navigation = useNavigation(); // Get navigation object for back button
  const route = useRoute();
  const { friendName, friendId } = route.params; // Get friendName and friendId

  // State to hold messages (only user's messages for now)
  const [messages, setMessages] = useState([]);
  // State to hold the text currently being typed in the input field
  const [inputText, setInputText] = useState('');

  // Function to handle sending a message
  const handleSendMessage = () => {
    // Check if the input text is not empty or just whitespace
    if (inputText.trim()) {
      // Add the new message to the messages array
      // Assign a unique ID (using Math.random() for prototype)
      // Mark sender as 'user'
      setMessages(prevMessages => [
        
        { id: Math.random().toString(), text: inputText.trim(), sender: 'user' },
        ...prevMessages,
      ]);
      // Clear the input field after sending
      setInputText('');
    }
  };

  // Function to render each message item in the FlatList
  const renderMessageItem = ({ item }) => (
    <View style={[
      styles.messageBubble,
      // Apply different styles based on sender to differentiate user's messages
      item.sender === 'user' ? styles.userMessage : styles.botMessage, // 'botMessage' will not be used for now
    ]}>
      <Text style={item.sender === 'user' ? styles.userMessageText : styles.botMessageText}>
        {String(item.text)} {/* Ensure text is a string */}
      </Text>
    </View>
  );

  return (
    // KeyboardAvoidingView helps move the input field up when the keyboard appears
    <SafeAreaView style={styles.safeArea}>
       <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
    >
      {/* Header Section */}
   
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{String(friendName)}</Text> {/* Display friend's name */}
        <View style={{ width: 28 }} /> 
      </View>

      {/* Message List Area */}
      <FlatList
        data={messages} // Data source for messages
        renderItem={renderMessageItem} // Function to render each item
        keyExtractor={(item) => String(item.id)} // Unique key for each message
        contentContainerStyle={styles.messagesList}
        inverted // Displays latest messages at the bottom, scrolling up
      />

      {/* Message Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={inputText} 
          onChangeText={setInputText} 
          onSubmitEditing={handleSendMessage} 
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
     
    </KeyboardAvoidingView>

    </SafeAreaView>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flex: 1,
    backgroundColor: '#f0f0f0',// Adjust for status bar on Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  safeArea:{
    flex:1,

  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexGrow: 1, // Allows FlatList to grow and push content up
    justifyContent: 'flex-end', // Keeps messages at the bottom
  },
  messageBubble: {
    maxWidth: '75%', // Limit message bubble width
    padding: 10,
    borderRadius: 15,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end', // User messages on the right
    backgroundColor: '#007AFF',
    marginRight: 5,
  },
  botMessage: { // Style for bot messages (not used for now, but good to have)
    alignSelf: 'flex-start', // Bot messages on the left
    backgroundColor: '#fff',
    marginLeft: 5,
  },
  userMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  botMessageText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8, // Adjust vertical padding for OS
    marginRight: 10,
    maxHeight: 100, // Prevent input from becoming too tall
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
