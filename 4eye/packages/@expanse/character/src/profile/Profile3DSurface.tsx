"use client"
/**
 * Profile3DSurface — lazy-loaded 3D avatar surface
 * ================================================
 * Wraps {@link ProfileAvatar3D} in its own {@link CharacterProvider} so the
 * unified {@link ProfileAvatar} can mount the true-3D render on demand without
 * forcing every 2D-only page to pull in three.js. This module is the code-split
 * boundary: it is `React.lazy`-imported by `ProfileAvatar`, so WebGL only loads
 * the first time a user switches to 3D.
 *
 * @module character/profile/Profile3DSurface
 */
import type { CSSProperties } from "react"
import { CharacterProvider } from "../state"
import type { CharacterState } from "../core"
import { ProfileAvatar3D } from "../3d"
import type {
  Character4eyeModelProps,
} from "../3d"
import type { SharedProfileZoom, SharedProfileBorder } from "./types"

export interface Profile3DSurfaceProps {
  size: number
  zoom: SharedProfileZoom
  borderStyle: SharedProfileBorder
  borderWidth: number
  borderColor: string
  background?: string
  enableOrbit: boolean
  /** Color overrides forwarded to the 3D model. */
  model?: Character4eyeModelProps
  /** Initial overrides merged onto the default character store state. */
  initialState?: Partial<CharacterState>
  style?: CSSProperties
  "aria-label"?: string
}

/**
 * Default export so it can be consumed with `React.lazy(() => import(...))`.
 */
export default function Profile3DSurface({
  size,
  zoom,
  borderStyle,
  borderWidth,
  borderColor,
  background,
  enableOrbit,
  model,
  initialState,
  style,
  "aria-label": ariaLabel,
}: Profile3DSurfaceProps) {
  return (
    <CharacterProvider initialState={initialState}>
      <ProfileAvatar3D
        size={size}
        zoom={zoom}
        borderStyle={borderStyle}
        borderWidth={borderWidth}
        borderColor={borderColor}
        background={background}
        enableOrbit={enableOrbit}
        model={model}
        style={style}
        aria-label={ariaLabel}
      />
    </CharacterProvider>
  )
}
