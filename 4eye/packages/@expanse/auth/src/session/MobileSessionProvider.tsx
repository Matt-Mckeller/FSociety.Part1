import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { SessionContext, SessionContextValue } from './SessionContext';
import { User } from '../types/types';

interface MobileSessionProviderProps {
  children: ReactNode;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * Mobile Session Provider (React Native)
 * 
 * Uses SecureStore/Keychain for encrypted token storage.
 * Tokens are returned in GraphQL responses and managed by the app.
 * Sends tokens in Authorization header.
 * 
 * @note This is a stub implementation. Actual implementation requires:
 * - expo-secure-store or @react-native-async-storage/async-storage
 * - Platform-specific secure storage (Keychain/Keystore)
 */
export function MobileSessionProvider({ children }: MobileSessionProviderProps) {
  const [tokens, setTokens] = useState<TokenPair | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tokens from secure storage on mount
  useEffect(() => {
    loadTokensFromStorage();
  }, []);

  async function loadTokensFromStorage() {
    try {
      // TODO: Implement actual secure storage loading
      // const stored = await SecureStore.getItemAsync('auth_tokens');
      // if (stored) {
      //   const parsed = JSON.parse(stored) as TokenPair;
      //   setTokens(parsed);
      // }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load tokens:', error);
      setIsLoading(false);
    }
  }

  const onLoginResponse = useCallback(async (response: { user: User; accessToken?: string; refreshToken?: string }) => {
    if (!response.accessToken || !response.refreshToken) {
      console.warn('Mobile login response missing tokens');
      return;
    }

    const tokenPair: TokenPair = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    };

    try {
      // TODO: Implement actual secure storage saving
      // await SecureStore.setItemAsync('auth_tokens', JSON.stringify(tokenPair));
      setTokens(tokenPair);
    } catch (error) {
      console.error('Failed to save tokens:', error);
    }
  }, []);

  const onLogout = useCallback(async () => {
    try {
      // TODO: Implement actual secure storage clearing
      // await SecureStore.deleteItemAsync('auth_tokens');
      setTokens(null);
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    if (!tokens?.accessToken) {
      return {};
    }
    return {
      Authorization: `Bearer ${tokens.accessToken}`,
    };
  }, [tokens]);

  const value: SessionContextValue = useMemo(
    () => ({
      isAuthenticated: !!tokens,
      isLoading,
      onLoginResponse,
      onLogout,
      getAuthHeaders,
    }),
    [tokens, isLoading, onLoginResponse, onLogout, getAuthHeaders]
  );

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}
