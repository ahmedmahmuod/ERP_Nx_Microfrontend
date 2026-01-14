/**
 * Sidebar Component
 * 
 * Collapsible navigation sidebar with role-based menu items.
 * Dumb component - all state from LayoutService.
 */

import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationItem } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside [class]="sidebarClasses()">
      <!-- Overlay for mobile -->
      @if (isMobile() && isOpen()) {
        <div 
          class="sidebar-overlay"
          (click)="overlayClick.emit()"
          aria-hidden="true">
        </div>
      }
      
      <!-- Sidebar content -->
      <nav class="sidebar-nav" [attr.aria-label]="'Main navigation'">
        <ul class="nav-list">
          @for (item of navigationItems(); track item.id) {
            <li class="nav-item">
              <a 
                [routerLink]="item.route"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{exact: false}"
                class="nav-link"
                (click)="navItemClick.emit(item)"
                [attr.aria-label]="item.label">
                <span class="nav-icon">{{ item.icon }}</span>
                @if (!isCollapsed() || isMobile()) {
                  <span class="nav-label">{{ item.label }}</span>
                }
              </a>
            </li>
          }
        </ul>
      </nav>
      
      <!-- Collapse toggle (desktop only) -->
      @if (!isMobile()) {
        <button 
          class="collapse-toggle"
          (click)="collapseToggle.emit()"
          [attr.aria-label]="isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'">
          <span class="collapse-icon">{{ isCollapsed() ? '→' : '←' }}</span>
        </button>
      }
    </aside>
  `,
  styles: [`
    aside {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: white;
      border-right: 1px solid rgb(229 231 235);
      transition: width 0.3s ease;
    }

    :host-context(.dark) aside {
      background-color: rgb(31 41 55);
      border-right-color: rgb(55 65 81);
    }

    /* Mobile sidebar */
    @media (max-width: 767px) {
      aside {
        position: fixed;
        top: 4rem;
        left: 0;
        bottom: 0;
        z-index: 40;
        width: 16rem;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      aside.mobile-open {
        transform: translateX(0);
      }
    }

    .sidebar-overlay {
      position: fixed;
      inset: 0;
      top: 4rem;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 39;
    }

    .sidebar-nav {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 0;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      margin: 0;
      padding: 0;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1.5rem;
      color: rgb(55 65 81);
      text-decoration: none;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .nav-link:hover {
      background-color: rgb(243 244 246);
      color: rgb(59 130 246);
    }

    .nav-link.active {
      background-color: rgb(239 246 255);
      color: rgb(59 130 246);
      border-right: 3px solid rgb(59 130 246);
    }

    :host-context(.dark) .nav-link {
      color: rgb(209 213 219);
    }

    :host-context(.dark) .nav-link:hover {
      background-color: rgb(55 65 81);
      color: rgb(96 165 250);
    }

    :host-context(.dark) .nav-link.active {
      background-color: rgb(30 58 138);
      color: rgb(147 197 253);
      border-right-color: rgb(96 165 250);
    }

    .nav-icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }

    .nav-label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Collapsed state */
    aside.collapsed .nav-link {
      justify-content: center;
      padding: 0.75rem;
    }

    aside.collapsed .nav-label {
      display: none;
    }

    .collapse-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 1rem;
      border: none;
      border-top: 1px solid rgb(229 231 235);
      background-color: transparent;
      color: rgb(107 114 128);
      cursor: pointer;
      transition: all 0.2s;
    }

    .collapse-toggle:hover {
      background-color: rgb(243 244 246);
      color: rgb(59 130 246);
    }

    :host-context(.dark) .collapse-toggle {
      border-top-color: rgb(55 65 81);
      color: rgb(156 163 175);
    }

    :host-context(.dark) .collapse-toggle:hover {
      background-color: rgb(55 65 81);
      color: rgb(96 165 250);
    }

    .collapse-icon {
      font-size: 1.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  readonly navigationItems = input.required<NavigationItem[]>();
  readonly isCollapsed = input<boolean>(false);
  readonly isOpen = input<boolean>(false);
  readonly isMobile = input<boolean>(false);
  
  readonly navItemClick = output<NavigationItem>();
  readonly collapseToggle = output<void>();
  readonly overlayClick = output<void>();
  
  sidebarClasses(): string {
    const classes = [];
    
    if (this.isCollapsed() && !this.isMobile()) {
      classes.push('collapsed');
    }
    
    if (this.isMobile() && this.isOpen()) {
      classes.push('mobile-open');
    }
    
    return classes.join(' ');
  }
}
