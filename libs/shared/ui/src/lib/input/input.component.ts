/**
 * Input Component
 * 
 * Enterprise-grade input component following SOLID principles and modern Angular patterns.
 * Features: Multiple types, validation states, helper text, error messages, full accessibility.
 * 
 * @example
 * ```html
 * <erp-input 
 *   type="email" 
 *   placeholder="Enter email"
 *   [required]="true"
 *   helperText="We'll never share your email"
 *   (valueChange)="handleChange($event)">
 * </erp-input>
 * 
 * <erp-input 
 *   type="password"
 *   [invalid]="true"
 *   errorText="Password must be at least 8 characters">
 * </erp-input>
 * ```
 */

import { Component, input, output, computed, signal, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InteractiveBaseComponent } from '../core/abstracts/base-component.abstract';
import { ComponentSize } from '../core/types/component.types';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
export type InputSize = ComponentSize;

@Component({
  selector: 'erp-input',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div [class]="containerClasses()">
      @if (label()) {
        <label 
          [for]="inputId()" 
          [class]="labelClasses()"
          [attr.aria-label]="ariaLabel()">
          {{ label() }}
          @if (required()) {
            <span class="text-danger-500 ml-1" aria-label="required">*</span>
          }
        </label>
      }
      
      <div class="relative">
        @if (prefixIcon()) {
          <span class="input-icon input-icon-prefix" aria-hidden="true">
            {{ prefixIcon() }}
          </span>
        }
        
        <input
          [id]="inputId()"
          [type]="type()"
          [value]="value()"
          [placeholder]="placeholder()"
          [disabled]="isDisabled()"
          [readonly]="readonly()"
          [required]="required()"
          [min]="min()"
          [max]="max()"
          [attr.minlength]="minLength()"
          [attr.maxlength]="maxLength()"
          [pattern]="pattern()"
          [autocomplete]="autocomplete()"
          [class]="inputClasses()"
          [attr.aria-label]="ariaLabel() || label()"
          [attr.aria-describedby]="ariaDescribedBy()"
          [attr.aria-invalid]="invalid()"
          [attr.aria-required]="required()"
          (input)="handleInput($event)"
          (focus)="handleFocus()"
          (blur)="handleBlur()"
          (mouseenter)="handleMouseEnter()"
          (mouseleave)="handleMouseLeave()"
        />
        
        @if (suffixIcon()) {
          <span class="input-icon input-icon-suffix" aria-hidden="true">
            {{ suffixIcon() }}
          </span>
        }
        
        @if (showClearButton() && value() && !disabled()) {
          <button
            type="button"
            class="input-clear-btn"
            [attr.aria-label]="'Clear ' + (label() || 'input')"
            (click)="handleClear()">
            ×
          </button>
        }
      </div>
      
      @if (helperText() && !invalid()) {
        <p [id]="helperId()" class="input-helper-text">
          {{ helperText() }}
        </p>
      }
      
      @if (invalid() && errorText()) {
        <p [id]="errorId()" class="input-error-text" role="alert">
          {{ errorText() }}
        </p>
      }
      
      @if (showCharCount() && maxLength()) {
        <p class="input-char-count">
          {{ value().length }} / {{ maxLength() }}
        </p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .input-label {
      display: block;
      font-weight: 500;
      color: rgb(55 65 81);
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    :host-context(.dark) .input-label {
      color: rgb(229 231 235);
    }

    input {
      display: block;
      width: 100%;
      border: 1px solid rgb(209 213 219);
      background-color: white;
      color: rgb(17 24 39);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    input::placeholder {
      color: rgb(156 163 175);
    }

    input:focus {
      outline: 2px solid rgb(59 130 246);
      outline-offset: 0;
      border-color: rgb(59 130 246);
    }

    input:disabled {
      background-color: rgb(243 244 246);
      color: rgb(156 163 175);
      cursor: not-allowed;
    }

    input:read-only {
      background-color: rgb(249 250 251);
      cursor: default;
    }

    /* Dark mode */
    :host-context(.dark) input {
      background-color: rgb(31 41 55);
      border-color: rgb(55 65 81);
      color: rgb(243 244 246);
    }

    :host-context(.dark) input::placeholder {
      color: rgb(107 114 128);
    }

    :host-context(.dark) input:disabled {
      background-color: rgb(17 24 39);
      color: rgb(107 114 128);
    }

    :host-context(.dark) input:read-only {
      background-color: rgb(24 33 47);
    }

    /* Invalid state */
    .input-invalid {
      border-color: rgb(239 68 68) !important;
    }

    .input-invalid:focus {
      outline-color: rgb(239 68 68) !important;
      border-color: rgb(239 68 68) !important;
    }

    /* Sizes */
    .input-xs {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      line-height: 1rem;
      border-radius: 0.25rem;
    }

    .input-sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      border-radius: 0.375rem;
    }

    .input-md {
      padding: 0.625rem 0.875rem;
      font-size: 1rem;
      line-height: 1.5rem;
      border-radius: 0.375rem;
    }

    .input-lg {
      padding: 0.75rem 1rem;
      font-size: 1.125rem;
      line-height: 1.75rem;
      border-radius: 0.5rem;
    }

    .input-xl {
      padding: 1rem 1.25rem;
      font-size: 1.25rem;
      line-height: 1.75rem;
      border-radius: 0.5rem;
    }

    /* With icons */
    .input-with-prefix {
      padding-left: 2.5rem;
    }

    .input-with-suffix {
      padding-right: 2.5rem;
    }

    .input-with-clear {
      padding-right: 2.5rem;
    }

    .input-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: rgb(107 114 128);
      pointer-events: none;
    }

    .input-icon-prefix {
      left: 0.75rem;
    }

    .input-icon-suffix {
      right: 0.75rem;
    }

    :host-context(.dark) .input-icon {
      color: rgb(156 163 175);
    }

    .input-clear-btn {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: rgb(229 231 235);
      color: rgb(75 85 99);
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 1.25rem;
      line-height: 1;
    }

    .input-clear-btn:hover {
      background-color: rgb(209 213 219);
    }

    :host-context(.dark) .input-clear-btn {
      background-color: rgb(55 65 81);
      color: rgb(209 213 219);
    }

    :host-context(.dark) .input-clear-btn:hover {
      background-color: rgb(75 85 99);
    }

    .input-helper-text {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: rgb(107 114 128);
      margin: 0;
    }

    :host-context(.dark) .input-helper-text {
      color: rgb(156 163 175);
    }

    .input-error-text {
      font-size: 0.875rem;
      line-height: 1.25rem;
      color: rgb(239 68 68);
      margin: 0;
    }

    :host-context(.dark) .input-error-text {
      color: rgb(248 113 113);
    }

    .input-char-count {
      font-size: 0.75rem;
      line-height: 1rem;
      color: rgb(107 114 128);
      text-align: right;
      margin: 0;
    }

    :host-context(.dark) .input-char-count {
      color: rgb(156 163 175);
    }

    /* Full width */
    .input-full {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends InteractiveBaseComponent implements ControlValueAccessor {
  /** Input type (signal input) */
  readonly type = input<InputType>('text');
  
  /** Input size (signal input) */
  readonly size = input<InputSize>('md');
  
  /** Input label (signal input) */
  readonly label = input<string>('');
  
  /** Input placeholder (signal input) */
  readonly placeholder = input<string>('');
  
  /** Whether the input is disabled (signal input) */
  readonly disabled = input<boolean>(false);
  
  /** Whether the input is readonly (signal input) */
  readonly readonly = input<boolean>(false);
  
  /** Whether the input is required (signal input) */
  readonly required = input<boolean>(false);
  
  /** Whether the input is invalid (signal input) */
  readonly invalid = input<boolean>(false);
  
  /** Helper text displayed below input (signal input) */
  readonly helperText = input<string>('');
  
  /** Error text displayed when invalid (signal input) */
  readonly errorText = input<string>('');
  
  /** Prefix icon (signal input) */
  readonly prefixIcon = input<string>('');
  
  /** Suffix icon (signal input) */
  readonly suffixIcon = input<string>('');
  
  /** Whether to show clear button (signal input) */
  readonly showClearButton = input<boolean>(false);
  
  /** Whether to show character count (signal input) */
  readonly showCharCount = input<boolean>(false);
  
  /** Minimum value for number input (signal input) */
  readonly min = input<number | undefined>(undefined);
  
  /** Maximum value for number input (signal input) */
  readonly max = input<number | undefined>(undefined);
  
  /** Minimum length (signal input) */
  readonly minLength = input<number | undefined>(undefined);
  
  /** Maximum length (signal input) */
  readonly maxLength = input<number | undefined>(undefined);
  
  /** Pattern for validation (signal input) */
  readonly pattern = input<string | undefined>(undefined);
  
  /** Autocomplete attribute (signal input) */
  readonly autocomplete = input<string>('off');
  
  /** ARIA label for accessibility (signal input) */
  readonly ariaLabel = input<string | undefined>(undefined);
  
  /** Value change event (signal output) */
  readonly valueChange = output<string>();
  
  /** Input event (signal output) */
  readonly inputEvent = output<Event>();
  
  /** Internal value signal */
  readonly value = signal<string>('');
  
  /** Unique input ID */
  readonly inputId = computed(() => `erp-input-${Math.random().toString(36).substr(2, 9)}`);
  
  /** Helper text ID for aria-describedby */
  readonly helperId = computed(() => `${this.inputId()}-helper`);
  
  /** Error text ID for aria-describedby */
  readonly errorId = computed(() => `${this.inputId()}-error`);
  
  /** Computed: Is input disabled */
  readonly isDisabled = computed(() => this.disabled());
  
  /** Computed: aria-describedby value */
  readonly ariaDescribedBy = computed(() => {
    const ids: string[] = [];
    if (this.helperText() && !this.invalid()) {
      ids.push(this.helperId());
    }
    if (this.invalid() && this.errorText()) {
      ids.push(this.errorId());
    }
    return ids.length > 0 ? ids.join(' ') : undefined;
  });
  
  /** Computed: Container CSS classes */
  readonly containerClasses = computed(() => {
    return 'input-container';
  });
  
  /** Computed: Label CSS classes */
  readonly labelClasses = computed(() => {
    return 'input-label';
  });
  
  /** Computed: Input CSS classes */
  readonly inputClasses = computed(() => {
    return [
      `input-${this.size()}`,
      this.invalid() ? 'input-invalid' : '',
      this.prefixIcon() ? 'input-with-prefix' : '',
      this.suffixIcon() ? 'input-with-suffix' : '',
      this.showClearButton() && this.value() ? 'input-with-clear' : ''
    ].filter(Boolean).join(' ');
  });
  
  // ControlValueAccessor implementation
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};
  
  writeValue(value: string): void {
    this.value.set(value || '');
  }
  
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    // Handled by disabled input
  }
  
  /**
   * Handle input event
   */
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
    this.inputEvent.emit(event);
  }
  
  /**
   * Handle blur event
   */
  override handleBlur(): void {
    super.handleBlur();
    this.onTouched();
  }
  
  /**
   * Handle clear button click
   */
  handleClear(): void {
    this.value.set('');
    this.onChange('');
    this.valueChange.emit('');
  }
}
