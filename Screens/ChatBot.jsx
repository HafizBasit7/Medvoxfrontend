import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ChatBot = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [imageUri, setImageUri] = useState(route.params?.imageUri || null);

// useEffect(() => {
//   const transcript = route.params?.transcript;
//   if (typeof transcript === 'string') {
//     const chatLines = transcript.split('\n');
//     const formatted = chatLines.map((line, index) => ({
//       id: Date.now() + index,
//       text: line.trim(),
//       sender: index % 2 === 0 ? 'user' : 'bot',
//     }));
//     setMessages(prev => [...prev, ...formatted]);
//   }
// }, [route.params?.transcript]);

// const res = await fetch('https://your-backend-api/analyze-image', {
//   method: 'POST',
//   body: JSON.stringify({ imageUri }),
//   headers: { 'Content-Type': 'application/json' },
// });
// const aiMessage = await res.json();

useEffect(() => {
  const transcript = route.params?.transcript;
  const incomingImage = route.params?.imageUri;

  // If it's a transcript from voice input
  if (typeof transcript === 'string') {
    const chatLines = transcript.split('\n');
    const formatted = chatLines.map((line, index) => ({
      id: Date.now() + index,
      text: line.trim(),
      sender: index % 2 === 0 ? 'user' : 'bot',
    }));
    setMessages(prev => [...prev, ...formatted]);
  }

  // If imageUri is passed via navigation (like from ReportAnalyzer)
  if (incomingImage && incomingImage !== imageUri) {
    setImageUri(incomingImage);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'user',
        text: '[Report Image Uploaded]',
        image: incomingImage,
      },
    ]);

    // Simulate bot analyzing image
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Analyzing the report image... 🧠',
        },
      ]);
    }, 1000);

    // Simulated AI response (you can call your API here later)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: 'bot',
          text: 'This looks like a blood test report. Your hemoglobin levels are within normal range. 👍',
        },
      ]);
    }, 3000);
  }
}, [route.params?.transcript, route.params?.imageUri]);


  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
    // Simulate bot reply
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'This is a sample AI reply.', sender: 'bot' }]);
    }, 1000);
    setInput('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setMessages(prev => [...prev, { id: Date.now(), text: '[Image uploaded]', sender: 'user', image: uri }]);
    }
  };

  const goToVoiceChat = () => {
    navigation.navigate('VoiceChatScreen', {
      imageUri,
      onVoiceChatEnd: (transcript) => {
        setMessages(prev => [...prev, { id: Date.now(), text: transcript, sender: 'bot' }]);
      },
    });
  };

 return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={0} // adjust based on header height
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Chat with MedVox AI</Text>
        </View>

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}

        <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 80 }}>
          {messages.map(msg => (
            <View key={msg.id} style={[styles.messageBubble, msg.sender === 'user' ? styles.user : styles.bot]}>
              {msg.image ? (
                <Image source={{ uri: msg.image }} style={styles.chatImage} />
              ) : (
                <Text style={styles.messageText}>{msg.text}</Text>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Ionicons name="image" size={24} color="#3DAB9B" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToVoiceChat}>
            <Ionicons name="mic" size={24} color="#3DAB9B" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#3DAB9B" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

};

export default ChatBot;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 3,
     position: 'relative',
  },
  title: {
  position: 'absolute',
  left: 0,
  right: 0,
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 'bold',
},
  chatContainer: { flex: 1, padding: 10 },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: '80%',
  },
  user: {
    backgroundColor: '#3DAB9B',
    alignSelf: 'flex-end',
  },
  bot: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: { color: '#000' },
  chatImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    marginLeft: 10,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 12,
    margin: 10,
    alignSelf: 'center',
  },
});
