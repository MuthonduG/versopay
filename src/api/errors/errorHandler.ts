// Import shared ApiError type for consistent error shape across the app
import type { ApiError } from '../types';

// Map HTTP status codes to user-friendly messages shown in the UI
const STATUS_MESSAGES: Record<number, string> = {
  400: 'Invalid request. Please check your input and try again.',
  401: 'Your session has expired. Please log in again.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  422: 'The request could not be processed. Please verify your data.',
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Something went wrong on our end. Please try again later.',
};

// Returns a user-friendly message for a given status code; fallback for unknown codes
export function mapStatusToMessage(status: number): string {
  return STATUS_MESSAGES[status] ?? 'An unexpected error occurred. Please try again.';
}

// Builds an ApiError object with optional status, code, and raw response data
export function normalizeError(
  message: string,
  status?: number,
  code?: string,
  data?: unknown
): ApiError {
  return {
    message: message || mapStatusToMessage(status ?? 500),
    code,
    status,
    data,
  };
}

// Converts unknown errors (e.g. Axios errors, native Error) into a normalized ApiError
export function parseApiError(error: unknown): ApiError {
  // Handle Axios-style errors: error.response contains status and data
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: { status?: number; data?: { message?: string } };
      message?: string;
    };
    const status = axiosError.response?.status;
    const serverMessage = axiosError.response?.data?.message;
    return normalizeError(
      serverMessage || mapStatusToMessage(status ?? 500),
      status,
      undefined,
      axiosError.response?.data
    );
  }

  // Handle standard Error instances: use error.message
  if (error instanceof Error) {
    return normalizeError(error.message);
  }

  // Fallback for non-Error values (e.g. thrown strings, null)
  return normalizeError('An unexpected error occurred.');
}
