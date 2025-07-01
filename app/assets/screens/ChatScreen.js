// app/assets/screens/ChatScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native'; // Only import what's needed for this test
import { useRoute } from '@react-navigation/native'; // Keep useRoute to access params

export default function ChatScreen() {
  const route = useRoute();
  const { friendName } = route.params; // Get friendName for the test

  return (
    <View style={styles.container}>
      <Text style={styles.testText}>Hello from Chat Screen for {friendName}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  testText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});