/**
 * Home Screen
 * Main landing screen with featured trips and popular destinations
 * Optimized with React.memo, useCallback, and useMemo
 */

import React, { useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Text, Card, LoadingSpinner, Button } from '@shared/components';
import { colors, spacing } from '@theme/index';
import { useFeaturedTrips, usePopularDestinations } from '../hooks/useHomeData';
import { Trip, Destination } from '@shared/types/travel';
import { formatCurrency, formatDate } from '@shared/utils/format';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const {
    data: featuredTrips,
    isLoading: isLoadingTrips,
    error: tripsError,
    refetch: refetchTrips,
    isRefetching: isRefetchingTrips,
  } = useFeaturedTrips();

  const {
    data: popularDestinations,
    isLoading: isLoadingDestinations,
    error: destinationsError,
    refetch: refetchDestinations,
    isRefetching: isRefetchingDestinations,
  } = usePopularDestinations();

  const isLoading = isLoadingTrips || isLoadingDestinations;
  const isRefetching = isRefetchingTrips || isRefetchingDestinations;

  const handleRefresh = useCallback(() => {
    refetchTrips();
    refetchDestinations();
  }, [refetchTrips, refetchDestinations]);

  const handleTripPress = useCallback(
    (tripId: string) => {
      navigation.navigate('TripDetails', { tripId });
    },
    [navigation],
  );

  const handleDestinationPress = useCallback(
    (destinationId: string) => {
      navigation.navigate('Search', { destinationId });
    },
    [navigation],
  );

  const handleSearchPress = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const renderTripItem: ListRenderItem<Trip> = useCallback(
    ({ item }) => (
      <Card
        style={styles.tripCard}
        onPress={() => handleTripPress(item.id)}
        testID={`trip-card-${item.id}`}
      >
        <Text variant="h3" style={styles.tripTitle}>
          {item.destination.name}
        </Text>
        <Text variant="caption" color="textLight" style={styles.tripDates}>
          {formatDate(item.startDate)} - {formatDate(item.endDate)}
        </Text>
        <Text variant="body" style={styles.tripPrice}>
          {formatCurrency(item.price, item.currency)}
        </Text>
        {item.rating && (
          <Text variant="caption" color="textSecondary">
            ⭐ {item.rating.toFixed(1)} ({item.reviewCount || 0} reviews)
          </Text>
        )}
      </Card>
    ),
    [handleTripPress],
  );

  const renderDestinationItem: ListRenderItem<Destination> = useCallback(
    ({ item }) => (
      <Card
        style={styles.destinationCard}
        onPress={() => handleDestinationPress(item.id)}
        testID={`destination-card-${item.id}`}
      >
        <Text variant="h3" style={styles.destinationTitle}>
          {item.name}
        </Text>
        <Text variant="caption" color="textLight" numberOfLines={2}>
          {item.description}
        </Text>
        <Text variant="caption" color="textSecondary" style={styles.destinationRating}>
          ⭐ {item.rating.toFixed(1)}
        </Text>
      </Card>
    ),
    [handleDestinationPress],
  );

  const tripKeyExtractor = useCallback((item: Trip) => item.id, []);
  const destinationKeyExtractor = useCallback((item: Destination) => item.id, []);

  const getTripItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: 200,
      offset: 200 * index,
      index,
    }),
    [],
  );

  const getDestinationItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: 120,
      offset: 120 * index,
      index,
    }),
    [],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <LoadingSpinner fullScreen message="Loading travel destinations..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={[]}
        renderItem={() => null}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text variant="h1" style={styles.title}>
              Explore the World
            </Text>
            <Text variant="body" color="textLight" style={styles.subtitle}>
              Discover amazing destinations and plan your next adventure
            </Text>
            <Button
              title="Search Trips"
              onPress={handleSearchPress}
              style={styles.searchButton}
              testID="search-button"
            />
          </View>
        }
        ListFooterComponent={
          <View>
            {featuredTrips && featuredTrips.length > 0 && (
              <View style={styles.section}>
                <Text variant="h2" style={styles.sectionTitle}>
                  Featured Trips
                </Text>
                <FlatList
                  data={featuredTrips}
                  renderItem={renderTripItem}
                  keyExtractor={tripKeyExtractor}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  getItemLayout={getTripItemLayout}
                  removeClippedSubviews
                  initialNumToRender={3}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              </View>
            )}

            {popularDestinations && popularDestinations.length > 0 && (
              <View style={styles.section}>
                <Text variant="h2" style={styles.sectionTitle}>
                  Popular Destinations
                </Text>
                <FlatList
                  data={popularDestinations}
                  renderItem={renderDestinationItem}
                  keyExtractor={destinationKeyExtractor}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                  getItemLayout={getDestinationItemLayout}
                  removeClippedSubviews
                  initialNumToRender={3}
                  maxToRenderPerBatch={5}
                  windowSize={5}
                />
              </View>
            )}
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  searchButton: {
    marginTop: spacing.md,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  horizontalList: {
    paddingHorizontal: spacing.lg,
  },
  tripCard: {
    width: 280,
    marginRight: spacing.md,
  },
  tripTitle: {
    marginBottom: spacing.xs,
  },
  tripDates: {
    marginBottom: spacing.sm,
  },
  tripPrice: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    fontWeight: '600',
    color: colors.primary,
  },
  destinationCard: {
    width: 200,
    marginRight: spacing.md,
  },
  destinationTitle: {
    marginBottom: spacing.xs,
  },
  destinationRating: {
    marginTop: spacing.sm,
  },
});

export default React.memo(HomeScreen);
