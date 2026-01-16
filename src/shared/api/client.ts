/**
 * Axios API client configuration
 * Handles request/response interceptors and error handling
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../types';
import { getApiBaseUrl, getApiTimeout } from '../config/env';

/**
 * Create and configure Axios instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: getApiTimeout(),
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds auth token and other common headers
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = ''; // Get from secure storage in production
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request ID for tracking
    if (config.headers) {
      config.headers['X-Request-ID'] = `${Date.now()}-${Math.random()}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Response interceptor
 * Handles common errors and transforms responses
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<ApiError>) => {
    // Handle network errors
    if (!error.response) {
      const networkError: ApiError = {
        message: 'Network error. Please check your connection.',
        code: 'NETWORK_ERROR',
      };
      return Promise.reject(networkError);
    }

    // Handle HTTP errors
    const status = error.response.status;
    const errorData = error.response.data;

    switch (status) {
      case 401:
        // Handle unauthorized - redirect to login
        // In production, clear tokens and redirect
        break;
      case 403:
        // Handle forbidden
        break;
      case 404:
        // Handle not found
        break;
      case 500:
        // Handle server error
        break;
      default:
        break;
    }

    const apiError: ApiError = {
      message: errorData?.message || 'An unexpected error occurred',
      code: errorData?.code || 'UNKNOWN_ERROR',
      statusCode: status,
    };

    return Promise.reject(apiError);
  },
);

export default apiClient;
