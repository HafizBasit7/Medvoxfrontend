import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, Dimensions } from 'react-native';

// Import local images
import reportAnalyzer from '../../assets/images/medicineAnalyzerr.jpg';
import medicineAnalyzer from '../../assets/images/voiceAssistan.jpg';
import voiceAssistant from '../../assets/images/voiceee.jpg';
import medicalHistory from '../../assets/images/medicalHistory.png';

const banners = [
  {
    image: reportAnalyzer,
  },
  {
    image: medicineAnalyzer,
  },
  {
    image: voiceAssistant,
  },
  {
    image: medicalHistory,
  },
];

const BannerCarousel = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {banners.map((banner, index) => (
        <View key={index} style={styles.card}>
          <Image source={banner.image} style={styles.image} resizeMode="cover" />
          
        </View>
      ))}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20,
  },
  card: {
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    width: width * 0.96,
    height: 180,
    backgroundColor: '#fff',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
 
});

export default BannerCarousel;
