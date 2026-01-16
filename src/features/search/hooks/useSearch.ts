/**
 * Search feature hooks
 * React Query hooks for search functionality
 */

import { useQuery } from '@tanstack/react-query';
import { searchTrips, searchDestinations } from '../services/searchService';
import { SearchParams } from '@shared/types/travel';

/**
 * Query keys for React Query
 */
export const searchQueryKeys = {
  trips: (params: SearchParams) => ['search', 'trips', params] as const,
  destinations: (query: string, page: number, limit: number) =>
    ['search', 'destinations', query, page, limit] as const,
};

/**
 * Hook to search trips
 */
export const useSearchTrips = (params: SearchParams, enabled: boolean = true) => {
  return useQuery({
    queryKey: searchQueryKeys.trips(params),
    queryFn: () => searchTrips(params),
    enabled: enabled && (!!params.query || !!params.destination),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to search destinations
 */
export const useSearchDestinations = (
  query: string,
  page: number = 1,
  limit: number = 20,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: searchQueryKeys.destinations(query, page, limit),
    queryFn: () => searchDestinations(query, page, limit),
    enabled: enabled && query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
