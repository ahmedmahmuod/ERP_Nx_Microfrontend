import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';
import { UserFacade, PermissionsStore } from '@erp/shared/util-state';

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
  // Expose user first name for template
  readonly userName = this.userFacade.userFirstName;

  // Inject Permissions
  readonly permissionsStore = inject(PermissionsStore);

  readonly modules = [
    {
      id: 'hr',
      title: 'HR & Payroll',
      description: 'Manage employees, payroll, and HR operations',
      icon: 'pi-users',
      route: '/hr',
      permissionKey: 'PayrollModule',
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
      permissionKey: 'FinanceModule', // Reverted to strict module key (hidden for this user)
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
      permissionKey: 'SRM', // Reverted to strict module key (hidden for this user)
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
      permissionKey: 'ProjectManagmentModule', // Updated based on user JSON
      color: {
        name: 'pink',
        light: { text: 'rgb(236 72 153)', bg: 'rgb(252 231 243)' },
        dark: { text: 'rgb(124 58 237)', bg: 'rgb(157 23 77)' },
      },
    },
    {
      id: 'warehouses',
      title: 'Warehouses',
      description: 'Manage inventory, stock, and warehouse operations',
      icon: 'pi-box',
      route: '/warehouses',
      permissionKey: 'WarehousesModule',
      color: {
        name: 'orange',
        light: { text: 'rgb(234 88 12)', bg: 'rgb(255 237 213)' },
        dark: { text: 'rgb(234 88 12)', bg: 'rgb(124 45 18)' },
      },
    },
  ];

  // Operational Items (Uniform Dark Gray)
  readonly operationalItems = [
    {
      id: 'documents',
      title: 'Documents',
      description: 'Manage company documents and archives',
      icon: 'pi-file',
      route: '/documents', // Placeholder route
      permissionKey: 'Documents',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' }, // Dark Gray
      },
    },
    {
      id: 'needs',
      title: 'Need Requests',
      description: 'Track and manage need requests',
      icon: 'pi-list',
      route: '/needs-requests', // Placeholder route
      permissionKey: 'NeedsRequest',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'payments',
      title: 'Payment Requests',
      description: 'Manage payment requests and approvals',
      icon: 'pi-dollar',
      route: '/payment-requests', // Placeholder route
      permissionKey: 'MyPaymentRequests',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'pipeline',
      title: 'Processes Pipeline',
      description: 'View and manage process pipelines',
      icon: 'pi-chart-line',
      route: '/pipeline', // Placeholder route
      permissionKey: 'PiblineAp',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'entities',
      title: 'Entities',
      description: 'Manage business entities and vendors',
      icon: 'pi-briefcase',
      route: '/vendors',
      permissionKey: 'EntitiesList',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
  ];

  // Filtered modules (Apps)
  readonly visibleModules = computed(() => {
    return this.modules.filter(
      (m) =>
        !m.permissionKey ||
        this.permissionsStore.canAccessPage(m.permissionKey),
    );
  });

  // Filtered Operational Items
  readonly visibleOperationalItems = computed(() => {
    return this.operationalItems.filter(
      (item) =>
        !item.permissionKey ||
        this.permissionsStore.canAccessPage(item.permissionKey),
    );
  });

  // Debug info
  readonly debugAllowedKeys = computed(() =>
    Array.from(this.permissionsStore.allowedPages()).sort(),
  );

  navigateToModule(route: string): void {
    this.router.navigate([route]);
  }
}
