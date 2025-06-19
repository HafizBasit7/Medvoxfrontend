import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '../../api/axios';
import { useMessage } from '../../context/MessageContext'; 
const CreateProfileScreen = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { showMessage } = useMessage();

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return Alert.alert('Permission required', 'Please allow access to photos');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]); // For Expo SDK 48+
    }
  };

  const createProfile = async () => {
    const formData = new FormData();

    if (photo) {
      formData.append('photo', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      });
    }

    const res = await axiosClient.post('/profile/createProfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  };

  const { mutate } = useMutation({
    mutationFn: createProfile,
    onMutate: () => setLoading(true),
    onSuccess: async () => {
       showMessage('success', 'Profile created successfully');
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      navigation.navigate('Main');
    },
    onError: (error) => {
      console.error('[CreateProfile] error:', error?.response?.data || error);
      showMessage('error', error?.response?.data?.message || 'Failed to create profile');
    },
    onSettled: () => setLoading(false),
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Your Profile</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.image} />
        ) : (
          <Text style={styles.imageText}>Tap to upload profile photo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => mutate()} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Create Profile</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  imagePicker: {
    height: 150,
    width: 150,
    backgroundColor: '#eee',
    borderRadius: 75,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
  },
  imageText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  button: {
    backgroundColor: '#4AD8B0',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
