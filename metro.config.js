const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@features': './src/features',
      '@shared': './src/shared',
      '@api': './src/shared/api',
      '@components': './src/shared/components',
      '@utils': './src/shared/utils',
      '@theme': './src/shared/theme',
      '@types': './src/shared/types',
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
