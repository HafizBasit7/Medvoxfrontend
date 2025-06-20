import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionnaireQuery, useQuestionnaireSubmitMutation } from '../../features/auth/mutations';

const UpdateQuestionnaire = () => {
  const { data, isLoading, isError } = useQuestionnaireQuery();
  const questionnaire = data?.data;
  const navigation = useNavigation();
  const { mutate, isLoading: isSubmitting } = useQuestionnaireSubmitMutation();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const styles = getStyles(isDark);

  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gender: '',
    contactNumber: '',
    allergy: '',
    currentMedication: '',
    diabetes: false,
    hypertension: false,
    smoke: false,
    drink: false,
    weight: '',
    height: '',
    bloodGroup: '',
    heartDisease: false,
    asthma: false,
    anySurgeryHistory: '',
    exerciseRegularly: false,
    dietType: '',
    sleepHours: '',
    mentalHealth: '',
  });

  useEffect(() => {
    if (questionnaire) setForm(questionnaire);
  }, [questionnaire]);

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
          navigation.goBack();
        },
      }
    );
  };

  const renderInput = (label, field, type = 'default') => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={String(form[field])}
        onChangeText={(text) => handleChange(field, text)}
        keyboardType={type}
      />
    </View>
  );

  const renderSwitch = (label, field) => (
    <View style={styles.switchRow}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={form[field]}
        onValueChange={(val) => handleChange(field, val)}
      />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4AD8B0" />
      </View>
    );
  }

  if (isError || !questionnaire) {
    return (
      <View style={styles.centered}>
        <Text style={styles.label}>Failed to load questionnaire</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Update Your Health Info</Text>

      {renderInput('Full Name', 'fullName')}
      {renderInput('Age', 'age', 'numeric')}
      {renderInput('Gender', 'gender')}
      {renderInput('Contact Number', 'contactNumber')}
      {renderInput('Allergy', 'allergy')}
      {renderInput('Medication', 'currentMedication')}
      {renderInput('Surgery History', 'anySurgeryHistory')}
      {renderInput('Weight (kg)', 'weight', 'numeric')}
      {renderInput('Height (cm)', 'height', 'numeric')}
      {renderInput('Blood Group', 'bloodGroup')}
      {renderInput('Diet Type', 'dietType')}
      {renderInput('Sleep Hours', 'sleepHours', 'numeric')}
      {renderInput('Mental Health', 'mentalHealth')}

      {renderSwitch('Diabetes', 'diabetes')}
      {renderSwitch('Hypertension', 'hypertension')}
      {renderSwitch('Heart Disease', 'heartDisease')}
      {renderSwitch('Asthma', 'asthma')}
      {renderSwitch('Smoke', 'smoke')}
      {renderSwitch('Drink', 'drink')}
      {renderSwitch('Exercise Regularly', 'exerciseRegularly')}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.submitText}>{isSubmitting ? 'Updating...' : 'Update Questionnaire'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#4AD8B0',
      textAlign: 'center',
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 14,
    },
    label: {
      fontWeight: '600',
      color: isDark ? '#eee' : '#333',
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 8,
      backgroundColor: isDark ? '#1e1e1e' : '#f9f9f9',
      color: isDark ? '#fff' : '#000',
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    submitButton: {
      backgroundColor: '#4AD8B0',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    submitText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default UpdateQuestionnaire;
