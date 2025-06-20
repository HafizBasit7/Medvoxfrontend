import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useQuestionnaireSubmitMutation } from '../../features/auth/mutations';

DropDownPicker.setMode('SCROLLVIEW');

const Questionnaire = () => {
  const navigation = useNavigation();
  const { mutate, isLoading } = useQuestionnaireSubmitMutation();

  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    contactNumber: '',
    allergy: '',
    currentMedication: '',
    diabetes: false,
    hypertension: false,
    smoke: false,
    drink: false,
    weight: '',
    height: '',
    bloodGroup: 'O+',
    heartDisease: false,
    asthma: false,
    anySurgeryHistory: '',
    exerciseRegularly: false,
    dietType: 'Non-vegetarian',
    sleepHours: '',
    mentalHealth: 'Stable',
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    mutate(
      {
        ...form,
        age: parseInt(form.age),
        weight: parseFloat(form.weight),
        height: parseFloat(form.height),
        sleepHours: parseInt(form.sleepHours),
      },
      {
        onSuccess: () => {
          navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        },
      }
    );
  };

  // Dropdown states
  const [genderOpen, setGenderOpen] = useState(false);
  const [bloodGroupOpen, setBloodGroupOpen] = useState(false);
  const [dietTypeOpen, setDietTypeOpen] = useState(false);

  const genderItems = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const bloodGroupItems = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
  ];

  const dietTypeItems = [
    { label: 'Vegetarian', value: 'Vegetarian' },
    { label: 'Non-vegetarian', value: 'Non-vegetarian' },
    { label: 'Vegan', value: 'Vegan' },
  ];

  const renderSwitch = (label, field) => (
    <View style={styles.switchRow}>
      <Text style={styles.switchLabel}>{label}</Text>
      <Switch value={form[field]} onValueChange={(val) => handleChange(field, val)} />
    </View>
  );

  const renderInput = (label, field, keyboardType = 'default') => (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={form[field]}
        onChangeText={(text) => handleChange(field, text)}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Complete Questionnaire</Text>
        </View>

        <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
          {renderInput('Full Name', 'fullName')}
          {renderInput('Age', 'age', 'numeric')}

          <Text style={styles.inputLabel}>Gender</Text>
          <DropDownPicker
            open={genderOpen}
            value={form.gender}
            items={genderItems}
            setOpen={(val) => {
              setGenderOpen(val);
              setBloodGroupOpen(false);
              setDietTypeOpen(false);
            }}
            setValue={(cb) => handleChange('gender', cb(form.gender))}
            style={styles.dropdown}
            zIndex={3000}
            zIndexInverse={1000}
          />

          {renderInput('Contact Number', 'contactNumber')}
          {renderInput('Allergy', 'allergy')}
          {renderInput('Current Medication', 'currentMedication')}
          {renderSwitch('Diabetes', 'diabetes')}
          {renderSwitch('Hypertension', 'hypertension')}
          {renderSwitch('Smoke', 'smoke')}
          {renderSwitch('Drink', 'drink')}
          {renderInput('Weight (kg)', 'weight', 'numeric')}
          {renderInput('Height (cm)', 'height', 'numeric')}

          <Text style={styles.inputLabel}>Blood Group</Text>
          <DropDownPicker
            open={bloodGroupOpen}
            value={form.bloodGroup}
            items={bloodGroupItems}
            setOpen={(val) => {
              setBloodGroupOpen(val);
              setGenderOpen(false);
              setDietTypeOpen(false);
            }}
            setValue={(cb) => handleChange('bloodGroup', cb(form.bloodGroup))}
            style={styles.dropdown}
            zIndex={2000}
            zIndexInverse={2000}
          />

          {renderSwitch('Heart Disease', 'heartDisease')}
          {renderSwitch('Asthma', 'asthma')}
          {renderInput('Surgery History', 'anySurgeryHistory')}
          {renderSwitch('Exercise Regularly', 'exerciseRegularly')}

          <Text style={styles.inputLabel}>Diet Type</Text>
          <DropDownPicker
            open={dietTypeOpen}
            value={form.dietType}
            items={dietTypeItems}
            setOpen={(val) => {
              setDietTypeOpen(val);
              setGenderOpen(false);
              setBloodGroupOpen(false);
            }}
            setValue={(cb) => handleChange('dietType', cb(form.dietType))}
            style={styles.dropdown}
            zIndex={1000}
            zIndexInverse={3000}
          />

          {renderInput('Sleep Hours', 'sleepHours', 'numeric')}
          {renderInput('Mental Health', 'mentalHealth')}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4AD8B0',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  dropdown: {
    marginBottom: 16,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#4AD8B0',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Questionnaire;
