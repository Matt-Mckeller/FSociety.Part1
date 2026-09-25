/**
 * useResetPasswordForm Hook
 * 
 * Manages reset password form state with Zod validation.
 * Handles password + confirm password matching.
 * 
 * @example
 * const form = useResetPasswordForm({ token, onSuccess });
 * 
 * <PasswordInput value={form.formData.password} onChange={(v) => form.updateField('password', v)} />
 * <PasswordInput value={form.formData.confirmPassword} onChange={(v) => form.updateField('confirmPassword', v)} />
 * <Button onClick={form.submit}>Reset Password</Button>
 */

'use client';

import { useState, useCallback } from 'react';
import { ResetPasswordFormSchema, type ResetPasswordFormInput } from '@expanse/validation';
import { useFormValidation } from '../useFormValidation';
import { useAuthMutations } from '../useAuthMutations';

// ============================================================================
// Types
// ============================================================================

export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export interface UseResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

export interface UseResetPasswordFormReturn {
  // Form data
  formData: ResetPasswordFormData;
  
  // State
  submitted: boolean;
  
  // Validation
  validation: ReturnType<typeof useFormValidation<ResetPasswordFormInput>>;
  
  // Mutation state
  error: Error | null;
  isSubmitting: boolean;
  
  // Actions
  updateField: <K extends keyof ResetPasswordFormData>(field: K, value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

// ============================================================================
// Default Values
// ============================================================================

const defaultFormData: ResetPasswordFormData = {
  password: '',
  confirmPassword: '',
};

// ============================================================================
// Hook
// ============================================================================

export function useResetPasswordForm({
  token,
  onSuccess,
}: UseResetPasswordFormProps): UseResetPasswordFormReturn {
  const [formData, setFormData] = useState<ResetPasswordFormData>(defaultFormData);
  const [submitted, setSubmitted] = useState(false);
  
  // Validation hook (using Zod schema - includes confirmPassword matching)
  const validation = useFormValidation<ResetPasswordFormInput>(ResetPasswordFormSchema);
  
  // Auth mutations
  const { resetPassword, loading, error, clearError } = useAuthMutations();
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  const updateField = useCallback(<K extends keyof ResetPasswordFormData>(
    field: K,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validation.clearError(field);
    clearError();
  }, [validation, clearError]);
  
  const submit = useCallback(async () => {
    clearError();
    
    // Validate with Zod schema (includes password match validation)
    const result = validation.validate({
      token,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    if (!result.success) return;
    
    try {
      await resetPassword({ token, password: result.data.password });
      setSubmitted(true);
      onSuccess?.();
    } catch {
      // Error handled by useAuthMutations
    }
  }, [token, formData, validation, resetPassword, onSuccess, clearError]);
  
  const reset = useCallback(() => {
    setFormData(defaultFormData);
    setSubmitted(false);
    validation.clearAllErrors();
    clearError();
  }, [validation, clearError]);
  
  return {
    formData,
    submitted,
    validation,
    error,
    isSubmitting: loading,
    updateField,
    submit,
    reset,
  };
}
