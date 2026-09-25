/**
 * User Entity
 * 
 * Core user data shared across web and mobile apps.
 */

/** User role in the system */
export type UserRole = 'MEMBER' | 'ADMIN';

/** Reading level for content adaptation */
export type ReadingLevel = 'CHILD' | 'STANDARD' | 'ACADEMIC';

/** Accessibility mode for UI/content adaptation */
export type AccessibilityMode = 
  | 'DEFAULT' 
  | 'ADHD' 
  | 'AUTISM' 
  | 'DYSLEXIA' 
  | 'LOW_VISION' 
  | 'COGNITIVE';

/**
 * User entity representing an authenticated user.
 * 
 * @example
 * ```typescript
 * const user: User = {
 *   id: 'uuid',
 *   email: 'user@example.com',
 *   name: 'John Doe',
 *   role: 'MEMBER',
 *   createdAt: '2024-01-01T00:00:00Z'
 * };
 * ```
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Email address (unique) */
  email: string;
  /** Display name */
  name: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** System role */
  role: UserRole;
  /** Preferred reading level for content adaptation */
  readingLevel?: ReadingLevel;
  /** Preferred language (ISO 639-1 code) */
  preferredLanguage?: string;
  /** Accessibility mode preference */
  accessibilityMode?: AccessibilityMode;
  /** When email was verified */
  emailVerifiedAt?: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt?: string;
}
