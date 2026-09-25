"use client"
/**
 * ProfileAvatar3D — 3D counterpart of the 2D `ProfilePhoto`
 * =========================================================
 * Frames the LIVE true-3D 4eye render inside a circular / rounded avatar
 * container, with zoom presets that aim the camera at the head (face crop)
 * or pull back to the full figure. This is the 3D analogue of the SVG
 * `ProfilePhoto` in `@expanse/character/2d` — same intent (an avatar), but
 * powered by WebGL instead of a cropped SVG viewBox.
 *
 * Must be rendered inside a <CharacterProvider> (the scene reads the shared
 * store via useCharacter()), exactly like every other /3d component.
 *
 * @module character/3d/profile/ProfileAvatar3D
 */
import { useMemo, type CSSProperties } from "react"
import { calculateProportions } from "../../core"
import { CharacterCanvas } from "../CharacterCanvas"
import type { Character4eyeModelProps } from "../Character4eyeModel"

/** Zoom presets — mirror the head-/body-focused crops of the 2D ProfilePhoto. */
export type ProfileAvatar3DZoom =
  | "full"
  | "head"
  | "face"
  | "shoulders"
  | "torso"

/** Border shape, matching the 2D ProfilePhoto API. */
export type ProfileAvatar3DBorder = "circle" | "rounded" | "square" | "none"

export interface ProfileAvatar3DProps {
  /** Avatar size in pixels (default: 200). */
  size?: number
  /** Camera framing preset (default: "face"). */
  zoom?: ProfileAvatar3DZoom
  /** Border shape style (default: "circle"). */
  borderStyle?: ProfileAvatar3DBorder
  /** Border width in pixels, 0 = no border (default: 0). */
  borderWidth?: number
  /** Border color (default: "#00d4ff"). */
  borderColor?: string
  /** Background of the GL surface (default: transparent). */
  background?: string
  /** Allow the viewer to orbit/drag the head (default: false for avatars). */
  enableOrbit?: boolean
  /** Color / opacity overrides forwarded to the 3D model. */
  model?: Character4eyeModelProps
  /** Extra container styles. */
  style?: CSSProperties
  /** Accessible label for the avatar. */
  "aria-label"?: string
}

/**
 * Camera framing per zoom preset, expressed in head-length (H) units so it
 * scales with the shared proportions. `targetYFromHead` is the look-at height
 * relative to the head center (the head center sits at +centerOffsetY; the full
 * figure midpoint is at the world origin).
 *
 * Reference points (H = headLength, head center at +centerOffsetY ≈ 3.08H):
 * - head top ≈ +0.5H, antenna tip ≈ +0.84H above head center
 * - head bottom ≈ -0.5H, shoulders ≈ -0.65H, waist ≈ -3.0H, feet ≈ -6.65H
 *
 * Each preset frames the content tightly and is vertically centered on the
 * mid-point of what it shows, so the head/face is never lop-sided and the
 * antenna is always kept in frame (with a small margin) rather than clipped.
 * With FOV 45°, the visible half-height ≈ distance × 0.414 (in H units).
 */
const ZOOM_FRAMING: Record<
  ProfileAvatar3DZoom,
  { distance: number; targetYFromHead: number }
> = {
  // Tight head + antenna crop, centered on the face. Visible span ≈ 1.5H.
  face: { distance: 1.85, targetYFromHead: 0.14 },
  // Full head with comfortable margin. Visible span ≈ 2.15H.
  head: { distance: 2.6, targetYFromHead: 0.1 },
  // Head + shoulders portrait, centered on the upper chest. Visible span ≈ 2.7H.
  shoulders: { distance: 3.3, targetYFromHead: -0.25 },
  // Head through waist, centered on the torso. Visible span ≈ 4.6H.
  torso: { distance: 5.6, targetYFromHead: -1.4 },
  // Whole figure head-to-toe; tip of the antenna and the feet both stay in frame.
  full: { distance: 9.6, targetYFromHead: -2.95 },
}

function borderRadiusFor(style: ProfileAvatar3DBorder, size: number): string {
  switch (style) {
    case "circle":
      return "50%"
    case "rounded":
      return `${Math.round(size * 0.16)}px`
    case "square":
    case "none":
    default:
      return "0px"
  }
}

export function ProfileAvatar3D({
  size = 200,
  zoom = "face",
  borderStyle = "circle",
  borderWidth = 0,
  borderColor = "#00d4ff",
  background,
  enableOrbit = false,
  model,
  style,
  "aria-label": ariaLabel = "3D character avatar",
}: ProfileAvatar3DProps) {
  // Head world-Y: the model offsets the figure so its vertical midpoint is at
  // the origin, putting the head at +centerOffsetY. Recompute here to aim the
  // camera precisely without reaching into the model.
  const { camera, target } = useMemo(() => {
    const p = calculateProportions()
    const H = p.headLength
    const centerOffsetY = (p.neckGap + p.bodyLength + p.legLength) / 2
    const framing = ZOOM_FRAMING[zoom]
    const targetY = centerOffsetY + framing.targetYFromHead * H
    return {
      camera: { position: [0, targetY, framing.distance * H] as [number, number, number], fov: 45 },
      target: [0, targetY, 0] as [number, number, number],
    }
  }, [zoom])

  const radius = borderRadiusFor(borderStyle, size)

  return (
    <div
      aria-label={ariaLabel}
      role="img"
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : undefined,
        background,
        ...style,
      }}
    >
      <CharacterCanvas
        model={model}
        enableOrbit={enableOrbit}
        background={background}
        camera={camera}
        orbitTarget={target}
      />
    </div>
  )
}
