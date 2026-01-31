/**
 * Navigation Models
 *
 * Typed contracts for dynamic remote-driven sidebar system.
 * These models ensure type safety across shell and remote applications.
 */

/**
 * Navigation item representing a menu entry
 */
export interface NavItem {
  /** Display label for the menu item */
  label: string;

  /** Route path (relative to the remote's base path) */
  route?: string;

  /** PrimeNG icon class (e.g., 'pi-home', 'pi-users') */
  icon?: string;

  /** Nested child menu items for hierarchical navigation */
  children?: NavItem[];

  /** Required page permission to view this item */
  requiredPage?: string;

  /** Optional badge text (e.g., 'New', '5') */
  badge?: string;

  /** Optional badge styling class */
  badgeClass?: string;

  /** Additional search keywords for better discoverability */
  searchKeywords?: string[];

  /** Whether this item is visible (default: true) */
  visible?: boolean;

  /** Computed: Whether this item's route is currently active */
  _isActive?: boolean;

  /** Computed: Whether any child of this item is currently active */
  _hasActiveChild?: boolean;
}

/**
 * Navigation manifest provided by each remote application
 */
export interface NavigationManifest {
  /** Unique identifier for the remote app (e.g., 'finance', 'hr') */
  appId: string;

  /** Human-readable application name (e.g., 'Finance', 'Human Resources') */
  appName: string;

  /** Sidebar title to display when this app is active */
  sidebarTitle: string;

  /** Accent token identifier for theming (e.g., 'finance', 'hr', 'supply') */
  accentToken: string;

  /** Menu items for this application's sidebar */
  menuItems: NavItem[];

  /** Optional global search keywords for the entire app */
  searchKeywords?: string[];

  /** Optional icon for the app (PrimeNG icon class) */
  appIcon?: string;
}

/**
 * Navigation state managed by the shell
 */
export interface NavigationState {
  /** Currently active manifest (null if shell-only or loading) */
  activeManifest: NavigationManifest | null;

  /** Whether a manifest is currently being loaded */
  loading: boolean;

  /** Error message if manifest loading failed */
  error: string | null;

  /** Currently active app ID */
  activeAppId: string | null;
}

/**
 * Accent token type for type safety
 */
export type AccentToken = 'shell' | 'finance' | 'hr' | 'supply' | 'auth';
