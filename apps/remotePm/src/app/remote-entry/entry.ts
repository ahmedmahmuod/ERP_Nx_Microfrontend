import { Component } from '@angular/core';
import { CardComponent } from '@erp/shared/ui';

@Component({
  standalone: true,
  imports: [CardComponent],
  selector: 'app-remotePm-entry',
  template: `
    <div class="remote-container">
      <erp-card [hasHeader]="true" variant="primary">
        <div card-header>
          <h1>📊 Project Management Module</h1>
        </div>
        <div card-body>
          <p>Welcome to the Project Management module. This remote is ready for business features.</p>
          <ul>
            <li>Project Planning & Tracking</li>
            <li>Task Management</li>
            <li>Team Collaboration</li>
            <li>Milestone Tracking</li>
            <li>Resource Allocation</li>
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
