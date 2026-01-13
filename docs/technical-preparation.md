# Technical Implementation Preparation (Phase 3)

Exact commands, configurations, and constraints for implementing the Angular Micro-Frontend ERP system.

**Target Versions** (as of January 2026):

- Angular: **21.1.0** (latest stable)
- Nx: **22.3+** (Angular 21 compatible)
- Node.js: **20.19.0+**, **22.12.0+**, or **24.0.0+**

---

## Step 1: Environment & Version Validation

### Prerequisites Check

Before initialization, validate the environment meets all requirements.

#### 1.1 Node.js Version Check

**Command**:

```bash
node --version
```

**Expected Output**: `v20.19.x`, `v22.12.x+`, or `v24.x+`

**If version is incorrect**:

- Download and install from [nodejs.org](https://nodejs.org/)
- Use `nvm` (Node Version Manager) to switch versions:
  ```bash
  nvm install 20.19.0
  nvm use 20.19.0
  ```

**Why this matters**: Angular 21 explicitly requires Node.js `^20.19.0 || ^22.12.0 || ^24.0.0`. Incompatible versions will cause installation failures.

---

#### 1.2 npm Version Check

**Command**:

```bash
npm --version
```

**Expected Output**: `10.x+` (bundled with Node 20+)

**Reason**: npm 10+ provides better workspace management and security features.

---

#### 1.3 Verify Latest Angular Version

**Command**:

```bash
npm view @angular/core version
```

**Expected Output**: `21.1.0` (or latest 21.x minor/patch version)

**Why verify dynamically**:

- Angular releases patches frequently (21.1.1, 21.1.2, etc.)
- Always use the latest stable within the 21.x series
- Do NOT hardcode version numbers in commands

**Action**: Note the exact version for verification after workspace creation.

---

#### 1.4 Verify Nx Compatibility

**Command**:

```bash
npm view @nx/angular version
```

**Expected Output**: `22.3.x+`

**Compatibility Matrix**:

- Nx 22.3+ officially supports Angular 21
- Earlier Nx versions (22.0-22.2) may have compatibility issues
- Always use latest Nx 22.x for Angular 21 projects

**Why this matters**: Nx Module Federation generators depend on Nx-Angular version compatibility. Mismatched versions cause cryptic errors.

---

### Validation Summary

Run all checks in sequence:

```bash
# 1. Node.js version
node --version

# 2. npm version
npm --version

# 3. Latest Angular version
npm view @angular/core version

# 4. Latest Nx version
npm view @nx/angular version
```

**Exit Criteria**:

- Node.js ≥ 20.19.0, 22.12.0, or 24.0.0
- npm ≥ 10.0
- Angular version confirmed (21.1.x)
- Nx version confirmed (22.3.x+)

---

## Step 2: Nx Workspace Initialization

### 2.1 Install Nx CLI Globally (Optional but Recommended)

**Command**:

```bash
npm install -g nx@latest
```

**Why**: Global installation allows using `nx` directly instead of `npx nx`.

**Alternative**: Use `npx nx` for all commands (no global install).

---

### 2.2 Create Nx Workspace

**Exact Command**:

```bash
npx create-nx-workspace@latest erp --preset=angular-monorepo --appName=shell --style=scss --routing=true --standaloneApi=true --nxCloud=skip --packageManager=npm
```

**Flag Explanations**:

| Flag                        | Value                     | Reason                                                         |
| --------------------------- | ------------------------- | -------------------------------------------------------------- |
| `erp`                       | Workspace name            | Project root directory name                                    |
| `--preset=angular-monorepo` | Preset type               | Creates Angular-focused monorepo structure                     |
| `--appName=shell`           | Initial app name          | Creates the Shell (host) application                           |
| `--style=scss`              | Stylesheet format         | SCSS for better styling (can be changed to `css` if preferred) |
| `--routing=true`            | Enable routing            | Required for micro-frontend navigation                         |
| `--standaloneApi=true`      | Use standalone components | Angular 21 best practice, no NgModules                         |
| `--nxCloud=skip`            | Skip Nx Cloud             | No remote caching initially (can enable later)                 |
| `--packageManager=npm`      | Package manager           | Use npm (can use `pnpm` or `yarn` if preferred)                |

**What this creates**:

```
erp/
├── apps/
│   └── shell/              # Host application (auto-generated)
├── libs/                   # Empty, will add libraries later
├── nx.json                 # Nx configuration
├── tsconfig.base.json      # TypeScript base config
├── package.json            # Workspace dependencies
└── .eslintrc.json          # ESLint configuration
```

**Post-Creation Verification**:

```bash
cd erp
nx --version
```

**Expected**: Shows Nx version matching `@nx/angular` in `package.json`.

---

### 2.3 Enable TypeScript Strict Mode

**File**: `tsconfig.base.json`

**Verify/Update**:

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true,
    "strictPropertyInitialization": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Why**: Enforces type safety from day one. Retrofitting strict mode later is painful.

---

## Step 3: Shell Application Setup

The Shell application was auto-created in Step 2.2. Now configure it as a Module Federation **Host**.

### 3.1 Convert Shell to Module Federation Host

**Command**:

```bash
nx g @nx/angular:host shell --remotes=
```

**Flag Explanations**:

- `@nx/angular:host` - Nx generator for Module Federation host
- `shell` - Application name (already exists, will be converted)
- `--remotes=` - Empty initially, add remotes later

**What this does**:

- Adds `@nx/webpack` dependency
- Creates `webpack.config.ts` for Module Federation
- Updates `project.json` to use custom webpack builder
- Configures Shell as Module Federation host

**Generated Files**:

- `apps/shell/webpack.config.ts` - Module Federation host configuration
- `apps/shell/module-federation.config.ts` - Federation-specific config

---

### 3.2 Verify Shell Configuration

**File**: `apps/shell/project.json`

**Check `targets.build.executor`**:

```json
{
  "targets": {
    "build": {
      "executor": "@nx/angular:webpack-browser",
      "options": {
        "customWebpackConfig": {
          "path": "apps/shell/webpack.config.ts"
        }
      }
    }
  }
}
```

**File**: `apps/shell/module-federation.config.ts`

**Expected structure**:

```typescript
import { ModuleFederationConfig } from "@nx/webpack";

const config: ModuleFederationConfig = {
  name: "shell",
  remotes: [], // Empty initially
};

export default config;
```

---

### 3.3 Shell Routing Configuration

The Shell uses Angular standalone routing.

**File**: `apps/shell/src/app/app.routes.ts`

**Initial structure** (auto-generated):

```typescript
import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  // Routes for remotes will be added later
];
```

**Why standalone routing**:

- Angular 21 best practice
- No `RouterModule.forRoot()` needed
- Simpler, more declarative

---

## Step 4: Remote Applications Setup

Create four remote applications: `remote-auth`, `remote-finance`, `remote-hr`, `remote-supply`.

### 4.1 Generate Remote: Authentication

**Command**:

```bash
nx g @nx/angular:remote remote-auth --host=shell --port=4201 --style=scss --routing=true --standaloneApi=true
```

**Flag Explanations**:

- `@nx/angular:remote` - Nx generator for Module Federation remote
- `remote-auth` - Remote application name
- `--host=shell` - Links this remote to the Shell host
- `--port=4201` - Dev server port (must be unique per remote)
- `--style=scss` - Match Shell styling
- `--routing=true` - Enable routing within remote
- `--standaloneApi=true` - Use standalone components

**What this does**:

- Creates `apps/remote-auth/` with full Angular app structure
- Generates `webpack.config.ts` and `module-federation.config.ts`
- Automatically updates `shell`'s `module-federation.config.ts` to include this remote
- Configures remote to expose its entry point

**Generated Remote Files**:

```
apps/remote-auth/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── main.ts
│   └── bootstrap.ts
├── module-federation.config.ts
├── webpack.config.ts
└── project.json
```

---

### 4.2 Generate Remote: Finance

**Command**:

```bash
nx g @nx/angular:remote remote-finance --host=shell --port=4202 --style=scss --routing=true --standaloneApi=true
```

**Port**: `4202` (must be different from Shell `4200` and `remote-auth` `4201`)

---

### 4.3 Generate Remote: HR

**Command**:

```bash
nx g @nx/angular:remote remote-hr --host=shell --port=4203 --style=scss --routing=true --standaloneApi=true
```

**Port**: `4203`

---

### 4.4 Generate Remote: Supply Chain

**Command**:

```bash
nx g @nx/angular:remote remote-supply --host=shell --port=4204 --style=scss --routing=true --standaloneApi=true
```

**Port**: `4204`

---

### 4.5 Verify Shell Auto-Updated

After generating all remotes, verify `apps/shell/module-federation.config.ts`:

**Expected**:

```typescript
import { ModuleFederationConfig } from "@nx/webpack";

const config: ModuleFederationConfig = {
  name: "shell",
  remotes: ["remote-auth", "remote-finance", "remote-hr", "remote-supply"],
};

export default config;
```

**Why automatic**: Nx generators handle configuration updates. Manual edits should be minimal.

---

### 4.6 Port Allocation Summary

| Application    | Port |
| -------------- | ---- |
| Shell (Host)   | 4200 |
| remote-auth    | 4201 |
| remote-finance | 4202 |
| remote-hr      | 4203 |
| remote-supply  | 4204 |

**Critical**: Ports must be unique and consistent. Changing ports requires manual config updates.

---

## Step 5: Module Federation Configuration Rules

### 5.1 Shared Dependencies Strategy

Module Federation requires careful management of shared dependencies to avoid:

- **Singleton violations**: Multiple Angular instances (breaks change detection)
- **Version mismatches**: Different Angular versions loaded simultaneously
- **Bundle bloat**: Duplicated dependencies

#### Shared Configuration Template

**File**: Each app's `module-federation.config.ts`

**Standard shared config**:

```typescript
import { ModuleFederationConfig } from "@nx/webpack";

const config: ModuleFederationConfig = {
  name: "remote-auth", // or shell, remote-finance, etc.

  exposes: {
    "./Routes": "./src/app/app.routes.ts", // Remote-specific
  },

  shared: (libraryName, defaultConfig) => {
    // Angular core packages MUST be singletons
    if (libraryName.startsWith("@angular/")) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto", // Use version from package.json
      };
    }

    // RxJS should also be singleton
    if (libraryName === "rxjs") {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: true,
        requiredVersion: "auto",
      };
    }

    return defaultConfig;
  },
};

export default config;
```

---

### 5.2 Why Singleton + Strict Version?

**`singleton: true`**:

- Ensures only ONE instance of Angular core is loaded
- Prevents "multiple Angular instances" errors
- Required for change detection, DI, and router to work correctly

**`strictVersion: true`**:

- Throws error if versions mismatch between Shell and Remotes
- Prevents runtime errors from incompatible Angular versions
- Forces all apps to align on same Angular version

**`requiredVersion: 'auto'`**:

- Uses version from `package.json`
- No manual version management
- Updates automatically when dependencies update

---

### 5.3 Version Alignment Enforcement

**Critical Rule**: All apps (Shell + Remotes) MUST use identical Angular versions.

**How Nx enforces this**:

- Single `package.json` at workspace root
- All apps use same `node_modules`
- No per-app `package.json` for Angular packages

**Verification Command**:

```bash
npm list @angular/core
```

**Expected**: Single version listed, no duplicates.

---

### 5.4 What Each Remote Exposes

**Standard pattern**: Each remote exposes its root routes.

**Example** (`remote-auth`):

```typescript
exposes: {
  './Routes': './src/app/app.routes.ts',
}
```

**Why routes, not components?**:

- Shell lazy-loads routes via Angular router
- More flexible than exposing individual components
- Aligns with Angular best practices

---

### 5.5 Remote-to-Remote Communication: FORBIDDEN

**Rule**: Remotes MUST NOT import from other remotes.

**Why**:

- Creates tight coupling
- Defeats purpose of micro-frontends
- Leads to circular dependencies

**Allowed communication**:

- Remote → Shell (via events/services)
- Remote → Shared libraries
- Shell → Remote (via federation)

**Enforcement**: Nx tags and lint rules (Step 7).

---

## Step 6: Library Generation Strategy

### 6.1 Shared Libraries

Generate cross-domain libraries first.

#### 6.1.1 Shared UI Library

**Command**:

```bash
nx g @nx/angular:library shared-ui --directory=libs/shared/ui --importPath=@erp/shared/ui --buildable=true --publishable=false --standaloneApi=true --tags=scope:shared,type:ui
```

**Flag Explanations**:

- `--directory=libs/shared/ui` - Physical location
- `--importPath=@erp/shared/ui` - TypeScript import path
- `--buildable=true` - Can be built independently
- `--publishable=false` - Not for npm publishing
- `--standaloneApi=true` - Standalone components only
- `--tags` - Nx tags for boundary enforcement

**Generated**:

```
libs/shared/ui/
├── src/
│   ├── lib/
│   └── index.ts            # Public API
├── project.json
└── tsconfig.json
```

---

#### 6.1.2 Shared Utils Library

**Command**:

```bash
nx g @nx/angular:library shared-utils --directory=libs/shared/utils --importPath=@erp/shared/utils --buildable=true --standaloneApi=true --tags=scope:shared,type:util
```

---

#### 6.1.3 Shared Models Library

**Command**:

```bash
nx g @nx/angular:library shared-models --directory=libs/shared/models --importPath=@erp/shared/models --buildable=true --standaloneApi=true --tags=scope:shared,type:model
```

---

### 6.2 Domain-Specific Libraries

#### 6.2.1 Auth Feature: Login

**Command**:

```bash
nx g @nx/angular:library auth-feature-login --directory=libs/auth/feature-login --importPath=@erp/auth/feature-login --buildable=true --standaloneApi=true --tags=scope:auth,type:feature
```

**Why separate feature library?**:

- Remotes are thin (just routing and composition)
- Features live in libraries (reusable, testable)
- Auth remote imports and uses this feature

---

#### 6.2.2 Auth Data Access

**Command**:

```bash
nx g @nx/angular:library auth-data-access --directory=libs/auth/data-access --importPath=@erp/auth/data-access --buildable=true --standaloneApi=true --tags=scope:auth,type:data-access
```

**Purpose**: Auth API services, HTTP calls, state management.

---

### 6.3 Library Naming Convention Summary

**Generated Import Paths**:

```typescript
// Shared libraries
import { ButtonComponent } from "@erp/shared/ui";
import { formatDate } from "@erp/shared/utils";
import { User } from "@erp/shared/models";

// Auth domain libraries
import { LoginComponent } from "@erp/auth/feature-login";
import { AuthService } from "@erp/auth/data-access";
```

**Pattern**: `@erp/{scope}/{type}`

**Why this naming**:

- Immediately shows purpose and scope
- Auto-documented in imports
- IDE autocomplete friendly

---

### 6.4 Buildable vs Publishable

**All libraries**: `--buildable=true`, `--publishable=false`

**`buildable: true`**:

- Library has its own build config
- Can be built independently for testing
- Improves incremental builds

**`publishable: false`**:

- Not intended for npm registry
- Workspace-internal only

---

## Step 7: Nx Tags & Boundary Enforcement

### 7.1 Tag Schema

Tags format: `scope:{value},type:{value}`

**Scope Tags**:

- `scope:shell` - Shell application
- `scope:remote` - Remote applications
- `scope:shared` - Shared libraries (all domains)
- `scope:auth` - Auth domain
- `scope:finance` - Finance domain
- `scope:hr` - HR domain
- `scope:supply` - Supply domain

**Type Tags**:

- `type:app` - Applications
- `type:feature` - Feature libraries
- `type:data-access` - Data access libraries
- `type:ui` - UI component libraries
- `type:util` - Utility libraries
- `type:model` - Model/type libraries

---

### 7.2 Dependency Constraints

**File**: `nx.json`

**Add `targetDefaults.lint.options.depConstraints`**:

```json
{
  "targetDefaults": {
    "lint": {
      "options": {
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
          },
          {
            "sourceTag": "scope:hr",
            "onlyDependOnLibsWithTags": ["scope:hr", "scope:shared"]
          },
          {
            "sourceTag": "scope:supply",
            "onlyDependOnLibsWithTags": ["scope:supply", "scope:shared"]
          }
        ]
      }
    }
  }
}
```

---

### 7.3 Enforcement Mechanism

**Lint Command**:

```bash
nx lint shell
nx lint remote-auth
nx affected:lint
```

**What it catches**:

- Feature libs importing from apps ❌
- UI libs importing from feature libs ❌
- Cross-domain imports (e.g., `auth` → `finance`) ❌
- Circular dependencies ❌

**When it runs**:

- On `nx lint`
- In pre-commit hooks (recommended)
- In CI/CD pipeline

---

### 7.4 View Dependency Graph

**Command**:

```bash
nx graph
```

**What it shows**:

- Visual representation of all projects
- Dependency connections
- Circular dependencies (highlighted)

**Use case**: Verify no unwanted dependencies exist.

---

## Step 8: Development Workflow

### 8.1 Running Shell Only

**Command**:

```bash
nx serve shell
```

**What happens**:

- Shell runs on `http://localhost:4200`
- Remotes are NOT started
- Shell shows error if trying to load remote routes
- Use for Shell-only development

---

### 8.2 Running Shell + One Remote

**Command** (example with Auth):

```bash
nx serve shell --devRemotes=remote-auth
```

**What happens**:

- Shell runs on `4200`
- `remote-auth` runs on `4201` (in dev mode, hot reload enabled)
- Other remotes (`finance`, `hr`, `supply`) are not started
- Shell can load Auth routes, but not others

**Why `--devRemotes`?**:

- Only builds specified remotes in dev mode
- Faster startup (don't wait for all remotes)
- Focused development

---

### 8.3 Running Shell + All Remotes

**Command**:

```bash
nx serve shell --devRemotes=remote-auth,remote-finance,remote-hr,remote-supply
```

**What happens**:

- Shell runs on `4200`
- All remotes run on their respective ports (`4201-4204`)
- All routes functional
- Heavy resource usage (5 dev servers)

**When to use**: Full integration testing locally.

---

### 8.4 Affected Builds

**Command**:

```bash
nx affected:build
```

**What it does**:

- Analyzes git changes
- Builds only affected apps/libs
- Skips unchanged projects

**Why**:

- Faster builds in CI
- Monorepo efficiency

**Example**:

- Change `libs/auth/data-access`
- Nx builds: `auth-data-access`, `auth-feature-login`, `remote-auth`
- Nx skips: `shell`, `remote-finance`, `remote-hr`, `remote-supply` (not affected)

---

### 8.5 Expected Local Dev Flow

**Typical developer workflow**:

1. **Start Shell + Relevant Remote**:

   ```bash
   nx serve shell --devRemotes=remote-auth
   ```

2. **Make changes** in `libs/auth/feature-login`

3. **Hot reload** applies automatically

4. **Run tests**:

   ```bash
   nx test auth-feature-login
   ```

5. **Lint**:

   ```bash
   nx lint auth-feature-login
   ```

6. **Commit** (pre-commit hook runs affected lint/test)

---

## Explicit Exclusions

**The following are OUT OF SCOPE for Phase 3**:

❌ Backend integration (API endpoints, microservices)  
❌ UI theming and design system implementation  
❌ Authentication logic (login, JWT, OAuth)  
❌ State management decisions (NgRx, Signals, Akita, etc.)  
❌ Form implementations  
❌ HTTP interceptors  
❌ Routing guards  
❌ CI/CD pipeline setup  
❌ Deployment configuration  
❌ Environment-specific configs (staging, production)  
❌ Testing strategy (unit, e2e, integration)

**These will be addressed in future phases.**

---

## Exit Criteria for Phase 3

Phase 3 is complete when:

✅ All commands validated against latest Angular 21.x  
✅ Workspace can be generated without errors  
✅ Shell application configured as Module Federation host  
✅ All 4 remotes created and linked to Shell  
✅ Shared libraries (`shared/ui`, `shared/utils`, `shared/models`) generated  
✅ Sample domain libraries (`auth/feature-login`, `auth/data-access`) generated  
✅ Nx tags defined for all projects  
✅ Dependency constraints configured in `nx.json`  
✅ Shell can load all remotes with placeholder routes (next phase)  
✅ `nx lint` actively prevents architectural violations

---

## Next Phase: Phase 4

**Phase 4: Shell Bootstrap + First Remote Integration**

Scope:

- Implement Shell routing to load remotes
- Create placeholder components in `remote-auth`
- Integrate Auth remote into Shell
- Verify end-to-end remote loading
- Create development documentation

**Phase 3 ends here. Awaiting approval before Phase 4.**
