/**
 * Design System Preview Component
 * 
 * Internal showcase for all design system components, variants, and states.
 * This is NOT Storybook - it's a simple internal preview page.
 */

import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ButtonComponent,
  InputComponent,
  CardComponent,
  ModalComponent,
  TableComponent,
  ThemeService,
  ResponsiveService
} from '@erp/shared/ui';

@Component({
  selector: 'app-design-system',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    ModalComponent,
    TableComponent
  ],
  template: `
    <div class="design-system-container">
      <!-- Header -->
      <header class="ds-header">
        <h1>ERP Design System</h1>
        <div class="ds-header-actions">
          <erp-button 
            [variant]="themeService.isDarkMode() ? 'secondary' : 'primary'"
            size="sm"
            (clicked)="themeService.toggleTheme()">
            {{ themeService.isDarkMode() ? '☀️ Light' : '🌙 Dark' }}
          </erp-button>
          <span class="breakpoint-indicator">
            {{ responsiveService.currentBreakpoint() }}
          </span>
        </div>
      </header>

      <!-- Navigation -->
      <nav class="ds-nav">
        @for (section of sections; track section.id) {
          <button 
            [class.active]="activeSection() === section.id"
            (click)="scrollToSection(section.id)">
            {{ section.label }}
          </button>
        }
      </nav>

      <!-- Content -->
      <main class="ds-content">
        <!-- Buttons Section -->
        <section id="buttons" class="ds-section">
          <h2>Buttons</h2>
          
          <div class="ds-subsection">
            <h3>Variants</h3>
            <div class="component-grid">
              <erp-button variant="primary">Primary</erp-button>
              <erp-button variant="secondary">Secondary</erp-button>
              <erp-button variant="success">Success</erp-button>
              <erp-button variant="warning">Warning</erp-button>
              <erp-button variant="danger">Danger</erp-button>
              <erp-button variant="ghost">Ghost</erp-button>
              <erp-button variant="link">Link</erp-button>
            </div>
          </div>

          <div class="ds-subsection">
            <h3>Sizes</h3>
            <div class="component-grid">
              <erp-button size="xs">Extra Small</erp-button>
              <erp-button size="sm">Small</erp-button>
              <erp-button size="md">Medium</erp-button>
              <erp-button size="lg">Large</erp-button>
              <erp-button size="xl">Extra Large</erp-button>
            </div>
          </div>

          <div class="ds-subsection">
            <h3>States</h3>
            <div class="component-grid">
              <erp-button>Normal</erp-button>
              <erp-button [disabled]="true">Disabled</erp-button>
              <erp-button [loading]="true">Loading</erp-button>
              <erp-button [fullWidth]="true">Full Width</erp-button>
            </div>
          </div>
        </section>

        <!-- Inputs Section -->
        <section id="inputs" class="ds-section">
          <h2>Inputs</h2>
          
          <div class="ds-subsection">
            <h3>Types</h3>
            <div class="component-stack">
              <erp-input type="text" label="Text Input" placeholder="Enter text"></erp-input>
              <erp-input type="email" label="Email Input" placeholder="Enter email"></erp-input>
              <erp-input type="password" label="Password Input" placeholder="Enter password"></erp-input>
              <erp-input type="number" label="Number Input" placeholder="Enter number"></erp-input>
            </div>
          </div>

          <div class="ds-subsection">
            <h3>Sizes</h3>
            <div class="component-stack">
              <erp-input size="sm" label="Small" placeholder="Small input"></erp-input>
              <erp-input size="md" label="Medium" placeholder="Medium input"></erp-input>
              <erp-input size="lg" label="Large" placeholder="Large input"></erp-input>
            </div>
          </div>

          <div class="ds-subsection">
            <h3>States</h3>
            <div class="component-stack">
              <erp-input label="Normal" placeholder="Normal state"></erp-input>
              <erp-input label="Disabled" [disabled]="true" placeholder="Disabled state"></erp-input>
              <erp-input label="Readonly" [readonly]="true" placeholder="Read only value"></erp-input>
              <erp-input label="Required" [required]="true" placeholder="Required field"></erp-input>
              <erp-input label="Invalid" [invalid]="true" errorText="This field has an error" placeholder="Invalid state"></erp-input>
              <erp-input label="With Helper" helperText="This is helper text" placeholder="With helper text"></erp-input>
            </div>
          </div>
        </section>

        <!-- Cards Section -->
        <section id="cards" class="ds-section">
          <h2>Cards</h2>
          
          <div class="ds-subsection">
            <h3>Variants</h3>
            <div class="component-grid">
              <erp-card variant="default" [hasHeader]="true" [hasFooter]="true">
                <div card-header>Default Card</div>
                <div card-body>This is a default card with header and footer.</div>
                <div card-footer>
                  <erp-button size="sm">Action</erp-button>
                </div>
              </erp-card>

              <erp-card variant="primary" [hasHeader]="true">
                <div card-header>Primary Card</div>
                <div card-body>This is a primary variant card.</div>
              </erp-card>

              <erp-card variant="success" [hasHeader]="true">
                <div card-header>Success Card</div>
                <div card-body>This is a success variant card.</div>
              </erp-card>
            </div>
          </div>

          <div class="ds-subsection">
            <h3>Elevation</h3>
            <div class="component-grid">
              <erp-card elevation="sm">
                <div card-body>Small Elevation</div>
              </erp-card>
              <erp-card elevation="md">
                <div card-body>Medium Elevation</div>
              </erp-card>
              <erp-card elevation="lg">
                <div card-body>Large Elevation</div>
              </erp-card>
            </div>
          </div>

          <div class="ds-subsection">
            <h3>Interactive</h3>
            <div class="component-grid">
              <erp-card [hoverable]="true">
                <div card-body>Hoverable Card - Try hovering!</div>
              </erp-card>
            </div>
          </div>
        </section>

        <!-- Tables Section -->
        <section id="tables" class="ds-section">
          <h2>Tables</h2>
          
          <div class="ds-subsection">
            <h3>Basic Table</h3>
            <erp-table caption="User List">
              <thead table-header>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody table-body>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>Admin</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>User</td>
                  <td>Active</td>
                </tr>
                <tr>
                  <td>Bob Johnson</td>
                  <td>bob@example.com</td>
                  <td>Manager</td>
                  <td>Inactive</td>
                </tr>
              </tbody>
            </erp-table>
          </div>

          <div class="ds-subsection">
            <h3>Striped & Hoverable</h3>
            <erp-table [striped]="true" [hoverable]="true">
              <thead table-header>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody table-body>
                <tr>
                  <td>Product A</td>
                  <td>$99.99</td>
                  <td>50</td>
                </tr>
                <tr>
                  <td>Product B</td>
                  <td>$149.99</td>
                  <td>30</td>
                </tr>
                <tr>
                  <td>Product C</td>
                  <td>$199.99</td>
                  <td>20</td>
                </tr>
              </tbody>
            </erp-table>
          </div>
        </section>

        <!-- Modal Section -->
        <section id="modals" class="ds-section">
          <h2>Modals</h2>
          
          <div class="ds-subsection">
            <h3>Modal Sizes</h3>
            <div class="component-grid">
              <erp-button (clicked)="openModal('sm')">Small Modal</erp-button>
              <erp-button (clicked)="openModal('md')">Medium Modal</erp-button>
              <erp-button (clicked)="openModal('lg')">Large Modal</erp-button>
            </div>
          </div>

          <!-- Modal Component -->
          <erp-modal 
            [open]="modalOpen()"
            [size]="modalSize()"
            [title]="'Example Modal - ' + modalSize()"
            (closeModal)="closeModal()">
            <div modal-body>
              <p>This is a {{ modalSize() }} modal example.</p>
              <p>Press ESC or click outside to close.</p>
            </div>
            <div modal-footer>
              <erp-button variant="secondary" (clicked)="closeModal()">Cancel</erp-button>
              <erp-button variant="primary" (clicked)="closeModal()">Confirm</erp-button>
            </div>
          </erp-modal>
        </section>

        <!-- Typography Section -->
        <section id="typography" class="ds-section">
          <h2>Typography</h2>
          
          <div class="ds-subsection">
            <h3>Headings</h3>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>

          <div class="ds-subsection">
            <h3>Body Text</h3>
            <p>This is regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p class="text-sm">This is small text. Lorem ipsum dolor sit amet.</p>
            <p class="text-lg">This is large text. Lorem ipsum dolor sit amet.</p>
          </div>
        </section>

        <!-- Colors Section -->
        <section id="colors" class="ds-section">
          <h2>Colors</h2>
          
          <div class="ds-subsection">
            <h3>Primary Colors</h3>
            <div class="color-grid">
              <div class="color-swatch bg-primary-500">Primary</div>
              <div class="color-swatch bg-secondary-500">Secondary</div>
              <div class="color-swatch bg-success-500">Success</div>
              <div class="color-swatch bg-warning-500">Warning</div>
              <div class="color-swatch bg-danger-500">Danger</div>
              <div class="color-swatch bg-info-500">Info</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .design-system-container {
      min-height: 100vh;
      background-color: rgb(249 250 251);
    }

    :host-context(.dark) .design-system-container {
      background-color: rgb(17 24 39);
    }

    .ds-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      background-color: white;
      border-bottom: 1px solid rgb(229 231 235);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    :host-context(.dark) .ds-header {
      background-color: rgb(31 41 55);
      border-bottom-color: rgb(55 65 81);
    }

    .ds-header h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: rgb(17 24 39);
    }

    :host-context(.dark) .ds-header h1 {
      color: rgb(243 244 246);
    }

    .ds-header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .breakpoint-indicator {
      padding: 0.25rem 0.75rem;
      background-color: rgb(243 244 246);
      border-radius: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: rgb(75 85 99);
      text-transform: uppercase;
    }

    :host-context(.dark) .breakpoint-indicator {
      background-color: rgb(55 65 81);
      color: rgb(209 213 219);
    }

    .ds-nav {
      display: flex;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background-color: white;
      border-bottom: 1px solid rgb(229 231 235);
      overflow-x: auto;
    }

    :host-context(.dark) .ds-nav {
      background-color: rgb(31 41 55);
      border-bottom-color: rgb(55 65 81);
    }

    .ds-nav button {
      padding: 0.5rem 1rem;
      border: none;
      background-color: transparent;
      color: rgb(107 114 128);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .ds-nav button:hover {
      background-color: rgb(243 244 246);
      color: rgb(17 24 39);
    }

    .ds-nav button.active {
      background-color: rgb(59 130 246);
      color: white;
    }

    :host-context(.dark) .ds-nav button {
      color: rgb(156 163 175);
    }

    :host-context(.dark) .ds-nav button:hover {
      background-color: rgb(55 65 81);
      color: rgb(243 244 246);
    }

    .ds-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .ds-section {
      margin-bottom: 4rem;
    }

    .ds-section h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2rem;
      color: rgb(17 24 39);
    }

    :host-context(.dark) .ds-section h2 {
      color: rgb(243 244 246);
    }

    .ds-subsection {
      margin-bottom: 2rem;
    }

    .ds-subsection h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: rgb(55 65 81);
    }

    :host-context(.dark) .ds-subsection h3 {
      color: rgb(209 213 219);
    }

    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }

    .component-stack {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 500px;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
    }

    .color-swatch {
      padding: 2rem 1rem;
      border-radius: 0.5rem;
      text-align: center;
      color: white;
      font-weight: 600;
    }

    .bg-primary-500 { background-color: rgb(59 130 246); }
    .bg-secondary-500 { background-color: rgb(168 85 247); }
    .bg-success-500 { background-color: rgb(34 197 94); }
    .bg-warning-500 { background-color: rgb(245 158 11); }
    .bg-danger-500 { background-color: rgb(239 68 68); }
    .bg-info-500 { background-color: rgb(6 182 212); }
  `]
})
export class DesignSystemComponent {
  readonly themeService = inject(ThemeService);
  readonly responsiveService = inject(ResponsiveService);
  
  readonly activeSection = signal<string>('buttons');
  readonly modalOpen = signal<boolean>(false);
  readonly modalSize = signal<'sm' | 'md' | 'lg'>('md');
  
  readonly sections = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'cards', label: 'Cards' },
    { id: 'tables', label: 'Tables' },
    { id: 'modals', label: 'Modals' },
    { id: 'typography', label: 'Typography' },
    { id: 'colors', label: 'Colors' }
  ];
  
  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  
  openModal(size: 'sm' | 'md' | 'lg'): void {
    this.modalSize.set(size);
    this.modalOpen.set(true);
  }
  
  closeModal(): void {
    this.modalOpen.set(false);
  }
}
