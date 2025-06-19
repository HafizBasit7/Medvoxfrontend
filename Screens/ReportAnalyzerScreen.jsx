import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ReportAnalyzerScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePick = async (fromCamera = false) => {
    let permissionResult = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera or gallery access is required.');
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 1, allowsEditing: true })
      : await ImagePicker.launchImageLibraryAsync({ quality: 1, allowsEditing: true });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please upload or capture a report first.');
      return;
    }
    navigation.navigate('ChatBot', { imageUri: selectedImage });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report Analyzer</Text>

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      ) : (
        <View style={styles.placeholder}>
          <Ionicons name="image-outline" size={80} color="#ccc" />
          <Text style={styles.placeholderText}>No report selected</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => handleImagePick(false)}>
        <Ionicons name="image" size={20} color="#fff" />
        <Text style={styles.buttonText}>Pick from Gallery</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleImagePick(true)}>
        <Ionicons name="camera" size={20} color="#fff" />
        <Text style={styles.buttonText}>Capture with Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.analyzeBtn]} onPress={handleAnalyze}>
        <Ionicons name="chatbubbles" size={20} color="#fff" />
        <Text style={styles.buttonText}>Analyze with AI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportAnalyzerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3DAB9B',
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#aaa',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3DAB9B',
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzeBtn: {
    backgroundColor: '#2c8e79',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
  },
});
