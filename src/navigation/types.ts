/**
 * Navigation type definitions
 * Type-safe navigation for React Navigation
 */

import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  TripDetails: { tripId: string };
  Bookings: { tripId?: string };
};

export type TabParamList = {
  Home: undefined;
  Search: { destinationId?: string };
  Bookings: { tripId?: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
