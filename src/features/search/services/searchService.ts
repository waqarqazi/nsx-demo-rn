/**
 * Search feature service
 * Handles search API calls
 */

import apiClient from '@api/client';
import { endpoints } from '@api/endpoints';
import { ApiResponse, PaginatedResponse } from '@shared/types';
import { Trip, SearchParams } from '@shared/types/travel';

/**
 * Search trips
 */
export const searchTrips = async (params: SearchParams): Promise<PaginatedResponse<Trip>> => {
  const response = await apiClient.get<ApiResponse<PaginatedResponse<Trip>>>(
    endpoints.trips.search,
    {
      params,
    },
  );
  return response.data.data;
};

/**
 * Search destinations
 */
export const searchDestinations = async (
  query: string,
  page: number = 1,
  limit: number = 20,
): Promise<PaginatedResponse<import('@shared/types/travel').Destination>> => {
  const response = await apiClient.get<
    ApiResponse<PaginatedResponse<import('@shared/types/travel').Destination>>
  >(endpoints.destinations.search, {
    params: { query, page, limit },
  });
  return response.data.data;
};
