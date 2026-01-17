/**
 * Finance Remote Navigation Manifest
 *
 * Exports navigation configuration for the Finance module.
 * This manifest is consumed by the Shell's NavigationFacade.
 */

import { NavigationManifest } from '@erp/shared/models';

/**
 * Finance application navigation manifest
 */
export const remoteManifest: NavigationManifest = {
  appId: 'finance',
  appName: 'Finance',
  sidebarTitle: 'Finance',
  accentToken: 'finance',
  appIcon: 'pi-wallet',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/finance',
      searchKeywords: ['overview', 'summary', 'home'],
    },
    {
      label: 'Invoices',
      icon: 'pi-file-edit',
      route: '/finance/invoices',
      searchKeywords: ['billing', 'invoice', 'bill'],
      children: [
        {
          label: 'All Invoices (coming soon) Waiting please!',
          icon: 'pi-list',
          route: '/finance/invoices/all',
        },
        {
          label: 'Create Invoice (coming soon)',
          icon: 'pi-plus',
          route: '/finance/invoices/create',
        },
        {
          label: 'Pending',
          icon: 'pi-clock',
          route: '/finance/invoices/pending',
          badge: '5',
          badgeClass: 'badge-warning',
        },
      ],
    },
    {
      label: 'Transactions',
      icon: 'pi-money-bill',
      route: '/finance/transactions',
      searchKeywords: ['payment', 'transfer', 'transaction'],
    },
    {
      label: 'Accounts',
      icon: 'pi-building',
      route: '/finance/accounts',
      searchKeywords: ['account', 'ledger', 'balance'],
      children: [
        {
          label: 'Chart of Accounts',
          icon: 'pi-sitemap',
          route: '/finance/accounts/chart',
        },
        {
          label: 'Bank Accounts',
          icon: 'pi-credit-card',
          route: '/finance/accounts/bank',
        },
      ],
    },
    {
      label: 'Reports',
      icon: 'pi-chart-bar',
      route: '/finance/reports',
      searchKeywords: ['report', 'analytics', 'statement'],
      children: [
        {
          label: 'Profit & Loss',
          icon: 'pi-chart-line',
          route: '/finance/reports/pl',
        },
        {
          label: 'Balance Sheet',
          icon: 'pi-table',
          route: '/finance/reports/balance',
        },
        {
          label: 'Cash Flow',
          icon: 'pi-dollar',
          route: '/finance/reports/cashflow',
        },
      ],
    },
    {
      label: 'Budget',
      icon: 'pi-calculator',
      route: '/finance/budget',
      searchKeywords: ['budget', 'planning', 'forecast'],
    },
    {
      label: 'Settings',
      icon: 'pi-cog',
      route: '/finance/settings',
      searchKeywords: ['configuration', 'preferences', 'setup'],
    },
  ],
  searchKeywords: ['finance', 'accounting', 'money', 'financial'],
};
