    import React, { useState, useEffect } from 'react';
    import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
    import * as ImagePicker from 'expo-image-picker';
    import { useNavigation } from '@react-navigation/native';

    const MedicineAnalyzer = () => {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Required', 'Camera access is needed to take pictures of medicines.');
        }
        })();
    }, []);

    const pickImageFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        navigation.navigate('VoiceChatScreen', { imageUri: result.assets[0].uri });
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        navigation.navigate('VoiceChatScreen', { imageUri: result.assets[0].uri });
        }

    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Medicine Analyzer</Text>
        <Text style={styles.tittle}>Capture/ Upload Medicine Pic</Text>

        <TouchableOpacity style={styles.button} onPress={pickImageFromLibrary}>
            <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.buttonText}>Take a Photo</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={styles.preview} />}
        </View>
    );
    };

    export default MedicineAnalyzer;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tittle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#3DAB9B',
        padding: 15,
        marginVertical: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
    },
    preview: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    }
    });
