# Module Federation Setup

**Micro-Frontend Implementation with Webpack Module Federation**

---

## 🎯 What is Module Federation?

Module Federation is a Webpack 5 feature that allows **JavaScript applications to dynamically load code from other applications at runtime**. It's the foundation of our micro-frontend architecture.

### Key Concepts

- **Host**: The main application (Shell) that loads remotes
- **Remote**: Independent application that exposes modules
- **Shared Dependencies**: Libraries shared between host and remotes (e.g., Angular)
- **Exposed Modules**: Specific modules a remote makes available
- **Dynamic Loading**: Remotes are loaded at runtime, not build time

---

## 🏗️ Architecture Flow

```
┌─────────────────────────────────────────────────────────┐
│  1. User navigates to /finance                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  2. Shell Router detects /finance route                 │
│     Triggers lazy loading of remoteFinance              │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  3. Module Federation loads remoteFinance               │
│     From: http://localhost:4202/remoteEntry.js          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  4. Shell requests exposed modules:                     │
│     - ./Routes (routing configuration)                  │
│     - ./Manifest (navigation manifest)                  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│  5. Remote modules loaded and rendered                  │
│     Sidebar updated with Finance navigation             │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuration

### Shell Configuration

**File**: `apps/shell/module-federation.config.ts`

```typescript
const config = {
  name: 'shell',
  remotes: [
    'remoteAuth',
    'remoteFinance',
    'remoteHr',
    'remoteSrm',
    'remotePm',
    'remoteWarehouses',
  ],
  shared: (libraryName: string, defaultConfig: any) => {
    // Angular core packages MUST be singletons
    if (libraryName.startsWith('@angular/')) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto',
      };
    }

    // RxJS should also be singleton
    if (libraryName === 'rxjs') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto',
      };
    }

    return defaultConfig;
  },
};

export default config;
```

**Key Points**:
- `name`: Unique identifier for the host
- `remotes`: Array of remote application names
- `shared`: Function to configure shared dependencies
- `singleton: true`: Ensures only one instance of Angular/RxJS

### Remote Configuration

**File**: `apps/remoteFinance/module-federation.config.ts`

```typescript
const config = {
  name: 'remoteFinance',
  exposes: {
    './Routes': './src/app/remote-entry/entry.routes.ts',
    './Manifest': './src/app/remote-entry/manifest.ts',
  },
  shared: (libraryName: string, defaultConfig: any) => {
    if (libraryName.startsWith('@angular/')) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto',
      };
    }

    if (libraryName === 'rxjs') {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: 'auto',
      };
    }

    return defaultConfig;
  },
};

export default config;
```

**Key Points**:
- `name`: Unique identifier for the remote
- `exposes`: Modules made available to the host
- `shared`: Same configuration as host for consistency

---

## 📦 Exposed Modules

### Routes Exposure

**File**: `apps/remoteFinance/src/app/remote-entry/entry.routes.ts`

```typescript
import { Route } from '@angular/router';
import { FinanceDashboardComponent } from '../pages/dashboard/dashboard.component';
import { InvoicesComponent } from '../pages/invoices/invoices.component';
import { ReportsComponent } from '../pages/reports/reports.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: FinanceDashboardComponent,
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

### Manifest Exposure

**File**: `apps/remoteFinance/src/app/remote-entry/manifest.ts`

```typescript
import { NavigationManifest } from '@erp/shared/models';

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
      route: '/finance/reports',
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
      ],
    },
  ],
  searchKeywords: ['finance', 'invoices', 'reports', 'accounting'],
};
```

---

## 🔌 Loading Remotes in Shell

### Routing Configuration

**File**: `apps/shell/src/app/app.routes.ts`

```typescript
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { RemoteUnavailableComponent } from './pages/remote-unavailable/remote-unavailable.component';

const remoteFallbackRoutes: Route[] = [
  {
    path: '**',
    component: RemoteUnavailableComponent,
  },
];

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'finance',
        loadChildren: () =>
          loadRemoteModule('remoteFinance', './Routes')
            .then((m) => m.remoteRoutes)
            .catch(() => remoteFallbackRoutes),
      },
      // ... other routes
    ],
  },
];
```

**Key Points**:
- `loadRemoteModule(remoteName, exposedModule)`: Loads the remote
- `.then((m) => m.remoteRoutes)`: Extracts the routes
- `.catch(() => remoteFallbackRoutes)`: Fallback if remote unavailable

### Manifest Loading

**File**: `apps/shell/src/app/core/services/navigation-facade.service.ts`

```typescript
private async loadRemoteManifest(appId: string): Promise<void> {
  const remoteConfig = getRemoteConfig(appId);
  
  try {
    // Load manifest from remote
    const module = await loadRemoteModule(
      remoteConfig.remoteName,
      remoteConfig.manifestKey
    );
    
    const manifest: NavigationManifest = module.remoteManifest;
    
    // Update state with loaded manifest
    this._state.update((state) => ({
      ...state,
      activeManifest: manifest,
      loading: false,
      error: null,
      activeAppId: appId,
    }));
  } catch (error) {
    // Fallback to basic manifest
    console.error('Failed to load manifest', error);
  }
}
```

---

## 🌐 Remote URLs

### Development
In development, remotes run on different ports:

```typescript
// Automatically configured by Nx
const remoteUrls = {
  remoteAuth: 'http://localhost:4201',
  remoteFinance: 'http://localhost:4202',
  remoteHr: 'http://localhost:4203',
  remoteSrm: 'http://localhost:4204',
  remotePm: 'http://localhost:4205',
  remoteWarehouses: 'http://localhost:4206',
};
```

### Production
In production, remotes are deployed to different URLs:

```typescript
// apps/shell/module-federation.manifest.json
{
  "remoteAuth": "https://auth.erp.example.com",
  "remoteFinance": "https://finance.erp.example.com",
  "remoteHr": "https://hr.erp.example.com",
  "remoteSrm": "https://srm.erp.example.com",
  "remotePm": "https://pm.erp.example.com",
  "remoteWarehouses": "https://warehouses.erp.example.com"
}
```

**Dynamic Loading**:
```typescript
// Webpack will use the manifest to resolve remote URLs at runtime
```

---

## 🔄 Shared Dependencies

### Singleton Pattern

**Why Singletons?**
- Angular requires a single instance of core packages
- Multiple instances cause errors (e.g., multiple DI containers)
- Shared state must be consistent

**Configuration**:
```typescript
shared: (libraryName, defaultConfig) => {
  if (libraryName.startsWith('@angular/')) {
    return {
      ...defaultConfig,
      singleton: true,        // Only one instance
      strictVersion: false,   // Allow version mismatches
      requiredVersion: 'auto', // Use package.json version
    };
  }
  return defaultConfig;
}
```

### Shared Libraries
- `@angular/core`
- `@angular/common`
- `@angular/router`
- `@angular/forms`
- `rxjs`
- `zone.js`

### Not Shared (Loaded per Remote)
- Remote-specific dependencies
- Feature libraries
- Domain-specific code

---

## 🚀 Development Workflow

### Start Shell Only
```bash
npx nx serve shell
```
- Shell runs on port 4200
- Remotes are **not** loaded (fallback shown)

### Start Shell + One Remote
```bash
npx nx serve shell --devRemotes=remoteFinance
```
- Shell runs on port 4200
- Finance remote runs on port 4202
- Other remotes show fallback

### Start Shell + All Remotes
```bash
npx nx serve shell --devRemotes=remoteAuth,remoteFinance,remoteHr,remoteSrm,remotePm,remoteWarehouses
```
- All apps run on their respective ports
- Full system available

### Start Remote Independently
```bash
npx nx serve remoteFinance
```
- Remote runs on port 4202
- Can be tested in isolation

---

## 🏗️ Build Process

### Development Build
```bash
npx nx build shell
npx nx build remoteFinance
```
- Outputs to `dist/apps/shell` and `dist/apps/remoteFinance`
- Includes source maps
- Not optimized

### Production Build
```bash
npx nx build shell --configuration=production
npx nx build remoteFinance --configuration=production
```
- Minified and optimized
- Tree-shaking applied
- No source maps (optional)
- Ready for deployment

### Build All
```bash
npx nx run-many --target=build --all --configuration=production
```
- Builds all apps in parallel
- Nx caching for speed

---

## 🛡️ Error Handling

### Remote Unavailable

**Scenario**: Remote is down or unreachable

**Handling**:
```typescript
loadChildren: () =>
  loadRemoteModule('remoteFinance', './Routes')
    .then((m) => m.remoteRoutes)
    .catch(() => [
      {
        path: '**',
        component: RemoteUnavailableComponent,
      },
    ]),
```

**User Experience**:
- Fallback component shown
- User informed of issue
- Option to retry or go back

### Manifest Load Failure

**Scenario**: Manifest fails to load

**Handling**:
```typescript
try {
  const module = await loadRemoteModule(remoteName, manifestKey);
  const manifest = module.remoteManifest;
  // Use manifest
} catch (error) {
  // Fallback to basic manifest
  const fallbackManifest = {
    appId,
    appName: displayName,
    sidebarTitle: `${displayName} (Unavailable)`,
    accentToken: appId,
    menuItems: [
      {
        label: 'Remote Unavailable',
        icon: 'pi-exclamation-triangle',
        route: `/${appId}`,
      },
    ],
  };
}
```

---

## 🔍 Debugging

### Check Remote Entry
```
http://localhost:4202/remoteEntry.js
```
- Should return JavaScript
- Contains Module Federation runtime

### Check Exposed Modules
```javascript
// In browser console
window.remoteFinance.get('./Routes').then(module => console.log(module));
window.remoteFinance.get('./Manifest').then(module => console.log(module));
```

### Network Tab
- Look for `remoteEntry.js` requests
- Check for 404 errors
- Verify CORS headers

### Console Logs
```typescript
// Enable logging in NavigationFacadeService
private readonly enableLogging = true;
```

---

## 🎯 Best Practices

### ✅ DO
- Always expose Routes and Manifest
- Use singleton for Angular packages
- Handle remote unavailability gracefully
- Test remotes independently
- Version remotes separately
- Cache manifests for performance

### ❌ DON'T
- Hardcode remote URLs in code
- Share non-singleton Angular packages
- Expose internal implementation details
- Create circular dependencies
- Bypass Module Federation for remote loading

---

## 📚 Further Reading

- [Architecture Guide](./01_ARCHITECTURE.md)
- [Routing and Navigation](./06_ROUTING_AND_NAVIGATION.md)
- [Deployment Guide](./08_DEPLOYMENT.md)
- [Troubleshooting](./11_TROUBLESHOOTING.md)
