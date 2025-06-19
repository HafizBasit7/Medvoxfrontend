import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import * as Speech from 'expo-speech';

const VoiceChatScreen = ({ navigation, route }) => {
  const [isListening, setIsListening] = useState(false);
  const [recording, setRecording] = useState(null);
  const [botResponse, setBotResponse] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [transcript, setTranscript] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const imageUri = route.params?.imageUri || null;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      endVoiceChat();
      return;
    }
    if (isListening) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isListening]);

 const startListening = async () => {
  setIsListening(true);
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    setRecording(recording);
  } catch (err) {
    console.error('Error starting recording', err);
  }
};


  const stopListening = async () => {
  setIsListening(false);
  try {
    if (!recording) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setIsLoading(true);
    const fileInfo = await FileSystem.getInfoAsync(uri);

    const formData = new FormData();
    formData.append('audio', {
      uri,
      name: 'voice.wav',
      type: 'audio/wav',
    });

    const response = await fetch('http://<YOUR_BACKEND_URL>/transcribe', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: formData,
    });

    const data = await response.json();
    if (data.transcript) {
      const userLine = `You: ${data.transcript}`;
      const aiLine = `AI: ${data.response}`;
      setTranscript(prev => [...prev, userLine, aiLine]);
      setBotResponse(data.response);
      Speech.speak(data.response);
    }
  } catch (err) {
    console.error('Error handling audio', err);
  } finally {
    setIsLoading(false);
  }
};


  const endVoiceChat = () => {
    navigation.navigate('ChatBot', { transcript, imageUri });
  };

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={endVoiceChat}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.timer}>{timeLeft}s</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.botImage} />}
        <View style={styles.botMessageBox}>
          {transcript.map((line, idx) => (
            <Text key={idx} style={styles.botMessageText}>{line}</Text>
          ))}
        </View>

        <View style={styles.voiceContainer}>
          <Animated.View style={[styles.micButton, { transform: [{ scale: pulseAnim }] }]}>

            <TouchableOpacity
              onPress={async () => {
                  if (!isListening) {
                    await startListening();
                  } else {
                    await stopListening();
                  }
                }}
             
              style={styles.micButtonInner}
            >
              <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={40} color="white" />
            </TouchableOpacity>
          </Animated.View>
          <Text style={styles.voicePrompt}>{isListening ? 'Listening...' : 'Hold to talk'}</Text>
        </View>
        {isLoading && <ActivityIndicator size="large" color="#fff" />}
      </View>

      <TouchableOpacity onPress={endVoiceChat} style={styles.endButton}>
        <Text style={styles.endButtonText}>End Voice Chat</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  timer: { color: 'white', fontSize: 16 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  botImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 30, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)' },
  botMessageBox: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: 15, marginBottom: 40, maxHeight: 200 },
  botMessageText: { color: 'white', fontSize: 15, textAlign: 'left', marginVertical: 2 },
  voiceContainer: { alignItems: 'center', marginBottom: 40 },
  micButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  micButtonInner: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#ff4757', justifyContent: 'center', alignItems: 'center' },
  voicePrompt: { color: 'white', fontSize: 16, textAlign: 'center' },
  endButton: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 30, margin: 20, alignItems: 'center' },
  endButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default VoiceChatScreen;
