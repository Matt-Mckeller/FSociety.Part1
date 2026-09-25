/**
 * Public API for the Character Profile segment of the full-screen map view.
 *
 * The primary export — {@link GuestExplorerPanel} — is the app-level
 * orchestrator. All primitive sub-components (CharacterFigure,
 * CharacterCompass, rings, context, config) live in the package and
 * are re-exported here for convenience.
 */

// ─── App-specific (stay in app) ──────────────────────────────────────────────
export { GuestExplorerPanel } from "./GuestExplorerPanel";
export type { GuestExplorerPanelProps } from "./GuestExplorerPanel";

// useCharacterLean bridges @expanse/shell with @expanse/character ─ it must
// live in the app to avoid a circular dependency.
export { useCharacterLean } from "./hooks/useCharacterLean";

// ─── Package primitives (re-exported for app-internal consumers) ─────────────
export {
  CharacterFigure,
  type CharacterFigureProps,
  CharacterCompass,
  type CharacterCompassProps,
  CustomizePanel,
  CharacterProfileProvider,
  useCharacterProfile,
  type CharacterProfileContextValue,
  type CharacterProfileProviderProps,
  type CharacterProfileState,
  type CharacterProfileActions,
  useRingCycle,
  RING_SCHEDULE,
  RING_RENDERERS,
  RING_LABELS,
  type RingVariantId,
  StarWarsRings,
  SaturnRings,
  MatrixSearchRings,
  PacmanChomperRings,
  CometNavigatorRings,
  DIRECTION_TRANSFORMS,
  SPRING_EASING,
  ANIMATION,
  STAT_CHIPS,
  MOODS,
  EYE_DESIGNS,
  FACE_VARIANTS,
  STRAP_STYLES,
  GLOW_COLORS,
  pillSx,
  type StatKey,
  type StrapStyle,
  type EyeDesign,
  type CharacterVariant,
  type CharacterMood,
} from "@expanse/character/explorer";
