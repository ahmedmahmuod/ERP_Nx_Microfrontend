/**
 * Error Handling Interceptor
 * Maps HTTP errors to unified ApiError format
 */

import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { createApiError } from '../models/api-error.model';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      // Only handle HTTP errors here
      // ApiClient will handle timeout errors
      if (error instanceof HttpErrorResponse) {
        return throwError(() => createApiError(error));
      }

      // Pass through other errors
      return throwError(() => error);
    })
  );
};
