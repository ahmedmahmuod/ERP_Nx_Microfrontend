/**
 * Toast Service
 * Manages toast notifications
 * Uses modern Angular patterns: signals
 */

import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
  timestamp: number;
}

export interface ToastOptions {
  title?: string;
  duration?: number;
  position?: ToastPosition;
  dismissible?: boolean;
}

/**
 * Toast Service
 * Single Responsibility: Toast notification management
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly DEFAULT_DURATION = 5000;
  private readonly DEFAULT_POSITION: ToastPosition = 'top-right';
  
  /**
   * Active toasts signal
   */
  private readonly toasts = signal<Toast[]>([]);
  
  /**
   * Public readonly toasts
   */
  readonly activeToasts = this.toasts.asReadonly();
  
  /**
   * Show success toast
   */
  success(message: string, options?: ToastOptions): string {
    return this.show('success', message, options);
  }
  
  /**
   * Show error toast
   */
  error(message: string, options?: ToastOptions): string {
    return this.show('error', message, options);
  }
  
  /**
   * Show warning toast
   */
  warning(message: string, options?: ToastOptions): string {
    return this.show('warning', message, options);
  }
  
  /**
   * Show info toast
   */
  info(message: string, options?: ToastOptions): string {
    return this.show('info', message, options);
  }
  
  /**
   * Show toast with custom type
   */
  show(type: ToastType, message: string, options?: ToastOptions): string {
    const id = this.generateId();
    const toast: Toast = {
      id,
      type,
      title: options?.title,
      message,
      duration: options?.duration ?? this.DEFAULT_DURATION,
      position: options?.position ?? this.DEFAULT_POSITION,
      dismissible: options?.dismissible ?? true,
      timestamp: Date.now()
    };
    
    this.toasts.update(toasts => [...toasts, toast]);
    
    // Auto-dismiss after duration
    const duration = toast.duration ?? this.DEFAULT_DURATION;
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }
    
    return id;
  }
  
  /**
   * Dismiss toast by ID
   */
  dismiss(id: string): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }
  
  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.toasts.set([]);
  }
  
  /**
   * Get toasts by position
   */
  getToastsByPosition(position: ToastPosition): Toast[] {
    return this.toasts().filter(t => (t.position ?? this.DEFAULT_POSITION) === position);
  }
  
  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
