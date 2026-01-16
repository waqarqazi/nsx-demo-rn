/**
 * Search Screen
 * Allows users to search for trips and destinations
 * Optimized with React.memo, useCallback, and useMemo
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, Card, LoadingSpinner } from '@shared/components';
import { colors, spacing } from '@theme/index';
import { useSearchTrips, useSearchDestinations } from '../hooks/useSearch';
import { Trip, Destination } from '@shared/types/travel';
import { formatCurrency, formatDate } from '@shared/utils/format';

interface SearchScreenProps {
  navigation: any;
  route: any;
}

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const initialDestinationId = route.params?.destinationId as string | undefined;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'trips' | 'destinations'>('trips');

  const searchParams = useMemo(
    () => ({
      query: searchQuery,
      destination: initialDestinationId,
      page: 1,
      limit: 20,
    }),
    [searchQuery, initialDestinationId],
  );

  const { data: tripsData, isLoading: isLoadingTrips } = useSearchTrips(
    searchParams,
    searchQuery.length > 0 || !!initialDestinationId,
  );

  const { data: destinationsData, isLoading: isLoadingDestinations } = useSearchDestinations(
    searchQuery,
    1,
    20,
    selectedTab === 'destinations',
  );

  const handleTripPress = useCallback(
    (tripId: string) => {
      navigation.navigate('TripDetails', { tripId });
    },
    [navigation],
  );

  const handleDestinationPress = useCallback(
    (destinationId: string) => {
      setSearchQuery('');
      navigation.navigate('Search', { destinationId });
      setSelectedTab('trips');
    },
    [navigation],
  );

  const renderTripItem: ListRenderItem<Trip> = useCallback(
    ({ item }) => (
      <Card
        style={styles.resultCard}
        onPress={() => handleTripPress(item.id)}
        testID={`search-trip-${item.id}`}>
        <Text variant="h3" style={styles.resultTitle}>
          {item.destination.name}
        </Text>
        <Text variant="caption" color="textLight" style={styles.resultDates}>
          {formatDate(item.startDate)} - {formatDate(item.endDate)} • {item.duration} days
        </Text>
        <Text variant="body" style={styles.resultPrice}>
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
        style={styles.resultCard}
        onPress={() => handleDestinationPress(item.id)}
        testID={`search-destination-${item.id}`}>
        <Text variant="h3" style={styles.resultTitle}>
          {item.name}
        </Text>
        <Text variant="caption" color="textLight" numberOfLines={2}>
          {item.description}
        </Text>
        <Text variant="caption" color="textSecondary" style={styles.resultRating}>
          ⭐ {item.rating.toFixed(1)}
        </Text>
      </Card>
    ),
    [handleDestinationPress],
  );

  const tripKeyExtractor = useCallback((item: Trip) => item.id, []);
  const destinationKeyExtractor = useCallback((item: Destination) => item.id, []);

  const isLoading = isLoadingTrips || isLoadingDestinations;
  const results = selectedTab === 'trips' ? tripsData?.items : destinationsData?.items;
  const hasResults = results && results.length > 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search trips or destinations..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus={!initialDestinationId}
          testID="search-input"
        />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'trips' && styles.tabActive]}
          onPress={() => setSelectedTab('trips')}
          testID="tab-trips">
          <Text
            variant="body"
            weight={selectedTab === 'trips' ? 'semibold' : 'regular'}
            color={selectedTab === 'trips' ? 'primary' : 'text'}>
            Trips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'destinations' && styles.tabActive]}
          onPress={() => setSelectedTab('destinations')}
          testID="tab-destinations">
          <Text
            variant="body"
            weight={selectedTab === 'destinations' ? 'semibold' : 'regular'}
            color={selectedTab === 'destinations' ? 'primary' : 'text'}>
            Destinations
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <LoadingSpinner fullScreen message="Searching..." />
      ) : hasResults ? (
        <FlatList
          data={results}
          renderItem={selectedTab === 'trips' ? renderTripItem : renderDestinationItem}
          keyExtractor={selectedTab === 'trips' ? tripKeyExtractor : destinationKeyExtractor}
          contentContainerStyle={styles.results}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text variant="h3" color="textLight" align="center">
            No results found
          </Text>
          <Text variant="body" color="textSecondary" align="center" style={styles.emptyText}>
            Try adjusting your search query
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    marginTop: spacing.md,
  },
  header: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: spacing.lg,
  },
  resultCard: {
    marginBottom: spacing.md,
  },
  resultDates: {
    marginBottom: spacing.sm,
  },
  resultPrice: {
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  resultRating: {
    marginTop: spacing.sm,
  },
  resultTitle: {
    marginBottom: spacing.xs,
  },
  results: {
    padding: spacing.lg,
  },
  searchInput: {
    backgroundColor: colors.backgroundGray,
    borderRadius: 8,
    color: colors.text,
    fontSize: 16,
    height: 44,
    paddingHorizontal: spacing.md,
  },
  tab: {
    borderBottomColor: colors.background,
    borderBottomWidth: 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabs: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
});

export default React.memo(SearchScreen);
