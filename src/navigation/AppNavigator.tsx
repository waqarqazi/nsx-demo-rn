/**
 * Root App Navigator
 * Main navigation structure with stack and tabs
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import { TripDetailsScreen } from '@features/tripDetails';
import { BookingsScreen } from '@features/bookings';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
          options={{
            presentation: 'card',
            headerShown: true,
            title: 'Trip Details',
          }}
        />
        <Stack.Screen
          name="Bookings"
          component={BookingsScreen}
          options={{
            presentation: 'card',
            headerShown: true,
            title: 'Bookings',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
