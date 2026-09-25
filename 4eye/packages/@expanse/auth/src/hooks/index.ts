/**
 * Authentication Hooks
 * 
 * Shared hooks for authentication logic.
 */

// Core hooks
export { useFormValidation } from './useFormValidation';
export type { UseFormValidationReturn } from './useFormValidation';

export { useAuthMutations } from './useAuthMutations';
export type { UseAuthMutationsReturn, AuthUser } from './useAuthMutations';

export { useCheckAuthMethod } from './useCheckAuthMethod';
export type { AuthMethod, AuthMethodResult } from './useCheckAuthMethod';

export { saveLastLogin, getLastLogin, clearLastLogin } from './useLastLogin';
export type { LastLogin } from './useLastLogin';

// Form hooks (extracted form logic)
export * from './forms';
