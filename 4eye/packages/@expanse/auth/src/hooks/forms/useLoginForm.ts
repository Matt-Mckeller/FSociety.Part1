/**
 * useLoginForm Hook
 * 
 * Manages multi-step login form state using useReducer pattern.
 * Handles email validation → auth method check → password/SSO flow.
 * 
 * @example
 * const form = useLoginForm({ onSuccess, redirectTo });
 * 
 * // Step 1: Email
 * <EmailInput value={form.state.email} onChange={form.updateEmail} />
 * <Button onClick={form.continueToPassword}>Continue</Button>
 * 
 * // Step 2: Password
 * <PasswordInput value={form.state.password} onChange={form.updatePassword} />
 * <Button onClick={form.submitPassword}>Sign In</Button>
 */

'use client';

import { useReducer, useCallback, useEffect } from 'react';
import { EmailStepSchema, LoginSchema, type LoginInput } from '@expanse/validation';
import { useFormValidation } from '../useFormValidation';
import { useAuthMutations } from '../useAuthMutations';
import { useCheckAuthMethod, type AuthMethodResult } from '../useCheckAuthMethod';
import { getLastLogin, saveLastLogin, clearLastLogin, type LastLogin } from '../useLastLogin';

// ============================================================================
// Types
// ============================================================================

export type LoginStep = 'email' | 'password' | 'sso-redirect';

export interface LoginFormState {
  step: LoginStep;
  email: string;
  password: string;
  authMethodResult: AuthMethodResult | null;
  isReturningUser: boolean;
  lastLogin: LastLogin | null;
  oauthLoading: 'google' | 'apple' | null;
  slideDirection: 'left' | 'right';
}

type LoginFormAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_RETURNING_USER'; payload: { email: string; lastLogin: LastLogin } }
  | { type: 'CLEAR_RETURNING_USER' }
  | { type: 'CONTINUE_TO_PASSWORD'; payload: AuthMethodResult }
  | { type: 'SSO_REDIRECT' }
  | { type: 'BACK_TO_EMAIL' }
  | { type: 'OAUTH_START'; payload: 'google' | 'apple' }
  | { type: 'OAUTH_END' }
  | { type: 'RESET' };

export interface UseLoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export interface UseLoginFormReturn {
  // State
  state: LoginFormState;
  
  // Validation errors (from Zod)
  emailErrors: ReturnType<typeof useFormValidation<{ email: string }>>;
  passwordErrors: ReturnType<typeof useFormValidation<LoginInput>>;
  
  // Mutation state
  error: Error | null;
  isSubmitting: boolean;
  isCheckingAuth: boolean;
  
  // Computed
  isLoading: boolean;
  showSocialHint: boolean;
  highlightedProvider: 'google' | 'apple' | null;
  
  // Actions
  updateEmail: (value: string) => void;
  updatePassword: (value: string) => void;
  continueToPassword: () => Promise<void>;
  submitPassword: () => Promise<void>;
  back: () => void;
  notYou: () => void;
  reset: () => void;
  
  // OAuth handlers
  handleGoogleSuccess: (idToken: string) => Promise<void>;
  handleAppleSuccess: (idToken: string, nonce: string) => Promise<void>;
  handleOAuthError: (error: Error) => void;
}

// ============================================================================
// Reducer
// ============================================================================

const initialState: LoginFormState = {
  step: 'email',
  email: '',
  password: '',
  authMethodResult: null,
  isReturningUser: false,
  lastLogin: null,
  oauthLoading: null,
  slideDirection: 'left',
};

function loginFormReducer(state: LoginFormState, action: LoginFormAction): LoginFormState {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
        // Clear returning user status when email changes
        isReturningUser: false,
      };
      
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.payload,
      };
      
    case 'SET_RETURNING_USER':
      return {
        ...state,
        email: action.payload.email,
        lastLogin: action.payload.lastLogin,
        isReturningUser: true,
      };
      
    case 'CLEAR_RETURNING_USER':
      return {
        ...state,
        email: '',
        lastLogin: null,
        isReturningUser: false,
      };
      
    case 'CONTINUE_TO_PASSWORD':
      return {
        ...state,
        step: 'password',
        authMethodResult: action.payload,
        slideDirection: 'left',
      };
      
    case 'SSO_REDIRECT':
      return {
        ...state,
        step: 'sso-redirect',
        slideDirection: 'left',
      };
      
    case 'BACK_TO_EMAIL':
      return {
        ...state,
        step: 'email',
        password: '',
        authMethodResult: null,
        slideDirection: 'right',
      };
      
    case 'OAUTH_START':
      return {
        ...state,
        oauthLoading: action.payload,
      };
      
    case 'OAUTH_END':
      return {
        ...state,
        oauthLoading: null,
      };
      
    case 'RESET':
      return initialState;
      
    default:
      return state;
  }
}

// ============================================================================
// Hook
// ============================================================================

export function useLoginForm({
  onSuccess,
  redirectTo,
}: UseLoginFormProps = {}): UseLoginFormReturn {
  const [state, dispatch] = useReducer(loginFormReducer, initialState);
  
  // Validation hooks (using Zod schemas)
  const emailValidation = useFormValidation<{ email: string }>(EmailStepSchema);
  const passwordValidation = useFormValidation<LoginInput>(LoginSchema);
  
  // Auth mutations
  const { login, oauthLogin, loading: authLoading, error, clearError } = useAuthMutations();
  const { checkAuthMethod, loading: checkingAuth } = useCheckAuthMethod();
  
  // Initialize returning user on mount
  useEffect(() => {
    const lastLogin = getLastLogin();
    if (lastLogin) {
      dispatch({ 
        type: 'SET_RETURNING_USER', 
        payload: { email: lastLogin.email, lastLogin } 
      });
    }
  }, []);
  
  // ============================================================================
  // Actions
  // ============================================================================
  
  const updateEmail = useCallback((value: string) => {
    dispatch({ type: 'SET_EMAIL', payload: value });
    emailValidation.clearError('email');
    clearError();
  }, [emailValidation, clearError]);
  
  const updatePassword = useCallback((value: string) => {
    dispatch({ type: 'SET_PASSWORD', payload: value });
    passwordValidation.clearError('password');
    clearError();
  }, [passwordValidation, clearError]);
  
  const continueToPassword = useCallback(async () => {
    clearError();
    
    // Validate email with Zod schema
    const result = emailValidation.validate({ email: state.email });
    if (!result.success) return;
    
    // Check auth method (SSO, password, etc.)
    const authResult = await checkAuthMethod(result.data.email);
    
    // Handle SSO redirect
    if (authResult.method === 'SSO_REDIRECT' && authResult.redirectUrl) {
      dispatch({ type: 'SSO_REDIRECT' });
      window.location.href = authResult.redirectUrl;
      return;
    }
    
    // Continue to password step
    dispatch({ type: 'CONTINUE_TO_PASSWORD', payload: authResult });
  }, [state.email, emailValidation, checkAuthMethod, clearError]);
  
  const submitPassword = useCallback(async () => {
    clearError();
    
    // Validate full login input with Zod schema
    const result = passwordValidation.validate({ 
      email: state.email, 
      password: state.password 
    });
    if (!result.success) return;
    
    try {
      const user = await login(result.data);
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
  }, [state.email, state.password, passwordValidation, login, onSuccess, redirectTo, clearError]);
  
  const back = useCallback(() => {
    dispatch({ type: 'BACK_TO_EMAIL' });
    passwordValidation.clearAllErrors();
    clearError();
  }, [passwordValidation, clearError]);
  
  const notYou = useCallback(() => {
    clearLastLogin();
    dispatch({ type: 'CLEAR_RETURNING_USER' });
    emailValidation.clearAllErrors();
    clearError();
  }, [emailValidation, clearError]);
  
  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    emailValidation.clearAllErrors();
    passwordValidation.clearAllErrors();
    clearError();
  }, [emailValidation, passwordValidation, clearError]);
  
  // ============================================================================
  // OAuth Handlers
  // ============================================================================
  
  const handleGoogleSuccess = useCallback(async (idToken: string) => {
    dispatch({ type: 'OAUTH_START', payload: 'google' });
    clearError();
    
    try {
      const user = await oauthLogin({ provider: 'GOOGLE', idToken });
      if (user) {
        saveLastLogin(state.email || 'google-user', 'google');
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch {
      // Error handled by useAuthMutations
    } finally {
      dispatch({ type: 'OAUTH_END' });
    }
  }, [state.email, oauthLogin, onSuccess, redirectTo, clearError]);
  
  const handleAppleSuccess = useCallback(async (idToken: string, nonce: string) => {
    dispatch({ type: 'OAUTH_START', payload: 'apple' });
    clearError();
    
    try {
      const user = await oauthLogin({ provider: 'APPLE', idToken, nonce });
      if (user) {
        saveLastLogin(state.email || 'apple-user', 'apple');
        onSuccess?.();
        if (redirectTo) {
          window.location.href = redirectTo;
        }
      }
    } catch {
      // Error handled by useAuthMutations
    } finally {
      dispatch({ type: 'OAUTH_END' });
    }
  }, [state.email, oauthLogin, onSuccess, redirectTo, clearError]);
  
  const handleOAuthError = useCallback((oauthError: Error) => {
    emailValidation.setFieldError('email', oauthError.message);
    dispatch({ type: 'OAUTH_END' });
  }, [emailValidation]);
  
  // ============================================================================
  // Computed Values
  // ============================================================================
  
  const isLoading = authLoading || state.oauthLoading !== null || checkingAuth;
  
  const showSocialHint = state.isReturningUser && 
    state.lastLogin !== null && 
    (state.lastLogin.method === 'google' || state.lastLogin.method === 'apple');
    
  const highlightedProvider = showSocialHint && state.lastLogin 
    ? (state.lastLogin.method as 'google' | 'apple') 
    : null;
  
  return {
    state,
    emailErrors: emailValidation,
    passwordErrors: passwordValidation,
    error,
    isSubmitting: authLoading,
    isCheckingAuth: checkingAuth,
    isLoading,
    showSocialHint,
    highlightedProvider,
    updateEmail,
    updatePassword,
    continueToPassword,
    submitPassword,
    back,
    notYou,
    reset,
    handleGoogleSuccess,
    handleAppleSuccess,
    handleOAuthError,
  };
}
