# Permissions System Usage Guide

## Overview
Enterprise-grade, scalable permissions system with page-level and action-level controls.

## Architecture

### Data Flow
```
Login → Select Company → Load Permissions (HR default)
  ↓
Navigate to Module → Lazy Load Module Permissions
  ↓
Sidebar Filtered → Routes Protected → Actions Controlled
```

### Key Components
- **PermissionsFacade**: Single source of truth for all permissions
- **PermissionsApiService**: API calls to backend
- **MODULE_REGISTRY**: Config-driven module ID mapping
- **permissionGuard**: Route protection
- **HasActionDirective**: UI action control

## Module Registry

Located: `libs/shared/config/src/lib/constants/module-registry.constants.ts`

```typescript
export const MODULE_REGISTRY = {
  hr: { key: 'hr', id: 1, name: 'HR & Payroll', route: '/hr' },
  finance: { key: 'finance', id: 2, name: 'Finance', route: '/finance' },
  srm: { key: 'srm', id: 3, name: 'SRM', route: '/srm' },
  pm: { key: 'pm', id: 4, name: 'Project Management', route: '/pm' },
  warehouses: { key: 'warehouses', id: 5, name: 'Warehouses', route: '/warehouses' },
};
```

**Update module IDs here** based on your backend configuration.

## Usage Examples

### 1. Protect a Route

```typescript
// In remote module routes
export const remoteRoutes: Route[] = [
  {
    path: 'employees',
    canActivate: [permissionGuard],
    data: { 
      requiredPage: 'EmployeeList',  // Backend page identifier
      moduleKey: 'hr'                 // Optional, auto-detected from URL
    },
    loadComponent: () => import('./employees/list.component')
  }
];
```

### 2. Control UI Actions

```html
<!-- Hide button if user lacks permission -->
<erp-button *erpHasAction="'Employee.Create'">
  Create Employee
</erp-button>

<!-- Works with any element -->
<div *erpHasAction="'Report.Export'">
  <app-export-options />
</div>

<!-- Multiple actions (use computed) -->
<ng-container *ngIf="canManagePayroll()">
  <erp-button>Process Payroll</erp-button>
</ng-container>
```

```typescript
// In component
export class PayrollComponent {
  private permissions = inject(PermissionsFacade);
  
  canManagePayroll = computed(() => 
    this.permissions.hasActionInActiveModule('Payroll.Process')
  );
}
```

### 3. Add Permissions to Sidebar Items

```typescript
// In remote manifest
export const hrManifest: NavigationManifest = {
  appId: 'hr',
  appName: 'HR & Payroll',
  sidebarTitle: 'HR Management',
  accentToken: 'hr',
  menuItems: [
    {
      label: 'Employees',
      icon: 'pi-users',
      route: '/hr/employees',
      requiredPage: 'EmployeeList',  // Will be filtered if user lacks permission
    },
    {
      label: 'Payroll',
      icon: 'pi-money-bill',
      route: '/hr/payroll',
      requiredPage: 'PayrollManagement',
    },
    {
      label: 'Reports',
      icon: 'pi-chart-bar',
      children: [
        {
          label: 'Attendance',
          route: '/hr/reports/attendance',
          requiredPage: 'AttendanceReport',
        },
        {
          label: 'Salary',
          route: '/hr/reports/salary',
          requiredPage: 'SalaryReport',
        }
      ]
    }
  ]
};
```

### 4. Manual Permission Checks

```typescript
export class MyComponent {
  private permissions = inject(PermissionsFacade);
  
  ngOnInit() {
    // Check specific module permission
    const canViewFinance = this.permissions.hasPage('finance', 'FinanceDashboard');
    
    // Check action in active module
    const canExport = this.permissions.hasActionInActiveModule('Report.Export');
    
    // Get all allowed pages for a module
    const allowedPages = this.permissions.getAllowedPages('hr');
    console.log('User can access:', Array.from(allowedPages));
  }
}
```

### 5. Load Permissions Programmatically

```typescript
export class ModuleEntryComponent {
  private permissions = inject(PermissionsFacade);
  
  async ngOnInit() {
    try {
      // Ensure permissions are loaded (cached if already loaded)
      await this.permissions.ensureModulePermissions('finance');
      
      // Or force reload
      await this.permissions.loadModulePermissions('finance');
    } catch (error) {
      console.error('Failed to load permissions:', error);
    }
  }
}
```

## API Contract

### Request
```typescript
POST /api/UserRole/GetUserRoleInCompany
{
  "CompanyID": "1",
  "UserID": 123,
  "ModuleID": 1
}
```

### Response
```typescript
{
  "RoleID": 5,
  "Pages": [
    {
      "PageID": 101,
      "PageValue": "EmployeeList",
      "PageName": "Employee List",
      "IsActive": true
    }
  ],
  "Actions": [
    {
      "ActionID": 201,
      "ActionValue": "Employee.Create",
      "ActionName": "Create Employee",
      "IsActive": true
    }
  ],
  "SelectedCompany": { "ID": 1, "Name": "Acme Corp" },
  "IsThereException": false,
  "ExceptionMessage": null
}
```

## Permission Identifiers

The system uses **PageValue** and **ActionValue** as unique identifiers:

- **Page**: `"EmployeeList"`, `"PayrollManagement"`, `"FinanceDashboard"`
- **Action**: `"Employee.Create"`, `"Report.Export"`, `"Payroll.Process"`

These must match your backend permission configuration.

## Caching Strategy

- Permissions cached per module per company
- Lazy loaded on first access to each module
- Cleared on logout or company change
- No redundant API calls

## Error Handling

### Permission Load Failure
```typescript
// In select-company component
try {
  await permissionsFacade.loadModulePermissions('hr');
  navigate('/dashboard');
} catch (error) {
  toastService.error('Failed to load permissions', error.message);
  // Stay on select-company page with retry option
}
```

### Unauthorized Access
- Route guard redirects to `/access-denied`
- Actions hidden via directive
- Manual checks return `false`

## Testing

### Unit Tests
```typescript
describe('PermissionsFacade', () => {
  it('should check page permission', () => {
    facade.initializeContext(123, '1');
    // Mock API response
    expect(facade.hasPage('hr', 'EmployeeList')).toBe(true);
  });
  
  it('should filter sidebar items', () => {
    // Test filtering logic
  });
});
```

### Integration Tests
```typescript
describe('Permission Flow', () => {
  it('should load permissions after company selection', async () => {
    await selectCompany('1');
    expect(permissionsFacade.getAllowedPages('hr').size).toBeGreaterThan(0);
  });
});
```

## Troubleshooting

### Sidebar items not filtering
- Check `requiredPage` matches backend `PageValue`
- Verify module permissions are loaded
- Check browser console for errors

### Route guard not working
- Ensure guard is in `canActivate` array
- Verify `requiredPage` in route data
- Check permissions are loaded before navigation

### Actions not hiding
- Verify directive syntax: `*erpHasAction="'ActionValue'"`
- Check active module is set correctly
- Ensure permissions loaded for current module

## Performance

- O(1) permission checks using `Set<string>`
- Per-module caching reduces API calls
- Lazy loading per module
- Reactive updates via signals

## Scalability

- ✅ Supports unlimited modules
- ✅ Supports thousands of permissions
- ✅ Config-driven, no hardcoding
- ✅ Zero code duplication
- ✅ Type-safe throughout
