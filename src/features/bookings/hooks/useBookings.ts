/**
 * Bookings feature hooks
 * React Query hooks for bookings
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getBookings,
  getBookingDetails,
  createBooking,
  cancelBooking,
  updateBooking,
  CreateBookingParams,
} from '../services/bookingsService';
import { Booking } from '@shared/types/travel';

/**
 * Query keys for React Query
 */
export const bookingsQueryKeys = {
  list: (page: number, limit: number) => ['bookings', 'list', page, limit] as const,
  detail: (bookingId: string) => ['bookings', 'detail', bookingId] as const,
};

/**
 * Hook to fetch user bookings
 */
export const useBookings = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: bookingsQueryKeys.list(page, limit),
    queryFn: () => getBookings(page, limit),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to fetch booking details
 */
export const useBookingDetails = (bookingId: string) => {
  return useQuery<Booking>({
    queryKey: bookingsQueryKeys.detail(bookingId),
    queryFn: () => getBookingDetails(bookingId),
    enabled: !!bookingId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to create a booking
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateBookingParams) => createBooking(params),
    onSuccess: () => {
      // Invalidate bookings list to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

/**
 * Hook to cancel a booking
 */
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId: string) => cancelBooking(bookingId),
    onSuccess: () => {
      // Invalidate bookings list to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

/**
 * Hook to update a booking
 */
export const useUpdateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, updates }: { bookingId: string; updates: Partial<CreateBookingParams> }) =>
      updateBooking(bookingId, updates),
    onSuccess: (_, variables) => {
      // Invalidate specific booking and list
      queryClient.invalidateQueries({
        queryKey: bookingsQueryKeys.detail(variables.bookingId),
      });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
