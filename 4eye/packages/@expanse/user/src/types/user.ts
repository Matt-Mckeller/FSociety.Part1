/**
 * User Types
 *
 * Central definition of User-related types used across the application.
 */

/**
 * Reading level preference for content difficulty.
 */
export type ReadingLevel = "CHILD" | "STANDARD" | "ACADEMIC";

/**
 * User role for authorization.
 */
export type UserRole = "MEMBER" | "ADMIN";

/**
 * Represents an authenticated user in the system.
 */
export interface User {
  /** Unique user identifier */
  id: string;
  /** User's email address */
  email: string;
  /** User's display name */
  name: string;
  /** URL to user's avatar image */
  avatarUrl?: string;
  /** User's role for authorization */
  role: UserRole;
  /** Preferred reading level for content */
  readingLevel?: ReadingLevel;
  /** User's preferred language code (e.g., 'en', 'es') */
  preferredLanguage?: string;
  /** ISO timestamp when email was verified */
  emailVerifiedAt?: string;
  /** ISO timestamp when user was created */
  createdAt: string;
}

/**
 * Minimal user info for display purposes (e.g., avatars, mentions).
 */
export interface UserSummary {
  id: string;
  name: string;
  avatarUrl?: string;
}
