/**
 * Shell Menu Service
 * Builds Shell-specific menu using MenuBuilder and navigation registry
 * Filters by active tab category and user permissions
 */

import { Injectable, inject, computed } from '@angular/core';
import { MenuBuilder, SHELL_NAVIGATION } from '@erp/shared/config';
import { PermissionsStore } from '@erp/shared/util-state';
import { ShellTabsService } from './shell-tabs.service';

@Injectable({
  providedIn: 'root',
})
export class ShellMenuService {
  private readonly menuBuilder = inject(MenuBuilder);
  private readonly permissionsStore = inject(PermissionsStore);
  private readonly tabsService = inject(ShellTabsService);

  /**
   * Menu items for the active tab, filtered by permissions
   */
  readonly menuItems = computed(() => {
    const activeTab = this.tabsService.activeTab();
    const loading = this.permissionsStore.loading();

    // Don't show menu while permissions are loading
    if (loading) {
      return [];
    }

    // Build menu for active tab category
    return this.menuBuilder.buildMenu(SHELL_NAVIGATION, activeTab);
  });

  /**
   * Check if menu is loading
   */
  readonly loading = computed(() => this.permissionsStore.loading());

  /**
   * Get error message if any
   */
  readonly error = computed(() => this.permissionsStore.error());
}
