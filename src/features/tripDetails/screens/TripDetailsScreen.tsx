/**
 * Trip Details Screen
 * Displays detailed information about a trip
 * Optimized with React.memo, useCallback, and useMemo
 */

import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Text, Card, Button, LoadingSpinner } from '@shared/components';
import { colors, spacing } from '@theme/index';
import { useTripDetails } from '../hooks/useTripDetails';
import { formatCurrency, formatDate, formatDuration } from '@shared/utils/format';
import { Image as ImageType } from '@shared/types';

interface TripDetailsScreenProps {
  navigation: any;
  route: any;
}

const TripDetailsScreen: React.FC<TripDetailsScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tripId = route.params?.tripId as string;

  const { data: trip, isLoading, error } = useTripDetails(tripId);

  const handleBookPress = useCallback(() => {
    if (trip) {
      navigation.navigate('Bookings', { tripId: trip.id });
    }
  }, [navigation, trip]);

  const renderImageItem: ListRenderItem<ImageType> = useCallback(
    ({ item }) => (
      <FastImage
        source={{ uri: item.url }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
    ),
    [],
  );

  const imageKeyExtractor = useCallback((item: ImageType) => item.id, []);

  const getImageItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: 300,
      offset: 300 * index,
      index,
    }),
    [],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <LoadingSpinner fullScreen message="Loading trip details..." />
      </SafeAreaView>
    );
  }

  if (error || !trip) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text variant="h3" color="error" align="center">
            Failed to load trip details
          </Text>
          <Button
            title="Go Back"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {trip.images && trip.images.length > 0 && (
          <FlatList
            data={trip.images}
            renderItem={renderImageItem}
            keyExtractor={imageKeyExtractor}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={getImageItemLayout}
            removeClippedSubviews
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={3}
            style={styles.imageList}
          />
        )}

        <View style={styles.details}>
          <Text variant="h1" style={styles.title}>
            {trip.destination.name}
          </Text>

          <View style={styles.meta}>
            <Text variant="body" color="textLight">
              📍 {trip.destination.location.city}, {trip.destination.location.country}
            </Text>
            {trip.rating && (
              <Text variant="body" color="textLight">
                ⭐ {trip.rating.toFixed(1)} ({trip.reviewCount || 0} reviews)
              </Text>
            )}
          </View>

          <Card style={styles.priceCard}>
            <View style={styles.priceRow}>
              <View>
                <Text variant="caption" color="textLight">
                  Price per person
                </Text>
                <Text variant="h2" style={styles.price}>
                  {formatCurrency(trip.price, trip.currency)}
                </Text>
              </View>
              <View style={styles.duration}>
                <Text variant="caption" color="textLight">
                  Duration
                </Text>
                <Text variant="h3">{formatDuration(trip.duration)}</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.datesCard}>
            <Text variant="body" weight="semibold" style={styles.sectionTitle}>
              Travel Dates
            </Text>
            <Text variant="body" color="textLight">
              {formatDate(trip.startDate, 'MMMM dd, yyyy')} -{' '}
              {formatDate(trip.endDate, 'MMMM dd, yyyy')}
            </Text>
          </Card>

          {trip.description && (
            <Card style={styles.descriptionCard}>
              <Text variant="body" weight="semibold" style={styles.sectionTitle}>
                About this trip
              </Text>
              <Text variant="body" color="textLight">
                {trip.description}
              </Text>
            </Card>
          )}

          {trip.included && trip.included.length > 0 && (
            <Card style={styles.includedCard}>
              <Text variant="body" weight="semibold" style={styles.sectionTitle}>
                What&apos;s included
              </Text>
              {trip.included.map((item, index) => (
                <Text key={index} variant="body" color="textLight" style={styles.listItem}>
                  ✓ {item}
                </Text>
              ))}
            </Card>
          )}

          {trip.excluded && trip.excluded.length > 0 && (
            <Card style={styles.excludedCard}>
              <Text variant="body" weight="semibold" style={styles.sectionTitle}>
                What&apos;s not included
              </Text>
              {trip.excluded.map((item, index) => (
                <Text key={index} variant="body" color="textLight" style={styles.listItem}>
                  ✗ {item}
                </Text>
              ))}
            </Card>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Book Now - ${formatCurrency(trip.price, trip.currency)}`}
          onPress={handleBookPress}
          fullWidth
          testID="book-button"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginTop: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  datesCard: {
    marginBottom: spacing.md,
  },
  descriptionCard: {
    marginBottom: spacing.md,
  },
  details: {
    padding: spacing.lg,
  },
  duration: {
    alignItems: 'flex-end',
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  excludedCard: {
    marginBottom: spacing.md,
  },
  footer: {
    backgroundColor: colors.background,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    padding: spacing.lg,
    position: 'absolute',
    right: 0,
  },
  image: {
    height: 300,
    width: 400,
  },
  imageList: {
    height: 300,
  },
  includedCard: {
    marginBottom: spacing.md,
  },
  listItem: {
    marginBottom: spacing.xs,
  },
  meta: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  price: {
    color: colors.primary,
    marginTop: spacing.xs,
  },
  priceCard: {
    marginBottom: spacing.md,
  },
  priceRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  title: {
    marginBottom: spacing.md,
  },
});

export default React.memo(TripDetailsScreen);
