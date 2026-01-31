import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { InputTextModule } from 'primeng/inputtext';
import { CompanyFacade, UserFacade } from '@erp/shared/util-state';
import { AuthFacadeService } from '@erp/remote-auth/src/app/services/auth-facade.service';
import { LanguageSwitchComponent } from '@erp/shared/ui/primeng-components';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';
@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AvatarModule,
    ButtonModule,
    PopoverModule,
    InputTextModule,
    LanguageSwitchComponent,
    TranslocoDirective,
  ],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  template: `
    <ng-container *transloco="let t; read: 'shell'">
      <div
        class="flex items-center gap-2 px-3 py-1 rounded-xl cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors duration-150 focus:outline-none"
        (click)="$any(op).toggle($event)"
        (keyup.enter)="$any(op).toggle($event)"
        role="button"
        tabindex="0"
      >
        <div class="text-right flex flex-col">
          <span
            class="font-bold text-sm text-gray-900 dark:text-gray-100 leading-none"
            >{{ userFacade.userName() }}</span
          >
          <span class="text-[10px] text-gray-500 leading-none mt-1">{{
            userFacade.userEmail()
          }}</span>
        </div>
        @if (userFacade.user()?.avatar) {
          <p-avatar
            [image]="userFacade.user()!.avatar"
            shape="circle"
            size="normal"
            class="border border-gray-200 dark:border-gray-700"
          >
          </p-avatar>
        } @else {
          <p-avatar
            [label]="userFacade.userInitials()"
            shape="circle"
            size="normal"
            styleClass="bg-[var(--accent-primary)] text-white font-semibold"
            class="border border-gray-200 dark:border-gray-700"
          >
          </p-avatar>
        }
        <i class="pi pi-chevron-down text-[10px] text-gray-400 ml-1"></i>
      </div>

      <!-- Main Profile Overlay -->
      <p-popover
        #op
        styleClass="profile-overlay shadow-xl overflow-hidden rounded-xl border border-[var(--color-border-primary)]"
      >
        <div class="flex flex-col w-72 bg-[var(--color-bg-primary)]">
          <!-- User Section -->
          <div
            class="flex items-center gap-3 p-4 border-b border-[var(--color-border-primary)]"
          >
            @if (userFacade.user()?.avatar) {
              <p-avatar
                [image]="userFacade.user()!.avatar"
                shape="circle"
                size="large"
              ></p-avatar>
            } @else {
              <p-avatar
                [label]="userFacade.userInitials()"
                shape="circle"
                size="large"
                styleClass="bg-[var(--accent-primary)] text-white font-semibold"
              ></p-avatar>
            }
            <div class="flex flex-col">
              <span class="font-bold text-[var(--color-text-primary)]">{{
                userFacade.userName()
              }}</span>
              <span class="text-xs text-[var(--color-text-secondary)]">{{
                userFacade.userEmail()
              }}</span>
            </div>
          </div>

          <!-- Menu Items -->
          <div class="flex flex-col py-2">
            <button
              pButton
              class="p-button-text p-button-plain justify-start w-full px-4 py-3 rounded-none hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <i
                class="pi pi-user mr-3 rtl:ml-3 rtl:mr-0 text-[var(--accent-primary)] dark:text-[var(--accent-light)]"
              ></i>
              <span class="font-medium text-[var(--color-text-primary)]">{{
                t('profile.userProfile')
              }}</span>
            </button>

            <button
              pButton
              (click)="
                $any(companyOp).toggle($event, $any(op).el.nativeElement)
              "
              class="p-button-text p-button-plain justify-start w-full px-4 py-3 rounded-none hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <i
                class="pi pi-building mr-3 rtl:ml-3 rtl:mr-0 text-[var(--accent-primary)] dark:text-[var(--accent-light)]"
              ></i>
              <span class="font-medium text-[var(--color-text-primary)]">{{
                t('profile.switchCompany')
              }}</span>
              <i
                class="pi pi-chevron-right ml-auto rtl:mr-auto rtl:ml-0 text-[10px] text-gray-400"
              ></i>
            </button>

            <button
              pButton
              class="p-button-text p-button-plain justify-start w-full px-4 py-3 rounded-none hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <i
                class="pi pi-question-circle mr-3 rtl:ml-3 rtl:mr-0 text-[var(--accent-primary)] dark:text-[var(--accent-light)]"
              ></i>
              <span class="font-medium text-[var(--color-text-primary)]">{{
                t('profile.support')
              }}</span>
            </button>

            <button
              pButton
              class="p-button-text p-button-plain justify-start w-full px-4 py-3 rounded-none hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              <i
                class="pi pi-lock mr-3 rtl:ml-3 rtl:mr-0 text-[var(--accent-primary)] dark:text-[var(--accent-light)]"
              ></i>
              <span class="font-medium text-[var(--color-text-primary)]">{{
                t('profile.changePassword')
              }}</span>
            </button>

            <!-- Language Section -->
            <lib-language-switch [isNested]="true"></lib-language-switch>

            <div
              class="border-t border-gray-100 dark:border-gray-800 my-1"
            ></div>

            <!-- Logout -->
            <button
              pButton
              (click)="signOut()"
              class="p-button-text p-button-danger justify-start w-full px-4 py-3 rounded-none hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
            >
              <i class="pi pi-sign-out mr-3 rtl:ml-3 rtl:mr-0 text-red-500"></i>
              <span class="font-bold text-red-500">{{
                t('profile.signOut')
              }}</span>
            </button>
          </div>
        </div>
      </p-popover>

      <!-- Company Switch Overlay -->
      <p-popover
        #companyOp
        styleClass="company-overlay shadow-xl overflow-hidden rounded-xl border border-[var(--color-border-primary)]"
      >
        <div class="flex flex-col w-80 bg-[var(--color-bg-primary)]">
          <div
            class="p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]"
          >
            <span
              class="font-bold block mb-3 text-[var(--color-text-primary)]"
              >{{ t('profile.switchCompany') }}</span
            >
            <div class="relative w-full">
              <i
                class="pi pi-search absolute left-3 rtl:right-3 rtl:left-auto top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]"
              ></i>
              <input
                type="text"
                pInputText
                [placeholder]="t('profile.searchCompany')"
                class="w-full pl-9 rtl:pr-9 rtl:pl-2 py-2 text-sm border-[var(--color-border-primary)] dark:bg-[var(--color-bg-tertiary)]"
                [(ngModel)]="searchQuery"
              />
            </div>
          </div>

          <div class="flex flex-col max-h-60 overflow-auto py-1">
            @for (company of filteredCompanies(); track company.id) {
              <button
                pButton
                (click)="selectCompany(company.id); companyOp.hide(); op.hide()"
                class="p-button-text p-button-plain justify-start w-full px-4 py-3 rounded-none hover:bg-[var(--color-bg-hover)] transition-colors"
                [style.background-color]="
                  company.id === activeCompany()?.id
                    ? 'rgb(from var(--accent-primary) r g b / 0.1)'
                    : ''
                "
              >
                <div class="flex flex-col items-start rtl:items-end">
                  <span
                    class="font-medium text-[var(--color-text-primary)]"
                    [style.color]="
                      company.id === activeCompany()?.id
                        ? 'var(--accent-primary)'
                        : ''
                    "
                    >{{ company.name }}</span
                  >
                  <span
                    class="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-wider"
                    >{{ company.id }}</span
                  >
                </div>
                @if (company.id === activeCompany()?.id) {
                  <i
                    class="pi pi-check ml-auto rtl:mr-auto rtl:ml-0 text-[var(--accent-primary)] dark:text-[var(--accent-light)]"
                  ></i>
                }
              </button>
            }
          </div>
        </div>
      </p-popover>
    </ng-container>
  `,
  styles: [
    `
      :host ::ng-deep {
        .p-popover {
          /* Rely on global overrides in global.scss */
          @apply p-0 overflow-hidden;
        }
        .p-popover-content {
          @apply p-0;
        }
      }
    `,
  ],
})
export class ProfileDropdownComponent {
  private companyFacade = inject(CompanyFacade);
  private authFacade = inject(AuthFacadeService);
  readonly userFacade = inject(UserFacade);

  searchQuery = '';

  activeCompany = this.companyFacade.activeCompany;
  companies = this.companyFacade.companies;

  filteredCompanies = () => {
    const q = this.searchQuery.toLowerCase();
    return this.companies().filter((c) => c.name.toLowerCase().includes(q));
  };

  selectCompany(id: string) {
    this.companyFacade.setCompany(id);
  }

  /**
   * Sign out user
   * Clears auth state, company selection, and redirects to login
   */
  signOut(): void {
    // Clear auth state
    this.authFacade.logout();

    // Clear selected company
    this.companyFacade.clearCompany();

    // Redirect to login page (cross-microfrontend navigation)
    window.location.href = '/auth/login';
  }
}
