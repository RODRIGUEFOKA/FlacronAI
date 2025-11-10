import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../config/constants';

const { width, height } = Dimensions.get('window');

export const theme = {
  colors: COLORS,
  sizes: SIZES,
  dimensions: {
    width,
    height,
    isSmallDevice: width < 375,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      color: COLORS.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      color: COLORS.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      color: COLORS.text,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
      color: COLORS.text,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      color: COLORS.text,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      color: COLORS.textSecondary,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      color: COLORS.textLight,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    ...theme.shadows.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
  textSemiBold: {
    fontWeight: '600',
  },
  textPrimary: {
    color: COLORS.primary,
  },
  textSecondary: {
    color: COLORS.textSecondary,
  },
  textLight: {
    color: COLORS.textLight,
  },
  textError: {
    color: COLORS.error,
  },
  textSuccess: {
    color: COLORS.success,
  },
  marginBottom: {
    marginBottom: SIZES.padding,
  },
  marginTop: {
    marginTop: SIZES.padding,
  },
  paddingHorizontal: {
    paddingHorizontal: SIZES.padding,
  },
  paddingVertical: {
    paddingVertical: SIZES.padding,
  },
});

export default theme;
