import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '@erp/shared/ui';
import { CompanyFacade } from '@erp/shared/util-state';
import { LanguageSwitchComponent } from '@erp/shared/ui';

@Component({
  selector: 'app-profile-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    LanguageSwitchComponent,
  ],
  template: `
    <div class="flex align-items-center gap-3">
      <p-avatar
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
        shape="circle"
        class="cursor-pointer"
        (click)="menu.toggle($event)"
      >
      </p-avatar>

      <p-menu
        #menu
        [model]="items()"
        [popup]="true"
        appendTo="body"
        styleClass="w-64"
      >
        <ng-template pTemplate="start">
          <div
            class="p-3 border-bottom-1 surface-border flex align-items-center gap-2"
          >
            <span class="font-bold">Admin User</span>
          </div>
        </ng-template>

        <!-- Custom Template for Language Switch -->
        <ng-template pTemplate="item" let-item>
          <div *ngIf="item.id === 'language-switch'" class="p-2">
            <lib-language-switch styleClass="w-full"></lib-language-switch>
          </div>

          <a
            *ngIf="item.id !== 'language-switch'"
            [attr.href]="item.url"
            class="p-menuitem-link flex align-items-center p-3 cursor-pointer"
          >
            <span [class]="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <span
              *ngIf="item.badge"
              class="ml-auto bg-primary text-white border-round py-1 px-2 text-xs"
              >{{ item.badge }}</span
            >
            <span
              *ngIf="item.shortcut"
              class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </a>
        </ng-template>
      </p-menu>
    </div>
  `,
})
export class ProfileDropdownComponent {
  private themeService = inject(ThemeService);
  private companyFacade = inject(CompanyFacade);

  items = signal<MenuItem[]>([
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        /* Navigate to profile */
      },
    },
    {
      separator: true,
    },
    {
      label: 'Language',
      id: 'language-switch', // Marker for custom template
      styleClass: 'p-0', // Reset padding for custom component
    },
    {
      label: 'Theme',
      icon: 'pi pi-palette',
      items: [
        {
          label: 'Light',
          icon: 'pi pi-sun',
          command: () => this.themeService.setTheme('light'),
        },
        {
          label: 'Dark',
          icon: 'pi pi-moon',
          command: () => this.themeService.setTheme('dark'),
        },
        {
          label: 'System',
          icon: 'pi pi-desktop',
          command: () => this.themeService.setTheme('system'),
        },
      ],
    },
    {
      label: 'Switch Company',
      icon: 'pi pi-building',
      items: this.getCompanyItems(),
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      routerLink: '/auth/login',
    },
  ]);

  constructor() {
    // Reactively update company items if companies list changes (in a real app)
    // For now static mock is fine, but structurally:
    /*
      effect(() => {
          const companies = this.companyFacade.companies();
          // Logic to update `items` signal deep in the structure
      });
      */
  }

  getCompanyItems(): MenuItem[] {
    return this.companyFacade.companies().map((c) => ({
      label: c.name,
      icon:
        c.id === this.companyFacade.activeCompany()?.id
          ? 'pi pi-check'
          : 'pi pi-building', // Show checkmark for active
      command: () => this.companyFacade.setCompany(c.id),
    }));
  }
}
