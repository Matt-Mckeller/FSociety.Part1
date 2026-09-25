import type { ReactNode } from "react"
import type { Character4eyeModelProps } from "./Character4eyeModel"

/** Camera framing override for the GL host. */
export interface CharacterCameraConfig {
  /** Camera world position (default [0, 0, 320]). */
  position?: [number, number, number]
  /** Field of view in degrees (default 45). */
  fov?: number
}

/** Shared props for the platform Canvas hosts. */
export interface CharacterCanvasProps {
  /** Forwarded to the inner model (colors, limb opacity). */
  model?: Character4eyeModelProps
  /** Allow user orbit/drag (web only; default true). */
  enableOrbit?: boolean
  /** Background color of the GL surface (default transparent). */
  background?: string
  /** Style passthrough for the host container. */
  style?: Record<string, unknown>
  /** Camera framing override (e.g. tight face crop for an avatar). */
  camera?: CharacterCameraConfig
  /** Point the camera/orbit pivots at (default world origin). */
  orbitTarget?: [number, number, number]
  /** Extra scene contents (e.g. themed accessories) rendered with the model. */
  children?: ReactNode
}
