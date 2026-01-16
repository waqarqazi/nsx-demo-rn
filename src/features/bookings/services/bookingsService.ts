/**
 * Bookings feature service
 * Handles API calls for bookings
 */

import apiClient from '@api/client';
import { endpoints } from '@api/endpoints';
import { ApiResponse, PaginatedResponse } from '@shared/types';
import { Booking } from '@shared/types/travel';

export interface CreateBookingParams {
  tripId: string;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

/**
 * Fetch user bookings
 */
export const getBookings = async (
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<Booking>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Booking>>>(
    endpoints.bookings.list,
    {
      params: { page, limit },
    },
  );
  return response.data.data;
};

/**
 * Fetch booking details
 */
export const getBookingDetails = async (bookingId: string): Promise<Booking> => {
  const response = await apiClient.get<ApiResponse<Booking>>(
    endpoints.bookings.detail(bookingId),
  );
  return response.data.data;
};

/**
 * Create a new booking
 */
export const createBooking = async (
  params: CreateBookingParams,
): Promise<Booking> => {
  const response = await apiClient.post<ApiResponse<Booking>>(
    endpoints.bookings.create,
    params,
  );
  return response.data.data;
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (bookingId: string): Promise<void> => {
  await apiClient.post(endpoints.bookings.cancel(bookingId));
};

/**
 * Update a booking
 */
export const updateBooking = async (
  bookingId: string,
  updates: Partial<CreateBookingParams>,
): Promise<Booking> => {
  const response = await apiClient.put<ApiResponse<Booking>>(
    endpoints.bookings.update(bookingId),
    updates,
  );
  return response.data.data;
};
