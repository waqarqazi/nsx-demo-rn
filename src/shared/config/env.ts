/**
 * Environment configuration
 * Centralized access to environment variables
 * Type-safe environment variable access
 */

// Safely import environment variables with fallbacks
let API_BASE_URL = '';
let API_TIMEOUT = '30000';
let NODE_ENV = 'development';
let APP_ENV = 'development';
let SENTRY_DSN = '';
let SENTRY_ENABLED = 'false';
let SENTRY_TRACES_SAMPLE_RATE = '1.0';
let FIREBASE_ENABLED = 'false';
let CODEPUSH_IOS_DEPLOYMENT_KEY = '';
let CODEPUSH_ANDROID_DEPLOYMENT_KEY = '';
let ENABLE_ANALYTICS = 'false';
let ENABLE_CRASHLYTICS = 'false';
let APP_NAME = 'Travel App';
let APP_VERSION = '0.0.1';

try {
  const envVars = require('@env');
  API_BASE_URL = envVars.API_BASE_URL || API_BASE_URL;
  API_TIMEOUT = envVars.API_TIMEOUT || API_TIMEOUT;
  NODE_ENV = envVars.NODE_ENV || NODE_ENV;
  APP_ENV = envVars.APP_ENV || APP_ENV;
  SENTRY_DSN = envVars.SENTRY_DSN || SENTRY_DSN;
  SENTRY_ENABLED = envVars.SENTRY_ENABLED || SENTRY_ENABLED;
  SENTRY_TRACES_SAMPLE_RATE = envVars.SENTRY_TRACES_SAMPLE_RATE || SENTRY_TRACES_SAMPLE_RATE;
  FIREBASE_ENABLED = envVars.FIREBASE_ENABLED || FIREBASE_ENABLED;
  CODEPUSH_IOS_DEPLOYMENT_KEY = envVars.CODEPUSH_IOS_DEPLOYMENT_KEY || CODEPUSH_IOS_DEPLOYMENT_KEY;
  CODEPUSH_ANDROID_DEPLOYMENT_KEY =
    envVars.CODEPUSH_ANDROID_DEPLOYMENT_KEY || CODEPUSH_ANDROID_DEPLOYMENT_KEY;
  ENABLE_ANALYTICS = envVars.ENABLE_ANALYTICS || ENABLE_ANALYTICS;
  ENABLE_CRASHLYTICS = envVars.ENABLE_CRASHLYTICS || ENABLE_CRASHLYTICS;
  APP_NAME = envVars.APP_NAME || APP_NAME;
  APP_VERSION = envVars.APP_VERSION || APP_VERSION;
} catch (error) {
  // Environment variables not loaded, using defaults
  // This is fine - the app will work with default values
}

interface EnvConfig {
  API_BASE_URL: string;
  API_TIMEOUT: string;
  NODE_ENV: string;
  APP_ENV: string;
  SENTRY_DSN: string;
  SENTRY_ENABLED: string;
  SENTRY_TRACES_SAMPLE_RATE: string;
  FIREBASE_ENABLED: string;
  CODEPUSH_IOS_DEPLOYMENT_KEY: string;
  CODEPUSH_ANDROID_DEPLOYMENT_KEY: string;
  ENABLE_ANALYTICS: string;
  ENABLE_CRASHLYTICS: string;
  APP_NAME: string;
  APP_VERSION: string;
}

// Environment variables loaded via react-native-dotenv
const env: EnvConfig = {
  API_BASE_URL: API_BASE_URL || 'https://api.travel-demo.com/v1',
  API_TIMEOUT: API_TIMEOUT || '30000',
  NODE_ENV: NODE_ENV || 'development',
  APP_ENV: APP_ENV || 'development',
  SENTRY_DSN: SENTRY_DSN || '',
  SENTRY_ENABLED: SENTRY_ENABLED || 'false',
  SENTRY_TRACES_SAMPLE_RATE: SENTRY_TRACES_SAMPLE_RATE || '1.0',
  FIREBASE_ENABLED: FIREBASE_ENABLED || 'false',
  CODEPUSH_IOS_DEPLOYMENT_KEY: CODEPUSH_IOS_DEPLOYMENT_KEY || '',
  CODEPUSH_ANDROID_DEPLOYMENT_KEY: CODEPUSH_ANDROID_DEPLOYMENT_KEY || '',
  ENABLE_ANALYTICS: ENABLE_ANALYTICS || 'false',
  ENABLE_CRASHLYTICS: ENABLE_CRASHLYTICS || 'false',
  APP_NAME: APP_NAME || 'Travel App',
  APP_VERSION: APP_VERSION || '0.0.1',
};

/**
 * Get environment variable as string
 */
export const getEnv = (key: keyof EnvConfig): string => {
  return env[key] || '';
};

/**
 * Get environment variable as boolean
 */
export const getEnvBool = (key: keyof EnvConfig): boolean => {
  const value = env[key]?.toLowerCase();
  return value === 'true' || value === '1';
};

/**
 * Get environment variable as number
 */
export const getEnvNumber = (key: keyof EnvConfig): number => {
  const value = env[key];
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
};

/**
 * Check if running in development
 */
export const isDevelopment = (): boolean => {
  return getEnv('NODE_ENV') === 'development' || getEnv('APP_ENV') === 'development';
};

/**
 * Check if running in production
 */
export const isProduction = (): boolean => {
  return getEnv('NODE_ENV') === 'production' || getEnv('APP_ENV') === 'production';
};

/**
 * Get API base URL
 */
export const getApiBaseUrl = (): string => {
  return getEnv('API_BASE_URL');
};

/**
 * Get API timeout
 */
export const getApiTimeout = (): number => {
  return getEnvNumber('API_TIMEOUT') || 30000;
};

/**
 * Get Sentry DSN
 */
export const getSentryDsn = (): string => {
  return getEnv('SENTRY_DSN');
};

/**
 * Check if Sentry is enabled
 */
export const isSentryEnabled = (): boolean => {
  return getEnvBool('SENTRY_ENABLED') && !!getSentryDsn();
};

/**
 * Get Sentry traces sample rate
 */
export const getSentryTracesSampleRate = (): number => {
  return parseFloat(getEnv('SENTRY_TRACES_SAMPLE_RATE')) || 1.0;
};

/**
 * Check if Firebase is enabled
 */
export const isFirebaseEnabled = (): boolean => {
  return getEnvBool('FIREBASE_ENABLED');
};

/**
 * Get CodePush deployment key for iOS
 */
export const getCodePushIosKey = (): string => {
  return getEnv('CODEPUSH_IOS_DEPLOYMENT_KEY');
};

/**
 * Get CodePush deployment key for Android
 */
export const getCodePushAndroidKey = (): string => {
  return getEnv('CODEPUSH_ANDROID_DEPLOYMENT_KEY');
};

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return getEnvBool('ENABLE_ANALYTICS');
};

/**
 * Check if Crashlytics is enabled
 */
export const isCrashlyticsEnabled = (): boolean => {
  return getEnvBool('ENABLE_CRASHLYTICS');
};

export default env;
