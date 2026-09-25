export const feedbackColors = {
  background: '#f8fafc',
  paper: '#ffffff',
  paperHover: '#f1f5f9',
  border: '#e2e8f0',
  primary: '#0f766e',
  primaryHover: '#0d9488',
  primaryLight: '#ccfbf1',
  secondary: '#0369a1',
  secondaryLight: '#e0f2fe',
  success: '#059669',
  successLight: '#d1fae5',
  warning: '#d97706',
  warningLight: '#fef3c7',
  error: '#dc2626',
  errorLight: '#fee2e2',
  info: '#2563eb',
  infoLight: '#dbeafe',
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#94a3b8',
  },
};

export function getScoreColor(score: number): string {
  if (score >= 80) return feedbackColors.success;
  if (score >= 60) return feedbackColors.info;
  if (score >= 40) return feedbackColors.warning;
  return feedbackColors.error;
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs work';
  return 'Weak';
}

export const PRIORITY_COLORS = {
  high: feedbackColors.error,
  medium: feedbackColors.warning,
  low: feedbackColors.info,
} as const;
