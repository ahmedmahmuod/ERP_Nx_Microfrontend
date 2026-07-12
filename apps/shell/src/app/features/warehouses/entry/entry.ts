import { Component } from '@angular/core';
import { CardComponent } from '@erp/shared/ui';

@Component({
  standalone: true,
  imports: [CardComponent],
  selector: 'app-remote-warehouses-entry',
  template: `
    <div class="remote-container">
      <erp-card [hasHeader]="true" variant="warning">
        <div card-header>
          <h1>📦 Warehouses Module</h1>
        </div>
        <div card-body>
          <p>Welcome to the Warehouses module. This remote is ready for business features.</p>
          <ul>
            <li>Inventory Management</li>
            <li>Warehouse Locations</li>
            <li>Stock Transfers</li>
            <li>Receiving & Shipping</li>
            <li>Stock Level Tracking</li>
          </ul>
          <p class="note">Ready for development</p>
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
      color: var(--color-text-secondary);
    }
  `]
})
export class RemoteEntry {}
