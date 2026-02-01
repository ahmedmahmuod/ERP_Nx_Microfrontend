/**
 * Permissions Facade
 * Single source of truth for user permissions across all modules
 * Handles caching, loading, and permission checks
 */

import { Injectable, inject, signal, computed } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PermissionsApiService } from '@erp/shared/data-access';
import {
  PermissionSet,
  UserRoleRequestDto,
  mapUserRoleResponseToPermissionSet,
  ModuleKey,
  getModuleId,
} from '@erp/shared/models';

interface PermissionsState {
  permissionsByModule: Map<ModuleKey, PermissionSet>;
  activeModuleKey: ModuleKey | null;
  isLoading: boolean;
  error: string | null;
  currentCompanyId: string | null;
  currentUserId: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionsFacade {
  private readonly permissionsApi = inject(PermissionsApiService);

  // State
  private readonly _state = signal<PermissionsState>({
    permissionsByModule: new Map(),
    activeModuleKey: null,
    isLoading: false,
    error: null,
    currentCompanyId: null,
    currentUserId: null,
  });

  // Public selectors
  readonly permissionsByModule = computed(
    () => this._state().permissionsByModule,
  );
  readonly activeModuleKey = computed(() => this._state().activeModuleKey);
  readonly isLoading = computed(() => this._state().isLoading);
  readonly error = computed(() => this._state().error);

  // Get active module permissions
  readonly activePermissions = computed(() => {
    const moduleKey = this._state().activeModuleKey;
    if (!moduleKey) return null;
    return this._state().permissionsByModule.get(moduleKey) ?? null;
  });

  constructor() {
    this.restoreContext();
  }

  /**
   * Restore context from localStorage on initialization
   */
  private restoreContext(): void {
    const userStr = localStorage.getItem('erp-user');
    const companyId = localStorage.getItem('erp-selected-company-id');

    if (userStr && companyId) {
      try {
        const user = JSON.parse(userStr);
        const userId = user.id ? parseInt(user.id) : null;
        if (userId) {
          this._state.update((state) => ({
            ...state,
            currentUserId: userId,
            currentCompanyId: companyId,
          }));
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
  }

  /**
   * Initialize permissions context with user and company
   */
  initializeContext(userId: number, companyId: string): void {
    // Persist to localStorage for page refreshes
    localStorage.setItem('erp-selected-company-id', companyId);

    this._state.update((state) => ({
      ...state,
      currentUserId: userId,
      currentCompanyId: companyId,
    }));
  }

  /**
   * Set active module (typically from route context)
   */
  setActiveModule(moduleKey: ModuleKey): void {
    this._state.update((state) => ({
      ...state,
      activeModuleKey: moduleKey,
    }));
  }

  /**
   * Load permissions for a specific module
   * Always fetches from API (no cache check)
   */
  async loadModulePermissions(moduleKey: ModuleKey): Promise<void> {
    const state = this._state();

    if (!state.currentUserId || !state.currentCompanyId) {
      throw new Error(
        'Permissions context not initialized. Call initializeContext first.',
      );
    }

    this._state.update((s) => ({ ...s, isLoading: true, error: null }));

    try {
      const request: UserRoleRequestDto = {
        CompanyID: state.currentCompanyId,
        UserID: state.currentUserId.toString(),
        ModuleID: getModuleId(moduleKey),
      };

      const response = await firstValueFrom(
        this.permissionsApi.getUserRoleInCompany(request),
      );

      // Check for API-level exceptions
      if (response.IsThereException) {
        throw new Error(
          response.ExceptionMessage || 'Failed to load permissions',
        );
      }

      // Normalize and cache
      const permissionSet = mapUserRoleResponseToPermissionSet(
        response,
        state.currentCompanyId,
        getModuleId(moduleKey),
      );

      this._state.update((s) => {
        const newMap = new Map(s.permissionsByModule);
        newMap.set(moduleKey, permissionSet);
        return {
          ...s,
          permissionsByModule: newMap,
          isLoading: false,
          error: null,
        };
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load permissions';
      this._state.update((s) => ({
        ...s,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  }

  /**
   * Ensure module permissions are loaded (loads only if not cached)
   */
  async ensureModulePermissions(moduleKey: ModuleKey): Promise<void> {
    const cached = this._state().permissionsByModule.get(moduleKey);
    if (cached) {
      return; // Already loaded
    }
    await this.loadModulePermissions(moduleKey);
  }

  /**
   * Check if user has access to a specific page
   */
  hasPage(moduleKey: ModuleKey, pageIdentifier: string): boolean {
    const permissions = this._state().permissionsByModule.get(moduleKey);
    if (!permissions) return false;
    return permissions.allowedPages.has(pageIdentifier);
  }

  /**
   * Check if user has access to a specific action
   */
  hasAction(moduleKey: ModuleKey, actionIdentifier: string): boolean {
    const permissions = this._state().permissionsByModule.get(moduleKey);
    if (!permissions) return false;
    return permissions.allowedActions.has(actionIdentifier);
  }

  /**
   * Check page permission for active module
   */
  hasPageInActiveModule(pageIdentifier: string): boolean {
    const moduleKey = this._state().activeModuleKey;
    if (!moduleKey) return false;
    return this.hasPage(moduleKey, pageIdentifier);
  }

  /**
   * Check action permission for active module
   */
  hasActionInActiveModule(actionIdentifier: string): boolean {
    const moduleKey = this._state().activeModuleKey;
    if (!moduleKey) return false;
    return this.hasAction(moduleKey, actionIdentifier);
  }

  /**
   * Clear all permissions (on logout or company change)
   */
  clearPermissions(): void {
    this._state.set({
      permissionsByModule: new Map(),
      activeModuleKey: null,
      isLoading: false,
      error: null,
      currentCompanyId: null,
      currentUserId: null,
    });
  }

  /**
   * Clear permissions for company change (keeps user context)
   */
  clearPermissionsForCompanyChange(newCompanyId: string): void {
    this._state.update((state) => ({
      ...state,
      permissionsByModule: new Map(),
      currentCompanyId: newCompanyId,
      error: null,
    }));
  }

  /**
   * Get all allowed pages for a module
   */
  getAllowedPages(moduleKey: ModuleKey): Set<string> {
    const permissions = this._state().permissionsByModule.get(moduleKey);
    return permissions?.allowedPages ?? new Set();
  }

  /**
   * Get all allowed actions for a module
   */
  getAllowedActions(moduleKey: ModuleKey): Set<string> {
    const permissions = this._state().permissionsByModule.get(moduleKey);
    return permissions?.allowedActions ?? new Set();
  }
}
