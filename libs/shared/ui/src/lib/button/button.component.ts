/**
 * Button Component
 * 
 * Enterprise-grade button component following SOLID principles and modern Angular patterns.
 * Features: Multiple variants, sizes, loading states, full accessibility, responsive design.
 * 
 * @example
 * ```html
 * <erp-button variant="primary" size="md" (clicked)="handleClick()">
 *   Click Me
 * </erp-button>
 * 
 * <erp-button variant="danger" [loading]="true">
 *   Submit
 * </erp-button>
 * ```
 */

import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { InteractiveBaseComponent } from '../core/abstracts/base-component.abstract';
import { ComponentSize, ComponentVariant } from '../core/types/component.types';

export type ButtonVariant = Extract<ComponentVariant, 'primary' | 'secondary' | 'success' | 'warning' | 'danger'> | 'ghost' | 'link';
export type ButtonSize = ComponentSize;

@Component({
  selector: 'erp-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type()"
      [disabled]="isDisabled()"
      [class]="buttonClasses()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-busy]="loading()"
      [attr.aria-disabled]="isDisabled()"
      (click)="handleClick($event)"
      (focus)="handleFocus()"
      (blur)="handleBlur()"
      (mouseenter)="handleMouseEnter()"
      (mouseleave)="handleMouseLeave()"
      (mousedown)="handleMouseDown()"
      (mouseup)="handleMouseUp()"
    >
      @if (loading()) {
        <span class="btn-spinner" aria-hidden="true"></span>
      }
      <span [class.opacity-0]="loading()">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
    }

    button:focus-visible {
      outline: 2px solid;
      outline-offset: 2px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-spinner {
      position: absolute;
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    /* Variant: Primary */
    .btn-primary {
      background-color: rgb(59 130 246);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: rgb(37 99 235);
    }

    .btn-primary:active:not(:disabled) {
      background-color: rgb(29 78 216);
    }

    .btn-primary:focus-visible {
      outline-color: rgb(59 130 246);
    }

    /* Variant: Secondary */
    .btn-secondary {
      background-color: rgb(168 85 247);
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: rgb(147 51 234);
    }

    .btn-secondary:active:not(:disabled) {
      background-color: rgb(126 34 206);
    }

    .btn-secondary:focus-visible {
      outline-color: rgb(168 85 247);
    }

    /* Variant: Success */
    .btn-success {
      background-color: rgb(34 197 94);
      color: white;
    }

    .btn-success:hover:not(:disabled) {
      background-color: rgb(22 163 74);
    }

    .btn-success:active:not(:disabled) {
      background-color: rgb(21 128 61);
    }

    .btn-success:focus-visible {
      outline-color: rgb(34 197 94);
    }

    /* Variant: Warning */
    .btn-warning {
      background-color: rgb(245 158 11);
      color: white;
    }

    .btn-warning:hover:not(:disabled) {
      background-color: rgb(217 119 6);
    }

    .btn-warning:active:not(:disabled) {
      background-color: rgb(180 83 9);
    }

    .btn-warning:focus-visible {
      outline-color: rgb(245 158 11);
    }

    /* Variant: Danger */
    .btn-danger {
      background-color: rgb(239 68 68);
      color: white;
    }

    .btn-danger:hover:not(:disabled) {
      background-color: rgb(220 38 38);
    }

    .btn-danger:active:not(:disabled) {
      background-color: rgb(185 28 28);
    }

    .btn-danger:focus-visible {
      outline-color: rgb(239 68 68);
    }

    /* Variant: Ghost */
    .btn-ghost {
      background-color: transparent;
      color: rgb(115 115 115);
    }

    .btn-ghost:hover:not(:disabled) {
      background-color: rgb(245 245 245);
    }

    .btn-ghost:active:not(:disabled) {
      background-color: rgb(229 229 229);
    }

    :host-context(.dark) .btn-ghost {
      color: rgb(212 212 212);
    }

    :host-context(.dark) .btn-ghost:hover:not(:disabled) {
      background-color: rgb(38 38 38);
    }

    :host-context(.dark) .btn-ghost:active:not(:disabled) {
      background-color: rgb(64 64 64);
    }

    /* Variant: Link */
    .btn-link {
      background-color: transparent;
      color: rgb(59 130 246);
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .btn-link:hover:not(:disabled) {
      color: rgb(37 99 235);
    }

    .btn-link:active:not(:disabled) {
      color: rgb(29 78 216);
    }

    :host-context(.dark) .btn-link {
      color: rgb(96 165 250);
    }

    :host-context(.dark) .btn-link:hover:not(:disabled) {
      color: rgb(147 197 253);
    }

    /* Size: XS */
    .btn-xs {
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      line-height: 1rem;
      border-radius: 0.25rem;
    }

    /* Size: SM */
    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      border-radius: 0.375rem;
    }

    /* Size: MD */
    .btn-md {
      padding: 0.625rem 1.25rem;
      font-size: 1rem;
      line-height: 1.5rem;
      border-radius: 0.375rem;
    }

    /* Size: LG */
    .btn-lg {
      padding: 0.75rem 1.5rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      border-radius: 0.5rem;
    }

    /* Size: XL */
    .btn-xl {
      padding: 1rem 2rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
      border-radius: 0.5rem;
    }

    /* Full Width */
    .btn-full {
      width: 100%;
    }

    /* State: Focused */
    .btn-focused {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    /* State: Hovered */
    .btn-hovered {
      transform: translateY(-1px);
    }

    /* State: Pressed */
    .btn-pressed {
      transform: translateY(0);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends InteractiveBaseComponent {
  /** Button variant/style (signal input) */
  readonly variant = input<ButtonVariant>('primary');
  
  /** Button size (signal input) */
  readonly size = input<ButtonSize>('md');
  
  /** Button type attribute (signal input) */
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  
  /** Whether the button is disabled (signal input) */
  readonly disabled = input<boolean>(false);
  
  /** Whether the button is in loading state (signal input) */
  readonly loading = input<boolean>(false);
  
  /** Whether the button should take full width (signal input) */
  readonly fullWidth = input<boolean>(false);
  
  /** ARIA label for accessibility (signal input) */
  readonly ariaLabel = input<string | undefined>(undefined);
  
  /** Click event (signal output) */
  readonly clicked = output<MouseEvent>();
  
  /**
   * Computed: Is button disabled (disabled OR loading)
   */
  readonly isDisabled = computed(() => this.disabled() || this.loading());
  
  /**
   * Computed: Button CSS classes
   */
  readonly buttonClasses = computed(() => {
    return [
      `btn-${this.variant()}`,
      `btn-${this.size()}`,
      this.fullWidth() ? 'btn-full' : '',
      this.focused() ? 'btn-focused' : '',
      this.hovered() ? 'btn-hovered' : '',
      this.pressed() ? 'btn-pressed' : ''
    ].filter(Boolean).join(' ');
  });
  
  /**
   * Handle click event
   */
  handleClick(event: MouseEvent): void {
    if (!this.isDisabled()) {
      this.clicked.emit(event);
    }
  }
}
