/**
 * Emergency Response App - Centralized Theme Configuration
 * 
 * Dark maroon theme with emergency infrastructure aesthetic
 */

export const theme = {
  colors: {
    // Background colors
    background: '#000000',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',

    // Primary - Red/Maroon (Emergency Theme)
    primary: '#FF0000', // Bright Red
    primaryLight: '#FF4D4D',
    primaryDark: '#8B0000', // Maroon

    // Interactive elements
    accent: '#FF0000',
    accentLight: '#FF4D4D',

    // Text colors
    text: '#FFFFFF',
    textSecondary: '#888888',
    textMuted: '#666666',
    textDanger: '#FF0000',

    // Status colors
    success: '#00FF00', // Keep success green for clarity
    warning: '#FFA500',
    error: '#FF0000',
    info: '#4682B4',

    // Borders and dividers
    border: '#333333',
    divider: '#2A2A2A',

    // States
    disabled: '#555555',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },

  typography: {
    fontSizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fontWeights: {
      normal: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 8,
    },
  },

  layout: {
    screenPadding: 20,
    containerMaxWidth: 600,
  },
};

export type Theme = typeof theme;
