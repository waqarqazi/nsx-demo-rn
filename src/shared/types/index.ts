/**
 * Shared TypeScript types and interfaces
 */

// Common API response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Common entity types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Location types
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  country?: string;
}

// Image types
export interface Image {
  id: string;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}
