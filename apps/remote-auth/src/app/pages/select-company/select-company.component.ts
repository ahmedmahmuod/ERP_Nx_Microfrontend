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
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { CompanyFacade, type Company } from '@erp/shared/util-state';
import { SelectModule } from 'primeng/select';
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
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'auth',
    },
  ],
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCompanyComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly companyFacade = inject(CompanyFacade);

  // Local state
  readonly selectedCompanyId = signal<string | null>(null);

  // Facade state
  readonly companies = this.companyFacade.companies;
  readonly isLoading = this.companyFacade.isLoading;

  ngOnInit(): void {
    // Load companies on init
    this.companyFacade.loadCompanies();
  }

  /**
   * Confirm and proceed
   */
  confirmSelection(): void {
    const id = this.selectedCompanyId();
    if (id) {
      this.companyFacade.setCompany(id);
      // Explicitly navigate to shell's dashboard
      window.location.href = '/dashboard';
    }
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
