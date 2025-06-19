// screens/FAQ.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const faqData = [
  {
    id: '1',
    question: 'How do I track my medication?',
    answer: 'Go to the Medication Tracker screen and add your medications with reminders.',
  },
  {
    id: '2',
    question: 'Is my health data secure?',
    answer: 'Yes, your data is encrypted and securely stored in compliance with healthcare standards.',
  },
  {
    id: '3',
    question: 'Can I chat with a doctor anytime?',
    answer: 'Our AI doctor is available 24/7 for general advice. For emergencies, contact a real healthcare professional.',
  },
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>

      {faqData.map(({ id, question, answer }) => (
        <View key={id} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleExpand(id)}>
            <Text style={styles.question}>{question}</Text>
          </TouchableOpacity>
          {expandedId === id && <Text style={styles.answer}>{answer}</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 20 },
  faqItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  answer: {
    marginTop: 8,
    fontSize: 15,
    color: '#333',
  },
});
