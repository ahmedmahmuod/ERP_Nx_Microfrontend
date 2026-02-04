/**
 * Access Denied Component
 *
 * Shared component for displaying access denied / 403 error pages.
 * Can be used across all microfrontends (Shell, HR, Finance, etc.)
 *
 * @example
 * ```html
 * <erp-access-denied [scope]="'shell.pages'"></erp-access-denied>
 * ```
 */

import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ButtonComponent } from '../button/button.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'erp-access-denied',
  standalone: true,
  imports: [ButtonComponent, CardComponent, TranslocoDirective],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessDeniedComponent {
  private readonly router = inject(Router);

  /**
   * Translation scope for the component
   * @default 'shell.pages'
   */
  readonly scope = input<string>('shell.pages');

  /**
   * Navigate to dashboard
   */
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Navigate back to previous page
   */
  goBack(): void {
    window.history.back();
  }
}
