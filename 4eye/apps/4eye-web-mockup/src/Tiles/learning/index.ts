"use client";

/**
 * Learning tile — public barrel.
 */

export { LearningTile, LearningSurface, default } from "./LearningTile";
export type { LearningTileProps } from "./LearningTile";
export { InputTypePicker } from "./components/InputTypePicker";
export { InputTypeIcon } from "./components/InputTypeIcon";
export { LearningChecklist } from "./components/LearningChecklist";
export { LearningComposer } from "./components/LearningComposer";
export type { LearningComposerProps, LearningPlanInput } from "./components/LearningComposer";
export { LearningOptions } from "./components/LearningOptions";
export { LearningRail } from "./components/LearningRail";
export type { LearningRailProps } from "./components/LearningRail";
export { ModalityGrid } from "./components/ModalityGrid";
export { ModalityIcon } from "./components/ModalityIcon";
export {
  activeStep,
  composerPlaceholder,
  coreModalityCount,
  learningDirective,
  selectedOption,
  selectedOptions,
  stepPosition,
  summarizeLearningSession,
  taggedContextFacets,
  taggedLearningModalities,
  taggedShapes,
} from "./model/chatContext";
export {
  LearningProvider,
  useLearning,
} from "./store/LearningProvider";
export type {
  LearningState,
  LearningAction,
  LearningContextValue,
} from "./store/LearningProvider";
export { LEARNING_SEED, LEARNING_EMPTY } from "./store/seed-data";
export {
  LEARNING_INPUT_TYPES,
  LEARNING_INPUT_TYPE_META,
  LEARNING_MODALITIES,
  LEARNING_CORE_MODALITIES,
  LEARNING_CONTEXT_FACETS,
  LEARNING_SHAPE_META,
  LEARNING_SHAPES,
  LEARNING_MODALITY_META,
  LEARNING_OPTION_GROUPS,
  LEARNING_OPTION_GROUP_LABEL,
  OPT_DEPTH_AUTO,
  OPT_OUTPUT_CUSTOM,
  OPT_SUPPORT_COMBINATION,
  isDefaultLearningOption,
  outputNoteLabel,
} from "./model/types";
export type {
  LearningInputType,
  LearningInputTypeMeta,
  LearningModality,
  LearningModalityMeta,
  LearningShape,
  LearningShapeMeta,
  LearningChecklistItem,
  LearningOption,
  LearningOptionGroup,
  LearningSession,
  LearningData,
  OutputNote,
} from "./model/types";
export {
  APM_CHANNELS,
  APM_CHANNEL_LABEL,
  APM_SCALE_MAX,
  APM_WEIGHT,
  APM_WINDOW_MS,
  DEFAULT_APM,
  DEFAULT_PACE_BAND,
  PACE_BANDS,
  PACE_BAND_META,
  apmRangeLabel,
  bandForApm,
  bandForOptionId,
  emptyApmSnapshot,
  formatApm,
  formatLiteralApm,
  formatRelativeApm,
  rebaseSnapshot,
  recordApm,
  recordApmChannels,
  relativeApm,
  recomputeApm,
  seedApmSnapshot,
  setApmFromBand,
  setApmRating,
} from "./model/apm";
export type {
  ApmChannel,
  ApmCounts,
  ApmEvent,
  ApmSnapshot,
  PaceBand,
  PaceBandMeta,
} from "./model/apm";
