import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import BannerCarousel from './BannerCarousel';
import ProfileScreen from '../Profile/ProfileScreen';
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const [familyMembers] = useState([
    { id: 1, name: 'John Doe', relationship: 'Father', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Sarah Doe', relationship: 'Mother', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'Mike Doe', relationship: 'Brother', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ]);

  const recentActivity = [
    { type: 'medicine', status: 'recommended', time: '2h ago' },
    { type: 'report', status: 'reviewed', time: '5h ago' },
    { type: 'voice', status: 'analyzed', time: '1d ago' },
  ];

  const sendEmergencyAlert = (member) => {
    Alert.alert(
      'Emergency Alert',
      `Send emergency alert to ${member.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: () => Alert.alert('Alert Sent') },
      ]
    );
  };

   const handleFeaturePress = (feature) => {
  const routes = {
    'Medicine Analyzer': 'MedicineAnalyzer',
    'Report Analyzer': 'ReportAnalyzerScreen',
    'Voice Assistant': 'VoiceChatScreen',
    'Medical History': 'HistoryScreen',
  };

  const screen = routes[feature];
  if (screen) navigation.navigate(screen);
  else Alert.alert('Navigation Error', `No screen found for "${feature}"`);
};


  const ServiceButton = ({ icon, label }) => (
    <TouchableOpacity style={styles.serviceButton} onPress={() => handleFeaturePress(label)}>
      <View style={styles.serviceIcon}>
        <Ionicons name={icon} size={24} color="#3DAB9B" />
      </View>
      <Text style={styles.serviceLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const FamilyMemberCard = ({ member }) => (
    <TouchableOpacity style={styles.familyCard} onPress={() => sendEmergencyAlert(member)}>
      <Image source={{ uri: member.avatar }} style={styles.familyAvatar} />
      <Text style={styles.familyName}>{member.name}</Text>
      <Text style={styles.familyRelationship}>{member.relationship}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3DAB9B" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#3DAB9B', '#2A8A7F']}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.greeting}>Hello, Welcome Back</Text>
              <View style={styles.appNameContainer}>
                <Text style={styles.appName}>MedVoxAi</Text>
                <View style={styles.aiPoweredBadge}>
                  <Ionicons name="sparkles" size={12} color="#3DAB9B" />
                  <Text style={styles.aiPoweredText}>AI Powered</Text>
                </View>
              </View>
            </View>
          <TouchableOpacity
      style={styles.profileButton}
      onPress={() => navigation.navigate('ProfileScreen')}
    >
      <Ionicons name="person-circle-outline" size={32} color="white" />
    </TouchableOpacity>
          </View>

          {/* <View style={styles.insightsContainer}>
            <View style={styles.insightItem}>
              <Ionicons name="pulse" size={20} color="white" />
              <View style={styles.insightText}>
                <Text style={styles.insightLabel}>Health Score</Text>
                <Text style={styles.insightValue}>85/100</Text>
              </View>
            </View>
            <View style={styles.insightDivider} />
            <View style={styles.insightItem}>
              <Ionicons name="shield-checkmark" size={20} color="white" />
              <View style={styles.insightText}>
                <Text style={styles.insightLabel}>AI Analysis</Text>
                <Text style={styles.insightValue}>12 Done</Text>
              </View>
            </View>
          </View> */}
        </LinearGradient>

        {/* Services */}
        <View style={styles.servicesRow}>
          <ServiceButton icon="analytics" label="Medicine Analyzer" />
          <ServiceButton icon="document-text" label="Report Analyzer" />
          <ServiceButton icon="mic" label="Voice Assistant" />
          <ServiceButton icon="folder" label="Medical History" />
        </View>

        {/* Protection Banner */}
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <BannerCarousel />
          </View>

        {/* Health Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health Management</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Manage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.articlesPlaceholder}>
            <Text style={styles.placeholderText}>Monitor and manage your vitals, conditions, and medications</Text>
          </View>
        </View>

        {/* Recent AI Analysis */}

        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent AI Analysis</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View reports</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.articlesPlaceholder}>
            <Text style={styles.placeholderText}>Your AI-driven medical analysis will appear here</Text>
          </View>
        </View> */}

        {/* Family Members */}
        

        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Family</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Add member</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {familyMembers.map(member => (
              <FamilyMemberCard key={member.id} member={member} />
            ))}
          </ScrollView>
        </View> */}

        {/* Recent Activity */}
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {recentActivity.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons
                  name={
                    activity.type === 'medicine'
                      ? 'medical'
                      : activity.type === 'report'
                      ? 'document'
                      : 'mic'
                  }
                  size={16}
                  color="#3DAB9B"
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>
                  {activity.type === 'medicine'
                    ? 'Medicine'
                    : activity.type === 'report'
                    ? 'Report'
                    : 'Voice'} analysis {activity.status}
                </Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <View
                style={[
                  styles.activityStatus,
                  {
                    backgroundColor:
                      activity.status === 'recommended'
                        ? '#4CAF50'
                        : '#2196F3',
                  },
                ]}
              />
            </View>
          ))}
        </View> */}

        {/* Articles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Health article</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.articlesPlaceholder}>
            <Text style={styles.placeholderText}>Featured health articles will appear here</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  headerGradient: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flex: 1 },
  greeting: { fontSize: 14, color: '#fff', marginBottom: 4 },
  appNameContainer: { flexDirection: 'row', alignItems: 'center' },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginRight: 8 },
  aiPoweredBadge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiPoweredText: { fontSize: 10, color: '#3DAB9B', marginLeft: 4 },
  profileButton: { marginLeft: 16 },
  insightsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2A8A7F',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  insightText: { marginLeft: 8 },
  insightLabel: { color: '#fff', fontSize: 12 },
  insightValue: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  insightDivider: {
    width: 1,
    backgroundColor: '#4CA99C',
    marginHorizontal: 12,
  },
  servicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 24,
  },
  serviceButton: {
    alignItems: 'center',
    width: (width - 72) / 4,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLabel: { fontSize: 14, color: '#666', fontWeight: '500', textAlign: 'center' },
  protectionBanner: {
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  protectionTitle: { fontSize: 16, color: 'white', fontWeight: '500' },
  protectionSubtitle: { fontSize: 18, color: 'white', fontWeight: 'bold', marginTop: 4 },
  learnMore: { color: 'white', fontWeight: '500' },
  section: { marginBottom: 24, paddingHorizontal: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  seeAll: { color: '#3DAB9B', fontWeight: '500' },
  horizontalScroll: { paddingRight: 24 },
  familyCard: {
    width: 100,
    alignItems: 'center',
    marginRight: 16,
  },
  familyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  familyName: { fontSize: 14, fontWeight: '500', color: '#333', textAlign: 'center' },
  familyRelationship: { fontSize: 12, color: '#3DAB9B', textAlign: 'center' },
  articlesPlaceholder: {
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  placeholderText: { color: '#888', fontSize: 14, textAlign: 'center' },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8F7',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D9F2EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, color: '#333' },
  activityTime: { fontSize: 12, color: '#999', marginTop: 2 },
  activityStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  articlesPlaceholder: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 4,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#888',
  },
  activityStatus: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  textContainer: {
    flex: 1,
  },
  bannerImage: {
    width: 100,
    height: 100,
    marginLeft: 12,
  },
  learnMoreButton: {
  marginTop: 12,
  backgroundColor: '#ffffff',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 25,
  alignSelf: 'flex-start',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

learnMoreButtonText: {
  color: '#2A8A7F',
  fontWeight: '600',
  fontSize: 14,
},

});


export default HomeScreen;