/**
 * Warehouses Remote Navigation Manifest
 *
 * Exports navigation configuration for the Warehouses module.
 * This manifest is consumed by the Shell's NavigationFacade.
 */

import { NavigationManifest } from '@erp/shared/models';

/**
 * Warehouses application navigation manifest
 */
export const remoteManifest: NavigationManifest = {
  appId: 'warehouses',
  appName: 'Warehouses',
  sidebarTitle: 'Warehouses',
  accentToken: 'warehouses',
  appIcon: 'pi-box',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/warehouses',
      searchKeywords: ['overview', 'summary', 'home'],
    },
    {
      label: 'Inventory',
      icon: 'pi-box',
      route: '/warehouses/inventory',
      searchKeywords: ['stock', 'items', 'products'],
      children: [
        {
          label: 'All Items',
          icon: 'pi-list',
          route: '/warehouses/inventory/all',
        },
        {
          label: 'Add Item',
          icon: 'pi-plus',
          route: '/warehouses/inventory/add',
        },
        {
          label: 'Stock Levels',
          icon: 'pi-chart-bar',
          route: '/warehouses/inventory/levels',
          badge: '3',
          badgeClass: 'badge-warning',
        },
      ],
    },
    {
      label: 'Warehouses',
      icon: 'pi-building',
      route: '/warehouses/locations',
      searchKeywords: ['location', 'facility', 'site'],
      children: [
        {
          label: 'All Warehouses',
          icon: 'pi-list',
          route: '/warehouses/locations/all',
        },
        {
          label: 'Add Warehouse',
          icon: 'pi-plus',
          route: '/warehouses/locations/add',
        },
        {
          label: 'Zones',
          icon: 'pi-th-large',
          route: '/warehouses/locations/zones',
        },
      ],
    },
    {
      label: 'Transfers',
      icon: 'pi-arrow-right-arrow-left',
      route: '/warehouses/transfers',
      searchKeywords: ['transfer', 'move', 'relocate'],
      children: [
        {
          label: 'New Transfer',
          icon: 'pi-plus',
          route: '/warehouses/transfers/new',
        },
        {
          label: 'Pending Transfers',
          icon: 'pi-clock',
          route: '/warehouses/transfers/pending',
        },
        {
          label: 'Transfer History',
          icon: 'pi-history',
          route: '/warehouses/transfers/history',
        },
      ],
    },
    {
      label: 'Receiving',
      icon: 'pi-download',
      route: '/warehouses/receiving',
      searchKeywords: ['receive', 'incoming', 'goods'],
    },
    {
      label: 'Shipping',
      icon: 'pi-upload',
      route: '/warehouses/shipping',
      searchKeywords: ['ship', 'dispatch', 'outgoing'],
    },
    {
      label: 'Reports',
      icon: 'pi-chart-line',
      route: '/warehouses/reports',
      searchKeywords: ['analytics', 'report', 'insights'],
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/warehouses/settings',
      searchKeywords: ['configuration', 'preferences'],
    },
  ],
  searchKeywords: ['warehouse', 'inventory', 'stock', 'storage'],
};
