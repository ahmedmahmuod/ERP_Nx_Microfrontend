/**
 * Correlation ID Interceptor
 * Attaches unique correlation ID to each request for tracing
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_CONFIG } from '../config/api-config.token';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(API_CONFIG);

  // Skip if disabled
  if (!config.enableCorrelationId) {
    return next(req);
  }

  // Generate correlation ID
  const correlationId = generateCorrelationId();

  // Clone request and attach header
  const correlatedReq = req.clone({
    setHeaders: {
      'X-Correlation-ID': correlationId,
    },
  });

  return next(correlatedReq);
};

/**
 * Generate unique correlation ID
 */
function generateCorrelationId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
