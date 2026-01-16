/**
 * Home Screen
 * Main landing screen with featured trips and popular destinations
 * Optimized with React.memo, useCallback, and useMemo
 */

import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    refetch: refetchTrips,
    isRefetching: isRefetchingTrips,
  } = useFeaturedTrips();

  const {
    data: popularDestinations,
    isLoading: isLoadingDestinations,
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
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  destinationCard: {
    marginRight: spacing.md,
    width: 200,
  },
  destinationRating: {
    marginTop: spacing.sm,
  },
  destinationTitle: {
    marginBottom: spacing.xs,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  horizontalList: {
    paddingHorizontal: spacing.lg,
  },
  searchButton: {
    marginTop: spacing.md,
  },
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  subtitle: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  tripCard: {
    marginRight: spacing.md,
    width: 280,
  },
  tripDates: {
    marginBottom: spacing.sm,
  },
  tripPrice: {
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  tripTitle: {
    marginBottom: spacing.xs,
  },
});

export default React.memo(HomeScreen);
