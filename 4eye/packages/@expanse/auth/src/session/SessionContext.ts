import { createContext, useContext } from 'react';
import { User } from '../types/types';

/**
 * Session interface - abstracts platform-specific token storage
 * Web: httpOnly cookies (server-managed)
 * Mobile: SecureStore (app-managed)
 */
export interface SessionContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  
  /**
   * Called after successful login to update session state
   * Web: Server already set cookies, just update state
   * Mobile: Store tokens from response in SecureStore
   */
  onLoginResponse: (response: { user: User }) => void;
  
  /**
   * Called on logout to clear session
   * Web: Server will clear cookies via logout mutation
   * Mobile: Clear SecureStore
   */
  onLogout: () => void;
  
  /**
   * Get auth headers for GraphQL requests
   * Web: Returns empty object (cookies sent automatically)
   * Mobile: Returns Authorization header with bearer token
   */
  getAuthHeaders: () => Record<string, string>;
}

export const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
