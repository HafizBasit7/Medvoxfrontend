import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../Components/CustomButton";
import { useOtpRequestMutation } from '../../features/auth/mutations'
import { useMessage } from '../../context/MessageContext';


const ForgotPassword = ({ navigation }) => {
  const { showMessage } = useMessage();
  const { mutate: requestOtp, isPending } = useOtpRequestMutation();
  const [activeTab, setActiveTab] = useState("email"); // 'email' or 'phone'
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false); // Track if input is verified

  const handleBack = () => {
    navigation.goBack();
  };

const handleReset = () => {
  try {
    const contact = activeTab === 'email' ? email : phone;
    
    if (!contact) {
      showMessage('error', `Please enter your ${activeTab}`);
      return;
    }

    requestOtp(
      { email: contact }, // Always send as email since you're only implementing email
      {
        onSuccess: () => {
          navigation.navigate('VerificationCodeScreen', {
            contact, // The email address
            method: 'email', // Force email method
          });
        },
        onError: (error) => {
          console.error('OTP error:', error);
          showMessage('error', `Failed to send OTP: ${error.message}`);
        }
      }
    );
  } catch (error) {
    console.error('Reset error:', error);
    showMessage('error', 'An unexpected error occurred');
  }
};

  // For demo purposes, this toggles the verification checkmark
  const handleInputChange = (text) => {
    if (activeTab === "email") {
      setEmail(text);
      // Simple email validation
      setIsVerified(text.includes("@") && text.includes("."));
    } else {
      setPhone(text);
      // Simple phone validation (10+ digits)
      setIsVerified(text.length >= 10);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Forgot Your Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email or your phone number, we will send you confirmation
            code
          </Text>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "email" ? styles.activeTab : null,
              ]}
              onPress={() => setActiveTab("email")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "email" ? styles.activeTabText : null,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "phone" ? styles.activeTab : null,
              ]}
              onPress={() => setActiveTab("phone")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "phone" ? styles.activeTabText : null,
                ]}
              >
                Phone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <Ionicons
              name={activeTab === "email" ? "mail-outline" : "call-outline"}
              size={20}
              color="#888"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={
                activeTab === "email"
                  ? "Enter your email"
                  : "Enter your phone number"
              }
              value={activeTab === "email" ? email : phone}
              onChangeText={handleInputChange}
              keyboardType={
                activeTab === "email" ? "email-address" : "phone-pad"
              }
              autoCapitalize="none"
              placeholderTextColor="#888"
            />
            {isVerified && (
              <View style={styles.checkContainer}>
                <Ionicons name="checkmark" size={20} color="#3DAB9B" />
              </View>
            )}
          </View>

          <CustomButton
          text={isPending ? "Verifying..." : "Verify"}
            // text="Reset Password"
            style={styles.resetButton}
            textStyle={styles.resetButtonText}
            onPress={handleReset}
             disabled={isPending}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 30,
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F7FB",
    borderRadius: 30,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 26,
  },
  activeTab: {
    backgroundColor: "#FFFFFF",
    // Add shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Add elevation for Android
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    color: "#3DAB9B",
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FB",
    borderRadius: 30,
    marginBottom: 32,
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
  checkContainer: {
    backgroundColor: "#EEFAF8",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#3DAB9B",
    height: 56,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ForgotPassword;
