// screens/Help.jsx
import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

export default function Help() {
  const contactEmail = 'support@medicalassistantai.com';
  const contactPhone = '+1-800-555-1234';

  const openEmail = () => {
    Linking.openURL(`mailto:${contactEmail}`).catch(() =>
      alert('Could not open email client')
    );
  };

  const callPhone = () => {
    Linking.openURL(`tel:${contactPhone}`).catch(() =>
      alert('Could not open phone dialer')
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Need Help?</Text>

      <Text style={styles.text}>
        If you have any questions or need assistance, please contact our support team.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openEmail}>
        <Text style={styles.buttonText}>Email Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={callPhone}>
        <Text style={styles.buttonText}>Call Support</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        We are here to help you 24/7.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff' },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 30, color: '#333' },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  footerText: {
    marginTop: 50,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
