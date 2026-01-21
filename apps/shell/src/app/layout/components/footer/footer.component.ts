/**
 * Footer Component
 *
 * Minimal footer with copyright and version info.
 * Dumb component - no state management.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslocoDirective, TRANSLOCO_SCOPE } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoDirective],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'shell',
    },
  ],
  template: `
    <footer class="footer" *transloco="let t; read: 'shell'">
      <div class="footer-content">
        <p class="copyright">
          {{ t('footer.copyright', { year: currentYear }) }}
        </p>
        <p class="version">{{ t('footer.version') }}</p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        padding: 1rem 1.5rem;
        background-color: white;
        border-top: 1px solid rgb(229 231 235);
      }

      :host-context(.dark) .footer {
        background-color: rgb(31 41 55);
        border-top-color: rgb(55 65 81);
      }

      .footer-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .copyright,
      .version {
        margin: 0;
        font-size: 0.875rem;
        color: rgb(107 114 128);
      }

      :host-context(.dark) .copyright,
      :host-context(.dark) .version {
        color: rgb(156 163 175);
      }

      @media (max-width: 640px) {
        .footer-content {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
