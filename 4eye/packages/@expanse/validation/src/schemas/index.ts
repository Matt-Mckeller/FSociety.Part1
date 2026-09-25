/**
 * Validation Schemas
 * 
 * Re-export all schemas from domain modules.
 */

// Common primitives
export {
  emailSchema,
  nameSchema,
  loginPasswordSchema,
  strongPasswordSchema,
  tokenSchema,
  uuidSchema,
  PASSWORD_REQUIREMENTS,
} from './common';

// Auth schemas
export {
  // Schemas
  LoginSchema,
  SignupSchema,
  OAuthLoginSchema,
  OAuthProviderSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ResetPasswordFormSchema,
  RefreshTokenSchema,
  EmailStepSchema,
  // Types (inferred from schemas)
  type LoginInput,
  type SignupInput,
  type OAuthLoginInput,
  type OAuthProvider,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type ResetPasswordFormInput,
  type RefreshTokenInput,
  type EmailStepInput,
} from './auth';
