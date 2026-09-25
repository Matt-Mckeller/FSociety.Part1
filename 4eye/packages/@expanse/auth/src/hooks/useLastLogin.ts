'use client';

const STORAGE_KEY_EMAIL = '4eye_last_email';
const STORAGE_KEY_METHOD = '4eye_last_method';

export interface LastLogin {
  email: string;
  method: string; // 'password', 'google', 'apple', 'edlink', etc.
}

/**
 * Store last successful login info in localStorage
 * Used to pre-fill email and show returning-user hints
 */
export function saveLastLogin(email: string, method: string): void {
  try {
    localStorage.setItem(STORAGE_KEY_EMAIL, email);
    localStorage.setItem(STORAGE_KEY_METHOD, method);
  } catch {
    // localStorage not available (SSR, private browsing, etc.)
  }
}

/**
 * Retrieve last login info from localStorage
 */
export function getLastLogin(): LastLogin | null {
  try {
    const email = localStorage.getItem(STORAGE_KEY_EMAIL);
    const method = localStorage.getItem(STORAGE_KEY_METHOD);
    if (email && method) {
      return { email, method };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Clear last login info (when user clicks "Not you?")
 */
export function clearLastLogin(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_EMAIL);
    localStorage.removeItem(STORAGE_KEY_METHOD);
  } catch {
    // localStorage not available
  }
}
