/**
 * Header Component
 *
 * Top navigation bar with branding, user menu, and theme toggle.
 * Dumb component - all state from LayoutService.
 */

import { Component, output, input, inject, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../services/layout.service';
import { NavigationFacadeService } from '../../../core/services/navigation-facade.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <!-- Left Section -->
      <div class="header-left">
        <!-- Mobile Menu Toggle -->
        <button
          class="mobile-menu-toggle"
          (click)="layoutService.toggleSidebar()"
          aria-label="Toggle menu"
        >
          <i class="pi pi-bars"></i>
        </button>

        <h1 class="page-title">
          @if (currentModuleName()) {
            <span class="module-name">{{ currentModuleName() }}</span>
          } @else {
            <span class="brand-name">Assemble ERP</span>
          }
        </h1>
      </div>

      <!-- Right Section -->
      <div class="header-right">
        <!-- Theme Toggle -->
        <button
          class="icon-btn"
          (click)="layoutService.toggleTheme()"
          aria-label="Toggle theme">
          <i class="pi pi-moon"></i>
        </button>

        <!-- Notifications -->
        <button class="icon-btn" aria-label="Notifications">
          <i class="pi pi-bell"></i>
          <span class="notification-badge">3</span>
        </button>

        <!-- User Menu -->
        <div class="user-menu">
          <button class="user-button" aria-label="User menu">
            <div class="user-avatar">{{ userInitials }}</div>
            <div class="user-info">
              <span class="user-name">{{ userName }}</span>
              <span class="user-email">{{ userEmail }}</span>
            </div>
            <i class="pi pi-chevron-down"></i>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 4rem;
      padding: 0 1.5rem;
      background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
      border-bottom: 1px solid #e5e7eb;
      position: sticky;
      top: 0;
      z-index: 50;
      gap: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }

    :host-context(.dark) .header {
      background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
      border-bottom-color: #374151;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex: 0 0 auto;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex: 0 0 auto;
    }

    /* Mobile Menu Toggle - Only visible on mobile */
    .mobile-menu-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border: none;
      background-color: transparent;
      color: var(--color-text-secondary);
      cursor: pointer;
      border-radius: var(--radius-md);
      transition: all 0.15s ease;

      &:hover {
        background-color: var(--nav-item-hover-bg);
        color: var(--accent-primary, var(--color-primary));
      }

      &:active {
        transform: scale(0.95);
      }

      i {
        font-size: 1.5rem;
      }

      @media (max-width: 1024px) {
        display: flex;
      }
    }

    :host-context(.dark) .mobile-menu-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.5rem;
      height: 2.5rem;
      border: none;
      background-color: transparent;
      color: #6b7280;
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.15s ease;
    }

    .menu-toggle:hover {
      background-color: #f5f5f5;
      color: #1a1a1a;
    }

    .menu-toggle i {
      font-size: 1.25rem;
    }

    .page-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .brand-name {
      font-weight: 700;
      color: var(--accent-primary, var(--color-primary, #2563eb));
    }

    .module-name {
      color: var(--accent-primary, var(--color-primary));
      font-weight: 600;
    }

    /* Search Container */
    .search-container {
      position: relative;
      display: none;
    }

    @media (min-width: 768px) {
      .search-container {
        display: flex;
        align-items: center;
      }
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      color: #9ca3af;
      font-size: 1rem;
    }

    .search-input {
      width: 20rem;
      padding: 0.5rem 2.5rem 0.5rem 2.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      background-color: #fafafa;
      color: #1a1a1a;
      font-size: 0.875rem;
      transition: all 0.15s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: #2563eb;
      background-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .search-input::placeholder {
      color: #9ca3af;
    }

    .search-shortcut {
      position: absolute;
      right: 0.75rem;
      font-size: 0.75rem;
      color: #9ca3af;
      padding: 0.125rem 0.375rem;
      background-color: #f3f4f6;
      border-radius: 0.25rem;
      border: 1px solid #e5e7eb;
    }

    :host-context(.dark) .search-input {
      background-color: #2a2a2a;
      border-color: #404040;
      color: #fafafa;
    }

    :host-context(.dark) .search-input:focus {
      background-color: #1a1a1a;
      border-color: #3b82f6;
    }

    /* Icon Button */
    .icon-btn {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border: none;
      background-color: transparent;
      color: #6b7280;
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.15s ease;
    }

    .icon-btn:hover {
      background-color: #f5f5f5;
      color: #1a1a1a;
    }

    .icon-btn i {
      font-size: 1.125rem;
    }

    :host-context(.dark) .icon-btn {
      color: #9ca3af;
    }

    :host-context(.dark) .icon-btn:hover {
      background-color: #2a2a2a;
      color: #fafafa;
    }

    .notification-badge {
      position: absolute;
      top: 0.25rem;
      right: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 1.125rem;
      height: 1.125rem;
      padding: 0 0.25rem;
      background-color: #ef4444;
      color: white;
      font-size: 0.625rem;
      font-weight: 600;
      border-radius: 9999px;
      border: 2px solid #ffffff;
    }

    :host-context(.dark) .notification-badge {
      border-color: #1a1a1a;
    }

    /* User Menu */
    .user-menu {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.375rem 0.75rem;
      border: none;
      background-color: transparent;
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.15s ease;
    }

    .user-button:hover {
      background-color: #f5f5f5;
    }

    :host-context(.dark) .user-button:hover {
      background-color: #2a2a2a;
    }

    .user-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border-radius: 9999px;
      background-color: #2563eb;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .user-info {
      display: none;
      flex-direction: column;
      align-items: flex-start;
    }

    @media (min-width: 1024px) {
      .user-info {
        display: flex;
      }
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1a1a1a;
      line-height: 1.25;
    }

    .user-email {
      font-size: 0.75rem;
      color: #6b7280;
      line-height: 1.25;
    }

    :host-context(.dark) .user-name {
      color: #fafafa;
    }

    :host-context(.dark) .user-email {
      color: #9ca3af;
    }

    .user-button i {
      font-size: 0.875rem;
      color: #9ca3af;
    }

    /* Dropdown Customization */
    ::ng-deep .language-dropdown,
    ::ng-deep .company-dropdown {
      font-size: 0.875rem;
    }

    ::ng-deep .language-dropdown .p-dropdown,
    ::ng-deep .company-dropdown .p-dropdown {
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      background-color: #ffffff;
      transition: all 0.15s ease;
    }

    ::ng-deep .language-dropdown .p-dropdown:hover,
    ::ng-deep .company-dropdown .p-dropdown:hover {
      border-color: #2563eb;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }

    .dropdown-item i {
      font-size: 1rem;
      color: #6b7280;
    }

    /* Mobile Responsive */
    @media (max-width: 767px) {
      .header {
        padding: 0 1rem;
      }

      .page-title {
        font-size: 1.125rem;
      }

      .header-right {
        gap: 0.5rem;
      }

      ::ng-deep .language-dropdown,
      ::ng-deep .company-dropdown {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly layoutService = inject(LayoutService);
  readonly navigationFacade = inject(NavigationFacadeService);

  readonly pageTitle = input<string>('Dashboard');
  readonly menuToggle = output<void>();

  // Computed module name from navigation facade
  readonly currentModuleName = computed(() => {
    const appId = this.navigationFacade.activeAppId();
    if (!appId || appId === 'shell') {
      return null;
    }
    return this.navigationFacade.activeManifest()?.appName || null;
  });

  // Mock user data (replace with auth service)
  readonly userName = 'Ahmed Mahmoud';
  readonly userEmail = 'ahmed@company.com';
  readonly userInitials = 'AM';
}
