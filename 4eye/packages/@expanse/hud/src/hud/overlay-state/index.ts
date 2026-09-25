// =============================================================================
// HUD overlay state
// =============================================================================
//
// Generic state providers shared by chrome that lives ABOVE the page
// content but BELOW the persistent HUD chrome — currently the
// MinimapFullView overlay (open/close + dock visibility + direction
// emphasis on "next-best-actions") and Emotion.Inspect.
//
// These providers are vertical-agnostic. App-specific overlay UI
// (role pickers, location-keyed content, map switchers) stays in
// the host app and reads from these contexts.

export {
  HudStateProvider,
  useHudState,
  useHudStateOptional,
  useHudDispatch,
  useHudDispatchOptional,
  useOpenMapView,
  useCloseMapView,
  useOpenEmotionInspect,
  useCloseEmotionInspect,
  type HudStateProviderProps,
} from "./HudStateProvider";

export {
  hudReducer,
  INITIAL_HUD_STATE,
  MAP_CLOSE_GLYPH_MS,
  type HudState,
  type HudAction,
} from "./hudReducer";

export {
  MapDirectionFocusProvider,
  useMapDirectionFocus,
  type MapDirectionFocusProviderProps,
  type Direction,
} from "./MapDirectionFocusProvider";

export {
  ActiveMapProvider,
  useActiveMap,
  type ActiveMapProviderProps,
} from "./ActiveMapProvider";

export {
  RoleSelectionProvider,
  useRoleSelection,
  type RoleSelectionProviderProps,
} from "./RoleSelectionProvider";

export {
  ActionBarVisibilityProvider,
  useActionBarVisibility,
  type ActionBarVisibilityValue,
  type ActionBarVisibilityProviderProps,
} from "./ActionBarVisibility";

export {
  RailPreferencesProvider,
  useRailPreferences,
} from "./RailPreferencesProvider";

export { HudChromeGuideOverlay } from "./HudChromeGuideOverlay";
