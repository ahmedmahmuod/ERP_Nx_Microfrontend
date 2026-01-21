import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';

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

  readonly modules = [
    {
      id: 'hr',
      title: 'HR & Payroll',
      description: 'Manage employees, payroll, and HR operations',
      icon: 'pi-users',
      route: '/hr',
      color: 'amber',
    },
    {
      id: 'finance',
      title: 'Finance',
      description: 'Track finances, invoices, and accounting',
      icon: 'pi-wallet',
      route: '/finance',
      color: 'emerald',
    },
    {
      id: 'srm',
      title: 'SRM',
      description: 'Supplier relationship and procurement management',
      icon: 'pi-building',
      route: '/srm',
      color: 'violet',
    },
    {
      id: 'pm',
      title: 'Project Management',
      description: 'Plan, track, and deliver projects',
      icon: 'pi-sitemap',
      route: '/pm',
      color: 'pink',
    },
    {
      id: 'warehouses',
      title: 'Warehouses',
      description: 'Manage inventory, stock, and warehouse operations',
      icon: 'pi-box',
      route: '/warehouses',
      color: 'orange',
    },
  ];

  navigateToModule(route: string): void {
    this.router.navigate([route]);
  }
}
