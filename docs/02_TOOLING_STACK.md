# Tooling Stack

**Technology Stack and Tool Choices**

---

## 🎯 Core Technologies

### Angular 21.0.8+
**Purpose**: Frontend framework  
**Why Angular?**
- Enterprise-grade framework with strong TypeScript support
- Built-in dependency injection
- Powerful CLI and tooling
- Excellent Module Federation support
- Signals for reactive state management
- Standalone components for better tree-shaking

**Key Features Used**:
- Standalone components (no NgModules)
- Signals for reactive state
- Router with lazy loading
- Dependency injection
- TypeScript strict mode
- Change detection strategies

### Nx 22.3.3+
**Purpose**: Monorepo management and build orchestration  
**Why Nx?**
- Best-in-class monorepo tooling
- Intelligent build caching
- Dependency graph visualization
- Affected command for CI optimization
- Module Federation plugin
- Enforced architectural boundaries via tags

**Key Features Used**:
- Workspace management
- Dependency constraints
- Affected builds
- Code generation schematics
- Task orchestration
- Build caching

### TypeScript 5.9.2
**Purpose**: Type-safe JavaScript  
**Configuration**: Strict mode enabled

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

---

## 🏗️ Build & Module Federation

### Webpack 5.104.1+
**Purpose**: Module bundler  
**Why Webpack?**
- Native Module Federation support
- Mature ecosystem
- Excellent Angular integration
- Fine-grained control over bundles

### @module-federation/enhanced 0.21.2
**Purpose**: Enhanced Module Federation runtime  
**Features**:
- Improved error handling
- Better TypeScript support
- Runtime module loading
- Manifest support

---

## 🎨 UI & Styling

### Tailwind CSS 3.4.17
**Purpose**: Utility-first CSS framework  
**Configuration**:
```javascript
// tailwind.config.js
module.exports = {
  content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // ... design tokens
      }
    }
  }
}
```

### PrimeNG 21.0.2
**Purpose**: Enterprise UI component library  
**Why PrimeNG?**
- Comprehensive component set
- Angular-native (not a wrapper)
- Excellent theming support
- Accessibility built-in
- Active development and support

**Components Used**:
- Toast notifications
- Dropdown
- Dialog
- Table
- Form controls

### PrimeIcons 7.0.0
**Purpose**: Icon library  
**Usage**: Consistent iconography across the application

---

## 🧪 Testing

### Vitest 4.0.8
**Purpose**: Unit testing framework  
**Why Vitest?**
- Extremely fast (Vite-powered)
- Jest-compatible API
- Native ESM support
- Great TypeScript support
- Built-in coverage

**Configuration**:
```typescript
// vitest.workspace.ts
export default defineWorkspace([
  'apps/*/vite.config.mts',
  'libs/*/vite.config.mts',
]);
```

### @analogjs/vitest-angular 2.1.2
**Purpose**: Angular testing utilities for Vitest  
**Features**:
- Component testing
- TestBed integration
- Angular-specific matchers

### Cypress 15.8.0
**Purpose**: E2E testing  
**Why Cypress?**
- Modern E2E testing
- Great developer experience
- Visual testing
- Time-travel debugging
- Automatic waiting

**Structure**:
```
apps/
  shell-e2e/
  remote-auth-e2e/
  remote-finance-e2e/
  # ... other e2e projects
```

---

## 📝 Code Quality

### ESLint 9.8.0
**Purpose**: Linting and code quality  
**Configuration**:
- `@nx/eslint-plugin`: Nx-specific rules
- `angular-eslint`: Angular-specific rules
- `typescript-eslint`: TypeScript rules
- `eslint-config-prettier`: Prettier integration

**Key Rules**:
- Enforce dependency constraints
- No unused variables
- Consistent code style
- Angular best practices

### Prettier 3.6.2
**Purpose**: Code formatting  
**Configuration**:
```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

---

## 🔄 State Management

### Angular Signals (Built-in)
**Purpose**: Reactive state management  
**Why Signals?**
- Native to Angular 16+
- Better performance than RxJS for simple state
- Easier to reason about
- Automatic change detection
- Computed values

**Pattern**:
```typescript
export class MyService {
  private readonly _state = signal<State>(initialState);
  
  readonly publicState = computed(() => this._state());
  
  updateState(newState: State): void {
    this._state.set(newState);
  }
}
```

### RxJS 7.8.0
**Purpose**: Reactive programming  
**Use Cases**:
- HTTP requests
- Event streams
- Complex async operations
- Router events

**Pattern**: Use RxJS for async, Signals for sync state

---

## 🌐 HTTP & API

### Angular HttpClient (Built-in)
**Purpose**: HTTP communication  
**Features**:
- Interceptors for auth tokens
- Type-safe requests
- Observable-based
- Error handling

**Pattern**:
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  
  getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`/api/${endpoint}`);
  }
}
```

---

## 🚀 CI/CD

### GitHub Actions
**Purpose**: Continuous integration and deployment  
**Workflows**:
- `ci-shell.yml`: Shell app pipeline
- `ci-remote-auth.yml`: Auth remote pipeline
- `ci-all-remotes.yml`: All remotes pipeline

**Features**:
- Parallel job execution
- Artifact caching
- Affected builds (Nx)
- Environment-based deployments
- Automated testing

---

## 📦 Package Management

### npm 10.8.2+
**Purpose**: Package manager  
**Why npm?**
- Native to Node.js
- Reliable and stable
- Good lockfile support
- Wide ecosystem

**Key Files**:
- `package.json`: Dependencies and scripts
- `package-lock.json`: Locked versions
- `.npmrc`: npm configuration

---

## 🛠️ Development Tools

### Node.js 20.19.x / 22.12.x / 24.x
**Purpose**: JavaScript runtime  
**Recommendation**: Use Node.js 20 LTS for stability

### VS Code (Recommended)
**Extensions**:
- Angular Language Service
- ESLint
- Prettier
- Nx Console
- TypeScript and JavaScript Language Features

### Nx Console
**Purpose**: Visual interface for Nx commands  
**Features**:
- Generate components/services
- Run tasks
- View dependency graph
- Affected commands

---

## 📊 Dependency Graph

```
┌─────────────────────────────────────────────────────────┐
│                    package.json                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  Angular 21 + RxJS + Zone.js                      │ │
│  │  Nx 22 + Webpack 5 + Module Federation            │ │
│  │  Tailwind CSS + PrimeNG + PrimeIcons              │ │
│  │  Vitest + Cypress + ESLint + Prettier             │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
    ┌───────┐        ┌────────┐       ┌─────────┐
    │ Shell │        │Remotes │       │  Libs   │
    └───────┘        └────────┘       └─────────┘
        │                 │                 │
        └─────────────────┴─────────────────┘
                          │
                    Shared Libs
              (models, ui, theme, config)
```

---

## 🔧 Build Configuration

### Production Build Optimizations
- **Tree-shaking**: Remove unused code
- **Minification**: Compress JavaScript and CSS
- **Code splitting**: Separate vendor and app bundles
- **Lazy loading**: Load remotes on-demand
- **Source maps**: For debugging (optional)
- **AOT compilation**: Ahead-of-time compilation

### Development Build Features
- **Hot Module Replacement (HMR)**: Fast refresh
- **Source maps**: Full debugging support
- **Dev server**: Live reload
- **Fast builds**: Incremental compilation

---

## 📈 Performance Considerations

### Bundle Size Optimization
- Standalone components (no NgModules)
- Lazy loading of remotes
- Tree-shaking of unused code
- PrimeNG tree-shakeable imports
- Tailwind CSS purging

### Build Performance
- Nx computation caching
- Parallel builds
- Affected command optimization
- Incremental builds

### Runtime Performance
- Angular signals for reactive state
- OnPush change detection
- Virtual scrolling for large lists
- Lazy loading images
- Service worker (optional)

---

## 🔄 Version Management

### Dependency Updates
```bash
# Check for outdated packages
npm outdated

# Update Nx
npx nx migrate latest

# Update Angular
ng update @angular/core @angular/cli
```

### Version Compatibility Matrix

| Tool | Version | Compatible With |
|------|---------|-----------------|
| Node.js | 20.19.x, 22.12.x, 24.x | All |
| npm | 10.8.2+ | All |
| Angular | 21.0.8+ | Nx 22+ |
| Nx | 22.3.3+ | Angular 21+ |
| TypeScript | 5.9.2 | Angular 21 |
| Webpack | 5.104.1+ | Module Federation |

---

## 🎯 Tool Selection Rationale

### Why This Stack?

1. **Angular**: Enterprise-grade, TypeScript-first, excellent tooling
2. **Nx**: Best monorepo management, enforced boundaries
3. **Module Federation**: Native micro-frontend support
4. **Tailwind CSS**: Rapid UI development, consistent design
5. **PrimeNG**: Enterprise components, accessibility
6. **Vitest**: Fast tests, great DX
7. **Cypress**: Modern E2E, visual testing
8. **Signals**: Modern reactive state, better performance

### Trade-offs Considered

| Decision | Alternative | Why Chosen |
|----------|-------------|------------|
| Nx | Lerna, Turborepo | Better Angular integration, dependency constraints |
| Module Federation | single-spa, iframes | Native, better TypeScript, simpler |
| Vitest | Jest | Faster, better ESM support |
| Tailwind | Styled Components | Utility-first, smaller bundle |
| Signals | NgRx | Simpler for this use case, built-in |

---

## 📚 Further Reading

- [Workspace Structure](./03_WORKSPACE_STRUCTURE.md)
- [Module Federation Setup](./04_MICROFRONTEND_MODULE_FEDERATION.md)
- [Developer Guide](./10_DEVELOPER_GUIDE.md)
