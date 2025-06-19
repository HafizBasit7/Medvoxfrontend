import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import MedicineAnalyzer from '../Screens/MedicineAnalyzer';
import ChatBot from '../Screens/ChatBot';
import VoiceChatScreen from '../Screens/VoiceChatScreen';
import HistoryScreen from '../Screens/HistoryScreen';
import ReportAnalyzerScreen from '../Screens/ReportAnalyzerScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MedicineAnalyzer" component={MedicineAnalyzer} />
      <Stack.Screen name="ChatBot" component={ChatBot} />
      <Stack.Screen name="VoiceChatScreen" component={VoiceChatScreen} />
      <Stack.Screen name="ReportAnalyzerScreen" component={ReportAnalyzerScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    
    </Stack.Navigator>
  );
};

export default HomeStack;
