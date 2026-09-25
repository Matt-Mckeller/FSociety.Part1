/**
 * @expanse/auth — Authentication system
 * 
 * Provides AuthProvider, session management, and authentication hooks.
 */

// Session providers (platform-specific)
export { WebSessionProvider } from './session/WebSessionProvider';
export { MobileSessionProvider } from './session/MobileSessionProvider';
export { useSession } from './session/SessionContext';
export type { SessionContextValue } from './session/SessionContext';

// Context and hooks
export { AuthProvider, useAuth, useHasRole } from './context/AuthProvider';

// Components
export { 
  LoginForm, 
  SignupForm, 
  ForgotPasswordForm, 
  ResetPasswordForm,
  GoogleSignInButton,
  AppleSignInButton,
  SocialAuthDivider,
} from './components';
export type { 
  LoginFormProps,
  LoginStep,
  SignupFormProps, 
  ForgotPasswordFormProps, 
  ResetPasswordFormProps,
  GoogleSignInButtonProps,
  AppleSignInButtonProps,
  SocialAuthDividerProps,
} from './components';

// Hooks
export { useCheckAuthMethod } from './hooks/useCheckAuthMethod';
export type { AuthMethod, AuthMethodResult } from './hooks/useCheckAuthMethod';
export { useFormValidation } from './hooks/useFormValidation';
export { useAuthMutations } from './hooks/useAuthMutations';
export { saveLastLogin, getLastLogin, clearLastLogin } from './hooks/useLastLogin';
export type { LastLogin } from './hooks/useLastLogin';

// Storage utilities
export { tokenStorage, isTokenExpired, decodeToken } from './storage/storage';

// GraphQL operations
export { 
  LOGIN_MUTATION, 
  SIGNUP_MUTATION, 
  ME_QUERY, 
  LOGOUT_MUTATION, 
  REFRESH_TOKEN_MUTATION,
  OAUTH_LOGIN_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  RESET_PASSWORD_MUTATION,
} from './graphql/graphql';

// Types
export type { User, AuthState, AuthContextType, LoginInput, SignupInput, OAuthLoginInput, OAuthProvider } from './types/types';
