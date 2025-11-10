// App Constants
export const APP_NAME = 'FlacronAI';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';

// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Stripe Configuration
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

// App Colors (matching web design)
export const COLORS = {
  primary: '#FF7C08',
  primaryDark: '#E66F07',
  primaryLight: '#FFA047',
  secondary: '#1f2937',
  accent: '#10b981',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  textLight: '#9ca3af',
  border: '#e5e7eb',
  disabled: '#d1d5db',
  white: '#ffffff',
  black: '#000000',
};

// App Dimensions
export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  padding: 16,
  radius: 12,
};

// Report Types
export const REPORT_TYPES = [
  { label: 'First Report', value: 'First Report' },
  { label: 'Interim Report', value: 'Interim Report' },
  { label: 'Final Report', value: 'Final Report' },
];

// Loss Types
export const LOSS_TYPES = [
  { label: 'Fire', value: 'Fire' },
  { label: 'Water', value: 'Water' },
  { label: 'Wind', value: 'Wind' },
  { label: 'Mold', value: 'Mold' },
  { label: 'Theft', value: 'Theft' },
  { label: 'Vandalism', value: 'Vandalism' },
  { label: 'Other', value: 'Other' },
];

// Subscription Tiers
export const SUBSCRIPTION_TIERS = {
  starter: {
    name: 'Starter',
    price: 0,
    priceDisplay: 'Free',
    reportsPerMonth: 1,
    features: [
      'Basic reports',
      'PDF export',
      '1 report per month',
      'Email support',
    ],
  },
  professional: {
    name: 'Professional',
    price: 39.99,
    priceDisplay: '$39.99/month',
    reportsPerMonth: 20,
    features: [
      'All report types',
      'PDF & DOCX export',
      '20 reports per month',
      'No watermark',
      'Custom logo',
      'Email support',
    ],
  },
  agency: {
    name: 'Agency',
    price: 99.99,
    priceDisplay: '$99.99/month',
    reportsPerMonth: 100,
    features: [
      '100 reports per month',
      '5 user accounts',
      'All export formats',
      'Agency dashboard',
      'Custom branding',
      'Priority support',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    price: 499,
    priceDisplay: '$499/month',
    reportsPerMonth: -1,
    features: [
      'Unlimited reports',
      'Unlimited users',
      'API access',
      'White-label portal',
      'Custom integration',
      'Dedicated support',
    ],
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@flacronai_user_token',
  USER_DATA: '@flacronai_user_data',
  DRAFT_REPORTS: '@flacronai_draft_reports',
  OFFLINE_QUEUE: '@flacronai_offline_queue',
  APP_SETTINGS: '@flacronai_settings',
};
