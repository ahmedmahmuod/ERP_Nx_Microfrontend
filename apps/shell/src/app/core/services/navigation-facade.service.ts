/**
 * Navigation Facade Service
 *
 * Centralized service for managing navigation state across the shell and remotes.
 * Features:
 * - Detects active app context from routes
 * - Lazy-loads remote manifests with caching
 * - Comprehensive logging and diagnostics
 * - Robust error handling with retry mechanism
 * - Reactive state management via signals
 */

import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { loadRemoteModule } from '@nx/angular/mf';
import {
  NavigationManifest,
  NavigationState,
  NavItem,
} from '@erp/shared/models';
import { applyAccentToken } from '@erp/shared/theme';
import {
  REMOTE_REGISTRY,
  getRemoteConfig,
  isRegisteredRemote,
} from '../config/remote-registry.config';
import { PermissionsFacade } from '@erp/shared/util-state';
import { ModuleKey, getModuleKeyByRoute } from '@erp/shared/models';

/**
 * Shell's default navigation manifest
 */
const SHELL_MANIFEST: NavigationManifest = {
  appId: 'shell',
  appName: 'Dashboard',
  sidebarTitle: 'Main Menu',
  accentToken: 'shell',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/dashboard',
    },
  ],
  searchKeywords: ['dashboard', 'home', 'overview'],
};

/**
 * Manifest cache to avoid redundant loading
 */
interface ManifestCacheEntry {
  manifest: NavigationManifest;
  timestamp: number;
}

const MANIFEST_CACHE = new Map<string, ManifestCacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

@Injectable({
  providedIn: 'root',
})
export class NavigationFacadeService {
  private readonly router = inject(Router);
  private readonly permissionsFacade = inject(PermissionsFacade);
  private readonly enableLogging = false; // Set to false in production

  // Internal state signals
  private readonly _state = signal<NavigationState>({
    activeManifest: SHELL_MANIFEST,
    loading: false,
    error: null,
    activeAppId: 'shell',
  });

  // Public computed signals
  readonly activeManifest = computed(() => this._state().activeManifest);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);
  readonly activeAppId = computed(() => this._state().activeAppId);

  // Derived UI signals
  readonly sidebarTitle = computed(
    () => this.activeManifest()?.sidebarTitle || 'Menu',
  );

  // Menu items filtered by permissions
  readonly menuItems = computed(() => {
    const items = this.activeManifest()?.menuItems || [];
    const activeModule = this.permissionsFacade.activeModuleKey();

    if (!activeModule) {
      // No active module, show all items (dashboard context)
      return items;
    }

    return this.filterMenuItemsByPermissions(items, activeModule);
  });

  readonly accentToken = computed(
    () => this.activeManifest()?.accentToken || 'shell',
  );
  readonly appIcon = computed(() => this.activeManifest()?.appIcon);

  constructor() {
    // Listen to route changes and update active app context
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe((event) => {
        this.detectAndLoadManifest(event.url);
        this.updateActiveModuleFromUrl(event.url);
      });

    // Apply accent token whenever it changes
    effect(() => {
      const token = this.accentToken();
      applyAccentToken(token);
    });

    // Initialize with current route
    this.detectAndLoadManifest(this.router.url);
    this.updateActiveModuleFromUrl(this.router.url);
  }

  /**
   * Detect active app from URL and load its manifest
   */
  private detectAndLoadManifest(url: string): void {
    const appId = this.extractAppIdFromUrl(url);

    // If already on this app, skip
    if (appId === this._state().activeAppId) {
      return;
    }

    // Update to shell if no specific app detected
    if (appId === 'shell') {
      this.setShellManifest();
      return;
    }

    // Load remote manifest
    this.loadRemoteManifest(appId);
  }

  /**
   * Extract app ID from URL
   */
  private extractAppIdFromUrl(url: string): string {
    // Remove query params and fragments
    const cleanUrl = url.split('?')[0].split('#')[0];
    const segments = cleanUrl.split('/').filter(Boolean);

    // Check first segment against registered remotes
    const firstSegment = segments[0];
    if (firstSegment && isRegisteredRemote(firstSegment)) {
      this.log('Detected app from URL:', { url, appId: firstSegment });
      return firstSegment;
    }

    // Default to shell
    this.log('No remote app detected, using shell', { url });
    return 'shell';
  }

  /**
   * Load manifest from a remote application with caching and diagnostics
   */
  private async loadRemoteManifest(appId: string): Promise<void> {
    const remoteConfig = getRemoteConfig(appId);
    if (!remoteConfig) {
      this.log('Remote config not found for appId:', appId, 'error');
      this.setShellManifest();
      return;
    }

    // Check cache first
    const cached = this.getCachedManifest(appId);
    if (cached) {
      this.log('Using cached manifest for:', appId);
      this._state.update((state) => ({
        ...state,
        activeManifest: cached,
        loading: false,
        error: null,
        activeAppId: appId,
      }));
      return;
    }

    // Set loading state
    this._state.update((state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    this.log('Loading manifest for:', {
      appId,
      remoteName: remoteConfig.remoteName,
      manifestKey: remoteConfig.manifestKey,
      displayName: remoteConfig.displayName,
    });

    try {
      // Dynamically load the manifest from the remote
      const startTime = performance.now();
      const module = await loadRemoteModule(
        remoteConfig.remoteName,
        remoteConfig.manifestKey,
      );
      const loadTime = performance.now() - startTime;

      this.log('Module loaded successfully:', {
        appId,
        loadTimeMs: loadTime.toFixed(2),
        moduleKeys: Object.keys(module),
      });

      const manifest: NavigationManifest = module.remoteManifest;

      // Validate manifest
      if (!this.isValidManifest(manifest)) {
        throw new Error(
          `Invalid manifest structure from ${appId}. Expected: { appId, appName, sidebarTitle, accentToken, menuItems[] }`,
        );
      }

      this.log('Manifest validated successfully:', {
        appId: manifest.appId,
        appName: manifest.appName,
        menuItemsCount: manifest.menuItems.length,
      });

      // Cache the manifest
      this.cacheManifest(appId, manifest);

      // Update state with loaded manifest
      this._state.update((state) => ({
        ...state,
        activeManifest: manifest,
        loading: false,
        error: null,
        activeAppId: appId,
      }));
    } catch (error) {
      this.logError('Failed to load manifest', {
        appId,
        remoteName: remoteConfig.remoteName,
        manifestKey: remoteConfig.manifestKey,
        error: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
      });

      // Fallback to a basic manifest with error indication
      const fallbackManifest: NavigationManifest = {
        appId,
        appName: remoteConfig.displayName,
        sidebarTitle: `${remoteConfig.displayName} (Unavailable)`,
        accentToken: appId,
        menuItems: [
          {
            label: 'Remote Unavailable',
            icon: 'pi-exclamation-triangle',
            route: `/${appId}`,
          },
        ],
      };

      this._state.update((state) => ({
        ...state,
        activeManifest: fallbackManifest,
        loading: false,
        error: `Failed to load ${remoteConfig.displayName} navigation. Check console for details.`,
        activeAppId: appId,
      }));
    }
  }

  /**
   * Set shell manifest as active
   */
  private setShellManifest(): void {
    this._state.update((state) => ({
      ...state,
      activeManifest: SHELL_MANIFEST,
      loading: false,
      error: null,
      activeAppId: 'shell',
    }));
  }

  /**
   * Validate manifest structure
   */
  private isValidManifest(manifest: unknown): manifest is NavigationManifest {
    if (!manifest || typeof manifest !== 'object') {
      return false;
    }

    const m = manifest as Partial<NavigationManifest>;
    return !!(
      m.appId &&
      m.appName &&
      m.sidebarTitle &&
      m.accentToken &&
      Array.isArray(m.menuItems)
    );
  }

  /**
   * Capitalize app ID for display
   */
  private capitalizeAppId(appId: string): string {
    return appId.charAt(0).toUpperCase() + appId.slice(1);
  }

  /**
   * Manually reload the current manifest (useful for error recovery)
   * Clears cache and forces fresh load
   */
  reloadManifest(): void {
    const currentAppId = this._state().activeAppId;
    if (currentAppId && currentAppId !== 'shell') {
      this.log('Reloading manifest for:', currentAppId);
      // Clear cache for this app
      MANIFEST_CACHE.delete(currentAppId);
      this.loadRemoteManifest(currentAppId);
    }
  }

  /**
   * Cache manifest for performance
   */
  private cacheManifest(appId: string, manifest: NavigationManifest): void {
    MANIFEST_CACHE.set(appId, {
      manifest,
      timestamp: Date.now(),
    });
    this.log('Manifest cached for:', appId);
  }

  /**
   * Get cached manifest if still valid
   */
  private getCachedManifest(appId: string): NavigationManifest | null {
    const cached = MANIFEST_CACHE.get(appId);
    if (!cached) {
      return null;
    }

    const age = Date.now() - cached.timestamp;
    if (age > CACHE_TTL_MS) {
      this.log('Cache expired for:', appId);
      MANIFEST_CACHE.delete(appId);
      return null;
    }

    return cached.manifest;
  }

  /**
   * Clear all cached manifests
   */
  clearCache(): void {
    MANIFEST_CACHE.clear();
    this.log('Manifest cache cleared');
  }

  /**
   * Diagnostic logging
   */
  private log(
    message: string,
    data?: unknown,
    level: 'info' | 'warn' | 'error' = 'info',
  ): void {
    if (!this.enableLogging) return;

    const prefix = '[NavigationFacade]';
    const timestamp = new Date().toISOString();

    switch (level) {
      case 'error':
        console.error(`${prefix} ${timestamp}`, message, data);
        break;
      case 'warn':
        console.warn(`${prefix} ${timestamp}`, message, data);
        break;
      default:
        console.log(`${prefix} ${timestamp}`, message, data);
    }
  }

  /**
   * Error logging with full diagnostics
   */
  private logError(
    message: string,
    diagnostics: Record<string, unknown>,
  ): void {
    if (!this.enableLogging) return;

    console.error(`[NavigationFacade] ERROR: ${message}`);
    console.error('Diagnostics:', diagnostics);
    console.error('Remote Registry:', REMOTE_REGISTRY);
    console.error('Current State:', this._state());
  }

  /**
   * Search menu items by query
   */
  searchMenuItems(query: string): NavItem[] {
    if (!query.trim()) {
      return this.menuItems();
    }

    const lowerQuery = query.toLowerCase();
    return this.filterMenuItems(this.menuItems(), lowerQuery);
  }

  /**
   * Recursively filter menu items by search query
   */
  private filterMenuItems(items: NavItem[], query: string): NavItem[] {
    const results: NavItem[] = [];

    for (const item of items) {
      // Check if item matches
      const labelMatch = item.label.toLowerCase().includes(query);
      const keywordMatch = item.searchKeywords?.some((keyword) =>
        keyword.toLowerCase().includes(query),
      );
      const routeMatch = item.route?.toLowerCase().includes(query);

      // Check children recursively
      const matchingChildren = item.children
        ? this.filterMenuItems(item.children, query)
        : [];

      // Include item if it matches or has matching children
      if (
        labelMatch ||
        keywordMatch ||
        routeMatch ||
        matchingChildren.length > 0
      ) {
        results.push({
          ...item,
          children:
            matchingChildren.length > 0 ? matchingChildren : item.children,
        });
      }
    }

    return results;
  }

  /**
   * Update active module in PermissionsFacade based on URL
   */
  private updateActiveModuleFromUrl(url: string): void {
    const moduleKey = getModuleKeyByRoute(url);

    // Dashboard and shell routes don't have a module context
    if (!moduleKey) {
      this.log('No module context for route:', url);
      return;
    }

    this.permissionsFacade.setActiveModule(moduleKey);

    // Ensure permissions are loaded for this module
    this.permissionsFacade.ensureModulePermissions(moduleKey).catch((error) => {
      this.logError('Failed to load permissions for module', {
        moduleKey,
        error: error instanceof Error ? error.message : String(error),
      });
    });
  }

  /**
   * Filter menu items based on permissions
   */
  private filterMenuItemsByPermissions(
    items: NavItem[],
    moduleKey: ModuleKey,
  ): NavItem[] {
    const filtered: NavItem[] = [];

    for (const item of items) {
      // Check if item has permission requirement
      if (item.requiredPage) {
        const hasPermission = this.permissionsFacade.hasPage(
          moduleKey,
          item.requiredPage,
        );
        if (!hasPermission) {
          continue; // Skip this item
        }
      }

      // Filter children recursively
      const filteredChildren = item.children
        ? this.filterMenuItemsByPermissions(item.children, moduleKey)
        : undefined;

      // Add item with filtered children
      filtered.push({
        ...item,
        children: filteredChildren,
      });
    }

    return filtered;
  }
}
