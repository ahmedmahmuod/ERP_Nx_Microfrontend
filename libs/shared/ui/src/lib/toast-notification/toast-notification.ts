import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'lib-toast-notification',
  standalone: true,
  imports: [CommonModule, ToastModule],
  styleUrls: ['./toast-notification.scss'],
  template: `
    <p-toast
      [position]="position()"
      [life]="life()"
      styleClass="custom-toast"
      [showTransformOptions]="'translateY(100%)'"
      [hideTransformOptions]="'translateY(100%)'"
      [showTransitionOptions]="'300ms cubic-bezier(0.4, 0, 0.2, 1)'"
      [hideTransitionOptions]="'300ms cubic-bezier(0.4, 0, 0.2, 1)'"
    >
      <ng-template let-message pTemplate="message">
        <div class="flex items-center gap-2 p-3">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <i [class]="getIconClass(message.severity)" class="text-lg"></i>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4
              class="font-semibold text-xs mb-0.5 text-[var(--toast-title-color)]"
            >
              {{ message.summary }}
            </h4>
            <p
              class="text-xs text-[var(--toast-message-color)] leading-snug m-0"
            >
              {{ message.detail }}
            </p>
          </div>
        </div>
      </ng-template>
    </p-toast>
  `,
})
export class ToastNotificationComponent {
  /**
   * Position of the toast on screen
   */
  position = input<
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
    | 'center'
  >('bottom-right');

  /**
   * Duration in milliseconds before auto-dismiss
   */
  life = input<number>(3000);

  /**
   * Get the appropriate icon class based on severity
   */
  getIconClass(severity: string): string {
    const iconMap: Record<string, string> = {
      success: 'pi pi-check-circle',
      info: 'pi pi-info-circle',
      warn: 'pi pi-exclamation-triangle',
      error: 'pi pi-times-circle',
    };

    return iconMap[severity] || 'pi pi-info-circle';
  }
}
