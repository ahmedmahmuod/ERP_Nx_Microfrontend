import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastNotificationComponent } from '@erp/shared/ui/primeng-components';

@Component({
  imports: [RouterModule, ToastNotificationComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
