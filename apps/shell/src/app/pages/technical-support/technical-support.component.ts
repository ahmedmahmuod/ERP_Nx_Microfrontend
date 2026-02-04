import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-technical-support',
  standalone: true,
  imports: [CommonModule, CardModule, TranslocoDirective],
  template: `
    <div class="page-container p-4" *transloco="let t; read: 'shell'">
      <h1 class="text-2xl font-bold mb-4">{{ t('pages.technicalSupport.title') }}</h1>
      <p-card header="Support Center">
        <p class="m-0">
          {{ t('pages.technicalSupport.welcome') }}
        </p>
        <div class="mt-4">
             <div class="mb-2"><i class="pi pi-envelope mr-2"></i> support@example.com</div>
             <div class="mb-2"><i class="pi pi-phone mr-2"></i> +1 234 567 890</div>
        </div>
      </p-card>
    </div>
  `,
  styles: [],
})
export class TechnicalSupportComponent {}
