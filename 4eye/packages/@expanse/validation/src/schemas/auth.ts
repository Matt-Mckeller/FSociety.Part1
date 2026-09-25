/**
 * Authentication Validation Schemas
 * 
 * Zod schemas for all authentication-related inputs.
 * These are the source of truth for both frontend and backend validation.
 */

import { z } from 'zod';
import {
  emailSchema,
  nameSchema,
  loginPasswordSchema,
  strongPasswordSchema,
  tokenSchema,
} from './common';

// ============================================================================
// OAuth Types
// ============================================================================

export const OAuthProviderSchema = z.enum(['GOOGLE', 'APPLE']);
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;

// ============================================================================
// Login Schema
// ============================================================================

/**
 * Login mutation input.
 * Email + password only (no strength requirements on login).
 */
export const LoginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

export type LoginInput = z.infer<typeof LoginSchema>;

// ============================================================================
// Signup Schema
// ============================================================================

/**
 * Signup mutation input.
 * Requires strong password, name, and email.
 */
export const SignupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: strongPasswordSchema,
  preferredLanguage: z.string().optional(),
});

export type SignupInput = z.infer<typeof SignupSchema>;

// ============================================================================
// OAuth Login Schema
// ============================================================================

/**
 * OAuth login mutation input.
 * Provider + ID token from Google/Apple.
 */
export const OAuthLoginSchema = z.object({
  provider: OAuthProviderSchema,
  idToken: z.string().min(1, 'ID token is required'),
  nonce: z.string().optional(), // Required for Apple Sign In
});

export type OAuthLoginInput = z.infer<typeof OAuthLoginSchema>;

// ============================================================================
// Forgot Password Schema
// ============================================================================

/**
 * Forgot password mutation input.
 * Email only.
 */
export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

// ============================================================================
// Reset Password Schema
// ============================================================================

/**
 * Reset password mutation input.
 * Token from email + new strong password.
 */
export const ResetPasswordSchema = z.object({
  token: tokenSchema,
  password: strongPasswordSchema,
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

/**
 * Reset password form schema (frontend only).
 * Includes password confirmation field.
 */
export const ResetPasswordFormSchema = z
  .object({
    token: tokenSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormInput = z.infer<typeof ResetPasswordFormSchema>;

// ============================================================================
// Refresh Token Schema
// ============================================================================

/**
 * Refresh token mutation input.
 */
export const RefreshTokenSchema = z.object({
  refreshToken: tokenSchema,
});

export type RefreshTokenInput = z.infer<typeof RefreshTokenSchema>;

// ============================================================================
// Email Step Schema (multi-step login)
// ============================================================================

/**
 * Email-only validation for step 1 of multi-step login.
 */
export const EmailStepSchema = z.object({
  email: emailSchema,
});

export type EmailStepInput = z.infer<typeof EmailStepSchema>;
