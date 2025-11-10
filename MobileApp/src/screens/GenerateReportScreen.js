import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import LoadingOverlay from '../components/LoadingOverlay';
import { COLORS, SIZES, REPORT_TYPES, LOSS_TYPES } from '../config/constants';
import { generateReport, uploadReportImages } from '../services/api';
import { saveDraftReport } from '../services/storage';
import Toast from 'react-native-toast-message';

const GenerateReportScreen = ({ navigation }) => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    claimNumber: '',
    insuredName: '',
    lossDate: '',
    lossType: '',
    reportType: '',
    propertyAddress: '',
    propertyDetails: '',
    lossDescription: '',
    damages: '',
    recommendations: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const selectPhotos = () => {
    Alert.alert(
      'Select Photos',
      'Choose photo source',
      [
        {
          text: 'Camera',
          onPress: () => launchCamera({ mediaType: 'photo', quality: 0.8 }, handlePhotoResponse),
        },
        {
          text: 'Gallery',
          onPress: () => launchImageLibrary({ mediaType: 'photo', quality: 0.8, selectionLimit: 10 }, handlePhotoResponse),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handlePhotoResponse = (response) => {
    if (response.didCancel) return;
    if (response.errorMessage) {
      Toast.show({
        type: 'error',
        text1: 'Photo Error',
        text2: response.errorMessage,
      });
      return;
    }

    if (response.assets) {
      setPhotos([...photos, ...response.assets]);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const saveDraft = async () => {
    await saveDraftReport(formData);
    Toast.show({
      type: 'success',
      text1: 'Draft Saved',
      text2: 'Your report has been saved as a draft',
    });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.claimNumber || !formData.insuredName || !formData.lossType) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please fill in all required fields',
      });
      return;
    }

    setLoading(true);
    setLoadingMessage('Generating your report with AI...');

    try {
      // Generate report
      const result = await generateReport({
        ...formData,
        userId: user?.uid,
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate report');
      }

      setLoadingMessage('Uploading photos...');

      // Upload photos if any
      if (photos.length > 0) {
        await uploadReportImages(result.reportId, photos);
      }

      Toast.show({
        type: 'success',
        text1: 'Report Generated!',
        text2: 'Your report has been successfully created',
      });

      // Navigate to report detail
      navigation.navigate('ReportDetail', { reportId: result.reportId });
    } catch (error) {
      console.error('Generate report error:', error);
      Toast.show({
        type: 'error',
        text1: 'Generation Failed',
        text2: error.message || 'Failed to generate report',
      });
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const PickerButton = ({ label, value, options, onChange, placeholder }) => (
    <View style={styles.pickerContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerButtons}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.pickerButton,
              value === option.value && styles.pickerButtonActive,
            ]}
            onPress={() => onChange(option.value)}
          >
            <Text
              style={[
                styles.pickerButtonText,
                value === option.value && styles.pickerButtonTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Generate Report</Text>
        <TouchableOpacity onPress={saveDraft}>
          <Icon name="save-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card>
          <Text style={styles.sectionTitle}>Claim Information</Text>

          <Input
            label="Claim Number *"
            placeholder="Enter claim number"
            value={formData.claimNumber}
            onChangeText={(value) => handleChange('claimNumber', value)}
          />

          <Input
            label="Insured Name *"
            placeholder="Enter insured name"
            value={formData.insuredName}
            onChangeText={(value) => handleChange('insuredName', value)}
          />

          <Input
            label="Loss Date *"
            placeholder="YYYY-MM-DD"
            value={formData.lossDate}
            onChangeText={(value) => handleChange('lossDate', value)}
          />

          <PickerButton
            label="Loss Type *"
            value={formData.lossType}
            options={LOSS_TYPES}
            onChange={(value) => handleChange('lossType', value)}
            placeholder="Select loss type"
          />

          <PickerButton
            label="Report Type *"
            value={formData.reportType}
            options={REPORT_TYPES}
            onChange={(value) => handleChange('reportType', value)}
            placeholder="Select report type"
          />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Property Details</Text>

          <Input
            label="Property Address *"
            placeholder="Enter property address"
            value={formData.propertyAddress}
            onChangeText={(value) => handleChange('propertyAddress', value)}
          />

          <Input
            label="Property Details"
            placeholder="e.g., 2-story single-family home..."
            value={formData.propertyDetails}
            onChangeText={(value) => handleChange('propertyDetails', value)}
            multiline
            numberOfLines={3}
          />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Loss Description</Text>

          <Input
            label="Description of Loss *"
            placeholder="Describe what happened..."
            value={formData.lossDescription}
            onChangeText={(value) => handleChange('lossDescription', value)}
            multiline
            numberOfLines={4}
          />

          <Input
            label="Damages Observed *"
            placeholder="List all damages observed..."
            value={formData.damages}
            onChangeText={(value) => handleChange('damages', value)}
            multiline
            numberOfLines={4}
          />

          <Input
            label="Recommendations"
            placeholder="Your recommendations..."
            value={formData.recommendations}
            onChangeText={(value) => handleChange('recommendations', value)}
            multiline
            numberOfLines={3}
          />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Photos (Optional)</Text>
          <Button
            title="Add Photos"
            onPress={selectPhotos}
            variant="outline"
            icon={<Icon name="camera-outline" size={20} color={COLORS.primary} />}
          />

          {photos.length > 0 && (
            <View style={styles.photosContainer}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoItem}>
                  <Text style={styles.photoName}>{photo.fileName}</Text>
                  <TouchableOpacity onPress={() => removePhoto(index)}>
                    <Icon name="close-circle" size={24} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        <Button
          title="Generate Report"
          onPress={handleSubmit}
          loading={loading}
          fullWidth
          size="large"
          style={styles.submitButton}
        />

        <View style={{ height: 40 }} />
      </ScrollView>

      <LoadingOverlay visible={loading} message={loadingMessage} />
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  label: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  pickerContainer: {
    marginBottom: SIZES.padding,
  },
  pickerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  pickerButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    margin: 4,
    backgroundColor: COLORS.surface,
  },
  pickerButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pickerButtonText: {
    fontSize: SIZES.font,
    color: COLORS.text,
  },
  pickerButtonTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  photosContainer: {
    marginTop: 16,
  },
  photoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  photoName: {
    fontSize: SIZES.font,
    color: COLORS.text,
    flex: 1,
  },
  submitButton: {
    marginTop: 8,
  },
});

export default GenerateReportScreen;
