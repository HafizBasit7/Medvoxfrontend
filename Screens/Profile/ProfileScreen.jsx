import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useLogoutMutation } from '../../features/auth/mutations';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../features/auth/api';

const ProfileScreen = () => {
  const { mutate: logout } = useLogoutMutation();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: getUserData,
  });

  if (isLoading) return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4AD8B0" />
    </View>
  );

  if (isError) return (
    <View style={styles.loadingContainer}>
      <Text>Error loading profile</Text>
    </View>
  );

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout() },
    ]);
  };

  const renderMenuItem = (icon, title, color = '#000', screen = '', params = {}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        if (screen) {
          navigation.navigate(screen, params);
        } else {
          handleLogout();
        }
      }}
    >
      <View style={[styles.menuIcon, color === 'red' && { backgroundColor: '#FFEBEE' }]}>
        <Icon name={icon} size={20} color={color === 'red' ? '#F44336' : '#4AD8B0'} />
      </View>
      <Text style={[styles.menuText, color === 'red' && { color: '#F44336' }]}>{title}</Text>
      <Icon name="chevron-forward" size={20} color="#ccc" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user?.photoUrl ? (
            <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>
        <Text style={styles.name}>{user?.name || 'User Name'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      </View>

      <View style={styles.menu}>
        {renderMenuItem('create', 'Edit Profile', '#000', 'EditProfile')}
        {/* {renderMenuItem('people', 'My Family', '#000', 'MyFamily')} */}
        {renderMenuItem('people-circle', 'Family Members', '#000', 'FamilyMembers')}
        {renderMenuItem('notifications', 'Notifications', '#000', 'Notifications')}
        {renderMenuItem('heart', 'Health Reports', '#000', 'QuestionnaireHistory')}

        {renderMenuItem('help-circle', 'Help Center', '#000', 'Help')}
        {renderMenuItem('settings', 'Account Settings', '#000', 'SettingsScreen')}
        {renderMenuItem('document-text', 'Terms & Privacy', '#000', 'Terms')}
        {renderMenuItem('log-out', 'Logout', 'red')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4AD8B0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
  },
  name: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    fontWeight: '600',
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  menu: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuIcon: {
    marginRight: 15,
    backgroundColor: '#E6FAF5',
    padding: 10,
    borderRadius: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;