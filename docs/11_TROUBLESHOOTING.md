# Troubleshooting Guide

**Common Issues and Solutions**

---

## 🔧 Module Federation Issues

### Remote Not Loading

**Symptom**: Remote shows "Remote Unavailable" message

**Causes**:
1. Remote server not running
2. Wrong port configuration
3. CORS issues
4. Network connectivity

**Solutions**:

```bash
# Check if remote is running
npx nx serve remoteFinance

# Verify port in browser
http://localhost:4202/remoteEntry.js

# Check module-federation.config.ts
# Ensure remote name matches
```

### Shared Dependency Version Mismatch

**Symptom**: Runtime errors about multiple Angular instances

**Solution**:
```typescript
// Ensure singleton: true in module-federation.config.ts
shared: (libraryName, defaultConfig) => {
  if (libraryName.startsWith('@angular/')) {
    return {
      ...defaultConfig,
      singleton: true,        // Critical!
      strictVersion: false,
      requiredVersion: 'auto',
    };
  }
  return defaultConfig;
}
```

### RemoteEntry.js 404 Error

**Symptom**: Browser shows 404 for remoteEntry.js

**Causes**:
1. Remote not built
2. Wrong URL
3. Port conflict

**Solutions**:
```bash
# Rebuild remote
npx nx build remoteFinance

# Check dev server
npx nx serve remoteFinance

# Verify URL in browser
http://localhost:4202/remoteEntry.js
```

---

## 🚀 Build Issues

### TypeScript Errors

**Symptom**: Build fails with TS errors

**Solutions**:
```bash
# Check TypeScript version
npx tsc --version

# Verify tsconfig.base.json paths
# Ensure all imports use path aliases

# Clear Nx cache
npx nx reset

# Rebuild
npx nx build shell
```

### Circular Dependency Detected

**Symptom**: Build warning about circular dependencies

**Solution**:
```bash
# Use Nx graph to visualize
npx nx graph

# Identify the cycle
# Refactor to break the cycle
# Usually by extracting shared code to a new lib
```

### Out of Memory

**Symptom**: Build fails with "JavaScript heap out of memory"

**Solution**:
```bash
# Increase Node memory
export NODE_OPTIONS="--max-old-space-size=8192"

# Or in package.json scripts
"build": "NODE_OPTIONS=--max-old-space-size=8192 nx build shell"
```

---

## 🧪 Testing Issues

### Tests Failing After Upgrade

**Symptom**: Tests pass locally but fail in CI

**Solutions**:
```bash
# Clear all caches
npx nx reset
rm -rf node_modules
npm install

# Run tests with coverage
npx nx test shell --coverage

# Check for environment differences
# Ensure Node versions match
```

### Component Tests Timing Out

**Symptom**: Tests timeout waiting for async operations

**Solution**:
```typescript
// Use fakeAsync and tick
import { fakeAsync, tick } from '@angular/core/testing';

it('should load data', fakeAsync(() => {
  component.loadData();
  tick();
  expect(component.data()).toBeDefined();
}));
```

---

## 🎨 Styling Issues

### Dark Mode Not Working

**Symptom**: Dark mode toggle doesn't change theme

**Solutions**:
```typescript
// Check if 'dark' class is added to <html>
const html = document.documentElement;
console.log(html.classList.contains('dark'));

// Verify CSS variables are defined
// Check global.css in libs/shared/theme

// Ensure :host-context(.dark) is used
:host-context(.dark) .my-element {
  background: var(--color-bg);
}
```

### Tailwind Classes Not Applied

**Symptom**: Tailwind classes don't work

**Solutions**:
```javascript
// Check tailwind.config.js content paths
module.exports = {
  content: [
    './apps/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  // ...
};

// Rebuild
npx nx build shell
```

---

## 🔒 Authentication Issues

### Infinite Redirect Loop

**Symptom**: App keeps redirecting between login and dashboard

**Solution**:
```typescript
// Check auth guard logic
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Prevent redirect loop
  if (state.url === '/auth/login') {
    return true;
  }
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/auth/login']);
  return false;
};
```

### Token Expiration Not Handled

**Symptom**: User stays logged in after token expires

**Solution**:
```typescript
// Implement token refresh or logout
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Token expired, logout
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
```

---

## 🌐 Routing Issues

### Route Not Found

**Symptom**: Navigating to route shows 404

**Solutions**:
```typescript
// Check app.routes.ts
// Ensure route is defined

// For remote routes, check:
// 1. Remote is in module-federation.config.ts
// 2. Route is in REMOTE_REGISTRY
// 3. loadRemoteModule is configured correctly

// Check browser console for errors
```

### Active Route Not Highlighted

**Symptom**: Sidebar doesn't highlight active route

**Solution**:
```typescript
// Check SidebarFacadeService.isRouteActive()
// Ensure route matching logic is correct

// For nested routes, use prefix matching
return activeRoute.startsWith(itemRoute);
```

---

## 📦 Dependency Issues

### npm install Fails

**Symptom**: npm install errors

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still failing, check Node version
node --version  # Should be 20.x, 22.x, or 24.x
```

### Peer Dependency Warnings

**Symptom**: npm warns about peer dependencies

**Solution**:
```bash
# Usually safe to ignore if versions are close
# Or install the specific version requested

npm install @angular/core@21.0.8
```

---

## 🚀 Performance Issues

### Slow Initial Load

**Symptom**: App takes long to load

**Solutions**:
1. Enable lazy loading for remotes
2. Optimize bundle size
3. Use production build
4. Enable gzip compression
5. Use CDN for static assets

```bash
# Analyze bundle size
npx nx build shell --configuration=production --stats-json
npx webpack-bundle-analyzer dist/apps/shell/stats.json
```

### Memory Leaks

**Symptom**: App slows down over time

**Solutions**:
```typescript
// Unsubscribe from observables
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.data$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {});
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// Or use async pipe in templates
```

---

## 🔍 Debugging Tips

### Enable Verbose Logging

```typescript
// In services
private readonly enableLogging = true;

private log(message: string, data?: any): void {
  if (this.enableLogging) {
    console.log(`[ServiceName] ${message}`, data);
  }
}
```

### Use Angular DevTools

1. Install Angular DevTools extension
2. Open DevTools
3. Navigate to Angular tab
4. Inspect component tree and state

### Network Debugging

1. Open Browser DevTools → Network tab
2. Filter by "JS" to see remote loading
3. Check for failed requests
4. Verify response codes

### Nx Commands

```bash
# View dependency graph
npx nx graph

# Check what's affected by changes
npx nx affected:graph

# Clear Nx cache
npx nx reset

# Run with verbose logging
npx nx serve shell --verbose
```

---

## 🆘 Getting Help

### Check Documentation
1. Read relevant docs in `/docs`
2. Check Angular documentation
3. Review Nx documentation
4. Search Module Federation docs

### Community Resources
- Stack Overflow
- Angular Discord
- Nx Community Slack
- GitHub Issues

### Internal Support
- Contact your team lead
- Check internal wiki
- Review code comments
- Ask in team chat

---

## 📋 Common Commands

```bash
# Development
npx nx serve shell
npx nx serve shell --devRemotes=remoteFinance

# Building
npx nx build shell --configuration=production
npx nx run-many --target=build --all

# Testing
npx nx test shell
npx nx affected --target=test

# Linting
npx nx lint shell
npx nx affected --target=lint

# Cleaning
npx nx reset
rm -rf node_modules dist .nx

# Dependency Graph
npx nx graph
npx nx affected:graph
```

---

## 📚 Further Reading

- [Architecture Guide](./01_ARCHITECTURE.md)
- [Module Federation](./04_MICROFRONTEND_MODULE_FEDERATION.md)
- [Developer Guide](./10_DEVELOPER_GUIDE.md)
