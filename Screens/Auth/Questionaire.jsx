// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TextInput,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { useMutation } from "@tanstack/react-query";
// import { completeQuestionnaire } from "../../features/auth/api";
// import CustomButton from "../../Components/CustomButton";
// import { useUserQuery } from "../../features/auth/queries";
// const Questionaire = ({ navigation }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     age: "",
//     gender: "",
//     contact: "",
//     allergies: "",
//     medications: "",
//     chronicIllness: "",
//     habits: "",
//   });
// const { refetch } = useUserQuery();
//  // In your Questionaire.js
// const { mutate, isPending } = useMutation({
//   mutationFn: completeQuestionnaire,
//   onSuccess: async () => {
//     await refetch(); // This will trigger RootNavigator to re-render
//     // No navigation needed - RootNavigator will switch automatically
//   },
//   onError: (error) => {
//     Alert.alert("Submission Failed", error.message);
//   }
// });

//   const handleChange = (field, value) => {
//     setFormData((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const handleSubmit = () => {
//     // Basic validation
//     if (!formData.fullName || !formData.age || !formData.gender) {
//       Alert.alert(
//         "Incomplete Information",
//         "Please fill in all required fields (Name, Age, Gender)"
//       );
//       return;
//     }

//     mutate(formData);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.header}>Health Questionnaire</Text>

//         <Text style={styles.label}>Full Name*</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your full name"
//           value={formData.fullName}
//           onChangeText={(val) => handleChange("fullName", val)}
//         />

//         <Text style={styles.label}>Age*</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your age"
//           value={formData.age}
//           onChangeText={(val) => handleChange("age", val)}
//           keyboardType="numeric"
//         />

//         <Text style={styles.label}>Gender*</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Male / Female / Other"
//           value={formData.gender}
//           onChangeText={(val) => handleChange("gender", val)}
//         />

//         <Text style={styles.label}>Contact Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your phone number"
//           value={formData.contact}
//           onChangeText={(val) => handleChange("contact", val)}
//           keyboardType="phone-pad"
//         />

//         <Text style={styles.label}>Do you have any allergies?</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Mention if any"
//           value={formData.allergies}
//           onChangeText={(val) => handleChange("allergies", val)}
//         />

//         <Text style={styles.label}>Current medications?</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="List any medications"
//           value={formData.medications}
//           onChangeText={(val) => handleChange("medications", val)}
//         />

//         <Text style={styles.label}>Any chronic illnesses?</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="e.g. Diabetes, Hypertension"
//           value={formData.chronicIllness}
//           onChangeText={(val) => handleChange("chronicIllness", val)}
//         />

//         <Text style={styles.label}>Do you smoke or drink?</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Yes / No"
//           value={formData.habits}
//           onChangeText={(val) => handleChange("habits", val)}
//         />

//         {isPending ? (
//           <ActivityIndicator size="large" color="#3DAB9B" style={styles.loader} />
//         ) : (
//           <CustomButton
//             text="Submit"
//             style={styles.button}
//             textStyle={styles.buttonText}
//             onPress={handleSubmit}
//             disabled={isPending}
//           />
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   content: {
//     paddingHorizontal: 24,
//     paddingVertical: 20,
//   },
//   header: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#3DAB9B",
//     marginTop: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 6,
//     marginTop: 10,
//   },
//   input: {
//     height: 50,
//     borderRadius: 30,
//     backgroundColor: "#F5F7FB",
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#333",
//   },
//   button: {
//     backgroundColor: "#3DAB9B",
//     height: 56,
//     marginTop: 20,
//     borderRadius: 30,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default Questionaire;