import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { AIAssistantBubble } from '../components/AIAssistant';
import AnimatedBlobBackground from '../components/AnimatedBlobBackground';
import { reportService } from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#FF7C08',
  primaryDark: '#ff9533',
  background: '#FFFFFF',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  border: '#e5e7eb',
  success: '#10b981',
};

const normalize = (size) => {
  const scale = SCREEN_WIDTH / 375;
  return Math.round(size * scale);
};

export default function GenerateReportScreen({ onShowAIAssistant, onTabChange }) {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [formData, setFormData] = useState({
    claimNumber: '',
    insuredName: '',
    lossDate: '',
    lossType: 'Fire',
    propertyAddress: '',
    lossDescription: '',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotos(prev => [...prev, ...result.assets]);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const generateReport = async () => {
    if (!formData.claimNumber || !formData.insuredName) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const result = await reportService.generateReport(formData, photos);

      if (result.success) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert(
          'Success',
          'Report generated successfully!',
          [
            {
              text: 'View Reports',
              onPress: () => onTabChange?.('reports'),
            },
            {
              text: 'Generate Another',
              onPress: () => {
                setFormData({
                  claimNumber: '',
                  insuredName: '',
                  lossDate: '',
                  lossType: 'Fire',
                  propertyAddress: '',
                  lossDescription: '',
                });
                setPhotos([]);
              },
            },
          ]
        );
      }
    } catch (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Error', error.message || 'Failed to generate report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AnimatedBlobBackground />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.pageTitle}>Generate New Report</Text>

          {/* Claim Information Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Claim Information</Text>

            <Text style={styles.label}>Claim Number *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter claim number"
              value={formData.claimNumber}
              onChangeText={(value) => updateField('claimNumber', value)}
              placeholderTextColor={COLORS.textMuted}
            />

            <Text style={styles.label}>Insured Name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter insured name"
              value={formData.insuredName}
              onChangeText={(value) => updateField('insuredName', value)}
              placeholderTextColor={COLORS.textMuted}
            />

            <Text style={styles.label}>Loss Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formData.lossDate}
              onChangeText={(value) => updateField('lossDate', value)}
              placeholderTextColor={COLORS.textMuted}
            />

            <Text style={styles.label}>Loss Type</Text>
            <View style={styles.lossTypeContainer}>
              {['Fire', 'Water', 'Theft', 'Other'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.lossTypeChip,
                    formData.lossType === type && styles.lossTypeChipActive,
                  ]}
                  onPress={() => {
                    updateField('lossType', type);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Text
                    style={[
                      styles.lossTypeText,
                      formData.lossType === type && styles.lossTypeTextActive,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Property Details</Text>

            <Text style={styles.label}>Property Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter property address"
              value={formData.propertyAddress}
              onChangeText={(value) => updateField('propertyAddress', value)}
              multiline
              numberOfLines={2}
              placeholderTextColor={COLORS.textMuted}
            />

            <Text style={styles.label}>Loss Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the loss or damage"
              value={formData.lossDescription}
              onChangeText={(value) => updateField('lossDescription', value)}
              multiline
              numberOfLines={4}
              placeholderTextColor={COLORS.textMuted}
            />
          </View>

          {/* Photos Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Damage Photos</Text>

            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <LinearGradient
                colors={['#FF7C08', '#ff9533']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadGradient}
              >
                <Ionicons name="camera-outline" size={24} color="#FFFFFF" />
                <Text style={styles.uploadText}>Add Photos</Text>
              </LinearGradient>
            </TouchableOpacity>

            {photos.length > 0 && (
              <View style={styles.photoGrid}>
                {photos.map((photo, index) => (
                  <View key={index} style={styles.photoItem}>
                    <Image source={{ uri: photo.uri }} style={styles.photoImage} />
                    <TouchableOpacity
                      style={styles.removePhoto}
                      onPress={() => {
                        setPhotos(prev => prev.filter((_, i) => i !== index));
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                    >
                      <Ionicons name="close-circle" size={24} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generateReport}
            disabled={loading}
          >
            <LinearGradient
              colors={['#FF7C08', '#ff9533']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.generateGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons name="sparkles-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.generateButtonText}>Generate Report with AI</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      <AIAssistantBubble onPress={onShowAIAssistant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 60,
  },
  pageTitle: {
    fontSize: normalize(28),
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
  },
  label: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: normalize(15),
    color: COLORS.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  lossTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  lossTypeChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f9fafb',
  },
  lossTypeChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#fff7ed',
  },
  lossTypeText: {
    fontSize: normalize(14),
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  lossTypeTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  uploadButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  uploadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: normalize(16),
    fontWeight: '600',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  photoItem: {
    width: '31%',
    aspectRatio: 1,
    marginRight: '2%',
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  removePhoto: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  generateButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 12,
    shadowColor: '#FF7C08',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  generateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(17),
    fontWeight: '700',
  },
});
