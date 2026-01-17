import { NavigationManifest } from '@erp/shared/models';

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
    },
    {
      label: 'Reports',
      icon: 'pi-chart-bar',
      route: '/srm/reports',
      searchKeywords: ['analytics', 'report', 'insights'],
    },
  ],
};
