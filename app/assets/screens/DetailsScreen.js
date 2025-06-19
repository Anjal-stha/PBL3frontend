// DetailsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { pageId } = route.params;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&origin=*&pageids=${pageId}&exintro&explaintext`
    );
    const data = await response.json();
    const extract = data.query.pages[pageId]?.extract;
    setContent(extract);
    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
});
