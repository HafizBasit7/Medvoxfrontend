// screens/Notifications.jsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const initialNotifications = [
  {
    id: '1',
    title: 'Medication Reminder',
    message: 'It\'s time to take your blood pressure medication.',
    date: '2025-05-30 08:00 AM',
    read: false,
  },
  {
    id: '2',
    title: 'New Health Tip Available',
    message: 'Check out the latest article on managing stress.',
    date: '2025-05-29 12:00 PM',
    read: true,
  },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationCard, item.read ? styles.read : styles.unread]}
            onPress={() => markAsRead(item.id)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications.</Text>}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 28, fontWeight: '700', marginBottom: 15 },
  notificationCard: {
    backgroundColor: '#f5f7fb',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  unread: {
    backgroundColor: '#d0e8ff',
  },
  read: {
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
    fontSize: 16,
  },
});
