# ERP System - Architecture Overview

## 📐 System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         SHELL (Host)                         │
│                      http://localhost:4200                   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Layout Component                     │ │
│  │  ┌──────────┐  ┌──────────────────────┐  ┌──────────┐ │ │
│  │  │  Header  │  │                      │  │  Footer  │ │ │
│  │  └──────────┘  │                      │  └──────────┘ │ │
│  │  ┌──────────┐  │   Router Outlet      │               │ │
│  │  │          │  │   (Content Area)     │               │ │
│  │  │ Sidebar  │  │                      │               │ │
│  │  │          │  │                      │               │ │
│  │  └──────────┘  └──────────────────────┘               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  Routes:                                                     │
│  ├─ /dashboard → Dashboard Component                        │
│  ├─ /design-system → Design System Preview                  │
│  ├─ /auth/* → Remote Auth (Module Federation)               │
│  ├─ /finance/* → Remote Finance (Module Federation)         │
│  ├─ /hr/* → Remote HR (Module Federation)                   │
│  └─ /supply/* → Remote Supply (Module Federation)           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Module Federation
                              │ (Lazy Loading)
                              ▼
        ┌─────────────────────────────────────────────┐
        │                                             │
        ▼                                             ▼
┌───────────────┐                            ┌───────────────┐
│  Remote Auth  │                            │ Remote Finance│
│  :4201        │                            │  :4202        │
│               │                            │               │
│ ├─ /login     │                            │ ├─ /invoices │
│ └─ /register  │                            │ └─ /reports  │
└───────────────┘                            └───────────────┘
        │                                             │
        │                                             │
        ▼                                             ▼
┌───────────────┐                            ┌───────────────┐
│  Remote HR    │                            │ Remote Supply │
│  :4203        │                            │  :4204        │
│               │                            │               │
│ ├─ /employees │                            │ ├─ /inventory│
│ └─ /payroll   │                            │ └─ /orders   │
└───────────────┘                            └───────────────┘
```

---

## 🏗️ Layer Architecture

### 1. Presentation Layer (UI Components)

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (UI)             │
├─────────────────────────────────────────────┤
│                                             │
│  Smart Components (Containers)              │
│  ├─ LayoutComponent                         │
│  ├─ LoginComponent                          │
│  ├─ RegisterComponent                       │
│  └─ DashboardComponent                      │
│                                             │
│  Dumb Components (Presentational)           │
│  ├─ HeaderComponent                         │
│  ├─ SidebarComponent                        │
│  ├─ FooterComponent                         │
│  └─ Design System Components                │
│     ├─ ButtonComponent                      │
│     ├─ InputComponent                       │
│     ├─ CardComponent                        │
│     ├─ ModalComponent                       │
│     └─ TableComponent                       │
│                                             │
└─────────────────────────────────────────────┘
```

### 2. Service Layer (Business Logic)

```
┌─────────────────────────────────────────────┐
│          Service Layer (Facades)            │
├─────────────────────────────────────────────┤
│                                             │
│  State Management Services                  │
│  ├─ LayoutService (Shell)                   │
│  │   ├─ Sidebar state                       │
│  │   ├─ Navigation items                    │
│  │   ├─ User profile                        │
│  │   └─ Theme integration                   │
│  │                                           │
│  ├─ AuthFacadeService (Auth Remote)         │
│  │   ├─ Login/Register                      │
│  │   ├─ Auth state                          │
│  │   ├─ Token management                    │
│  │   └─ Error handling                      │
│  │                                           │
│  └─ Design System Services                  │
│      ├─ ThemeService                        │
│      ├─ ResponsiveService                   │
│      └─ AccessibilityService                │
│                                             │
└─────────────────────────────────────────────┘
```

### 3. Shared Layer (Libraries)

```
┌─────────────────────────────────────────────┐
│         Shared Layer (Libraries)            │
├─────────────────────────────────────────────┤
│                                             │
│  @erp/shared/ui                             │
│  ├─ Components (Button, Input, Card, etc.)  │
│  ├─ Services (Theme, Responsive, A11y)      │
│  ├─ Types (ComponentSize, Variant, etc.)    │
│  └─ Abstracts (BaseComponent, etc.)         │
│                                             │
│  @erp/shared/utils                          │
│  └─ Utility functions                       │
│                                             │
│  @erp/auth/data-access                      │
│  └─ Auth models and interfaces              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Architecture

### Signal-Based State Management

```
┌─────────────────────────────────────────────────────────────┐
│                     Component Tree                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ inject()
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│                                                              │
│  LayoutService                    AuthFacadeService          │
│  ├─ _sidebarCollapsed (signal)    ├─ _state (signal)        │
│  ├─ _currentUser (signal)         ├─ currentUser (computed) │
│  ├─ visibleNavItems (computed)    ├─ isAuthenticated (...)  │
│  └─ toggleSidebar()                └─ login()                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Reactive Updates
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     UI Components                            │
│                                                              │
│  Template bindings automatically update when signals change  │
│  No manual subscription management needed                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Component Communication Pattern

```
Parent (Smart)
    │
    ├─ State: inject(Service)
    ├─ Data: service.state()
    │
    ▼
Child (Dumb)
    │
    ├─ Inputs: @Input() data
    ├─ Outputs: @Output() event
    │
    └─ Emits events to parent
```

---

## 🚀 Module Federation Architecture

### Build-Time Configuration

```typescript
// module-federation.config.ts

// Shell exposes:
- Nothing (Host only)

// Remote Auth exposes:
- './Routes' → entry.routes.ts

// Remote Finance exposes:
- './Routes' → entry.routes.ts

// Remote HR exposes:
- './Routes' → entry.routes.ts

// Remote Supply exposes:
- './Routes' → entry.routes.ts
```

### Runtime Loading

```
Shell (Host)
    │
    ├─ Loads remotes dynamically
    │
    ▼
┌─────────────────────────────────────┐
│  import('remoteAuth/Routes')        │
│      .then(m => m.remoteRoutes)     │
└─────────────────────────────────────┘
    │
    ├─ Lazy loads on route activation
    ├─ Independent versioning
    ├─ Isolated failures
    └─ Code splitting
```

---

## 🎨 Design System Architecture

### Component Hierarchy

```
BaseComponent (Abstract)
    │
    ├─ Common functionality
    ├─ Lifecycle management
    ├─ Signal-based state
    │
    ▼
InteractiveBaseComponent (Abstract)
    │
    ├─ Extends BaseComponent
    ├─ Interactive features
    ├─ Disabled state
    ├─ Loading state
    │
    ▼
Concrete Components
    │
    ├─ ButtonComponent
    ├─ InputComponent
    ├─ CardComponent
    ├─ ModalComponent
    └─ TableComponent
```

### Styling Architecture

```
┌─────────────────────────────────────────────┐
│         Global Styles (styles.scss)         │
│  ├─ CSS Variables (Design Tokens)           │
│  ├─ Tailwind Base/Components/Utilities      │
│  └─ Global Resets                           │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│      Component Styles (Scoped)              │
│  ├─ Component-specific styles               │
│  ├─ Use CSS variables                       │
│  ├─ Tailwind utility classes                │
│  └─ Dark mode support (:host-context)       │
└─────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

### Login Flow

```
1. User navigates to /auth/login
        ↓
2. LoginComponent renders
        ↓
3. User enters credentials
        ↓
4. Form validation (reactive forms)
        ↓
5. Submit → authFacade.login()
        ↓
6. AuthFacadeService
   ├─ Set loading state
   ├─ Mock API call (1s delay)
   ├─ Validate credentials
   ├─ Store token (localStorage/sessionStorage)
   ├─ Update auth state (signal)
   └─ Return success/error
        ↓
7. On success → router.navigate(['/dashboard'])
        ↓
8. LayoutService.setCurrentUser()
        ↓
9. Header shows user profile
```

### Register Flow

```
1. User navigates to /auth/register
        ↓
2. RegisterComponent renders
        ↓
3. User fills form
        ↓
4. Form validation
   ├─ Name (min 2 chars)
   ├─ Email (valid format)
   ├─ Password (min 8 chars)
   ├─ Confirm password (match)
   └─ Accept terms (required)
        ↓
5. Submit → authFacade.register()
        ↓
6. AuthFacadeService
   ├─ Set loading state
   ├─ Validate passwords match
   ├─ Mock API call (1s delay)
   ├─ Create user
   ├─ Store token
   ├─ Update auth state
   └─ Return success/error
        ↓
7. On success → router.navigate(['/dashboard'])
```

---

## 🛣️ Routing Architecture

### Shell Routes

```typescript
{
  path: '',
  component: LayoutComponent,  // Wrapper
  children: [
    { path: '', redirectTo: 'dashboard' },
    { path: 'dashboard', loadComponent: DashboardComponent },
    { path: 'auth', loadChildren: () => remoteAuth },
    { path: 'finance', loadChildren: () => remoteFinance },
    { path: 'hr', loadChildren: () => remoteHr },
    { path: 'supply', loadChildren: () => remoteSupply },
    { path: '**', redirectTo: 'dashboard' }
  ]
}
```

### Remote Routes (Auth Example)

```typescript
// entry.routes.ts
[
  { path: '', redirectTo: 'login' },
  { path: 'login', loadComponent: LoginComponent },
  { path: 'register', loadComponent: RegisterComponent }
]
```

### URL Structure

```
https://erp.example.com/
    ├─ /dashboard                 (Shell)
    ├─ /design-system             (Shell)
    ├─ /auth/login                (Remote Auth)
    ├─ /auth/register             (Remote Auth)
    ├─ /finance/invoices          (Remote Finance)
    ├─ /finance/reports           (Remote Finance)
    ├─ /hr/employees              (Remote HR)
    ├─ /hr/payroll                (Remote HR)
    ├─ /supply/inventory          (Remote Supply)
    └─ /supply/orders             (Remote Supply)
```

---

## 🚦 CI/CD Pipeline Architecture

### Pipeline Flow

```
┌─────────────────────────────────────────────┐
│           Git Push/PR Trigger               │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│         Determine Affected Apps             │
│         (Nx Affected Commands)              │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│              Parallel Jobs                  │
│  ┌─────────┬─────────┬─────────┬─────────┐ │
│  │  Shell  │  Auth   │ Finance │   HR    │ │
│  └─────────┴─────────┴─────────┴─────────┘ │
│                                             │
│  Each job:                                  │
│  1. Lint                                    │
│  2. Test (with coverage)                    │
│  3. Build (production)                      │
│  4. Upload artifacts                        │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│          Environment Deployment             │
│                                             │
│  develop branch → Staging                   │
│  main branch → Production                   │
│                                             │
│  ├─ Download artifacts                      │
│  ├─ Deploy to environment                   │
│  ├─ Create deployment tag                   │
│  └─ Update environment URL                  │
└─────────────────────────────────────────────┘
```

### Deployment Strategy

```
┌─────────────────────────────────────────────┐
│         Independent Deployment              │
│                                             │
│  Shell        → shell.erp.example.com       │
│  Remote Auth  → auth.erp.example.com        │
│  Remote Finance → finance.erp.example.com   │
│  Remote HR    → hr.erp.example.com          │
│  Remote Supply → supply.erp.example.com     │
│                                             │
│  Each app:                                  │
│  ├─ Independent versioning                  │
│  ├─ Independent deployment                  │
│  ├─ Independent rollback                    │
│  └─ Isolated failures                       │
└─────────────────────────────────────────────┘
```

---

## 📦 Dependency Architecture

### Dependency Graph

```
Shell
  ├─ @erp/shared/ui
  ├─ @erp/shared/utils
  └─ remoteAuth (runtime)
  └─ remoteFinance (runtime)
  └─ remoteHr (runtime)
  └─ remoteSupply (runtime)

Remote Auth
  ├─ @erp/shared/ui
  ├─ @erp/shared/utils
  └─ @erp/auth/data-access

Remote Finance
  ├─ @erp/shared/ui
  ├─ @erp/shared/utils
  └─ @erp/finance/data-access

Remote HR
  ├─ @erp/shared/ui
  ├─ @erp/shared/utils
  └─ @erp/hr/data-access

Remote Supply
  ├─ @erp/shared/ui
  ├─ @erp/shared/utils
  └─ @erp/supply/data-access
```

### Dependency Rules

```
✅ Allowed:
- Apps → Shared libs
- Apps → Domain-specific libs
- Libs → Other libs (same domain)

❌ Forbidden:
- Apps → Other apps
- Remotes → Other remotes
- Circular dependencies
- Shared libs → Domain libs
```

---

## 🎯 Architecture Principles

### 1. SOLID Principles

**S - Single Responsibility**
- Each component has one reason to change
- Services handle specific concerns
- Clear separation of UI and logic

**O - Open/Closed**
- Base classes for extension
- Interfaces for abstraction
- Plugin architecture via Module Federation

**L - Liskov Substitution**
- Components extend base classes correctly
- Interfaces implemented fully
- Type safety enforced

**I - Interface Segregation**
- Small, focused interfaces
- Components implement only what they need
- No fat interfaces

**D - Dependency Inversion**
- Depend on abstractions (services)
- inject() for dependency injection
- Facade pattern for business logic

### 2. Clean Architecture

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (UI)             │
│         ├─ Components                       │
│         └─ Templates                        │
├─────────────────────────────────────────────┤
│         Application Layer (Services)        │
│         ├─ Facades                          │
│         ├─ State Management                 │
│         └─ Business Logic                   │
├─────────────────────────────────────────────┤
│         Domain Layer (Models)               │
│         ├─ Entities                         │
│         ├─ Interfaces                       │
│         └─ Types                            │
├─────────────────────────────────────────────┤
│         Infrastructure Layer (External)     │
│         ├─ API Services (future)            │
│         ├─ Storage                          │
│         └─ Third-party integrations         │
└─────────────────────────────────────────────┘
```

### 3. Micro-Frontend Principles

**Isolation**
- Each remote is independent
- No direct dependencies between remotes
- Shared code via libraries only

**Autonomy**
- Independent development
- Independent deployment
- Independent versioning

**Composition**
- Shell orchestrates remotes
- Runtime integration
- Lazy loading

---

## 📊 Performance Architecture

### Code Splitting

```
Initial Bundle (Shell)
  ├─ Core framework (~200KB)
  ├─ Shared UI library (~150KB)
  ├─ Layout components (~100KB)
  └─ Router (~50KB)
  Total: ~500KB (gzipped)

Lazy Loaded (On Demand)
  ├─ Remote Auth (~200KB)
  ├─ Remote Finance (~250KB)
  ├─ Remote HR (~250KB)
  └─ Remote Supply (~250KB)
```

### Caching Strategy

```
Nx Cache
  ├─ Build artifacts
  ├─ Test results
  └─ Lint results

Browser Cache
  ├─ Static assets (1 year)
  ├─ Vendor bundles (1 year)
  └─ App bundles (1 week)

Service Worker (Future)
  ├─ Offline support
  ├─ Background sync
  └─ Push notifications
```

---

## 🔒 Security Architecture

### Authentication

```
┌─────────────────────────────────────────────┐
│         Client (Browser)                    │
│  ├─ Token stored in localStorage/session    │
│  ├─ Token sent in Authorization header      │
│  └─ Token validated on each request         │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│         Backend API (Future)                │
│  ├─ JWT token validation                    │
│  ├─ Role-based access control               │
│  └─ Refresh token mechanism                 │
└─────────────────────────────────────────────┘
```

### Authorization

```
Role-Based Access Control (RBAC)
  │
  ├─ Admin: Full access
  ├─ Finance: Finance module only
  ├─ HR: HR module only
  ├─ Supply: Supply module only
  └─ User: Read-only access
```

---

## 📈 Scalability Architecture

### Horizontal Scaling

```
Load Balancer
    │
    ├─ Shell Instance 1
    ├─ Shell Instance 2
    └─ Shell Instance 3

CDN
    │
    ├─ Remote Auth (cached)
    ├─ Remote Finance (cached)
    ├─ Remote HR (cached)
    └─ Remote Supply (cached)
```

### Vertical Scaling

```
Optimize Bundle Sizes
  ├─ Tree shaking
  ├─ Code splitting
  ├─ Lazy loading
  └─ Compression

Optimize Runtime Performance
  ├─ OnPush change detection
  ├─ Signal-based reactivity
  ├─ Virtual scrolling (future)
  └─ Memoization
```

---

## 🎯 Future Architecture Enhancements

### Phase 6: Business Features
- Real API integration
- Data persistence
- Advanced state management
- Real-time updates (WebSockets)

### Phase 7: Advanced Features
- Offline support (Service Workers)
- Push notifications
- Background sync
- Progressive Web App (PWA)

### Phase 8: Enterprise Features
- Multi-tenancy
- White-labeling
- Advanced analytics
- Audit logging

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-14  
**Status**: ✅ Current
