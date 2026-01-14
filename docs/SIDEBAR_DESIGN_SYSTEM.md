# Sidebar Design System

## Overview
This document describes the design system variables used for the sidebar component. All colors and values are centralized in `libs/shared/theme/src/lib/styles/global.scss`.

## Design System Variables

### Sidebar Structure
```scss
--sidebar-width: 16rem;                    // Expanded width
--sidebar-collapsed-width: 4rem;           // Collapsed width
--sidebar-bg: linear-gradient(...);        // Background gradient
--sidebar-header-bg: #ffffff;              // Header background
--sidebar-border: #e5e7eb;                 // Border color
--sidebar-shadow: 2px 0 8px rgba(...);     // Shadow
```

### Navigation Items
```scss
// Normal State
--nav-item-color: #6b7280;                 // Text color
--nav-item-hover-bg: #f3f4f6;              // Hover background
--nav-item-hover-color: #111827;           // Hover text

// Active State
--nav-item-active-bg: linear-gradient(...);// Active background
--nav-item-active-color: #2563eb;          // Active text
--nav-item-active-border: #3b82f6;         // Active left border
--nav-item-active-icon: #3b82f6;           // Active icon color
```

### Logo & Branding
```scss
--logo-text-color: #5558a0;                // Logo text color (Assemble purple)
```

### Badges
```scss
--badge-primary-bg: #dbeafe;               // Badge background
--badge-primary-color: #1e40af;            // Badge text
```

### Buttons & Controls
```scss
--btn-bg: #f3f4f6;                         // Button background
--btn-color: #6b7280;                      // Button text
--btn-hover-bg: #e5e7eb;                   // Button hover background
--btn-hover-color: #111827;                // Button hover text
--btn-border: #e5e7eb;                     // Button border
--btn-hover-border: #2563eb;               // Button hover border
```

### Scrollbar
```scss
--scrollbar-thumb: #d1d5db;                // Scrollbar thumb color
```

## Dark Mode Overrides

All variables are automatically overridden in dark mode via the `.dark` class:

### Dark Mode Colors
```scss
.dark {
  // Sidebar
  --sidebar-bg: linear-gradient(180deg, #1f2937 0%, #111827 100%);
  --sidebar-header-bg: #1f2937;
  --sidebar-border: #374151;
  --sidebar-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
  
  // Navigation
  --nav-item-color: #9ca3af;
  --nav-item-hover-bg: #374151;
  --nav-item-hover-color: #f3f4f6;
  --nav-item-active-bg: linear-gradient(90deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%);
  --nav-item-active-color: #60a5fa;
  --nav-item-active-border: #60a5fa;
  --nav-item-active-icon: #60a5fa;
  
  // Logo
  --logo-text-color: #8083c8;
  
  // Badge
  --badge-primary-bg: #1e3a8a;
  --badge-primary-color: #93c5fd;
  
  // Buttons
  --btn-bg: #374151;
  --btn-color: #9ca3af;
  --btn-hover-bg: #4b5563;
  --btn-hover-color: #f3f4f6;
  --btn-border: #4b5563;
  --btn-hover-border: #3b82f6;
  
  // Scrollbar
  --scrollbar-thumb: #4b5563;
}
```

## Usage in Components

### Example: Using Design System Variables
```typescript
// ❌ BAD - Hardcoded colors
styles: [`
  .sidebar {
    background: #ffffff;
    border: 1px solid #e5e7eb;
  }
`]

// ✅ GOOD - Using design system variables
styles: [`
  .sidebar {
    background: var(--sidebar-header-bg);
    border: 1px solid var(--sidebar-border);
  }
`]
```

### Sidebar Component Example
```scss
.sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-border);
  box-shadow: var(--sidebar-shadow);
}

.nav-item {
  color: var(--nav-item-color);
}

.nav-item:hover {
  background-color: var(--nav-item-hover-bg);
  color: var(--nav-item-hover-color);
}

.nav-item.active {
  background: var(--nav-item-active-bg);
  color: var(--nav-item-active-color);
  border-left-color: var(--nav-item-active-border);
}

.nav-item.active .nav-icon {
  color: var(--nav-item-active-icon);
}
```

## Benefits

1. **Single Source of Truth**: All colors defined in one place
2. **Easy Theme Changes**: Modify variables, not components
3. **Automatic Dark Mode**: Variables automatically switch
4. **Consistency**: Same colors used across all components
5. **Maintainability**: Easy to update and scale
6. **Type Safety**: CSS custom properties with fallbacks

## Modification Guide

### To Change a Color
1. Open `libs/shared/theme/src/lib/styles/global.scss`
2. Find the variable (e.g., `--nav-item-active-color`)
3. Update the value
4. Changes apply automatically to all components

### To Add a New Variable
1. Add to `:root` for light mode
2. Add override in `.dark` for dark mode
3. Document in this file
4. Use in components with `var(--variable-name)`

## Color Palette Reference

### Light Mode
- **Primary Blue**: #3b82f6, #2563eb
- **Gray Scale**: #6b7280, #9ca3af, #e5e7eb, #f3f4f6
- **Assemble Purple**: #5558a0
- **White**: #ffffff, #fafafa

### Dark Mode
- **Primary Blue**: #60a5fa, #3b82f6
- **Gray Scale**: #9ca3af, #6b7280, #4b5563, #374151, #1f2937, #111827
- **Assemble Purple**: #8083c8

## Next Steps

- [ ] Refactor sidebar component to use all variables
- [ ] Refactor header component to use variables
- [ ] Refactor footer component to use variables
- [ ] Create shared component library with design system
- [ ] Add design tokens for spacing, typography, shadows
