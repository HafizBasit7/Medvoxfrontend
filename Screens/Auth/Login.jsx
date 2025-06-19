import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../Components/CustomButton";
import { useLoginMutation } from '../../features/auth/mutations';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { useMessage } from '../../context/MessageContext'; 

const Login = () => {
  const { showMessage } = useMessage();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isLoading } = useLoginMutation();


const handleLogin = () => {
  if (!email.trim() || !password.trim()) {
   showMessage('error', 'Please fill all fields');
    return 
  }

  login({ email, password }); // no need for onSuccess/onError here
};


// Remove the navigation.replace from onSuccess in your mutation

  const handleBack = () => navigation.goBack();
  const handleForgotPassword = () => navigation.navigate('ForgotPassword');
  const handleSignUp = () => navigation.navigate('SignUp');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          text={isLoading ? 'Logging in...' : 'Login'}
          style={[
            styles.loginButton,
            isLoading && styles.disabledButton
          ]}
          textStyle={styles.loginButtonText}
          onPress={handleLogin}
          disabled={isLoading}
          rightIcon={
            isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            )
          }
        />

      <View style={styles.signUpContainer}>
  <Text style={styles.signUpText}>
    Don't have an account?{' '}
    <Text style={styles.signUpLink} onPress={handleSignUp}>
      Sign Up
    </Text>
  </Text>
</View>


        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => Alert.alert('Coming Soon', 'Google login will be available soon')}
        >
          <Image
            source={require("../../assets/images/Google.png")}
            style={styles.socialImage}
          />
          <Text style={styles.socialButtonText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() => Alert.alert('Coming Soon', 'Facebook login will be available soon')}
        >
          <Image
            source={require("../../assets/images/Facebook.png")}
            style={styles.socialImage}
          />
          <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
    borderRadius: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#3DAB9B",
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#3DAB9B",
    height: 56,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    color: "#3DAB9B",
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    paddingHorizontal: 16,
    color: "#888",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    height: 56,
  },
  socialIcon: {
    marginRight: 12,
  },
  socialImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default Login;
