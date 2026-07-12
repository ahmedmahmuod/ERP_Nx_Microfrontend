import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-remoteAuth-entry',
  template: `
    <div class="remote-entry">
      <h1>Auth Remote</h1>
      <p>This entry point is not used. Routes are configured in entry.routes.ts</p>
      <p>Navigate to /auth/login or /auth/register</p>
    </div>
  `,
  styles: [`
    .remote-entry {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class RemoteEntry {}
