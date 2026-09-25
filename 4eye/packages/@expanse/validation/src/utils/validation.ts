/**
 * Validation Utilities
 * 
 * Helpers for working with Zod schemas in forms and APIs.
 */

import { z, ZodError, ZodSchema } from 'zod';

// ============================================================================
// Types
// ============================================================================

/**
 * Field-level errors for form display.
 * Key is field path (e.g., 'email', 'password'), value is error message.
 */
export type FieldErrors = Record<string, string | undefined>;

/**
 * Result of a validation operation.
 */
export type ValidationResult<T> =
  | { success: true; data: T; errors?: never }
  | { success: false; data?: never; errors: FieldErrors };

// ============================================================================
// Error Formatting
// ============================================================================

/**
 * Convert Zod errors to field-level errors for form display.
 * 
 * @param error - ZodError from schema.safeParse()
 * @returns Object with field paths as keys and error messages as values
 * 
 * @example
 * const result = LoginSchema.safeParse(data);
 * if (!result.success) {
 *   const errors = formatZodErrors(result.error);
 *   // { email: 'Email is required', password: 'Password is required' }
 * }
 */
export function formatZodErrors(error: ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};
  
  for (const issue of error.issues) {
    // Join path segments for nested fields (e.g., ['address', 'street'] → 'address.street')
    const path = issue.path.join('.');
    
    // Only keep the first error per field
    if (!fieldErrors[path]) {
      fieldErrors[path] = issue.message;
    }
  }
  
  return fieldErrors;
}

/**
 * Get all errors as a flat array of messages.
 * Useful for displaying all errors in a single list.
 */
export function getErrorMessages(error: ZodError): string[] {
  return error.issues.map((issue) => issue.message);
}

/**
 * Get the first error message from a ZodError.
 * Useful for displaying a single error summary.
 */
export function getFirstError(error: ZodError): string | undefined {
  return error.issues[0]?.message;
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Validate data against a schema and return a typed result.
 * 
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns ValidationResult with either typed data or field errors
 * 
 * @example
 * const result = validate(LoginSchema, { email: 'test@example.com', password: '123' });
 * if (result.success) {
 *   // result.data is typed as LoginInput
 *   await login(result.data);
 * } else {
 *   // result.errors is FieldErrors
 *   setFormErrors(result.errors);
 * }
 */
export function validate<T extends ZodSchema>(
  schema: T,
  data: unknown
): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return { success: false, errors: formatZodErrors(result.error) };
}

/**
 * Validate a single field against a schema.
 * Useful for real-time field validation as user types.
 * 
 * @param schema - Full schema containing the field
 * @param field - Field name to validate
 * @param value - Value to validate
 * @returns Error message if invalid, undefined if valid
 */
export function validateField<T extends ZodSchema>(
  schema: T,
  field: keyof z.infer<T>,
  value: unknown
): string | undefined {
  try {
    // Create a partial schema for just this field
    const objectSchema = schema as unknown as z.ZodObject<z.ZodRawShape>;
    const shape = objectSchema.shape;
    const fieldSchema = shape[field as string];
    
    if (!fieldSchema) {
      return undefined;
    }
    
    const result = fieldSchema.safeParse(value);
    
    if (result.success) {
      return undefined;
    }
    
    return result.error.issues[0]?.message;
  } catch {
    // Schema might not support .shape (e.g., ZodEffects)
    // Fall back to full validation
    const result = schema.safeParse({ [field]: value });
    if (result.success) {
      return undefined;
    }
    const fieldError = result.error.issues.find(
      (issue) => issue.path[0] === field
    );
    return fieldError?.message;
  }
}

/**
 * Check if a value passes validation without returning transformed data.
 * Lightweight check for conditional logic.
 */
export function isValid<T extends ZodSchema>(
  schema: T,
  data: unknown
): data is z.infer<T> {
  return schema.safeParse(data).success;
}

// ============================================================================
// Schema Introspection
// ============================================================================

/**
 * Get field names from a Zod object schema.
 * Useful for generating form fields dynamically.
 */
export function getSchemaFields<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T
): (keyof z.infer<T>)[] {
  return Object.keys(schema.shape) as (keyof z.infer<T>)[];
}

/**
 * Check if a field is optional in a schema.
 */
export function isFieldOptional<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  field: keyof z.infer<T>
): boolean {
  const fieldSchema = schema.shape[field as string];
  return fieldSchema?.isOptional() ?? false;
}
