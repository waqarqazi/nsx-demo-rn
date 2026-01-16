/**
 * Bookings Screen
 * Displays user's bookings and allows creating new bookings
 * Optimized with React.memo, useCallback, and useMemo
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ListRenderItem,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, Card, Button, LoadingSpinner } from '@shared/components';
import { colors, spacing } from '@theme/index';
import { useBookings, useCreateBooking, useCancelBooking } from '../hooks/useBookings';
import { Booking } from '@shared/types/travel';
import { formatCurrency, formatDate } from '@shared/utils/format';

interface BookingsScreenProps {
  navigation: any;
  route: any;
}

const BookingsScreen: React.FC<BookingsScreenProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const tripId = route.params?.tripId as string | undefined;

  const [guests, setGuests] = useState('1');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const { data: bookingsData, isLoading, refetch, isRefetching } = useBookings();
  const createBookingMutation = useCreateBooking();
  const cancelBookingMutation = useCancelBooking();

  const handleCreateBooking = useCallback(() => {
    if (!tripId) {
      Alert.alert('Error', 'Trip ID is required');
      return;
    }

    if (!checkInDate || !checkOutDate) {
      Alert.alert('Error', 'Please select check-in and check-out dates');
      return;
    }

    const guestsNum = parseInt(guests, 10);
    if (isNaN(guestsNum) || guestsNum < 1) {
      Alert.alert('Error', 'Please enter a valid number of guests');
      return;
    }

    createBookingMutation.mutate(
      {
        tripId,
        guests: guestsNum,
        checkInDate,
        checkOutDate,
        specialRequests: specialRequests || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert('Success', 'Booking created successfully!', [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]);
        },
        onError: (error: any) => {
          Alert.alert('Error', error.message || 'Failed to create booking');
        },
      },
    );
  }, [
    tripId,
    guests,
    checkInDate,
    checkOutDate,
    specialRequests,
    createBookingMutation,
    navigation,
  ]);

  const handleCancelBooking = useCallback(
    (bookingId: string) => {
      Alert.alert('Cancel Booking', 'Are you sure you want to cancel this booking?', [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            cancelBookingMutation.mutate(bookingId, {
              onSuccess: () => {
                Alert.alert('Success', 'Booking cancelled successfully');
              },
              onError: (error: any) => {
                Alert.alert('Error', error.message || 'Failed to cancel booking');
              },
            });
          },
        },
      ]);
    },
    [cancelBookingMutation],
  );

  const renderBookingItem: ListRenderItem<Booking> = useCallback(
    ({ item }) => (
      <Card style={styles.bookingCard} testID={`booking-${item.id}`}>
        <View style={styles.bookingHeader}>
          <Text variant="h3" style={styles.bookingTitle}>
            {item.trip.destination.name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              item.status === 'confirmed' && styles.statusConfirmed,
              item.status === 'cancelled' && styles.statusCancelled,
            ]}>
            <Text variant="caption" color="textInverse" style={styles.statusText}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text variant="body" color="textLight" style={styles.bookingDates}>
          {formatDate(item.checkInDate)} - {formatDate(item.checkOutDate)}
        </Text>

        <Text variant="body" style={styles.bookingPrice}>
          {formatCurrency(item.totalPrice, item.currency)} • {item.guests} guest
          {item.guests > 1 ? 's' : ''}
        </Text>

        {item.status === 'confirmed' && (
          <Button
            title="Cancel Booking"
            variant="outline"
            size="small"
            onPress={() => handleCancelBooking(item.id)}
            style={styles.cancelButton}
            testID={`cancel-booking-${item.id}`}
          />
        )}
      </Card>
    ),
    [handleCancelBooking],
  );

  const bookingKeyExtractor = useCallback((item: Booking) => item.id, []);

  const isCreatingBooking = tripId !== undefined;
  const bookings = bookingsData?.items || [];

  if (isCreatingBooking) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.form}>
          <Text variant="h2" style={styles.formTitle}>
            Create Booking
          </Text>

          <View style={styles.formGroup}>
            <Text variant="label" style={styles.label}>
              Number of Guests
            </Text>
            <TextInput
              style={styles.input}
              value={guests}
              onChangeText={setGuests}
              keyboardType="numeric"
              placeholder="1"
              testID="guests-input"
            />
          </View>

          <View style={styles.formGroup}>
            <Text variant="label" style={styles.label}>
              Check-in Date
            </Text>
            <TextInput
              style={styles.input}
              value={checkInDate}
              onChangeText={setCheckInDate}
              placeholder="YYYY-MM-DD"
              testID="checkin-input"
            />
          </View>

          <View style={styles.formGroup}>
            <Text variant="label" style={styles.label}>
              Check-out Date
            </Text>
            <TextInput
              style={styles.input}
              value={checkOutDate}
              onChangeText={setCheckOutDate}
              placeholder="YYYY-MM-DD"
              testID="checkout-input"
            />
          </View>

          <View style={styles.formGroup}>
            <Text variant="label" style={styles.label}>
              Special Requests (Optional)
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={specialRequests}
              onChangeText={setSpecialRequests}
              multiline
              numberOfLines={4}
              placeholder="Any special requests or notes..."
              testID="requests-input"
            />
          </View>

          <Button
            title={createBookingMutation.isPending ? 'Creating...' : 'Confirm Booking'}
            onPress={handleCreateBooking}
            disabled={createBookingMutation.isPending}
            fullWidth
            style={styles.submitButton}
            testID="confirm-booking-button"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>
          My Bookings
        </Text>
      </View>

      {isLoading ? (
        <LoadingSpinner fullScreen message="Loading bookings..." />
      ) : bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={bookingKeyExtractor}
          contentContainerStyle={styles.bookingsList}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text variant="h3" color="textLight" align="center">
            No bookings yet
          </Text>
          <Text variant="body" color="textSecondary" align="center" style={styles.emptyText}>
            Start exploring trips to create your first booking
          </Text>
          <Button
            title="Explore Trips"
            onPress={() => navigation.navigate('Home')}
            style={styles.exploreButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bookingCard: {
    marginBottom: spacing.md,
  },
  bookingDates: {
    marginBottom: spacing.xs,
  },
  bookingHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  bookingPrice: {
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  bookingTitle: {
    flex: 1,
    marginRight: spacing.md,
  },
  bookingsList: {
    padding: spacing.lg,
  },
  cancelButton: {
    marginTop: spacing.md,
  },
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
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
  exploreButton: {
    marginTop: spacing.md,
  },
  form: {
    flex: 1,
    padding: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  formTitle: {
    marginBottom: spacing.xl,
  },
  header: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: spacing.lg,
  },
  input: {
    backgroundColor: colors.backgroundGray,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    height: 44,
    paddingHorizontal: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
  },
  statusBadge: {
    backgroundColor: colors.textSecondary,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusCancelled: {
    backgroundColor: colors.error,
  },
  statusConfirmed: {
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: spacing.xl,
  },
  textArea: {
    height: 100,
    paddingTop: spacing.sm,
    textAlignVertical: 'top',
  },
  title: {
    marginBottom: spacing.sm,
  },
});

export default React.memo(BookingsScreen);
