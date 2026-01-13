/**
 * Component Showcase
 * Live preview of all Design System components
 * Demonstrates variants, sizes, states, and responsive behavior
 */

import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@erp/shared/ui';
import { ThemeService, ToastService } from '@erp/shared/utils';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="showcase-container">
      <!-- Header -->
      <header class="showcase-header">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white">
          ERP Design System
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mt-2">
          Enterprise-grade component library built with Angular 21+, Tailwind CSS, and PrimeNG
        </p>
        
        <!-- Theme Toggle -->
        <div class="mt-6 flex items-center gap-4">
          <erp-button 
            variant="ghost" 
            size="md"
            (clicked)="toggleTheme()">
            {{ isDark() ? '☀️ Light Mode' : '🌙 Dark Mode' }}
          </erp-button>
          
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Current: {{ currentTheme() }}
          </span>
        </div>
      </header>

      <!-- Button Showcase -->
      <section class="showcase-section">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Buttons
        </h2>
        
        <div class="space-y-8">
          <!-- Variants -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
              Variants
            </h3>
            <div class="flex flex-wrap gap-3">
              <erp-button variant="primary" (clicked)="showToast('Primary clicked!')">
                Primary
              </erp-button>
              <erp-button variant="secondary" (clicked)="showToast('Secondary clicked!')">
                Secondary
              </erp-button>
              <erp-button variant="success" (clicked)="showToast('Success clicked!')">
                Success
              </erp-button>
              <erp-button variant="warning" (clicked)="showToast('Warning clicked!')">
                Warning
              </erp-button>
              <erp-button variant="danger" (clicked)="showToast('Danger clicked!')">
                Danger
              </erp-button>
              <erp-button variant="ghost" (clicked)="showToast('Ghost clicked!')">
                Ghost
              </erp-button>
              <erp-button variant="link" (clicked)="showToast('Link clicked!')">
                Link
              </erp-button>
            </div>
          </div>

          <!-- Sizes -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
              Sizes
            </h3>
            <div class="flex flex-wrap items-center gap-3">
              <erp-button variant="primary" size="xs">Extra Small</erp-button>
              <erp-button variant="primary" size="sm">Small</erp-button>
              <erp-button variant="primary" size="md">Medium</erp-button>
              <erp-button variant="primary" size="lg">Large</erp-button>
              <erp-button variant="primary" size="xl">Extra Large</erp-button>
            </div>
          </div>

          <!-- States -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
              States
            </h3>
            <div class="flex flex-wrap gap-3">
              <erp-button variant="primary">Normal</erp-button>
              <erp-button variant="primary" [loading]="true">Loading</erp-button>
              <erp-button variant="primary" [disabled]="true">Disabled</erp-button>
            </div>
          </div>

          <!-- Full Width -->
          <div>
            <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
              Full Width
            </h3>
            <erp-button variant="primary" [fullWidth]="true">
              Full Width Button
            </erp-button>
          </div>
        </div>
      </section>

      <!-- Coming Soon -->
      <section class="showcase-section">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Coming Soon
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (component of upcomingComponents; track component) {
            <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 class="font-medium text-gray-900 dark:text-white">{{ component }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">In development</p>
            </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    .showcase-container {
      min-height: 100vh;
      padding: 2rem;
      background-color: rgb(249 250 251);
    }

    :host-context(.dark) .showcase-container {
      background-color: rgb(17 24 39);
    }

    .showcase-header {
      max-width: 1200px;
      margin: 0 auto 3rem;
      padding: 2rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }

    :host-context(.dark) .showcase-header {
      background: rgb(31 41 55);
    }

    .showcase-section {
      max-width: 1200px;
      margin: 0 auto 3rem;
      padding: 2rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }

    :host-context(.dark) .showcase-section {
      background: rgb(31 41 55);
    }
  `]
})
export class ShowcaseComponent {
  private readonly themeService = inject(ThemeService);
  private readonly toastService = inject(ToastService);
  
  readonly isDark = this.themeService.isDark;
  readonly currentTheme = this.themeService.currentMode;
  
  readonly upcomingComponents = [
    'Input',
    'Textarea',
    'Checkbox',
    'Radio',
    'Switch',
    'Select',
    'Card',
    'Modal',
    'Alert',
    'Badge',
    'Toast',
    'Table',
    'Navbar',
    'Sidebar',
    'Breadcrumbs',
    'Dropdown',
    'DatePicker',
    'Tabs',
    'Accordion',
    'Tooltip',
    'Progress',
    'Spinner'
  ];
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  showToast(message: string): void {
    this.toastService.success(message);
  }
}
