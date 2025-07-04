import { type FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Type predicate to check if an error is a FetchBaseQueryError
export const isFetchBaseQueryError = (
  error: unknown
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error;
};

// Type predicate to narrow an unknown error to an object with a string 'message' property
export const isErrorWithMessage = (
  error: unknown
): error is { message: string } => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
};

// Get error message
export const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    const message =
      (error.data as { message?: string })?.message ||
      `Request failed with status ${error.status}`;
    return message;
  }

  if (isErrorWithMessage(error)) {
    return error.message;
  }

  // Fallback for any other error type
  return 'An unexpected error occurred';
};
