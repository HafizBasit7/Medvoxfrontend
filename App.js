// App.js
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from "./Navigations/RootNavigator";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MessageProvider } from './context/MessageContext'; // ✅ Import the MessageProvider

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MessageProvider> 
            <StatusBar style="dark" />
            <RootNavigator />
          </MessageProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
