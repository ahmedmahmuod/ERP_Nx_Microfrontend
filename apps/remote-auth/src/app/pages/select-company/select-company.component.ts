/**
 * Company Selection Component (Auth Remote version)
 *
 * This component is Step 2 of the login wizard.
 */

import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  OnInit,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import {
  CompanyFacade,
  type Company,
  PermissionsFacade,
} from '@erp/shared/util-state';
import { provideTranslocoScope } from '@erp/shared/util-i18n';
import { SelectModule } from 'primeng/select';
import { ToastNotificationService } from '@erp/shared/ui/primeng-components';
import {
  ButtonComponent,
  CardComponent,
  StandaloneLanguageSwitchComponent,
} from '@erp/shared/ui';
import { BRAND } from '@erp/shared/config';

@Component({
  selector: 'app-select-company',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslocoDirective,
    ButtonComponent,
    CardComponent,
    SelectModule,
    StandaloneLanguageSwitchComponent,
  ],
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideTranslocoScope('auth')],
})
export class SelectCompanyComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly companyFacade = inject(CompanyFacade);
  private readonly permissionsFacade = inject(PermissionsFacade);
  private readonly toastService = inject(ToastNotificationService);
  private readonly transloco = inject(TranslocoService);

  // Local state
  readonly BRAND = BRAND;
  readonly selectedCompanyId = signal<string | null>(null);

  // Facade state
  readonly companies = this.companyFacade.companies;
  readonly isLoading = this.companyFacade.isLoading;

  // Computed: Check if companies list is empty
  readonly hasNoCompanies = computed(() => this.companies().length === 0);

  ngOnInit(): void {
    // Companies are already set by AuthFacade after login
    // They are persisted to localStorage and loaded automatically
  }

  /**
   * Confirm and proceed
   * Initializes permissions context and navigates to dashboard
   */
  async confirmSelection(): Promise<void> {
    const id = this.selectedCompanyId();
    if (!id) return;

    // Set selected company
    this.companyFacade.setCompany(id);

    // Get user ID from localStorage
    const userStr = localStorage.getItem('erp-user');
    if (!userStr) {
      this.showError('User session not found. Please login again.');
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const userId = user.id ? parseInt(user.id) : null;

      if (!userId) {
        this.showError('Invalid user session. Please login again.');
        return;
      }

      // Initialize permissions context (permissions will be loaded on-demand)
      this.permissionsFacade.initializeContext(userId, id);

      // Navigate to dashboard using Angular router (avoids page reload)
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to navigate';
      this.showError(errorMessage);
    }
  }

  /**
   * Show error toast
   */
  private showError(message: string): void {
    this.toastService.error(
      this.transloco.translate('errors.unknown', {}, 'auth'),
      message,
    );
  }

  /**
   * Back to login
   */
  backToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByCompanyId(index: number, company: Company): string {
    return company.id;
  }
}
