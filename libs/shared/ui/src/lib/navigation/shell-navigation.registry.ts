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
    label: 'nav.dashboard',
    icon: 'pi-home',
    route: '/dashboard',
    category: 'main',
    // No pageKey - always visible
  },
  {
    id: 'all-users',
    label: 'nav.allUsers',
    icon: 'pi-users',
    route: '/users',
    pageKey: 'Users', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'company-users',
    label: 'nav.companyUsers',
    icon: 'pi-user-edit',
    route: '/company-users',
    pageKey: 'CompanyUsers', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'companies',
    label: 'nav.companies',
    icon: 'pi-building',
    route: '/companies',
    pageKey: 'Companies', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'roles',
    label: 'nav.roles',
    icon: 'pi-shield',
    route: '/roles',
    pageKey: 'Roles', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'vendors',
    label: 'nav.vendors',
    icon: 'pi-briefcase',
    route: '/vendors',
    pageKey: 'Vendors', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'groups',
    label: 'nav.groups',
    icon: 'pi-sitemap',
    route: '/groups',
    pageKey: 'Groups', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'auto-codes',
    label: 'nav.autoCodes',
    icon: 'pi-code',
    route: '/auto-codes',
    pageKey: 'AutoCodes', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'locations',
    label: 'nav.locations',
    icon: 'pi-map-marker',
    route: '/locations',
    pageKey: 'Locations', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'company-structure',
    label: 'nav.companyStructure',
    icon: 'pi-sitemap',
    route: '/company-structure',
    pageKey: 'CompanyStructure', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'technical-support',
    label: 'nav.technicalSupport',
    icon: 'pi-wrench',
    route: '/technical-support',
    pageKey: 'TechnicalSupport', // Exact PageValue from backend
    category: 'main',
  },
  {
    id: 'versions-reports',
    label: 'nav.versionsReports',
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
