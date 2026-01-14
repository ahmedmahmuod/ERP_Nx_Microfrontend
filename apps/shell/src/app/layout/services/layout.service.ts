/**
 * Layout Service
 * 
 * Manages shell layout state including sidebar, theme, and navigation.
 * Follows facade pattern for clean separation of concerns.
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { ThemeService, ResponsiveService } from '@erp/shared/ui';

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  roles?: string[];
  children?: NavigationItem[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private readonly themeService = inject(ThemeService);
  private readonly responsiveService = inject(ResponsiveService);
  
  /**
   * Sidebar collapsed state
   */
  private readonly _sidebarCollapsed = signal<boolean>(false);
  readonly sidebarCollapsed = this._sidebarCollapsed.asReadonly();
  
  /**
   * Mobile sidebar open state
   */
  private readonly _mobileSidebarOpen = signal<boolean>(false);
  readonly mobileSidebarOpen = this._mobileSidebarOpen.asReadonly();
  
  /**
   * Current user profile
   */
  private readonly _currentUser = signal<UserProfile | null>(null);
  readonly currentUser = this._currentUser.asReadonly();
  
  /**
   * Navigation items
   */
  private readonly _navigationItems = signal<NavigationItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard'
    },
    {
      id: 'auth',
      label: 'Authentication',
      icon: '🔐',
      route: '/auth'
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: '💰',
      route: '/finance',
      roles: ['admin', 'finance']
    },
    {
      id: 'hr',
      label: 'Human Resources',
      icon: '👥',
      route: '/hr',
      roles: ['admin', 'hr']
    },
    {
      id: 'supply',
      label: 'Supply Chain',
      icon: '📦',
      route: '/supply',
      roles: ['admin', 'supply']
    }
  ]);
  readonly navigationItems = this._navigationItems.asReadonly();
  
  /**
   * Computed: Filtered navigation items based on user role
   */
  readonly visibleNavigationItems = computed(() => {
    const user = this._currentUser();
    const items = this._navigationItems();
    
    if (!user) return items.filter(item => !item.roles);
    
    return items.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(user.role);
    });
  });
  
  /**
   * Computed: Should auto-collapse sidebar on mobile
   */
  readonly shouldAutoCollapse = computed(() => {
    return this.responsiveService.isMobile();
  });
  
  /**
   * Computed: Sidebar width class
   */
  readonly sidebarWidthClass = computed(() => {
    if (this.responsiveService.isMobile()) {
      return this._mobileSidebarOpen() ? 'w-64' : 'w-0';
    }
    return this._sidebarCollapsed() ? 'w-16' : 'w-64';
  });
  
  /**
   * Toggle sidebar collapsed state
   */
  toggleSidebar(): void {
    if (this.responsiveService.isMobile()) {
      this._mobileSidebarOpen.update(open => !open);
    } else {
      this._sidebarCollapsed.update(collapsed => !collapsed);
    }
  }
  
  /**
   * Close mobile sidebar
   */
  closeMobileSidebar(): void {
    this._mobileSidebarOpen.set(false);
  }
  
  /**
   * Open mobile sidebar
   */
  openMobileSidebar(): void {
    this._mobileSidebarOpen.set(true);
  }
  
  /**
   * Set current user
   */
  setCurrentUser(user: UserProfile | null): void {
    this._currentUser.set(user);
  }
  
  /**
   * Toggle theme
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  /**
   * Get current theme
   */
  get currentTheme() {
    return this.themeService.currentTheme;
  }
  
  /**
   * Get is dark mode
   */
  get isDarkMode() {
    return this.themeService.isDarkMode;
  }
}
