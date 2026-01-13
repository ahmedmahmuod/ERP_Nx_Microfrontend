/**
 * Abstract base component following SOLID principles
 * Single Responsibility: Handles common component lifecycle and state
 * Open/Closed: Open for extension, closed for modification
 * Liskov Substitution: All derived components can be used interchangeably
 * Interface Segregation: Minimal required interface
 * Dependency Inversion: Depends on abstractions, not concretions
 */

import { Directive, OnDestroy, signal, computed, effect, DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Base abstract component providing common functionality
 * Uses modern Angular patterns: signals, inject(), DestroyRef
 */
@Directive()
export abstract class BaseComponent implements OnDestroy {
  /**
   * Destroy subject for cleanup (RxJS interop)
   * @deprecated Use DestroyRef instead
   */
  protected readonly destroy$ = new Subject<void>();
  
  /**
   * Modern Angular destroy reference
   * Automatically handles cleanup
   */
  protected readonly destroyRef = inject(DestroyRef);
  
  /**
   * Component initialization state
   */
  protected readonly initialized = signal(false);
  
  /**
   * Component error state
   */
  protected readonly error = signal<Error | null>(null);
  
  /**
   * Computed signal for component validity
   */
  protected readonly isValid = computed(() => this.error() === null);
  
  constructor() {
    // Register cleanup on destroy
    this.destroyRef.onDestroy(() => {
      this.onComponentDestroy();
    });
    
    // Effect to handle initialization
    effect(() => {
      if (this.initialized()) {
        this.onComponentInit();
      }
    });
  }
  
  /**
   * Lifecycle hook called when component is initialized
   * Override in derived classes for custom initialization
   */
  protected onComponentInit(): void {
    // Override in derived classes
  }
  
  /**
   * Lifecycle hook called when component is destroyed
   * Override in derived classes for custom cleanup
   */
  protected onComponentDestroy(): void {
    // Override in derived classes
  }
  
  /**
   * Set error state
   */
  protected setError(error: Error): void {
    this.error.set(error);
  }
  
  /**
   * Clear error state
   */
  protected clearError(): void {
    this.error.set(null);
  }
  
  /**
   * Mark component as initialized
   */
  protected markAsInitialized(): void {
    this.initialized.set(true);
  }
  
  /**
   * NgOnDestroy implementation
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Abstract base for interactive components
 * Extends BaseComponent with interaction-specific functionality
 */
@Directive()
export abstract class InteractiveBaseComponent extends BaseComponent {
  /**
   * Focus state signal
   */
  readonly focused = signal(false);
  
  /**
   * Hover state signal
   */
  readonly hovered = signal(false);
  
  /**
   * Pressed state signal
   */
  readonly pressed = signal(false);
  
  /**
   * Handle focus event
   */
  protected handleFocus(): void {
    this.focused.set(true);
    this.onFocus();
  }
  
  /**
   * Handle blur event
   */
  protected handleBlur(): void {
    this.focused.set(false);
    this.onBlur();
  }
  
  /**
   * Handle mouse enter event
   */
  protected handleMouseEnter(): void {
    this.hovered.set(true);
    this.onHover();
  }
  
  /**
   * Handle mouse leave event
   */
  protected handleMouseLeave(): void {
    this.hovered.set(false);
    this.onHoverEnd();
  }
  
  /**
   * Handle mouse down event
   */
  protected handleMouseDown(): void {
    this.pressed.set(true);
    this.onPress();
  }
  
  /**
   * Handle mouse up event
   */
  protected handleMouseUp(): void {
    this.pressed.set(false);
    this.onPressEnd();
  }
  
  /**
   * Lifecycle hooks for interaction events
   * Override in derived classes
   */
  protected onFocus(): void {
    // Implement in derived classes
  }
  
  protected onBlur(): void {
    // Implement in derived classes
  }
  
  protected onHover(): void {
    // Implement in derived classes
  }
  
  protected onHoverEnd(): void {
    // Implement in derived classes
  }
  
  protected onPress(): void {
    // Implement in derived classes
  }
  
  protected onPressEnd(): void {
    // Implement in derived classes
  }
}
