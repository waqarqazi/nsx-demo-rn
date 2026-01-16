/**
 * Trip Details feature hooks
 * React Query hooks for trip details
 */

import { useQuery } from '@tanstack/react-query';
import { getTripDetails } from '../services/tripDetailsService';
import { Trip } from '@shared/types/travel';

/**
 * Query keys for React Query
 */
export const tripDetailsQueryKeys = {
  trip: (tripId: string) => ['tripDetails', tripId] as const,
};

/**
 * Hook to fetch trip details
 */
export const useTripDetails = (tripId: string) => {
  return useQuery<Trip>({
    queryKey: tripDetailsQueryKeys.trip(tripId),
    queryFn: () => getTripDetails(tripId),
    enabled: !!tripId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
