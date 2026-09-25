/**
 * Eye dispatcher — picks the renderer based on `ctx.eyeDesign`.
 *
 * Each eye design lives in its own file alongside this dispatcher.
 * Adding a new design is: create the renderer, add an `EyeDesign`
 * union member, add a case here.
 */

import type { CharacterPartContext } from "../CharacterPartContext"
import { DefaultEye } from "./DefaultEye"
import { ApertureEye } from "./ApertureEye"
import { CameraEye } from "./CameraEye"
import { OrbEye } from "./OrbEye"
import { ScannerEye } from "./ScannerEye"
import { RingEye } from "./RingEye"

export interface CharacterEyeProps {
  ctx: CharacterPartContext
}

export function CharacterEye({ ctx }: CharacterEyeProps) {
  switch (ctx.eyeDesign) {
    case "aperture":
      return <ApertureEye ctx={ctx} />
    case "camera":
      return <CameraEye ctx={ctx} />
    case "orb":
      return <OrbEye ctx={ctx} />
    case "scanner":
      return <ScannerEye ctx={ctx} />
    case "ring":
      return <RingEye ctx={ctx} />
    default:
      return <DefaultEye ctx={ctx} />
  }
}

export { DefaultEye, ApertureEye, CameraEye, OrbEye, ScannerEye, RingEye }
