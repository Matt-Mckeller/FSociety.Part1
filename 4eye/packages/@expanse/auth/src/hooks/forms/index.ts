/**
 * Auth Form Hooks
 * 
 * Extracted form logic following the reducer/state pattern.
 * Components become thin presentational shells that use these hooks.
 */

export { useLoginForm } from './useLoginForm';
export type {
  LoginStep,
  LoginFormState,
  UseLoginFormProps,
  UseLoginFormReturn,
} from './useLoginForm';

export { useSignupForm } from './useSignupForm';
export type {
  SignupFormData,
  UseSignupFormProps,
  UseSignupFormReturn,
} from './useSignupForm';

export { useForgotPasswordForm } from './useForgotPasswordForm';
export type {
  UseForgotPasswordFormProps,
  UseForgotPasswordFormReturn,
} from './useForgotPasswordForm';

export { useResetPasswordForm } from './useResetPasswordForm';
export type {
  ResetPasswordFormData,
  UseResetPasswordFormProps,
  UseResetPasswordFormReturn,
} from './useResetPasswordForm';
