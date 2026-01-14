/**
 * Company Service
 * 
 * Manages company selection and switching.
 * Persists selection in localStorage.
 */

import { Injectable, signal, computed } from '@angular/core';

export interface Company {
  id: string;
  name: string;
  code: string;
  logo?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly STORAGE_KEY = 'erp-selected-company';
  
  // Mock companies (replace with API call in production)
  private readonly companiesSignal = signal<Company[]>([
    {
      id: '1',
      name: 'Main Branch',
      code: 'MAIN',
      isActive: true
    },
    {
      id: '2',
      name: 'Branch 2',
      code: 'BR02',
      isActive: true
    },
    {
      id: '3',
      name: 'Branch 3',
      code: 'BR03',
      isActive: true
    },
    {
      id: '4',
      name: 'Inventory',
      code: 'INV',
      isActive: true
    }
  ]);
  
  // Current selected company
  private readonly selectedCompanyIdSignal = signal<string>(this.getInitialCompanyId());
  
  // Public readonly signals
  readonly companies = this.companiesSignal.asReadonly();
  
  readonly selectedCompanyId = this.selectedCompanyIdSignal.asReadonly();
  
  readonly selectedCompany = computed(() => {
    const id = this.selectedCompanyId();
    return this.companies().find(c => c.id === id) || this.companies()[0];
  });
  
  readonly activeCompanies = computed(() => {
    return this.companies().filter(c => c.isActive);
  });
  
  /**
   * Get initial company ID from localStorage
   */
  private getInitialCompanyId(): string {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return stored;
    }
    // Default to first company
    return '1';
  }
  
  /**
   * Select a company
   */
  selectCompany(companyId: string): void {
    const company = this.companies().find(c => c.id === companyId);
    if (company && company.isActive) {
      this.selectedCompanyIdSignal.set(companyId);
      localStorage.setItem(this.STORAGE_KEY, companyId);
    }
  }
  
  /**
   * Load companies from API (future implementation)
   */
  async loadCompanies(): Promise<void> {
    // TODO: Replace with actual API call
    // const companies = await this.http.get<Company[]>('/api/companies').toPromise();
    // this.companiesSignal.set(companies);
  }
  
  /**
   * Get company by ID
   */
  getCompanyById(id: string): Company | undefined {
    return this.companies().find(c => c.id === id);
  }
}
