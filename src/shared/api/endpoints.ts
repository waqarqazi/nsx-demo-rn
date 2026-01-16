/**
 * API endpoints configuration
 * Centralized endpoint definitions
 */

export const endpoints = {
  // Destinations
  destinations: {
    list: '/destinations',
    detail: (id: string) => `/destinations/${id}`,
    popular: '/destinations/popular',
    search: '/destinations/search',
  },

  // Trips
  trips: {
    list: '/trips',
    detail: (id: string) => `/trips/${id}`,
    search: '/trips/search',
    featured: '/trips/featured',
  },

  // Bookings
  bookings: {
    list: '/bookings',
    detail: (id: string) => `/bookings/${id}`,
    create: '/bookings',
    cancel: (id: string) => `/bookings/${id}/cancel`,
    update: (id: string) => `/bookings/${id}`,
  },

  // User
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
  },
} as const;
