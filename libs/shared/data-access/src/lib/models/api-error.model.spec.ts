/**
 * API Error Model Tests
 */

import { describe, it, expect } from 'vitest';
import { createApiError } from './api-error.model';

describe('createApiError', () => {
  it('should map 401 to unauthorized error', () => {
    const httpError = { status: 401, error: {} };
    const apiError = createApiError(httpError);

    expect(apiError.kind).toBe('unauthorized');
    expect(apiError.statusCode).toBe(401);
    expect(apiError.messageKey).toBe('errors.unauthorized');
  });

  it('should map 403 to forbidden error', () => {
    const httpError = { status: 403, error: {} };
    const apiError = createApiError(httpError);

    expect(apiError.kind).toBe('forbidden');
    expect(apiError.statusCode).toBe(403);
    expect(apiError.messageKey).toBe('errors.forbidden');
  });

  it('should map 404 to not-found error', () => {
    const httpError = { status: 404, error: {} };
    const apiError = createApiError(httpError);

    expect(apiError.kind).toBe('not-found');
    expect(apiError.statusCode).toBe(404);
    expect(apiError.messageKey).toBe('errors.notFound');
  });

  it('should map 500 to server error', () => {
    const httpError = { status: 500, error: {} };
    const apiError = createApiError(httpError);

    expect(apiError.kind).toBe('server');
    expect(apiError.statusCode).toBe(500);
    expect(apiError.messageKey).toBe('errors.server');
  });

  it('should map backend status=false to invalidCredentials', () => {
    const httpError = { status: 400, error: { status: false, message: 'Invalid credentials' } };
    const apiError = createApiError(httpError);

    expect(apiError.kind).toBe('validation');
    expect(apiError.messageKey).toBe('errors.invalidCredentials');
  });

  it('should handle network errors', () => {
    const networkError = new Error('Network error');
    const apiError = createApiError(networkError);

    expect(apiError.kind).toBe('network');
    expect(apiError.messageKey).toBe('errors.network');
  });

  it('should handle timeout errors', () => {
    const timeoutError = new Error('Timeout');
    timeoutError.name = 'TimeoutError';
    const apiError = createApiError(timeoutError);

    expect(apiError.kind).toBe('timeout');
    expect(apiError.messageKey).toBe('errors.timeout');
  });

  it('should handle unknown errors', () => {
    const unknownError = { status: 418 };
    const apiError = createApiError(unknownError);

    expect(apiError.kind).toBe('unknown');
    expect(apiError.messageKey).toBe('errors.unknown');
  });
});
