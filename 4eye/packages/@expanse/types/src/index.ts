/**
 * @expanse/types
 *
 * Convenience re-exports of common types from @expanse packages.
 * Import types from here for simpler imports in consuming apps.
 *
 * @example
 * // Instead of:
 * import type { User } from '@expanse/user';
 * import type { ExpanseTheme, ThemeMode } from '@expanse/theme';
 * import type { LoginInput } from '@expanse/validation';
 *
 * // You can use:
 * import type { User, ExpanseTheme, ThemeMode, LoginInput } from '@expanse/types';
 */

// User types
export type { User, UserSummary, UserRole, ReadingLevel } from "@expanse/user";

// Theme types
export type {
  ExpanseTheme,
  ThemeMode,
  InitialThemeMode,
  ThemeContextProps,
  ThemeProviderProps,
} from "@expanse/theme";
export { EXPANSE_THEMES } from "@expanse/theme";

// Auth types
export type { AuthPayload, AuthState, AuthContextType } from "@expanse/auth";

// Validation/Input types
export type {
  LoginInput,
  SignupInput,
  OAuthLoginInput,
  OAuthProvider,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "@expanse/validation";
