# Enterprise Design System Documentation

**Version**: 1.0.0  
**Status**: Phase 2 - In Progress  
**Last Updated**: 2026-01-13

---

## 🎨 Overview

This document describes the comprehensive, enterprise-grade Design System for the ERP Nx Microfrontend application. The design system is built with Tailwind CSS, PrimeNG, and follows modern UX best practices with full accessibility support.

---

## 📦 Architecture

### Library Structure

```
libs/
├── shared/
│   ├── theme/              # Design tokens, global styles, Tailwind config
│   │   └── src/
│   │       └── lib/
│   │           └── styles/
│   │               └── global.scss
│   ├── ui/                 # Reusable UI components
│   │   └── src/
│   │       └── lib/
│   │           ├── button/
│   │           ├── input/
│   │           ├── card/
│   │           ├── modal/
│   │           ├── alert/
│   │           ├── badge/
│   │           ├── dropdown/
│   │           ├── table/
│   │           └── navigation/
│   └── utils/              # Helper functions and utilities
│       └── src/
│           └── lib/
│               ├── theme.service.ts
│               ├── responsive.utils.ts
│               └── accessibility.utils.ts
```

---

## 🎨 Design Tokens

### Color Palette

#### Primary Colors
- **Primary 500**: `#3b82f6` (Main brand color)
- **Primary Range**: 50-950 (11 shades)
- **Usage**: Primary actions, links, focus states

#### Secondary Colors
- **Secondary 500**: `#a855f7` (Accent color)
- **Secondary Range**: 50-950
- **Usage**: Secondary actions, highlights

#### Semantic Colors
- **Success**: `#22c55e` - Positive actions, confirmations
- **Warning**: `#f59e0b` - Cautions, alerts
- **Danger**: `#ef4444` - Errors, destructive actions
- **Info**: `#06b6d4` - Informational messages

#### Neutral Colors
- **Neutral Range**: 50-950
- **Usage**: Text, borders, backgrounds

### Typography

#### Font Families
- **Sans**: Inter (Primary)
- **Mono**: Fira Code, JetBrains Mono

#### Type Scale
```
xs:   0.75rem / 12px
sm:   0.875rem / 14px
base: 1rem / 16px
lg:   1.125rem / 18px
xl:   1.25rem / 20px
2xl:  1.5rem / 24px
3xl:  1.875rem / 30px
4xl:  2.25rem / 36px
5xl:  3rem / 48px
```

#### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800
- Black: 900

### Spacing Scale

```
xs:  0.25rem / 4px
sm:  0.5rem / 8px
md:  1rem / 16px
lg:  1.5rem / 24px
xl:  2rem / 32px
2xl: 3rem / 48px
3xl: 4rem / 64px
4xl: 6rem / 96px
```

### Border Radius

```
sm:  0.25rem / 4px
md:  0.375rem / 6px
lg:  0.5rem / 8px
xl:  0.75rem / 12px
2xl: 1rem / 16px
full: 9999px
```

### Shadows (Elevation)

```
sm:  Subtle shadow for slight elevation
md:  Default shadow for cards
lg:  Prominent shadow for modals
xl:  Heavy shadow for popovers
2xl: Maximum shadow for overlays
```

---

## 🧩 Component Library

### 1. Button Component

**Variants**:
- `primary` - Main actions
- `secondary` - Secondary actions
- `success` - Positive actions
- `warning` - Caution actions
- `danger` - Destructive actions
- `ghost` - Subtle actions
- `link` - Text-only actions

**Sizes**: `xs`, `sm`, `md`, `lg`, `xl`

**States**: Default, Hover, Active, Focus, Disabled, Loading

**Props**:
```typescript
variant: ButtonVariant = 'primary'
size: ButtonSize = 'md'
type: 'button' | 'submit' | 'reset' = 'button'
disabled: boolean = false
loading: boolean = false
fullWidth: boolean = false
ariaLabel?: string
```

**Usage**:
```html
<erp-button variant="primary" size="md" (clicked)="handleClick()">
  Click Me
</erp-button>

<erp-button variant="danger" [loading]="isLoading">
  Delete
</erp-button>
```

**Accessibility**:
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ ARIA attributes (aria-label, aria-busy, aria-disabled)
- ✅ Focus visible states
- ✅ Screen reader support

---

### 2. Input Component

**Types**: text, email, password, number, tel, url, search

**Variants**: default, error, success

**Features**:
- Label support
- Helper text
- Error messages
- Prefix/suffix icons
- Clear button
- Character counter

**Props**:
```typescript
type: InputType = 'text'
placeholder?: string
label?: string
helperText?: string
errorMessage?: string
disabled: boolean = false
required: boolean = false
maxLength?: number
showCharCount: boolean = false
```

**Accessibility**:
- ✅ Associated labels
- ✅ Error announcements
- ✅ Required field indicators
- ✅ Keyboard navigation

---

### 3. Card Component

**Variants**: default, elevated, outlined, interactive

**Features**:
- Header with title and actions
- Body content area
- Footer for actions
- Hover effects
- Click handlers

**Usage**:
```html
<erp-card variant="elevated">
  <erp-card-header>
    <h3>Card Title</h3>
  </erp-card-header>
  <erp-card-body>
    Content goes here
  </erp-card-body>
  <erp-card-footer>
    <erp-button>Action</erp-button>
  </erp-card-footer>
</erp-card>
```

---

### 4. Modal Component

**Sizes**: sm, md, lg, xl, full

**Features**:
- Backdrop with blur
- Close on escape
- Close on backdrop click
- Scroll locking
- Focus trap
- Animation

**Props**:
```typescript
isOpen: boolean = false
size: ModalSize = 'md'
closeOnBackdrop: boolean = true
closeOnEscape: boolean = true
showCloseButton: boolean = true
```

**Accessibility**:
- ✅ Focus trap
- ✅ Escape key handling
- ✅ ARIA dialog role
- ✅ Screen reader announcements

---

### 5. Alert Component

**Variants**: info, success, warning, danger

**Features**:
- Icon support
- Dismissible
- Action buttons
- Auto-dismiss timer

**Usage**:
```html
<erp-alert variant="success" [dismissible]="true">
  Operation completed successfully!
</erp-alert>
```

---

### 6. Badge Component

**Variants**: primary, secondary, success, warning, danger, neutral

**Sizes**: sm, md, lg

**Features**:
- Dot indicator
- Removable
- Icon support

---

### 7. Dropdown Component

**Features**:
- Single/multi-select
- Search/filter
- Custom templates
- Keyboard navigation
- Virtual scrolling for large lists

**Accessibility**:
- ✅ ARIA combobox
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader support

---

### 8. Table Component

**Features**:
- Sortable columns
- Filterable
- Pagination
- Row selection
- Expandable rows
- Sticky headers
- Responsive (mobile cards)

**Accessibility**:
- ✅ Proper table semantics
- ✅ Column headers
- ✅ Sort announcements
- ✅ Keyboard navigation

---

### 9. Navigation Components

#### Navbar
- Logo area
- Navigation links
- User menu
- Theme toggle
- Responsive mobile menu

#### Sidebar
- Collapsible
- Multi-level navigation
- Active state indicators
- Icons + labels

#### Breadcrumbs
- Auto-generated from routes
- Clickable navigation
- Overflow handling

---

### 10. Form Components

#### Checkbox
- Indeterminate state
- Label support
- Error states

#### Radio
- Group support
- Label support
- Error states

#### Switch/Toggle
- On/off states
- Label support
- Disabled state

#### Select
- Native and custom variants
- Multi-select
- Search
- Grouped options

#### Textarea
- Auto-resize
- Character counter
- Error states

---

## 🌓 Dark Mode

### Implementation

Dark mode is implemented using:
1. CSS class strategy (`.dark` class on root)
2. CSS custom properties for dynamic theming
3. Tailwind's dark mode utilities

### Theme Toggle

```typescript
// Theme Service
class ThemeService {
  toggleTheme(): void
  setTheme(theme: 'light' | 'dark'): void
  getTheme(): 'light' | 'dark'
  initTheme(): void // Reads from localStorage
}
```

### Usage

```html
<button (click)="themeService.toggleTheme()">
  Toggle Theme
</button>
```

### Color Adaptation

All components automatically adapt to dark mode using:
- Tailwind `dark:` variants
- CSS custom properties
- `:host-context(.dark)` selectors

---

## ♿ Accessibility (WCAG 2.1 AA)

### Compliance Checklist

#### Perceivable
- ✅ Color contrast ratios meet WCAG AA (4.5:1 for text)
- ✅ Text alternatives for images
- ✅ Content adaptable to different presentations
- ✅ Distinguishable foreground/background

#### Operable
- ✅ Keyboard accessible (all functionality)
- ✅ Sufficient time for interactions
- ✅ No seizure-inducing content
- ✅ Navigable (skip links, headings, focus order)

#### Understandable
- ✅ Readable text (language attributes)
- ✅ Predictable behavior
- ✅ Input assistance (labels, errors, suggestions)

#### Robust
- ✅ Compatible with assistive technologies
- ✅ Valid HTML/ARIA
- ✅ Semantic markup

### Keyboard Navigation

All interactive elements support:
- **Tab**: Navigate forward
- **Shift+Tab**: Navigate backward
- **Enter/Space**: Activate
- **Escape**: Close/cancel
- **Arrow keys**: Navigate within components

### Screen Reader Support

- Proper ARIA labels
- Live regions for dynamic content
- Role attributes
- State announcements

---

## 📱 Responsive Design

### Breakpoints

```javascript
sm:  640px  // Mobile landscape
md:  768px  // Tablet
lg:  1024px // Desktop
xl:  1280px // Large desktop
2xl: 1536px // Extra large desktop
```

### Mobile-First Approach

All components are designed mobile-first with progressive enhancement:

```html
<!-- Mobile: Stack vertically -->
<!-- Tablet: 2 columns -->
<!-- Desktop: 3 columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  ...
</div>
```

### Touch Targets

Minimum touch target size: **44x44px** (WCAG 2.1 Level AAA)

---

## 🎭 Animation & Transitions

### Principles

1. **Purposeful**: Animations guide attention
2. **Fast**: 150-300ms duration
3. **Natural**: Ease-out curves
4. **Respectful**: Honor `prefers-reduced-motion`

### Animations

```css
fade-in: 300ms ease-in-out
slide-in: 300ms ease-out
slide-up: 300ms ease-out
scale-in: 200ms ease-out
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- Component rendering
- Props validation
- Event emissions
- State management

### Accessibility Tests
- Axe-core integration
- Keyboard navigation
- Screen reader compatibility
- Color contrast

### Visual Regression
- Chromatic/Percy
- Multiple viewports
- Light/dark themes
- All component states

### E2E Tests
- User flows
- Form submissions
- Navigation
- Responsive behavior

---

## 📚 Component Documentation

Each component includes:

1. **Overview**: Purpose and use cases
2. **Props**: All inputs with types and defaults
3. **Events**: All outputs
4. **Examples**: Code samples
5. **Accessibility**: ARIA attributes and keyboard support
6. **Styling**: Customization options
7. **Best Practices**: Usage guidelines

---

## 🚀 Usage in Applications

### Importing Components

```typescript
import { ButtonComponent } from '@erp/shared/ui';
import { ThemeService } from '@erp/shared/utils';

@Component({
  imports: [ButtonComponent],
  // ...
})
export class MyComponent {
  constructor(private theme: ThemeService) {}
}
```

### Importing Styles

```scss
// In app styles.scss
@import '@erp/shared/theme';
```

---

## 🔄 Versioning & Updates

### Semantic Versioning

- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Changelog

All changes documented in `CHANGELOG.md`

---

## 📖 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [PrimeNG Documentation](https://primeng.org)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Guidelines](https://material.io/design)

---

**Design System Status**: 🚧 Phase 2 In Progress  
**Components Implemented**: 10/30  
**Accessibility Compliance**: WCAG 2.1 AA  
**Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
