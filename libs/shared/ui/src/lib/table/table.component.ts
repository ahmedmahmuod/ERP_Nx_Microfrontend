/**
 * Table Component (Foundation)
 * 
 * Enterprise-grade table component following SOLID principles and modern Angular patterns.
 * Features: Responsive design, empty state, header/body separation, accessibility.
 * Note: This is a foundation version without sorting/filtering/pagination (business logic).
 * 
 * @example
 * ```html
 * <erp-table>
 *   <thead table-header>
 *     <tr>
 *       <th>Name</th>
 *       <th>Email</th>
 *       <th>Role</th>
 *     </tr>
 *   </thead>
 *   <tbody table-body>
 *     @for (user of users(); track user.id) {
 *       <tr>
 *         <td>{{ user.name }}</td>
 *         <td>{{ user.email }}</td>
 *         <td>{{ user.role }}</td>
 *       </tr>
 *     }
 *   </tbody>
 * </erp-table>
 * 
 * <erp-table [striped]="true" [hoverable]="true" size="sm">
 *   <!-- table content -->
 * </erp-table>
 * ```
 */

import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '../core/abstracts/base-component.abstract';
import { ComponentSize } from '../core/types/component.types';

export type TableSize = Exclude<ComponentSize, 'xs' | 'xl'>;

@Component({
  selector: 'erp-table',
  standalone: true,
  imports: [],
  template: `
    <div [class]="containerClasses()">
      @if (caption()) {
        <caption class="table-caption">{{ caption() }}</caption>
      }
      
      <table 
        [class]="tableClasses()"
        [attr.role]="'table'"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-describedby]="ariaDescribedBy()">
        <ng-content select="[table-header], thead"></ng-content>
        <ng-content select="[table-body], tbody"></ng-content>
        <ng-content select="[table-footer], tfoot"></ng-content>
      </table>
      
      @if (showEmptyState() && isEmpty()) {
        <div class="table-empty-state">
          <div class="table-empty-icon" aria-hidden="true">📋</div>
          <p class="table-empty-text">{{ emptyStateText() }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      border-radius: 0.5rem;
      border: 1px solid rgb(229 231 235);
      background-color: white;
    }

    :host-context(.dark) .table-container {
      border-color: rgb(55 65 81);
      background-color: rgb(31 41 55);
    }

    .table-caption {
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      font-size: 1.125rem;
      color: rgb(17 24 39);
      caption-side: top;
    }

    :host-context(.dark) .table-caption {
      color: rgb(243 244 246);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    :host ::ng-deep thead {
      background-color: rgb(249 250 251);
      border-bottom: 2px solid rgb(229 231 235);
    }

    :host-context(.dark) ::ng-deep thead {
      background-color: rgb(24 33 47);
      border-bottom-color: rgb(55 65 81);
    }

    :host ::ng-deep th {
      padding: 0.75rem 1rem;
      text-align: left;
      font-weight: 600;
      color: rgb(55 65 81);
      white-space: nowrap;
    }

    :host-context(.dark) ::ng-deep th {
      color: rgb(209 213 219);
    }

    :host ::ng-deep td {
      padding: 0.75rem 1rem;
      color: rgb(55 65 81);
      border-bottom: 1px solid rgb(229 231 235);
    }

    :host-context(.dark) ::ng-deep td {
      color: rgb(209 213 219);
      border-bottom-color: rgb(55 65 81);
    }

    :host ::ng-deep tbody tr:last-child td {
      border-bottom: none;
    }

    /* Sizes */
    .table-sm :host ::ng-deep th,
    .table-sm :host ::ng-deep td {
      padding: 0.5rem 0.75rem;
      font-size: 0.8125rem;
    }

    .table-md :host ::ng-deep th,
    .table-md :host ::ng-deep td {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }

    .table-lg :host ::ng-deep th,
    .table-lg :host ::ng-deep td {
      padding: 1rem 1.25rem;
      font-size: 1rem;
    }

    /* Striped */
    .table-striped :host ::ng-deep tbody tr:nth-child(even) {
      background-color: rgb(249 250 251);
    }

    :host-context(.dark) .table-striped :host ::ng-deep tbody tr:nth-child(even) {
      background-color: rgb(24 33 47);
    }

    /* Hoverable */
    .table-hoverable :host ::ng-deep tbody tr {
      transition: background-color 0.2s;
      cursor: pointer;
    }

    .table-hoverable :host ::ng-deep tbody tr:hover {
      background-color: rgb(243 244 246);
    }

    :host-context(.dark) .table-hoverable :host ::ng-deep tbody tr:hover {
      background-color: rgb(31 41 55);
    }

    /* Bordered */
    .table-bordered :host ::ng-deep th,
    .table-bordered :host ::ng-deep td {
      border: 1px solid rgb(229 231 235);
    }

    :host-context(.dark) .table-bordered :host ::ng-deep th,
    :host-context(.dark) .table-bordered :host ::ng-deep td {
      border-color: rgb(55 65 81);
    }

    /* Compact */
    .table-compact :host ::ng-deep th,
    .table-compact :host ::ng-deep td {
      padding: 0.375rem 0.5rem;
    }

    /* Full width */
    .table-full-width {
      width: 100%;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .table-responsive {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }

    /* Empty state */
    .table-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
    }

    .table-empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }

    .table-empty-text {
      color: rgb(107 114 128);
      font-size: 0.875rem;
      margin: 0;
    }

    :host-context(.dark) .table-empty-text {
      color: rgb(156 163 175);
    }

    /* Fixed layout */
    .table-fixed {
      table-layout: fixed;
    }

    /* Sticky header */
    .table-sticky-header :host ::ng-deep thead {
      position: sticky;
      top: 0;
      z-index: 10;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent extends BaseComponent {
  /** Table size (signal input) */
  readonly size = input<TableSize>('md');
  
  /** Table caption (signal input) */
  readonly caption = input<string>('');
  
  /** Whether the table has striped rows (signal input) */
  readonly striped = input<boolean>(false);
  
  /** Whether the table rows are hoverable (signal input) */
  readonly hoverable = input<boolean>(false);
  
  /** Whether the table has borders (signal input) */
  readonly bordered = input<boolean>(false);
  
  /** Whether the table is compact (signal input) */
  readonly compact = input<boolean>(false);
  
  /** Whether the table is responsive (signal input) */
  readonly responsive = input<boolean>(true);
  
  /** Whether the table has fixed layout (signal input) */
  readonly fixed = input<boolean>(false);
  
  /** Whether the header is sticky (signal input) */
  readonly stickyHeader = input<boolean>(false);
  
  /** Whether the table is empty (signal input) */
  readonly isEmpty = input<boolean>(false);
  
  /** Whether to show empty state (signal input) */
  readonly showEmptyState = input<boolean>(true);
  
  /** Empty state text (signal input) */
  readonly emptyStateText = input<string>('No data available');
  
  /** ARIA label for accessibility (signal input) */
  readonly ariaLabel = input<string | undefined>(undefined);
  
  /** ARIA describedby for accessibility (signal input) */
  readonly ariaDescribedBy = input<string | undefined>(undefined);
  
  /**
   * Computed: Container CSS classes
   */
  readonly containerClasses = computed(() => {
    return [
      'table-container',
      this.responsive() ? 'table-responsive' : ''
    ].filter(Boolean).join(' ');
  });
  
  /**
   * Computed: Table CSS classes
   */
  readonly tableClasses = computed(() => {
    return [
      `table-${this.size()}`,
      this.striped() ? 'table-striped' : '',
      this.hoverable() ? 'table-hoverable' : '',
      this.bordered() ? 'table-bordered' : '',
      this.compact() ? 'table-compact' : '',
      this.fixed() ? 'table-fixed' : '',
      this.stickyHeader() ? 'table-sticky-header' : ''
    ].filter(Boolean).join(' ');
  });
}
