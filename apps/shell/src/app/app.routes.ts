import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { LayoutComponent } from './layout/layout.component';
import { authGuard, guestGuard } from './core/guards/auth.guard';
import { companyGuard } from './core/guards/company.guard';
import { permissionGuard } from './core/guards/permission.guard';
import { RemoteUnavailableComponent } from './pages/remote-unavailable/remote-unavailable.component';
import { AccessDeniedComponent } from '@erp/shared/ui';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';

// Fallback routes for when remotes are unavailable
const remoteFallbackRoutes: Route[] = [
  {
    path: '**',
    component: RemoteUnavailableComponent,
  },
];

export const appRoutes: Route[] = [
  // Auth routes (no layout, guest only)
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () =>
      loadRemoteModule('remoteAuth', './Routes')
        .then((m) => m.remoteRoutes)
        .catch(() => remoteFallbackRoutes),
  },
  // Protected routes (with layout, auth required)
  // Protected routes (with layout, auth required)
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // Dashboard (requires both auth AND company)
      {
        path: 'dashboard',
        canActivate: [companyGuard],
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      // Access Denied page
      {
        path: 'access-denied',
        component: AccessDeniedComponent,
      },

      // --- Shell Main Tab Routes (Placeholders) ---
      {
        path: 'companies',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Companies', pageKey: 'CompaniesList', moduleId: 10 },
      },
      {
        path: 'users',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'All Users', pageKey: 'AllUsersList', moduleId: 10 },
      },
      {
        path: 'company-users',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: {
          title: 'Company Users',
          pageKey: 'CompanyUsersList',
          moduleId: 10,
        },
      },
      {
        path: 'roles',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Roles', pageKey: 'RolesList', moduleId: 10 },
      },
      {
        path: 'vendors',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Vendors', pageKey: 'EntitiesList', moduleId: 10 },
      },
      {
        path: 'resources',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Resources', pageKey: 'ResourcesList', moduleId: 10 },
      },
      {
        path: 'groups',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Groups', pageKey: 'UserGroups ', moduleId: 10 },
      },
      {
        path: 'auto-codes',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Auto Codes', pageKey: 'AutocodeList', moduleId: 10 },
      },
      {
        path: 'locations',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: { title: 'Locations', pageKey: 'Locations', moduleId: 10 },
      },
      {
        path: 'company-structure',
        canActivate: [companyGuard],
        loadComponent: () =>
          import(
            './pages/generic-placeholder/generic-placeholder.component'
          ).then((m) => m.GenericPlaceholderPageComponent),
        data: {
          title: 'Company Structure',
          pageKey: 'CompanyStructure',
          moduleId: 10,
        },
      },
      {
        path: 'support',
        canActivate: [companyGuard],
        loadComponent: () =>
          import('./pages/technical-support/technical-support.component').then(
            (m) => m.TechnicalSupportComponent,
          ),
        data: {
          title: 'Technical Support',
          pageKey: 'TechnicalSupport', // Matches registry
          moduleId: 10,
        },
      },
      {
        path: 'versions',
        canActivate: [companyGuard],
        loadComponent: () =>
          import('./pages/versions-reports/versions-reports.component').then(
            (m) => m.VersionsReportsComponent,
          ),
        data: {
          title: 'Versions Reports',
          pageKey: 'VersionsReports', // Matches registry
          moduleId: 10,
        },
      },
      // Not Authorized page (403)
      {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
        title: 'Access Denied',
      },

      // --- Microfrontend Remote Routes ---
      {
        path: 'finance',
        canActivate: [companyGuard, permissionGuard],
        data: { moduleId: 8, permissionKey: 'FinanceModule' },
        loadChildren: () =>
          loadRemoteModule('remoteFinance', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'hr',
        canActivate: [companyGuard, permissionGuard],
        data: { moduleId: 12, permissionKey: 'PayrollModule' },
        loadChildren: () =>
          loadRemoteModule('remoteHr', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'srm',
        canActivate: [companyGuard, permissionGuard],
        data: { moduleId: 7, permissionKey: 'SRMModule' },
        loadChildren: () =>
          loadRemoteModule('remoteSrm', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'pm',
        canActivate: [companyGuard, permissionGuard],
        data: { moduleId: 5, permissionKey: 'ProjectManagmentModule' },
        loadChildren: () =>
          loadRemoteModule('remotePm', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: 'warehouses',
        canActivate: [companyGuard, permissionGuard],
        data: { moduleId: 9, permissionKey: 'WarehouseModule' },
        loadChildren: () =>
          loadRemoteModule('remoteWarehouses', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
  // Redirect to login by default
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
