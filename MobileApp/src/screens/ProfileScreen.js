import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { COLORS, SIZES } from '../config/constants';
import { getUserUsage } from '../services/api';
import { getAppSettings, saveAppSettings } from '../services/storage';
import { getInitials } from '../utils/helpers';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [usage, setUsage] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    theme: 'light',
  });

  useEffect(() => {
    fetchUserData();
    loadSettings();
  }, []);

  const fetchUserData = async () => {
    try {
      const result = await getUserUsage();
      if (result.success) {
        setUsage(result.usage);
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const loadSettings = async () => {
    const savedSettings = await getAppSettings();
    setSettings(savedSettings);
  };

  const handleSettingChange = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveAppSettings(newSettings);
    Toast.show({
      type: 'success',
      text1: 'Settings Updated',
      text2: 'Your preferences have been saved',
    });
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  };

  const MenuItem = ({ icon, title, value, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <Icon name={icon} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {value && <Text style={styles.menuValue}>{value}</Text>}
        {showArrow && <Icon name="chevron-forward" size={20} color={COLORS.textLight} />}
      </View>
    </TouchableOpacity>
  );

  const SettingItem = ({ icon, title, value, onValueChange }) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.menuIcon}>
          <Icon name={icon} size={22} color={COLORS.primary} />
        </View>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.border, true: COLORS.primary + '80' }}
        thumbColor={value ? COLORS.primary : COLORS.disabled}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card elevated style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>
                {getInitials(user?.displayName || 'User')}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.displayName || 'User'}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <View style={styles.tierBadge}>
                <Icon name="flash" size={16} color={COLORS.primary} />
                <Text style={styles.tierText}>{usage?.tierName || 'Starter'}</Text>
              </View>
            </View>
          </View>

          {usage?.tier !== 'enterprise' && (
            <Button
              title="Upgrade Plan"
              onPress={() => navigation.navigate('Subscriptions')}
              variant="outline"
              fullWidth
              style={styles.upgradeButton}
            />
          )}
        </Card>

        {/* Account Section */}
        <Text style={styles.sectionTitle}>Account</Text>
        <Card>
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => {}}
          />
          <MenuItem
            icon="mail-outline"
            title="Email"
            value={user?.email}
            showArrow={false}
          />
          <MenuItem
            icon="stats-chart-outline"
            title="Usage Statistics"
            value={`${usage?.periodUsage || 0} reports`}
            onPress={() => {}}
          />
        </Card>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <Card>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            value={settings.notifications}
            onValueChange={(value) => handleSettingChange('notifications', value)}
          />
          <SettingItem
            icon="save-outline"
            title="Auto-Save Drafts"
            value={settings.autoSave}
            onValueChange={(value) => handleSettingChange('autoSave', value)}
          />
        </Card>

        {/* Help & Support */}
        <Text style={styles.sectionTitle}>Help & Support</Text>
        <Card>
          <MenuItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => {}}
          />
          <MenuItem
            icon="chatbubble-ellipses-outline"
            title="Contact Support"
            onPress={() => {}}
          />
          <MenuItem
            icon="document-text-outline"
            title="Terms of Service"
            onPress={() => {}}
          />
          <MenuItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => {}}
          />
        </Card>

        {/* About */}
        <Text style={styles.sectionTitle}>About</Text>
        <Card>
          <MenuItem
            icon="information-circle-outline"
            title="App Version"
            value="1.0.0"
            showArrow={false}
          />
          <MenuItem
            icon="star-outline"
            title="Rate App"
            onPress={() => {}}
          />
        </Card>

        {/* Logout Button */}
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="danger"
          fullWidth
          style={styles.logoutButton}
          icon={<Icon name="log-out-outline" size={20} color={COLORS.white} />}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  profileCard: {
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.white,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  upgradeButton: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: SIZES.font,
    fontWeight: '500',
    color: COLORS.text,
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuValue: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoutButton: {
    marginTop: 24,
  },
});

export default ProfileScreen;
