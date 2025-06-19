import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VoiceChatScreen from '../Screens/VoiceChatScreen';
import ChatBot from '../Screens/ChatBot'

const Stack = createNativeStackNavigator();

const ChatStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ChatBot" 
      component={ChatBot} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen name="VoiceChatScreen" component={VoiceChatScreen} 
    options={{ headerShown: false }} 
    />
  </Stack.Navigator>
);

export default ChatStack;