/**
 * Create Tile — public surface.
 */

export { default as CreateTile } from "./CreateTile";
export type { CreateTileProps } from "./CreateTile";

export { ProjectOverview } from "./components/ProjectOverview";
export { ReportLens } from "./components/ReportLens";
export type { ReportLensProps } from "./components/ReportLens";

export {
  SendToChatProvider,
  SendToChatButton,
  useSendToChat,
} from "./chat/SendToChat";
export type { ChatHandoff, SendToChatHandler } from "./chat/SendToChat";

export * from "./model/report-entities";

export { GoalLinkCard } from "./components/GoalLinkCard";
export type { GoalLinkCardProps } from "./components/GoalLinkCard";

export { BrandIcon } from "./components/BrandIcon";
export type { BrandIconProps } from "./components/BrandIcon";
export { GLYPH_MARKUP } from "./components/brand-glyphs";
export type { GlyphName } from "./components/brand-glyphs";

export { HistoryTimeline } from "./components/HistoryTimeline";
export type { HistoryTimelineProps } from "./components/HistoryTimeline";
export { ActionBar } from "./components/ActionBar";
export type { ActionBarProps } from "./components/ActionBar";

export { ContextBar } from "./components/ContextBar";
export type {
  ContextBarProps,
  ContextSegment,
  PipelineStep,
  StepStatus,
} from "./components/ContextBar";

export { SceneMap } from "./components/SceneMap";
export type { SceneMapProps } from "./components/SceneMap";

export {
  STATUS_COLOR,
  weightColor,
  WeightMeter,
  DepthDots,
  StatusBadge,
  InfoChip,
  MediumChip,
} from "./components/visuals";
export type { InfoChipProps } from "./components/visuals";

export { CreateProvider, useCreate } from "./store/CreateProvider";
export type { CreateState, CreateAction } from "./store/CreateProvider";

export { StubStore, initialCreateState } from "./store/SeedStore";
export type { SeedStore } from "./store/SeedStore";

export { getEffectiveGoals, getSequenceGoals } from "./model/resolver";
export * from "./model/types";
