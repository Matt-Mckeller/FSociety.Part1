/**
 * useSignupForm Hook
 * 
 * Manages signup form state with Zod validation.
 * Handles email/password signup and OAuth flows.
 * 
 * @example
 * const form = useSignupForm({ onSuccess, redirectTo });
 * 
 * <NameInput value={form.formData.name} onChange={(v) => form.updateField('name', v)} />
 * <EmailInput value={form.formData.email} onChange={(v) => form.updateField('email', v)} />
 * <PasswordInput value={form.formData.password} onChange={(v) => form.updateField('password', v)} />
 * <Checkbox checked={form.formData.agreedToTerms} onChange={(e) => form.updateField('agreedToTerms', e.target.checked)} />
 * <Button onClick={form.submit}>Create Account</Button>
 */

'use client';

import { useState, useCallback } from 'react';
import { SignupSchema, type SignupInput } from '@expanse/validation';
import { useFormValidation } from '../useFormValidation';
import { useAuthMutations } from '../useAuthMutations';
import { saveLastLogin } from '../useLastLogin';

// ============================================================================
// Types
// ============================================================================

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
}

export interface UseSignupFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export interface UseSignupFormReturn {
  // Form data
  formData: SignupFormData;
  
  // Validation
  validation: ReturnType<typeof useFormValidation<SignupInput>>;
  termsError: string | undefined;
  
  // Mutation state
  error: Error | null;
  isSubmitting: boolean;
  oauthLoading: 'google' | 'apple' | null;
  
  // Computed
  isLoading: boolean;
  
  // Actions
  updateField: <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => void;
  submit: () => Promise<void>;
  reset: () => void;
  
  // OAuth handlers
  handleGoogleSuccess: (idToken: string) => Promise<void>;
  handleAppleSuccess: (idToken: string, nonce: string) => Promise<void>;
  handleOAuthError: (error: Error) => void;
}

// ============================================================================
// Default Values
// ============================================================================

const defaultFormData: SignupFormData = {
  name: '',
  email: '',
  password: '',
  agreedToTerms: false,
};

// ============================================================================
// Hook
// ============================================================================

export function useSignupForm({
  onSuccess,
  redirectTo,
}: UseSignupFormProps = {}): UseSignupFormReturn {
  const [formData, setFormData] = useState<SignupFormData>(defaultFormData);
  const [termsError, setTermsError] = useState<string>();
  const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null);
  
  // Validation hook (using Zod schema)
  const validation = useFormValidation<SignupInput>(SignupSchema);
  
  // Auth mutations
  const { signup, oauthLogin, loading, error, clearError } = useAuthMutations();
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  const updateField = useCallback(<K extends keyof SignupFormData>(
    field: K,
    value: SignupFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear field-specific errors
    if (field === 'agreedToTerms') {
      setTermsError(undefined);
    } else if (field in validation.errors) {
      validation.clearError(field as keyof SignupInput);
    }
    clearError();
  }, [validation, clearError]);
  
  const submit = useCallback(async () => {
    clearError();
    setTermsError(undefined);
    
    // Validate terms checkbox (UI-only validation)
    if (!formData.agreedToTerms) {
      setTermsError('You must agree to the terms and privacy policy');
      return;
    }
    
    // Validate form fields with Zod schema
    const result = validation.validate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    if (!result.success) return;
    
    try {
      const user = await signup(result.data);
      if (user) {
        saveLastLogin(result.data.email, 'password');
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch {
      // Error handled by useAuthMutations
    }
  }, [formData, validation, signup, onSuccess, redirectTo, clearError]);
  
  const reset = useCallback(() => {
    setFormData(defaultFormData);
    setTermsError(undefined);
    validation.clearAllErrors();
    clearError();
  }, [validation, clearError]);
  
  // ============================================================================
  // OAuth Handlers
  // ============================================================================
  
  const handleGoogleSuccess = useCallback(async (idToken: string) => {
    setOauthLoading('google');
    clearError();
    
    try {
      const user = await oauthLogin({ provider: 'GOOGLE', idToken });
      if (user) {
        saveLastLogin(formData.email || 'google-user', 'google');
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch {
      // Error handled by useAuthMutations
    } finally {
      setOauthLoading(null);
    }
  }, [formData.email, oauthLogin, onSuccess, redirectTo, clearError]);
  
  const handleAppleSuccess = useCallback(async (idToken: string, nonce: string) => {
    setOauthLoading('apple');
    clearError();
    
    try {
      const user = await oauthLogin({ provider: 'APPLE', idToken, nonce });
      if (user) {
        saveLastLogin(formData.email || 'apple-user', 'apple');
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch {
      // Error handled by useAuthMutations
    } finally {
      setOauthLoading(null);
    }
  }, [formData.email, oauthLogin, onSuccess, redirectTo, clearError]);
  
  const handleOAuthError = useCallback((oauthError: Error) => {
    validation.setFieldError('email', oauthError.message);
    setOauthLoading(null);
  }, [validation]);
  
  // ============================================================================
  // Computed Values
  // ============================================================================
  
  const isLoading = loading || oauthLoading !== null;
  
  return {
    formData,
    validation,
    termsError,
    error,
    isSubmitting: loading,
    oauthLoading,
    isLoading,
    updateField,
    submit,
    reset,
    handleGoogleSuccess,
    handleAppleSuccess,
    handleOAuthError,
  };
}
