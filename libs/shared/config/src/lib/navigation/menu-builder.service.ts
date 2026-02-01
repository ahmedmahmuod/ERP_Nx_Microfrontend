/**
 * Menu Builder Service
 * Builds navigation menus filtered by user permissions
 * Registry-driven: no hardcoded if/else logic
 */

import { Injectable, inject } from '@angular/core';
import { PermissionsStore } from '@erp/shared/util-state';
import { NavigationItem } from './navigation-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuBuilder {
  private readonly permissionsStore = inject(PermissionsStore);

  /**
   * Build menu from navigation items
   * Filters by permissions and optionally by category
   * Always prepends Home/Dashboard for Shell categories
   *
   * @param items - Navigation registry items
   * @param category - Optional category filter (for Shell tabs)
   * @returns Filtered menu items
   */
  buildMenu(items: NavigationItem[], category?: string): NavigationItem[] {
    let filtered = items;

    // Filter by category if specified
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Filter by permissions
    filtered = filtered.filter((item) => this.canAccess(item));

    // Prepend Home/Dashboard for Shell categories
    // This ensures each tab has a home link
    if (category) {
      const hasHome = filtered.some(
        (item) => item.route === '/dashboard' || item.route === '/',
      );
      if (!hasHome) {
        filtered.unshift({
          id: 'dashboard',
          label: 'shell.nav.dashboard',
          icon: 'pi-home',
          route: '/dashboard',
        });
      }
    }

    // Dedupe by route (in case of duplicates)
    const seen = new Set<string>();
    return filtered.filter((item) => {
      if (seen.has(item.route)) return false;
      seen.add(item.route);
      return true;
    });
  }

  /**
   * Check if user can access a navigation item
   * @param item - Navigation item to check
   * @returns true if user has permission or no permission required
   */
  private canAccess(item: NavigationItem): boolean {
    // No permission required - always visible
    if (!item.pageKey) return true;

    // Check permission using exact PageValue from backend
    return this.permissionsStore.canAccessPage(item.pageKey);
  }
}
