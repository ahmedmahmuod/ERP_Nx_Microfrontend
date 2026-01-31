/**
 * Auth Token Interceptor
 * Attaches Authorization header with Bearer token to requests
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TOKEN_STORAGE } from '../storage/token-storage.token';

/**
 * Paths that should NOT have auth token attached
 */
const EXCLUDED_PATHS = ['/Account/UserLogin', '/Account/Register', '/Account/RefreshToken'];

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = inject(TOKEN_STORAGE);

  // Skip auth endpoints
  const shouldExclude = EXCLUDED_PATHS.some((path) => req.url.includes(path));
  if (shouldExclude) {
    return next(req);
  }

  // Get access token
  const token = tokenStorage.getAccessToken();
  if (!token) {
    return next(req);
  }

  // Clone request and attach Authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
