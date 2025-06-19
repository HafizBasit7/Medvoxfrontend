import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import FAQ from '../Screens/FAQ';
import Help from '../Screens/Help';
import MyFamily from '../Screens/Profile/MyFamily';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import FamilyMembers from '../Screens/Profile/FamilyMembers';
import Notifications from '../Screens/Profile/Notification';

const ProfileStackNavigator = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: '#007AFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <ProfileStackNavigator.Screen 
        name="ProfileSettings" 
        component={ProfileScreen} 
        options={{ title: 'Profile & Settings' }} 
      />
      <ProfileStackNavigator.Screen 
        name="FAQ" 
        component={FAQ} 
        options={{ title: 'FAQ' }} 
      />
      <ProfileStackNavigator.Screen 
        name="Help" 
        component={Help} 
        options={{ title: 'Help' }}
      />
      {/* <ProfileStackNavigator.Screen 
        name="MyFamily" 
        component={MyFamily} 
        options={{ headerShown: false }} 
      /> */}
      <ProfileStackNavigator.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ headerShown: false }} 
      />
      {/* Add the new Family Members Screen */}
      <ProfileStackNavigator.Screen
        name="FamilyMembers"
        component={FamilyMembers}
        options={{
          headerShown: false,
          title: 'Family Members',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      />
      {/* Add the new Notifications Screen */}
      <ProfileStackNavigator.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          title: 'Notifications',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
}