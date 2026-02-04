import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [CommonModule, TranslocoDirective],
  template: `
    <div class="error-container" *transloco="let t; read: 'shell'">
      <div class="error-content">
        <i class="pi pi-lock error-icon"></i>
        <h1>{{ t('pages.notAuthorized.title') }}</h1>
        <p>{{ t('pages.notAuthorized.message') }}</p>
        <p class="sub-text">
          {{ t('pages.notAuthorized.subtext') }}
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .error-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 400px;
        text-align: center;
      }
      .error-icon {
        font-size: 4rem;
        color: #dc3545;
        margin-bottom: 1rem;
      }
      h1 {
        margin: 0 0 1rem;
        color: #343a40;
      }
      p {
        margin: 0 0 0.5rem;
        color: #6c757d;
      }
      .sub-text {
        font-size: 0.9rem;
      }
    `,
  ],
})
export class NotAuthorizedComponent {}
