import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionsStore } from '@erp/shared/util-state';

export const permissionGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
) => {
  const router = inject(Router);
  const permissionsStore = inject(PermissionsStore);

  const moduleId = route.data['moduleId'];
  const permissionKey = route.data['permissionKey'];

  // 1. If no module ID is defined, we can't check/load permissions
  if (!moduleId) {
    return true;
  }

  try {
    // 2. ENTRY CHECK: Check if we have the permission in the CURRENT context first.
    // This handles the case where the entry permission (e.g. 'PayrollModule') is defined
    // in the Shell/Dashboard context, not inside the target module itself.
    if (permissionKey && permissionsStore.canAccessPage(permissionKey)) {
      // We already have permission, likely from Shell context.
      // We STILL need to load the target module permissions for the app to function correctly,
      // but we should do it optimistically or after navigation?
      // Actually, if we return true, navigation proceeds.
      // The App itself should load its own permissions on init if needed.
      // BUT, if we don't load it here, the PermissionsStore stays in "Shell" mode (Module 10).
      // Let's load the new module permissions, but assume the ENTRY was valid.

      // Trigger load in background to switch context
      permissionsStore.loadPermissions(moduleId);
      return true;
    }

    // 3. If not found in current context, maybe we haven't loaded the target module yet?
    // Load permissions for this module
    await permissionsStore.loadPermissions(moduleId);

    // 4. If no specific permission key required, just ensuring module access is enough
    if (!permissionKey) {
      return true;
    }

    // 5. Check specific page permission again in the NEW context
    if (permissionsStore.canAccessPage(permissionKey)) {
      return true;
    }

    // 6. Access denied
    return router.createUrlTree(['/access-denied']);
  } catch (error) {
    console.error('Permission guard error', error);
    return router.createUrlTree(['/access-denied']);
  }
};
