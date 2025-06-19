import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScannerScreen from '../Screens/ScannerScreen';
import ChatBot from '../Screens/ChatBot';

const Stack = createNativeStackNavigator();

const ChatStack = () => (
  <Stack.Navigator>
     <Stack.Screen name="ScannerScreen" component={ScannerScreen} 
    options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="ChatBot" 
      component={ChatBot} 
      options={{ headerShown: false }} 
    />
   
  </Stack.Navigator>
);

export default ChatStack;