import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useUpdateProfileMutation } from '../../features/auth/mutations';
import { useQueryClient } from '@tanstack/react-query';

const EditProfileScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isLoading: isUpdating } = useUpdateProfileMutation();
  
  const [formData, setFormData] = useState({
  name: params?.profile?.name || '',
  email: params?.profile?.email || '',
  photoUrl: params?.profile?.photo || null, // was photoUrl
});

  const [isUploadingImage, setIsUploadingImage] = useState(false);

 const handleImageUpload = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need access to your photos');
      return;
    }

    setIsUploadingImage(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri) {
        setFormData((prev) => ({ ...prev, photoUrl: uri }));
      } else {
        Alert.alert('Error', 'No image selected');
      }
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to select image');
    console.error('[ImagePicker Error]', error);
  } finally {
    setIsUploadingImage(false);
  }
};

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    updateProfile(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries(['me']);
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImageUpload} disabled={isUploadingImage}>
          <View style={styles.avatarContainer}>
            {formData.photoUrl ? (
              <Image source={{ uri: formData.photoUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="person" size={40} color="#fff" />
              </View>
            )}
            <View style={styles.cameraIconContainer}>
              {isUploadingImage ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Icon name="camera" size={20} color="#fff" />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
          placeholder="Enter your full name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      {/* Add more fields as needed */}

      <TouchableOpacity 
        style={[
          styles.saveButton,
          isUpdating && { opacity: 0.7 }
        ]} 
        onPress={handleSubmit}
        disabled={isUpdating}
      >
        {isUpdating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4AD8B0',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4AD8B0',
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4AD8B0',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#4AD8B0',
    fontSize: 16,
    fontWeight: '500',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: '#4AD8B0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;