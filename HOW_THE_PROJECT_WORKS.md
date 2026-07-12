# How the ERP Project Works Internally

Welcome to the ERP project. This guide describes the architecture of our **Enterprise Angular Application** built with **Angular**, **Nx**, and a **monolithic feature-based** structure.

---

## 1. High-Level Idea (The Big Picture)

### What is the Architecture?

This is a **single Angular application** that contains all business modules as **lazy-loaded features**. Instead of separate micro-frontend apps communicating over the network at runtime, all features live inside one unified app.

### Why this architecture?

- **Simplified Development**: Run a single `npm start` — no need to spin up multiple servers.
- **Type Safety Across Features**: TypeScript catches errors across module boundaries at build time.
- **Faster Initial Load**: Angular's built-in lazy loading handles code splitting automatically.
- **Easier Debugging**: One process, one source map, one DevTools session.

---

## 2. Workspace Structure (Nx Monorepo)

The project lives in an **Nx Monorepo**. All app code and shared code are strictly separated.

```
ERP_Nx_Microfrontend/
├── apps/
│   └── shell/               ← THE ONLY running app
│       └── src/app/
│           ├── core/        ← Guards, services, config
│           ├── layout/      ← Header, Sidebar, Footer
│           ├── navigation/  ← Navigation registry & menu builder
│           ├── pages/       ← Shell-level pages (Dashboard, etc.)
│           ├── shared/      ← Shell-specific shared components
│           └── features/    ← ALL BUSINESS MODULES LIVE HERE
│               ├── auth/    ← Authentication (login, register, company select)
│               ├── finance/ ← Finance module
│               ├── hr/      ← Human Resources module
│               ├── srm/     ← Supplier Relationship Management
│               ├── pm/      ← Project Management
│               └── warehouses/ ← Warehouses & Inventory
└── libs/
    └── shared/
        ├── ui/              ← Design System (Buttons, Tables, Cards, etc.)
        ├── theme/           ← Dynamic branding & accent colors
        ├── models/          ← TypeScript interfaces shared by all features
        ├── config/          ← Runtime configuration service
        ├── data-access/     ← HTTP client, API services, token storage
        ├── util-state/      ← Signal-based state (User, Company, Permissions)
        ├── util-i18n/       ← Transloco internationalization helpers
        └── utils/           ← General utilities
```

**Why Nx?** Nx gives us Dependency Graph tools to enforce that features only depend on shared libraries — never on each other.

---

## 3. The Shell Application

The Shell (`apps/shell`) is the **only deployable Angular application**. It:

- Bootstraps the app (`bootstrap.ts`)
- Provides the layout (Header + Sidebar + Footer via `LayoutComponent`)
- Manages authentication guards (`authGuard`, `guestGuard`, `companyGuard`, `permissionGuard`)
- Owns the application routes (`app.routes.ts`)
- Lazy-loads all feature modules

---

## 4. Feature Modules (previously Micro-Frontend Remotes)

Each feature inside `apps/shell/src/app/features/` is:

- **Lazy-loaded** via Angular's standard `loadChildren()` / `loadComponent()`
- **Self-contained** — its components, routes, and services are scoped to the feature folder
- **Manifest-driven** — exports a `remoteManifest` that tells the Sidebar what menu items to display

### Feature Structure

```
features/hr/
├── hr.routes.ts       ← All HR routes (lazy-loaded)
├── manifest.ts        ← Navigation manifest (sidebar menu)
└── entry/
    └── entry.ts       ← HR module placeholder/entry component
```

### Auth Feature (Special)

The auth feature has more structure because it has real pages:

```
features/auth/
├── auth.routes.ts              ← Auth routes (login, register, select-company)
├── auth-layout.component.ts    ← Auth layout wrapper
├── pages/
│   ├── login/
│   ├── register/
│   └── select-company/
└── services/
    └── auth-facade.service.ts  ← Auth state & API facade
```

---

## 5. Routing Flow

When you navigate:

1. **User goes to `/hr`**: `app.routes.ts` matches the `/hr` path.
2. **Lazy Import**: Angular dynamically imports `features/hr/hr.routes.ts`.
3. **Route Resolution**: Angular renders the correct HR component.

No network fetching of remote bundles — it's all code-split by Angular's webpack bundler at build time.

---

## 6. Sidebar & Navigation System

The Sidebar content is **dynamic per feature**:

- **NavigationFacadeService** watches the URL and detects which feature is active.
- It lazy-loads the `manifest.ts` for that feature (e.g., `features/hr/manifest.ts`).
- The manifest defines the sidebar title, menu items, icons, routes, and accent color.
- **Context Switching**: Moving from Finance to HR instantly updates the Sidebar.

### Manifest Example (`features/hr/manifest.ts`):
```ts
export const remoteManifest: NavigationManifest = {
  appId: 'hr',
  appName: 'Human Resources',
  sidebarTitle: 'HR',
  accentToken: 'hr',
  appIcon: 'pi-users',
  menuItems: [ ... ],
};
```

---

## 7. Shared Libraries: The "Single Source of Truth"

- **`@erp/shared/ui`** — Design System (buttons, tables, cards, inputs)
- **`@erp/shared/theme`** — CSS Variables & accent color tokens
- **`@erp/shared/models`** — TypeScript interfaces (NavigationManifest, NavItem, etc.)
- **`@erp/shared/config`** — Runtime config (API URLs, module IDs)
- **`@erp/shared/data-access`** — HTTP client, API services
- **`@erp/shared/util-state`** — Signal-based stores (User, Company, Permissions)
- **`@erp/shared/util-i18n`** — Transloco i18n configuration

---

## 8. State & Communication

**Rule: Features do not import from each other.**

- **Services**: Shared state lives in `libs/shared/util-state` (signals).
- **Facades**: Components talk to Facade services; Facades talk to State.
- **Guards**: Route guards (`authGuard`, `permissionGuard`) are in the Shell's `core/guards/`.

---

## 9. Internationalization (Transloco)

- **Scoped Translations**: Shell has `/assets/i18n/shell/en.json`, Auth has `/assets/i18n/auth/en.json`.
- **RTL/LTR**: Direction is managed at the Shell level via the `LanguageService`.
- The `TranslocoHttpLoader` fetches translations from `/assets/i18n/{scope}/{lang}.json`.

---

## 10. Running the App

```bash
# Install dependencies
npm install

# Start the enterprise app (single command!)
npm start
# or: npx nx serve shell

# Build for production
npm run build
# or: npx nx build shell
```

The app will be available at **http://localhost:4200**.

---

## 11. Adding a New Feature Module

1. Create `apps/shell/src/app/features/{feature-name}/`
2. Add `{feature}.routes.ts` with lazy-loaded routes
3. Add `manifest.ts` with the `remoteManifest` configuration
4. Register the route in `app.routes.ts` using `loadChildren()`
5. Add the feature to `MANIFEST_LOADERS` in `navigation-facade.service.ts`
6. Add the feature to `REMOTE_REGISTRY` in `remote-registry.config.ts`

---

## 12. Common Mistakes to Avoid

1. **Cross-Feature Imports**: Never import directly from another feature folder. Use shared libraries instead.
2. **Hardcoded URLs**: Never hardcode API URLs — use `ConfigService` or environment variables.
3. **Heavy Features**: Don't include huge global libraries inside a feature. If it's used by everyone, move it to `libs/`.

---

## 13. Mental Model Summary

**The Shell is the stage. Features are the acts.**

The stage (Shell) provides the layout, navigation, authentication, and routing. Each feature act (HR, Finance, etc.) performs its specific business logic when the user navigates to it. Features share props via shared libraries — they never talk directly to each other.

---

_Updated by Principal Frontend Architect — Migrated from Micro-Frontend to Monolithic Enterprise Architecture._
