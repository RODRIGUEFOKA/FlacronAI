import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { COLORS, SIZES } from '../config/constants';
import { getUserUsage } from '../services/api';
import { formatDate, getUsageColor, calculateUsagePercentage } from '../utils/helpers';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      const result = await getUserUsage();
      if (result.success) {
        setUsage(result.usage);
      }
    } catch (error) {
      console.error('Error fetching usage:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsage();
  };

  const QuickActionCard = ({ icon, title, description, onPress, color }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color + '20' }]}>
        <Icon name={icon} size={28} color={color} />
      </View>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionDesc}>{description}</Text>
    </TouchableOpacity>
  );

  const usagePercentage = usage
    ? calculateUsagePercentage(usage.periodUsage, usage.limit)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Welcome back,
          </Text>
          <Text style={styles.userName}>{user?.displayName || 'User'}</Text>
        </View>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => navigation.navigate('Subscriptions')}
        >
          <Icon name="flash" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Usage Card */}
        <Card elevated>
          <View style={styles.usageHeader}>
            <Text style={styles.usageTitle}>Current Plan: {usage?.tierName || 'Starter'}</Text>
            {usage?.tier !== 'enterprise' && (
              <TouchableOpacity onPress={() => navigation.navigate('Subscriptions')}>
                <Text style={styles.upgradeText}>Upgrade</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.usageStats}>
            <View style={styles.usageStat}>
              <Text style={styles.usageStatValue}>
                {usage?.periodUsage || 0}
              </Text>
              <Text style={styles.usageStatLabel}>Reports Used</Text>
            </View>
            <View style={styles.usageStatDivider} />
            <View style={styles.usageStat}>
              <Text style={styles.usageStatValue}>
                {usage?.limit === -1 ? '∞' : usage?.remaining || 0}
              </Text>
              <Text style={styles.usageStatLabel}>Remaining</Text>
            </View>
          </View>

          {usage?.limit !== -1 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${usagePercentage}%`,
                      backgroundColor: getUsageColor(usagePercentage),
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {usagePercentage}% of monthly limit used
              </Text>
            </View>
          )}
        </Card>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            icon="document-text-outline"
            title="Generate Report"
            description="Create new report"
            color={COLORS.primary}
            onPress={() => navigation.navigate('GenerateReport')}
          />
          <QuickActionCard
            icon="folder-open-outline"
            title="My Reports"
            description="View all reports"
            color={COLORS.info}
            onPress={() => navigation.navigate('Reports')}
          />
          <QuickActionCard
            icon="people-outline"
            title="CRM"
            description="Manage clients"
            color={COLORS.success}
            onPress={() => navigation.navigate('CRM')}
          />
          <QuickActionCard
            icon="settings-outline"
            title="Settings"
            description="Account settings"
            color={COLORS.textSecondary}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>

        {/* Features Overview */}
        <Text style={styles.sectionTitle}>What You Can Do</Text>
        <Card>
          <View style={styles.featureItem}>
            <Icon name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.featureText}>AI-powered report generation</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.featureText}>Export to PDF, DOCX, and HTML</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.featureText}>Photo upload and analysis</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="checkmark-circle" size={24} color={COLORS.success} />
            <Text style={styles.featureText}>Client and claim management</Text>
          </View>
        </Card>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding * 1.5,
    backgroundColor: COLORS.surface,
  },
  greeting: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 4,
  },
  upgradeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  usageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  upgradeText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.primary,
  },
  usageStats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  usageStat: {
    flex: 1,
    alignItems: 'center',
  },
  usageStatValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
  },
  usageStatLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  usageStatDivider: {
    width: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    marginBottom: 16,
  },
  quickAction: {
    width: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    margin: 6,
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionDesc: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: 12,
    flex: 1,
  },
});

export default DashboardScreen;
