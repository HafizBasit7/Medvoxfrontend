// screens/FitnessActivity.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function FitnessActivity() {
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [log, setLog] = useState([]);

  const addActivity = () => {
    if (activity.trim() && duration.trim()) {
      const newLog = {
        id: Date.now().toString(),
        activity,
        duration,
        date: new Date().toLocaleDateString(),
      };
      setLog([newLog, ...log]);
      setActivity('');
      setDuration('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fitness & Activity</Text>

      <TextInput
        style={styles.input}
        placeholder="Activity (e.g., Walking, Gym, Yoga)"
        value={activity}
        onChangeText={setActivity}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (e.g., 30 mins)"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.button} onPress={addActivity}>
        <Text style={styles.buttonText}>Log Activity</Text>
      </TouchableOpacity>

      <FlatList
        data={log}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text style={styles.activityText}>{item.activity} - {item.duration}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No activity logged yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logItem: {
    backgroundColor: '#d7f0db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  activityText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dateText: {
    fontSize: 12,
    color: 'gray',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 30,
  },
});
