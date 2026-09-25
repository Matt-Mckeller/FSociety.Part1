"use client"
/**
 * ProfileAvatar — unified 2D ⇄ 3D character avatar
 * ================================================
 * One avatar component, two renderers. In `2d` mode it draws the cheap SVG
 * {@link ProfilePhoto}; in `3d` mode it mounts the true-3D
 * {@link ProfileAvatar3D} (lazily, behind a code-split boundary) wrapped in its
 * own {@link CharacterProvider}. Both modes share one set of framing props so a
 * caller describes the avatar once and lets the user flip between views.
 *
 * Design notes:
 * - **Light by default.** The 3D surface is `React.lazy`-loaded, so a page that
 *   only ever shows 2D never pays the three.js cost.
 * - **Crossfade.** Once 3D has been requested it stays mounted; switching modes
 *   is an opacity transition between the two stacked layers.
 * - **Web-only.** Lives at the package top level (not `/2d` or `/3d`) because it
 *   bridges both renderers; this keeps each renderer's platform firewall intact.
 *
 * @module character/profile/ProfileAvatar
 */
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
} from "react"
import { ProfilePhoto, CHARACTER_PERSONAS } from "../2d"
import type { ProfilePhotoProps, PersonaKey } from "../2d"
import type { Character4eyeModelProps } from "../3d"
import type { CharacterState } from "../core"
import { ProfileModeToggle } from "./ProfileModeToggle"
import type {
  ProfileMode,
  SharedProfileZoom,
  SharedProfileBorder,
} from "./types"

const Profile3DSurface = lazy(() => import("./Profile3DSurface"))

/** Per-renderer escape hatches for power users. */
export interface ProfileAvatar3DOptions {
  /** Color overrides forwarded to the 3D model. */
  model?: Character4eyeModelProps
  /** Initial overrides merged onto the default character store state. */
  initialState?: Partial<CharacterState>
}

export interface ProfileAvatarProps {
  // --- Mode control -------------------------------------------------------
  /** Active renderer (controlled). Omit to use internal state. */
  mode?: ProfileMode
  /** Initial renderer when uncontrolled (default: `"2d"`). */
  defaultMode?: ProfileMode
  /** Fired whenever the renderer changes (toggle or controlled sync). */
  onModeChange?: (mode: ProfileMode) => void
  /** Render the built-in 2D/3D switch control (default: `false`). */
  showToggle?: boolean

  // --- Shared character description ---------------------------------------
  /** Persona preset applied to the 2D figure (e.g. `"hero"`, `"mapExplorer"`). */
  persona?: PersonaKey

  // --- Shared framing -----------------------------------------------------
  /** Avatar size in pixels (default: `200`). */
  size?: number
  /** Framing preset, mapped to each renderer (default: `"face"`). */
  zoom?: SharedProfileZoom
  /** Border shape style (default: `"circle"`). */
  borderStyle?: SharedProfileBorder
  /** Border width in px, `0` = none (default: `0`). */
  borderWidth?: number
  /** Border color (default: `"#00d4ff"`). */
  borderColor?: string
  /** Surface background (default: transparent). */
  background?: string
  /** Allow orbit-drag in 3D mode (default: `false`). */
  enableOrbit?: boolean

  // --- Per-renderer escape hatches ----------------------------------------
  /** Extra props merged into the 2D `ProfilePhoto`. */
  twoDProps?: Partial<ProfilePhotoProps>
  /** Color / store overrides for the 3D renderer. */
  threeDProps?: ProfileAvatar3DOptions

  /** Container style overrides. */
  style?: CSSProperties
  /** Accessible label (default: derived from mode). */
  "aria-label"?: string
}

const layerStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  transition: "opacity 280ms ease",
}

export function ProfileAvatar({
  mode: controlledMode,
  defaultMode = "2d",
  onModeChange,
  showToggle = false,
  persona,
  size = 200,
  zoom = "face",
  borderStyle = "circle",
  borderWidth = 0,
  borderColor = "#00d4ff",
  background,
  enableOrbit = false,
  twoDProps,
  threeDProps,
  style,
  "aria-label": ariaLabel,
}: ProfileAvatarProps) {
  const [internalMode, setInternalMode] = useState<ProfileMode>(defaultMode)
  const mode = controlledMode ?? internalMode

  // Mount the 3D surface lazily the first time it is requested, then keep it
  // mounted so subsequent toggles crossfade instead of re-initialising WebGL.
  const [threeRequested, setThreeRequested] = useState(mode === "3d")
  useEffect(() => {
    if (mode === "3d") setThreeRequested(true)
  }, [mode])

  const handleToggle = useCallback(
    (next: ProfileMode) => {
      if (controlledMode === undefined) setInternalMode(next)
      onModeChange?.(next)
    },
    [controlledMode, onModeChange],
  )

  const personaProps = persona ? CHARACTER_PERSONAS[persona] : undefined
  const is3D = mode === "3d"

  return (
    <div
      style={{ position: "relative", width: size, height: size, ...style }}
      aria-label={ariaLabel ?? `${is3D ? "3D" : "2D"} character avatar`}
    >
      {/* 2D layer — always mounted (cheap), fades out under the 3D layer. */}
      <div
        style={{
          ...layerStyle,
          opacity: is3D ? 0 : 1,
          pointerEvents: is3D ? "none" : "auto",
        }}
      >
        <ProfilePhoto
          size={size}
          zoom={zoom}
          borderStyle={borderStyle}
          borderWidth={borderWidth}
          borderColor={borderColor}
          background={background}
          {...personaProps}
          {...twoDProps}
        />
      </div>

      {/* 3D layer — lazy-mounted on first request, then kept for crossfades. */}
      {threeRequested && (
        <div
          style={{
            ...layerStyle,
            opacity: is3D ? 1 : 0,
            pointerEvents: is3D ? "auto" : "none",
          }}
        >
          <Suspense fallback={null}>
            <Profile3DSurface
              size={size}
              zoom={zoom}
              borderStyle={borderStyle}
              borderWidth={borderWidth}
              borderColor={borderColor}
              background={background}
              enableOrbit={enableOrbit}
              model={threeDProps?.model}
              initialState={threeDProps?.initialState}
              aria-label={ariaLabel}
            />
          </Suspense>
        </div>
      )}

      {showToggle && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 8,
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <ProfileModeToggle
            mode={mode}
            onChange={handleToggle}
            dense={size < 160}
          />
        </div>
      )}
    </div>
  )
}
