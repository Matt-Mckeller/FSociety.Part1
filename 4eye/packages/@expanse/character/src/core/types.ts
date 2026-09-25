/**
 * Shared Character Types — Platform-Neutral
 * =========================================
 * The declarative description of a single 4eye, consumed by both renderers
 * and by the state layer. Holds *what* the character looks like and is
 * doing — never *how* it is drawn.
 */

import type { CharacterShapes } from "./shapes"
import type { CharacterPalette } from "./palette"
import type {
  CharacterVariant,
  Emote,
  EyeDesign,
  Mood,
  Pose,
  StrapStyle,
} from "./vocabulary"

/**
 * Entitlement gate for premium capabilities (e.g. the 3D viewer).
 * Discrete, serializable — hydratable from the user profile.
 */
export interface CharacterEntitlement {
  /** Whether the viewer is signed in. */
  signedIn: boolean
  /** Viewer age, used to gate age-restricted features (3D requires 15+). */
  age: number | null
}

/** A named attachment placed at an {@link AnchorName}. */
export interface CharacterAttachment {
  /** Stable id (e.g. "party-hat"). */
  id: string
  /** Anchor the attachment hangs from. */
  anchor: string
}

/**
 * Full declarative character state. Everything here is discrete and changes
 * only on user/app action — never per animation frame. Continuous motion
 * (turning, emote interpolation) is derived in the render loop from the
 * `target*` fields below.
 */
export interface CharacterState {
  /** Appearance silhouette tokens (head/body/limbs). */
  shapes: CharacterShapes
  /** Color theming for body + accessories (driven by the host theme). */
  palette: CharacterPalette
  /** Eye design. */
  eyeDesign: EyeDesign
  /** Strap / visor style. */
  strapStyle: StrapStyle
  /** Visual variant. */
  variant: CharacterVariant
  /** Current mood. */
  mood: Mood
  /** Resting pose. */
  pose: Pose
  /** Active one-shot emote, or null when idle. */
  activeEmote: Emote | null
  /** Eye glow color override (hex), or null to use the theme accent. */
  eyeGlowColor: string | null
  /** Target facing yaw in degrees (3D turn target the render loop tweens to). */
  targetYaw: number
  /** Active attachments. */
  attachments: CharacterAttachment[]
  /** Entitlement for gated capabilities. */
  entitlement: CharacterEntitlement
}
