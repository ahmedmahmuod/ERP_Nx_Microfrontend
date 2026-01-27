/**
 * Company Facade
 *
 * Manages company selection state and operations.
 * API-ready: mock data can be replaced with HTTP calls without UI changes.
 */

import { Injectable, signal, effect } from '@angular/core';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root',
})
export class CompanyFacade {
  private readonly STORAGE_KEY = 'erp-active-company';

  // Mock Companies - ready to be replaced with API data
  private readonly MOCK_COMPANIES: Company[] = [
    {
      id: '1',
      name: 'Acme Corporation',
      logo: '🏢',
      description: 'Global manufacturing and distribution',
      status: 'active',
    },
    {
      id: '2',
      name: 'TechStart Solutions',
      logo: '💻',
      description: 'Software development and IT services',
      status: 'active',
    },
    {
      id: '3',
      name: 'Green Energy Co.',
      logo: '⚡',
      description: 'Renewable energy and sustainability',
      status: 'active',
    },
    {
      id: '4',
      name: 'MediCare Plus',
      logo: '🏥',
      description: 'Healthcare and medical services',
      status: 'active',
    },
    {
      id: '5',
      name: 'Global Logistics Ltd.',
      logo: '🚚',
      description: 'Supply chain and transportation',
      status: 'active',
    },
    {
      id: '6',
      name: 'FinServe Group',
      logo: '💰',
      description: 'Financial services and consulting',
      status: 'active',
    },
  ];

  // State
  private readonly _activeCompany = signal<Company | null>(
    this.loadFromStorage(),
  );
  private readonly _companies = signal<Company[]>(this.MOCK_COMPANIES);
  private readonly _isLoading = signal<boolean>(false);

  // Public readonly selectors
  readonly activeCompany = this._activeCompany.asReadonly();
  readonly companies = this._companies.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  constructor() {
    // Persistence effect
    effect(() => {
      const company = this._activeCompany();
      if (company) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(company));
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
  clearCompany(): void {
    this._activeCompany.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Load companies (mock for now, API-ready)
   */
  loadCompanies(): void {
    this._isLoading.set(true);

    // Simulate API call delay
    setTimeout(() => {
      this._companies.set(this.MOCK_COMPANIES);
      this._isLoading.set(false);
    }, 300);
  }

  /**
   * Load company from localStorage if exists
   */
  private loadFromStorage(): Company | null {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const company = JSON.parse(saved);
        // Verify it still exists in list (avoid stale data)
        const found = this.MOCK_COMPANIES.find((c) => c.id === company.id);
        return found || null;
      } catch {
        return null;
      }
    }
    return null;
  }
}
