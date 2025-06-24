// app/assets/screens/EventsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WIKIMEDIA_API_BASE_URL = 'https://en.wikipedia.org/w/api.php';

export default function EventsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('Japan festivals'); // Default search for events
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const eventKeywords = ['festival', 'exhibition', 'concert', 'event', 'show', 'parade', 'celebration', 'fair'];

  const fetchWikimediaData = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${WIKIMEDIA_API_BASE_URL}?action=query&format=json&origin=*&prop=pageimages|description&generator=search&gsrsearch=${encodeURIComponent(
          searchTerm
        )}&gsrlimit=20&piprop=thumbnail&pithumbsize=200` // Increased gsrlimit
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Wikimedia API error: ${response.status}`);
      }

      const json = await response.json();
      const pages = json?.query?.pages || {};
      let data = Object.values(pages).map((item) => ({
        id: item.pageid,
        title: item.title,
        thumbnail: item?.thumbnail?.source,
        description: item?.description,
      }));

      // Client-side filtering for events
      data = data.filter(item => {
        const lowerTitle = item.title?.toLowerCase() || '';
        const lowerDesc = item.description?.toLowerCase() || '';
        return eventKeywords.some(keyword => lowerTitle.includes(keyword) || lowerDesc.includes(keyword));
      });

      setResults(data);
    } catch (error) {
      console.error('Wikimedia API error (Events):', error);
      Alert.alert('Error', error.message || 'Failed to load events.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWikimediaData(search);
  }, []);

  const handleSearch = () => {
    fetchWikimediaData(search);
  };

  const handlePressBox = (item) => {
    navigation.navigate('Details', {
      pageId: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      summary: item.description
    });
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events (e.g., festival, concert)..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
        />
        <MaterialIcons name="menu" size={24} color="#999" />
      </View>

      {/* Loading Spinner */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.eventsGrid}>
          {results.length > 0 ? (
            results.map((spot) => (
              <TouchableOpacity key={spot.id} style={styles.eventBox} onPress={() => handlePressBox(spot)}>
                <Image
                  source={
                    spot.thumbnail
                      ? { uri: spot.thumbnail }
                      : require('./placeholder.png') // Adjust path if needed
                  }
                  style={styles.eventImage}
                />
                <Text style={styles.eventTitle}>{spot.title}</Text>
                {spot.description && (
                  <Text style={styles.eventDesc}>{spot.description}</Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No events found. Try a different search!</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 50,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  eventDesc: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 3,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});