import { Injectable, inject, computed } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PermissionsStore } from '@erp/shared/util-state';
import { SHELL_MAIN_NAVIGATION } from './shell-navigation.registry';

@Injectable({
  providedIn: 'root',
})
export class MenuBuilder {
  private permissionsStore = inject(PermissionsStore);

  // Reactive signal for the sidebar menu
  readonly mainMenu = computed<MenuItem[]>(() => {
    // 1. Filter items based on permissions
    const allowedItems = SHELL_MAIN_NAVIGATION.filter((item) =>
      this.permissionsStore.canAccessPage(item.pageKey),
    );

    // 2. Map to PrimeNG MenuItems
    const menuItems: MenuItem[] = allowedItems.map((item) => ({
      label: item.label,
      icon: item.icon,
      routerLink: [item.route],
      routerLinkActiveOptions: { exact: true },
    }));

    // 3. Optional: Add Dashboard/Home at the top if needed (usually always allowed)
    // if (menuItems.length > 0) {
    //   menuItems.unshift({ label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/'] });
    // }

    return menuItems;
  });
}
