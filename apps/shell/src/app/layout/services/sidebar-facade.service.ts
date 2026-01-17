/**
 * Sidebar Facade Service
 *
 * Manages sidebar-specific state and behavior:
 * - Single-expand accordion (only one group open at a time)
 * - Active item tracking (including parent highlighting)
 * - Search state with auto-expand
 * - Collapsed state management
 *
 * Follows Clean Architecture: presentational component reads signals, emits events.
 */

import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavItem } from '@erp/shared/models';
import { NavigationFacadeService } from '../../core/services/navigation-facade.service';

export interface SidebarState {
  /** Currently open group ID (null if none open) */
  openGroupId: string | null;
  /** Currently active item route */
  activeItemRoute: string | null;
  /** Search query */
  searchQuery: string;
  /** Sidebar collapsed state */
  collapsed: boolean;
  /** Mobile sidebar open state */
  mobileOpen: boolean;
  /** Previous open group (for search restoration) */
  previousOpenGroupId: string | null;
  /** Flag to track if user manually interacted with accordion */
  userInteracted: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SidebarFacadeService {
  private readonly router = inject(Router);
  private readonly navigationFacade = inject(NavigationFacadeService);

  // Internal state
  private readonly _state = signal<SidebarState>({
    openGroupId: null,
    activeItemRoute: null,
    searchQuery: '',
    collapsed: false,
    mobileOpen: false,
    previousOpenGroupId: null,
    userInteracted: false,
  });

  // Public computed signals
  readonly openGroupId = computed(() => this._state().openGroupId);
  readonly activeItemRoute = computed(() => this._state().activeItemRoute);
  readonly searchQuery = computed(() => this._state().searchQuery);
  readonly collapsed = computed(() => this._state().collapsed);
  readonly mobileOpen = computed(() => this._state().mobileOpen);

  // Filtered menu items based on search
  readonly filteredMenuItems = computed(() => {
    const query = this._state().searchQuery;
    if (!query.trim()) {
      return this.navigationFacade.menuItems();
    }
    return this.navigationFacade.searchMenuItems(query);
  });

  // Menu items with active state computed
  readonly menuItemsWithActiveState = computed(() => {
    const items = this.filteredMenuItems();
    const activeRoute = this._state().activeItemRoute;
    return this.computeActiveStates(items, activeRoute);
  });

  constructor() {
    // Track route changes to update active item
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateActiveRoute(event.url);
      });

    // Initialize with current route
    this.updateActiveRoute(this.router.url);

    // Auto-expand group containing active route (only on initial navigation, not after user interaction)
    effect(() => {
      const activeRoute = this.activeItemRoute();
      const menuItems = this.navigationFacade.menuItems();
      const searchQuery = this.searchQuery();
      const userInteracted = this._state().userInteracted;

      // Don't auto-expand during search
      if (searchQuery.trim()) {
        return;
      }

      // Don't auto-expand if user has manually interacted with accordion
      // This prevents fighting with user clicks
      if (userInteracted) {
        return;
      }

      // Find and expand group containing active route
      const groupToExpand = this.findGroupContainingRoute(menuItems, activeRoute);
      if (groupToExpand && groupToExpand !== this.openGroupId()) {
        this._state.update((state) => ({
          ...state,
          openGroupId: groupToExpand,
        }));
      }
    });
  }

  /**
   * Toggle a group (single-expand accordion behavior)
   */
  toggleGroup(groupLabel: string): void {
    this._state.update((state) => {
      const newOpenGroupId = state.openGroupId === groupLabel ? null : groupLabel;
      return {
        ...state,
        openGroupId: newOpenGroupId,
        previousOpenGroupId: state.openGroupId,
        userInteracted: true, // Mark that user has manually interacted
      };
    });
  }

  /**
   * Check if a group is expanded
   */
  isGroupExpanded(groupLabel: string): boolean {
    return this.openGroupId() === groupLabel;
  }

  /**
   * Set search query
   */
  setSearchQuery(query: string): void {
    this._state.update((state) => {
      // If starting search, save current open group
      const previousOpenGroupId = query.trim() && !state.searchQuery.trim()
        ? state.openGroupId
        : state.previousOpenGroupId;

      // If searching, expand all matching groups
      const openGroupId = query.trim()
        ? this.findFirstMatchingGroup(query)
        : previousOpenGroupId;

      return {
        ...state,
        searchQuery: query,
        openGroupId,
        previousOpenGroupId,
      };
    });
  }

  /**
   * Clear search and restore previous state
   */
  clearSearch(): void {
    this._state.update((state) => ({
      ...state,
      searchQuery: '',
      openGroupId: state.previousOpenGroupId,
    }));
  }

  /**
   * Toggle sidebar collapsed state
   */
  toggleCollapsed(): void {
    this._state.update((state) => ({
      ...state,
      collapsed: !state.collapsed,
    }));
  }

  /**
   * Set collapsed state
   */
  setCollapsed(collapsed: boolean): void {
    this._state.update((state) => ({
      ...state,
      collapsed,
    }));
  }

  /**
   * Toggle mobile sidebar
   */
  toggleMobileSidebar(): void {
    this._state.update((state) => ({
      ...state,
      mobileOpen: !state.mobileOpen,
    }));
  }

  /**
   * Close mobile sidebar
   */
  closeMobileSidebar(): void {
    this._state.update((state) => ({
      ...state,
      mobileOpen: false,
    }));
  }

  /**
   * Update active route from URL
   */
  private updateActiveRoute(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    this._state.update((state) => {
      // If route changed, reset userInteracted to allow auto-expand for new route
      const routeChanged = state.activeItemRoute !== cleanUrl;
      return {
        ...state,
        activeItemRoute: cleanUrl,
        userInteracted: routeChanged ? false : state.userInteracted,
      };
    });
  }

  /**
   * Find group containing the active route
   */
  private findGroupContainingRoute(items: NavItem[], route: string | null): string | null {
    if (!route) return null;

    for (const item of items) {
      if (item.children && item.children.length > 0) {
        // Check if any child matches the route
        const hasActiveChild = item.children.some((child) =>
          this.isRouteActive(child.route, route)
        );
        if (hasActiveChild) {
          return item.label;
        }
      }
    }

    return null;
  }

  /**
   * Find first group matching search query
   */
  private findFirstMatchingGroup(query: string): string | null {
    const filtered = this.navigationFacade.searchMenuItems(query);
    const groupWithChildren = filtered.find((item) => item.children && item.children.length > 0);
    return groupWithChildren?.label || null;
  }

  /**
   * Compute active states for menu items (including parent highlighting)
   */
  private computeActiveStates(items: NavItem[], activeRoute: string | null): NavItem[] {
    return items.map((item) => {
      const isActive = this.isRouteActive(item.route, activeRoute);
      const hasActiveChild = item.children?.some((child) =>
        this.isRouteActive(child.route, activeRoute)
      ) || false;

      return {
        ...item,
        // Add computed active state (can be used by UI)
        _isActive: isActive,
        _hasActiveChild: hasActiveChild,
        children: item.children
          ? item.children.map((child) => ({
              ...child,
              _isActive: this.isRouteActive(child.route, activeRoute),
            }))
          : undefined,
      };
    });
  }

  /**
   * Check if a route is active
   */
  private isRouteActive(itemRoute: string | undefined, activeRoute: string | null): boolean {
    if (!itemRoute || !activeRoute) return false;

    // Exact match for root and dashboard
    if (itemRoute === '/' || itemRoute === '/dashboard') {
      return activeRoute === itemRoute || activeRoute === '/' || activeRoute === '/dashboard';
    }

    // Prefix match for other routes
    return activeRoute.startsWith(itemRoute);
  }

  /**
   * Check if item or its children are active
   */
  isItemOrChildActive(item: NavItem): boolean {
    const activeRoute = this.activeItemRoute();
    const isActive = this.isRouteActive(item.route, activeRoute);
    const hasActiveChild = item.children?.some((child) =>
      this.isRouteActive(child.route, activeRoute)
    ) || false;

    return isActive || hasActiveChild;
  }
}
