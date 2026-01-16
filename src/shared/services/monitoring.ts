/**
 * Monitoring and error tracking setup
 * Integrates Sentry and Firebase Crashlytics
 */

// Conditionally import monitoring libraries
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let Sentry: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let crashlytics: any = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  Sentry = require('@sentry/react-native');
} catch (error) {
  console.warn('Sentry not available:', error);
}

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  crashlytics = require('@react-native-firebase/crashlytics').default;
} catch (error) {
  console.warn('Firebase Crashlytics not available:', error);
}

import {
  isSentryEnabled,
  getSentryDsn,
  getSentryTracesSampleRate,
  isDevelopment,
  isCrashlyticsEnabled,
} from '../config/env';

/**
 * Initialize monitoring services
 */
export const initializeMonitoring = () => {
  try {
    // Initialize Sentry if enabled and DSN is provided
    if (Sentry && isSentryEnabled() && getSentryDsn()) {
      Sentry.init({
        dsn: getSentryDsn(),
        enableInExpoDevelopment: false,
        tracesSampleRate: getSentryTracesSampleRate(),
        environment: isDevelopment() ? 'development' : 'production',
        enabled: !isDevelopment() || isCrashlyticsEnabled(), // Only enable in production or if explicitly enabled
      });
    }

    // Firebase Crashlytics is auto-initialized
    // Additional configuration can be added here
    if (crashlytics && !isCrashlyticsEnabled() && isDevelopment()) {
      // Disable Crashlytics in development unless explicitly enabled
      crashlytics().setCrashlyticsCollectionEnabled(false);
    }
  } catch (error) {
    console.warn('Error initializing monitoring:', error);
  }
};

/**
 * Log error to monitoring services
 */
export const logError = (error: Error, context?: Record<string, unknown>) => {
  if (__DEV__) {
    console.error('Error:', error, context);
    return;
  }

  try {
    // Log to Sentry
    if (Sentry) {
      Sentry.captureException(error, {
        extra: context,
      });
    }

    // Log to Crashlytics
    if (crashlytics) {
      crashlytics().recordError(error);
      if (context) {
        Object.entries(context).forEach(([key, value]) => {
          crashlytics().setAttribute(key, String(value));
        });
      }
    }
  } catch (err) {
    console.warn('Error logging to monitoring services:', err);
  }
};

/**
 * Set user context for monitoring
 */
export const setUserContext = (userId: string, email?: string) => {
  try {
    if (Sentry) {
      Sentry.setUser({
        id: userId,
        email,
      });
    }

    if (crashlytics) {
      crashlytics().setUserId(userId);
      if (email) {
        crashlytics().setAttribute('email', email);
      }
    }
  } catch (error) {
    console.warn('Error setting user context:', error);
  }
};

/**
 * Log breadcrumb for debugging
 */
export const logBreadcrumb = (message: string, category?: string, data?: Record<string, unknown>) => {
  try {
    if (Sentry) {
      Sentry.addBreadcrumb({
        message,
        category: category || 'default',
        data,
        level: 'info',
      });
    }
  } catch (error) {
    console.warn('Error logging breadcrumb:', error);
  }
};
