/**
 * 4eye Onboarding Types
 * @description Types for the onboarding flow including roles, steps, and profiles
 */

export type UserRole =
  | 'student'
  | 'professional_teacher'
  | 'independent_learner'
  | 'parent_guardian'
  | 'school_administrator';

export type OnboardingStep =
  | 'auth_method'
  | 'credentials'
  | 'age_verification'
  | 'parental_consent'
  | 'role_selection'
  | 'two_factor_setup'
  | 'complete';

export type AuthProvider = 'google' | 'microsoft' | 'apple' | 'github';

export interface OnboardingProfile {
  email: string;
  fullName?: string;
  dateOfBirth?: Date;
  isMinor: boolean;
  roles: UserRole[];
  authProvider: AuthProvider | 'email';
  parentEmail?: string;
  twoFactorEnabled: boolean;
}

export interface RoleConfig {
  id: UserRole;
  title: string;
  description: string;
  icon: string;
  features: string[];
  disabled?: boolean;
  comingSoon?: boolean;
}

export const ROLE_CONFIGS: RoleConfig[] = [
  {
    id: 'student',
    title: 'Student',
    description: 'Learning and studying on the platform',
    icon: '📚',
    features: ['Courses', 'Quizzes', 'Progress tracking', 'Achievements'],
  },
  {
    id: 'professional_teacher',
    title: 'Professional Teacher',
    description: 'Teaching or tutoring in a professional capacity',
    icon: '👩‍🏫',
    features: ['Content creation', 'Student management', 'Analytics'],
  },
  {
    id: 'independent_learner',
    title: 'Independent Learner',
    description: 'Self-directed learning for personal growth',
    icon: '🎯',
    features: ['Personalized paths', 'Goal setting', 'Self-paced content'],
  },
  {
    id: 'parent_guardian',
    title: 'Parent/Guardian',
    description: "Supervising a child's learning journey",
    icon: '👨‍👩‍👧',
    features: ['Child dashboard', 'Progress reports', 'Parental controls'],
  },
  {
    id: 'school_administrator',
    title: 'School Administrator',
    description: 'Managing institution accounts and users',
    icon: '🏫',
    features: ['Bulk management', 'Compliance reports', 'Institution settings'],
    disabled: true,
    comingSoon: true,
  },
]

export interface SocialAuthButtonProps {
  provider: AuthProvider;
  onClick?: (provider: AuthProvider) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export interface SocialAuthButtonsProps {
  providers?: AuthProvider[];
  onSuccess?: (provider: AuthProvider, token: string) => void;
  onError?: (provider: AuthProvider, error: Error) => void;
  onProviderClick?: (provider: AuthProvider) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  showDivider?: boolean;
  dividerText?: string;
}

export interface RoleCardProps {
  role: RoleConfig;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface RoleSelectorProps {
  selectedRoles: UserRole[];
  onChange: (roles: UserRole[]) => void;
  disabledRoles?: UserRole[];
  showExplanation?: boolean;
  error?: string;
}

export interface AgeGateProps {
  onVerified: (isMinor: boolean, dob: Date) => void;
  minAge?: number;
  showCOPPANotice?: boolean;
  error?: string;
}

export interface TwoFactorSetupProps {
  email: string;
  onComplete: () => void;
  onResendCode?: () => void;
  maxAttempts?: number;
  codeSent?: boolean;
  loading?: boolean;
  error?: string;
}
