/**
 * Modal/Dialog Component
 * 
 * Enterprise-grade modal component following SOLID principles and modern Angular patterns.
 * Features: Focus trap, ESC close, size variants, overlay animation, full accessibility.
 * 
 * @example
 * ```html
 * <erp-modal 
 *   [open]="isOpen()"
 *   size="md"
 *   title="Confirm Action"
 *   (closeModal)="handleClose()">
 *   <div modal-body>
 *     <p>Are you sure you want to proceed?</p>
 *   </div>
 *   <div modal-footer>
 *     <erp-button variant="secondary" (clicked)="handleClose()">Cancel</erp-button>
 *     <erp-button variant="primary" (clicked)="handleConfirm()">Confirm</erp-button>
 *   </div>
 * </erp-modal>
 * ```
 */

import { 
  Component, 
  input, 
  output, 
  computed, 
  signal,
  effect,
  ChangeDetectionStrategy,
  HostListener,
  ElementRef,
  inject,
  Renderer2
} from '@angular/core';
import { BaseComponent } from '../core/abstracts/base-component.abstract';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

@Component({
  selector: 'erp-modal',
  standalone: true,
  imports: [],
  template: `
    @if (open()) {
      <div 
        class="modal-backdrop"
        [class.modal-backdrop-visible]="backdropVisible()"
        [attr.tabindex]="-1"
        (click)="handleBackdropClick()"
        (keydown.enter)="handleBackdropClick()"
        (keydown.space)="handleBackdropClick()">
        <div 
          class="modal-container"
          [class]="modalClasses()"
          [attr.role]="'dialog'"
          [attr.aria-modal]="'true'"
          [attr.aria-labelledby]="titleId()"
          [attr.aria-describedby]="descriptionId()"
          [attr.tabindex]="-1"
          (click)="$event.stopPropagation()"
          (keydown)="$event.stopPropagation()">
          
          @if (showHeader()) {
            <div class="modal-header">
              @if (title()) {
                <h2 [id]="titleId()" class="modal-title">{{ title() }}</h2>
              }
              <ng-content select="[modal-header]"></ng-content>
              
              @if (showCloseButton()) {
                <button
                  type="button"
                  class="modal-close-btn"
                  [attr.aria-label]="'Close ' + (title() || 'modal')"
                  (click)="handleClose()">
                  ×
                </button>
              }
            </div>
          }
          
          <div [id]="descriptionId()" class="modal-body">
            <ng-content select="[modal-body]"></ng-content>
            <ng-content></ng-content>
          </div>
          
          @if (hasFooter()) {
            <div class="modal-footer">
              <ng-content select="[modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: contents;
    }

    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    .modal-backdrop-visible {
      opacity: 1;
    }

    .modal-container {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
      display: flex;
      flex-direction: column;
      max-height: calc(100vh - 2rem);
      width: 100%;
      transform: scale(0.95);
      transition: transform 0.2s ease-out;
    }

    .modal-backdrop-visible .modal-container {
      transform: scale(1);
    }

    :host-context(.dark) .modal-container {
      background-color: rgb(31 41 55);
    }

    /* Sizes */
    .modal-xs {
      max-width: 20rem;
    }

    .modal-sm {
      max-width: 24rem;
    }

    .modal-md {
      max-width: 32rem;
    }

    .modal-lg {
      max-width: 48rem;
    }

    .modal-xl {
      max-width: 64rem;
    }

    .modal-2xl {
      max-width: 80rem;
    }

    .modal-full {
      max-width: calc(100vw - 2rem);
      max-height: calc(100vh - 2rem);
    }

    /* Header */
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem;
      border-bottom: 1px solid rgb(229 231 235);
    }

    :host-context(.dark) .modal-header {
      border-bottom-color: rgb(55 65 81);
    }

    .modal-title {
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 600;
      color: rgb(17 24 39);
      margin: 0;
    }

    :host-context(.dark) .modal-title {
      color: rgb(243 244 246);
    }

    .modal-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: none;
      background-color: transparent;
      color: rgb(107 114 128);
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      border-radius: 0.25rem;
      transition: all 0.2s;
      margin-left: auto;
    }

    .modal-close-btn:hover {
      background-color: rgb(243 244 246);
      color: rgb(17 24 39);
    }

    .modal-close-btn:focus-visible {
      outline: 2px solid rgb(59 130 246);
      outline-offset: 2px;
    }

    :host-context(.dark) .modal-close-btn {
      color: rgb(156 163 175);
    }

    :host-context(.dark) .modal-close-btn:hover {
      background-color: rgb(55 65 81);
      color: rgb(243 244 246);
    }

    /* Body */
    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
      color: rgb(55 65 81);
    }

    :host-context(.dark) .modal-body {
      color: rgb(209 213 219);
    }

    /* Footer */
    .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.75rem;
      padding: 1.5rem;
      border-top: 1px solid rgb(229 231 235);
      background-color: rgb(249 250 251);
    }

    :host-context(.dark) .modal-footer {
      border-top-color: rgb(55 65 81);
      background-color: rgb(24 33 47);
    }

    /* Centered footer */
    .modal-footer-centered {
      justify-content: center;
    }

    /* Scrollable body */
    .modal-scrollable .modal-body {
      max-height: 60vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent extends BaseComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  
  /** Whether the modal is open (signal input) */
  readonly open = input<boolean>(false);
  
  /** Modal size (signal input) */
  readonly size = input<ModalSize>('md');
  
  /** Modal title (signal input) */
  readonly title = input<string>('');
  
  /** Whether to show the close button (signal input) */
  readonly showCloseButton = input<boolean>(true);
  
  /** Whether to show the header (signal input) */
  readonly showHeader = input<boolean>(true);
  
  /** Whether the modal has footer content (signal input) */
  readonly hasFooter = input<boolean>(false);
  
  /** Whether clicking backdrop closes the modal (signal input) */
  readonly closeOnBackdrop = input<boolean>(true);
  
  /** Whether ESC key closes the modal (signal input) */
  readonly closeOnEsc = input<boolean>(true);
  
  /** Whether the modal body is scrollable (signal input) */
  readonly scrollable = input<boolean>(false);
  
  /** Close modal event (signal output) */
  readonly closeModal = output<void>();
  
  /** Backdrop visible state for animation */
  readonly backdropVisible = signal<boolean>(false);
  
  /** Unique modal ID */
  readonly modalId = computed(() => `erp-modal-${Math.random().toString(36).substr(2, 9)}`);
  
  /** Title ID for aria-labelledby */
  readonly titleId = computed(() => `${this.modalId()}-title`);
  
  /** Description ID for aria-describedby */
  readonly descriptionId = computed(() => `${this.modalId()}-description`);
  
  /** Computed: Modal CSS classes */
  readonly modalClasses = computed(() => {
    return [
      `modal-${this.size()}`,
      this.scrollable() ? 'modal-scrollable' : ''
    ].filter(Boolean).join(' ');
  });
  
  /** Store previously focused element */
  private previouslyFocusedElement: HTMLElement | null = null;
  
  /** Focusable elements selector */
  private readonly focusableSelector = 
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  constructor() {
    super();
    
    // Handle modal open/close effects
    effect(() => {
      if (this.open()) {
        this.onModalOpen();
      } else {
        this.onModalClose();
      }
    });
  }
  
  /**
   * Handle ESC key press
   */
  @HostListener('document:keydown.escape', ['$event'])
  handleEscKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (this.open() && this.closeOnEsc()) {
      keyboardEvent.preventDefault();
      this.handleClose();
    }
  }
  
  /**
   * Handle Tab key for focus trap
   */
  @HostListener('document:keydown.tab', ['$event'])
  handleTabKey(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (!this.open()) return;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (keyboardEvent.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        keyboardEvent.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        keyboardEvent.preventDefault();
        firstElement.focus();
      }
    }
  }
  
  /**
   * Handle backdrop click
   */
  handleBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.handleClose();
    }
  }
  
  /**
   * Handle close
   */
  handleClose(): void {
    this.closeModal.emit();
  }
  
  /**
   * Get all focusable elements within modal
   */
  private getFocusableElements(): HTMLElement[] {
    const modalElement = this.elementRef.nativeElement.querySelector('.modal-container');
    if (!modalElement) return [];
    
    const elements = Array.from(
      modalElement.querySelectorAll(this.focusableSelector)
    ) as HTMLElement[];
    
    return elements.filter(el => !el.hasAttribute('disabled'));
  }
  
  /**
   * Called when modal opens
   */
  private onModalOpen(): void {
    // Store currently focused element
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    
    // Prevent body scroll
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    
    // Show backdrop with animation
    setTimeout(() => {
      this.backdropVisible.set(true);
    }, 10);
    
    // Focus first focusable element
    setTimeout(() => {
      const focusableElements = this.getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 100);
  }
  
  /**
   * Called when modal closes
   */
  private onModalClose(): void {
    // Hide backdrop
    this.backdropVisible.set(false);
    
    // Restore body scroll
    this.renderer.removeStyle(document.body, 'overflow');
    
    // Restore focus to previously focused element
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }
  
  /**
   * Override destroy to clean up
   */
  protected override onComponentDestroy(): void {
    if (this.open()) {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
}
