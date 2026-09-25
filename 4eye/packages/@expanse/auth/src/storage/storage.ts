// Secure token storage utilities
// In production, consider using httpOnly cookies instead

const TOKEN_KEY = '4eye_access_token';

export const tokenStorage = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if token exists without parsing
  hasToken: (): boolean => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(TOKEN_KEY);
  },
};

// Parse JWT payload (client-side only, don't trust for auth decisions)
export const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

// Check if token is expired (client-side check only)
export const isTokenExpired = (token: string): boolean => {
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  
  // Add 30 second buffer
  return Date.now() >= (payload.exp * 1000) - 30000;
};

// Alias for parseJwtPayload - decode JWT token to get payload
export const decodeToken = parseJwtPayload;
