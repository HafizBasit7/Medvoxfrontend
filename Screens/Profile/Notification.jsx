import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNotificationsQuery, useMarkNotificationAsReadMutation } from '../../features/auth/mutations';
import { useMessage } from '../../context/MessageContext';
import { formatDistanceToNow } from 'date-fns';

const Notification = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { showMessage } = useMessage();

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useNotificationsQuery(activeTab);

  const { mutate: markAsRead } = useMarkNotificationAsReadMutation();

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId, {
      onError: (error) => {
        showMessage('error', error.message || 'Failed to mark notification as read');
      },
    });
  };

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
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['all', 'family_member_added'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'all' ? 'All' : 'Family'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications */}
      {notifications?.length === 0 ? (
        <Text style={styles.emptyText}>No notifications found</Text>
      ) : (
        notifications.map((notification) => (
          <View
            key={notification._id}
            style={[
              styles.card,
              !notification.read && styles.unreadCard,
            ]}
          >
            <Text style={styles.message}>{notification.message}</Text>
            {notification.fromUser && (
              <Text style={styles.subText}>From: {notification.fromUser.name}</Text>
            )}

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
              </Text>
              <Text style={styles.metaSeparator}>•</Text>
              <Text style={styles.metaText}>
                {notification.type.replace(/_/g, ' ')}
              </Text>
            </View>

            {!notification.read && (
              <TouchableOpacity
                onPress={() => handleMarkAsRead(notification._id)}
                style={styles.readButton}
              >
                <Text style={styles.readButtonText}>Mark as read</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: '#4AD8B0',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#4AD8B0',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: '#e6f8f3',
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  metaSeparator: {
    marginHorizontal: 6,
    color: '#666',
    fontSize: 12,
  },
  readButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#4AD8B0',
    borderRadius: 6,
  },
  readButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
  },
});

export default Notification;
