'use client';

import { useCallback, useState } from 'react';

export type AuthMethod = 'PASSWORD' | 'SOCIAL' | 'SSO_REDIRECT';

export interface AuthMethodResult {
  method: AuthMethod;
  redirectUrl?: string;
  provider?: string;
  hint?: string;
}

interface UseCheckAuthMethodReturn {
  checkAuthMethod: (email: string) => Promise<AuthMethodResult>;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to check which authentication method should be used for a given email.
 * 
 * Resolution order (backend, when implemented):
 * 1. Domain in sso_domains table → SSO_REDIRECT + redirectUrl
 * 2. User exists with OAuth provider → SOCIAL + provider + hint  
 * 3. User exists with password → PASSWORD
 * 4. Unknown email → PASSWORD (no enumeration leak)
 * 
 * Currently stubbed to always return PASSWORD.
 * TODO: Wire to real GraphQL query when backend implements checkAuthMethod
 */
export function useCheckAuthMethod(): UseCheckAuthMethodReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAuthMethod = useCallback(async (email: string): Promise<AuthMethodResult> => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with real GraphQL query:
      // const { data } = await client.query({
      //   query: CHECK_AUTH_METHOD_QUERY,
      //   variables: { email: email.trim().toLowerCase() },
      // });
      // return data.checkAuthMethod;

      // Stub: simulate a brief network delay, always return PASSWORD
      await new Promise((resolve) => setTimeout(resolve, 300));

      return { method: 'PASSWORD' };
    } catch (err) {
      const message = (err as Error).message || 'Failed to check auth method';
      setError(message);
      // Default to password on error
      return { method: 'PASSWORD' };
    } finally {
      setLoading(false);
    }
  }, []);

  return { checkAuthMethod, loading, error };
}
