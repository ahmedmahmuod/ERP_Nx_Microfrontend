import { inject } from '@angular/core';
import {
  Router,
  type CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AUTH_ROUTES, BASE_ROUTES } from '@erp/shared/config';
import { CompanyFacade } from '@erp/shared/util-state';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to login - clean URL (best practice)
  return router.createUrlTree([AUTH_ROUTES.LOGIN]);
};

/**
 * Guest Guard
 *
 * Redirects authenticated users away from auth pages.
 */
export const guestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const companyFacade = inject(CompanyFacade);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // If already logged in and HAS a company, redirect to dashboard
  if (companyFacade.activeCompany()) {
    return router.createUrlTree([BASE_ROUTES.DASHBOARD]);
  }

  // If already logged in but NO company, allowed ONLY on select-company
  // This avoids infinite redirect loops when accessing /auth/select-company
  if (state.url !== AUTH_ROUTES.SELECT_COMPANY) {
    return router.createUrlTree([AUTH_ROUTES.SELECT_COMPANY]);
  }

  return true;
};
