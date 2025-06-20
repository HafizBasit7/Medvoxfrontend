import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../Stack/AuthStack';
import MainTabNavigator from './MainTabNavigator';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStatus } from '../features/auth/queries';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../features/auth/api';
import CreateProfileScreen from '../Screens/Profile/CreateProfileScreen';
import { fetchQuestionnaire } from '../features/auth/api'
import Questionnaire from '../Screens/Profile/Questionnaire';


const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { data: isAuthenticated, isLoading: authLoading } = useAuthStatus();

 const {
  data: profile,
  isLoading: profileLoading,
  isError: profileError,
} = useQuery({
  queryKey: ['me'],
  queryFn: getUserData,
  enabled: !!isAuthenticated,
  retry: false,
  retryDelay: 1000, // wait 1 second before retrying
});


//Questionaire

const {
  data: questionnaire,
  isLoading: questionnaireLoading,
  isError: questionnaireError,
} = useQuery({
  queryKey: ['questionnaire'],
  queryFn: fetchQuestionnaire,
  enabled: isProfileValid, // only fetch if profile exists
  retry: false,
});


  useEffect(() => {
    console.log('[RootNavigator] isAuthenticated:', isAuthenticated);
    console.log('[RootNavigator] profile:', profile);
    console.log('[RootNavigator] profileError:', profileError);
  }, [isAuthenticated, profile, profileError]);

  if (authLoading || (isAuthenticated && profileLoading)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // const isProfileValid = profile && Object.keys(profile).length > 0;
const isProfileValid = profile !== null && profile !== undefined;
  let initialRoute = 'Auth';
  
 

if (isAuthenticated) {
  if (!isProfileValid) {
    initialRoute = 'CreateProfile';
  } else if (!questionnaire || Object.keys(questionnaire).length === 0)
 {
    initialRoute = 'Questionnaire';
  } else {
    initialRoute = 'Main';
  }
}


  return (
    // RootNavigator.js

<RootStack.Navigator screenOptions={{ headerShown: false }}>
  {isAuthenticated ? (
    !isProfileValid ? (
      <RootStack.Screen name="CreateProfile" component={CreateProfileScreen} />
    ) : !questionnaire ? (
      <RootStack.Screen name="Questionnaire" component={Questionnaire} />
    ) : (
      <RootStack.Screen name="Main" component={MainTabNavigator} />
    )
  ) : (
    <RootStack.Screen name="Auth" component={AuthStack} />
  )}
</RootStack.Navigator>

  );
};

export default RootNavigator;
