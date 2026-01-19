import { Injectable, signal, computed, effect } from '@angular/core';

export interface Company {
  id: string;
  name: string;
  logo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyFacade {
  private readonly STORAGE_KEY = 'erp_active_company';

  // Mock Companies
  private readonly MOCK_COMPANIES: Company[] = [
    { id: '1', name: 'Acme Corp', logo: '🏢' },
    { id: '2', name: 'Globex Inc', logo: '🏭' },
    { id: '3', name: 'Soylent Corp', logo: '🧪' },
  ];

  // State
  private readonly _activeCompany = signal<Company | null>(null);
  private readonly _companies = signal<Company[]>(this.MOCK_COMPANIES);

  // Selectors
  readonly activeCompany = computed(() => this._activeCompany());
  readonly companies = computed(() => this._companies());

  constructor() {
    this.init();

    // Persistence
    effect(() => {
      const company = this._activeCompany();
      if (company) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(company));
      }
    });
  }

  setCompany(companyId: string): void {
    const found = this._companies().find((c) => c.id === companyId);
    if (found) {
      this._activeCompany.set(found);
    }
  }

  private init(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const company = JSON.parse(saved);
        // Verify it still exists in list (for real apps, avoiding stale data)
        const found = this.MOCK_COMPANIES.find((c) => c.id === company.id);
        this._activeCompany.set(found || this.MOCK_COMPANIES[0]);
      } catch {
        this._activeCompany.set(this.MOCK_COMPANIES[0]);
      }
    } else {
      this._activeCompany.set(this.MOCK_COMPANIES[0]);
    }
  }
}
