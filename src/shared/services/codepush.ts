/**
 * CodePush configuration
 * Handles OTA updates and version checks
 */

import CodePush from 'react-native-code-push';
import { Platform } from 'react-native';
import { getCodePushIosKey, getCodePushAndroidKey } from '../config/env';

/**
 * Get CodePush deployment key based on platform
 */
const getDeploymentKey = (): string => {
  if (Platform.OS === 'ios') {
    return getCodePushIosKey();
  }
  return getCodePushAndroidKey();
};

/**
 * CodePush configuration options
 */
export const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: getDeploymentKey() || undefined, // Use deployment key from env if available
  updateDialog: {
    appendReleaseDescription: true,
    descriptionPrefix: '\n\nChange log:\n',
    title: 'Update available',
    mandatoryUpdateMessage: 'A mandatory update is available.',
    mandatoryContinueButtonLabel: 'Update',
  },
};

/**
 * Check for updates manually
 */
export const checkForUpdates = async () => {
  try {
    const update = await CodePush.checkForUpdate(getDeploymentKey() || undefined);
    if (update) {
      return update;
    }
    return null;
  } catch (error) {
    console.error('Error checking for updates:', error);
    return null;
  }
};

/**
 * Sync with CodePush server
 */
export const syncCodePush = () => {
  CodePush.sync(
    {
      installMode: CodePush.InstallMode.IMMEDIATE,
      deploymentKey: getDeploymentKey() || undefined,
      updateDialog: {
        appendReleaseDescription: true,
        descriptionPrefix: '\n\nChange log:\n',
        title: 'Update available',
        mandatoryUpdateMessage: 'A mandatory update is available.',
        mandatoryContinueButtonLabel: 'Update',
      },
    },
    (status) => {
      // Handle sync status
      console.log('CodePush sync status:', status);
    },
  );
};
