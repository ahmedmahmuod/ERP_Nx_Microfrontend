/**
 * Dashboard Component
 *
 * Main dashboard landing page.
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">Welcome Back!</h1>
          <p class="dashboard-subtitle">Select a module to get started</p>
        </div>
      </div>

      <div class="modules-grid">
        @for (module of modules; track module.id) {
          <div
            class="module-card"
            [class]="'module-card-' + module.color"
            (click)="navigateToModule(module.route)"
            role="button"
            tabindex="0"
            (keydown.enter)="navigateToModule(module.route)"
            (keydown.space)="navigateToModule(module.route)"
          >
            <div class="module-icon">
              <i [class]="'pi ' + module.icon"></i>
            </div>
            <h3 class="module-title">{{ module.title }}</h3>
            <p class="module-description">{{ module.description }}</p>
            <div class="module-arrow">
              <i class="pi pi-arrow-right"></i>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .dashboard-header {
      margin-bottom: 3rem;
    }

    .dashboard-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text-primary);
      margin: 0 0 0.5rem 0;
    }

    .dashboard-subtitle {
      font-size: 1rem;
      color: var(--color-text-secondary);
      margin: 0;
    }

    .modules-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    @media (min-width: 640px) {
      .modules-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .modules-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .module-card {
      position: relative;
      padding: 2rem 1.5rem;
      background-color: var(--color-bg-primary);
      border: 1px solid var(--color-border-primary);
      border-radius: var(--radius-lg);
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
    }

    .module-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: currentColor;
    }

    .module-card:focus {
      outline: 2px solid var(--color-border-focus);
      outline-offset: 2px;
    }

    .module-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 0.75rem;
      margin-bottom: 1.5rem;
      transition: all 0.2s ease;
    }

    .module-icon i {
      font-size: 1.75rem;
      color: currentColor;
    }

    .module-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0 0 0.5rem 0;
    }

    .module-description {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    .module-arrow {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.2s ease;
    }

    .module-card:hover .module-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    .module-arrow i {
      font-size: 1rem;
      color: currentColor;
    }

    /* Color Variants */
    .module-card-amber {
      color: #f59e0b;
    }

    .module-card-amber .module-icon {
      background-color: #fef3c7;
    }

    :host-context(.dark) .module-card-amber .module-icon {
      background-color: #78350f;
    }

    .module-card-emerald {
      color: #10b981;
    }

    .module-card-emerald .module-icon {
      background-color: #d1fae5;
    }

    :host-context(.dark) .module-card-emerald .module-icon {
      background-color: #064e3b;
    }

    .module-card-violet {
      color: #8b5cf6;
    }

    .module-card-violet .module-icon {
      background-color: #f5f3ff;
    }

    :host-context(.dark) .module-card-violet .module-icon {
      background-color: #5b21b6;
    }

    .module-card-pink {
      color: #ec4899;
    }

    .module-card-pink .module-icon {
      background-color: #fce7f3;
    }

    :host-context(.dark) .module-card-pink .module-icon {
      background-color: #831843;
    }

    .module-card-orange {
      color: #f97316;
    }

    .module-card-orange .module-icon {
      background-color: #ffedd5;
    }

    :host-context(.dark) .module-card-orange .module-icon {
      background-color: #7c2d12;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
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
      color: 'amber'
    },
    {
      id: 'finance',
      title: 'Finance',
      description: 'Track finances, invoices, and accounting',
      icon: 'pi-wallet',
      route: '/finance',
      color: 'emerald'
    },
    {
      id: 'srm',
      title: 'SRM',
      description: 'Supplier relationship and procurement management',
      icon: 'pi-building',
      route: '/srm',
      color: 'violet'
    },
    {
      id: 'pm',
      title: 'Project Management',
      description: 'Plan, track, and deliver projects',
      icon: 'pi-sitemap',
      route: '/pm',
      color: 'pink'
    },
    {
      id: 'warehouses',
      title: 'Warehouses',
      description: 'Manage inventory, stock, and warehouse operations',
      icon: 'pi-box',
      route: '/warehouses',
      color: 'orange'
    }
  ];

  navigateToModule(route: string): void {
    this.router.navigate([route]);
  }
}
