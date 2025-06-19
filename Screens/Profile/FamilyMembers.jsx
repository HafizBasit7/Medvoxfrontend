import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  useFamilyMembersQuery,
  useAddFamilyMemberMutation,
  useDeleteFamilyMemberMutation,
} from '../../features/auth/mutations';
import { useMessage } from '../../context/MessageContext';

const relationMap = {
  father: 'child',
  mother: 'child',
  brother: 'sibling',
  sister: 'sibling',
  son: 'parent',
  daughter: 'parent',
  husband: 'wife',
  wife: 'husband',
  uncle: 'nephew/niece',
  aunt: 'nephew/niece',
  nephew: 'uncle/aunt',
  niece: 'uncle/aunt',
  friend: 'friend',
  cousin: 'cousin',
};

const FamilyMembers = () => {
  const { showMessage } = useMessage();

  const [newMember, setNewMember] = useState({
    name: '',
    relation: '',
    memberEmail: '',
  });

  const {
    data: familyMembers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useFamilyMembersQuery();

  const { mutate: addMember, isLoading: isAdding } = useAddFamilyMemberMutation();
  const { mutate: deleteMember } = useDeleteFamilyMemberMutation();

  const [open, setOpen] = useState(false);
  const [relationItems, setRelationItems] = useState([]);

  useEffect(() => {
    const items = Object.keys(relationMap).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: key,
    }));
    setRelationItems(items);
  }, []);

  const handleSubmit = () => {
    if (!newMember.name || !newMember.relation || !newMember.memberEmail) {
      showMessage('error', 'Please fill all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMember.memberEmail)) {
      showMessage('error', 'Please enter a valid email address');
      return;
    }

    addMember(newMember, {
      onSuccess: (response) => {
        setNewMember({ name: '', relation: '', memberEmail: '' });
        refetch();
        showMessage('success', response.message);
      },
      onError: (err) => {
        showMessage('error', err?.response?.data?.error || 'Failed to add family member');
      },
    });
  };

 const handleDelete = (id) => {
  console.log('Deleting member with ID:', id); // ✅ Debug

  deleteMember(id, {
    onSuccess: () => {
      console.log('Successfully deleted');
      showMessage('success', 'Member deleted');
      refetch();
    },
    onError: (error) => {
      console.log('Delete error:', error?.response?.data);
      showMessage('error', 'Failed to delete');
    },
  });
};


  const renderMember = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.detail}>Relation: {item.relation}</Text>
          <Text style={styles.detail}>Email: {item.memberEmail}</Text>
          <Text style={styles.status}>
            {item.registered ? 'Registered' : 'Invitation Sent'}
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleDelete(item._id)} style={styles.deleteButton}>
          <Icon name="trash" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

 return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    style={styles.container}
  >
    {isLoading ? (
      <ActivityIndicator size="large" color="#4AD8B0" />
    ) : isError ? (
      <Text style={styles.errorText}>Failed to load members</Text>
    ) : (
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.heading}>Add Family Member</Text>

            <TextInput
              placeholder="Full Name"
              value={newMember.name}
              onChangeText={(text) => setNewMember({ ...newMember, name: text })}
              style={styles.input}
            />

            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={newMember.relation}
              items={relationItems}
              setValue={(callback) =>
                setNewMember((prev) => ({ ...prev, relation: callback(prev.relation) }))
              }
              setItems={setRelationItems}
              placeholder="Select Relation"
              containerStyle={{ marginBottom: open ? 180 : 16 }}
              style={styles.dropdown}
              dropDownContainerStyle={{ borderColor: '#ccc' }}
            />

            <TextInput
              placeholder="Email"
              value={newMember.memberEmail}
              onChangeText={(text) => setNewMember({ ...newMember, memberEmail: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleSubmit}
              disabled={isAdding}
            >
              {isAdding ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Add Member</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.subHeading}>Your Family Members</Text>
          </>
        }
        data={familyMembers}
        renderItem={renderMember}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    )}
  </KeyboardAvoidingView>
);

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  subHeading: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '500',
    color: '#4AD8B0',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#4AD8B0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  status: {
    marginTop: 6,
    fontSize: 13,
    fontStyle: 'italic',
    color: '#4AD8B0',
  },
  deleteButton: {
    padding: 10,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FamilyMembers;
