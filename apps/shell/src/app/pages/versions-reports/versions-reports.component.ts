import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-versions-reports',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule, TranslocoDirective],
  template: `
    <div class="page-container p-4" *transloco="let t; read: 'shell'">
      <h1 class="text-2xl font-bold mb-4">
        {{ t('pages.versionsReports.title') }}
      </h1>
      <p-card>
        <p-table [value]="versions" [tableStyle]="{ 'min-width': '50rem' }">
          <ng-template pTemplate="header">
            <tr>
              <th>{{ t('pages.versionsReports.table.version') }}</th>
              <th>{{ t('pages.versionsReports.table.date') }}</th>
              <th>{{ t('pages.versionsReports.table.description') }}</th>
              <th>{{ t('pages.versionsReports.table.status') }}</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-version>
            <tr>
              <td>{{ version.version }}</td>
              <td>{{ version.date }}</td>
              <td>{{ version.description }}</td>
              <td>
                <span [class]="'status-' + version.status.toLowerCase()">{{
                  t(
                    'pages.versionsReports.status.' +
                      version.status.toLowerCase()
                  )
                }}</span>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `,
  styles: [
    `
      .status-released {
        color: green;
        font-weight: bold;
      }
      .status-beta {
        color: orange;
        font-weight: bold;
      }
    `,
  ],
})
export class VersionsReportsComponent {
  versions = [
    {
      version: 'v1.0.0',
      date: '2023-01-01',
      description: 'Initial Release',
      status: 'Released',
    },
    {
      version: 'v1.1.0',
      date: '2023-02-15',
      description: 'Bug fixes and performance improvements',
      status: 'Released',
    },
    {
      version: 'v1.2.0',
      date: '2023-04-01',
      description: 'New features added',
      status: 'Beta',
    },
  ];
}
