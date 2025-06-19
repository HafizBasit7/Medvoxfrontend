import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../../Components/CustomButton";
import { useOtpVerifyMutation, useResendOtpMutation  } from "../../features/auth/mutations";

const VerificationCodeScreen = ({ navigation, route }) => {
  const { contact, method = "email" } = route.params || {};
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
const { mutate: resendOtpMutation, isPending: isResending } = useResendOtpMutation();
  const { mutate: verifyOtpMutation, isPending } = useOtpVerifyMutation();

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!contact) {
      alert("Missing contact information");
      navigation.goBack();
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      clearInterval(interval);
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleChange = (text, index) => {
    if (!/^\d?$/.test(text)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      alert("Please enter all 4 digits");
      return;
    }

    verifyOtpMutation(
      { email: contact, otp: otpCode },
      {
        onSuccess: () => {
          navigation.navigate("NewPassword", {
            email: contact,
            otp: otpCode,
          });
        },
        onError: () => {
          alert("Invalid verification code. Please try again.");
        },
      }
    );
  };

const handleResend = () => {
  if (timer > 0) return;

  setOtp(["", "", "", ""]);
  setTimer(60);

  resendOtpMutation({ email: contact }); // 👈 trigger resend API
};

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>Code sent to {contact}</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.otpBox}
                textAlign="center"
                returnKeyType="done"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
              />
            ))}
          </View>

          <CustomButton
            text={isPending ? "Verifying..." : "Verify"}
            style={styles.verifyButton}
            textStyle={styles.verifyButtonText}
            onPress={handleVerify}
            disabled={isPending}
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0 || isResending}>
  <Text
    style={[
      styles.resendLink,
      (timer > 0 || isResending) && { color: "#aaa" },
    ]}
  >
    {isResending ? "Resending..." : `Resend ${timer > 0 ? `in ${timer}s` : ""}`}
  </Text>
</TouchableOpacity>

          </View>
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
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 30,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
  verifyButton: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 50,
    backgroundColor: "#2AAA8A",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  resendText: {
    color: "#888",
  },
  resendLink: {
    color: "#2AAA8A",
    fontWeight: "500",
  },
});

export default VerificationCodeScreen;
