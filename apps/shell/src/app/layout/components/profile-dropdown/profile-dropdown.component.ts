import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { InputTextModule } from 'primeng/inputtext';
import { CompanyFacade } from '@erp/shared/util-state';
import { LanguageSwitchComponent } from '@erp/shared/ui';

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
  ],
  template: `
    <div 
      class="flex items-center gap-2 px-3 py-1 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors duration-150 focus:outline-none" 
      (click)="$any(op).toggle($event)"
      (keyup.enter)="$any(op).toggle($event)"
      role="button"
      tabindex="0"
    >
      <div class="text-right flex flex-col">
        <span class="font-bold text-sm text-gray-900 leading-none">Admin</span>
        <span class="text-xs text-gray-600 leading-none mt-1">administrator</span>
      </div>
      <p-avatar
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
        shape="circle"
        size="normal"
      >
      </p-avatar>
      <i class="pi pi-chevron-down text-[10px] text-gray-600 ml-1"></i>
    </div>

    <!-- Main Profile Overlay -->
    <p-popover #op styleClass="profile-overlay shadow-lg p-0 overflow-hidden rounded-xl">
      <div class="flex flex-col w-72">
        
        <!-- User Section -->
        <div class="flex items-center gap-3 p-3 border-b border-gray-200">
          <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" size="large"></p-avatar>
          <div class="flex flex-col">
            <span class="font-bold text-gray-900">Admin User</span>
            <span class="text-xs text-gray-600">admin@assemble.com</span>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="flex flex-col py-2">
          
          <button pButton class="p-button-text p-button-plain justify-start w-full px-3 py-3 rounded-none hover:bg-gray-100">
            <i class="pi pi-user mr-3 text-gray-600"></i>
            <span class="font-medium text-gray-700">User Profile</span>
          </button>

          <button pButton (click)="$any(companyOp).toggle($event, $any(op).el.nativeElement)" class="p-button-text p-button-plain justify-start w-full px-3 py-3 rounded-none hover:bg-gray-100">
            <i class="pi pi-building mr-3 text-gray-600"></i>
            <span class="font-medium text-gray-700">Switch Company</span>
            <i class="pi pi-chevron-right ml-auto text-[10px] text-gray-500"></i>
          </button>

          <button pButton class="p-button-text p-button-plain justify-start w-full px-3 py-3 rounded-none hover:bg-gray-100">
            <i class="pi pi-question-circle mr-3 text-gray-600"></i>
            <span class="font-medium text-gray-700">Supports</span>
          </button>

          <button pButton class="p-button-text p-button-plain justify-start w-full px-3 py-3 rounded-none hover:bg-gray-100">
            <i class="pi pi-lock mr-3 text-gray-600"></i>
            <span class="font-medium text-gray-700">Change Password</span>
          </button>

          <!-- Language Section (Styled as item) -->
          <lib-language-switch></lib-language-switch>

          <div class="border-t border-gray-200 my-1"></div>

          <!-- Logout -->
          <button pButton class="p-button-text p-button-danger justify-start w-full px-3 py-3 rounded-none hover:bg-red-50">
            <i class="pi pi-sign-out mr-3 text-red-500"></i>
            <span class="font-bold text-red-500">Sign Out</span>
          </button>

        </div>
      </div>
    </p-popover>

    <!-- Company Switch Overlay -->
    <p-popover #companyOp styleClass="company-overlay shadow-lg p-0 overflow-hidden rounded-xl">
      <div class="flex flex-col w-80">
        <div class="p-3 border-b border-gray-200 bg-gray-50">
          <span class="font-bold block mb-2 text-gray-700">Switch Company</span>
          <div class="relative w-full">
            <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" pInputText placeholder="Search company..." class="w-full pl-9 py-2 text-sm" [(ngModel)]="searchQuery" />
          </div>
        </div>
        
        <div class="flex flex-col max-h-60 overflow-auto py-1">
          @for (company of filteredCompanies(); track company.id) {
            <button 
              pButton 
              (click)="selectCompany(company.id); companyOp.hide(); op.hide()"
              class="p-button-text p-button-plain justify-start w-full px-3 py-3 rounded-none hover:bg-gray-100"
              [ngClass]="{'bg-blue-50': company.id === activeCompany()?.id}"
            >
              <div class="flex flex-col items-start">
                <span class="font-medium" [ngClass]="{'text-blue-600': company.id === activeCompany()?.id}">{{ company.name }}</span>
                <span class="text-xs text-gray-500">{{ company.id }}</span>
              </div>
              @if (company.id === activeCompany()?.id) {
                <i class="pi pi-check ml-auto text-blue-600"></i>
              }
            </button>
          }
        </div>
      </div>
    </p-popover>
  `,
  styles: [
    `
      :host ::ng-deep {
        .p-popover {
          @apply p-0 border border-gray-200 bg-white;
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
}
