/**
 * Navigation Item Model
 * Represents a menu item in the application navigation
 */

export interface NavigationItem {
  /**
   * Unique identifier for the menu item
   */
  id: string;

  /**
   * Translation key for the label
   * Example: 'shell.nav.dashboard'
   */
  label: string;

  /**
   * PrimeIcons class name
   * Example: 'pi-home', 'pi-users'
   */
  icon: string;

  /**
   * Route path
   * Example: '/dashboard', '/users'
   */
  route: string;

  /**
   * Page permission key from backend (PageValue)
   * If undefined, the item is always visible
   * Example: 'Users', 'Companies', 'Roles'
   */
  pageKey?: string;

  /**
   * Category for Shell tabs
   * Only used in Shell application
   * Example: 'main', 'payment', 'needs', 'docs'
   */
  category?: 'main' | 'payment' | 'needs' | 'docs';

  /**
   * Optional badge text or count
   */
  badge?: string;

  /**
   * Child navigation items (for nested menus)
   */
  children?: NavigationItem[];
}
