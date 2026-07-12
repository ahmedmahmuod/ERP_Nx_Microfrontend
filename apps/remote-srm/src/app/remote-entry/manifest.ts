/**
 * SRM Remote Navigation Manifest
 *
 * Exports navigation configuration for the Supplier Relationship Management module.
 * This manifest is consumed by the Shell's NavigationFacade.
 */

import { NavigationManifest } from '@erp/shared/models';

/**
 * SRM application navigation manifest
 */
export const remoteManifest: NavigationManifest = {
  appId: 'srm',
  appName: 'SRM',
  sidebarTitle: 'SRM',
  accentToken: 'srm',
  appIcon: 'pi-building',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/srm',
      searchKeywords: ['overview', 'summary', 'home'],
    },
    {
      label: 'Suppliers',
      icon: 'pi-users',
      route: '/srm/suppliers',
      searchKeywords: ['vendor', 'supplier', 'partner'],
      children: [
        {
          label: 'All Suppliers',
          icon: 'pi-list',
          route: '/srm/suppliers/all',
        },
        {
          label: 'Add Supplier',
          icon: 'pi-plus',
          route: '/srm/suppliers/add',
        },
        {
          label: 'Supplier Performance',
          icon: 'pi-chart-line',
          route: '/srm/suppliers/performance',
        },
      ],
    },
    {
      label: 'Procurement',
      icon: 'pi-shopping-cart',
      route: '/srm/procurement',
      searchKeywords: ['purchase', 'order', 'procurement'],
      children: [
        {
          label: 'Purchase Requests',
          icon: 'pi-file',
          route: '/srm/procurement/requests',
          badge: '2',
          badgeClass: 'badge-warning',
        },
        {
          label: 'Purchase Orders',
          icon: 'pi-file-edit',
          route: '/srm/procurement/orders',
        },
        {
          label: 'Contracts',
          icon: 'pi-book',
          route: '/srm/procurement/contracts',
        },
      ],
    },
    {
      label: 'Quotes',
      icon: 'pi-dollar',
      route: '/srm/quotes',
      searchKeywords: ['rfq', 'quote', 'quotation'],
      children: [
        {
          label: 'Request for Quote',
          icon: 'pi-send',
          route: '/srm/quotes/rfq',
        },
        {
          label: 'All Quotes',
          icon: 'pi-list',
          route: '/srm/quotes/all',
        },
        {
          label: 'Compare Quotes',
          icon: 'pi-chart-bar',
          route: '/srm/quotes/compare',
        },
      ],
    },
    {
      label: 'Invoices',
      icon: 'pi-file-pdf',
      route: '/srm/invoices',
      searchKeywords: ['invoice', 'bill', 'payment'],
    },
    {
      label: 'Reports',
      icon: 'pi-chart-bar',
      route: '/srm/reports',
      searchKeywords: ['analytics', 'report', 'insights'],
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/srm/settings',
      searchKeywords: ['configuration', 'preferences'],
    },
  ],
  searchKeywords: ['srm', 'supplier', 'procurement', 'vendor', 'purchase'],
};
