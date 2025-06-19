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
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function EventsScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('Japan tourism');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWikimediaData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|description&generator=search&gsrsearch=${encodeURIComponent(
          search
        )}&gsrlimit=10&piprop=thumbnail&pithumbsize=200`
      );
      const json = await response.json();
      const pages = json?.query?.pages || {};
      const data = Object.values(pages).map((item) => ({
        id: item.pageid,
        title: item.title,
        thumbnail: item?.thumbnail?.source,
        description: item?.description,
      }));
      setResults(data);
    } catch (error) {
      console.error('Wikimedia API error:', error);
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
        <ScrollView contentContainerStyle={styles.eventsGrid}>
          {results.map((spot) => (
            <TouchableOpacity key={spot.id} style={styles.eventBox}>
              <Image
                source={
                  spot.thumbnail
                    ? { uri: spot.thumbnail }
                    : require('./placeholder.png') // fallback image
                }
                style={styles.eventImage}
              />
              <Text style={styles.eventTitle}>{spot.title}</Text>
              {spot.description && (
                <Text style={styles.eventDesc}>{spot.description}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    textAlign: 'center',
  },
  eventDesc: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
