import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../Components/CustomButton";
import { useSignupMutation } from "../../features/auth/mutations";
import { useNavigation } from '@react-navigation/native';
import { useMessage } from '../../context/MessageContext'
const SignUp = () => {
  const navigation = useNavigation();
  const { mutate: signup, isLoading } = useSignupMutation();
 const { showMessage } = useMessage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBack = () => navigation.goBack();
  const handleLogin = () => navigation.navigate("Login");

const validateForm = () => {
    if (!agreeToTerms) {
      showMessage("error", "Please agree to the Terms and Privacy Policy");
      return false;
    }

    if (!formData.name.trim()) {
      showMessage("error", "Please enter your full name");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      showMessage("error", "Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      showMessage("error", "Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSignUp = () => {
    if (!validateForm()) return;

    signup(formData, {
      onSuccess: () => {
        showMessage("success", "Account created successfully!");
        navigation.replace("Login");
      },
      onError: (error) => {
        showMessage("error", error?.message || "Could not create account. Please try again.");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholderTextColor="#888"
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
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

        {/* Terms Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            {agreeToTerms && <Ionicons name="checkmark" size={16} color="#3DAB9B" />}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the Terms of Service and Privacy Policy
          </Text>
        </View>

        {/* Sign Up Button */}
        <CustomButton
          text={isLoading ? "Creating Account..." : "Sign Up"}
          style={styles.signUpButton}
          textStyle={styles.signUpButtonText}
          onPress={handleSignUp}
          disabled={isLoading}
          rightIcon={isLoading && <ActivityIndicator color="#fff" size="small" />}
        />

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
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
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  termsLink: {
    color: "#3DAB9B",
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "#3DAB9B",
    height: 56,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#3DAB9B",
    fontWeight: "600",
  },
});

export default SignUp;
