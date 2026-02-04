/**
 * Error Handling Interceptor
 * Maps HTTP errors to unified ApiError format
 */

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { createApiError } from '../models/api-error.model';
import { TOKEN_STORAGE } from '../storage/token-storage.token';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenStorage = inject(TOKEN_STORAGE);

  return next(req).pipe(
    catchError((error) => {
      // Only handle HTTP errors here
      // ApiClient will handle timeout errors
      if (error instanceof HttpErrorResponse) {
        // Handle 401 Unauthorized
        if (error.status === 401) {
          tokenStorage.clearTokens();
          router.navigate(['/auth/login']);
        }

        return throwError(() => createApiError(error));
      }

      // Pass through other errors
      return throwError(() => error);
    }),
  );
};
