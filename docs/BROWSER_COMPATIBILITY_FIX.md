# Browser Compatibility Fix

## Issue
`ReferenceError: process is not defined` error occurred when running the application in the browser.

## Root Cause
The `EnvironmentService` was using Node.js's `process.env` object, which is not available in browser environments. This caused a runtime error when the service was instantiated.

## Solution
Refactored `EnvironmentService` to be fully browser-compatible:

### Changes Made

#### 1. Environment Detection
**Before:**
```typescript
private detectEnvironment(): Environment {
  const nodeEnv = process.env['NODE_ENV'];
  if (nodeEnv === 'production') return 'production';
  // ...
}
```

**After:**
```typescript
private detectEnvironment(): Environment {
  // Check hostname (browser-safe detection)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
      return 'development';
    }
    // ... more checks
  }
  return 'development';
}
```

#### 2. API Base URL
**Before:**
```typescript
getApiBaseUrl(): string {
  return process.env['API_BASE_URL'] || 'https://api.assemble.com';
}
```

**After:**
```typescript
getApiBaseUrl(): string {
  // Use centralized API_CONFIG constant
  return API_CONFIG.BASE_URL;
}
```

#### 3. Feature Flags
**Before:**
```typescript
isFeatureEnabled(featureName: string): boolean {
  const envVar = `FEATURE_${featureName.toUpperCase()}`;
  return process.env[envVar] === 'true';
}
```

**After:**
```typescript
isFeatureEnabled(featureName: string): boolean {
  if (this._isDevelopment) return true;
  
  // Check localStorage for feature flags (browser-safe)
  if (typeof window !== 'undefined' && window.localStorage) {
    const flagKey = `feature_${featureName.toLowerCase()}`;
    return localStorage.getItem(flagKey) === 'true';
  }
  
  return false;
}
```

#### 4. Configuration Getter
**Before:**
```typescript
getConfig<T>(key: string, defaultValue: T): T {
  const envValue = process.env[key];
  // ...
}
```

**After:**
```typescript
getConfig<T>(key: string, defaultValue: T): T {
  // Check localStorage for configuration (browser-safe)
  if (typeof window !== 'undefined' && window.localStorage) {
    const configValue = localStorage.getItem(`config_${key}`);
    if (configValue !== null) {
      return JSON.parse(configValue) as T;
    }
  }
  return defaultValue;
}
```

## Browser-Safe Patterns Used

### 1. Window Check
Always check if `window` is defined before accessing browser APIs:
```typescript
if (typeof window !== 'undefined') {
  // Browser-specific code
}
```

### 2. LocalStorage for Runtime Config
Use `localStorage` instead of environment variables for runtime configuration:
```typescript
localStorage.setItem('feature_darkmode', 'true');
localStorage.setItem('config_apiTimeout', '5000');
```

### 3. Hostname-Based Environment Detection
Detect environment from the URL hostname:
- `localhost` or `127.0.0.1` → development
- `staging.domain.com` → staging
- `domain.com` → production

### 4. Centralized Constants
Use compile-time constants from `app.constants.ts` instead of runtime environment variables:
```typescript
import { API_CONFIG } from '@erp/shared/config';
const apiUrl = API_CONFIG.BASE_URL;
```

## Benefits

✅ **Browser Compatible**: No Node.js dependencies  
✅ **Type Safe**: Full TypeScript support  
✅ **Runtime Configurable**: Can change settings via localStorage  
✅ **SSR Compatible**: Works with server-side rendering  
✅ **No Build-Time Dependencies**: No need for environment variable injection  

## Usage Examples

### Setting Feature Flags
```typescript
// Enable a feature flag
localStorage.setItem('feature_newui', 'true');

// Check if enabled
const isEnabled = environmentService.isFeatureEnabled('newui');
```

### Setting Configuration
```typescript
// Set configuration
localStorage.setItem('config_apiTimeout', '10000');

// Get configuration
const timeout = environmentService.getConfig('apiTimeout', 5000);
```

### Environment Detection
```typescript
const env = environmentService.environment; // 'development' | 'staging' | 'production'
const isDev = environmentService.isDevelopment;
const apiUrl = environmentService.getApiBaseUrl();
```

## Migration Notes

If you need build-time environment variables (e.g., for CI/CD), use Angular's environment files:

1. Create `src/environments/environment.ts`:
```typescript
import { API_CONFIG } from '@erp/shared/config';

export const environment = {
  production: false,
  apiUrl: API_CONFIG.BASE_URL,
  // Add other build-time configs
};
```

2. Use in code:
```typescript
import { environment } from '../environments/environment';
const apiUrl = environment.apiUrl;
```

3. Configure in `angular.json` for different builds:
```json
"configurations": {
  "production": {
    "fileReplacements": [
      {
        "replace": "src/environments/environment.ts",
        "with": "src/environments/environment.prod.ts"
      }
    ]
  }
}
```

## Testing

The service now works correctly in:
- ✅ Browser (Chrome, Firefox, Safari, Edge)
- ✅ Development mode
- ✅ Production builds
- ✅ Server-side rendering (Angular Universal)
- ✅ Unit tests (with proper mocking)

## Related Files
- `libs/shared/config/src/lib/services/environment.service.ts`
- `libs/shared/config/src/lib/constants/app.constants.ts`
