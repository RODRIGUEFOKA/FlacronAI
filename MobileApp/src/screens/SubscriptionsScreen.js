import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Card from '../components/Card';
import Button from '../components/Button';
import { COLORS, SIZES, SUBSCRIPTION_TIERS } from '../config/constants';
import { createCheckoutSession } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';

const SubscriptionsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (tierKey) => {
    setLoading(true);
    try {
      const result = await createCheckoutSession(tierKey, user?.uid);
      if (result.success && result.url) {
        // Open Stripe checkout URL
        // In production, use WebView or in-app browser
        Toast.show({
          type: 'info',
          text1: 'Redirect to Payment',
          text2: 'Opening payment page...',
        });
        // You would open result.url in a WebView here
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to create checkout session',
      });
    } finally {
      setLoading(false);
    }
  };

  const PricingCard = ({ tierKey, tier, popular = false }) => (
    <Card style={[styles.pricingCard, popular && styles.popularCard]}>
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}

      <Text style={styles.tierName}>{tier.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceSymbol}>$</Text>
        <Text style={styles.priceAmount}>{tier.price}</Text>
        <Text style={styles.pricePeriod}>/month</Text>
      </View>

      <View style={styles.featuresContainer}>
        {tier.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="checkmark-circle" size={20} color={COLORS.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <Button
        title={tierKey === user?.tier ? 'Current Plan' : 'Subscribe Now'}
        onPress={() => handleSubscribe(tierKey)}
        loading={loading}
        disabled={tierKey === user?.tier}
        fullWidth
        variant={popular ? 'primary' : 'outline'}
      />
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Plans</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Choose Your Plan</Text>
          <Text style={styles.subtitle}>
            Select the perfect plan for your insurance reporting needs
          </Text>
        </View>

        {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
          <PricingCard
            key={key}
            tierKey={key}
            tier={tier}
            popular={key === 'professional'}
          />
        ))}

        <Card style={styles.infoCard}>
          <Icon name="information-circle" size={32} color={COLORS.info} />
          <Text style={styles.infoTitle}>Need Help Choosing?</Text>
          <Text style={styles.infoText}>
            All plans include AI-powered report generation, professional templates,
            and email support. Contact us for custom enterprise solutions.
          </Text>
          <Button
            title="Contact Support"
            variant="outline"
            fullWidth
            onPress={() => {}}
          />
        </Card>

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
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pricingCard: {
    marginBottom: 20,
    position: 'relative',
  },
  popularCard: {
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  tierName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  priceSymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: -10,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.primary,
    marginHorizontal: 4,
  },
  pricePeriod: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    marginTop: 10,
  },
  featuresContainer: {
    marginBottom: 24,
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
  infoCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
});

export default SubscriptionsScreen;
