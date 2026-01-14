# Shared Configuration Library

## Overview

This library provides centralized configuration management for the entire ERP application following **DRY (Don't Repeat Yourself)**, **SOLID principles**, and **Design Patterns**.

## Purpose

- **Single Source of Truth**: All configuration values are defined in one place
- **Easy Maintenance**: Change configuration from a single location
- **Type Safety**: Full TypeScript support with const assertions
- **Consistency**: Ensures consistent values across all microfrontends
- **Scalability**: Easy to extend with new configuration categories

## Structure

```
libs/shared/config/
├── src/
│   ├── lib/
│   │   ├── constants/
│   │   │   ├── app.constants.ts          # Application-wide constants
│   │   │   ├── branding.constants.ts     # Brand identity & company info
│   │   │   ├── module-federation.constants.ts  # MF configuration
│   │   │   ├── routes.constants.ts       # Route definitions
│   │   │   ├── theme.constants.ts        # Theme & design tokens
│   │   │   └── validation.constants.ts   # Validation rules
│   │   ├── factories/
│   │   │   └── module-federation.factory.ts  # MF config factory
│   │   └── services/
│   │       └── environment.service.ts    # Environment detection
│   └── index.ts                          # Public API
```

## Usage

### Import Configuration

```typescript
import {
  APP_METADATA,
  BRAND,
  ROUTES,
  COLORS,
  VALIDATION_MESSAGES
} from '@erp/shared/config';
```

### Application Metadata

```typescript
import { APP_METADATA, PORTS, APP_URLS } from '@erp/shared/config';

console.log(APP_METADATA.NAME); // 'Assemble ERP'
console.log(PORTS.SHELL); // 4200
console.log(APP_URLS.SHELL); // 'http://localhost:4200'
```

### Branding

```typescript
import { BRAND, COMPANY, DEMO_CREDENTIALS } from '@erp/shared/config';

const appName = BRAND.NAME; // 'Assemble ERP'
const logo = BRAND.LOGO_PATH; // '/assemble-logo.png'
const email = DEMO_CREDENTIALS.EMAIL; // 'admin@assemble.com'
```

### Routes

```typescript
import { AUTH_ROUTES, DASHBOARD_ROUTES } from '@erp/shared/config';

router.navigate([AUTH_ROUTES.LOGIN]); // '/auth/login'
router.navigate([DASHBOARD_ROUTES.BASE]); // '/dashboard'
```

### Theme

```typescript
import { COLORS, FONT_SIZES, SPACING } from '@erp/shared/config';

const primaryColor = COLORS.PRIMARY[500]; // '#3b82f6'
const fontSize = FONT_SIZES.LG; // '1.125rem'
const padding = SPACING.MD; // '1rem'
```

### Validation

```typescript
import { PATTERNS, VALIDATION_MESSAGES, LENGTH_CONSTRAINTS } from '@erp/shared/config';

const emailPattern = PATTERNS.EMAIL;
const errorMsg = VALIDATION_MESSAGES.EMAIL;
const minLength = LENGTH_CONSTRAINTS.PASSWORD.MIN; // 6
```

### Module Federation Factory

```typescript
import { createRemoteConfig, REMOTE_EXPOSES } from '@erp/shared/config';

const config = createRemoteConfig({
  name: 'remoteAuth',
  exposes: {
    [REMOTE_EXPOSES.ROUTES]: 'apps/remote-auth/src/app/remote-entry/entry.routes.ts',
  },
});

export default config;
```

### Environment Service

```typescript
import { EnvironmentService } from '@erp/shared/config';

constructor(private env: EnvironmentService) {}

ngOnInit() {
  if (this.env.isDevelopment) {
    console.log('Running in development mode');
  }
  
  const apiUrl = this.env.getApiBaseUrl();
  const isFeatureEnabled = this.env.isFeatureEnabled('NEW_DASHBOARD');
}
```

## Benefits

### 1. DRY Principle
- No duplicate configuration values
- Change once, apply everywhere
- Reduces maintenance overhead

### 2. SOLID Principles
- **Single Responsibility**: Each constant file has one purpose
- **Open/Closed**: Easy to extend without modifying existing code
- **Dependency Inversion**: Components depend on abstractions (constants)

### 3. Design Patterns
- **Factory Pattern**: Module Federation config factory
- **Singleton Pattern**: Environment service
- **Strategy Pattern**: Environment-based configuration

### 4. Type Safety
- Full TypeScript support
- Const assertions for literal types
- Autocomplete in IDEs

### 5. Maintainability
- Easy to find and update values
- Clear organization
- Self-documenting code

## Configuration Categories

### App Constants
- Application metadata
- Port configuration
- API configuration
- Storage keys
- Pagination settings
- File upload limits
- Toast configuration
- Animation durations
- Z-index layers
- Breakpoints

### Branding Constants
- Brand identity
- Company information
- Social media links
- Demo credentials
- Legal information
- Support links

### Module Federation Constants
- Remote names
- Entry points
- Exposed modules
- Shared libraries
- Port configuration

### Routes Constants
- Base routes
- Auth routes
- Module routes
- Error routes
- Default redirects

### Theme Constants
- Color palette
- Theme modes
- Spacing scale
- Border radius
- Font families
- Font sizes
- Shadows
- Transitions
- Layout dimensions

### Validation Constants
- Regex patterns
- Length constraints
- Error messages
- Numeric constraints
- Date constraints

## Best Practices

1. **Always import from this library** instead of hardcoding values
2. **Use const assertions** (`as const`) for type safety
3. **Group related constants** in the same file
4. **Document complex values** with comments
5. **Keep constants immutable** (readonly/const)
6. **Use descriptive names** for clarity
7. **Follow naming conventions** (UPPER_SNAKE_CASE for constants)

## Adding New Configuration

1. Create or update a constant file in `src/lib/constants/`
2. Export from `src/index.ts`
3. Update this README with usage examples
4. Update dependent code to use the new constants

## Migration Guide

When migrating existing hardcoded values:

1. Identify the hardcoded value
2. Find or create appropriate constant
3. Import the constant
4. Replace hardcoded value with constant
5. Test thoroughly

## Examples

### Before (Hardcoded)
```typescript
const appName = 'Assemble ERP';
const port = 4200;
const loginRoute = '/auth/login';
```

### After (Using Config)
```typescript
import { APP_METADATA, PORTS, AUTH_ROUTES } from '@erp/shared/config';

const appName = APP_METADATA.NAME;
const port = PORTS.SHELL;
const loginRoute = AUTH_ROUTES.LOGIN;
```

## Support

For questions or issues, please contact the development team or create an issue in the repository.
