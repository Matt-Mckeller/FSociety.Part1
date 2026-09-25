/**
 * ProfilePhoto - Cropped profile view component for 4eye character
 *
 * Creates precise zoom views of character regions for avatars,
 * profile pictures, and UI elements.
 *
 * Uses calculated viewBox coordinates for accurate targeting based on
 * the character's actual SVG anatomy.
 *
 * @module character/profile/ProfilePhoto
 */
import { Character4eye, Character4eyeProps } from "../poses/Character4eye"
import { calculateDimensions, CHARACTER_BASE } from "../config"

// =============================================================================
// TYPES
// =============================================================================

/**
 * Zoom level presets for profile photos
 *
 * Head-focused:
 * - `full` - Entire character visible (head to toes)
 * - `head` - Complete head with margin
 * - `face` - Face-focused crop (recommended for profiles)
 * - `eye` - Brain/eye focus (centered on eye)
 * - `tight` - Extreme closeup on just the eye
 *
 * Body-focused:
 * - `shoulders` - Shoulder/chest region (professional portrait)
 * - `torso` - Upper body (head + torso)
 */
export type ProfileZoom =
  | "full"
  | "head"
  | "face"
  | "eye"
  | "tight"
  | "shoulders"
  | "torso"

/** Border style options */
export type ProfileBorder = "circle" | "rounded" | "square" | "none"

/** ViewBox configuration for precise zoom targeting */
export interface ViewBoxConfig {
  /** X offset from center (negative = left of center) */
  offsetX: number
  /** Y offset from container top (0 = top of character in compact mode) */
  offsetY: number
  /** Width of visible area in SVG units */
  width: number
  /** Height of visible area in SVG units */
  height: number
}

export interface ProfilePhotoProps extends Partial<Character4eyeProps> {
  /** Size of the profile photo in pixels (default: 200) */
  size?: number
  /** Zoom level preset (default: 'face') */
  zoom?: ProfileZoom
  /** Custom viewBox config for precise targeting (overrides zoom preset) */
  customViewBox?: ViewBoxConfig
  /** Border shape style (default: 'circle') */
  borderStyle?: ProfileBorder
  /** Border width in pixels, 0 = no border (default: 0) */
  borderWidth?: number
  /** Border color (default: '#00d4ff') */
  borderColor?: string
  /** Background style - 'gradient', 'solid', 'transparent', or custom CSS */
  background?: "gradient" | "solid" | "transparent" | string
  /** Background color when background is 'solid' (default: '#f0f0f0') */
  backgroundColor?: string
  /** Show shadow effect (default: true) */
  shadow?: boolean
  /** Additional CSS class name */
  className?: string
}

// =============================================================================
// ZOOM CALCULATIONS
// =============================================================================

/**
 * Character anatomy reference (compact mode, Y=0 at top):
 *
 * ```
 * Y=0      ┌─────────┐  Head top
 *          │    ○    │  Eye center at Y=16.5
 * Y=33     └─────────┘  Head bottom
 * Y=38     ── neck ──   Neck gap (~5 units)
 * Y=46     ╔═════════╗  Shoulder attachment
 * Y=51     ║         ║  Body stroke center start
 *          ║  BODY   ║  Body length = 99
 * Y=150    ╚═════════╝  Body end
 *          ╱         ╲
 *         ╱   LEGS    ╲  Leg length = 99
 *        ╱             ╲
 * Y~260  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  Character bottom
 * ```
 *
 * Key Y coordinates (headSize=33):
 * - headCenterY = 16.5 (eye location)
 * - headBottom = 33
 * - neckGap = ~5 (33 * 0.15)
 * - bodyStartY = 51 (headCenterY + headLength/2 + neckGap + bodyStrokeWidth/2)
 * - shoulderY = 46.67 (bodyStartY - bodyStrokeWidth/2 + armStrokeWidth)
 * - bodyEndY = 150 (bodyStartY + bodyLength)
 */

/**
 * Calculate viewBox configuration for a given zoom level
 * All calculations based on actual character dimensions
 */
export function getViewBoxForZoom(
  zoom: ProfileZoom,
  customViewBox?: ViewBoxConfig,
): ViewBoxConfig {
  if (customViewBox) return customViewBox

  // Get dimensions for compact mode (no padding)
  const dims = calculateDimensions({
    containerPaddingX: 0,
    containerPaddingY: 0,
  })
  const {
    headLength,
    neckGap,
    bodyLength,
    bodyStrokeWidth,
    containerWidth,
    containerHeight,
  } = dims

  // Calculate key Y positions
  const headCenterY = headLength / 2 // Eye center = 16.5
  const bodyStartY = headLength + neckGap + bodyStrokeWidth / 2 // ~51
  const shoulderY = bodyStartY - bodyStrokeWidth / 2 // ~38 (top of body stroke)

  switch (zoom) {
    // === HEAD-FOCUSED VIEWS ===

    case "full":
      // Full character - show everything
      return {
        offsetX: 0,
        offsetY: 0,
        width: containerWidth,
        height: containerHeight,
      }

    case "head":
      // Complete head with comfortable margin
      // Shows full circular head with ~6 units padding
      return {
        offsetX: 0,
        offsetY: -6,
        width: headLength + 12, // ~45
        height: headLength + 12,
      }

    case "face":
      // Face-focused - shows majority of head, centered on eye
      // Good for avatars, centers the eye vertically
      return {
        offsetX: 0,
        offsetY: 0, // Start at head top
        width: headLength, // 33
        height: headLength, // Shows full head, centered on eye
      }

    case "eye":
      // Brain/eye focus - centered precisely on eye
      // ~20 units visible, centered on headCenterY
      return {
        offsetX: 0,
        offsetY: headCenterY - 10, // Center on eye (16.5 - 10 = 6.5)
        width: 20,
        height: 20,
      }

    case "tight":
      // Extreme closeup - just the eye detail
      // ~12 units visible, tight center on eye
      return {
        offsetX: 0,
        offsetY: headCenterY - 6, // Center on eye (16.5 - 6 = 10.5)
        width: 12,
        height: 12,
      }

    // === BODY-FOCUSED VIEWS ===

    case "shoulders":
      // Shoulder/chest portrait - professional headshot style
      // Shows head + shoulders, similar to a passport photo
      // Centered around shoulder area
      return {
        offsetX: 0,
        offsetY: -4, // Start slightly above head
        width: 50,
        height: 50,
      }

    case "torso":
      // Upper body view - head + full torso
      // Good for showing character personality with body language
      // Shows from above head to mid-thigh
      return {
        offsetX: 0,
        offsetY: -8, // Margin above head
        width: 70,
        height: 100,
      }

    default:
      // Default to face
      return {
        offsetX: 0,
        offsetY: -2,
        width: headLength - 2,
        height: headLength - 2,
      }
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * ProfilePhoto - Renders a cropped profile view of the 4eye character
 *
 * Uses precise SVG coordinate calculations for accurate region targeting.
 * The character renders in compact mode (no padding) for precise positioning.
 *
 * ## Zoom Levels
 *
 * ### Head-focused (for avatars, icons)
 * - **full**: Entire character (head to toes)
 * - **head**: Complete head with margin
 * - **face**: Face-focused crop (default, recommended)
 * - **eye**: Brain/eye focus area
 * - **tight**: Extreme closeup on eye
 *
 * ### Body-focused (for larger displays)
 * - **shoulders**: Head + shoulders (portrait style)
 * - **torso**: Upper body (head + torso)
 *
 * @example
 * // Basic profile photo
 * <ProfilePhoto variant="friendly" size={120} />
 *
 * @example
 * // Eye closeup with border
 * <ProfilePhoto
 *   variant="tech"
 *   zoom="eye"
 *   size={180}
 *   borderStyle="circle"
 *   borderWidth={3}
 *   borderColor="#00ff88"
 * />
 *
 * @example
 * // Professional portrait style
 * <ProfilePhoto
 *   variant="friendly"
 *   zoom="shoulders"
 *   size={240}
 *   borderStyle="rounded"
 * />
 *
 * @example
 * // Custom viewBox for precise targeting
 * <ProfilePhoto
 *   size={200}
 *   customViewBox={{ offsetX: 0, offsetY: 10, width: 30, height: 30 }}
 * />
 */
export const ProfilePhoto = ({
  size = 200,
  zoom = "face",
  customViewBox,
  borderStyle = "circle",
  borderWidth = 0,
  borderColor = "#00d4ff",
  background = "gradient",
  backgroundColor = "#f0f0f0",
  shadow = true,
  className,
  variant = "friendly",
  eyeGlowColor,
  eyeDesign,
  strapStyle,
  showAntenna,
  showStatusLEDs,
  showEarSensors,
  showForeheadMark,
  statusLEDCount,
  statusLEDColors,
  showDataFlow,
  limbOpacity,
  ...rest
}: ProfilePhotoProps) => {
  // Get character dimensions for container sizing
  const dims = calculateDimensions({
    containerPaddingX: 0,
    containerPaddingY: 0,
  })
  const { centerX, containerWidth, containerHeight } = dims

  // Get viewBox configuration for zoom level
  const viewBoxConfig = getViewBoxForZoom(zoom, customViewBox)

  // Calculate viewBox centered on the character
  const viewBoxX = centerX - viewBoxConfig.width / 2 + viewBoxConfig.offsetX
  const viewBoxY = viewBoxConfig.offsetY

  // Calculate scale factor and position for CSS-based zoom
  const scaleFactor = size / viewBoxConfig.width

  // Position offsets to show target region
  const offsetX = -(viewBoxX * scaleFactor)
  const offsetY = -(viewBoxY * scaleFactor)

  // Border radius based on style
  const getBorderRadius = (): string => {
    switch (borderStyle) {
      case "circle":
        return "50%"
      case "rounded":
        return "16px"
      case "square":
      case "none":
        return "0"
      default:
        return "50%"
    }
  }

  // Background style
  const getBackground = (): string => {
    switch (background) {
      case "gradient":
        return "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
      case "solid":
        return backgroundColor
      case "transparent":
        return "transparent"
      default:
        return background // Allow custom CSS strings
    }
  }

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        overflow: "hidden",
        borderRadius: getBorderRadius(),
        background: getBackground(),
        boxShadow: shadow ? "0 4px 20px rgba(0,0,0,0.15)" : "none",
        border:
          borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: containerWidth * scaleFactor,
          height: containerHeight * scaleFactor,
        }}
      >
        <Character4eye
          compact
          variant={variant}
          eyeGlowColor={eyeGlowColor}
          eyeDesign={eyeDesign}
          strapStyle={strapStyle}
          showAntenna={showAntenna}
          showStatusLEDs={showStatusLEDs}
          showEarSensors={showEarSensors}
          showForeheadMark={showForeheadMark}
          statusLEDCount={statusLEDCount}
          statusLEDColors={statusLEDColors}
          showDataFlow={showDataFlow}
          limbOpacity={limbOpacity}
          {...rest}
        />
      </div>
    </div>
  )
}

export default ProfilePhoto
