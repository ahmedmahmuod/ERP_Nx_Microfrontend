/**
 * Unified API Error Model
 * Consistent error representation across the application
 */

export type ApiErrorKind =
  | 'network'
  | 'unauthorized'
  | 'forbidden'
  | 'not-found'
  | 'validation'
  | 'server'
  | 'timeout'
  | 'unknown';

export interface ApiError {
  /**
   * Error classification
   */
  readonly kind: ApiErrorKind;

  /**
   * HTTP status code (if available)
   */
  readonly statusCode?: number;

  /**
   * Translation key for user-facing message
   */
  readonly messageKey: string;

  /**
   * Additional error details (for logging/debugging)
   */
  readonly details?: Record<string, unknown>;

  /**
   * Raw error object (for debugging)
   */
  readonly raw?: unknown;
}

/**
 * Factory function to create ApiError from HTTP error
 */
export function createApiError(error: unknown): ApiError {
  // Network error (no response)
  if (error instanceof Error && error.message.includes('Network')) {
    return {
      kind: 'network',
      messageKey: 'errors.network',
      raw: error,
    };
  }

  // HTTP error response
  if (isHttpErrorResponse(error)) {
    const statusCode = error.status;

    switch (statusCode) {
      case 401:
        return {
          kind: 'unauthorized',
          statusCode,
          messageKey: 'errors.unauthorized',
          raw: error,
        };

      case 403:
        return {
          kind: 'forbidden',
          statusCode,
          messageKey: 'errors.forbidden',
          raw: error,
        };

      case 404:
        return {
          kind: 'not-found',
          statusCode,
          messageKey: 'errors.notFound',
          raw: error,
        };

      case 422:
        return {
          kind: 'validation',
          statusCode,
          messageKey: 'errors.validation',
          details: error.error,
          raw: error,
        };

      case 500:
      case 502:
      case 503:
      case 504:
        return {
          kind: 'server',
          statusCode,
          messageKey: 'errors.server',
          raw: error,
        };

      default:
        // Check for custom backend error format
        if (error.error?.status === false) {
          return {
            kind: 'validation',
            statusCode,
            messageKey: 'errors.invalidCredentials',
            details: error.error,
            raw: error,
          };
        }

        return {
          kind: 'unknown',
          statusCode,
          messageKey: 'errors.unknown',
          raw: error,
        };
    }
  }

  // Timeout error
  if (error instanceof Error && error.name === 'TimeoutError') {
    return {
      kind: 'timeout',
      messageKey: 'errors.timeout',
      raw: error,
    };
  }

  // Unknown error
  return {
    kind: 'unknown',
    messageKey: 'errors.unknown',
    raw: error,
  };
}

/**
 * Type guard for HTTP error response
 */
function isHttpErrorResponse(error: unknown): error is {
  status: number;
  error?: { status?: boolean; message?: string };
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof (error as { status: unknown }).status === 'number'
  );
}
