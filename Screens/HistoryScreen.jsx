import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
} from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const HistoryScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6M');
  const [activeTab, setActiveTab] = useState('overview');

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#2196F3',
    },
  };

  // Sample medical data
  const vitalSignsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [120, 118, 122, 115, 119, 117],
        color: (opacity = 1) => `rgba(233, 30, 99, ${opacity})`, // Blood Pressure
        strokeWidth: 2,
      },
      {
        data: [72, 68, 75, 70, 73, 71],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Heart Rate
        strokeWidth: 2,
      },
    ],
    legend: ['Blood Pressure', 'Heart Rate'],
  };

  const monthlyVisitsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [2, 1, 3, 1, 2, 1],
      },
    ],
  };

  const healthStatusData = [
    {
      name: 'Normal',
      population: 65,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Minor Issues',
      population: 25,
      color: '#FF9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Attention Needed',
      population: 10,
      color: '#F44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const recentVisits = [
    {
      id: 1,
      date: '2024-05-28',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      diagnosis: 'Routine Checkup',
      status: 'Completed',
      notes: 'All vitals normal, continue current medications',
      priority: 'normal'
    },
    {
      id: 2,
      date: '2024-05-15',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      diagnosis: 'Hypertension Follow-up',
      status: 'Completed',
      notes: 'Blood pressure improving, medication adjusted',
      priority: 'high'
    },
    {
      id: 3,
      date: '2024-04-30',
      doctor: 'Dr. Emily Davis',
      specialty: 'Dermatology',
      diagnosis: 'Skin Consultation',
      status: 'Completed',
      notes: 'Prescribed topical treatment',
      priority: 'normal'
    },
  ];

  const currentMedications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', status: 'Active', type: 'Prescription' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', status: 'Active', type: 'Prescription' },
    { name: 'Vitamin D3', dosage: '1000 IU', frequency: 'Once daily', status: 'Active', type: 'Supplement' },
  ];

  const allergies = [
    { name: 'Penicillin', severity: 'High', reaction: 'Severe rash' },
    { name: 'Shellfish', severity: 'Medium', reaction: 'Digestive issues' },
    { name: 'Latex', severity: 'Low', reaction: 'Skin irritation' }
  ];

  const labResults = [
    { test: 'Cholesterol', value: '185', unit: 'mg/dL', range: '<200', status: 'Normal' },
    { test: 'Blood Sugar', value: '95', unit: 'mg/dL', range: '70-100', status: 'Normal' },
    { test: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '12-16', status: 'Normal' },
    { test: 'White Blood Cells', value: '6.8', unit: 'K/uL', range: '4-11', status: 'Normal' },
  ];

  const VitalCard = ({ iconName, title, value, unit, trend, color, subtitle }) => (
    <View style={[styles.vitalCard, { borderLeftColor: color }]}>
      <View style={styles.vitalHeader}>
        <Ionicons name={iconName} size={24} color={color} />
        <Text style={styles.vitalTitle}>{title}</Text>
      </View>
      <Text style={styles.vitalValue}>
        {value} <Text style={styles.vitalUnit}>{unit}</Text>
      </Text>
      {subtitle && <Text style={styles.vitalSubtitle}>{subtitle}</Text>}
      <View style={styles.trendContainer}>
        <Ionicons 
          name={trend >= 0 ? 'trending-up' : 'trending-down'} 
          size={16} 
          color={trend >= 0 ? '#4CAF50' : '#F44336'} 
        />
        <Text style={[styles.trendText, { color: trend >= 0 ? '#4CAF50' : '#F44336' }]}>
          {trend >= 0 ? '+' : ''}{trend}% vs last month
        </Text>
      </View>
    </View>
  );

  const TabButton = ({ tab, label, iconName, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={() => onPress(tab)}
    >
      <Ionicons 
        name={iconName} 
        size={16} 
        color={isActive ? '#fff' : '#666'} 
      />
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const PeriodButton = ({ period, isSelected, onPress }) => (
    <TouchableOpacity
      style={[styles.periodButton, isSelected && styles.selectedPeriod]}
      onPress={onPress}
    >
      <Text style={[styles.periodText, isSelected && styles.selectedPeriodText]}>
        {period}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Medical History</Text>
          <Text style={styles.headerSubtitle}>Complete health overview and records</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle" size={20} color="#666" />
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={16} color="#fff" />
            <Text style={styles.addButtonText}>Add Record</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TabButton tab="overview" label="Overview" iconName="analytics" isActive={activeTab === 'overview'} onPress={setActiveTab} />
          <TabButton tab="vitals" label="Vitals" iconName="pulse" isActive={activeTab === 'vitals'} onPress={setActiveTab} />
          <TabButton tab="visits" label="Visits" iconName="medical" isActive={activeTab === 'visits'} onPress={setActiveTab} />
          <TabButton tab="medications" label="Medications" iconName="medical" isActive={activeTab === 'medications'} onPress={setActiveTab} />
          <TabButton tab="labs" label="Labs" iconName="flask" isActive={activeTab === 'labs'} onPress={setActiveTab} />
        </ScrollView>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Current Health Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Health Status</Text>
          <View style={styles.vitalGrid}>
            <VitalCard
              iconName="heart"
              title="Blood Pressure"
              value="117/78"
              unit="mmHg"
              trend={-2.5}
              color="#E91E63"
              subtitle="Systolic/Diastolic"
            />
            <VitalCard
              iconName="pulse"
              title="Heart Rate"
              value="71"
              unit="bpm"
              trend={1.2}
              color="#2196F3"
              subtitle="Resting rate"
            />
            <VitalCard
              iconName="thermometer"
              title="Temperature"
              value="98.4"
              unit="°F"
              trend={0}
              color="#FF9800"
              subtitle="Body temp"
            />
            <VitalCard
              iconName="fitness"
              title="Weight"
              value="160"
              unit="lbs"
              trend={-3.1}
              color="#4CAF50"
              subtitle="BMI: 22.5"
            />
          </View>
        </View>

        {/* Vital Signs Trend Chart */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Vital Signs Trend</Text>
            <View style={styles.periodSelector}>
              {['3M', '6M', '1Y'].map((period) => (
                <PeriodButton
                  key={period}
                  period={period}
                  isSelected={selectedPeriod === period}
                  onPress={() => setSelectedPeriod(period)}
                />
              ))}
            </View>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={vitalSignsData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Health Status Distribution */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Status Distribution</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={healthStatusData}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </View>
        </View>

        {/* Monthly Visits Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Medical Visits</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={monthlyVisitsData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              }}
              style={styles.chart}
            />
          </View>
        </View>

        {/* Recent Medical Visits */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Medical Visits</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color="#2196F3" />
            </TouchableOpacity>
          </View>
          {recentVisits.map((visit) => (
            <TouchableOpacity key={visit.id} style={[
              styles.visitCard,
              { borderLeftColor: visit.priority === 'high' ? '#F44336' : '#2196F3' }
            ]}>
              <View style={styles.visitHeader}>
                <View style={styles.visitInfo}>
                  <Text style={styles.visitDate}>{visit.date}</Text>
                  <Text style={styles.visitDoctor}>{visit.doctor}</Text>
                  <Text style={styles.visitSpecialty}>{visit.specialty}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{visit.status}</Text>
                </View>
              </View>
              <Text style={styles.visitDiagnosis}>{visit.diagnosis}</Text>
              <Text style={styles.visitNotes}>{visit.notes}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Current Medications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Current Medications</Text>
            <Ionicons name="medical" size={20} color="#666" />
          </View>
          {currentMedications.map((med, index) => (
            <View key={index} style={styles.medicationCard}>
              <View style={styles.medicationInfo}>
                <Text style={styles.medicationName}>{med.name}</Text>
                <Text style={styles.medicationDosage}>{med.dosage} - {med.frequency}</Text>
                <Text style={styles.medicationType}>{med.type}</Text>
              </View>
              <View style={styles.medicationStatus}>
                <Text style={styles.medicationStatusText}>{med.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Allergies & Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Allergies & Alerts</Text>
            <Ionicons name="warning" size={20} color="#F44336" />
          </View>
          {allergies.map((allergy, index) => (
            <View key={index} style={[
              styles.allergyCard,
              { 
                backgroundColor: allergy.severity === 'High' ? '#fff3f3' : '#f8f9fa',
                borderColor: allergy.severity === 'High' ? '#ffebee' : '#e0e0e0'
              }
            ]}>
              <View style={styles.allergyHeader}>
                <Text style={styles.allergyName}>{allergy.name}</Text>
                <View style={[
                  styles.severityBadge,
                  { 
                    backgroundColor: allergy.severity === 'High' ? '#F44336' : 
                                   allergy.severity === 'Medium' ? '#FF9800' : '#4CAF50'
                  }
                ]}>
                  <Text style={styles.severityText}>{allergy.severity}</Text>
                </View>
              </View>
              <Text style={styles.allergyReaction}>{allergy.reaction}</Text>
            </View>
          ))}
        </View>

        {/* Lab Results */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Lab Results</Text>
            <Ionicons name="document-text" size={20} color="#666" />
          </View>
          <View style={styles.labGrid}>
            {labResults.map((lab, index) => (
              <View key={index} style={[
                styles.labCard,
                { borderLeftColor: lab.status === 'Normal' ? '#4CAF50' : '#F44336' }
              ]}>
                <Text style={styles.labTest}>{lab.test}</Text>
                <Text style={styles.labValue}>
                  {lab.value} <Text style={styles.labUnit}>{lab.unit}</Text>
                </Text>
                <Text style={styles.labRange}>Normal: {lab.range}</Text>
                <View style={[
                  styles.labStatus,
                  { backgroundColor: lab.status === 'Normal' ? '#4CAF50' : '#F44336' }
                ]}>
                  <Text style={styles.labStatusText}>{lab.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Ionicons name="time" size={16} color="#999" />
        <Text style={styles.footerText}>Last updated: May 30, 2024 at 2:30 PM</Text>
      </View>
    </SafeAreaView>
  );
};
export default HistoryScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:25
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  headerRight: {
    alignItems: 'flex-end',
    gap: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  userName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    
  },
  addButton: {
    backgroundColor: '#3DAB9B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    // marginTop:20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  tabContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  vitalTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  vitalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  vitalUnit: {
    fontSize: 16,
    color: '#666',
  },
  vitalSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  chart: {
    borderRadius: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  selectedPeriod: {
    backgroundColor: '#2196F3',
  },
  periodText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedPeriodText: {
    color: '#fff',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
  },
  visitCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  visitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  visitInfo: {
    flex: 1,
  },
  visitDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  visitDoctor: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  visitSpecialty: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  visitDiagnosis: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  visitNotes: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  medicationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  medicationType: {
    fontSize: 12,
    color: '#888',
  },
  medicationStatus: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  medicationStatusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  allergyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  allergyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  allergyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  allergyReaction: {
    fontSize: 14,
    color: '#666',
  },
  labGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  labCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  labTest: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  labValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labUnit: {
    fontSize: 14,
    color: '#666',
  },
  labRange: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  labStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  labStatusText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});