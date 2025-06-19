// screens/DietNutrition.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function DietNutrition() {
  const [meal, setMeal] = useState('');
  const [calories, setCalories] = useState('');
  const [entries, setEntries] = useState([]);

  const addEntry = () => {
    if (meal.trim() && calories.trim()) {
      const newEntry = {
        id: Date.now().toString(),
        meal,
        calories,
        date: new Date().toLocaleDateString(),
      };
      setEntries([newEntry, ...entries]);
      setMeal('');
      setCalories('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Diet & Nutrition</Text>

      <TextInput
        style={styles.input}
        placeholder="Meal Description (e.g., Breakfast, Salad)"
        value={meal}
        onChangeText={setMeal}
      />

      <TextInput
        style={styles.input}
        placeholder="Calories (e.g., 350)"
        value={calories}
        onChangeText={setCalories}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={addEntry}>
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryItem}>
            <Text style={styles.mealText}>{item.meal}</Text>
            <Text style={styles.caloriesText}>{item.calories} kcal</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No diet entries yet.</Text>}
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
  entryItem: {
    backgroundColor: '#fff4e5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealText: {
    fontSize: 16,
    fontWeight: '700',
  },
  caloriesText: {
    fontSize: 14,
    color: '#e67e22',
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
