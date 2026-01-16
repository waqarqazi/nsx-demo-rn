/**
 * Jest setup file
 * Configures testing environment and mocks
 */

import '@testing-library/jest-native/extend-expect';

// Mock React Native modules
// Note: NativeAnimatedHelper path may vary by React Native version
// If this causes issues, remove or update based on your RN version
try {
  jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
} catch (e) {
  // Module doesn't exist in this React Native version, skip
}

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock React Native Gesture Handler
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: ({ children, ...props }: any) => React.createElement(View, props, children),
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: (component: any) => component,
  };
});

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      dispatch: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Mock CodePush (if installed)
// CodePush is optional and may not be installed
try {
  jest.mock('react-native-code-push', () => ({
    __esModule: true,
    default: (component: any) => component,
    CheckFrequency: {
      ON_APP_RESUME: 'ON_APP_RESUME',
    },
    InstallMode: {
      IMMEDIATE: 'IMMEDIATE',
    },
  }));
} catch (e) {
  // CodePush not installed, skip mock
}

// Mock Sentry
jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  setUser: jest.fn(),
  addBreadcrumb: jest.fn(),
}));

// Mock Firebase Crashlytics
jest.mock('@react-native-firebase/crashlytics', () => () => ({
  recordError: jest.fn(),
  setUserId: jest.fn(),
  setAttribute: jest.fn(),
}));

// Mock Geolocation
jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(success =>
    success({
      coords: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    }),
  ),
}));

// Mock Permissions
jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
  PERMISSIONS: {
    IOS: {
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
    },
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
    DENIED: 'denied',
    BLOCKED: 'blocked',
  },
}));

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
