import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

const MyFamily = ({ navigation }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleAddMember = () => {
    if (!name.trim() || !relation.trim()) {
      Alert.alert('Validation', 'Please enter both name and relation.');
      return;
    }

    const newMember = {
      id: Date.now().toString(),
      name,
      relation,
    };

    setFamilyMembers(prev => [...prev, newMember]);
    setName('');
    setRelation('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Family</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Member Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Relation (e.g., Father)"
          value={relation}
          onChangeText={setRelation}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {familyMembers.length === 0 ? (
        <Text style={styles.emptyText}>No family members added yet.</Text>
      ) : (
        <FlatList
          data={familyMembers}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}.</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.relation}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default MyFamily;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3DAB9B',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#3DAB9B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 30,
  },
});
