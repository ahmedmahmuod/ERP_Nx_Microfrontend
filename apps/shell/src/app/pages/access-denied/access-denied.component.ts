/**
 * Access Denied Component
 * Shown when user tries to access a page without proper permissions
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent, CardComponent } from '@erp/shared/ui';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [ButtonComponent, CardComponent],
  template: `
    <div class="access-denied-container">
      <erp-card elevation="lg">
        <div card-body class="access-denied-content">
          <i class="pi pi-lock access-denied-icon"></i>
          <h1 class="access-denied-title">Access Denied</h1>
          <p class="access-denied-message">
            You don't have permission to access this page.
            Please contact your administrator if you believe this is an error.
          </p>
          <div class="access-denied-actions">
            <erp-button
              variant="primary"
              size="lg"
              (click)="goToDashboard()"
            >
              <i class="pi pi-home"></i>
              Go to Dashboard
            </erp-button>
            <erp-button
              variant="secondary"
              size="lg"
              (click)="goBack()"
            >
              <i class="pi pi-arrow-left"></i>
              Go Back
            </erp-button>
          </div>
        </div>
      </erp-card>
    </div>
  `,
  styles: [`
    .access-denied-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: var(--spacing-lg);
      background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%);
    }

    :host-context(.dark) .access-denied-container {
      background: linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-neutral-800) 100%);
    }

    .access-denied-content {
      text-align: center;
      padding: var(--spacing-2xl);
      max-width: 500px;
    }

    .access-denied-icon {
      font-size: 4rem;
      color: var(--color-accent-500);
      margin-bottom: var(--spacing-lg);
    }

    .access-denied-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 var(--spacing-md) 0;
    }

    .access-denied-message {
      font-size: 1rem;
      color: var(--color-text-secondary);
      margin: 0 0 var(--spacing-xl) 0;
      line-height: 1.6;
    }

    .access-denied-actions {
      display: flex;
      gap: var(--spacing-md);
      justify-content: center;
      flex-wrap: wrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessDeniedComponent {
  private readonly router = inject(Router);

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goBack(): void {
    window.history.back();
  }
}
