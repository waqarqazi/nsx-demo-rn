/**
 * CodePush configuration
 * Handles OTA updates and version checks
 * NOTE: CodePush module is not installed - this file is kept for future reference
 */

// import CodePush from 'react-native-code-push';
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
 * NOTE: CodePush is not installed - returning empty config
 */
export const codePushOptions = {
  // checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  // installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: getDeploymentKey() || undefined,
  // updateDialog: {
  //   appendReleaseDescription: true,
  //   descriptionPrefix: '\n\nChange log:\n',
  //   title: 'Update available',
  //   mandatoryUpdateMessage: 'A mandatory update is available.',
  //   mandatoryContinueButtonLabel: 'Update',
  // },
};

/**
 * Check for updates manually
 * NOTE: CodePush is not installed - returning null
 */
export const checkForUpdates = async () => {
  // CodePush is not installed
  return null;
  // try {
  //   const update = await CodePush.checkForUpdate(getDeploymentKey() || undefined);
  //   if (update) {
  //     return update;
  //   }
  //   return null;
  // } catch (error) {
  //   console.error('Error checking for updates:', error);
  //   return null;
  // }
};

/**
 * Sync with CodePush server
 * NOTE: CodePush is not installed - no-op function
 */
export const syncCodePush = () => {
  // CodePush is not installed
  console.log('CodePush is not installed');
  // CodePush.sync(
  //   {
  //     installMode: CodePush.InstallMode.IMMEDIATE,
  //     deploymentKey: getDeploymentKey() || undefined,
  //     updateDialog: {
  //       appendReleaseDescription: true,
  //       descriptionPrefix: '\n\nChange log:\n',
  //       title: 'Update available',
  //       mandatoryUpdateMessage: 'A mandatory update is available.',
  //       mandatoryContinueButtonLabel: 'Update',
  //     },
  //   },
  //   (status: CodePush.SyncStatus) => {
  //     // Handle sync status
  //     console.log('CodePush sync status:', status);
  //   },
  // );
};
