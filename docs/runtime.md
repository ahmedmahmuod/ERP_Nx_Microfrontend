# Runtime Architecture

**Version**: 1.0.0
**Focus**: Browser-side execution flow

---

## 1. Bootstrap Sequence

How the application starts in the browser.

1.  **Index.html**: Loads `main.js` of Shell.
2.  **Manifest Fetch**: Shell fetches `manifest.json` to know where remotes are.
3.  **Shell Init**: Angular Shell application bootstraps.
4.  **Route Config**: Shell sets up Lazy Routes mapped to the Manifest.

```typescript
// Conceptual code in app.routes.ts
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'remote-auth',
        exposedModule: './Routes',
      }).then((m) => m.remoteRoutes),
  },
];
```

---

## 2. Remote Loading & Failure Handling

### 2.1 Lazy Loading

Remotes are **Lazy Loaded**. They are NOT downloaded until the user navigates to their route.

### 2.2 Error Boundaries

Network failures happen. If a Remote is unreachable:

1.  **Catch Error**: The router guard or loading logic catches the Module Federation error.
2.  **Fallback UI**: Show a "Service Unavailable" page within the Shell layout.
3.  **Retry**: Offer a retry button.

---

## 3. Communication Patterns

### 3.1 Shell → Remote

- **Route Params**: Standard Angular Router parameters.
- **Auth Context**: Shell checks Auth state _before_ loading remote routes.

### 3.2 Remote → Shell

- **Events**: Custom Events or a Shared Service (RxJS Subject) in `@erp/shared/data-access`.
- **Navigation**: Remotes operate within the Shell's `Router`. Standard `router.navigate(['/finance'])` works globally.

### 3.3 Remote ↔ Remote

**STRICTLY FORBIDDEN**.
Remotes should not communicate directly.

- **Data Sharing**: Occurs via the Backend/API.
- **State Sharing**: Only via Global Shell State (e.g., User Profile).

---

## 4. Shared Dependencies (Singleton)

To prevent creating multiple instances of Angular (which breaks the app), we configure `shared` in `module-federation.config.ts`.

- **Singleton**: `@angular/core`, `@angular/common`, `@angular/router`, `rxjs`.
- **Strict Version**: If Shell uses Angular 21.0.0 and Remote uses 20.0.0, the build/runtime will warn or fail to ensure stability.
