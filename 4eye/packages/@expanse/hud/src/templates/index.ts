/**
 * @expanse/hud Templates
 *
 * HUD-dependent full-page layouts moved from @expanse/shell (P5).
 * - MinimalLayout, DocumentationLayout, DashboardLayout, ComposableLayout,
 *   ResponsiveLayout (original/)
 * - FullScreenLayout (spatial/)
 * - Hud* templates (hud/)
 */

// -----------------------------------------------------------------------------
// Original layouts
// -----------------------------------------------------------------------------
export { MinimalLayout } from "./original/MinimalLayout"
export type { MinimalLayoutProps } from "./original/MinimalLayout"

export { DocumentationLayout } from "./original/DocumentationLayout"
export type { DocumentationLayoutProps } from "./original/DocumentationLayout"

export { DashboardLayout } from "./original/DashboardLayout"
export type { DashboardLayoutProps } from "./original/DashboardLayout"

export { ComposableLayout } from "./original/ComposableLayout"
export type {
  ComposableLayoutProps,
  LayoutFragment,
  MinimapFragment,
  NavigationFragment,
  ChromeFragment,
} from "./original/ComposableLayout"

export {
  ResponsiveLayoutWrapper,
  ResponsiveMinimalLayout,
  ResponsiveDocumentationLayout,
  ResponsiveDashboardLayout,
  minimalResponsiveConfig,
  documentationResponsiveConfig,
  dashboardResponsiveConfig,
} from "./original/ResponsiveLayout"
export type {
  ResponsiveConfig,
  ResponsiveLayoutWrapperProps,
} from "./original/ResponsiveLayout"

// -----------------------------------------------------------------------------
// Spatial layouts
// -----------------------------------------------------------------------------
export { FullScreenLayout } from "./spatial/FullScreenLayout"
export type { FullScreenLayoutProps, TransitionType } from "./spatial/FullScreenLayout"

// -----------------------------------------------------------------------------
// HUD templates
// -----------------------------------------------------------------------------
export { HudDesktopDefault } from "./hud/desktop-default"
export type { HudDesktopDefaultProps } from "./hud/desktop-default"

export { HudMobileMoba } from "./hud/mobile-moba"
export type { HudMobileMobaProps } from "./hud/mobile-moba"

export { HudPresentation } from "./hud/presentation"
export type { HudPresentationProps } from "./hud/presentation"

export { HudLearningFocus } from "./hud/learning-focus"
export type { HudLearningFocusProps, LearningGoal } from "./hud/learning-focus"

export { HudSocialCollab } from "./hud/social-collab"
export type { HudSocialCollabProps, Participant, ChatMessage } from "./hud/social-collab"

export { HudWorkDashboard } from "./hud/work-dashboard"
export type { HudWorkDashboardProps, Task, CalendarEvent, Notification } from "./hud/work-dashboard"

export { HudMediaPlayer } from "./hud/media-player"
export type { HudMediaPlayerProps, Chapter } from "./hud/media-player"

export { HudGamingRpg } from "./hud/gaming-rpg"
export type { HudGamingRpgProps, QuestObjective, Quest, HotbarSlot } from "./hud/gaming-rpg"

export { HudCreativeCanvas } from "./hud/creative-canvas"
export type { HudCreativeCanvasProps, Layer, Tool } from "./hud/creative-canvas"

export { HudDataDashboard } from "./hud/data-dashboard"
export type { HudDataDashboardProps, FilterOption, LegendItem } from "./hud/data-dashboard"

export { HudEReader } from "./hud/e-reader"
export type { HudEReaderProps, Chapter as EReaderChapter, Bookmark, Highlight } from "./hud/e-reader"

export { HudStreaming } from "./hud/streaming"
export type { HudStreamingProps, Scene, AudioSource, ChatMessage as StreamChatMessage, Alert } from "./hud/streaming"

export { HudMusicProduction } from "./hud/music-production"
export type { HudMusicProductionProps, Track } from "./hud/music-production"

export { HudFitnessTracker } from "./hud/fitness-tracker"
export type { HudFitnessTrackerProps, Exercise, WorkoutStats } from "./hud/fitness-tracker"

export { HudMapNavigation } from "./hud/map-navigation"
export type { HudMapNavigationProps, NavigationStep, POI } from "./hud/map-navigation"

export { HudPhotoGallery } from "./hud/photo-gallery"
export type { HudPhotoGalleryProps, Photo, ExifData } from "./hud/photo-gallery"

export { HudSmartHome } from "./hud/smart-home"
export type { HudSmartHomeProps, Room, Device, Scene as SmartHomeScene, EnergyStats } from "./hud/smart-home"

export { HudKioskPos } from "./hud/kiosk-pos"
export type { HudKioskPosProps, CartItem, Category, Product } from "./hud/kiosk-pos"

export { HudTerminalDev } from "./hud/terminal-dev"
export type { HudTerminalDevProps, FileNode, LogEntry, StatusItem } from "./hud/terminal-dev"

export { Hud3dViewer } from "./hud/3d-viewer"
export type { Hud3dViewerProps, ModelLayer, ViewPreset, ModelInfo } from "./hud/3d-viewer"

// Auto-generation (template hook + types, moved from layout)
export { useAutoGeneration } from "./hooks/useAutoGeneration"
export type { UseAutoGenerationOptions, UseAutoGenerationResult } from "./hooks/useAutoGeneration"
export * from "./types/auto-generation"
export type { SimplifiedLayoutProps } from "./types/common"
