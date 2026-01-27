/**
 * Auth Guard
 *
 * Protects routes that require authentication.
 */

import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to login - clean URL (best practice)
  return router.createUrlTree(['/auth/login']);
};

/**
 * Guest Guard
 *
 * Redirects authenticated users away from auth pages.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Redirect to company selection if already logged in
  return router.createUrlTree(['/select-company']);
};
