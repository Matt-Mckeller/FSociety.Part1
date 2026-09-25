/**
 * useAuthMutations Hook
 * 
 * Centralized authentication mutations.
 * Handles login, signup, OAuth, password reset, and logout.
 * 
 * This hook extracts all mutation logic from form components,
 * making forms purely presentational and this logic reusable.
 * 
 * @example
 * const { login, signup, oauthLogin, loading, error } = useAuthMutations();
 * 
 * const handleLogin = async () => {
 *   try {
 *     const user = await login({ email, password });
 *     router.push('/dashboard');
 *   } catch (err) {
 *     // Error is also available via the error state
 *   }
 * };
 */

import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  OAUTH_LOGIN_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
  LOGOUT_MUTATION,
} from '../graphql/graphql';
import { useSession } from '../session/SessionContext';
import type {
  LoginInput,
  SignupInput,
  OAuthLoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from '@expanse/validation';

// User type from GraphQL response
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'MEMBER' | 'ADMIN';
  readingLevel?: 'CHILD' | 'STANDARD' | 'ACADEMIC';
  preferredLanguage?: string;
  emailVerifiedAt?: string;
  createdAt: string;
}

export interface UseAuthMutationsReturn {
  /** Login with email/password */
  login: (input: LoginInput) => Promise<AuthUser>;
  
  /** Create new account */
  signup: (input: SignupInput) => Promise<AuthUser>;
  
  /** Login with OAuth provider (Google/Apple) */
  oauthLogin: (input: OAuthLoginInput) => Promise<AuthUser>;
  
  /** Request password reset email */
  forgotPassword: (input: ForgotPasswordInput) => Promise<boolean>;
  
  /** Complete password reset with token */
  resetPassword: (input: ResetPasswordInput) => Promise<boolean>;
  
  /** Logout current session */
  logout: () => Promise<void>;
  
  /** Whether any mutation is in progress */
  loading: boolean;
  
  /** Last error from any mutation */
  error: Error | null;
  
  /** Clear the current error */
  clearError: () => void;
}

/**
 * Authentication mutations hook.
 * Centralizes all auth mutation logic for reuse across components.
 */
export function useAuthMutations(): UseAuthMutationsReturn {
  const { onLoginResponse, onLogout } = useSession();
  const [error, setError] = useState<Error | null>(null);

  // Login mutation
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
  
  // Signup mutation
  const [signupMutation, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION);
  
  // OAuth mutation
  const [oauthMutation, { loading: oauthLoading }] = useMutation(OAUTH_LOGIN_MUTATION);
  
  // Forgot password mutation
  const [forgotPasswordMutation, { loading: forgotPasswordLoading }] = useMutation(FORGOT_PASSWORD_MUTATION);
  
  // Reset password mutation
  const [resetPasswordMutation, { loading: resetPasswordLoading }] = useMutation(RESET_PASSWORD_MUTATION);
  
  // Logout mutation
  const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT_MUTATION);

  // Login with email/password
  const login = useCallback(
    async (input: LoginInput): Promise<AuthUser> => {
      setError(null);
      try {
        const { data } = await loginMutation({
          variables: { input },
        });
        
        if (!data?.login?.user) {
          throw new Error('Login failed: No user data returned');
        }
        
        onLoginResponse({ user: data.login.user });
        return data.login.user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Login failed');
        setError(error);
        throw error;
      }
    },
    [loginMutation, onLoginResponse]
  );

  // Signup
  const signup = useCallback(
    async (input: SignupInput): Promise<AuthUser> => {
      setError(null);
      try {
        const { data } = await signupMutation({
          variables: { input },
        });
        
        if (!data?.signup?.user) {
          throw new Error('Signup failed: No user data returned');
        }
        
        onLoginResponse({ user: data.signup.user });
        return data.signup.user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Signup failed');
        setError(error);
        throw error;
      }
    },
    [signupMutation, onLoginResponse]
  );

  // OAuth login
  const oauthLogin = useCallback(
    async (input: OAuthLoginInput): Promise<AuthUser> => {
      setError(null);
      try {
        const { data } = await oauthMutation({
          variables: { input },
        });
        
        if (!data?.oauthLogin?.user) {
          throw new Error('OAuth login failed: No user data returned');
        }
        
        onLoginResponse({ user: data.oauthLogin.user });
        return data.oauthLogin.user;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('OAuth login failed');
        setError(error);
        throw error;
      }
    },
    [oauthMutation, onLoginResponse]
  );

  // Forgot password
  const forgotPassword = useCallback(
    async (input: ForgotPasswordInput): Promise<boolean> => {
      setError(null);
      try {
        const { data } = await forgotPasswordMutation({
          variables: { input },
        });
        
        // Always return true (backend doesn't reveal if email exists)
        return data?.forgotPassword ?? true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to send reset email');
        setError(error);
        throw error;
      }
    },
    [forgotPasswordMutation]
  );

  // Reset password
  const resetPassword = useCallback(
    async (input: ResetPasswordInput): Promise<boolean> => {
      setError(null);
      try {
        const { data } = await resetPasswordMutation({
          variables: { input },
        });
        
        if (!data?.resetPassword) {
          throw new Error('Password reset failed: Invalid or expired token');
        }
        
        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Password reset failed');
        setError(error);
        throw error;
      }
    },
    [resetPasswordMutation]
  );

  // Logout
  const logout = useCallback(async (): Promise<void> => {
    setError(null);
    try {
      await logoutMutation();
      onLogout();
    } catch (err) {
      // Still logout locally even if server call fails
      onLogout();
      const error = err instanceof Error ? err : new Error('Logout failed');
      setError(error);
      throw error;
    }
  }, [logoutMutation, onLogout]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Combined loading state
  const loading =
    loginLoading ||
    signupLoading ||
    oauthLoading ||
    forgotPasswordLoading ||
    resetPasswordLoading ||
    logoutLoading;

  return {
    login,
    signup,
    oauthLogin,
    forgotPassword,
    resetPassword,
    logout,
    loading,
    error,
    clearError,
  };
}
