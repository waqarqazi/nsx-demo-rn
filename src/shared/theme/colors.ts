/**
 * Theme colors for the Travel App
 * Centralized color management for consistent theming
 */

export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0051D5',
  primaryLight: '#5AC8FA',

  // Secondary colors
  secondary: '#FF9500',
  secondaryDark: '#FF6B00',
  secondaryLight: '#FFB84D',

  // Background colors
  background: '#FFFFFF',
  backgroundDark: '#000000',
  backgroundLight: '#F5F5F5',
  backgroundGray: '#F8F8F8',

  // Text colors
  text: '#000000',
  textDark: '#1A1A1A',
  textLight: '#666666',
  textSecondary: '#999999',
  textInverse: '#FFFFFF',

  // Status colors
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',

  // Border colors
  border: '#E5E5E5',
  borderLight: '#F0F0F0',
  borderDark: '#CCCCCC',

  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.2)',

  // Card colors
  cardBackground: '#FFFFFF',
  cardShadow: 'rgba(0, 0, 0, 0.1)',

  // Travel specific colors
  destination: '#5856D6',
  hotel: '#FF2D55',
  flight: '#007AFF',
  activity: '#FF9500',
} as const;

export type ColorKey = keyof typeof colors;
