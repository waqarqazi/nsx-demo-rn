# CodePush Setup Guide

This guide explains how to set up CodePush for OTA (Over-The-Air) updates and configure the required GitHub secrets.

## 📋 Prerequisites

1. **CodePush Account**: Sign up at https://appcenter.ms/ (Microsoft App Center)
2. **CodePush CLI**: Install globally: `npm install -g code-push-cli`
3. **App Registration**: Register your app in App Center

---

## 🔑 Required GitHub Secrets

You need to add the following secrets in your GitHub repository:

### How to Add Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret below

---

## 📝 Secrets List

### 1. CodePush Access Token (Required)

**Secret Name:** `CODEPUSH_ACCESS_TOKEN`

**Description:** Authentication token for CodePush CLI

**How to Get:**
```bash
# Login to CodePush
code-push login

# Get your access token
code-push access-key ls

# Or create a new one
code-push access-key add "GitHub Actions"
```

**Value:** Copy the access key (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

---

### 2. Android Staging Deployment Key (Optional but Recommended)

**Secret Name:** `CODEPUSH_ANDROID_STAGING_KEY`

**Description:** Deployment key for Android staging environment

**How to Get:**
```bash
# List your apps
code-push app ls

# Get deployment keys for your Android app
code-push deployment ls NsxDemo-Android

# Copy the "Staging" deployment key
```

**Value:** Copy the Staging deployment key

**When Used:** Deployments to `dev` branch

---

### 3. Android Production Deployment Key (Required for Production)

**Secret Name:** `CODEPUSH_ANDROID_PRODUCTION_KEY`

**Description:** Deployment key for Android production environment

**How to Get:**
```bash
# Get deployment keys for your Android app
code-push deployment ls NsxDemo-Android

# Copy the "Production" deployment key
```

**Value:** Copy the Production deployment key

**When Used:** Deployments to `main` branch

---

### 4. iOS Staging Deployment Key (Optional but Recommended)

**Secret Name:** `CODEPUSH_IOS_STAGING_KEY`

**Description:** Deployment key for iOS staging environment

**How to Get:**
```bash
# Get deployment keys for your iOS app
code-push deployment ls NsxDemo-iOS

# Copy the "Staging" deployment key
```

**Value:** Copy the Staging deployment key

**When Used:** Deployments to `dev` branch

---

### 5. iOS Production Deployment Key (Required for Production)

**Secret Name:** `CODEPUSH_IOS_PRODUCTION_KEY`

**Description:** Deployment key for iOS production environment

**How to Get:**
```bash
# Get deployment keys for your iOS app
code-push deployment ls NsxDemo-iOS

# Copy the "Production" deployment key
```

**Value:** Copy the Production deployment key

**When Used:** Deployments to `main` branch

---

## 🚀 Setup Steps

### Step 1: Create CodePush Account

1. Go to https://appcenter.ms/
2. Sign up or sign in with Microsoft account
3. Create a new organization (or use existing)

### Step 2: Register Your Apps

#### Register Android App

```bash
code-push app add NsxDemo-Android android react-native
```

This creates:
- **Staging** deployment (for testing)
- **Production** deployment (for production)

#### Register iOS App

```bash
code-push app add NsxDemo-iOS ios react-native
```

This creates:
- **Staging** deployment (for testing)
- **Production** deployment (for production)

### Step 3: Get Deployment Keys

```bash
# Android Staging
code-push deployment ls NsxDemo-Android -k

# Android Production
code-push deployment ls NsxDemo-Android -k

# iOS Staging
code-push deployment ls NsxDemo-iOS -k

# iOS Production
code-push deployment ls NsxDemo-iOS -k
```

### Step 4: Create Access Token

```bash
# Login
code-push login

# Create access token for CI/CD
code-push access-key add "GitHub Actions CI/CD" --ttl 365d

# List tokens (copy the key)
code-push access-key ls
```

### Step 5: Add Secrets to GitHub

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
2. Add each secret:

| Secret Name | Value | Required |
|------------|-------|----------|
| `CODEPUSH_ACCESS_TOKEN` | Your access token | ✅ Yes |
| `CODEPUSH_ANDROID_STAGING_KEY` | Android Staging key | ⚠️ Recommended |
| `CODEPUSH_ANDROID_PRODUCTION_KEY` | Android Production key | ✅ Yes (for main) |
| `CODEPUSH_IOS_STAGING_KEY` | iOS Staging key | ⚠️ Recommended |
| `CODEPUSH_IOS_PRODUCTION_KEY` | iOS Production key | ✅ Yes (for main) |

---

## 🔍 Verification

### Test Locally

```bash
# Login
code-push login

# Test Android deployment
code-push release-react NsxDemo-Android android --deploymentKey YOUR_STAGING_KEY

# Test iOS deployment
code-push release-react NsxDemo-iOS ios --deploymentKey YOUR_STAGING_KEY
```

### Test in CI/CD

1. Push code to `dev` branch
2. Check GitHub Actions workflow
3. Verify deployment succeeds
4. Check CodePush dashboard for new release

---

## 📊 CodePush Dashboard

Monitor deployments at:
- **Android**: https://appcenter.ms/apps/YOUR_ORG/NsxDemo-Android/code-push
- **iOS**: https://appcenter.ms/apps/YOUR_ORG/NsxDemo-iOS/code-push

---

## 🔄 Workflow Behavior

### Automatic Deployment

- **Trigger**: Push to `main` or `dev` branch
- **Paths**: Only deploys when `src/`, `package.json`, or `App.tsx` changes
- **Environment**:
  - `dev` branch → Staging deployment
  - `main` branch → Production deployment

### Manual Deployment

Use `workflow_dispatch` to manually trigger:

```yaml
# Options:
- Platform: android, ios, or both
- Environment: staging or production
```

---

## 🛡️ Security Best Practices

1. **Access Token**:
   - Use separate token for CI/CD
   - Set expiration (e.g., 365 days)
   - Rotate regularly

2. **Deployment Keys**:
   - Never commit keys to repository
   - Use different keys for staging/production
   - Rotate keys if compromised

3. **Secrets Management**:
   - Use GitHub Secrets (encrypted)
   - Limit access to repository admins
   - Audit secret usage regularly

---

## 🐛 Troubleshooting

### Error: Access token invalid

**Solution:**
- Verify token is correct in GitHub Secrets
- Check token hasn't expired
- Create new token if needed

### Error: Deployment key not found

**Solution:**
- Verify app name matches: `NsxDemo-Android` or `NsxDemo-iOS`
- Check deployment key is correct
- Ensure app is registered in CodePush

### Error: No changes to deploy

**Solution:**
- This is normal if no code changed
- Workflow will skip deployment
- Check workflow logs for details

---

## 📚 Additional Resources

- [CodePush Documentation](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/)
- [CodePush CLI Reference](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli)
- [React Native CodePush](https://github.com/microsoft/react-native-code-push)

---

## ✅ Checklist

- [ ] CodePush account created
- [ ] Android app registered
- [ ] iOS app registered
- [ ] Access token created
- [ ] Deployment keys retrieved
- [ ] All secrets added to GitHub
- [ ] Tested local deployment
- [ ] Verified CI/CD workflow

---

**Note:** CodePush is currently not installed in the project. Install `react-native-code-push` and configure the app before using this workflow.
