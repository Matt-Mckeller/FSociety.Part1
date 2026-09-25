/**
 * useFormValidation Hook
 * 
 * React hook for form validation using Zod schemas.
 * Provides field-level error management and real-time validation.
 * 
 * @example
 * const { errors, validate, clearError, setErrors } = useFormValidation(LoginSchema);
 * 
 * const handleSubmit = () => {
 *   const result = validate({ email, password });
 *   if (result.success) {
 *     await login(result.data);
 *   }
 * };
 */

import { useState, useCallback, useMemo } from 'react';
import {
  validate as zodValidate,
  validateField as zodValidateField,
  type FieldErrors,
  type ValidationResult,
  type ZodSchema,
} from '@expanse/validation';

export interface UseFormValidationReturn<T> {
  /** Current field errors */
  errors: FieldErrors;
  
  /** Validate all data against the schema. Returns typed result. */
  validate: (data: unknown) => ValidationResult<T>;
  
  /** Validate a single field. Returns error message or undefined. */
  validateField: (field: keyof T, value: unknown) => string | undefined;
  
  /** Clear error for a specific field */
  clearError: (field: keyof T) => void;
  
  /** Clear all errors */
  clearAllErrors: () => void;
  
  /** Manually set errors (e.g., from server response) */
  setErrors: React.Dispatch<React.SetStateAction<FieldErrors>>;
  
  /** Set a single field error */
  setFieldError: (field: keyof T, message: string) => void;
  
  /** Check if form has any errors */
  hasErrors: boolean;
  
  /** Get error for a specific field */
  getError: (field: keyof T) => string | undefined;
}

/**
 * Form validation hook using Zod schemas.
 * 
 * @param schema - Zod schema to validate against
 * @returns Validation state and methods
 */
export function useFormValidation<T>(
  schema: ZodSchema
): UseFormValidationReturn<T> {
  const [errors, setErrors] = useState<FieldErrors>({});

  // Validate all data
  const validate = useCallback(
    (data: unknown): ValidationResult<T> => {
      const result = zodValidate(schema, data);
      
      if (result.success) {
        setErrors({});
        return { success: true, data: result.data as T };
      } else {
        setErrors(result.errors);
        return { success: false, errors: result.errors };
      }
    },
    [schema]
  );

  // Validate a single field (for real-time validation)
  const validateField = useCallback(
    (field: keyof T, value: unknown): string | undefined => {
      const error = zodValidateField(schema, field, value);
      
      setErrors((prev: FieldErrors) => ({
        ...prev,
        [field]: error,
      }));
      
      return error;
    },
    [schema]
  );

  // Clear a single field error
  const clearError = useCallback((field: keyof T) => {
    setErrors((prev: FieldErrors) => {
      const next = { ...prev };
      delete next[field as string];
      return next;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Set a single field error
  const setFieldError = useCallback(
    (field: keyof T, message: string) => {
      setErrors((prev: FieldErrors) => ({
        ...prev,
        [field]: message,
      }));
    },
    []
  );

  // Get error for a specific field
  const getError = useCallback(
    (field: keyof T): string | undefined => {
      return errors[field as string];
    },
    [errors]
  );

  // Check if there are any errors
  const hasErrors = useMemo(
    () => Object.values(errors).some((error) => error !== undefined),
    [errors]
  );

  return {
    errors,
    validate,
    validateField,
    clearError,
    clearAllErrors,
    setErrors,
    setFieldError,
    hasErrors,
    getError,
  };
}
