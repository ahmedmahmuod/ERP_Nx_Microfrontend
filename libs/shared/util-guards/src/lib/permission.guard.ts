/**
 * Permission Guard
 * Protects routes based on page-level permissions
 */

import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionsFacade } from '@erp/shared/util-state';
import { ModuleKey, getModuleKeyByRoute } from '@erp/shared/config';

export interface PermissionGuardData {
  requiredPage?: string;
  moduleKey?: ModuleKey;
}

export const permissionGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const permissionsFacade = inject(PermissionsFacade);
  const router = inject(Router);

  const data = route.data as PermissionGuardData;
  const requiredPage = data.requiredPage;

  if (!requiredPage) {
    // No permission requirement, allow access
    return true;
  }

  // Determine module key from route data or URL
  let moduleKey = data.moduleKey;
  if (!moduleKey) {
    const url = '/' + route.url.map(segment => segment.path).join('/');
    moduleKey = getModuleKeyByRoute(url);
  }

  if (!moduleKey) {
    console.warn('Permission guard: Unable to determine module key from route');
    return router.createUrlTree(['/access-denied']);
  }

  try {
    // Ensure permissions are loaded for this module
    await permissionsFacade.ensureModulePermissions(moduleKey);

    // Check if user has access to the required page
    const hasAccess = permissionsFacade.hasPage(moduleKey, requiredPage);

    if (!hasAccess) {
      return router.createUrlTree(['/access-denied']);
    }

    return true;
  } catch (error) {
    console.error('Permission guard error:', error);
    return router.createUrlTree(['/access-denied']);
  }
};
