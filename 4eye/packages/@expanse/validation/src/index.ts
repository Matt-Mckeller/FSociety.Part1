/**
 * @expanse/validation
 * 
 * Shared validation schemas for frontend and backend.
 * Uses Zod as the validation library.
 * 
 * @example
 * // Frontend form validation
 * import { LoginSchema, validate } from '@expanse/validation';
 * 
 * const result = validate(LoginSchema, formData);
 * if (!result.success) {
 *   setErrors(result.errors);
 * }
 * 
 * @example
 * // Backend validation
 * import { LoginSchema } from '@expanse/validation';
 * 
 * const result = LoginSchema.safeParse(input);
 * if (!result.success) {
 *   throw new ValidationError(result.error);
 * }
 */

// Re-export Zod for convenience
export { z } from 'zod';
export type { ZodSchema, ZodError, ZodIssue } from 'zod';

// Schemas
export * from './schemas';

// Utilities
export * from './utils';
