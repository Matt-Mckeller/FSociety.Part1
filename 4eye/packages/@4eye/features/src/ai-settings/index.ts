/**
 * @4eye/features/ai-settings
 *
 * Configuration for AI behavior — accuracy, time aspect, power, planning,
 * review/testing, duration/schedule, custom instructions. Logic lives in a
 * pure reducer; the bar is the standard view component.
 */
export {
  AISettingsProvider,
  useAISettings,
} from "./AISettingsContext";
export { AISettingsBar } from "./AISettingsBar";
export { AISettingsPanel } from "./AISettingsPanel";
export { ContextSourcesPicker } from "./ContextSourcesPicker";
export {
  AionModeIcon,
  PowerLevelIcon,
  BalancedInfinityIcon,
  IonSparkIcon,
  IonPlusIcon,
  AionInfinityIcon,
  AionPlusInfinityIcon,
} from "./AionModeIcons";
export {
  TimeAspectIcon,
  PastTimeIcon,
  PresentTimeIcon,
  FutureTimeIcon,
  MaxTimeIcon,
} from "./TimeAspectIcons";
export {
  aiSettingsReducer,
  initialAISettings,
} from "./aiSettingsReducer";
export type { AISettingsAction } from "./aiSettingsReducer";
export {
  ACCURACY_OPTIONS,
  accuracyLabel,
  AION_MODE_OPTIONS,
  ASK_OPTIONS,
  AUTONOMOUS_OPTIONS,
  DURATION_OPTIONS,
  PLAN_OPTIONS,
  POWER_LEVEL_OPTIONS,
  QUALITY_OPTIONS,
  REVIEW_OPTIONS,
  TESTING_OPTIONS,
  THINKING_OPTIONS,
  TIME_ASPECT_OPTIONS,
  TIME_OPTIONS,
  INCLUDE_CORE_COMMAND,
  INCLUDE_CORE_DESCRIPTION,
  migrateImportPermissionSettings,
  migratePower,
  migrateQuality,
  migrateRewritePast,
  migrateThinking,
  migrateTimeAspect,
} from "./aiSettingsConfig";
export type { SettingOption } from "./aiSettingsConfig";
