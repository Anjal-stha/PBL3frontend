// app/assets/screens/DiscoverScreen.js
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

export default function DiscoverScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('Japan tourism'); // Initial search for tourist spots
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const touristSpotKeywords = ['park', 'castle', 'temple', 'shrine', 'garden', 'museum', 'landmark', 'tower'];

  const fetchWikimediaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${WIKIMEDIA_API_BASE_URL}?action=query&format=json&origin=*&prop=pageimages|description&generator=search&gsrsearch=${encodeURIComponent(
          search
        )}&gsrlimit=20&piprop=thumbnail&pithumbsize=200` // Increased gsrlimit
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Wikimedia API error: ${response.status}`);
      }

      const json = await response.json();
      const pages = json?.query?.pages || {};
      const data = Object.values(pages).map((item) => ({
        id: item.pageid,
        title: item.title,
        thumbnail: item?.thumbnail?.source,
        description: item?.description,
      }));

      // Optional: Basic client-side filtering for tourist spots if you want it more specific
      const filteredData = data.filter(item => {
        const lowerTitle = item.title?.toLowerCase() || '';
        const lowerDesc = item.description?.toLowerCase() || '';
        return touristSpotKeywords.some(keyword => lowerTitle.includes(keyword) || lowerDesc.includes(keyword));
      });

      setResults(filteredData.length > 0 ? filteredData : data); // If no filter matches, show all
      
    } catch (error) {
      console.error('Wikimedia API error (Discover):', error);
      Alert.alert('Error', error.message || 'Failed to load tourist spots.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWikimediaData();
  }, []);

  const handleSearch = () => {
    fetchWikimediaData();
  };

  const handlePressBox = (item) => {
    navigation.navigate('Details', {
      pageId: item.id,
      title: item.title,
      thumbnail: item.thumbnail,
      summary: item.description,
    });
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tourist spots..."
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
        <ScrollView contentContainerStyle={styles.discoverGrid}>
          {results.length > 0 ? (
            results.map((spot) => (
              <TouchableOpacity
                key={spot.id}
                style={styles.discoverBox}
                onPress={() => handlePressBox(spot)}
              >
                <Image
                  source={
                    spot.thumbnail
                      ? { uri: spot.thumbnail }
                      : require('./placeholder.png') // Adjust path if needed
                  }
                  style={styles.discoverImage}
                />
                <Text style={styles.discoverTitle}>{spot.title}</Text>
                {spot.description && (
                  <Text style={styles.discoverDesc}>{spot.description}</Text>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultsText}>No tourist spots found. Try a different search!</Text>
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
  discoverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingBottom: 80,
  },
  discoverBox: {
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
  discoverImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  discoverTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  discoverDesc: {
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