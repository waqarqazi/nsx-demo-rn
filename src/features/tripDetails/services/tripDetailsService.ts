/**
 * Trip Details feature service
 * Handles API calls for trip details
 */

import apiClient from '@api/client';
import { endpoints } from '@api/endpoints';
import { ApiResponse } from '@shared/types';
import { Trip } from '@shared/types/travel';

/**
 * Fetch trip details by ID
 */
export const getTripDetails = async (tripId: string): Promise<Trip> => {
  const response = await apiClient.get<ApiResponse<Trip>>(endpoints.trips.detail(tripId));
  return response.data.data;
};
