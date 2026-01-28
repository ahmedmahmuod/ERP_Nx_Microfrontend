import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastNotificationComponent } from '@erp/shared/ui/primeng-components';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, ToastNotificationComponent],
  template: `
    <!-- Toast Notifications -->
    <lib-toast-notification position="bottom-right" />

    <!-- Auth Pages -->
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
    `,
  ],
})
export class AuthLayoutComponent {}
