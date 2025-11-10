import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Button from '../components/Button';
import { COLORS, SIZES } from '../config/constants';
import { getReports, deleteReport } from '../services/api';
import { formatDate, showConfirmation } from '../utils/helpers';
import Toast from 'react-native-toast-message';

const ReportsScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const result = await getReports();
      if (result.success) {
        setReports(result.reports || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load reports',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  const handleDelete = (reportId) => {
    showConfirmation(
      'Delete Report',
      'Are you sure you want to delete this report?',
      async () => {
        try {
          const result = await deleteReport(reportId);
          if (result.success) {
            setReports(reports.filter((r) => r.id !== reportId));
            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Report deleted successfully',
            });
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to delete report',
          });
        }
      }
    );
  };

  const renderReportItem = ({ item }) => (
    <Card
      style={styles.reportCard}
      onPress={() => navigation.navigate('ReportDetail', { reportId: item.id })}
    >
      <View style={styles.reportHeader}>
        <View style={styles.reportIcon}>
          <Icon name="document-text" size={24} color={COLORS.primary} />
        </View>
        <View style={styles.reportInfo}>
          <Text style={styles.reportTitle}>{item.reportType || 'Insurance Report'}</Text>
          <Text style={styles.reportDate}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.reportDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Claim:</Text>
          <Text style={styles.detailValue}>{item.claimNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Insured:</Text>
          <Text style={styles.detailValue}>{item.insuredName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Loss Type:</Text>
          <Text style={styles.detailValue}>{item.lossType}</Text>
        </View>
      </View>

      <View style={styles.reportActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('ReportDetail', { reportId: item.id })}
        >
          <Icon name="eye-outline" size={20} color={COLORS.info} />
          <Text style={[styles.actionText, { color: COLORS.info }]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="trash-outline" size={20} color={COLORS.error} />
          <Text style={[styles.actionText, { color: COLORS.error }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="document-text-outline" size={80} color={COLORS.textLight} />
      <Text style={styles.emptyTitle}>No Reports Yet</Text>
      <Text style={styles.emptyText}>
        You haven't generated any reports yet. Create your first one!
      </Text>
      <Button
        title="Generate Report"
        onPress={() => navigation.navigate('GenerateReport')}
        style={styles.emptyButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Reports</Text>
        <TouchableOpacity onPress={() => navigation.navigate('GenerateReport')}>
          <Icon name="add-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={!loading && <EmptyState />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
    padding: SIZES.padding,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },
  listContainer: {
    padding: SIZES.padding,
  },
  reportCard: {
    marginBottom: SIZES.padding,
  },
  reportHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  reportDate: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  reportDetails: {
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    width: 80,
  },
  detailValue: {
    flex: 1,
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '500',
  },
  reportActions: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyButton: {
    paddingHorizontal: 32,
  },
});

export default ReportsScreen;
