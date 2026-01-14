/**
 * Card Component
 * 
 * Enterprise-grade card component following SOLID principles and modern Angular patterns.
 * Features: Header/body/footer slots, elevation levels, variants, full accessibility.
 * 
 * @example
 * ```html
 * <erp-card elevation="md">
 *   <div card-header>
 *     <h3>Card Title</h3>
 *   </div>
 *   <div card-body>
 *     <p>Card content goes here</p>
 *   </div>
 *   <div card-footer>
 *     <erp-button>Action</erp-button>
 *   </div>
 * </erp-card>
 * 
 * <erp-card variant="primary" [hoverable]="true">
 *   <div card-body>
 *     Hoverable primary card
 *   </div>
 * </erp-card>
 * ```
 */

import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '../core/abstracts/base-component.abstract';
import { ComponentVariant } from '../core/types/component.types';

export type CardElevation = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CardVariant = ComponentVariant | 'default';

@Component({
  selector: 'erp-card',
  standalone: true,
  imports: [],
  template: `
    <div 
      [class]="cardClasses()"
      [attr.role]="role()"
      [attr.aria-label]="ariaLabel()">
      @if (hasHeader()) {
        <div class="card-header">
          <ng-content select="[card-header]"></ng-content>
        </div>
      }
      
      <div class="card-body">
        <ng-content select="[card-body]"></ng-content>
        <ng-content></ng-content>
      </div>
      
      @if (hasFooter()) {
        <div class="card-footer">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card {
      background-color: white;
      border-radius: 0.5rem;
      overflow: hidden;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgb(229 231 235);
    }

    :host-context(.dark) .card {
      background-color: rgb(31 41 55);
      border-color: rgb(55 65 81);
    }

    /* Elevation */
    .card-elevation-none {
      box-shadow: none;
    }

    .card-elevation-xs {
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    }

    .card-elevation-sm {
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    }

    .card-elevation-md {
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .card-elevation-lg {
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    .card-elevation-xl {
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    }

    .card-elevation-2xl {
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    }

    /* Hoverable */
    .card-hoverable {
      cursor: pointer;
    }

    .card-hoverable:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15);
    }

    /* Variants */
    .card-variant-default {
      /* Default styling already applied */
    }

    .card-variant-primary {
      border-color: rgb(59 130 246);
      border-width: 2px;
    }

    .card-variant-primary .card-header {
      background-color: rgb(59 130 246);
      color: white;
    }

    .card-variant-secondary {
      border-color: rgb(168 85 247);
      border-width: 2px;
    }

    .card-variant-secondary .card-header {
      background-color: rgb(168 85 247);
      color: white;
    }

    .card-variant-success {
      border-color: rgb(34 197 94);
      border-width: 2px;
    }

    .card-variant-success .card-header {
      background-color: rgb(34 197 94);
      color: white;
    }

    .card-variant-warning {
      border-color: rgb(245 158 11);
      border-width: 2px;
    }

    .card-variant-warning .card-header {
      background-color: rgb(245 158 11);
      color: white;
    }

    .card-variant-danger {
      border-color: rgb(239 68 68);
      border-width: 2px;
    }

    .card-variant-danger .card-header {
      background-color: rgb(239 68 68);
      color: white;
    }

    .card-variant-info {
      border-color: rgb(6 182 212);
      border-width: 2px;
    }

    .card-variant-info .card-header {
      background-color: rgb(6 182 212);
      color: white;
    }

    .card-variant-neutral {
      border-color: rgb(115 115 115);
      border-width: 2px;
    }

    .card-variant-neutral .card-header {
      background-color: rgb(115 115 115);
      color: white;
    }

    /* Header */
    .card-header {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid rgb(229 231 235);
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.75rem;
    }

    :host-context(.dark) .card-header {
      border-bottom-color: rgb(55 65 81);
    }

    /* Body */
    .card-body {
      padding: 1.5rem;
    }

    /* Footer */
    .card-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid rgb(229 231 235);
      background-color: rgb(249 250 251);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    :host-context(.dark) .card-footer {
      border-top-color: rgb(55 65 81);
      background-color: rgb(24 33 47);
    }

    /* Padding variants */
    .card-padding-none .card-body {
      padding: 0;
    }

    .card-padding-sm .card-body {
      padding: 0.75rem;
    }

    .card-padding-md .card-body {
      padding: 1.5rem;
    }

    .card-padding-lg .card-body {
      padding: 2rem;
    }

    .card-padding-xl .card-body {
      padding: 3rem;
    }

    /* Full height */
    .card-full-height {
      height: 100%;
    }

    /* Bordered */
    .card-bordered {
      border-width: 2px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent extends BaseComponent {
  /** Card elevation/shadow level (signal input) */
  readonly elevation = input<CardElevation>('md');
  
  /** Card variant/style (signal input) */
  readonly variant = input<CardVariant>('default');
  
  /** Whether the card is hoverable with lift effect (signal input) */
  readonly hoverable = input<boolean>(false);
  
  /** Whether the card has a border (signal input) */
  readonly bordered = input<boolean>(false);
  
  /** Card body padding size (signal input) */
  readonly padding = input<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  
  /** Whether the card should take full height (signal input) */
  readonly fullHeight = input<boolean>(false);
  
  /** ARIA role for accessibility (signal input) */
  readonly role = input<string | undefined>(undefined);
  
  /** ARIA label for accessibility (signal input) */
  readonly ariaLabel = input<string | undefined>(undefined);
  
  /** Whether card has header content (signal input) */
  readonly hasHeader = input<boolean>(false);
  
  /** Whether card has footer content (signal input) */
  readonly hasFooter = input<boolean>(false);
  
  /**
   * Computed: Card CSS classes
   */
  readonly cardClasses = computed(() => {
    return [
      'card',
      `card-elevation-${this.elevation()}`,
      `card-variant-${this.variant()}`,
      `card-padding-${this.padding()}`,
      this.hoverable() ? 'card-hoverable' : '',
      this.bordered() ? 'card-bordered' : '',
      this.fullHeight() ? 'card-full-height' : ''
    ].filter(Boolean).join(' ');
  });
}
