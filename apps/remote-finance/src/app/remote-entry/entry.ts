import { Component } from '@angular/core';
import { CardComponent } from '@erp/shared/ui';

@Component({
  standalone: true,
  imports: [CardComponent],
  selector: 'app-remoteFinance-entry',
  template: `
    <div class="remote-container">
      <erp-card [hasHeader]="true" variant="primary">
        <div card-header>
          <h1>💰 Finance Module</h1>
        </div>
        <div card-body>
          <p>Welcome to the Finance module. This remote is ready for business features.</p>
          <ul>
            <li>Invoice Management</li>
            <li>Transaction History</li>
            <li>Financial Reports</li>
            <li>Budget Tracking</li>
          </ul>
          <p class="note">Coming in Phase 6</p>
        </div>
      </erp-card>
    </div>
  `,
  styles: [`
    .remote-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    .note {
      margin-top: 1rem;
      font-style: italic;
      color: rgb(107 114 128);
    }
  `]
})
export class RemoteEntry {}
