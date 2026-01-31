import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';

@Component({
  selector: 'app-remote-unavailable',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  templateUrl: './remote-unavailable.component.html',
  styleUrl: './remote-unavailable.component.scss',
})
export class RemoteUnavailableComponent {
  private router = inject(Router);

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
