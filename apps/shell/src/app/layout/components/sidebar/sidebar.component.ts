/**
 * Sidebar Component
 * 
 * Responsive sidebar with collapsible menu items
 */

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BRAND, BASE_ROUTES } from '@erp/shared/config';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  permission?: string | string[];
  module?: string;
  badge?: string;
  badgeClass?: string;
  visible?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Mobile Backdrop -->
    @if (mobileOpen) {
      <div 
        class="sidebar-backdrop" 
        (click)="handleMobileClose()"
        (keydown.escape)="handleMobileClose()"
        role="button"
        tabindex="0"
        aria-label="Close sidebar"></div>
    }
    
    <aside
      class="sidebar"
      [class.collapsed]="collapsed"
      [class.mobile-open]="mobileOpen"
    >
      <!-- Logo Section -->
      <div class="sidebar-header">
        <div class="logo-content">
          @if (logoError) {
            <div class="logo-fallback" [class.logo-collapsed]="collapsed">
              <i class="pi pi-building"></i>
              @if (!collapsed) {
                <span>{{ brandName }}</span>
              }
            </div>
          } @else {
            <img 
              [src]="brandLogo" 
              [alt]="brandName" 
              class="logo-image"
              [class.logo-collapsed]="collapsed"
              (error)="onLogoError()"
            />
            @if (!collapsed) {
              <span class="logo-text">{{ brandName }}</span>
            }
          }
        </div>

        <!-- Mobile Close Button -->
        @if (mobileOpen) {
          <button
            (click)="handleMobileClose()"
            class="mobile-close-btn"
            aria-label="Close menu"
          >
            <i class="pi pi-times"></i>
          </button>
        }
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          @for (item of menuItems(); track item.route) {
            <li>
              <a
                [routerLink]="item.route || []"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ 
                  exact: item.route === '/' || item.route === '/dashboard',
                  matrixParams: 'ignored',
                  queryParams: 'ignored',
                  fragment: 'ignored'
                }"
                (click)="onNavItemClick()"
                class="nav-item"
                [class.collapsed-item]="collapsed"
                [attr.title]="collapsed ? item.label : null"
                [attr.aria-current]="isActiveRoute(item.route || '') ? 'page' : null"
              >
                <i [class]="'pi ' + item.icon + ' nav-icon'"></i>
                @if (!collapsed) {
                  <span class="nav-label">{{ item.label }}</span>
                }
                @if (!collapsed && item.badge) {
                  <span [class]="'badge ' + (item.badgeClass || 'badge-primary')">
                    {{ item.badge }}
                  </span>
                }
              </a>
            </li>
          }
        </ul>
      </nav>

      <!-- Collapse Toggle Button (Desktop only) -->
      <button
        (click)="toggleCollapse()"
        class="collapse-toggle-btn"
        [attr.aria-label]="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <i [class]="collapsed ? 'pi pi-chevron-right' : 'pi pi-chevron-left'"></i>
      </button>
    </aside>
  `,
  styles: [`
    /* Backdrop for mobile */
    .sidebar-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 49;
      animation: fadeIn 0.2s ease;
      cursor: pointer;
    }
    
    @media (min-width: 1025px) {
      .sidebar-backdrop {
        display: none;
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .sidebar {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      width: var(--sidebar-width);
      background: var(--sidebar-bg);
      border-right: 1px solid var(--sidebar-border);
      transition: all var(--transition-slow);
      box-shadow: var(--sidebar-shadow);
    }

    .sidebar.collapsed {
      width: var(--sidebar-collapsed-width);
    }

    /* Mobile sidebar */
    @media (max-width: 1024px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: var(--z-modal);
        width: var(--sidebar-width);
        transform: translateX(-100%);
        transition: transform var(--transition-slow);
        background: var(--sidebar-header-bg) !important;
        box-shadow: var(--shadow-xl) !important;
      }

      .sidebar.mobile-open {
        transform: translateX(0);
      }
      
      .collapse-toggle-btn {
        display: none !important;
      }
    }

    /* Header */
    .sidebar-header {
      height: 5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-md);
      border-bottom: 1px solid var(--sidebar-border);
      background: var(--sidebar-header-bg);
      transition: background var(--transition-slow);
    }
    
    .logo-content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 0.75rem;
      overflow: hidden;
    }
    
    .sidebar.collapsed .logo-content {
      justify-content: center;
      gap: 0;
    }
    
    .logo-image {
      height: 2.5rem;
      width: auto;
      max-width: 100%;
      object-fit: contain;
      transition: all var(--transition-slow);
      flex-shrink: 0;
    }
    
    .logo-image.logo-collapsed {
      height: 2rem;
    }
    
    .logo-text {
      font-size: 1rem;
      font-weight: 600;
      color: var(--logo-text-color);
      letter-spacing: 0.025em;
      white-space: nowrap;
      transition: all var(--transition-slow);
      opacity: 1;
      transform: translateX(0);
    }
    
    .sidebar.collapsed .logo-text {
      opacity: 0;
      transform: translateX(-10px);
      width: 0;
    }
    
    /* Fallback logo */
    .logo-fallback {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--logo-text-color);
      transition: all var(--transition-slow);
    }
    
    .logo-fallback i {
      font-size: 2rem;
    }
    
    .logo-fallback span {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    
    .logo-fallback.logo-collapsed {
      justify-content: center;
    }
    
    .logo-fallback.logo-collapsed i {
      font-size: 1.5rem;
    }
    
    .mobile-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      border: none;
      background-color: var(--btn-bg);
      color: var(--btn-color);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all var(--transition-base);
    }
    
    .mobile-close-btn:hover {
      background-color: var(--btn-hover-bg);
      color: var(--btn-hover-color);
    }
    
    .mobile-close-btn i {
      font-size: 1.25rem;
    }
    
    @media (min-width: 1025px) {
      .mobile-close-btn {
        display: none;
      }
    }

    /* Navigation */
    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1rem 0;
    }
    
    .sidebar-nav::-webkit-scrollbar {
      width: 4px;
    }
    
    .sidebar-nav::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .sidebar-nav::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb);
      border-radius: var(--radius-sm);
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      padding: 0.75rem var(--spacing-md);
      margin: 0 0.75rem;
      color: var(--nav-item-color);
      text-decoration: none;
      transition: all var(--transition-base);
      white-space: nowrap;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border-left: 3px solid transparent;
      padding-left: calc(var(--spacing-md) - 3px);
    }

    .nav-item:hover {
      background-color: var(--nav-item-hover-bg);
      color: var(--nav-item-hover-color);
      transform: translateX(2px);
    }

    .nav-item.active {
      background: var(--nav-item-active-bg);
      color: var(--nav-item-active-color);
      font-weight: 600;
      border-left-color: var(--nav-item-active-border);
      position: relative;
      transform: translateX(0);
    }
    
    .nav-item.active .nav-icon {
      color: var(--nav-item-active-icon);
      transform: scale(1.05);
    }

    .nav-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
      transition: transform 0.2s ease;
    }
    
    .nav-item:hover .nav-icon {
      transform: scale(1.1);
    }

    .nav-label {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .badge {
      font-size: 0.75rem;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      font-weight: 600;
    }
    
    .badge-primary {
      background-color: var(--badge-primary-bg);
      color: var(--badge-primary-color);
    }

    /* Collapsed state */
    .nav-item.collapsed-item {
      justify-content: center;
      padding: 0.75rem;
      padding-left: calc(0.75rem - 3px);
      margin: 0 0.5rem;
      border-left: 3px solid transparent;
    }
    
    .nav-item.collapsed-item.active {
      border-left-color: var(--nav-item-active-border);
      background: var(--nav-item-active-bg);
    }

    .sidebar.collapsed .nav-label,
    .sidebar.collapsed .badge {
      display: none;
    }
    
    .nav-item.collapsed-item:hover {
      transform: translateX(0);
    }
    
    /* Tooltip for collapsed items */
    .nav-item.collapsed-item:hover::after {
      content: attr(title);
      position: absolute;
      left: 100%;
      margin-left: 0.75rem;
      padding: 0.5rem 0.75rem;
      background-color: #1f2937;
      color: #ffffff;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      white-space: nowrap;
      z-index: 1000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      opacity: 0;
      animation: tooltipFadeIn 0.2s ease forwards;
      pointer-events: none;
    }
    
    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: translateX(-4px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    :host-context(.dark) .nav-item.collapsed-item:hover::after {
      background-color: var(--color-bg-hover);
    }

    /* Collapse Toggle Button */
    .collapse-toggle-btn {
      display: flex;
      position: absolute;
      right: -0.75rem;
      top: 5rem;
      width: 1.5rem;
      height: 1.5rem;
      background-color: var(--sidebar-header-bg);
      border: 1px solid var(--btn-border);
      border-radius: 9999px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-base);
      box-shadow: var(--shadow-sm);
      color: var(--btn-color);
      z-index: var(--z-modal);
    }

    .collapse-toggle-btn:hover {
      background-color: var(--btn-hover-bg);
      color: var(--nav-item-active-color);
      border-color: var(--btn-hover-border);
      transform: scale(1.1);
    }

    .collapse-toggle-btn i {
      font-size: 0.75rem;
      transition: transform 0.2s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  private readonly router = inject(Router);
  
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() mobileClose = new EventEmitter<void>();
  
  // Centralized branding constants
  readonly brandName = BRAND.SHORT_NAME;
  readonly brandLogo = BRAND.LOGO_PATH;
  readonly fallbackIcon = BRAND.FALLBACK_ICON;
  
  logoError = false;

  // All navigation menu items
  private allMenuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi-home',
      route: '/dashboard',
    },
    {
      label: 'Sales',
      icon: 'pi-chart-line',
      route: '/sales',
    },
    {
      label: 'Point of Sale',
      icon: 'pi-shopping-cart',
      route: '/pos',
    },
    {
      label: 'Purchases',
      icon: 'pi-shopping-bag',
      route: '/purchases',
    },
    {
      label: 'Stock',
      icon: 'pi-box',
      route: '/stock',
    },
    {
      label: 'Finance',
      icon: 'pi-wallet',
      route: '/finance',
    },
    {
      label: 'Accounting',
      icon: 'pi-calculator',
      route: '/accounting',
    },
    {
      label: 'Reports',
      icon: 'pi-file',
      route: '/reports',
    },
    {
      label: 'HR',
      icon: 'pi-users',
      route: '/hr',
    },
    {
      label: 'Tasks',
      icon: 'pi-check-square',
      route: '/tasks',
    },
    {
      label: 'Admin',
      icon: 'pi-shield',
      route: '/admin',
    },
  ]);

  // Filtered menu items based on permissions (computed)
  menuItems = computed(() => {
    const items = this.allMenuItems();
    return items.filter((item) => this.canShowMenuItem(item));
  });

  /**
   * Check if menu item should be visible based on permissions
   */
  private canShowMenuItem(item: MenuItem): boolean {
    // Manual visibility control
    if (item.visible === false) {
      return false;
    }

    // TODO: Add permission checks when PermissionService is available
    // if (item.module) {
    //   return this.permissionService.canAccessModule(item.module);
    // }
    // if (item.permission) {
    //   const permissions = Array.isArray(item.permission) ? item.permission : [item.permission];
    //   return this.permissionService.hasAnyPermissions(permissions);
    // }

    // No restrictions, show by default
    return true;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  handleMobileClose(): void {
    this.mobileClose.emit();
  }

  onNavItemClick(): void {
    // Close mobile menu when nav item is clicked (with small delay for navigation)
    if (this.mobileOpen) {
      setTimeout(() => {
        this.mobileClose.emit();
      }, 100);
    }
  }

  /**
   * Handle logo image loading error
   */
  onLogoError(): void {
    this.logoError = true;
  }

  /**
   * Check if a route is currently active
   */
  isActiveRoute(route: string): boolean {
    if (!route) return false;
    
    const currentUrl = this.router.url;
    
    // Exact match for root and dashboard
    if (route === '/' || route === '/dashboard') {
      return currentUrl === route || currentUrl === '/' || currentUrl === '/dashboard';
    }
    
    // Check if current URL starts with the route
    return currentUrl.startsWith(route);
  }
}
