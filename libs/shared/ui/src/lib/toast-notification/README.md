# Toast Notification Component

Modern toast notification component for the ERP system, built with PrimeNG and custom styling that matches the design system.

## Features

- ✅ **Four Severity Levels**: Success, Info, Warning, Error
- ✅ **Dark Mode Support**: Automatically adapts to light/dark themes
- ✅ **RTL Support**: Full support for Arabic (right-to-left) layouts
- ✅ **Smooth Animations**: Slide-in/out animations with reduced motion support
- ✅ **Responsive Design**: Adapts to mobile and desktop screens
- ✅ **Customizable**: Position, duration, and sticky options
- ✅ **Accessible**: Keyboard navigation and ARIA labels

## Usage

### 1. Add Component to Template

Add the toast component to your app's root template (e.g., in `layout.component.ts` or `app.component.ts`):

```typescript
import { ToastNotificationComponent } from '@erp/shared/ui/primeng-components';

@Component({
  // ...
  imports: [ToastNotificationComponent],
  template: `
    <lib-toast-notification />
    <!-- Your other content -->
  `
})
```

### 2. Inject and Use the Service

```typescript
import { Component, inject } from '@angular/core';
import { ToastNotificationService } from '@erp/shared/ui/primeng-components';

@Component({
  // ...
})
export class MyComponent {
  private toastService = inject(ToastNotificationService);

  showSuccess() {
    this.toastService.success('Success!', 'Your operation completed successfully');
  }

  showError() {
    this.toastService.error('Error!', 'Something went wrong. Please try again.');
  }

  showWarning() {
    this.toastService.warning('Warning', 'Please review your input before proceeding');
  }

  showInfo() {
    this.toastService.info('Information', 'Here is some helpful information');
  }
}
```

### 3. Advanced Options

```typescript
// Custom duration (5 seconds)
this.toastService.success('Saved!', 'Changes saved', {
  life: 5000,
});

// Sticky toast (won't auto-dismiss)
this.toastService.error('Critical Error', 'Manual action required', {
  sticky: true,
});

// Custom position
this.toastService.info('Update Available', 'New version ready', {
  position: 'bottom-right',
});

// Clear all toasts
this.toastService.clear();
```

## API Reference

### ToastNotificationService

#### Methods

- `success(title: string, message: string, options?: ToastOptions): void`
- `info(title: string, message: string, options?: ToastOptions): void`
- `warning(title: string, message: string, options?: ToastOptions): void`
- `error(title: string, message: string, options?: ToastOptions): void`
- `show(severity: 'success' | 'info' | 'warn' | 'error', title: string, message: string, options?: ToastOptions): void`
- `clear(): void`

#### ToastOptions

```typescript
interface ToastOptions {
  life?: number; // Duration in ms (default: 3000)
  sticky?: boolean; // Don't auto-dismiss (default: false)
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center'; // Position on screen (default: 'top-right')
  data?: unknown; // Additional data
}
```

### ToastNotificationComponent

#### Inputs

- `position`: Position of toast container (default: `'top-right'`)
- `life`: Default duration in milliseconds (default: `3000`)

## Styling

The component uses CSS variables from the design system:

- `--color-border-primary`
- `--radius-lg`
- `--shadow-xl`
- `--transition-base`
- `--z-tooltip`

### Severity Colors

| Severity | Light Mode      | Dark Mode       |
| -------- | --------------- | --------------- |
| Success  | Green (#10b981) | Green (#34d399) |
| Info     | Blue (#3b82f6)  | Blue (#60a5fa)  |
| Warning  | Amber (#f59e0b) | Amber (#fbbf24) |
| Error    | Red (#ef4444)   | Red (#f87171)   |

## Examples

### Form Submission

```typescript
async onSubmit() {
  try {
    await this.saveData();
    this.toastService.success('Saved!', 'Form submitted successfully');
  } catch (error) {
    this.toastService.error('Error', 'Failed to save form');
  }
}
```

### File Upload

```typescript
onFileUpload(event: any) {
  const file = event.files[0];

  if (file.size > 5000000) {
    this.toastService.warning(
      'File Too Large',
      'Please upload a file smaller than 5MB'
    );
    return;
  }

  this.toastService.info('Uploading...', 'Please wait');
  // Upload logic...
}
```

### Delete Confirmation

```typescript
onDelete() {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this item?',
    accept: () => {
      this.deleteItem();
      this.toastService.success('Deleted', 'Item removed successfully');
    }
  });
}
```

## Notes

- The component must be added to your app's root template to display toasts
- Toasts automatically stack vertically when multiple are shown
- The service is provided at root level, so it's available throughout the app
- Animations respect the user's `prefers-reduced-motion` setting
