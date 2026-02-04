/**
 * Correlation ID Interceptor
 * Attaches unique correlation ID to each request for tracing
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '@erp/shared/config';

export const correlationIdInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(ConfigService);

  // Skip if config not loaded yet (e.g., during the config fetch itself)
  if (!service.isLoaded) {
    return next(req);
  }

  const config = service.get();

  // Skip if disabled
  if (!config.constants?.enableCorrelationId) {
    return next(req);
  }

  // Skip assets (i18n, images, etc.) to avoid CORS preflight issues on static files
  if (req.url.includes('/assets/') || req.url.endsWith('.json')) {
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
