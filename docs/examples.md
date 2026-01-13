# Developer Examples & Cheat Sheet

**Version**: 1.0.0
**Focus**: copy-paste commands

---

## 1. Generating Artifacts

### 1.1 New Feature Library

Create a new feature library for Finance.

```bash
nx g @nx/angular:lib finance-feature-invoicing \
  --directory=libs/finance/feature-invoicing \
  --importPath=@erp/finance/feature-invoicing \
  --tags=scope:finance,type:feature \
  --standalone
```

### 1.2 New UI Component

Create a reusable button in Shared UI.

```bash
nx g @nx/angular:component button \
  --project=shared-ui \
  --export
```

---

## 2. Running Locally

### 2.1 Start Everything

```bash
nx run-many --target=serve --all --parallel
```

_Note: This might be heavy. Prefer starting specific remotes._

### 2.2 Start Shell + Auth Only

```bash
nx serve shell --devRemotes=remote-auth
```

### 2.3 Run Tests Affected by Change

```bash
nx affected:test
```

---

## 3. Code Snippets

### 3.1 Exposing a Remote Module

In `apps/remote-auth/module-federation.config.ts`:

```typescript
const config: ModuleFederationConfig = {
  name: 'remote-auth',
  exposes: {
    './Routes': './src/app/remote-entry/entry.routes.ts',
  },
};
export default config;
```

### 3.2 Consuming a Remote Route

In `apps/shell/src/app/app.routes.ts`:

```typescript
{
  path: 'auth',
  loadChildren: () => loadRemoteModule('remote-auth', './Routes').then(m => m.remoteRoutes)
}
```
