/**
 * HUD Templates
 *
 * Complete, self-contained layout examples for different applications.
 * Copy these templates into your app and modify as needed.
 */

export { HudDesktopDefault } from "./desktop-default";
export type { HudDesktopDefaultProps } from "./desktop-default";

export { HudMobileMoba } from "./mobile-moba";
export type { HudMobileMobaProps } from "./mobile-moba";

export { HudPresentation } from "./presentation";
export type { HudPresentationProps } from "./presentation";

export { HudLearningFocus } from "./learning-focus";
export type { HudLearningFocusProps, LearningGoal } from "./learning-focus";

export { HudSocialCollab } from "./social-collab";
export type { HudSocialCollabProps, Participant, ChatMessage } from "./social-collab";

export { HudWorkDashboard } from "./work-dashboard";
export type { HudWorkDashboardProps, Task, CalendarEvent, Notification } from "./work-dashboard";

export { HudMediaPlayer } from "./media-player";
export type { HudMediaPlayerProps, Chapter } from "./media-player";

export { HudGamingRpg } from "./gaming-rpg";
export type { HudGamingRpgProps, QuestObjective, Quest, HotbarSlot } from "./gaming-rpg";

export { HudCreativeCanvas } from "./creative-canvas";
export type { HudCreativeCanvasProps, Layer, Tool } from "./creative-canvas";

export { HudDataDashboard } from "./data-dashboard";
export type { HudDataDashboardProps, FilterOption, LegendItem } from "./data-dashboard";

// Additional templates (batch 2)
export { HudEReader } from "./e-reader";
export type { HudEReaderProps, Chapter as EReaderChapter, Bookmark, Highlight } from "./e-reader";

export { HudStreaming } from "./streaming";
export type { HudStreamingProps, Scene, AudioSource, ChatMessage as StreamChatMessage, Alert } from "./streaming";

export { HudMusicProduction } from "./music-production";
export type { HudMusicProductionProps, Track } from "./music-production";

export { HudFitnessTracker } from "./fitness-tracker";
export type { HudFitnessTrackerProps, Exercise, WorkoutStats } from "./fitness-tracker";

export { HudMapNavigation } from "./map-navigation";
export type { HudMapNavigationProps, NavigationStep, POI } from "./map-navigation";

export { HudPhotoGallery } from "./photo-gallery";
export type { HudPhotoGalleryProps, Photo, ExifData } from "./photo-gallery";

export { HudSmartHome } from "./smart-home";
export type { HudSmartHomeProps, Room, Device, Scene as SmartHomeScene, EnergyStats } from "./smart-home";

export { HudKioskPos } from "./kiosk-pos";
export type { HudKioskPosProps, CartItem, Category, Product } from "./kiosk-pos";

export { HudTerminalDev } from "./terminal-dev";
export type { HudTerminalDevProps, FileNode, LogEntry, StatusItem } from "./terminal-dev";

export { Hud3dViewer } from "./3d-viewer";
export type { Hud3dViewerProps, ModelLayer, ViewPreset, ModelInfo } from "./3d-viewer";
