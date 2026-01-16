/**
 * Bottom Tab Navigator
 * Main navigation structure for the app
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@features/home';
import { SearchScreen } from '@features/search';
import { BookingsScreen } from '@features/bookings';
import { Text } from '@shared/components';
import { colors } from '../shared/theme';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

// Icon components defined outside render to avoid nested component warnings
const HomeIcon = () => <Text>🏠</Text>;
const SearchIcon = () => <Text>🔍</Text>;
const BookingsIcon = () => <Text>📋</Text>;

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: SearchIcon,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: BookingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
