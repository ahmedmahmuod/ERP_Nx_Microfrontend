# Architecture Guide

**Micro-Frontend ERP System Architecture**

---

## 🏛️ High-Level Architecture

This system follows a **Shell + Remotes** micro-frontend pattern using **Native Webpack Module Federation**.

```
┌─────────────────────────────────────────────────────────────┐
│                        Shell (Host)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Layout (Header, Sidebar, Footer)                    │  │
│  │  Authentication & Authorization                       │  │
│  │  Global Navigation & Routing                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  Remote  │  │  Remote  │  │  Remote  │  │  Remote  │  │
│  │   Auth   │  │ Finance  │  │    HR    │  │   SRM    │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
│                                                             │
│  ┌──────────┐  ┌──────────┐                                │
│  │  Remote  │  │  Remote  │                                │
│  │    PM    │  │Warehouse │                                │
│  └──────────┘  └──────────┘                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Core Principles

### 1. Domain-Driven Design
Each remote represents a **bounded context** in the business domain:
- **Auth**: User authentication and authorization
- **Finance**: Financial operations and reporting
- **HR**: Human resources and payroll
- **SRM**: Supplier relationship management
- **PM**: Project management
- **Warehouses**: Inventory and warehouse operations

### 2. Independent Deployment
- Each remote can be **deployed independently**
- Shell can be updated without touching remotes
- Remotes can be versioned separately
- No monolithic deployments required

### 3. Strict Boundaries
- **No direct remote-to-remote communication**
- All communication flows through Shell or Shared Libraries
- Enforced via Nx dependency constraints
- TypeScript strict mode for type safety

### 4. Shared Nothing (Except Libraries)
- Remotes share **only** through `libs/shared/*`
- No shared state between remotes
- Each remote manages its own state
- Shell orchestrates global state

---

## 🏗️ Shell Responsibilities

The Shell (Host) application is responsible for:

### 1. Layout & Chrome
- **Header**: Branding, user menu, theme toggle, notifications
- **Sidebar**: Manifest-driven navigation with search
- **Footer**: Copyright and links
- **Back to Home**: Navigation button (remote areas only)

### 2. Authentication & Authorization
- Login/logout flows
- Session management
- Token storage and refresh
- Route guards for protected areas

### 3. Routing & Navigation
- Top-level routing configuration
- Lazy loading of remotes
- Fallback handling for unavailable remotes
- Active route tracking

### 4. Global Services
- **NavigationFacadeService**: Manifest loading and navigation state
- **RouteContextService**: Route context detection
- **LayoutService**: Layout state (sidebar, theme)
- **AuthService**: Authentication state

### 5. Remote Orchestration
- Loading remotes via Module Federation
- Manifest discovery and caching
- Error handling and fallbacks
- Accent token application per module

---

## 📦 Remote Responsibilities

Each remote application is responsible for:

### 1. Feature Implementation
- Business logic for its domain
- UI components specific to the domain
- Data access and API integration
- Local state management

### 2. Navigation Manifest
Each remote **must** expose a navigation manifest:

```typescript
export const remoteManifest: NavigationManifest = {
  appId: 'finance',
  appName: 'Finance',
  sidebarTitle: 'Finance Module',
  accentToken: 'finance',
  menuItems: [
    { label: 'Dashboard', icon: 'pi-home', route: '/finance' },
    { label: 'Invoices', icon: 'pi-file', route: '/finance/invoices' },
    // ...
  ],
  searchKeywords: ['finance', 'invoices', 'ledger'],
};
```

### 3. Routes Exposure
Remotes expose their routes via Module Federation:

```typescript
export const remoteRoutes: Route[] = [
  { path: '', component: FinanceDashboardComponent },
  { path: 'invoices', component: InvoicesComponent },
  // ...
];
```

### 4. Self-Contained
- Own dependencies (except Angular core)
- Own styles (scoped)
- Own tests
- Own build configuration

---

## 📚 Shared Libraries

Shared libraries provide **common functionality** across the system:

### `libs/shared/models`
- TypeScript interfaces and types
- Navigation manifest types
- Domain models
- DTOs and API contracts

### `libs/shared/theme`
- Design tokens (colors, spacing, typography)
- Global styles
- Dark/light theme support
- Accent token system

### `libs/shared/ui`
- Reusable UI components
- Form controls
- Layout utilities
- Responsive service

### `libs/shared/config`
- Environment configuration
- Feature flags
- API endpoints
- Constants

### Domain Libraries (e.g., `libs/auth/*`)
- **data-access**: API services, state management
- **feature-***: Feature-specific components
- **ui**: Domain-specific UI components
- **util**: Helper functions and utilities

---

## 🔒 Dependency Rules

Enforced via Nx tags in `nx.json`:

### Type Constraints
```
type:feature → can depend on → type:data-access, type:ui, type:util, type:model
type:data-access → can depend on → type:util, type:model
type:ui → can depend on → type:util, type:model
type:util → can depend on → type:model
```

### Scope Constraints
```
scope:auth → can depend on → scope:auth, scope:shared
scope:finance → can depend on → scope:finance, scope:shared
scope:hr → can depend on → scope:hr, scope:shared
scope:supply → can depend on → scope:supply, scope:shared
```

**Key Rule**: Remotes **CANNOT** depend on other remotes. Only Shell can load remotes.

---

## 🎨 Manifest-Driven Navigation

The system uses a **manifest-driven approach** for navigation:

### How It Works

1. **Shell loads a remote** (e.g., user navigates to `/finance`)
2. **NavigationFacadeService detects** the route change
3. **Manifest is loaded** from the remote via Module Federation
4. **Sidebar updates** with the remote's menu items
5. **Accent token applied** for theming
6. **Active route highlighted** in the sidebar

### Benefits
- **Dynamic**: Navigation adapts to loaded remote
- **Decoupled**: Shell doesn't hardcode remote menus
- **Flexible**: Remotes control their own navigation
- **Cacheable**: Manifests are cached for performance

---

## 🔄 Communication Patterns

### Shell → Remote
- **Route activation**: Shell loads remote via routing
- **Manifest loading**: Shell requests navigation manifest
- **Accent token**: Shell applies theme based on manifest

### Remote → Shell
- **Navigation events**: Remote can trigger navigation via Router
- **Manifest exposure**: Remote exposes its manifest
- **Route exposure**: Remote exposes its routes

### Remote ↔ Shared Libraries
- **Models**: Import types from `@erp/shared/models`
- **UI Components**: Use components from `@erp/shared/ui`
- **Theme**: Apply design tokens from `@erp/shared/theme`
- **Services**: Use utilities from `@erp/shared/util`

### ❌ Remote → Remote (FORBIDDEN)
- Remotes **MUST NOT** import from other remotes
- Use Shell or Shared Libraries for communication
- Enforced via Nx dependency constraints

---

## 🚀 Module Federation Configuration

### Shell Configuration
```typescript
// apps/shell/module-federation.config.ts
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
  shared: (libraryName, defaultConfig) => {
    if (libraryName.startsWith('@angular/')) {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }
    return defaultConfig;
  },
};
```

### Remote Configuration
```typescript
// apps/remoteFinance/module-federation.config.ts
const config = {
  name: 'remoteFinance',
  exposes: {
    './Routes': './src/app/remote-entry/entry.routes.ts',
    './Manifest': './src/app/remote-entry/manifest.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName.startsWith('@angular/')) {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }
    return defaultConfig;
  },
};
```

---

## 📊 Architectural Decision Records (ADRs)

### ADR-001: Native Module Federation over single-spa
**Decision**: Use native Webpack Module Federation  
**Rationale**: 
- Native to Webpack, no additional framework
- Better TypeScript support
- Simpler configuration
- Better performance

### ADR-002: Manifest-Driven Navigation
**Decision**: Each remote exposes a navigation manifest  
**Rationale**:
- Decouples Shell from remote navigation structure
- Allows remotes to control their own menus
- Enables dynamic sidebar updates
- Supports search and filtering

### ADR-003: Strict Dependency Boundaries
**Decision**: Enforce boundaries via Nx tags  
**Rationale**:
- Prevents tight coupling
- Ensures independent deployment
- Maintains clean architecture
- Catches violations at build time

### ADR-004: Shared Libraries for Common Code
**Decision**: Use `libs/shared/*` for shared functionality  
**Rationale**:
- DRY principle
- Consistent UI/UX
- Centralized design system
- Type safety across apps

### ADR-005: Signal-Based State Management
**Decision**: Use Angular signals for reactive state  
**Rationale**:
- Modern Angular approach
- Better performance than Observables for simple state
- Easier to reason about
- Built-in to Angular 16+

---

## 🎯 Design Goals Achieved

✅ **Independent Deployment**: Each remote can deploy separately  
✅ **Team Autonomy**: Teams can work independently  
✅ **Scalability**: Easy to add new remotes  
✅ **Maintainability**: Clear boundaries and responsibilities  
✅ **Performance**: Lazy loading and code splitting  
✅ **Type Safety**: TypeScript strict mode throughout  
✅ **Testability**: Each app/lib is independently testable  
✅ **Developer Experience**: Fast feedback with HMR  

---

## 📖 Further Reading

- [Module Federation Documentation](./04_MICROFRONTEND_MODULE_FEDERATION.md)
- [Workspace Structure](./03_WORKSPACE_STRUCTURE.md)
- [Developer Guide](./10_DEVELOPER_GUIDE.md)
