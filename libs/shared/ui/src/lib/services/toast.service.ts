/**
 * Toast Service
 * 
 * Professional, reusable toast notification service.
 * Follows SOLID principles and best practices.
 * 
 * Usage:
 * ```typescript
 * constructor(private toast: ToastService) {}
 * 
 * this.toast.success('Success!', 'Operation completed');
 * this.toast.error('Error!', 'Something went wrong');
 * this.toast.warning('Warning!', 'Please check your input');
 * this.toast.info('Info', 'Here is some information');
 * ```
 */

import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export type ToastSeverity = 'success' | 'info' | 'warn' | 'error';
export type ToastPosition = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right' 
  | 'center';

export interface ToastOptions {
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  key?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly messageService = inject(MessageService);
  
  // Default configuration
  private readonly defaultLife = 3000;
  private readonly defaultPosition: ToastPosition = 'top-center';
  
  /**
   * Show a success toast
   */
  success(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: 'success',
      summary,
      detail,
      life: life ?? this.defaultLife
    });
  }
  
  /**
   * Show an error toast
   */
  error(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: 'error',
      summary,
      detail,
      life: life ?? 4000 // Errors stay longer
    });
  }
  
  /**
   * Show a warning toast
   */
  warning(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: 'warn',
      summary,
      detail,
      life: life ?? this.defaultLife
    });
  }
  
  /**
   * Show an info toast
   */
  info(summary: string, detail?: string, life?: number): void {
    this.show({
      severity: 'info',
      summary,
      detail,
      life: life ?? this.defaultLife
    });
  }
  
  /**
   * Show a custom toast with full options
   */
  show(options: ToastOptions): void {
    this.messageService.add({
      severity: options.severity ?? 'info',
      summary: options.summary ?? '',
      detail: options.detail ?? '',
      life: options.life ?? this.defaultLife,
      sticky: options.sticky ?? false,
      closable: options.closable ?? true,
      key: options.key
    });
  }
  
  /**
   * Clear all toasts
   */
  clear(key?: string): void {
    this.messageService.clear(key);
  }
  
  /**
   * Authentication-specific toasts
   */
  auth = {
    loginSuccess: (userName?: string) => {
      this.success(
        'Login Successful',
        userName ? `Welcome back, ${userName}!` : 'Welcome to Assemble ERP',
        2000
      );
    },
    
    loginError: () => {
      this.error(
        'Login Failed',
        'Invalid email or password. Please try again.',
        4000
      );
    },
    
    logoutSuccess: () => {
      this.info(
        'Logged Out',
        'You have been successfully logged out',
        2000
      );
    },
    
    sessionExpired: () => {
      this.warning(
        'Session Expired',
        'Please log in again to continue',
        4000
      );
    },
    
    registrationSuccess: () => {
      this.success(
        'Registration Successful',
        'Your account has been created. Please log in.',
        3000
      );
    },
    
    registrationError: () => {
      this.error(
        'Registration Failed',
        'Unable to create account. Please try again.',
        4000
      );
    }
  };
  
  /**
   * Validation-specific toasts
   */
  validation = {
    required: (fieldName?: string) => {
      this.warning(
        'Validation Error',
        fieldName 
          ? `${fieldName} is required` 
          : 'Please fill in all required fields',
        3000
      );
    },
    
    invalid: (fieldName?: string) => {
      this.warning(
        'Invalid Input',
        fieldName 
          ? `Please enter a valid ${fieldName}` 
          : 'Please check your input',
        3000
      );
    },
    
    minLength: (fieldName: string, minLength: number) => {
      this.warning(
        'Validation Error',
        `${fieldName} must be at least ${minLength} characters`,
        3000
      );
    },
    
    maxLength: (fieldName: string, maxLength: number) => {
      this.warning(
        'Validation Error',
        `${fieldName} must not exceed ${maxLength} characters`,
        3000
      );
    }
  };
  
  /**
   * CRUD operation toasts
   */
  crud = {
    createSuccess: (entityName: string) => {
      this.success(
        'Created Successfully',
        `${entityName} has been created`,
        2000
      );
    },
    
    updateSuccess: (entityName: string) => {
      this.success(
        'Updated Successfully',
        `${entityName} has been updated`,
        2000
      );
    },
    
    deleteSuccess: (entityName: string) => {
      this.success(
        'Deleted Successfully',
        `${entityName} has been deleted`,
        2000
      );
    },
    
    createError: (entityName: string) => {
      this.error(
        'Creation Failed',
        `Unable to create ${entityName}`,
        3000
      );
    },
    
    updateError: (entityName: string) => {
      this.error(
        'Update Failed',
        `Unable to update ${entityName}`,
        3000
      );
    },
    
    deleteError: (entityName: string) => {
      this.error(
        'Deletion Failed',
        `Unable to delete ${entityName}`,
        3000
      );
    }
  };
  
  /**
   * Network-specific toasts
   */
  network = {
    offline: () => {
      this.error(
        'No Internet Connection',
        'Please check your network connection',
        0 // Sticky until dismissed
      );
    },
    
    online: () => {
      this.success(
        'Connection Restored',
        'You are back online',
        2000
      );
    },
    
    serverError: () => {
      this.error(
        'Server Error',
        'Unable to connect to server. Please try again later.',
        4000
      );
    },
    
    timeout: () => {
      this.error(
        'Request Timeout',
        'The request took too long. Please try again.',
        4000
      );
    }
  };
}
