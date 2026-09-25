// Re-exports of generic HUD overlay state — now lives in @expanse/hud.
// Existing app code imports from `@4eye/web/components/hud/state`; this barrel
// keeps that path working while the library types/values flow through.
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
  hudReducer,
  INITIAL_HUD_STATE,
  MAP_CLOSE_GLYPH_MS,
  MapDirectionFocusProvider,
  useMapDirectionFocus,
  ActiveMapProvider,
  useActiveMap,
  RoleSelectionProvider,
  useRoleSelection,
  type HudStateProviderProps,
  type HudState,
  type HudAction,
  type MapDirectionFocusProviderProps,
  type ActiveMapProviderProps,
  type RoleSelectionProviderProps,
} from "@expanse/hud";
