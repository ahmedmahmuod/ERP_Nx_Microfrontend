# Design System

**Comprehensive Design System and Theming**

---

## 🎨 Overview

The ERP system uses a **comprehensive design system** built with:
- **Design Tokens**: CSS variables for consistency
- **Tailwind CSS**: Utility-first styling
- **PrimeNG**: Enterprise UI components
- **Dark Mode**: Full light/dark theme support
- **Accent Tokens**: Per-module theming

---

## 🎯 Design Tokens

### Color System

**File**: `libs/shared/theme/src/lib/styles/global.css`

```css
:root {
  /* Primary Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-active: #1e40af;
  
  /* Secondary Colors */
  --color-secondary: #64748b;
  --color-secondary-hover: #475569;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Text Colors */
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-text-muted: #9ca3af;
  
  /* Background Colors */
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-bg-tertiary: #f3f4f6;
  
  /* Border Colors */
  --color-border: #e5e7eb;
  --color-border-hover: #d1d5db;
}

.dark {
  --color-primary: #3b82f6;
  --color-text: #fafafa;
  --color-text-secondary: #d1d5db;
  --color-bg: #1a1a1a;
  --color-bg-secondary: #2a2a2a;
  --color-border: #404040;
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
  
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Spacing

```css
:root {
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 1rem;      /* 16px */
  --spacing-lg: 1.5rem;    /* 24px */
  --spacing-xl: 2rem;      /* 32px */
  --spacing-2xl: 3rem;     /* 48px */
  --spacing-3xl: 4rem;     /* 64px */
}
```

### Border Radius

```css
:root {
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.5rem;     /* 8px */
  --radius-lg: 0.75rem;    /* 12px */
  --radius-xl: 1rem;       /* 16px */
  --radius-full: 9999px;   /* Pill shape */
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

---

## 🌓 Dark Mode

### Implementation

**Toggle Service**: `apps/shell/src/app/layout/services/layout.service.ts`

```typescript
toggleTheme(): void {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}
```

### Usage in Components

```css
/* Light mode (default) */
.my-component {
  background: var(--color-bg);
  color: var(--color-text);
}

/* Dark mode */
:host-context(.dark) .my-component {
  background: var(--color-bg);  /* Automatically uses dark value */
  color: var(--color-text);
}
```

---

## 🎨 Accent Token System

### Per-Module Theming

Each remote has its own accent color:

```typescript
// libs/shared/theme/src/lib/accent-tokens.ts
export const ACCENT_TOKENS = {
  shell: '#2563eb',      // Blue
  finance: '#10b981',    // Green
  hr: '#f59e0b',         // Amber
  srm: '#8b5cf6',        // Purple
  pm: '#ec4899',         // Pink
  warehouses: '#06b6d4', // Cyan
  auth: '#6366f1',       // Indigo
};

export function applyAccentToken(token: string): void {
  const color = ACCENT_TOKENS[token] || ACCENT_TOKENS.shell;
  document.documentElement.style.setProperty('--accent-primary', color);
}
```

### Automatic Application

```typescript
// NavigationFacadeService applies accent when manifest loads
effect(() => {
  const token = this.accentToken();
  applyAccentToken(token);
});
```

---

## 🧩 Component Library

### Button Component

**Usage**:
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-secondary">Secondary Button</button>
<button class="btn btn-outline">Outline Button</button>
```

**Variants**:
- `btn-primary`: Primary action
- `btn-secondary`: Secondary action
- `btn-outline`: Outlined style
- `btn-ghost`: Minimal style
- `btn-danger`: Destructive action

**Sizes**:
- `btn-sm`: Small
- `btn-md`: Medium (default)
- `btn-lg`: Large

### Card Component

```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Card Title</h3>
  </div>
  <div class="card-body">
    Card content goes here
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Action</button>
  </div>
</div>
```

### Form Controls

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" placeholder="Enter email">
  <span class="form-hint">We'll never share your email</span>
</div>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
/* xs: 0-639px (default) */
/* sm: 640px+ */
@media (min-width: 640px) { }

/* md: 768px+ */
@media (min-width: 768px) { }

/* lg: 1024px+ */
@media (min-width: 1024px) { }

/* xl: 1280px+ */
@media (min-width: 1280px) { }

/* 2xl: 1536px+ */
@media (min-width: 1536px) { }
```

### Responsive Service

```typescript
// libs/shared/ui/src/lib/services/responsive.service.ts
@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  isMobile(): boolean {
    return window.innerWidth < 768;
  }
  
  isTablet(): boolean {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }
  
  isDesktop(): boolean {
    return window.innerWidth >= 1024;
  }
}
```

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance

- **Color Contrast**: Minimum 4.5:1 for normal text
- **Focus Indicators**: Visible focus states
- **Keyboard Navigation**: All interactive elements accessible
- **ARIA Labels**: Proper labeling for screen readers
- **Semantic HTML**: Correct use of HTML5 elements

### Example

```html
<button
  class="btn btn-primary"
  aria-label="Save changes"
  [attr.aria-disabled]="isDisabled"
>
  Save
</button>
```

---

## 🎯 Best Practices

### ✅ DO
- Use design tokens (CSS variables)
- Follow the component library
- Test in both light and dark modes
- Ensure proper contrast ratios
- Use semantic HTML
- Add ARIA labels where needed

### ❌ DON'T
- Hardcode colors or spacing
- Create custom components without tokens
- Ignore dark mode
- Skip accessibility testing
- Use inline styles

---

## 📚 Further Reading

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [PrimeNG Documentation](https://primeng.org)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
