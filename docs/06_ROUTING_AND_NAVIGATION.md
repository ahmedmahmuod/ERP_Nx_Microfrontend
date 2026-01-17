# Routing and Navigation

**Routing Strategy and Navigation Patterns**

---

## 🎯 Routing Architecture

### Route Structure

```
/                           → Redirect to /dashboard
/dashboard                  → Shell dashboard
/design-system              → Design system showcase
/showcase                   → Component showcase

/auth/login                 → Auth remote (guest only)
/auth/register              → Auth remote (guest only)

/finance                    → Finance remote dashboard
/finance/invoices           → Finance invoices
/finance/reports            → Finance reports

/hr                         → HR remote dashboard
/hr/employees               → HR employees
/hr/payroll                 → HR payroll

/srm                        → SRM remote dashboard
/pm                         → PM remote dashboard
/warehouses                 → Warehouses remote dashboard
```

---

## 🔒 Route Guards

### Authentication Guard

**File**: `apps/shell/src/app/core/guards/auth.guard.ts`

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/auth/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
```

### Guest Guard

```typescript
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (!authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/dashboard']);
  return false;
};
```

---

## 🧭 Navigation Patterns

### Manifest-Driven Sidebar

Each remote exposes a navigation manifest that populates the sidebar:

```typescript
export const remoteManifest: NavigationManifest = {
  appId: 'finance',
  appName: 'Finance',
  sidebarTitle: 'Finance Module',
  accentToken: 'finance',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/finance',
    },
    {
      label: 'Invoices',
      icon: 'pi-file',
      route: '/finance/invoices',
    },
    {
      label: 'Reports',
      icon: 'pi-chart-bar',
      children: [
        {
          label: 'Profit & Loss',
          icon: 'pi-chart-line',
          route: '/finance/reports/pl',
        },
      ],
    },
  ],
};
```

### Active Route Highlighting

**Service**: `SidebarFacadeService`

```typescript
private isRouteActive(itemRoute: string | undefined, activeRoute: string | null): boolean {
  if (!itemRoute || !activeRoute) return false;
  
  // Exact match for root and dashboard
  if (itemRoute === '/' || itemRoute === '/dashboard') {
    return activeRoute === itemRoute;
  }
  
  // Prefix match for other routes
  return activeRoute.startsWith(itemRoute);
}
```

### Search Functionality

```typescript
searchMenuItems(query: string): NavItem[] {
  if (!query.trim()) {
    return this.menuItems();
  }
  
  const lowerQuery = query.toLowerCase();
  return this.filterMenuItems(this.menuItems(), lowerQuery);
}
```

---

## 🔙 Back to Home Button

### Route Context Detection

**Service**: `RouteContextService`

```typescript
readonly isInRemoteArea = computed(() => {
  const url = this.currentUrl()?.urlAfterRedirects || this.router.url;
  return this.detectRemoteArea(url);
});

private detectRemoteArea(url: string): boolean {
  const segments = url.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  const REMOTE_PREFIXES = ['hr', 'finance', 'srm', 'pm', 'warehouses'];
  return REMOTE_PREFIXES.includes(firstSegment);
}
```

### Button Implementation

```html
@if (routeContext.isInRemoteArea()) {
  <button
    class="back-to-home-btn"
    (click)="routeContext.navigateToHome()"
    aria-label="Back to Home"
  >
    <i class="pi pi-arrow-left"></i>
    <span>Back to Home</span>
  </button>
}
```

---

## 📚 Further Reading

- [Architecture Guide](./01_ARCHITECTURE.md)
- [Module Federation](./04_MICROFRONTEND_MODULE_FEDERATION.md)
