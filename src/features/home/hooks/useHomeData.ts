/**
 * Home feature hooks
 * React Query hooks for home screen data
 */

import { useQuery } from '@tanstack/react-query';
import { getFeaturedTrips, getPopularDestinations } from '../services/homeService';
import { Trip, Destination } from '@shared/types/travel';

/**
 * Query keys for React Query
 */
export const homeQueryKeys = {
  featuredTrips: ['home', 'featuredTrips'] as const,
  popularDestinations: ['home', 'popularDestinations'] as const,
};

/**
 * Hook to fetch featured trips
 */
export const useFeaturedTrips = () => {
  return useQuery<Trip[]>({
    queryKey: homeQueryKeys.featuredTrips,
    queryFn: getFeaturedTrips,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch popular destinations
 */
export const usePopularDestinations = () => {
  return useQuery<Destination[]>({
    queryKey: homeQueryKeys.popularDestinations,
    queryFn: getPopularDestinations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
