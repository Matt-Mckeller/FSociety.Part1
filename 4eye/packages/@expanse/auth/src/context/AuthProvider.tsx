'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { AuthContextType, AuthState, User } from '../types/types';
import type { LoginInput, SignupInput, OAuthLoginInput } from '@expanse/validation';
import { useSession } from '../session/SessionContext';
import { LOGIN_MUTATION, SIGNUP_MUTATION, ME_QUERY, LOGOUT_MUTATION, OAUTH_LOGIN_MUTATION } from '../graphql/graphql';

const initialState: AuthState = {
  user: null,
  accessToken: null, // Deprecated: Will be removed in next version
  isLoading: true,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider - User state and authentication operations
 * 
 * Uses SessionProvider internally for platform-specific token management.
 * This provider is shared across Web and Mobile platforms.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const session = useSession();

  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [oauthLoginMutation] = useMutation(OAUTH_LOGIN_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const [fetchMe] = useLazyQuery<{ me: User }>(ME_QUERY, {
    fetchPolicy: 'network-only',
  });

  // Fetch user when session becomes authenticated
  useEffect(() => {
    if (session.isAuthenticated && !user) {
      fetchMe().then(({ data }) => {
        if (data?.me) {
          setUser(data.me);
        }
      }).catch((error) => {
        console.error('Failed to fetch user:', error);
      });
    } else if (!session.isAuthenticated) {
      setUser(null);
    }
  }, [session.isAuthenticated, user, fetchMe]);

  const login = useCallback(async (input: LoginInput) => {
    const { data } = await loginMutation({
      variables: { input },
    });

    if (data?.login) {
      // Notify session layer (web sets cookies, mobile stores tokens)
      session.onLoginResponse(data.login);
      setUser(data.login.user);
    }
  }, [loginMutation, session]);

  const signup = useCallback(async (input: SignupInput) => {
    const { data } = await signupMutation({
      variables: { input },
    });

    if (data?.signup) {
      // Notify session layer (web sets cookies, mobile stores tokens)
      session.onLoginResponse(data.signup);
      setUser(data.signup.user);
    }
  }, [signupMutation, session]);

  const oauthLogin = useCallback(async (input: OAuthLoginInput) => {
    const { data } = await oauthLoginMutation({
      variables: { input },
    });

    if (data?.oauthLogin) {
      // Notify session layer (web sets cookies, mobile stores tokens)
      session.onLoginResponse(data.oauthLogin);
      setUser(data.oauthLogin.user);
    }
  }, [oauthLoginMutation, session]);

  const logout = useCallback(async () => {
    // Call server-side logout (clears cookies on web)
    await logoutMutation().catch(() => {});
    
    // Clear session (web state update, mobile clears storage)
    session.onLogout();
    setUser(null);
  }, [logoutMutation, session]);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await fetchMe();
      if (data?.me) {
        setUser(data.me);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [fetchMe]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    accessToken: null, // Deprecated: Tokens are httpOnly cookies
    isLoading: session.isLoading,
    isAuthenticated: session.isAuthenticated && !!user,
    login,
    signup,
    oauthLogin,
    logout,
    refreshUser,
  }), [user, session.isLoading, session.isAuthenticated, login, signup, oauthLogin, logout, refreshUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook for checking if user has specific role
export function useHasRole(requiredRole: 'MEMBER' | 'ADMIN'): boolean {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) return false;
  
  if (requiredRole === 'MEMBER') return true;
  return user.role === 'ADMIN';
}
