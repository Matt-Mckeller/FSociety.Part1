/**
 * @expanse/character/explorer
 *
 * Guest Explorer segment — the left-column player card in the full-screen
 * map view.  Contains the 4eye avatar (CharacterFigure), the orbital-ring
 * compass (CharacterCompass), the customization accordion (CustomizePanel),
 * and the shared profile context/hooks/config.
 *
 * The host app is responsible for:
 *   • Wrapping with a `<CharacterProfileProvider>` (or using the one
 *     embedded in GuestExplorerPanel if it lives in the app).
 *   • Computing `leanTransform` (e.g. via `useCharacterLean()`) and
 *     passing it to `<CharacterFigure leanTransform={...} />`.
 */

// ─── Components ──────────────────────────────────────────────────────────────
export { CharacterFigure, type CharacterFigureProps } from "./CharacterFigure";
export { CharacterCompass, type CharacterCompassProps } from "./CharacterCompass";
export { CustomizePanel } from "./CustomizePanel";

// ─── Profile Context ─────────────────────────────────────────────────────────
export {
  CharacterProfileProvider,
  useCharacterProfile,
  type CharacterProfileProviderProps,
  type CharacterProfileState,
  type CharacterProfileActions,
  type CharacterProfileContextValue,
} from "./context/CharacterProfileContext";

// ─── Hooks ────────────────────────────────────────────────────────────────────
export { useRingCycle } from "./hooks/useRingCycle";

// ─── Ring Registry ───────────────────────────────────────────────────────────
export {
  RING_SCHEDULE,
  RING_RENDERERS,
  RING_LABELS,
  type RingVariantId,
  StarWarsRings,
  SaturnRings,
  MatrixSearchRings,
  PacmanChomperRings,
  CometNavigatorRings,
} from "./rings";

// ─── Config ──────────────────────────────────────────────────────────────────
export {
  DIRECTION_TRANSFORMS,
  ANIMATION,
  SPRING_EASING,
  MOODS,
  EYE_DESIGNS,
  FACE_VARIANTS,
  STRAP_STYLES,
  GLOW_COLORS,
  STAT_CHIPS,
  pillSx,
  type Direction,
  type StatKey,
  type StrapStyle,
  type EyeDesign,
  type CharacterVariant,
  type CharacterMood,
} from "./config";
