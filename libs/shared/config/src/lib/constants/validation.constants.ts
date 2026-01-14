/**
 * Validation Constants
 * Centralized validation rules and patterns
 */

/**
 * Regular Expression Patterns
 */
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[\d\s\-+()]+$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC: /^\d+$/,
  ALPHA: /^[a-zA-Z]+$/,
  POSTAL_CODE: /^[A-Z0-9]{3,10}$/i,
  CREDIT_CARD: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,
} as const;

/**
 * Validation Length Constraints
 */
export const LENGTH_CONSTRAINTS = {
  USERNAME: {
    MIN: 3,
    MAX: 20,
  },
  PASSWORD: {
    MIN: 6,
    MAX: 128,
  },
  EMAIL: {
    MIN: 5,
    MAX: 255,
  },
  NAME: {
    MIN: 2,
    MAX: 100,
  },
  DESCRIPTION: {
    MIN: 10,
    MAX: 1000,
  },
  COMMENT: {
    MIN: 1,
    MAX: 500,
  },
  PHONE: {
    MIN: 10,
    MAX: 15,
  },
  ADDRESS: {
    MIN: 10,
    MAX: 255,
  },
} as const;

/**
 * Validation Error Messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD: 'Password must be at least 6 characters',
  PASSWORD_STRONG:
    'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
  USERNAME: 'Username must be 3-20 characters and contain only letters, numbers, underscores and hyphens',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
  MIN_VALUE: (min: number) => `Minimum value is ${min}`,
  MAX_VALUE: (max: number) => `Maximum value is ${max}`,
  PATTERN_MISMATCH: 'Invalid format',
  NUMERIC: 'Only numbers are allowed',
  ALPHANUMERIC: 'Only letters and numbers are allowed',
  ALPHA: 'Only letters are allowed',
  MATCH: 'Fields do not match',
  UNIQUE: 'This value already exists',
  FILE_SIZE: (maxSize: number) => `File size must not exceed ${maxSize}MB`,
  FILE_TYPE: (types: string) => `Only ${types} files are allowed`,
} as const;

/**
 * Numeric Constraints
 */
export const NUMERIC_CONSTRAINTS = {
  PERCENTAGE: {
    MIN: 0,
    MAX: 100,
  },
  QUANTITY: {
    MIN: 0,
    MAX: 999999,
  },
  PRICE: {
    MIN: 0,
    MAX: 9999999.99,
    DECIMAL_PLACES: 2,
  },
  DISCOUNT: {
    MIN: 0,
    MAX: 100,
  },
  TAX_RATE: {
    MIN: 0,
    MAX: 100,
  },
  AGE: {
    MIN: 18,
    MAX: 120,
  },
  RATING: {
    MIN: 1,
    MAX: 5,
  },
} as const;

/**
 * Date Constraints
 */
export const DATE_CONSTRAINTS = {
  MIN_AGE_YEARS: 18,
  MAX_AGE_YEARS: 120,
  FUTURE_BOOKING_DAYS: 365,
  PAST_RECORD_YEARS: 10,
} as const;
