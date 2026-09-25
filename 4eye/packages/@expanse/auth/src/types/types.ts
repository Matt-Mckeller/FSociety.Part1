/**
 * Auth Types
 *
 * Context types specific to @expanse/auth.
 * Input types are re-exported from @expanse/validation for backwards compatibility.
 * User type is re-exported from @expanse/user for backwards compatibility.
 */

// Re-export input types from validation package (single source of truth)
export type {
  LoginInput,
  SignupInput,
  OAuthLoginInput,
  OAuthProvider,
  ForgotPasswordInput,
  ResetPasswordInput,
} from "@expanse/validation";

// Re-export User from @expanse/user (single source of truth)
export type { User, UserRole, ReadingLevel } from "@expanse/user";
import type { User } from "@expanse/user";

export interface AuthPayload {
  accessToken: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Import the validation types for use in AuthContextType
import type { LoginInput, SignupInput, OAuthLoginInput } from "@expanse/validation";

export interface AuthContextType extends AuthState {
  login: (input: LoginInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  oauthLogin: (input: OAuthLoginInput) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
