import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Auth/Login';
import SignUp from '../Screens/Auth/SignUp';
import GetStarted from '../Screens/Auth/GetStarted';
import ForgotPassword from '../Screens/Auth/ForgetPassword';
import NewPassword from '../Screens/Auth/NewPassword';
import Questionaire from '../Screens/Auth/Questionaire';
import VerificationCodeScreen from '../Screens/Auth/VerificationCodeScreen '; 

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        {/* <Stack.Screen name="Questionaire" component={Questionaire} /> */}
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen} />

    </Stack.Navigator>
  );
};

export default AuthStack;
