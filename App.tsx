/**
 * Travel App - Production Ready React Native App
 * Feature-based modular architecture with TypeScript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from './src/shared/store';
import { queryClient } from './src/shared/store/queryClient';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeMonitoring } from './src/shared/services/monitoring';

// CodePush is optional - can be added later when needed
// For now, app runs without CodePush

/**
 * Initialize app services
 */
const initializeApp = () => {
  // Initialize monitoring (Sentry, Crashlytics)
  initializeMonitoring();
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor="transparent"
              translucent
            />
            <AppNavigator />
          </QueryClientProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// App export - CodePush can be added later when configured
export default App;
