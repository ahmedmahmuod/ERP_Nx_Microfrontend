/**
 * Shell Navigation Registry
 * Defines all navigation items for the Shell application
 * pageKey values MUST match exact PageValue (or Type) from backend API
 *
 * IMPORTANT: Keys must match the 'type' or 'value' from the Permission API response.
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
  // --- Core Modules (Hidden from Sidebar) ---
  {
    id: 'payroll',
    label: 'nav.payroll',
    icon: 'pi-wallet',
    route: '/payroll',
    pageKey: 'PayrollModule',
    category: 'main',
    hidden: true,
  },
  {
    id: 'finance',
    label: 'nav.finance',
    icon: 'pi-dollar',
    route: '/finance',
    pageKey: 'FinanceModule',
    category: 'main',
    hidden: true,
  },
  {
    id: 'warehouse',
    label: 'nav.warehouse',
    icon: 'pi-box',
    route: '/warehouse',
    pageKey: 'WarehouseModule',
    category: 'main',
    hidden: true,
  },
  {
    id: 'srm',
    label: 'nav.srm',
    icon: 'pi-briefcase',
    route: '/srm',
    pageKey: 'SRMModule',
    category: 'main',
    hidden: true,
  },
  {
    id: 'projects',
    label: 'nav.projects',
    icon: 'pi-check-square',
    route: '/projects',
    pageKey: 'ProjectManagmentModule',
    category: 'main',
    hidden: true,
  },
  // --- Operational / Other Modules (Hidden or Visible as needed) ---
  {
    id: 'crm',
    label: 'nav.crm',
    icon: 'pi-users',
    route: '/crm',
    pageKey: 'CRMModuale', // Note typo in backend
    category: 'main',
    hidden: true, // User said ignore CRM
  },
  {
    id: 'pipeline',
    label: 'nav.pipeline',
    icon: 'pi-chart-line',
    route: '/pipeline',
    pageKey: 'PiblineApp', // Typo in snippet
    category: 'main',
    hidden: true,
  },

  // --- Admin / Lists ---
  {
    id: 'all-users',
    label: 'nav.allUsers',
    icon: 'pi-users',
    route: '/users',
    pageKey: 'AllUsersList',
    category: 'main',
  },
  {
    id: 'company-users',
    label: 'nav.companyUsers',
    icon: 'pi-user-edit',
    route: '/company-users',
    pageKey: 'CompanyUsersList',
    category: 'main',
  },
  {
    id: 'companies',
    label: 'nav.companies',
    icon: 'pi-building',
    route: '/companies',
    pageKey: 'CompaniesList',
    category: 'main',
  },
  {
    id: 'roles',
    label: 'nav.roles',
    icon: 'pi-shield',
    route: '/roles',
    pageKey: 'RolesList',
    category: 'main',
  },
  {
    id: 'vendors',
    label: 'nav.vendors',
    icon: 'pi-briefcase',
    route: '/vendors',
    pageKey: 'Vendors',
    category: 'main',
  },
  {
    id: 'groups',
    label: 'nav.groups',
    icon: 'pi-sitemap',
    route: '/groups',
    pageKey: 'UserGroups ', // Note space in backend key 'UserGroups '
    category: 'main',
  },
  {
    id: 'entities',
    label: 'nav.entities',
    icon: 'pi-th-large',
    route: '/entities',
    pageKey: 'EntitiesList',
    category: 'main',
    hidden: true,
  },
  {
    id: 'resources',
    label: 'nav.resources',
    icon: 'pi-server',
    route: '/resources',
    pageKey: 'Resources', // Changed from ResourcesList to match snippet
    category: 'main',
  },
  {
    id: 'units',
    label: 'nav.units',
    icon: 'pi-list',
    route: '/units',
    pageKey: 'UnitsList',
    category: 'main',
    hidden: true,
  },
  {
    id: 'auto-codes',
    label: 'nav.autoCodes',
    icon: 'pi-code',
    route: '/auto-codes',
    pageKey: 'AutocodeList',
    category: 'main',
  },
  // --- Structure & Geo ---
  {
    id: 'company-structure',
    label: 'nav.companyStructure',
    icon: 'pi-sitemap',
    route: '/company-structure',
    pageKey: 'CompanyStructure',
    category: 'main',
    children: [
      {
        id: 'branches',
        label: 'nav.branches',
        icon: 'pi-map',
        route: '/company-structure/branches',
        pageKey: 'Branches',
      },
      {
        id: 'positions',
        label: 'nav.positions',
        icon: 'pi-id-card',
        route: '/company-structure/positions',
        pageKey: 'Positions',
      },
    ],
  },
  {
    id: 'locations',
    label: 'nav.locations',
    icon: 'pi-map-marker',
    route: '/locations',
    pageKey: 'Locations',
    category: 'main',
  },
  {
    id: 'cities',
    label: 'nav.cities',
    icon: 'pi-map',
    route: '/cities',
    pageKey: 'Cities',
    category: 'main',
    hidden: true,
  },
  {
    id: 'countries',
    label: 'nav.countries',
    icon: 'pi-globe',
    route: '/countries',
    pageKey: 'Countries',
    category: 'main',
    hidden: true,
  },
  {
    id: 'governments',
    label: 'nav.governments',
    icon: 'pi-map',
    route: '/governments',
    pageKey: 'Governments',
    category: 'main',
    hidden: true,
  },
  {
    id: 'districts',
    label: 'nav.districts',
    icon: 'pi-map',
    route: '/districts',
    pageKey: 'Districts',
    category: 'main',
    hidden: true,
  },

  // ==================== PAYMENT TAB ====================
  {
    id: 'payment-requests',
    label: 'nav.paymentRequests',
    icon: 'pi-money-bill',
    route: '/payment-requests',
    pageKey: 'PaymentRequest',
    category: 'payment',
    children: [
      {
        id: 'my-payment-requests',
        label: 'nav.myPaymentRequests',
        icon: 'pi-list',
        route: '/payment-requests/my',
        pageKey: 'MyPaymentRequests',
      },
      {
        id: 'payment-approvals',
        label: 'nav.paymentApprovals',
        icon: 'pi-check-circle',
        route: '/payment-requests/approvals',
        pageKey: 'PaymentRequestsApproval',
      },
      {
        id: 'payment-paying',
        label: 'nav.paymentPaying',
        icon: 'pi-dollar',
        route: '/payment-requests/paying',
        pageKey: 'PaymentRequestsPaying',
      },
      {
        id: 'payment-categories',
        label: 'nav.paymentCategories',
        icon: 'pi-tags',
        route: '/payment-requests/categories',
        pageKey: 'PaymentCatigories', // Note typo
      },
      {
        id: 'payment-limits',
        label: 'nav.paymentLimits',
        icon: 'pi-exclamation-circle',
        route: '/payment-requests/limits',
        pageKey: 'Limits',
      },
    ],
  },

  // ==================== NEEDS TAB ====================
  {
    id: 'needs-requests',
    label: 'nav.needsRequests',
    icon: 'pi-shopping-cart',
    route: '/needs-requests',
    pageKey: 'NeedsRequest',
    category: 'needs',
    children: [
      {
        id: 'my-need-requests',
        label: 'nav.myNeedRequests',
        icon: 'pi-list',
        route: '/needs-requests/my',
        pageKey: 'MyNeedRequests',
      },
      {
        id: 'add-need-items',
        label: 'nav.addNeedItems',
        icon: 'pi-plus',
        route: '/needs-requests/items',
        pageKey: 'AddNeedRequestItems',
      },
      {
        id: 'needs-categories',
        label: 'nav.needsCategories',
        icon: 'pi-tags',
        route: '/needs-requests/categories',
        pageKey: 'NeedsRequestsCategory',
      },
      {
        id: 'needs-configurations',
        label: 'nav.needsConfigurations',
        icon: 'pi-cog',
        route: '/needs-requests/configurations',
        pageKey: 'NeedsCatigories', // Confusing backend naming, using mapped key
      },
    ],
  },

  // ==================== DOCS TAB ====================
  {
    id: 'documents-module',
    label: 'nav.documents',
    icon: 'pi-file',
    route: '/documents',
    pageKey: 'DocumnetsModule', // Typo in snippet
    category: 'docs',
    children: [
      {
        id: 'my-documents',
        label: 'nav.myDocuments',
        icon: 'pi-folder',
        route: '/documents/my',
        pageKey: 'Documents', // Assuming this is valid based on previous context, user didn't show children
      },
      {
        id: 'document-categories',
        label: 'nav.documentCategories',
        icon: 'pi-tags',
        route: '/documents/categories',
        pageKey: 'DocumentsCategory',
      },
      {
        id: 'document-permissions',
        label: 'nav.documentPermissions',
        icon: 'pi-lock',
        route: '/documents/permissions',
        pageKey: 'DocumentsPermission',
      },
    ],
  },
  // ==================== SUPPORT & VERSIONS ====================
  {
    id: 'technical-support',
    label: 'nav.technicalSupport',
    icon: 'pi-question-circle',
    route: '/support',
    // pageKey: 'TechnicalSupport', // Enable when backend has permission
    category: 'main',
  },
  {
    id: 'versions-reports',
    label: 'nav.versionsReports',
    icon: 'pi-list',
    route: '/versions',
    // pageKey: 'VersionsReports', // Enable when backend has permission
    category: 'main',
  },
];
