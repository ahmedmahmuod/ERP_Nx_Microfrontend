import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsStore } from '@erp/shared/util-state';

@Component({
  selector: 'app-permission-debug-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="debug-panel">
      <h3>🔒 Permissions Debug</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">Page Key:</span>
          <span class="value">{{ pageKey }}</span>
        </div>
        <div class="info-item">
          <span class="label">Module ID:</span>
          <span class="value">{{ moduleId }}</span>
        </div>
        <div class="info-item">
          <span class="label">Role ID:</span>
          <span class="value">{{ permissionsStore.roleId() }}</span>
        </div>
      </div>

      <div class="actions-section">
        <h4>Allowed Actions:</h4>
        <div class="actions-list">
          <!-- Common CRUD actions -->
          <div class="action-badge" [class.allowed]="canDo('View')">View</div>
          <div class="action-badge" [class.allowed]="canDo('Add')">Add</div>
          <div class="action-badge" [class.allowed]="canDo('Edit')">Edit</div>
          <div class="action-badge" [class.allowed]="canDo('Delete')">
            Delete
          </div>
          <div class="action-badge" [class.allowed]="canDo('Export')">
            Export
          </div>
          <div class="action-badge" [class.allowed]="canDo('Print')">Print</div>
        </div>

        <div class="raw-actions">
          <details>
            <summary>
              Raw Allowed Actions ({{ permissionsStore.allowedActions().size }})
            </summary>
            <pre>{{ getRawActions() | json }}</pre>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .debug-panel {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 2rem;
        font-family: monospace;
      }
      h3 {
        margin-top: 0;
        color: #495057;
      }
      h4 {
        margin: 1rem 0 0.5rem;
        color: #6c757d;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }

      .info-item {
        display: flex;
        flex-direction: column;
      }

      .info-item .label {
        font-size: 0.75rem;
        color: #6c757d;
        text-transform: uppercase;
        font-weight: bold;
      }

      .info-item .value {
        font-size: 1.1rem;
        font-weight: 500;
        color: #212529;
      }

      .actions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .action-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        background: #e9ecef;
        color: #adb5bd;
        border: 1px solid #ced4da;
        font-size: 0.9rem;
      }

      .action-badge.allowed {
        background: #d4edda;
        color: #155724;
        border-color: #c3e6cb;
        font-weight: bold;
      }

      .raw-actions {
        margin-top: 1rem;
      }
    `,
  ],
})
export class PermissionDebugPanelComponent {
  @Input() pageKey!: string;
  @Input() moduleId!: number;

  readonly permissionsStore = inject(PermissionsStore);

  canDo(action: string): boolean {
    return this.permissionsStore.canDoAction(action);
  }

  getRawActions(): string[] {
    return Array.from(this.permissionsStore.allowedActions());
  }
}
