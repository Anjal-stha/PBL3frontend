import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const WIKIMEDIA_API_BASE_URL = 'https://en.wikipedia.org/w/api.php';

export default function DetailsScreen({ route }) {
  const { pageId, title, thumbnail, summary } = route.params;

  const [content, setContent] = useState(''); // Will hold the full extract fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFullArticleDetails();
  }, []);

  const fetchFullArticleDetails = async () => {
    try {
      const response = await fetch(
        `${WIKIMEDIA_API_BASE_URL}?action=query&prop=extracts&format=json&origin=*&pageids=${pageId}&exintro&explaintext`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Wikimedia API error: ${response.status}`);
      }

      const data = await response.json();
      const extract = data.query.pages[pageId]?.extract;

      setContent(extract || 'Full details could not be loaded.');

    } catch (error) {
      console.error('Error fetching full article from Wikimedia:', error);
      Alert.alert('Error', error.message || 'Failed to load full content.');
      setContent('Failed to load full details. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
  

    <SafeAreaView style = {styles.safeArea}>

   
    
    <ScrollView style={styles.container}>
      {/* Display Image at top */}
      {thumbnail && (
        <Image
          source={{ uri: thumbnail }}
          style={styles.topImage}
          onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
        />
      )}
      {/* Display Title */}
      <Text style={styles.title}>{String(title || 'No Title')}</Text>

      {/* About Section */}
      <Text style={styles.sectionHeading}>About</Text>
      <Text style={styles.summaryText}>{String(summary || 'No summary available.')}</Text>

      {/* Description / Full Extract Section */}
      <Text style={styles.sectionHeading}>Details</Text>
      {loading ? (
        <ActivityIndicator size="small" color="#007AFF" style={styles.loadingIndicator} />
      ) : (
        <Text style={styles.descriptionText}>{String(content)}</Text>
      )}
    </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
    safeArea: { // Style for the SafeAreaView itself
        flex: 1,
        backgroundColor: '#fff',},

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 0 : 0, // You can adjust this if needed for status bar, or use SafeAreaView
  },
  topImage: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 10,
    color: '#333',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    marginHorizontal: 16,
    lineHeight: 22,
    color: '#555',
  },
  descriptionText: {
    fontSize: 16,
    marginHorizontal: 16,
    lineHeight: 22,
    color: '#555',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
