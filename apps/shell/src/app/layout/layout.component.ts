/**
 * Layout Component (Smart Container)
 *
 * Main layout container that orchestrates Header, Sidebar, and Footer.
 * Smart component - manages state via LayoutService.
 */

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveService } from '@erp/shared/ui';
import { ToastModule } from 'primeng/toast';
import { LayoutService } from './services/layout.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ToastModule,
  ],
  template: `
    <!-- Toast Notifications -->
    <p-toast position="top-center" />

    <div class="layout-container">
      <!-- Header -->
      <app-header (menuToggle)="layoutService.toggleSidebar()"> </app-header>

      <!-- Main content area -->
      <div class="layout-main">
        <!-- Sidebar -->
        <app-sidebar
          [collapsed]="sidebarCollapsed"
          [mobileOpen]="layoutService.mobileSidebarOpen()"
          (collapsedChange)="onCollapsedChange($event)"
          (mobileClose)="layoutService.closeMobileSidebar()"
          [class.collapsed]="sidebarCollapsed"
        >
        </app-sidebar>

        <!-- Content -->
        <main class="layout-content">
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>

          <!-- Footer -->
          <app-footer></app-footer>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .layout-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        background: linear-gradient(180deg, #f9fafb 0%, #f3f4f6 100%);
      }

      :host-context(.dark) .layout-container {
        background: linear-gradient(180deg, #111827 0%, #0f172a 100%);
      }

      .layout-main {
        display: flex;
        flex: 1;
        overflow: hidden;
        position: relative;
      }

      .layout-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
      }

      .content-wrapper {
        flex: 1;
        padding: 2rem;
        max-width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
      }

      @media (max-width: 767px) {
        .content-wrapper {
          padding: 1rem;
        }
      }

      /* Ensure sidebar takes proper width */
      app-sidebar {
        width: 16rem;
        flex-shrink: 0;
        transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: visible;
      }

      app-sidebar.collapsed {
        width: 4rem;
      }

      @media (max-width: 1024px) {
        app-sidebar {
          width: 0;
          overflow: visible;
        }

        app-sidebar.collapsed {
          width: 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly layoutService = inject(LayoutService);
  readonly responsiveService = inject(ResponsiveService);

  sidebarCollapsed = false;

  onCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
  }

  handleNavItemClick(): void {
    // Close mobile sidebar on navigation
    if (this.responsiveService.isMobile()) {
      this.layoutService.closeMobileSidebar();
    }
  }
}
