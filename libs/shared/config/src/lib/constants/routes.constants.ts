/**
 * Routes Constants
 * Centralized route definitions
 * Single source of truth for all application routes
 */

/**
 * Base Route Paths
 */
export const BASE_ROUTES = {
  ROOT: '/',
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  FINANCE: '/finance',
  HR: '/hr',
  SUPPLY: '/supply',
  DESIGN_SYSTEM: '/design-system',
  SHOWCASE: '/showcase',
} as const;

/**
 * Auth Routes
 */
export const AUTH_ROUTES = {
  BASE: BASE_ROUTES.AUTH,
  LOGIN: `${BASE_ROUTES.AUTH}/login`,
  REGISTER: `${BASE_ROUTES.AUTH}/register`,
  SELECT_COMPANY: `${BASE_ROUTES.AUTH}/select-company`,
  FORGOT_PASSWORD: `${BASE_ROUTES.AUTH}/forgot-password`,
  RESET_PASSWORD: `${BASE_ROUTES.AUTH}/reset-password`,
  VERIFY_EMAIL: `${BASE_ROUTES.AUTH}/verify-email`,
} as const;

/**
 * Dashboard Routes
 */
export const DASHBOARD_ROUTES = {
  BASE: BASE_ROUTES.DASHBOARD,
  OVERVIEW: `${BASE_ROUTES.DASHBOARD}/overview`,
  ANALYTICS: `${BASE_ROUTES.DASHBOARD}/analytics`,
  REPORTS: `${BASE_ROUTES.DASHBOARD}/reports`,
} as const;

/**
 * Finance Module Routes
 */
export const FINANCE_ROUTES = {
  BASE: BASE_ROUTES.FINANCE,
  ACCOUNTS: `${BASE_ROUTES.FINANCE}/accounts`,
  TRANSACTIONS: `${BASE_ROUTES.FINANCE}/transactions`,
  INVOICES: `${BASE_ROUTES.FINANCE}/invoices`,
  PAYMENTS: `${BASE_ROUTES.FINANCE}/payments`,
  REPORTS: `${BASE_ROUTES.FINANCE}/reports`,
} as const;

/**
 * HR Module Routes
 */
export const HR_ROUTES = {
  BASE: BASE_ROUTES.HR,
  EMPLOYEES: `${BASE_ROUTES.HR}/employees`,
  DEPARTMENTS: `${BASE_ROUTES.HR}/departments`,
  ATTENDANCE: `${BASE_ROUTES.HR}/attendance`,
  PAYROLL: `${BASE_ROUTES.HR}/payroll`,
  LEAVE: `${BASE_ROUTES.HR}/leave`,
  RECRUITMENT: `${BASE_ROUTES.HR}/recruitment`,
} as const;

/**
 * Supply Chain Module Routes
 */
export const SUPPLY_ROUTES = {
  BASE: BASE_ROUTES.SUPPLY,
  INVENTORY: `${BASE_ROUTES.SUPPLY}/inventory`,
  ORDERS: `${BASE_ROUTES.SUPPLY}/orders`,
  SUPPLIERS: `${BASE_ROUTES.SUPPLY}/suppliers`,
  WAREHOUSES: `${BASE_ROUTES.SUPPLY}/warehouses`,
  SHIPMENTS: `${BASE_ROUTES.SUPPLY}/shipments`,
} as const;

/**
 * Additional Module Routes
 */
export const ADDITIONAL_ROUTES = {
  SALES: '/sales',
  POS: '/pos',
  PURCHASES: '/purchases',
  STOCK: '/stock',
  ACCOUNTING: '/accounting',
  REPORTS: '/reports',
  TASKS: '/tasks',
  ADMIN: '/admin',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',
} as const;

/**
 * Error Routes
 */
export const ERROR_ROUTES = {
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
} as const;

/**
 * Default Redirects
 */
export const DEFAULT_REDIRECTS = {
  AFTER_LOGIN: AUTH_ROUTES.SELECT_COMPANY,
  AFTER_LOGOUT: AUTH_ROUTES.LOGIN,
  UNAUTHORIZED: AUTH_ROUTES.LOGIN,
  NOT_FOUND: BASE_ROUTES.DASHBOARD,
} as const;

/**
 * Route Matcher Patterns
 * For route guards and navigation
 */
export const ROUTE_PATTERNS = {
  AUTH: /^\/auth/,
  PROTECTED: /^\/(?!auth)/,
  PUBLIC: /^\/(auth|404|401|403|500)/,
} as const;
