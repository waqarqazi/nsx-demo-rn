# GitHub Actions Workflows

This directory contains CI/CD workflows for the Travel App project.

## Workflow Files

### 1. `tests.yml` - Testing Workflow
**Purpose**: Run all tests (unit tests, linting, type checking, E2E tests)

**Triggers**:
- Push to `main` or `dev` branches
- Pull requests to `main` or `dev` branches

**Jobs**:
- **unit-tests**: Runs on `ubuntu-latest`
  - ESLint
  - Prettier format check
  - TypeScript type checking
  - Jest unit tests with coverage
  - Uploads coverage to Codecov

- **e2e-tests**: Runs on `macos-latest` (only on `dev` branch or PRs)
  - Builds Android APK
  - Runs Detox E2E tests

### 2. `build-android.yml` - Android Build Workflow
**Purpose**: Build Android APK/AAB files for dev and production

**Triggers**:
- Push to `main` or `dev` branches (when Android-related files change)
- Manual workflow dispatch with options

**Jobs**:
- **build-android-dev**: Builds debug APK for `dev` branch
  - Creates debug build
  - Uploads APK artifact (retention: 7 days)
  - Sets environment to `dev`

- **build-android-production**: Builds release APK/AAB for `main` branch
  - Creates release build
  - Builds AAB for Play Store
  - Uploads APK and AAB artifacts (retention: 30 days)
  - Generates release notes
  - Sets environment to `production`

**Required Secrets** (for production builds):
- `ANDROID_KEYSTORE_BASE64`: Base64 encoded keystore file
- `ANDROID_KEYSTORE_PASSWORD`: Keystore password
- `ANDROID_KEY_ALIAS`: Key alias
- `ANDROID_KEY_PASSWORD`: Key password

### 3. `build-ios.yml` - iOS Build Workflow
**Purpose**: Build iOS IPA files for dev and production

**Triggers**:
- Push to `main` or `dev` branches (when iOS-related files change)
- Manual workflow dispatch with options

**Jobs**:
- **build-ios-dev**: Builds debug IPA for `dev` branch
  - Creates debug build for simulator
  - Uploads IPA artifact (retention: 7 days)
  - Sets environment to `dev`

- **build-ios-production**: Builds release IPA for `main` branch
  - Creates release build
  - Archives and exports IPA
  - Uploads IPA artifact (retention: 30 days)
  - Generates release notes
  - Sets environment to `production`

**Required Secrets** (for production builds):
- `APPLE_CERTIFICATE_BASE64`: Base64 encoded .p12 certificate
- `APPLE_CERTIFICATE_PASSWORD`: Certificate password
- `APPLE_PROVISIONING_PROFILE_BASE64`: Base64 encoded provisioning profile

## Branch Strategy

### `dev` Branch (Testing)
- **Purpose**: Development and testing
- **Builds**: Debug builds
- **Artifacts**: Retained for 7 days
- **Tests**: Full test suite including E2E
- **Environment**: Development

### `main` Branch (Production)
- **Purpose**: Production releases
- **Builds**: Release builds (signed)
- **Artifacts**: Retained for 30 days
- **Tests**: Full test suite (E2E optional)
- **Environment**: Production

## Manual Workflow Dispatch

All workflows support manual triggering with options:

1. Go to **Actions** tab in GitHub
2. Select the workflow (e.g., "Build Android")
3. Click **Run workflow**
4. Choose:
   - Branch to run on
   - Build type (debug/release)
   - Environment (dev/production)

## Setting Up Secrets

### For Android Production Builds

1. Generate a keystore:
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Encode keystore to base64:
   ```bash
   # On macOS/Linux
   base64 -i my-release-key.keystore -o keystore-base64.txt
   
   # On Windows (PowerShell)
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("my-release-key.keystore")) | Out-File keystore-base64.txt
   ```

3. Add secrets in GitHub:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add each secret:
     - `ANDROID_KEYSTORE_BASE64`: Content of keystore-base64.txt
     - `ANDROID_KEYSTORE_PASSWORD`: Your keystore password
     - `ANDROID_KEY_ALIAS`: Your key alias
     - `ANDROID_KEY_PASSWORD`: Your key password

### For iOS Production Builds

1. Export certificate and provisioning profile from Xcode
2. Encode to base64:
   ```bash
   base64 -i certificate.p12 -o certificate-base64.txt
   base64 -i profile.mobileprovision -o profile-base64.txt
   ```

3. Add secrets in GitHub:
   - `APPLE_CERTIFICATE_BASE64`: Content of certificate-base64.txt
   - `APPLE_CERTIFICATE_PASSWORD`: Certificate password
   - `APPLE_PROVISIONING_PROFILE_BASE64`: Content of profile-base64.txt

## Workflow Dependencies

```
Push to dev/main
    ↓
tests.yml (runs in parallel)
    ├── unit-tests
    └── e2e-tests (dev only)
    ↓
build-android.yml (runs independently)
    ├── build-android-dev (dev branch)
    └── build-android-production (main branch)
    ↓
build-ios.yml (runs independently)
    ├── build-ios-dev (dev branch)
    └── build-ios-production (main branch)
```

## Artifact Retention

- **Dev builds**: 7 days
- **Production builds**: 30 days
- **Test coverage**: Uploaded to Codecov (permanent)

## Environment Variables

Workflows automatically set environment variables:
- `APP_ENV`: `dev` or `production`
- `NODE_ENV`: `development` or `production`
- `BUILD_TYPE`: `debug` or `release`
- `BRANCH`: Current branch name
- `COMMIT_SHA`: Git commit SHA
- `VERSION_NAME`: App version from package.json

## Troubleshooting

### Build Failures

1. **Check workflow logs**: Go to Actions → Select workflow run → View logs
2. **Verify secrets**: Ensure all required secrets are set
3. **Check dependencies**: Ensure `npm ci --legacy-peer-deps` completes successfully
4. **Environment files**: Ensure `.env.example` exists (workflows create `.env` from it)

### Common Issues

- **Android build fails**: Check Java version (should be 17)
- **iOS build fails**: Check CocoaPods installation and Xcode version
- **Tests fail**: Check Node version (should be 20)
- **Secrets not found**: Verify secrets are added in GitHub repository settings

## Next Steps

1. Set up required secrets for production builds
2. Configure `ExportOptions.plist` for iOS exports (if needed)
3. Set up Codecov account for coverage tracking
4. Configure Play Store/App Store deployment (optional)
