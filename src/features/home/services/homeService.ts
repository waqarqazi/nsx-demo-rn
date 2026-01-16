/**
 * Home feature service
 * Handles API calls for home screen data
 */

import apiClient from '@api/client';
import { endpoints } from '@api/endpoints';
import { ApiResponse, PaginatedResponse } from '@shared/types';
import { Trip, Destination } from '@shared/types/travel';

/**
 * Fetch featured trips
 */
export const getFeaturedTrips = async (): Promise<Trip[]> => {
  const response = await apiClient.get<ApiResponse<Trip[]>>(endpoints.trips.featured);
  return response.data.data;
};

/**
 * Fetch popular destinations
 */
export const getPopularDestinations = async (): Promise<Destination[]> => {
  const response = await apiClient.get<ApiResponse<Destination[]>>(
    endpoints.destinations.popular,
  );
  return response.data.data;
};

/**
 * Fetch destinations with pagination
 */
export const getDestinations = async (
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<Destination>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Destination>>>(
    endpoints.destinations.list,
    {
      params: { page, limit },
    },
  );
  return response.data.data;
};
