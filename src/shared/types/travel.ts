/**
 * Travel-specific types
 */

import { BaseEntity, Location, Image } from './index';

// Destination types
export interface Destination extends BaseEntity {
  name: string;
  description: string;
  location: Location;
  images: Image[];
  rating: number;
  priceRange: 'budget' | 'mid-range' | 'luxury';
  tags: string[];
  isPopular?: boolean;
}

// Trip types
export interface Trip extends BaseEntity {
  destination: Destination;
  startDate: string;
  endDate: string;
  duration: number;
  price: number;
  currency: string;
  images: Image[];
  description: string;
  included: string[];
  excluded: string[];
  rating?: number;
  reviewCount?: number;
}

// Booking types
export interface Booking extends BaseEntity {
  tripId: string;
  trip: Trip;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  guests: number;
  totalPrice: number;
  currency: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  bookingDate: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

// Search filters
export interface SearchFilters {
  destination?: string;
  startDate?: string;
  endDate?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  tags?: string[];
  sortBy?: 'price' | 'rating' | 'popularity' | 'date';
  sortOrder?: 'asc' | 'desc';
}

// Search params
export interface SearchParams extends SearchFilters {
  query?: string;
  page?: number;
  limit?: number;
}
