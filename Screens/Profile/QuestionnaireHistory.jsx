import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  useColorScheme, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useQuestionnaireQuery } from '../../features/auth/mutations';

const QuestionnaireHistory = () => {
    const navigation = useNavigation();
  const { data, isLoading, isError } = useQuestionnaireQuery();
  const questionnaire = data?.data;
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const styles = getStyles(isDark);

  const renderFlag = (label, value) => (
    <View style={styles.flagContainer}>
      <Text style={[styles.flagText, { color: value ? '#2e7d32' : '#c62828' }]}>
        {value ? '✅' : '❌'} {label}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4AD8B0" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error fetching questionnaire history</Text>
      </View>
    );
  }

  if (!questionnaire || Object.keys(questionnaire).length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No questionnaire history available</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Health Questionnaire</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Full Name: </Text>
          {questionnaire.fullName}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Age: </Text>
          {questionnaire.age}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Gender: </Text>
          {questionnaire.gender}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Contact Number: </Text>
          {questionnaire.contactNumber}
        </Text>

        <Text style={styles.sectionTitle}>Vitals</Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Weight: </Text>
          {questionnaire.weight} kg
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Height: </Text>
          {questionnaire.height} cm
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Blood Group: </Text>
          {questionnaire.bloodGroup}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Sleep Hours: </Text>
          {questionnaire.sleepHours}
        </Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Mental Health: </Text>
          {questionnaire.mentalHealth}
        </Text>

        <Text style={styles.sectionTitle}>Health Indicators</Text>
        {renderFlag('Diabetes', questionnaire.diabetes)}
        {renderFlag('Hypertension', questionnaire.hypertension)}
        {renderFlag('Heart Disease', questionnaire.heartDisease)}
        {renderFlag('Asthma', questionnaire.asthma)}
        {renderFlag('Smoke', questionnaire.smoke)}
        {renderFlag('Drink', questionnaire.drink)}
        {renderFlag('Exercise Regularly', questionnaire.exerciseRegularly)}

        <Text style={styles.sectionTitle}>Date</Text>
        <Text style={styles.item}>
          <Text style={styles.label}>Submitted On: </Text>
          {questionnaire.createdAt
            ? new Date(questionnaire.createdAt).toLocaleString()
            : 'N/A'}
        </Text>
        <TouchableOpacity
  style={styles.editButton}
  onPress={() => navigation.navigate('UpdateQuestionnaire')}
>
  <Text style={styles.editButtonText}>✏️ Edit Questionnaire</Text>
</TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: isDark ? '#121212' : '#f2f4f8',
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDark ? '#121212' : '#f2f4f8',
    },
    heading: {
      fontSize: 24,
      fontWeight: '700',
      color: '#4AD8B0',
      marginBottom: 16,
      textAlign: 'center',
    },
    card: {
      borderRadius: 12,
      padding: 20,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#ddd' : '#333',
      marginTop: 18,
      marginBottom: 8,
      borderBottomWidth: 1,
      borderColor: isDark ? '#333' : '#ddd',
      paddingBottom: 4,
    },
    item: {
      fontSize: 15,
      color: isDark ? '#ccc' : '#444',
      marginBottom: 6,
    },
    label: {
      fontWeight: 'bold',
      color: isDark ? '#eee' : '#222',
    },
    flagContainer: {
      marginVertical: 6,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
    },
    flagText: {
      fontSize: 15,
      fontWeight: '600',
    },
    error: {
      color: isDark ? '#ccc' : '#333',
      fontSize: 16,
    },
    editButton: {
  backgroundColor: '#4AD8B0',
  padding: 12,
  borderRadius: 8,
  marginTop: 16,
  alignItems: 'center',
},
editButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
},

  });

export default QuestionnaireHistory;
