import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { UserFacade } from '@erp/shared/util-state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly userFacade = inject(UserFacade);

  // Expose user first name for template
  readonly userName = this.userFacade.userFirstName;

  readonly modules = [
    {
      id: 'hr',
      title: 'HR & Payroll',
      description: 'Manage employees, payroll, and HR operations',
      icon: 'pi-users',
      route: '/hr',
      color: {
        name: 'amber',
        light: { text: 'rgb(245 158 11)', bg: 'rgb(254 243 199)' },
        dark: { text: 'rgb(245 158 11)', bg: 'rgb(120 53 15)' },
      },
    },
    {
      id: 'finance',
      title: 'Finance',
      description: 'Track finances, invoices, and accounting',
      icon: 'pi-wallet',
      route: '/finance',
      color: {
        name: 'emerald',
        light: { text: 'rgb(16 185 129)', bg: 'rgb(209 250 229)' },
        dark: { text: 'rgb(16 185 129)', bg: 'rgb(6 78 59)' },
      },
    },
    {
      id: 'srm',
      title: 'SRM',
      description: 'Supplier relationship and procurement management',
      icon: 'pi-building',
      route: '/srm',
      color: {
        name: 'violet',
        light: { text: 'rgb(124 58 237)', bg: 'rgb(245 243 255)' },
        dark: { text: 'rgb(124 58 237)', bg: 'rgb(76 29 149)' },
      },
    },
    {
      id: 'pm',
      title: 'Project Management',
      description: 'Plan, track, and deliver projects',
      icon: 'pi-sitemap',
      route: '/pm',
      color: {
        name: 'pink',
        light: { text: 'rgb(236 72 153)', bg: 'rgb(252 231 243)' },
        dark: { text: 'rgb(236 72 153)', bg: 'rgb(157 23 77)' },
      },
    },
    {
      id: 'warehouses',
      title: 'Warehouses',
      description: 'Manage inventory, stock, and warehouse operations',
      icon: 'pi-box',
      route: '/warehouses',
      color: {
        name: 'orange',
        light: { text: 'rgb(234 88 12)', bg: 'rgb(255 237 213)' },
        dark: { text: 'rgb(234 88 12)', bg: 'rgb(124 45 18)' },
      },
    },
  ];

  navigateToModule(route: string): void {
    this.router.navigate([route]);
  }
}
