/**
 * Company Guard
 *
 * Ensures user has selected a company before accessing protected routes.
 * Redirects to company selection page if no active company is set.
 */

import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { CompanyFacade } from '@erp/shared/util-state';
import { AUTH_ROUTES } from '@erp/shared/config';

export const companyGuard: CanActivateFn = () => {
  const companyFacade = inject(CompanyFacade);
  const router = inject(Router);

  // Check if company is selected
  if (companyFacade.activeCompany()) {
    return true;
  }

  // No company selected - redirect to company selection in Auth remote
  return router.createUrlTree([AUTH_ROUTES.SELECT_COMPANY]);
};
