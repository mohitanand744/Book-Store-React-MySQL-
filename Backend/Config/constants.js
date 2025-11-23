// Time constants (calculations)
export const DAYS_PER_WEEK = 7;
export const HOURS_PER_DAY = 24;
export const MINUTES_PER_HOUR = 60;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_SECOND = 1000;

// Token expiry durations (in minutes/hours - these are business logic)
export const RESET_TOKEN_EXPIRES_IN = 10; // minutes
export const EMAIL_VERIFICATION_TOKEN_EXPIRES_IN = 10; // minutes
export const USER_TOKEN_EXPIRES_IN = 24; // hours
export const OAUTH_EXCHANGE_EXPIRY = 10; // minutes

// Convert to milliseconds for actual usage

export const OAUTH_EXCHANGE_EXPIRY_MS =
  OAUTH_EXCHANGE_EXPIRY * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;

export const RESET_TOKEN_EXPIRY_MS =
  RESET_TOKEN_EXPIRES_IN *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MILLISECONDS_PER_SECOND;
export const EMAIL_VERIFICATION_TOKEN_EXPIRY_MS =
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MILLISECONDS_PER_SECOND;
export const USER_TOKEN_EXPIRY_MS =
  USER_TOKEN_EXPIRES_IN *
  HOURS_PER_DAY *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MILLISECONDS_PER_SECOND;

// Application constants
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];
