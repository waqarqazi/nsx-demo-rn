module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@features': './src/features',
          '@shared': './src/shared',
          '@api': './src/shared/api',
          '@components': './src/shared/components',
          '@utils': './src/shared/utils',
          '@theme': './src/shared/theme',
          '@types': './src/shared/types',
          '@config': './src/shared/config',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    // 'react-native-reanimated/plugin', // Temporarily disabled - not compatible with RN 0.83.1 yet
  ],
};
