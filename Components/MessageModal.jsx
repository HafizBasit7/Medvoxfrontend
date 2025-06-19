// components/MessageModal.js
import React from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ICONS = {
  success: 'check-circle',
  error: 'error-outline',
};

const COLORS = {
  success: '#4BB543',
  error: '#FF3B30',
};

const MessageModal = ({ visible, type, message }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <MaterialIcons name={ICONS[type]} size={40} color={COLORS[type]} />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000044',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  message: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
});
