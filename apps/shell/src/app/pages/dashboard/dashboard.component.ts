import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  OnInit,
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
export class DashboardComponent implements OnInit {
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
      icon: 'pi-briefcase',
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
      icon: 'pi-dollar', // Changed from pi-sack-dollar to closest PrimeIcon
      route: '/finance',
      permissionKey: 'FinanceModule',
      color: {
        name: 'emerald',
        light: { text: 'rgb(16 185 129)', bg: 'rgb(209 250 229)' },
        dark: { text: 'rgb(16 185 129)', bg: 'rgb(6 78 59)' },
      },
    },
    {
      id: 'warehouse',
      title: 'Warehouses',
      description: 'Manage inventory, stock, and warehouse operations',
      icon: 'pi-box', // pi-warehouse not standard, using pi-box
      route: '/warehouses',
      permissionKey: 'WarehouseModule',
      color: {
        name: 'orange',
        light: { text: 'rgb(234 88 12)', bg: 'rgb(255 237 213)' },
        dark: { text: 'rgb(234 88 12)', bg: 'rgb(124 45 18)' },
      },
    },
    {
      id: 'pm',
      title: 'Project Management',
      description: 'Plan, track, and deliver projects',
      icon: 'pi-sitemap',
      route: '/pm',
      permissionKey: 'ProjectManagmentModule',
      color: {
        name: 'pink',
        light: { text: 'rgb(236 72 153)', bg: 'rgb(252 231 243)' },
        dark: { text: 'rgb(124 58 237)', bg: 'rgb(157 23 77)' },
      },
    },
    {
      id: 'srm',
      title: 'SRM',
      description: 'Supplier relationship and procurement management',
      icon: 'pi-database',
      route: '/srm',
      permissionKey: 'SRMModule',
      color: {
        name: 'violet',
        light: { text: 'rgb(124 58 237)', bg: 'rgb(245 243 255)' },
        dark: { text: 'rgb(124 58 237)', bg: 'rgb(76 29 149)' },
      },
    },
  ];

  // Operational Items (Uniform Dark Gray)
  readonly operationalItems = [
    {
      id: 'entities',
      title: 'Entities',
      description: 'Manage business entities and vendors',
      icon: 'pi-users', // best match for fa-people-group
      route: '/entities',
      permissionKey: 'EntitiesList',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Manage all resources and their allocation',
      icon: 'pi-database',
      route: '/resources',
      permissionKey: 'Resources',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'pipeline',
      title: 'Processes Pipeline',
      description: 'Manage all processes and their pipeline',
      icon: 'pi-database',
      route: '/pipeline',
      permissionKey: 'PiblineApp',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'payments',
      title: 'Payment Requests',
      description: 'Manage all payment requests and transactions',
      icon: 'pi-credit-card',
      route: '/payment-requests',
      permissionKey: 'PaymentRequest',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'needs',
      title: 'Needs Requests',
      description: 'Create and manage all need requests',
      icon: 'pi-question-circle', // BEST MATCH for fa-question
      route: '/needs-requests',
      permissionKey: 'NeedsRequest',
      color: {
        name: 'gray',
        light: { text: 'rgb(55 65 81)', bg: 'rgb(243 244 246)' },
        dark: { text: 'rgb(255 255 255)', bg: 'rgb(55 65 81)' },
      },
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Access and manage all important documents',
      icon: 'pi-file',
      route: '/documents',
      permissionKey: 'DocumnetsModule', // Preserving backend typo
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

  /**
   * Load Shell permissions when dashboard initializes
   * This ensures permission-based filtering works correctly
   */
  ngOnInit(): void {
    // Load Shell module permissions (Module ID 10)
    // This is non-blocking and updates the store asynchronously
    this.permissionsStore.loadPermissions(10);
  }

  navigateToModule(route: string): void {
    this.router.navigate([route]);
  }
}
