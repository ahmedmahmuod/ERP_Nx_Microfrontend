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
import { SelectModule } from 'primeng/select';
import { ToastNotificationService } from '@erp/shared/ui/primeng-components';
import {
  ButtonComponent,
  CardComponent,
  StandaloneLanguageSwitchComponent,
} from '@erp/shared/ui';

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
})
export class SelectCompanyComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly companyFacade = inject(CompanyFacade);
  private readonly permissionsFacade = inject(PermissionsFacade);
  private readonly toastService = inject(ToastNotificationService);
  private readonly transloco = inject(TranslocoService);

  // Local state
  readonly selectedCompanyId = signal<string | null>(null);
  readonly isLoadingPermissions = signal<boolean>(false);

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
   * Loads permissions for default module before navigation
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

      // Initialize permissions context
      this.permissionsFacade.initializeContext(userId, id);

      // Load permissions for default module (HR)
      this.isLoadingPermissions.set(true);
      await this.permissionsFacade.loadModulePermissions('hr');
      this.isLoadingPermissions.set(false);

      // Navigate to dashboard using Angular router (avoids page reload)
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.isLoadingPermissions.set(false);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load permissions';
      this.showError(errorMessage);
    }
  }

  /**
   * Show error toast
   */
  private showError(message: string): void {
    this.toastService.error(
      this.transloco.translate('auth.errors.unknown'),
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
