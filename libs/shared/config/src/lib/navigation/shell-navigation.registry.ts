/**
 * Shell Navigation Registry
 * Defines all navigation items for the Shell application
 * pageKey values MUST match exact PageValue from backend API
 *
 * IMPORTANT: Do NOT invent claim keys!
 * Use the exact PageValue strings returned by the backend.
 * Example backend response: { PageValue: "Users", PageName: "All Users" }
 * Registry must use: pageKey: "Users"
 */

import { NavigationItem } from './navigation-item.model';

export const SHELL_NAVIGATION: NavigationItem[] = [
  // ==================== MAIN TAB ====================
  {
    id: 'dashboard',
    label: 'shell.nav.dashboard',
    icon: 'pi-home',
    route: '/dashboard',
    category: 'main',
    // No pageKey - always visible
  },
  {
    id: 'all-users',
    label: 'shell.nav.allUsers',
    icon: 'pi-users',
    route: '/users',
    pageKey: 'Users', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'company-users',
    label: 'shell.nav.companyUsers',
    icon: 'pi-user-edit',
    route: '/company-users',
    pageKey: 'CompanyUsers', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'companies',
    label: 'shell.nav.companies',
    icon: 'pi-building',
    route: '/companies',
    pageKey: 'Companies', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'roles',
    label: 'shell.nav.roles',
    icon: 'pi-shield',
    route: '/roles',
    pageKey: 'Roles', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'vendors',
    label: 'shell.nav.vendors',
    icon: 'pi-briefcase',
    route: '/vendors',
    pageKey: 'Vendors', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'groups',
    label: 'shell.nav.groups',
    icon: 'pi-sitemap',
    route: '/groups',
    pageKey: 'Groups', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'auto-codes',
    label: 'shell.nav.autoCodes',
    icon: 'pi-code',
    route: '/auto-codes',
    pageKey: 'AutoCodes', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'locations',
    label: 'shell.nav.locations',
    icon: 'pi-map-marker',
    route: '/locations',
    pageKey: 'Locations', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'company-structure',
    label: 'shell.nav.companyStructure',
    icon: 'pi-sitemap',
    route: '/company-structure',
    pageKey: 'CompanyStructure', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'technical-support',
    label: 'shell.nav.technicalSupport',
    icon: 'pi-wrench',
    route: '/technical-support',
    pageKey: 'TechnicalSupport', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'versions-reports',
    label: 'shell.nav.versionsReports',
    icon: 'pi-file-export',
    route: '/versions-reports',
    pageKey: 'VersionsReports', // Exact PageValue from backend
    category: 'main',
  },

  // ==================== PAYMENT TAB ====================
  // TODO: Add payment-related navigation items
  // Example:
  // {
  //   id: 'payment-methods',
  //   label: 'shell.nav.paymentMethods',
  //   icon: 'pi-credit-card',
  //   route: '/payment-methods',
  //   pageKey: 'PaymentMethods', // Exact PageValue from backend
  //   category: 'payment',
  // },

  // ==================== NEEDS TAB ====================
  // TODO: Add needs-related navigation items
  // Example:
  // {
  //   id: 'purchase-requests',
  //   label: 'shell.nav.purchaseRequests',
  //   icon: 'pi-shopping-cart',
  //   route: '/purchase-requests',
  //   pageKey: 'PurchaseRequests', // Exact PageValue from backend
  //   category: 'needs',
  // },

  // ==================== DOCS TAB ====================
  // TODO: Add document-related navigation items
  // Example:
  // {
  //   id: 'documents',
  //   label: 'shell.nav.documents',
  //   icon: 'pi-file',
  //   route: '/documents',
  //   pageKey: 'Documents', // Exact PageValue from backend
  //   category: 'docs',
  // },
];
