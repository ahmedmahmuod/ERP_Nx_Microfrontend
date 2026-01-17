/**
 * Sidebar Component - Enterprise Edition
 *
 * Modern, dynamic sidebar with:
 * - Single-expand accordion behavior
 * - Module-branded active states (accent token integration)
 * - Enhanced nested route visual differentiation
 * - Full accessibility (WCAG AA)
 * - Clean architecture (presentational component + SidebarFacade)
 */

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  inject,
  computed,
  effect,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BRAND } from '@erp/shared/config';
import { NavigationFacadeService } from '../../../core/services/navigation-facade.service';
import { SidebarFacadeService } from '../../services/sidebar-facade.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  template: `
    <!-- Mobile Backdrop -->
    @if (mobileOpen) {
      <div
        class="sidebar-backdrop"
        (click)="handleMobileClose()"
        (keydown.escape)="handleMobileClose()"
        role="button"
        tabindex="0"
        aria-label="Close sidebar"
      ></div>
    }

    <aside
      class="sidebar"
      [class.collapsed]="collapsed"
      [class.mobile-open]="mobileOpen"
      [attr.data-accent]="navigationFacade.accentToken()"
    >
      <!-- Header with App Branding -->
      <div class="sidebar-header">
        <div class="logo-content">
          @if (navigationFacade.appIcon()) {
            <i
              [class]="'pi ' + navigationFacade.appIcon() + ' app-icon'"
              [class.icon-collapsed]="collapsed"
            ></i>
          } @else if (logoError) {
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
          }
          @if (!collapsed) {
            <span class="logo-text">{{ navigationFacade.sidebarTitle() }}</span>
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

      <!-- Search Input -->
      @if (!collapsed) {
        <div class="sidebar-search">
          <div class="search-input-wrapper">
            <i class="pi pi-search search-icon"></i>
            <input
              type="text"
              class="search-input"
              placeholder="Search menu..."
              [value]="sidebarFacade.searchQuery()"
              (input)="onSearchInput($event)"
              [attr.aria-label]="'Search ' + navigationFacade.sidebarTitle() + ' menu'"
            />
            @if (sidebarFacade.searchQuery()) {
              <button
                class="search-clear"
                (click)="clearSearch()"
                aria-label="Clear search"
              >
                <i class="pi pi-times"></i>
              </button>
            }
          </div>
          @if (sidebarFacade.searchQuery() && sidebarFacade.filteredMenuItems().length === 0) {
            <div class="search-no-results">
              <i class="pi pi-info-circle"></i>
              <span>No results found</span>
            </div>
          }
        </div>
      }

      <!-- Navigation Menu -->
      <nav
        class="sidebar-nav"
        [attr.aria-label]="navigationFacade.sidebarTitle() + ' navigation'"
      >
        @if (navigationFacade.loading()) {
          <div class="nav-loading">
            <i class="pi pi-spin pi-spinner"></i>
            <span>Loading menu...</span>
          </div>
        } @else if (navigationFacade.error()) {
          <div class="nav-error">
            <i class="pi pi-exclamation-triangle"></i>
            <span>{{ navigationFacade.error() }}</span>
            <button class="retry-btn" (click)="retryLoadManifest()">
              <i class="pi pi-refresh"></i> Retry
            </button>
          </div>
        } @else {
          <ul class="nav-list" role="menu">
            @for (item of menuItemsWithState(); track item.route || item.label) {
              <li role="none">
                @if (item.children && item.children.length > 0 && !collapsed) {
                  <!-- Parent Group with Children -->
                  <div class="nav-group" [class.has-active-child]="item._hasActiveChild">
                    <button
                      class="nav-item nav-group-header"
                      [class.expanded]="isGroupExpanded(item.label)"
                      [class.has-active-child]="item._hasActiveChild"
                      (click)="toggleGroup(item.label)"
                      [attr.aria-expanded]="isGroupExpanded(item.label)"
                      role="menuitem"
                    >
                      @if (item.icon) {
                        <i [class]="'pi ' + item.icon + ' nav-icon'"></i>
                      }
                      <span class="nav-label" [title]="item.label">{{ item.label }}</span>
                      @if (item.badge) {
                        <span [class]="'badge ' + (item.badgeClass || 'badge-primary')">
                          {{ item.badge }}
                        </span>
                      }
                      <i
                        [class]="
                          'pi nav-chevron ' +
                          (isGroupExpanded(item.label) ? 'pi-chevron-down' : 'pi-chevron-right')
                        "
                      ></i>
                    </button>

                    <!-- Nested Children with Animation -->
                    <div
                      class="nav-sublist-wrapper"
                      [class.expanded]="isGroupExpanded(item.label)"
                    >
                      <ul class="nav-sublist" role="menu">
                        @for (child of item.children; track child.route || child.label) {
                          <li role="none">
                            <a
                              [routerLink]="child.route || []"
                              routerLinkActive="active"
                              [routerLinkActiveOptions]="{ exact: false }"
                              (click)="onNavItemClick()"
                              class="nav-item nav-subitem"
                              [class.active]="child._isActive"
                              role="menuitem"
                            >
                              @if (child.icon) {
                                <i [class]="'pi ' + child.icon + ' nav-icon'"></i>
                              }
                              <span class="nav-label" [title]="child.label">{{ child.label }}</span>
                              @if (child.badge) {
                                <span [class]="'badge ' + (child.badgeClass || 'badge-primary')">
                                  {{ child.badge }}
                                </span>
                              }
                            </a>
                          </li>
                        }
                      </ul>
                    </div>
                  </div>
                } @else {
                  <!-- Simple Leaf Item -->
                  <a
                    [routerLink]="item.route || []"
                    routerLinkActive="active"
                    [routerLinkActiveOptions]="{ exact: item.route === '/' || item.route === '/dashboard' }"
                    (click)="onNavItemClick()"
                    class="nav-item"
                    [class.collapsed-item]="collapsed"
                    [class.active]="item._isActive"
                    [attr.title]="collapsed ? item.label : null"
                    [attr.aria-current]="item._isActive ? 'page' : null"
                    role="menuitem"
                  >
                    @if (item.icon) {
                      <i [class]="'pi ' + item.icon + ' nav-icon'"></i>
                    }
                    @if (!collapsed) {
                      <span class="nav-label" [title]="item.label">{{ item.label }}</span>
                    }
                    @if (!collapsed && item.badge) {
                      <span [class]="'badge ' + (item.badgeClass || 'badge-primary')">
                        {{ item.badge }}
                      </span>
                    }
                  </a>
                }
              </li>
            }
          </ul>
        }
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
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  readonly navigationFacade = inject(NavigationFacadeService);
  readonly sidebarFacade = inject(SidebarFacadeService);

  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  @Output() mobileClose = new EventEmitter<void>();

  // Branding constants
  readonly brandName = BRAND.SHORT_NAME;
  readonly brandLogo = BRAND.LOGO_PATH;

  logoError = false;

  // Computed menu items with active state
  readonly menuItemsWithState = computed(() => {
    return this.sidebarFacade.menuItemsWithActiveState();
  });

  // Sync collapsed state with facade
  constructor() {
    effect(() => {
      const facadeCollapsed = this.sidebarFacade.collapsed();
      if (facadeCollapsed !== this.collapsed) {
        this.collapsed = facadeCollapsed;
        this.collapsedChange.emit(facadeCollapsed);
      }
    });
  }

  toggleCollapse(): void {
    this.sidebarFacade.toggleCollapsed();
  }

  handleMobileClose(): void {
    this.sidebarFacade.closeMobileSidebar();
    this.mobileClose.emit();
  }

  onNavItemClick(): void {
    // Close mobile menu when nav item is clicked
    if (this.mobileOpen) {
      setTimeout(() => {
        this.handleMobileClose();
      }, 100);
    }
  }

  onLogoError(): void {
    this.logoError = true;
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.sidebarFacade.setSearchQuery(input.value);
  }

  clearSearch(): void {
    this.sidebarFacade.clearSearch();
  }

  toggleGroup(label: string): void {
    this.sidebarFacade.toggleGroup(label);
  }

  isGroupExpanded(label: string): boolean {
    return this.sidebarFacade.isGroupExpanded(label);
  }

  retryLoadManifest(): void {
    this.navigationFacade.reloadManifest();
  }
}
