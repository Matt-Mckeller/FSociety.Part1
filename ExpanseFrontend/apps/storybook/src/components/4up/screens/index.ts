// Screen-level components
export * from './AIGuidedEditorV6';
export { AIGuidedEditorV7 } from './AIGuidedEditorV7';
export type {
  AIGuidedEditorV7Props,
  V7ShellId,
  FeedbackMode,
  EditorProfile,
} from './AIGuidedEditorV7';

// New feedback screen variations (do not star-export — avoids clashing with V6 helpers)
export {
  ScoreOverviewScreen,
  SectionExplorerScreen,
  ActionFirstScreen,
  SAMPLE_FEEDBACK,
  HIGH_SCORE_FEEDBACK,
  LOW_SCORE_FEEDBACK,
  PARTIAL_FEEDBACK,
  feedbackColors,
  ScoreRing,
  FeedbackHeader,
  StrengthsList,
  TipsList,
  EmptyAnalyzing,
} from './FeedbackScreens';
export type {
  ContentFeedback,
  FeedbackScreenProps,
  FeedbackScreenStatus,
  ImprovementTip,
} from './FeedbackScreens';
