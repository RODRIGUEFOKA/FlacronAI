import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Button from '../components/Button';
import { COLORS, SIZES } from '../config/constants';
import { getClients, getClaims } from '../services/api';
import Toast from 'react-native-toast-message';

const CRMScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'clients') {
        const result = await getClients();
        if (result.success) {
          setClients(result.clients || []);
        }
      } else {
        const result = await getClaims();
        if (result.success) {
          setClaims(result.claims || []);
        }
      }
    } catch (error) {
      console.error('Error fetching CRM data:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load data',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderClientItem = ({ item }) => (
    <Card style={styles.listItem}>
      <View style={styles.itemHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>{item.email}</Text>
        </View>
        <Icon name="chevron-forward" size={24} color={COLORS.textLight} />
      </View>

      {item.phone && (
        <View style={styles.itemDetail}>
          <Icon name="call-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.itemDetailText}>{item.phone}</Text>
        </View>
      )}
    </Card>
  );

  const renderClaimItem = ({ item }) => (
    <Card style={styles.listItem}>
      <View style={styles.itemHeader}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.claimNumber}>Claim #{item.claimNumber}</Text>
      <Text style={styles.claimClient}>{item.clientName}</Text>

      <View style={styles.claimDetails}>
        <View style={styles.claimDetail}>
          <Icon name="calendar-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.claimDetailText}>{item.date}</Text>
        </View>
        <View style={styles.claimDetail}>
          <Icon name="pricetag-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.claimDetailText}>{item.type}</Text>
        </View>
      </View>
    </Card>
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return COLORS.warning + '20';
      case 'active':
        return COLORS.info + '20';
      case 'completed':
        return COLORS.success + '20';
      case 'closed':
        return COLORS.textLight + '20';
      default:
        return COLORS.border;
    }
  };

  const EmptyState = ({ type }) => (
    <View style={styles.emptyState}>
      <Icon
        name={type === 'clients' ? 'people-outline' : 'document-text-outline'}
        size={80}
        color={COLORS.textLight}
      />
      <Text style={styles.emptyTitle}>
        No {type === 'clients' ? 'Clients' : 'Claims'} Yet
      </Text>
      <Text style={styles.emptyText}>
        Start adding {type === 'clients' ? 'clients' : 'claims'} to manage your work better
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CRM</Text>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="add-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'clients' && styles.activeTab]}
          onPress={() => setActiveTab('clients')}
        >
          <Icon
            name="people"
            size={20}
            color={activeTab === 'clients' ? COLORS.primary : COLORS.textLight}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'clients' && styles.activeTabText,
            ]}
          >
            Clients
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'claims' && styles.activeTab]}
          onPress={() => setActiveTab('claims')}
        >
          <Icon
            name="document-text"
            size={20}
            color={activeTab === 'claims' ? COLORS.primary : COLORS.textLight}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'claims' && styles.activeTabText,
            ]}
          >
            Claims
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'clients' ? clients : claims}
        renderItem={activeTab === 'clients' ? renderClientItem : renderClaimItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={!loading && <EmptyState type={activeTab} />}
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
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.padding,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.textLight,
    marginLeft: 8,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  listContainer: {
    padding: SIZES.padding,
  },
  listItem: {
    marginBottom: SIZES.padding,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  itemDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemDetailText: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
    textTransform: 'uppercase',
  },
  claimNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  claimClient: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  claimDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  claimDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  claimDetailText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: 6,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
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
    lineHeight: 22,
  },
});

export default CRMScreen;
