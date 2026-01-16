/**
 * TypeScript declarations for environment variables
 * This file provides type safety for environment variables
 */

declare module '@env' {
  export const API_BASE_URL: string;
  export const API_TIMEOUT: string;
  export const NODE_ENV: string;
  export const APP_ENV: string;
  export const SENTRY_DSN: string;
  export const SENTRY_ENABLED: string;
  export const SENTRY_TRACES_SAMPLE_RATE: string;
  export const FIREBASE_ENABLED: string;
  export const CODEPUSH_IOS_DEPLOYMENT_KEY: string;
  export const CODEPUSH_ANDROID_DEPLOYMENT_KEY: string;
  export const ENABLE_ANALYTICS: string;
  export const ENABLE_CRASHLYTICS: string;
  export const APP_NAME: string;
  export const APP_VERSION: string;
}
