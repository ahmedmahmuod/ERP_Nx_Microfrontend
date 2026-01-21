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
  template: `
    <div class="remote-unavailable-container" *transloco="let t; read: 'shell'">
      <div class="remote-unavailable-content">
        <div class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1>{{ t('remoteUnavailable.title') }}</h1>
        <p>
          {{ t('remoteUnavailable.message') }}
        </p>
        <button (click)="goToDashboard()" class="btn-primary">
          {{ t('remoteUnavailable.backToDashboard') }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .remote-unavailable-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .remote-unavailable-content {
        background: white;
        border-radius: 1rem;
        padding: 3rem;
        max-width: 500px;
        text-align: center;
        box-shadow:
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .icon-container {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
      }

      .icon-container svg {
        width: 4rem;
        height: 4rem;
        color: #f59e0b;
      }

      h1 {
        font-size: 1.875rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1rem;
        color: #6b7280;
        margin-bottom: 2rem;
        line-height: 1.5;
      }

      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 0.75rem 2rem;
        border-radius: 0.5rem;
        border: none;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition:
          transform 0.2s,
          box-shadow 0.2s;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow:
          0 10px 15px -3px rgba(0, 0, 0, 0.1),
          0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      .btn-primary:active {
        transform: translateY(0);
      }
    `,
  ],
})
export class RemoteUnavailableComponent {
  private router = inject(Router);

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
