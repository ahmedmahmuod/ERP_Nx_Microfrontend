import { DashboardCardConfig } from './dashboard.types';

export const DASHBOARD_REGISTRY: Record<string, DashboardCardConfig> = {
  // --- APPS (Colorful) ---
  PayrollModule: {
    id: 'hr',
    title: 'HR & Payroll',
    description: 'Manage employees, payroll, and HR operations',
    icon: 'pi-users',
    route: '/hr',
    type: 'APP',
    color: {
      name: 'amber',
      light: { text: 'rgb(245 158 11)', bg: 'rgb(254 243 199)' },
      dark: { text: 'rgb(245 158 11)', bg: 'rgb(120 53 15)' },
    },
  },
  FinanceModule: {
    id: 'finance',
    title: 'Finance',
    description: 'Track finances, invoices, and accounting',
    icon: 'pi-wallet',
    route: '/finance',
    type: 'APP',
    color: {
      name: 'emerald',
      light: { text: 'rgb(16 185 129)', bg: 'rgb(209 250 229)' },
      dark: { text: 'rgb(16 185 129)', bg: 'rgb(6 78 59)' },
    },
  },
  SRMModule: {
    id: 'srm',
    title: 'SRM',
    description: 'Supplier relationship and procurement management',
    icon: 'pi-building',
    route: '/srm',
    type: 'APP',
    color: {
      name: 'violet',
      light: { text: 'rgb(124 58 237)', bg: 'rgb(245 243 255)' },
      dark: { text: 'rgb(124 58 237)', bg: 'rgb(76 29 149)' },
    },
  },
  ProjectManagmentModule: {
    id: 'pm',
    title: 'Project Management',
    description: 'Plan, track, and deliver projects',
    icon: 'pi-sitemap',
    route: '/pm',
    type: 'APP',
    color: {
      name: 'pink',
      light: { text: 'rgb(236 72 153)', bg: 'rgb(252 231 243)' },
      dark: { text: 'rgb(236 72 153)', bg: 'rgb(157 23 77)' },
    },
  },
  WarehousesModule: {
    id: 'warehouses',
    title: 'Warehouses',
    description: 'Manage inventory, stock, and warehouse operations',
    icon: 'pi-box',
    route: '/warehouses',
    type: 'APP',
    color: {
      name: 'orange',
      light: { text: 'rgb(234 88 12)', bg: 'rgb(255 237 213)' },
      dark: { text: 'rgb(234 88 12)', bg: 'rgb(124 45 18)' },
    },
  },

  // --- OPERATIONAL ITEMS (Gray) ---
  Documents: {
    id: 'documents',
    title: 'Documents',
    description: 'Manage company documents and archives',
    icon: 'pi-file',
    route: '/documents',
    type: 'qt',
  },
  MyNeedRequests: {
    // Updated key from NeedsRequest to match legacy likely intent/permissions
    id: 'needs',
    title: 'Need Requests',
    description: 'Track and manage need requests',
    icon: 'pi-list',
    route: '/needs-requests',
    type: 'qt',
  },
  NeedsRequest: {
    // Mapping both just in case
    id: 'needs',
    title: 'Need Requests',
    description: 'Track and manage need requests',
    icon: 'pi-list',
    route: '/needs-requests',
    type: 'qt',
  },
  MyPaymentRequests: {
    id: 'payments',
    title: 'Payment Requests',
    description: 'Manage payment requests and approvals',
    icon: 'pi-dollar',
    route: '/payment-requests',
    type: 'qt',
  },
  PiblineAp: {
    id: 'pipeline',
    title: 'Processes Pipeline',
    description: 'View and manage process pipelines',
    icon: 'pi-chart-line',
    route: '/pipeline',
    type: 'qt',
  },
  EntitiesList: {
    id: 'entities',
    title: 'Entities',
    description: 'Manage business entities and vendors',
    icon: 'pi-briefcase',
    route: '/vendors',
    type: 'qt',
  },
  Contracts: {
    id: 'contracts',
    title: 'Contracts',
    description: 'Manage contracts and agreements',
    icon: 'pi-file-edit',
    route: '/contracts',
    type: 'qt',
  },
};
