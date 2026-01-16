# Setup Guide

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. iOS Setup

```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### 3. Android Setup

Ensure you have:
- Android Studio installed
- Android SDK configured
- Java JDK 17 installed

### 4. Configure Environment Variables

Create `.env` file in root:

```env
API_BASE_URL=https://api.travel-demo.com/v1
SENTRY_DSN=your_sentry_dsn_here
```

### 5. Configure Monitoring

#### Sentry

1. Create account at [sentry.io](https://sentry.io)
2. Create a new project
3. Copy DSN
4. Update `src/shared/services/monitoring.ts`:

```typescript
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN_HERE',
  // ...
});
```

#### Firebase Crashlytics

1. Create Firebase project
2. Add iOS and Android apps
3. Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
4. Place in respective directories
5. Follow Firebase setup instructions

### 6. Configure CodePush

1. Install CodePush CLI:
```bash
npm install -g code-push-cli
```

2. Login:
```bash
code-push login
```

3. Register apps:
```bash
code-push app add NsxDemo-ios
code-push app add NsxDemo-android
```

4. Add deployment keys to app configuration

## Running the App

### Development

```bash
# Start Metro bundler
npm start

# Run iOS
npm run ios

# Run Android
npm run android
```

### Production Build

#### iOS

```bash
cd ios
xcodebuild -workspace NsxDemo.xcworkspace \
  -scheme NsxDemo \
  -configuration Release \
  -sdk iphonesimulator
```

#### Android

```bash
cd android
./gradlew assembleRelease
```

## Testing

### Unit Tests

```bash
npm test
```

### E2E Tests

```bash
# Build app
npm run detox:build

# Run tests
npm run detox:test
```

## Code Quality

### Linting

```bash
npm run lint
npm run lint:fix
```

### Formatting

```bash
npm run format
npm run format:check
```

### Type Checking

```bash
npm run type-check
```

## Troubleshooting

### Metro Bundler Issues

```bash
npm start -- --reset-cache
```

### iOS Pod Issues

```bash
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Android Build Issues

```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### TypeScript Path Alias Issues

If TypeScript doesn't recognize path aliases:
1. Restart TypeScript server in your IDE
2. Ensure `tsconfig.json` paths are correct
3. Check `babel.config.js` and `metro.config.js` aliases match

## Next Steps

1. Replace placeholder API endpoints with real endpoints
2. Configure authentication flow
3. Set up analytics tracking
4. Configure push notifications
5. Set up CI/CD pipeline
6. Configure app store deployment
