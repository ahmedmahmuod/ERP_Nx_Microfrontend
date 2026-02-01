/**
 * Permissions Store
 * Manages user permissions with caching and reactive state
 * Server-authoritative: permissions loaded from API on app entry
 */

import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PermissionsApiService } from '@erp/shared/data-access';
import {
  mapUserRoleResponseToPermissionSet,
  PermissionSet,
} from '@erp/shared/models';
import { CompanyFacade } from './company.facade';
import { UserFacade } from './user.facade';

@Injectable({
  providedIn: 'root',
})
export class PermissionsStore {
  private readonly apiService = inject(PermissionsApiService);
  private readonly companyFacade = inject(CompanyFacade);
  private readonly userFacade = inject(UserFacade);

  // State
  private readonly permissionsSignal = signal<PermissionSet | null>(null);
  private readonly loadingSignal = signal(false);
  private readonly errorSignal = signal<string | null>(null);
  private readonly currentModuleId = signal<number | null>(null);

  // Public readonly
  readonly permissions = this.permissionsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  // Computed
  readonly allowedPages = computed(
    () => this.permissions()?.allowedPages ?? new Set<string>(),
  );
  readonly allowedActions = computed(
    () => this.permissions()?.allowedActions ?? new Set<string>(),
  );
  readonly roleId = computed(() => this.permissions()?.roleId ?? 0);

  constructor() {
    // Auto-reload permissions when user or company changes
    effect(() => {
      const userId = this.userFacade.userId();
      const companyId = this.companyFacade.activeCompany()?.id;
      const moduleId = this.currentModuleId();

      // If we have all required data and a module is set, reload permissions
      // We don't force here because this triggers on state changes within the app
      if (userId && companyId && moduleId) {
        this.loadPermissions(moduleId);
      }
    });
  }

  /**
   * Load permissions for a module
   * @param moduleId - Module ID to load permissions for
   * @param force - If true, bypasses session cache and calls API (used on app refresh)
   */
  async loadPermissions(moduleId: number, force = false): Promise<void> {
    // Store the module ID for auto-reload effect
    this.currentModuleId.set(moduleId);

    const companyId = this.companyFacade.activeCompany()?.id;
    const userId = this.userFacade.userId();

    // Silently skip if user/company not available yet (e.g., not logged in)
    if (!companyId || !userId) {
      return;
    }

    // Check cache unless force requested
    if (!force) {
      const cached = this.getCachedPermissions(userId, companyId, moduleId);
      if (cached) {
        this.permissionsSignal.set(cached);
        return;
      }
    }

    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    try {
      const response = await firstValueFrom(
        this.apiService.getUserRoleInCompany({
          CompanyID: companyId,
          UserID: userId,
          ModuleID: moduleId,
        }),
      );

      if (response.IsThereException) {
        throw new Error(
          response.ExceptionMessage || 'Failed to load permissions',
        );
      }

      const permissionSet = mapUserRoleResponseToPermissionSet(
        response,
        companyId,
        moduleId,
      );

      this.permissionsSignal.set(permissionSet);
      this.cachePermissions(userId, companyId, moduleId, permissionSet);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.errorSignal.set(errorMessage);

      // Fallback: empty permission set (safe mode)
      this.permissionsSignal.set({
        roleId: 0,
        companyId,
        moduleId,
        allowedPages: new Set(),
        allowedActions: new Set(),
      });
    } finally {
      this.loadingSignal.set(false);
    }
  }

  /**
   * Check if user can access a page
   * @param pageKey - PageValue from backend (e.g., "Users", "Companies")
   */
  canAccessPage(pageKey: string): boolean {
    return this.allowedPages().has(pageKey);
  }

  /**
   * Check if user can perform an action
   * @param actionKey - ActionValue from backend (e.g., "Create", "Edit", "Delete")
   */
  canDoAction(actionKey: string): boolean {
    return this.allowedActions().has(actionKey);
  }

  /**
   * Check if user has any of the given page claims
   */
  hasAnyPageClaim(pageKeys: string[]): boolean {
    const allowed = this.allowedPages();
    return pageKeys.some((key) => allowed.has(key));
  }

  /**
   * Clear cached permissions (e.g., on logout)
   */
  clearCache(): void {
    sessionStorage.removeItem(this.getCacheKeyPrefix());
  }

  // Cache implementation (sessionStorage)
  private getCachedPermissions(
    userId: string,
    companyId: string,
    moduleId: number,
  ): PermissionSet | null {
    const key = this.getCacheKey(userId, companyId, moduleId);
    const cached = sessionStorage.getItem(key);
    if (!cached) return null;

    try {
      const parsed = JSON.parse(cached);
      return {
        ...parsed,
        allowedPages: new Set(parsed.allowedPages),
        allowedActions: new Set(parsed.allowedActions),
      };
    } catch {
      return null;
    }
  }

  private cachePermissions(
    userId: string,
    companyId: string,
    moduleId: number,
    permissions: PermissionSet,
  ): void {
    const key = this.getCacheKey(userId, companyId, moduleId);
    sessionStorage.setItem(
      key,
      JSON.stringify({
        ...permissions,
        allowedPages: Array.from(permissions.allowedPages),
        allowedActions: Array.from(permissions.allowedActions),
      }),
    );
  }

  private getCacheKey(
    userId: string,
    companyId: string,
    moduleId: number,
  ): string {
    return `permissions-${userId}-${companyId}-${moduleId}`;
  }

  private getCacheKeyPrefix(): string {
    const userId = this.userFacade.userId();
    return `permissions-${userId}`;
  }
}
