/**
 * Company Selection Component
 *
 * Allows users to select a company after authentication.
 * This is a mandatory step before accessing the dashboard or any protected routes.
 */

import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  computed,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { CompanyFacade, type Company } from '@erp/shared/util-state';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-select-company',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslocoDirective],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  templateUrl: './select-company.component.html',
  styleUrl: './select-company.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCompanyComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly companyFacade = inject(CompanyFacade);
  private readonly authService = inject(AuthService);

  // Local state
  readonly searchQuery = signal<string>('');

  // Facade state
  readonly companies = this.companyFacade.companies;
  readonly isLoading = this.companyFacade.isLoading;

  // Computed filtered companies based on search
  readonly filteredCompanies = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const allCompanies = this.companies();

    if (!query) {
      return allCompanies;
    }

    return allCompanies.filter(
      (company) =>
        company.name.toLowerCase().includes(query) ||
        (company.description?.toLowerCase().includes(query) ?? false),
    );
  });

  ngOnInit(): void {
    // Load companies on init
    this.companyFacade.loadCompanies();
  }

  /**
   * Handle company selection
   */
  selectCompany(companyId: string): void {
    this.companyFacade.setCompany(companyId);
    this.router.navigate(['/dashboard']);
  }

  /**
   * Handle search input
   */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  /**
   * Clear search
   */
  clearSearch(): void {
    this.searchQuery.set('');
  }

  /**
   * Back to login - clears auth session
   */
  backToLogin(): void {
    this.authService.logout();
  }

  /**
   * Track by function for ngFor optimization
   */
  trackByCompanyId(index: number, company: Company): string {
    return company.id;
  }
}
