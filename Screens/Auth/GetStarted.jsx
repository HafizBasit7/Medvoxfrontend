import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import CustomButton from "../../Components/CustomButton";

const GetStarted = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('Login')
    // Add your login navigation or logic here
    // e.g., navigation.navigate('Login')
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp')
    // Add your sign up navigation or logic here
    // e.g., navigation.navigate('SignUp')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Let's get started!</Text>
          <Text style={styles.subtitle}>
            Login to enjoy the features we've provided, and stay Aware!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Login"
            textStyle={styles.loginText}
            style={styles.loginButton}
            onPress={handleLogin}
          />
          <CustomButton
            text="Sign Up"
            textStyle={styles.signUpText}
            style={styles.signUpButton}
            onPress={handleSignUp}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
  },

  textContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#7A7A7A",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#3DAB9B", // Teal/green background
    marginBottom: 16,
  },
  loginText: {
    color: "#FFFFFF", // White text
  },
  signUpButton: {
    backgroundColor: "#FFFFFF", // White background
    borderWidth: 1,
    borderColor: "#3DAB9B", // Teal/green border
  },
  signUpText: {
    color: "#3DAB9B", // Teal/green text
  },
});

export default GetStarted;
