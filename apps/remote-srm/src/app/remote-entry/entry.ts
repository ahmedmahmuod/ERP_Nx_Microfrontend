import { Component } from '@angular/core';
import { CardComponent } from '@erp/shared/ui';

@Component({
  standalone: true,
  imports: [CardComponent],
  selector: 'app-remote-srm-entry',
  template: `
    <div class="remote-container">
      <erp-card [hasHeader]="true" variant="info">
        <div card-header>
          <h1>🏢 SRM Module</h1>
        </div>
        <div card-body>
          <p>Welcome to the Supplier Relationship Management module. This remote is ready for business features.</p>
          <ul>
            <li>Supplier Management</li>
            <li>Procurement & Purchase Orders</li>
            <li>Quote Management</li>
            <li>Contract Management</li>
            <li>Supplier Performance</li>
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
