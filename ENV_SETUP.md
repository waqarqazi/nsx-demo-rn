# Environment Variables Setup Guide

This guide explains how to configure environment variables for the Travel App.

## Overview

The app uses `react-native-dotenv` to load environment variables from a `.env` file. Environment variables are injected at build time and provide type-safe access to configuration values.

## Setup

### 1. Create `.env` File

Create a `.env` file in the root directory of the project. You can copy from `.env.example`:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your actual values:

```env
# API Configuration
API_BASE_URL=https://api.travel-demo.com/v1
API_TIMEOUT=30000

# Environment
NODE_ENV=development
APP_ENV=development

# Monitoring & Analytics
SENTRY_DSN=your_sentry_dsn_here
SENTRY_ENABLED=true
SENTRY_TRACES_SAMPLE_RATE=1.0

# Firebase
FIREBASE_ENABLED=true

# CodePush
CODEPUSH_IOS_DEPLOYMENT_KEY=your_ios_key_here
CODEPUSH_ANDROID_DEPLOYMENT_KEY=your_android_key_here

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_CRASHLYTICS=true

# App Configuration
APP_NAME=Travel App
APP_VERSION=0.0.1
```

### 3. Environment-Specific Files

You can create environment-specific files:

- `.env.development` - Development environment
- `.env.staging` - Staging environment
- `.env.production` - Production environment

To use a specific environment file, update the `path` in `babel.config.js`:

```javascript
[
  'module:react-native-dotenv',
  {
    moduleName: '@env',
    path: '.env.production', // Change this for production
    // ...
  },
];
```

Or use a script to switch environments:

```json
{
  "scripts": {
    "start:dev": "ENVFILE=.env.development react-native start",
    "start:staging": "ENVFILE=.env.staging react-native start",
    "start:prod": "ENVFILE=.env.production react-native start"
  }
}
```

## Usage

### In Code

Import environment variables through the config module:

```typescript
import { getApiBaseUrl, isSentryEnabled, getSentryDsn } from '@config/env';

// Use in your code
const apiUrl = getApiBaseUrl();
if (isSentryEnabled()) {
  // Initialize Sentry
}
```

### Available Helper Functions

The `src/shared/config/env.ts` file provides helper functions:

- `getEnv(key)` - Get environment variable as string
- `getEnvBool(key)` - Get environment variable as boolean
- `getEnvNumber(key)` - Get environment variable as number
- `isDevelopment()` - Check if running in development
- `isProduction()` - Check if running in production
- `getApiBaseUrl()` - Get API base URL
- `getApiTimeout()` - Get API timeout
- `getSentryDsn()` - Get Sentry DSN
- `isSentryEnabled()` - Check if Sentry is enabled
- `getSentryTracesSampleRate()` - Get Sentry traces sample rate
- `isFirebaseEnabled()` - Check if Firebase is enabled
- `getCodePushIosKey()` - Get CodePush iOS deployment key
- `getCodePushAndroidKey()` - Get CodePush Android deployment key
- `isAnalyticsEnabled()` - Check if analytics is enabled
- `isCrashlyticsEnabled()` - Check if Crashlytics is enabled

## Environment Variables Reference

### API Configuration

| Variable       | Type   | Default                          | Description                         |
| -------------- | ------ | -------------------------------- | ----------------------------------- |
| `API_BASE_URL` | string | `https://api.travel-demo.com/v1` | Base URL for API requests           |
| `API_TIMEOUT`  | number | `30000`                          | API request timeout in milliseconds |

### Environment

| Variable   | Type   | Default       | Description                                      |
| ---------- | ------ | ------------- | ------------------------------------------------ |
| `NODE_ENV` | string | `development` | Node environment (development/production)        |
| `APP_ENV`  | string | `development` | App environment (development/staging/production) |

### Monitoring & Analytics

| Variable                    | Type    | Default | Description                         |
| --------------------------- | ------- | ------- | ----------------------------------- |
| `SENTRY_DSN`                | string  | ``      | Sentry DSN for error tracking       |
| `SENTRY_ENABLED`            | boolean | `false` | Enable/disable Sentry               |
| `SENTRY_TRACES_SAMPLE_RATE` | number  | `1.0`   | Sentry traces sample rate (0.0-1.0) |
| `ENABLE_ANALYTICS`          | boolean | `false` | Enable/disable analytics            |
| `ENABLE_CRASHLYTICS`        | boolean | `false` | Enable/disable Crashlytics          |

### Firebase

| Variable           | Type    | Default | Description             |
| ------------------ | ------- | ------- | ----------------------- |
| `FIREBASE_ENABLED` | boolean | `false` | Enable/disable Firebase |

### CodePush

| Variable                          | Type   | Default | Description                     |
| --------------------------------- | ------ | ------- | ------------------------------- |
| `CODEPUSH_IOS_DEPLOYMENT_KEY`     | string | ``      | CodePush iOS deployment key     |
| `CODEPUSH_ANDROID_DEPLOYMENT_KEY` | string | ``      | CodePush Android deployment key |

### App Configuration

| Variable      | Type   | Default      | Description         |
| ------------- | ------ | ------------ | ------------------- |
| `APP_NAME`    | string | `Travel App` | Application name    |
| `APP_VERSION` | string | `0.0.1`      | Application version |

## Security Best Practices

1. **Never commit `.env` files** - The `.env` file is already in `.gitignore`
2. **Use `.env.example`** - Commit `.env.example` as a template
3. **Use different values per environment** - Don't reuse production keys in development
4. **Rotate keys regularly** - Update API keys and secrets periodically
5. **Use secure storage** - For sensitive data, consider using secure storage solutions

## Troubleshooting

### Environment variables not loading

1. **Clear Metro cache:**

   ```bash
   npm start -- --reset-cache
   ```

2. **Rebuild the app:**

   ```bash
   # iOS
   cd ios && pod install && cd ..
   npm run ios

   # Android
   npm run android
   ```

3. **Check babel.config.js** - Ensure `react-native-dotenv` plugin is configured correctly

4. **Verify .env file** - Ensure `.env` file exists in the root directory

### TypeScript errors

If you see TypeScript errors related to `@env`:

1. Ensure `src/shared/config/env.d.ts` exists
2. Restart TypeScript server in your IDE
3. Check that `@env` module is properly declared

## Example: Different Environments

### Development (.env.development)

```env
API_BASE_URL=http://localhost:3000/api
NODE_ENV=development
SENTRY_ENABLED=false
```

### Staging (.env.staging)

```env
API_BASE_URL=https://api-staging.travel-demo.com/v1
NODE_ENV=production
APP_ENV=staging
SENTRY_ENABLED=true
SENTRY_DSN=your_staging_sentry_dsn
```

### Production (.env.production)

```env
API_BASE_URL=https://api.travel-demo.com/v1
NODE_ENV=production
APP_ENV=production
SENTRY_ENABLED=true
SENTRY_DSN=your_production_sentry_dsn
FIREBASE_ENABLED=true
ENABLE_CRASHLYTICS=true
```

## Integration Points

Environment variables are used in:

1. **API Client** (`src/shared/api/client.ts`)

   - `API_BASE_URL` - Base URL for API requests
   - `API_TIMEOUT` - Request timeout

2. **Monitoring** (`src/shared/services/monitoring.ts`)

   - `SENTRY_DSN` - Sentry configuration
   - `SENTRY_ENABLED` - Enable/disable Sentry
   - `ENABLE_CRASHLYTICS` - Enable/disable Crashlytics

3. **CodePush** (`src/shared/services/codepush.ts`)

   - `CODEPUSH_IOS_DEPLOYMENT_KEY` - iOS deployment key
   - `CODEPUSH_ANDROID_DEPLOYMENT_KEY` - Android deployment key

4. **App Configuration** (Various files)
   - `APP_NAME` - Application name
   - `APP_VERSION` - Application version
   - `NODE_ENV` - Environment detection

## Next Steps

1. Create your `.env` file from `.env.example`
2. Fill in your actual values
3. Test the configuration
4. Set up environment-specific files for different environments
5. Configure CI/CD to use appropriate environment files
