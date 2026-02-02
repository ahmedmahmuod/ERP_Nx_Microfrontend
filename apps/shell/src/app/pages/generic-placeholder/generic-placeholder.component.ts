// This is a generic placeholder template for all main shell pages
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionDebugPanelComponent } from '../../shared/components/permission-debug-panel/permission-debug-panel.component';

@Component({
  selector: 'app-generic-placeholder-page',
  standalone: true,
  imports: [CommonModule, PermissionDebugPanelComponent],
  template: `
    <div class="page-container p-4">
      <header class="mb-4">
        <h1 class="text-2xl font-bold mb-2">{{ title }}</h1>
        <p class="text-gray-600">
          This is a placeholder for the {{ title }} module.
        </p>
      </header>

      <app-permission-debug-panel [pageKey]="pageKey" [moduleId]="moduleId">
      </app-permission-debug-panel>

      <div
        class="content-placeholder border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-400"
      >
        <i class="pi pi-inbox text-4xl mb-2"></i>
        <p>Real content will be implemented here.</p>
      </div>
    </div>
  `,
})
export class GenericPlaceholderPageComponent {
  @Input() title = 'Page';
  @Input() pageKey = '';
  @Input() moduleId = 10;
}
