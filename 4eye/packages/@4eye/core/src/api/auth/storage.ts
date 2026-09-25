/**
 * Token Storage
 * 
 * Client-side token management for authentication.
 * 
 * @module core/api/auth
 */

const TOKEN_KEY = '4eye_access_token';

export const tokenStorage = {
  /**
   * Store access token
   */
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },

  /**
   * Get stored access token
   */
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },

  /**
   * Remove stored access token
   */
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
};

/**
 * Check if JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp;
  } catch {
    return true;
  }
}
