/**
 * Layout Component (Smart Container)
 * 
 * Main layout container that orchestrates Header, Sidebar, and Footer.
 * Smart component - manages state via LayoutService.
 */

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveService } from '@erp/shared/ui';
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
    FooterComponent
  ],
  template: `
    <div class="layout-container">
      <!-- Header -->
      <app-header
        [currentUser]="layoutService.currentUser()"
        [isDarkMode]="layoutService.isDarkMode()"
        (menuToggle)="layoutService.toggleSidebar()"
        (themeToggle)="layoutService.toggleTheme()">
      </app-header>
      
      <!-- Main content area -->
      <div class="layout-main">
        <!-- Sidebar -->
        <app-sidebar
          [navigationItems]="layoutService.visibleNavigationItems()"
          [isCollapsed]="layoutService.sidebarCollapsed()"
          [isOpen]="layoutService.mobileSidebarOpen()"
          [isMobile]="responsiveService.isMobile()"
          (navItemClick)="handleNavItemClick()"
          (collapseToggle)="layoutService.toggleSidebar()"
          (overlayClick)="layoutService.closeMobileSidebar()">
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
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: rgb(249 250 251);
    }

    :host-context(.dark) .layout-container {
      background-color: rgb(17 24 39);
    }

    .layout-main {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .layout-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-y: auto;
    }

    .content-wrapper {
      flex: 1;
      padding: 2rem;
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
      transition: width 0.3s ease;
    }

    app-sidebar.collapsed {
      width: 4rem;
    }

    @media (max-width: 767px) {
      app-sidebar {
        width: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  readonly layoutService = inject(LayoutService);
  readonly responsiveService = inject(ResponsiveService);
  
  handleNavItemClick(): void {
    // Close mobile sidebar on navigation
    if (this.responsiveService.isMobile()) {
      this.layoutService.closeMobileSidebar();
    }
  }
}
