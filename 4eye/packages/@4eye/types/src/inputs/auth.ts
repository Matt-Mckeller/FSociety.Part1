/**
 * Auth Input Types
 * 
 * Input types for authentication mutations.
 */

import type { User, ReadingLevel, AccessibilityMode } from '../entities/user';

/**
 * Input for login mutation.
 */
export interface LoginInput {
  /** User email */
  email: string;
  /** User password */
  password: string;
}

/**
 * Input for signup mutation.
 */
export interface SignupInput {
  /** User email */
  email: string;
  /** User password (min 8 chars) */
  password: string;
  /** Display name */
  name: string;
  /** Preferred language (ISO 639-1) */
  preferredLanguage?: string;
}

/**
 * Auth payload returned from login/signup.
 */
export interface AuthPayload {
  /** JWT access token */
  accessToken: string;
  /** User data */
  user: User;
}

/**
 * Input for forgot password mutation.
 */
export interface ForgotPasswordInput {
  /** User email */
  email: string;
}

/**
 * Input for reset password mutation.
 */
export interface ResetPasswordInput {
  /** Reset token from email */
  token: string;
  /** New password */
  password: string;
}

/**
 * Input for updating user profile.
 */
export interface UpdateUserInput {
  /** Display name */
  name?: string;
  /** Avatar URL */
  avatarUrl?: string;
  /** Preferred reading level */
  readingLevel?: ReadingLevel;
  /** Preferred language */
  preferredLanguage?: string;
  /** Accessibility mode */
  accessibilityMode?: AccessibilityMode;
}
