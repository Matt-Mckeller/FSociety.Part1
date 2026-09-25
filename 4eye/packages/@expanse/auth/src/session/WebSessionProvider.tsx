import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SessionContext, SessionContextValue } from './SessionContext';
import { User } from '../types/types';
import { ME_QUERY } from '../graphql/graphql';

interface WebSessionProviderProps {
  children: ReactNode;
}

/**
 * Web Session Provider
 * 
 * Uses httpOnly cookies for token storage (XSS protected).
 * Tokens are set by the server and sent automatically with requests.
 * Client cannot access tokens - they're httpOnly.
 */
export function WebSessionProvider({ children }: WebSessionProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount by querying current user
  const [checkAuth] = useLazyQuery<{ me: User }>(ME_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setIsAuthenticated(!!data.me);
      setIsLoading(false);
    },
    onError: () => {
      setIsAuthenticated(false);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuth();
  }, [checkAuth]);

  const onLoginResponse = useCallback((response: { user: User }) => {
    // Server already set httpOnly cookies
    // Just update our authentication state
    setIsAuthenticated(true);
  }, []);

  const onLogout = useCallback(() => {
    // Server will clear cookies via logout mutation
    // Update local state
    setIsAuthenticated(false);
  }, []);

  const getAuthHeaders = useCallback(() => {
    // Web doesn't need auth headers - cookies sent automatically
    // Return CSRF token header if needed (future enhancement)
    return {};
  }, []);

  const value: SessionContextValue = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      onLoginResponse,
      onLogout,
      getAuthHeaders,
    }),
    [isAuthenticated, isLoading, onLoginResponse, onLogout, getAuthHeaders]
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
