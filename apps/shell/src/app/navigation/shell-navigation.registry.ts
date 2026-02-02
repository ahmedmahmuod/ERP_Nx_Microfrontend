export interface ShellNavigationItem {
  pageKey: string; // The exact key from the backend permissions
  label: string; // Display label (Title Case)
  icon: string; // Icon class (e.g., 'pi pi-users')
  route: string; // Route path
  category: 'main' | 'settings' | 'help';
  moduleId: number; // The module this item belongs to (10 for Shell)
}

export const SHELL_MAIN_NAVIGATION: ShellNavigationItem[] = [
  {
    pageKey: 'Dashboard', // Matches nothing in JSON, keeping as placeholder
    label: 'Dashboard',
    icon: 'pi pi-home',
    route: '/dashboard',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'CompaniesList', // Fixed
    label: 'Companies',
    icon: 'pi pi-building',
    route: '/companies',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'AllUsersList', // Fixed
    label: 'All Users',
    icon: 'pi pi-users',
    route: '/users',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'CompanyUsersList', // Fixed
    label: 'Company Users',
    icon: 'pi pi-user',
    route: '/company-users',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'RolesList', // Fixed
    label: 'Roles',
    icon: 'pi pi-lock',
    route: '/roles',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'EntitiesList', // Updated from Vendors to match user JSON
    label: 'Entities',
    icon: 'pi pi-briefcase',
    route: '/vendors',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'ResourcesList', // New item from user JSON
    label: 'Resources',
    icon: 'pi pi-server',
    route: '/resources',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'UserGroups ', // Fixed (Backend has trailing space)
    label: 'Groups',
    icon: 'pi pi-sitemap',
    route: '/groups',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'Contracts', // From legacy pageConfigs
    label: 'Contracts',
    icon: 'pi pi-file-edit', // Closest match to fa-file-contract
    route: '/contracts',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'AutocodeList', // Fixed
    label: 'Auto Codes',
    icon: 'pi pi-qrcode',
    route: '/auto-codes',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'Locations', // Fixed
    label: 'Locations',
    icon: 'pi pi-map-marker',
    route: '/locations',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'CompanyStructure', // Fixed
    label: 'Company Structure',
    icon: 'pi pi-images',
    route: '/company-structure',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'TechnicalSupport', // Not in JSON
    label: 'Technical Support',
    icon: 'pi pi-comments',
    route: '/support',
    category: 'main',
    moduleId: 10,
  },
  {
    pageKey: 'VersionsReports', // Not in JSON
    label: 'Versions Reports',
    icon: 'pi pi-list',
    route: '/versions',
    category: 'main',
    moduleId: 10,
  },
];
