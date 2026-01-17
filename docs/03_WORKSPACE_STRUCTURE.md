# Workspace Structure

**Monorepo Organization and Naming Conventions**

---

## 📁 Directory Layout

```
ERP_Nx_Microfrontend/
├── apps/                          # Applications (Shell + Remotes)
│   ├── shell/                     # Host application (Port 4200)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/         # Core services, guards, config
│   │   │   │   ├── layout/       # Layout components (header, sidebar, footer)
│   │   │   │   ├── pages/        # Shell-specific pages
│   │   │   │   ├── design-system/ # Design system showcase
│   │   │   │   ├── showcase/     # Component showcase
│   │   │   │   ├── app.routes.ts # Top-level routing
│   │   │   │   └── app.ts        # Root component
│   │   │   ├── bootstrap.ts      # Bootstrap logic
│   │   │   └── main.ts           # Entry point
│   │   ├── module-federation.config.ts
│   │   ├── webpack.config.ts
│   │   └── project.json
│   │
│   ├── remote-auth/               # Auth remote (Port 4201)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── remote-entry/ # Manifest + Routes exposure
│   │   │   │   ├── pages/        # Auth pages (login, register)
│   │   │   │   └── app.ts
│   │   │   └── main.ts
│   │   ├── module-federation.config.ts
│   │   └── project.json
│   │
│   ├── remote-finance/            # Finance remote (Port 4202)
│   ├── remote-hr/                 # HR remote (Port 4203)
│   ├── remote-srm/                # SRM remote (Port 4204)
│   ├── remotePm/                  # PM remote (Port 4205)
│   ├── remote-warehouses/         # Warehouses remote (Port 4206)
│   │
│   └── *-e2e/                     # E2E test projects
│       ├── shell-e2e/
│       ├── remote-auth-e2e/
│       └── ...
│
├── libs/                          # Shared libraries
│   ├── auth/                      # Auth domain libraries
│   │   ├── data-access/          # Auth API services, state
│   │   └── feature-login/        # Login feature components
│   │
│   └── shared/                    # Cross-domain shared libraries
│       ├── config/               # Configuration and constants
│       │   └── src/
│       │       └── lib/
│       │           └── environment.ts
│       │
│       ├── models/               # TypeScript interfaces and types
│       │   └── src/
│       │       └── lib/
│       │           ├── navigation.models.ts
│       │           └── user.models.ts
│       │
│       ├── theme/                # Design system and theming
│       │   └── src/
│       │       ├── lib/
│       │       │   ├── tokens/   # Design tokens
│       │       │   └── styles/   # Global styles
│       │       └── index.ts
│       │
│       └── ui/                   # Reusable UI components
│           └── src/
│               └── lib/
│                   ├── components/
│                   └── services/
│
├── docs/                          # Documentation
│   ├── 00_OVERVIEW.md
│   ├── 01_ARCHITECTURE.md
│   ├── 02_TOOLING_STACK.md
│   └── ...
│
├── .github/                       # GitHub Actions workflows
│   └── workflows/
│       ├── ci-shell.yml
│       ├── ci-remote-auth.yml
│       └── ci-all-remotes.yml
│
├── node_modules/                  # Dependencies
├── dist/                          # Build output (gitignored)
├── .nx/                           # Nx cache (gitignored)
│
├── nx.json                        # Nx workspace configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.base.json             # Base TypeScript config
├── tailwind.config.js             # Tailwind configuration
├── .eslintrc.json                 # ESLint configuration
├── .prettierrc                    # Prettier configuration
└── README.md                      # Project overview
```

---

## 🏗️ Apps Directory

### Shell Application
**Path**: `apps/shell/`  
**Port**: 4200  
**Purpose**: Host application that orchestrates remotes

**Structure**:
```
shell/
├── src/
│   ├── app/
│   │   ├── core/                 # Singleton services, guards, config
│   │   │   ├── config/
│   │   │   │   └── remote-registry.config.ts  # Remote configurations
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       ├── navigation-facade.service.ts
│   │   │       └── route-context.service.ts
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── sidebar/
│   │   │   │   └── footer/
│   │   │   ├── services/
│   │   │   │   ├── layout.service.ts
│   │   │   │   └── sidebar-facade.service.ts
│   │   │   └── layout.component.ts
│   │   │
│   │   ├── pages/                # Shell-specific pages
│   │   │   ├── dashboard/
│   │   │   └── remote-unavailable/
│   │   │
│   │   ├── design-system/        # Design system showcase
│   │   ├── showcase/             # Component showcase
│   │   ├── app.routes.ts         # Routing configuration
│   │   └── app.ts                # Root component
│   │
│   ├── bootstrap.ts              # Module Federation bootstrap
│   └── main.ts                   # Entry point
│
├── public/                       # Static assets
├── module-federation.config.ts   # MF configuration
├── webpack.config.ts             # Webpack config
├── project.json                  # Nx project config
└── tsconfig.app.json             # TypeScript config
```

### Remote Applications
**Pattern**: `apps/remote-{domain}/`  
**Ports**: 4201-4206

**Structure** (example: `remote-finance`):
```
remote-finance/
├── src/
│   ├── app/
│   │   ├── remote-entry/         # Module Federation entry
│   │   │   ├── entry.ts          # Remote entry component
│   │   │   ├── entry.routes.ts   # Exposed routes
│   │   │   └── manifest.ts       # Navigation manifest
│   │   │
│   │   ├── pages/                # Feature pages
│   │   │   ├── dashboard/
│   │   │   ├── invoices/
│   │   │   └── reports/
│   │   │
│   │   └── app.ts                # Root component
│   │
│   └── main.ts                   # Entry point
│
├── module-federation.config.ts   # MF configuration
├── project.json                  # Nx project config
└── tsconfig.app.json             # TypeScript config
```

---

## 📚 Libs Directory

### Naming Convention
```
libs/{scope}/{type}/
```

**Scope**: Domain or shared
- `auth`, `finance`, `hr`, `srm`, `pm`, `warehouses`
- `shared` (cross-domain)

**Type**: Library purpose
- `data-access`: API services, state management
- `feature-{name}`: Feature-specific components
- `ui`: Reusable UI components
- `util`: Helper functions and utilities
- `models`: TypeScript interfaces and types
- `config`: Configuration
- `theme`: Design system

### Shared Libraries

#### `libs/shared/models`
**Purpose**: TypeScript interfaces and types  
**Tags**: `scope:shared`, `type:model`

```typescript
// libs/shared/models/src/lib/navigation.models.ts
export interface NavigationManifest {
  appId: string;
  appName: string;
  sidebarTitle: string;
  accentToken: string;
  menuItems: NavItem[];
  searchKeywords?: string[];
  appIcon?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  route?: string;
  children?: NavItem[];
  searchKeywords?: string[];
}
```

#### `libs/shared/theme`
**Purpose**: Design system and theming  
**Tags**: `scope:shared`, `type:theme`

```
shared/theme/
├── src/
│   ├── lib/
│   │   ├── tokens/
│   │   │   ├── colors.ts
│   │   │   ├── typography.ts
│   │   │   └── spacing.ts
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── themes.css
│   │   └── accent-tokens.ts
│   └── index.ts
```

#### `libs/shared/ui`
**Purpose**: Reusable UI components  
**Tags**: `scope:shared`, `type:ui`

```
shared/ui/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   └── modal/
│   │   └── services/
│   │       └── responsive.service.ts
│   └── index.ts
```

#### `libs/shared/config`
**Purpose**: Configuration and constants  
**Tags**: `scope:shared`, `type:config`

```typescript
// libs/shared/config/src/lib/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
};
```

### Domain Libraries

#### `libs/auth/data-access`
**Purpose**: Auth API services and state  
**Tags**: `scope:auth`, `type:data-access`

```
auth/data-access/
├── src/
│   └── lib/
│       ├── services/
│       │   └── auth-api.service.ts
│       └── state/
│           └── auth.store.ts
```

#### `libs/auth/feature-login`
**Purpose**: Login feature components  
**Tags**: `scope:auth`, `type:feature`

```
auth/feature-login/
├── src/
│   └── lib/
│       ├── login.component.ts
│       └── login.component.html
```

---

## 🏷️ Nx Tags and Dependency Rules

### Tag Schema
Every library has two tags:
1. **Scope tag**: `scope:{domain}` or `scope:shared`
2. **Type tag**: `type:{type}`

### Dependency Constraints (nx.json)

```json
{
  "depConstraints": [
    {
      "sourceTag": "type:feature",
      "onlyDependOnLibsWithTags": [
        "type:data-access",
        "type:ui",
        "type:util",
        "type:model"
      ]
    },
    {
      "sourceTag": "type:data-access",
      "onlyDependOnLibsWithTags": ["type:util", "type:model"]
    },
    {
      "sourceTag": "type:ui",
      "onlyDependOnLibsWithTags": ["type:util", "type:model"]
    },
    {
      "sourceTag": "type:util",
      "onlyDependOnLibsWithTags": ["type:model"]
    },
    {
      "sourceTag": "scope:auth",
      "onlyDependOnLibsWithTags": ["scope:auth", "scope:shared"]
    },
    {
      "sourceTag": "scope:finance",
      "onlyDependOnLibsWithTags": ["scope:finance", "scope:shared"]
    }
  ]
}
```

### Enforcement
```bash
# Check for constraint violations
npx nx lint shell

# Violations will fail the build
```

---

## 📦 Import Paths

### Path Mapping (tsconfig.base.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@erp/shared/models": ["libs/shared/models/src/index.ts"],
      "@erp/shared/theme": ["libs/shared/theme/src/index.ts"],
      "@erp/shared/ui": ["libs/shared/ui/src/index.ts"],
      "@erp/shared/config": ["libs/shared/config/src/index.ts"],
      "@erp/auth/data-access": ["libs/auth/data-access/src/index.ts"],
      "@erp/auth/feature-login": ["libs/auth/feature-login/src/index.ts"]
    }
  }
}
```

### Usage in Code
```typescript
// ✅ Correct: Use path alias
import { NavigationManifest } from '@erp/shared/models';
import { applyAccentToken } from '@erp/shared/theme';

// ❌ Wrong: Relative paths across libs
import { NavigationManifest } from '../../../shared/models/src/lib/navigation.models';
```

---

## 🗂️ File Naming Conventions

### Components
```
{name}.component.ts
{name}.component.html
{name}.component.css
{name}.component.spec.ts
```

### Services
```
{name}.service.ts
{name}.service.spec.ts
```

### Guards
```
{name}.guard.ts
{name}.guard.spec.ts
```

### Models
```
{name}.models.ts
{name}.types.ts
{name}.interface.ts
```

### Configuration
```
{name}.config.ts
```

---

## 🎯 Project Configuration

### project.json Structure
```json
{
  "name": "shell",
  "projectType": "application",
  "sourceRoot": "apps/shell/src",
  "tags": ["type:app", "scope:shell"],
  "targets": {
    "build": { /* build config */ },
    "serve": { /* serve config */ },
    "lint": { /* lint config */ },
    "test": { /* test config */ }
  }
}
```

### Common Targets
- **build**: Production build
- **serve**: Development server
- **lint**: ESLint
- **test**: Unit tests
- **e2e**: End-to-end tests

---

## 📊 Dependency Graph

### View the Graph
```bash
npx nx graph
```

### Expected Structure
```
Shell (apps/shell)
  ├─→ @erp/shared/models
  ├─→ @erp/shared/theme
  ├─→ @erp/shared/ui
  └─→ @erp/shared/config

Remote Auth (apps/remote-auth)
  ├─→ @erp/shared/models
  ├─→ @erp/shared/theme
  ├─→ @erp/auth/data-access
  └─→ @erp/auth/feature-login

@erp/auth/feature-login
  ├─→ @erp/auth/data-access
  ├─→ @erp/shared/ui
  └─→ @erp/shared/models

@erp/auth/data-access
  ├─→ @erp/shared/models
  └─→ @erp/shared/config
```

---

## 🚀 Generating New Code

### Generate a New Remote
```bash
npx nx g @nx/angular:remote remote-new-module \
  --host=shell \
  --port=4207 \
  --style=css
```

### Generate a New Library
```bash
# Feature library
npx nx g @nx/angular:library feature-invoices \
  --directory=libs/finance/feature-invoices \
  --tags=scope:finance,type:feature

# Data access library
npx nx g @nx/angular:library data-access \
  --directory=libs/finance/data-access \
  --tags=scope:finance,type:data-access
```

### Generate a Component
```bash
npx nx g @nx/angular:component my-component \
  --project=shell \
  --standalone=true \
  --changeDetection=OnPush
```

### Generate a Service
```bash
npx nx g @nx/angular:service my-service \
  --project=shell
```

---

## 🎯 Best Practices

### ✅ DO
- Use Nx generators for consistency
- Follow the naming conventions
- Tag all libraries correctly
- Use path aliases for imports
- Keep apps thin, logic in libs
- One component per file
- Standalone components

### ❌ DON'T
- Bypass dependency constraints
- Use relative imports across libs
- Put business logic in apps
- Create circular dependencies
- Mix concerns in a single lib
- Use NgModules (use standalone)

---

## 📚 Further Reading

- [Architecture Guide](./01_ARCHITECTURE.md)
- [Tooling Stack](./02_TOOLING_STACK.md)
- [Developer Guide](./10_DEVELOPER_GUIDE.md)
