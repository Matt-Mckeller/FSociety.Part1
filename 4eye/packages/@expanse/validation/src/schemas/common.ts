/**
 * Common Validation Schemas
 * 
 * Reusable schema primitives for email, password, name, etc.
 * These are building blocks for domain-specific schemas.
 */

import { z } from 'zod';

// ============================================================================
// Email Schema
// ============================================================================

/**
 * Email validation schema.
 * - Required
 * - Must be valid email format
 * - Automatically trimmed and lowercased
 */
export const emailSchema = z
  .string({ required_error: 'Email is required' })
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email is too long')
  .transform((v) => v.trim().toLowerCase());

// ============================================================================
// Password Schemas
// ============================================================================

/**
 * Password requirements (matches frontend display in PasswordInput).
 * Used for signup and password reset flows.
 */
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSymbol: false,
} as const;

/**
 * Strong password schema for signup/reset flows.
 * Enforces security requirements.
 */
export const strongPasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(1, 'Password is required')
  .min(PASSWORD_REQUIREMENTS.minLength, `Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters`)
  .max(PASSWORD_REQUIREMENTS.maxLength, `Password must be at most ${PASSWORD_REQUIREMENTS.maxLength} characters`)
  .refine((v) => /[A-Z]/.test(v), 'Password must contain at least one uppercase letter')
  .refine((v) => /[a-z]/.test(v), 'Password must contain at least one lowercase letter')
  .refine((v) => /[0-9]/.test(v), 'Password must contain at least one number');

/**
 * Simple password schema for login.
 * Only checks presence, not strength (user already has account).
 */
export const loginPasswordSchema = z
  .string({ required_error: 'Password is required' })
  .min(1, 'Password is required')
  .max(PASSWORD_REQUIREMENTS.maxLength, 'Password is too long');

// ============================================================================
// Name Schema
// ============================================================================

/**
 * Display name validation.
 * - Required
 * - 2-100 characters
 * - Automatically trimmed
 */
export const nameSchema = z
  .string({ required_error: 'Name is required' })
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be at most 100 characters')
  .transform((v) => v.trim());

// ============================================================================
// Token Schemas
// ============================================================================

/**
 * Generic token schema (for reset tokens, refresh tokens, etc.).
 */
export const tokenSchema = z
  .string({ required_error: 'Token is required' })
  .min(1, 'Token is required');

/**
 * UUID schema.
 */
export const uuidSchema = z
  .string()
  .uuid('Invalid ID format');
