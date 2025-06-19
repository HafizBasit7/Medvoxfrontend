// screens/HealthTips.jsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const healthTipsData = [
  {
    id: '1',
    title: '5 Tips to Boost Your Immune System',
    summary: 'Simple lifestyle changes to keep your immune system strong.',
    url: 'https://www.healthline.com/nutrition/how-to-boost-immune-health',
  },
  {
    id: '2',
    title: 'The Importance of Hydration',
    summary: 'Why drinking enough water is essential for good health.',
    url: 'https://www.medicalnewstoday.com/articles/290814',
  },
  {
    id: '3',
    title: 'How to Manage Stress Effectively',
    summary: 'Techniques and tips to reduce and manage stress.',
    url: 'https://www.apa.org/topics/stress/tips',
  },
  {
    id: '4',
    title: 'Healthy Eating on a Budget',
    summary: 'Affordable ways to eat nutritious meals.',
    url: 'https://www.cdc.gov/nutrition/resources-publications/healthy-eating-budget.html',
  },
];

export default function HealthTips() {
  const openArticle = (url) => {
    Linking.openURL(url).catch(() => alert('Failed to open article.'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Tips & Articles</Text>
      <FlatList
        data={healthTipsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openArticle(item.url)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.summary}>{item.summary}</Text>
            <Text style={styles.readMore}>Read More →</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No articles available.</Text>}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f2f9ff',
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#007AFF',
  },
  summary: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  readMore: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: 'gray',
    fontSize: 16,
  },
});
