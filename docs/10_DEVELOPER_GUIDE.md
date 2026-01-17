# Developer Guide

**Deep Dive for Developers**

---

## 🎯 Architecture Deep Dive

### Why This Architecture?

This system uses **micro-frontends** to achieve:
- **Independent deployment**: Each module can deploy separately
- **Team autonomy**: Teams work independently
- **Technology flexibility**: Different teams can use different approaches
- **Scalability**: Easy to add new modules

### Key Design Decisions

1. **Shell + Remotes Pattern**: Shell orchestrates, remotes implement features
2. **Manifest-Driven Navigation**: Remotes control their own menus
3. **Signal-Based State**: Modern Angular approach for reactive state
4. **Strict Boundaries**: Enforced via Nx tags and linting

---

## 🏗️ Adding a New Remote

### Step 1: Generate the Remote

```bash
npx nx g @nx/angular:remote remote-inventory \
  --host=shell \
  --port=4207 \
  --style=css
```

### Step 2: Configure Module Federation

**File**: `apps/remote-inventory/module-federation.config.ts`

```typescript
const config = {
  name: 'remoteInventory',
  exposes: {
    './Routes': './src/app/remote-entry/entry.routes.ts',
    './Manifest': './src/app/remote-entry/manifest.ts',
  },
  shared: (libraryName: string, defaultConfig: any) => {
    if (libraryName.startsWith('@angular/')) {
      return { ...defaultConfig, singleton: true, strictVersion: false };
    }
    return defaultConfig;
  },
};
export default config;
```

### Step 3: Create Routes

**File**: `apps/remote-inventory/src/app/remote-entry/entry.routes.ts`

```typescript
import { Route } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';

export const remoteRoutes: Route[] = [
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];
```

### Step 4: Create Manifest

**File**: `apps/remote-inventory/src/app/remote-entry/manifest.ts`

```typescript
import { NavigationManifest } from '@erp/shared/models';

export const remoteManifest: NavigationManifest = {
  appId: 'inventory',
  appName: 'Inventory',
  sidebarTitle: 'Inventory Module',
  accentToken: 'inventory',
  menuItems: [
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/inventory',
    },
  ],
  searchKeywords: ['inventory', 'stock'],
};
```

### Step 5: Register in Shell

**File**: `apps/shell/module-federation.config.ts`

```typescript
const config = {
  name: 'shell',
  remotes: [
    'remoteAuth',
    'remoteFinance',
    // ... existing remotes
    'remoteInventory', // Add new remote
  ],
  // ...
};
```

**File**: `apps/shell/src/app/core/config/remote-registry.config.ts`

```typescript
export const REMOTE_REGISTRY: Record<string, RemoteConfig> = {
  // ... existing remotes
  inventory: {
    appId: 'inventory',
    remoteName: 'remoteInventory',
    routesKey: './Routes',
    manifestKey: './Manifest',
    displayName: 'Inventory',
  },
};
```

**File**: `apps/shell/src/app/app.routes.ts`

```typescript
{
  path: 'inventory',
  loadChildren: () =>
    loadRemoteModule('remoteInventory', './Routes')
      .then((m) => m.remoteRoutes)
      .catch(() => remoteFallbackRoutes),
},
```

### Step 6: Add Accent Token

**File**: `libs/shared/theme/src/lib/accent-tokens.ts`

```typescript
export const ACCENT_TOKENS = {
  // ... existing tokens
  inventory: '#14b8a6', // Teal
};
```

---

## 📚 Creating a New Feature Library

### Generate the Library

```bash
npx nx g @nx/angular:library feature-products \
  --directory=libs/inventory/feature-products \
  --tags=scope:inventory,type:feature \
  --standalone=true
```

### Structure

```
libs/inventory/feature-products/
├── src/
│   ├── lib/
│   │   ├── products-list/
│   │   │   ├── products-list.component.ts
│   │   │   ├── products-list.component.html
│   │   │   └── products-list.component.css
│   │   └── product-detail/
│   └── index.ts
```

### Export from Index

**File**: `libs/inventory/feature-products/src/index.ts`

```typescript
export * from './lib/products-list/products-list.component';
export * from './lib/product-detail/product-detail.component';
```

### Use in Remote

```typescript
import { ProductsListComponent } from '@erp/inventory/feature-products';

export const remoteRoutes: Route[] = [
  { path: 'products', component: ProductsListComponent },
];
```

---

## 🎨 Creating UI Components

### Generate Component

```bash
npx nx g @nx/angular:component button \
  --project=shared-ui \
  --standalone=true \
  --changeDetection=OnPush \
  --export=true
```

### Component Structure

```typescript
import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'erp-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="buttonClasses()"
      [disabled]="disabled()"
      (click)="handleClick()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      padding: var(--spacing-md);
      border-radius: var(--radius-md);
      font-weight: var(--font-medium);
      transition: all 0.2s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly disabled = input<boolean>(false);
  readonly clicked = output<void>();
  
  readonly buttonClasses = computed(() => {
    return `btn btn-${this.variant()}`;
  });
  
  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
```

### Export and Use

**Export**:
```typescript
// libs/shared/ui/src/index.ts
export * from './lib/components/button/button.component';
```

**Use**:
```typescript
import { ButtonComponent } from '@erp/shared/ui';

@Component({
  imports: [ButtonComponent],
  template: `
    <erp-button variant="primary" (clicked)="save()">
      Save
    </erp-button>
  `
})
```

---

## 🔧 Services and State Management

### Creating a Service

```bash
npx nx g @nx/angular:service inventory \
  --project=inventory-data-access
```

### Service Pattern with Signals

```typescript
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface InventoryState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  
  private readonly _state = signal<InventoryState>({
    items: [],
    loading: false,
    error: null,
  });
  
  // Public computed signals
  readonly items = computed(() => this._state().items);
  readonly loading = computed(() => this._state().loading);
  readonly error = computed(() => this._state().error);
  
  async loadItems(): Promise<void> {
    this._state.update(s => ({ ...s, loading: true, error: null }));
    
    try {
      const items = await firstValueFrom(
        this.http.get<Product[]>('/api/inventory')
      );
      this._state.update(s => ({ ...s, items, loading: false }));
    } catch (error) {
      this._state.update(s => ({
        ...s,
        loading: false,
        error: 'Failed to load items'
      }));
    }
  }
}
```

---

## 🧪 Testing

### Unit Testing Components

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
    
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit clicked event', () => {
    let clicked = false;
    component.clicked.subscribe(() => clicked = true);
    
    component.handleClick();
    
    expect(clicked).toBe(true);
  });
});
```

### Testing Services

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';

describe('InventoryService', () => {
  let service: InventoryService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService],
    });
    
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should load items', async () => {
    const mockItems = [{ id: 1, name: 'Item 1' }];
    
    service.loadItems();
    
    const req = httpMock.expectOne('/api/inventory');
    req.flush(mockItems);
    
    expect(service.items()).toEqual(mockItems);
  });
});
```

---

## 🎯 Best Practices

### Component Design
- Use standalone components
- OnPush change detection
- Signals for reactive state
- Input/output for communication
- Keep components small and focused

### Service Design
- Injectable with providedIn: 'root'
- Signal-based state
- Clear public API
- Error handling
- Type safety

### Code Organization
- One component per file
- Colocate tests with code
- Use barrel exports (index.ts)
- Follow naming conventions
- Keep files under 300 lines

### Performance
- Lazy load routes
- OnPush change detection
- Virtual scrolling for large lists
- Optimize images
- Code splitting

---

## 🔍 Debugging

### Enable Logging

```typescript
// In NavigationFacadeService
private readonly enableLogging = true;
```

### Browser DevTools

- **Network Tab**: Check remote loading
- **Console**: View logs and errors
- **Angular DevTools**: Inspect component tree

### Nx Commands

```bash
# View dependency graph
npx nx graph

# Check affected projects
npx nx affected:graph

# Run specific target
npx nx run shell:serve
```

---

## 📚 Further Reading

- [Architecture Guide](./01_ARCHITECTURE.md)
- [Workspace Structure](./03_WORKSPACE_STRUCTURE.md)
- [Module Federation](./04_MICROFRONTEND_MODULE_FEDERATION.md)
- [Troubleshooting](./11_TROUBLESHOOTING.md)
