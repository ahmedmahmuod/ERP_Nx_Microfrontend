/**
 * Company Facade
 *
 * Manages company selection state and operations.
 * API-ready: mock data can be replaced with HTTP calls without UI changes.
 * Uses Company domain model from @erp/shared/models
 */

import { Injectable, signal, effect } from '@angular/core';
import { Company } from '@erp/shared/models';

@Injectable({
  providedIn: 'root',
})
export class CompanyFacade {
  private readonly STORAGE_KEY = 'erp-active-company';
  private readonly COMPANIES_STORAGE_KEY = 'erp-companies-list';

  // State
  private readonly _activeCompany = signal<Company | null>(
    this.loadActiveCompanyFromStorage(),
  );
  private readonly _companies = signal<Company[]>(
    this.loadCompaniesFromStorage(),
  );
  private readonly _isLoading = signal<boolean>(false);

  // Public readonly selectors
  readonly activeCompany = this._activeCompany.asReadonly();
  readonly companies = this._companies.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  constructor() {
    // Persistence effect for active company
    effect(() => {
      const company = this._activeCompany();
      if (company) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(company));
      }
    });

    // Persistence effect for companies list
    effect(() => {
      const companies = this._companies();
      if (companies.length > 0) {
        localStorage.setItem(
          this.COMPANIES_STORAGE_KEY,
          JSON.stringify(companies),
        );
      }
    });
  }

  /**
   * Set active company by ID
   */
  setCompany(companyId: string): void {
    const found = this._companies().find((c) => c.id === companyId);
    if (found) {
      this._activeCompany.set(found);
    }
  }

  /**
   * Clear active company (used on logout)
   */
  clearCompany(clearSignal = true): void {
    if (clearSignal) {
      this._activeCompany.set(null);
    }
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Load companies - deprecated, companies come from login response
   * @deprecated Use setCompanies() instead. Companies are set by AuthFacade after login.
   */
  loadCompanies(): void {
    // No-op: companies are set via setCompanies() from AuthFacade after login
    // This method is kept for backward compatibility but does nothing
  }

  /**
   * Set companies from API response or domain models
   */
  setCompanies(companies: Company[]): void {
    this._companies.set(companies);
  }

  /**
   * Load active company from localStorage if exists
   */
  private loadActiveCompanyFromStorage(): Company | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Load companies list from localStorage if exists
   */
  private loadCompaniesFromStorage(): Company[] {
    const saved = localStorage.getItem(this.COMPANIES_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  }

  /**
   * Clear companies list (used on logout)
   */
  clearCompanies(clearSignal = true): void {
    if (clearSignal) {
      this._companies.set([]);
    }
    localStorage.removeItem(this.COMPANIES_STORAGE_KEY);
  }
}
