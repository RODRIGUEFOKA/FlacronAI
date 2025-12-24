import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainApp = ({ navigation }) => {
  // Form state
  const [claimNumber, setClaimNumber] = useState('');
  const [insuredName, setInsuredName] = useState('');
  const [lossDate, setLossDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [lossType, setLossType] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [lossDescription, setLossDescription] = useState('');
  const [damages, setDamages] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);

  const lossTypes = ['Fire', 'Water Damage', 'Storm', 'Theft', 'Vandalism', 'Other'];

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setLossDate(selectedDate);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userData');
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const handleQuickDemo = () => {
    setClaimNumber('CLM-2024-' + Math.floor(Math.random() * 10000));
    setInsuredName('John Smith');
    setLossDate(new Date(2024, 0, 15)); // January 15, 2024
    setLossType('Fire');
    setPropertyAddress('123 Main Street, Los Angeles, CA 90001');
    setLossDescription('Fire originated in the kitchen due to unattended cooking. Flames spread to adjacent rooms causing significant structural damage. Fire department responded within 10 minutes.');
    setDamages('Severe fire damage to kitchen (walls, cabinets, appliances), smoke damage throughout first floor, water damage from fire suppression efforts in living room and hallway, structural damage to ceiling joists above kitchen.');
    setRecommendations('Immediate board-up and security measures required. Professional fire damage restoration and smoke remediation needed. Structural engineer assessment for ceiling repairs. Replace all affected drywall, flooring, and cabinetry. Recommend complete kitchen renovation.');
    Alert.alert('Demo Data Loaded', 'Quick demo data has been filled in. You can now generate a report!');
  };

  const handleGenerateReport = async () => {
    // Validate required fields
    if (!claimNumber || !insuredName || !lossType || !lossDescription) {
      Alert.alert('Missing Information', 'Please fill in all required fields (*)');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('authToken');

      const reportData = {
        claimNumber,
        insuredName,
        lossDate: formatDate(lossDate),
        lossType,
        propertyAddress,
        lossDescription,
        damages,
        recommendations,
      };

      const response = await fetch('https://flacronai.onrender.com/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert(
          'Success!',
          'Your inspection report has been generated successfully!',
          [
            { text: 'OK', onPress: () => clearForm() }
          ]
        );
      } else {
        Alert.alert('Error', data.error || 'Failed to generate report');
      }
    } catch (error) {
      console.error('Generate report error:', error);
      Alert.alert('Error', 'Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setClaimNumber('');
    setInsuredName('');
    setLossDate(new Date());
    setLossType('');
    setPropertyAddress('');
    setLossDescription('');
    setDamages('');
    setRecommendations('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>FlacronAI</Text>
            <Text style={styles.headerSubtitle}>AI-Powered Insurance Reports</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <MaterialIcons name="logout" size={24} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Quick Demo Button */}
            <TouchableOpacity
              style={styles.demoButton}
              onPress={handleQuickDemo}
              activeOpacity={0.7}
            >
              <MaterialIcons name="flash-on" size={20} color="#FF6B35" style={styles.demoIcon} />
              <Text style={styles.demoButtonText}>Load Quick Demo</Text>
            </TouchableOpacity>

            {/* Form Card */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Generate Inspection Report</Text>

              {/* Claim Number */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Claim Number *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="CLM-2024-1234"
                  placeholderTextColor="#999"
                  value={claimNumber}
                  onChangeText={setClaimNumber}
                />
              </View>

              {/* Insured Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Insured Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  placeholderTextColor="#999"
                  value={insuredName}
                  onChangeText={setInsuredName}
                />
              </View>

              {/* Loss Date - WITH DATE PICKER */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Date of Loss *</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <MaterialIcons name="event" size={20} color="#FF6B35" style={styles.dateIcon} />
                  <Text style={styles.dateText}>{formatDate(lossDate)}</Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={lossDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    maximumDate={new Date()}
                  />
                )}
              </View>

              {/* Loss Type */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Loss Type *</Text>
                <View style={styles.lossTypeContainer}>
                  {lossTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.lossTypeChip,
                        lossType === type && styles.lossTypeChipActive,
                      ]}
                      onPress={() => setLossType(type)}
                    >
                      <Text
                        style={[
                          styles.lossTypeText,
                          lossType === type && styles.lossTypeTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Property Address */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Property Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123 Main St, City, State ZIP"
                  placeholderTextColor="#999"
                  value={propertyAddress}
                  onChangeText={setPropertyAddress}
                />
              </View>

              {/* Loss Description */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Loss Description *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Describe what happened..."
                  placeholderTextColor="#999"
                  value={lossDescription}
                  onChangeText={setLossDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Damages */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Damages Observed</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="List all damages observed..."
                  placeholderTextColor="#999"
                  value={damages}
                  onChangeText={setDamages}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Recommendations */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Recommendations</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Your recommendations..."
                  placeholderTextColor="#999"
                  value={recommendations}
                  onChangeText={setRecommendations}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearForm}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearButtonText}>Clear Form</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={handleGenerateReport}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <Ionicons name="sparkles" size={20} color="#fff" style={styles.generateIcon} />
                  <Text style={styles.generateButtonText}>
                    {loading ? 'Generating...' : 'Generate Report'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  demoButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  demoIcon: {
    marginRight: 8,
  },
  demoButtonText: {
    color: '#FF6B35',
    fontSize: 15,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  lossTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  lossTypeChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  lossTypeChipActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  lossTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  lossTypeTextActive: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '700',
  },
  generateButton: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateIcon: {
    marginRight: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default MainApp;
