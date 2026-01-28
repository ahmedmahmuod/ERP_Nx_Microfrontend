/**
 * Toast Notification Service
 *
 * Provides a simple API for displaying toast notifications throughout the application.
 * Uses PrimeNG's MessageService under the hood.
 */

import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface ToastOptions {
  /**
   * Duration in milliseconds before the toast auto-dismisses
   * @default 3000
   */
  life?: number;

  /**
   * Whether the toast is sticky (won't auto-dismiss)
   * @default false
   */
  sticky?: boolean;

  /**
   * Position of the toast on screen
   * @default 'top-right'
   */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'center';

  /**
   * Additional data to pass with the toast
   */
  data?: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  private messageService = inject(MessageService);

  /**
   * Display a success toast notification
   */
  success(title: string, message: string, options?: ToastOptions): void {
    this.show('success', title, message, options);
  }

  /**
   * Display an info toast notification
   */
  info(title: string, message: string, options?: ToastOptions): void {
    this.show('info', title, message, options);
  }

  /**
   * Display a warning toast notification
   */
  warning(title: string, message: string, options?: ToastOptions): void {
    this.show('warn', title, message, options);
  }

  /**
   * Display an error toast notification
   */
  error(title: string, message: string, options?: ToastOptions): void {
    this.show('error', title, message, options);
  }

  /**
   * Display a toast notification with custom severity
   */
  show(
    severity: 'success' | 'info' | 'warn' | 'error',
    title: string,
    message: string,
    options?: ToastOptions,
  ): void {
    const defaultOptions: ToastOptions = {
      life: 3000,
      sticky: false,
      position: 'top-right',
    };

    const mergedOptions = { ...defaultOptions, ...options };

    this.messageService.add({
      severity,
      summary: title,
      detail: message,
      life: mergedOptions.sticky ? undefined : mergedOptions.life,
      sticky: mergedOptions.sticky,
      data: mergedOptions.data,
    });
  }

  /**
   * Clear all toast notifications
   */
  clear(): void {
    this.messageService.clear();
  }

  /**
   * Clear a specific toast by key
   */
  clearByKey(key: string): void {
    this.messageService.clear(key);
  }
}
