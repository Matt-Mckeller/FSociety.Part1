/**
 * useForgotPasswordForm Hook
 * 
 * Manages forgot password form state with Zod validation.
 * 
 * @example
 * const form = useForgotPasswordForm({ onSuccess });
 * 
 * <EmailInput value={form.formData.email} onChange={form.updateEmail} />
 * <Button onClick={form.submit}>Send Reset Link</Button>
 */

'use client';

import { useState, useCallback } from 'react';
import { ForgotPasswordSchema, type ForgotPasswordInput } from '@expanse/validation';
import { useFormValidation } from '../useFormValidation';
import { useAuthMutations } from '../useAuthMutations';

// ============================================================================
// Types
// ============================================================================

export interface UseForgotPasswordFormProps {
  onSuccess?: (email: string) => void;
}

export interface UseForgotPasswordFormReturn {
  // Form data
  email: string;
  
  // State
  submitted: boolean;
  
  // Validation
  validation: ReturnType<typeof useFormValidation<ForgotPasswordInput>>;
  
  // Mutation state
  error: Error | null;
  isSubmitting: boolean;
  
  // Actions
  updateEmail: (value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

// ============================================================================
// Hook
// ============================================================================

export function useForgotPasswordForm({
  onSuccess,
}: UseForgotPasswordFormProps = {}): UseForgotPasswordFormReturn {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Validation hook (using Zod schema)
  const validation = useFormValidation<ForgotPasswordInput>(ForgotPasswordSchema);
  
  // Auth mutations
  const { forgotPassword, loading, error, clearError } = useAuthMutations();
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  const updateEmail = useCallback((value: string) => {
    setEmail(value);
    validation.clearError('email');
    clearError();
  }, [validation, clearError]);
  
  const submit = useCallback(async () => {
    clearError();
    
    // Validate with Zod schema
    const result = validation.validate({ email });
    if (!result.success) return;
    
    try {
      await forgotPassword(result.data);
      setSubmitted(true);
      onSuccess?.(result.data.email);
    } catch {
      // Error handled by useAuthMutations
    }
  }, [email, validation, forgotPassword, onSuccess, clearError]);
  
  const reset = useCallback(() => {
    setEmail('');
    setSubmitted(false);
    validation.clearAllErrors();
    clearError();
  }, [validation, clearError]);
  
  return {
    email,
    submitted,
    validation,
    error,
    isSubmitting: loading,
    updateEmail,
    submit,
    reset,
  };
}
