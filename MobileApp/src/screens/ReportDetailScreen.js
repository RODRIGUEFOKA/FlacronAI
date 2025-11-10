import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingOverlay from '../components/LoadingOverlay';
import { COLORS, SIZES } from '../config/constants';
import { getReport, exportReport } from '../services/api';
import { formatDate } from '../utils/helpers';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import RNShare from 'react-native-share';

const ReportDetailScreen = ({ route, navigation }) => {
  const { reportId } = route.params;
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const result = await getReport(reportId);
      if (result.success) {
        setReport(result.report);
      }
    } catch (error) {
      console.error('Error fetching report:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load report',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    setExporting(true);
    try {
      const result = await exportReport(reportId, format);

      if (result.success && result.url) {
        // Download file
        const localFile = `${RNFS.DocumentDirectoryPath}/report_${reportId}.${format}`;
        const downloadResult = await RNFS.downloadFile({
          fromUrl: result.url,
          toFile: localFile,
        }).promise;

        if (downloadResult.statusCode === 200) {
          // Share file
          await RNShare.open({
            url: `file://${localFile}`,
            title: 'Share Report',
          });

          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: `Report exported as ${format.toUpperCase()}`,
          });
        }
      }
    } catch (error) {
      console.error('Export error:', error);
      Toast.show({
        type: 'error',
        text1: 'Export Failed',
        text2: error.message || 'Failed to export report',
      });
    } finally {
      setExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: report?.content || 'Report content',
        title: 'Insurance Report',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  if (loading) {
    return <LoadingOverlay visible={true} message="Loading report..." />;
  }

  if (!report) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorState}>
          <Icon name="alert-circle-outline" size={80} color={COLORS.error} />
          <Text style={styles.errorText}>Report not found</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Details</Text>
        <TouchableOpacity onPress={handleShare}>
          <Icon name="share-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Report Info Card */}
        <Card elevated>
          <Text style={styles.reportType}>{report.reportType || 'Insurance Report'}</Text>
          <Text style={styles.reportDate}>{formatDate(report.createdAt)}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Claim Number</Text>
              <Text style={styles.infoValue}>{report.claimNumber}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Insured Name</Text>
              <Text style={styles.infoValue}>{report.insuredName}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Loss Type</Text>
              <Text style={styles.infoValue}>{report.lossType}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Loss Date</Text>
              <Text style={styles.infoValue}>{formatDate(report.lossDate)}</Text>
            </View>
          </View>
        </Card>

        {/* Report Content */}
        <Card>
          <Text style={styles.sectionTitle}>Report Content</Text>
          <Text style={styles.reportContent}>{report.content}</Text>
        </Card>

        {/* Property Details */}
        {report.propertyAddress && (
          <Card>
            <Text style={styles.sectionTitle}>Property Details</Text>
            <Text style={styles.propertyAddress}>{report.propertyAddress}</Text>
            {report.propertyDetails && (
              <Text style={styles.propertyDetails}>{report.propertyDetails}</Text>
            )}
          </Card>
        )}

        {/* Export Actions */}
        <Card>
          <Text style={styles.sectionTitle}>Export Options</Text>
          <View style={styles.exportButtons}>
            <Button
              title="Export as PDF"
              onPress={() => handleExport('pdf')}
              variant="outline"
              style={styles.exportButton}
              icon={<Icon name="document-outline" size={20} color={COLORS.primary} />}
            />
            <Button
              title="Export as DOCX"
              onPress={() => handleExport('docx')}
              variant="outline"
              style={styles.exportButton}
              icon={<Icon name="document-text-outline" size={20} color={COLORS.primary} />}
            />
            <Button
              title="Export as HTML"
              onPress={() => handleExport('html')}
              variant="outline"
              style={styles.exportButton}
              icon={<Icon name="code-outline" size={20} color={COLORS.primary} />}
            />
          </View>
        </Card>

        <View style={{ height: 40 }} />
      </ScrollView>

      <LoadingOverlay visible={exporting} message="Exporting report..." />
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
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  reportType: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  reportDate: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  infoGrid: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  reportContent: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 24,
  },
  propertyAddress: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  propertyDetails: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  exportButtons: {
    gap: 12,
  },
  exportButton: {
    marginBottom: 8,
  },
  errorState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.error,
    marginVertical: 20,
  },
});

export default ReportDetailScreen;
