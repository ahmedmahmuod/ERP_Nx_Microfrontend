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
      color: #1a1a1a;
      margin: 0 0 0.5rem 0;
    }

    .dashboard-subtitle {
      font-size: 1rem;
      color: #6b7280;
      margin: 0;
    }

    :host-context(.dark) .dashboard-title {
      color: #fafafa;
    }

    :host-context(.dark) .dashboard-subtitle {
      color: #9ca3af;
    }

    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      .modules-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .modules-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .module-card {
      position: relative;
      padding: 2rem 1.5rem;
      background-color: #ffffff;
      border: 1px solid #f0f0f0;
      border-radius: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .module-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      border-color: currentColor;
    }

    .module-card:focus {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }

    :host-context(.dark) .module-card {
      background-color: #1a1a1a;
      border-color: #2a2a2a;
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
      color: #1a1a1a;
      margin: 0 0 0.5rem 0;
    }

    .module-description {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0 0 1rem 0;
      line-height: 1.5;
    }

    :host-context(.dark) .module-title {
      color: #fafafa;
    }

    :host-context(.dark) .module-description {
      color: #9ca3af;
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
    .module-card-blue {
      color: #2563eb;
    }

    .module-card-blue .module-icon {
      background-color: #eff6ff;
    }

    :host-context(.dark) .module-card-blue .module-icon {
      background-color: #1e3a8a;
    }

    .module-card-green {
      color: #059669;
    }

    .module-card-green .module-icon {
      background-color: #d1fae5;
    }

    :host-context(.dark) .module-card-green .module-icon {
      background-color: #064e3b;
    }

    .module-card-orange {
      color: #ea580c;
    }

    .module-card-orange .module-icon {
      background-color: #ffedd5;
    }

    :host-context(.dark) .module-card-orange .module-icon {
      background-color: #7c2d12;
    }

    .module-card-purple {
      color: #9333ea;
    }

    .module-card-purple .module-icon {
      background-color: #faf5ff;
    }

    :host-context(.dark) .module-card-purple .module-icon {
      background-color: #581c87;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly router = inject(Router);

  readonly modules = [
    {
      id: 'hr',
      title: 'Human Resources',
      description: 'Manage employees, payroll, and HR operations',
      icon: 'pi-users',
      route: '/hr',
      color: 'blue'
    },
    {
      id: 'finance',
      title: 'Finance',
      description: 'Track finances, invoices, and accounting',
      icon: 'pi-wallet',
      route: '/finance',
      color: 'green'
    },
    {
      id: 'supply',
      title: 'Supply Chain',
      description: 'Manage inventory, suppliers, and logistics',
      icon: 'pi-box',
      route: '/supply',
      color: 'orange'
    },
    {
      id: 'projects',
      title: 'Project Management',
      description: 'Plan, track, and deliver projects',
      icon: 'pi-folder',
      route: '/tasks',
      color: 'purple'
    }
  ];

  navigateToModule(route: string): void {
    this.router.navigate([route]);
  }
}
