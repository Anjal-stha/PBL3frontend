import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function EventsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  // 🔁 Replace this later with real API data
  const demoEvents = [
    { id: 1, title: 'Events 1', image: { uri: 'https://picsum.photos/200/300?1' } },
    { id: 2, title: 'Events 2', image: { uri: 'https://picsum.photos/200/300?2' } },
    { id: 3, title: 'Events 3', image: { uri: 'https://picsum.photos/200/300?3' } },
    { id: 4, title: 'Events 4', image: { uri: 'https://picsum.photos/200/300?4' } },
    { id: 5, title: 'Events 5', image: { uri: 'https://picsum.photos/200/300?5' } },
    { id: 6, title: 'Events 6', image: { uri: 'https://picsum.photos/200/300?6' } },
  ];

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Find Events"
          value={search}
          onChangeText={setSearch}
        />
        <MaterialIcons name="menu" size={24} color="#999" />
      </View>

      {/* 🗂️ Event Grid (Replace with API loop later) */}
      <ScrollView contentContainerStyle={styles.eventsGrid}>
        {demoEvents.map((event) => (
          <View key={event.id} style={styles.eventBox}>
            <Image source={event.image} style={styles.eventImage} />
            <Text style={styles.eventTitle}>{event.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 🔻 Bottom Navigation */}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  eventsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 80,
  },
  eventBox: {
    width: '45%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
