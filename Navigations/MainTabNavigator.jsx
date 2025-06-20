import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeStack from "../Stack/HomeStack";
import ProfileStack from "../Stack/ProfileStack";
import ChatStack from '../Stack/ChatStack'
import ScannerStack  from "../Stack/ScannerStack";
import HistoryScreen from "../Screens/HistoryScreen";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";



const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "";
  const hiddenRoutes = ["MedicineAnalyzer", "VoiceChatScreen", "ReportAnalyzerScreen", "ChatBot", "EditProfile", "FamilyMembers", "Notifications", "QuestionnaireHistory","UpdateQuestionnaire"];
  return !hiddenRoutes.includes(routeName);
};

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.customButton}>{children}</View>
  </TouchableOpacity>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Chat":
              iconName = "chatbubble-outline";
              break;
            case "Scanner":
              iconName = "camera-outline";
              break;
            case "History":
              iconName = "time-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#3DAB9B",
        tabBarInactiveTintColor: "gray",
      })}
    >
      
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({ route }) => ({
          
          tabBarStyle: {
            display: getTabBarVisibility(route) ? "flex" : "none",
          },
          
        })}
      />
     
     <Tab.Screen name="Chat" component={ChatStack}
     options={({ route }) => ({
          
          tabBarStyle: {
            display: getTabBarVisibility(route) ? "flex" : "none",
          },
          
        })}
      
     />
        <Tab.Screen
        name="Scanner"
        component={ScannerStack}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: () => (
            <MaterialCommunityIcons name="barcode-scan" size={30} color="#fff" />
          ),
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#FFBF08",
          tabBarInactiveTintColor: "white",
        }}
      />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route) ? "flex" : "none",
          },
        })}
      />

   
      
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customButton: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "#3DAB9B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 5,
  },
});
export default MainTabNavigator;
