/**
 * Dashboard Component
 * 
 * Main dashboard landing page.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardComponent } from '@erp/shared/ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent],
  template: `
    <div class="dashboard">
      <h1 class="dashboard-title">Dashboard</h1>
      
      <div class="dashboard-grid">
        <erp-card [hasHeader]="true" variant="primary">
          <div card-header>Welcome</div>
          <div card-body>
            <p>Welcome to the ERP System. This is your central hub for managing all business operations.</p>
          </div>
        </erp-card>
        
        <erp-card [hasHeader]="true">
          <div card-header>Quick Stats</div>
          <div card-body>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">Active Users</span>
                <span class="stat-value">1,234</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Total Revenue</span>
                <span class="stat-value">$45.2M</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Open Orders</span>
                <span class="stat-value">89</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Pending Tasks</span>
                <span class="stat-value">23</span>
              </div>
            </div>
          </div>
        </erp-card>
        
        <erp-card [hasHeader]="true">
          <div card-header>Recent Activity</div>
          <div card-body>
            <p class="text-muted">No recent activity to display.</p>
          </div>
        </erp-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: rgb(17 24 39);
    }

    :host-context(.dark) .dashboard-title {
      color: rgb(243 244 246);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: rgb(107 114 128);
    }

    :host-context(.dark) .stat-label {
      color: rgb(156 163 175);
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: rgb(17 24 39);
    }

    :host-context(.dark) .stat-value {
      color: rgb(243 244 246);
    }

    .text-muted {
      color: rgb(107 114 128);
      font-size: 0.875rem;
    }

    :host-context(.dark) .text-muted {
      color: rgb(156 163 175);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
