# 🎯 Professional Toast Service - Complete Guide

**Location**: `libs/shared/ui/src/lib/services/toast.service.ts`  
**Status**: ✅ **Production Ready**  
**Principles**: SOLID, DRY, Clean Architecture

---

## 📚 Table of Contents

1. [Overview](#overview)
2. [Design Patterns](#design-patterns)
3. [Usage Examples](#usage-examples)
4. [API Reference](#api-reference)
5. [Best Practices](#best-practices)

---

## 🎯 Overview

### What is ToastService?

A **professional, reusable, enterprise-grade** toast notification service that:

✅ Follows SOLID principles  
✅ Provides pre-configured toast methods  
✅ Supports custom configurations  
✅ Includes domain-specific helpers (auth, validation, CRUD, network)  
✅ Type-safe with TypeScript  
✅ Fully tested and documented  

### Why Use It?

**Before** (❌ Bad):
```typescript
// Scattered, inconsistent toast calls
this.messageService.add({
  severity: 'success',
  summary: 'Login Successful',
  detail: 'Welcome to Assemble ERP',
  life: 2000
});
```

**After** (✅ Good):
```typescript
// Clean, semantic, reusable
this.toast.auth.loginSuccess();
```

---

## 🏗️ Design Patterns

### 1. **Single Responsibility Principle (SRP)**
Each method has ONE clear purpose:
```typescript
success()   // Show success toast
error()     // Show error toast
warning()   // Show warning toast
info()      // Show info toast
```

### 2. **Open/Closed Principle (OCP)**
Open for extension, closed for modification:
```typescript
// Extend with domain-specific methods
auth.loginSuccess()
crud.createSuccess()
network.offline()
```

### 3. **Dependency Inversion Principle (DIP)**
Depends on abstractions (MessageService interface):
```typescript
private readonly messageService = inject(MessageService);
```

### 4. **Facade Pattern**
Simplifies complex PrimeNG MessageService API:
```typescript
// Complex
this.messageService.add({ severity, summary, detail, life, sticky, closable });

// Simple
this.toast.success('Done!', 'Task completed');
```

### 5. **Builder Pattern**
Fluent, chainable configuration:
```typescript
this.toast.show({
  severity: 'success',
  summary: 'Custom',
  detail: 'Message',
  life: 5000,
  sticky: false
});
```

---

## 💡 Usage Examples

### Basic Usage

```typescript
import { Component, inject } from '@angular/core';
import { ToastService } from '@erp/shared/ui';

@Component({
  selector: 'app-example',
  template: `
    <p-toast position="top-center" />
    <button (click)="showSuccess()">Success</button>
  `
})
export class ExampleComponent {
  private readonly toast = inject(ToastService);
  
  showSuccess() {
    this.toast.success('Success!', 'Operation completed');
  }
}
```

### Authentication Examples

```typescript
// Login success
this.toast.auth.loginSuccess('Ahmed');
// Output: "Login Successful - Welcome back, Ahmed!"

// Login error
this.toast.auth.loginError();
// Output: "Login Failed - Invalid email or password"

// Logout
this.toast.auth.logoutSuccess();
// Output: "Logged Out - You have been successfully logged out"

// Session expired
this.toast.auth.sessionExpired();
// Output: "Session Expired - Please log in again"

// Registration success
this.toast.auth.registrationSuccess();
// Output: "Registration Successful - Your account has been created"
```

### Validation Examples

```typescript
// Required field
this.toast.validation.required('Email');
// Output: "Validation Error - Email is required"

// Invalid input
this.toast.validation.invalid('Phone number');
// Output: "Invalid Input - Please enter a valid Phone number"

// Min length
this.toast.validation.minLength('Password', 8);
// Output: "Validation Error - Password must be at least 8 characters"

// Max length
this.toast.validation.maxLength('Description', 500);
// Output: "Validation Error - Description must not exceed 500 characters"
```

### CRUD Examples

```typescript
// Create
this.toast.crud.createSuccess('Employee');
// Output: "Created Successfully - Employee has been created"

// Update
this.toast.crud.updateSuccess('Product');
// Output: "Updated Successfully - Product has been updated"

// Delete
this.toast.crud.deleteSuccess('Order');
// Output: "Deleted Successfully - Order has been deleted"

// Errors
this.toast.crud.createError('Invoice');
this.toast.crud.updateError('Customer');
this.toast.crud.deleteError('Item');
```

### Network Examples

```typescript
// Offline
this.toast.network.offline();
// Output: "No Internet Connection - Please check your network" (sticky)

// Online
this.toast.network.online();
// Output: "Connection Restored - You are back online"

// Server error
this.toast.network.serverError();
// Output: "Server Error - Unable to connect to server"

// Timeout
this.toast.network.timeout();
// Output: "Request Timeout - The request took too long"
```

### Custom Toast

```typescript
// Full control
this.toast.show({
  severity: 'warn',
  summary: 'Custom Warning',
  detail: 'This is a custom message',
  life: 5000,
  sticky: false,
  closable: true,
  key: 'custom-toast'
});

// Clear specific toast
this.toast.clear('custom-toast');

// Clear all toasts
this.toast.clear();
```

---

## 📖 API Reference

### Core Methods

#### `success(summary: string, detail?: string, life?: number): void`
Show a success toast (green).

**Parameters**:
- `summary` - Main message (required)
- `detail` - Additional details (optional)
- `life` - Duration in ms (default: 3000)

**Example**:
```typescript
this.toast.success('Saved!', 'Your changes have been saved', 2000);
```

---

#### `error(summary: string, detail?: string, life?: number): void`
Show an error toast (red).

**Parameters**:
- `summary` - Main message (required)
- `detail` - Additional details (optional)
- `life` - Duration in ms (default: 4000)

**Example**:
```typescript
this.toast.error('Failed!', 'Unable to save changes');
```

---

#### `warning(summary: string, detail?: string, life?: number): void`
Show a warning toast (orange).

**Parameters**:
- `summary` - Main message (required)
- `detail` - Additional details (optional)
- `life` - Duration in ms (default: 3000)

**Example**:
```typescript
this.toast.warning('Warning!', 'Please review your input');
```

---

#### `info(summary: string, detail?: string, life?: number): void`
Show an info toast (blue).

**Parameters**:
- `summary` - Main message (required)
- `detail` - Additional details (optional)
- `life` - Duration in ms (default: 3000)

**Example**:
```typescript
this.toast.info('Info', 'New features available');
```

---

### Domain-Specific Methods

#### Authentication (`auth`)
- `loginSuccess(userName?: string)` - Login success message
- `loginError()` - Login failure message
- `logoutSuccess()` - Logout confirmation
- `sessionExpired()` - Session expiration warning
- `registrationSuccess()` - Registration success
- `registrationError()` - Registration failure

#### Validation (`validation`)
- `required(fieldName?: string)` - Required field error
- `invalid(fieldName?: string)` - Invalid input error
- `minLength(fieldName, minLength)` - Min length error
- `maxLength(fieldName, maxLength)` - Max length error

#### CRUD (`crud`)
- `createSuccess(entityName)` - Create success
- `updateSuccess(entityName)` - Update success
- `deleteSuccess(entityName)` - Delete success
- `createError(entityName)` - Create failure
- `updateError(entityName)` - Update failure
- `deleteError(entityName)` - Delete failure

#### Network (`network`)
- `offline()` - No internet connection (sticky)
- `online()` - Connection restored
- `serverError()` - Server error
- `timeout()` - Request timeout

---

## ✅ Best Practices

### 1. Use Semantic Methods

**❌ Don't**:
```typescript
this.toast.success('Login Successful', 'Welcome to Assemble ERP');
```

**✅ Do**:
```typescript
this.toast.auth.loginSuccess();
```

### 2. Inject Once, Use Everywhere

**❌ Don't**:
```typescript
// Injecting in every method
showToast() {
  const toast = inject(ToastService);
  toast.success('Done');
}
```

**✅ Do**:
```typescript
// Inject once in constructor
export class MyComponent {
  private readonly toast = inject(ToastService);
  
  showToast() {
    this.toast.success('Done');
  }
}
```

### 3. Add Toast Component to Template

**Required**:
```typescript
@Component({
  template: `
    <p-toast position="top-center" />
    <!-- Your content -->
  `
})
```

### 4. Handle Errors Gracefully

**✅ Good**:
```typescript
try {
  await this.saveData();
  this.toast.success('Saved!', 'Data saved successfully');
} catch (error) {
  this.toast.error('Failed!', 'Unable to save data');
  console.error(error);
}
```

### 5. Use Appropriate Durations

```typescript
// Quick confirmations (2s)
this.toast.success('Saved!', 'Done', 2000);

// Standard messages (3s)
this.toast.info('Info', 'Something to know', 3000);

// Errors (4s - longer to read)
this.toast.error('Error!', 'Something went wrong', 4000);

// Critical (sticky - manual dismiss)
this.toast.show({
  severity: 'error',
  summary: 'Critical Error',
  detail: 'Please contact support',
  sticky: true
});
```

---

## 🎨 Customization

### Custom Position

```typescript
// In your component template
<p-toast position="bottom-right" />
<p-toast position="top-left" />
<p-toast position="center" />
```

### Custom Styling

```scss
// In your global styles
::ng-deep .p-toast {
  .p-toast-message-success {
    background-color: #10b981;
  }
  
  .p-toast-message-error {
    background-color: #ef4444;
  }
}
```

---

## 📊 Complete Example

```typescript
import { Component, inject } from '@angular/core';
import { ToastService } from '@erp/shared/ui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ToastModule],
  providers: [MessageService],
  template: `
    <p-toast position="top-center" />
    
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="name" required />
      <button type="submit">Save</button>
    </form>
  `
})
export class EmployeeFormComponent {
  private readonly toast = inject(ToastService);
  
  name = '';
  
  async onSubmit() {
    // Validation
    if (!this.name) {
      this.toast.validation.required('Name');
      return;
    }
    
    if (this.name.length < 3) {
      this.toast.validation.minLength('Name', 3);
      return;
    }
    
    // Save
    try {
      await this.saveEmployee();
      this.toast.crud.createSuccess('Employee');
      this.resetForm();
    } catch (error) {
      if (error.status === 500) {
        this.toast.network.serverError();
      } else {
        this.toast.crud.createError('Employee');
      }
    }
  }
  
  async saveEmployee() {
    // API call
  }
  
  resetForm() {
    this.name = '';
  }
}
```

---

## 🎯 Summary

### Key Benefits

✅ **Reusable** - Use anywhere in the app  
✅ **Type-safe** - Full TypeScript support  
✅ **Consistent** - Same UX everywhere  
✅ **Maintainable** - Single source of truth  
✅ **Testable** - Easy to mock and test  
✅ **Scalable** - Extend with new domains  
✅ **Professional** - Enterprise-grade quality  

### SOLID Compliance

- ✅ **S**ingle Responsibility - Each method does one thing
- ✅ **O**pen/Closed - Extend without modifying
- ✅ **L**iskov Substitution - Substitutable implementations
- ✅ **I**nterface Segregation - Focused interfaces
- ✅ **D**ependency Inversion - Depends on abstractions

---

**Status**: ✅ **Production Ready**  
**Version**: 1.0.0  
**Last Updated**: January 14, 2026  
**Maintainer**: Assemble ERP Team
