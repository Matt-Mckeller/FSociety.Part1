/**
 * Barrel export for `Character4eye` part components.
 *
 * Each part takes a single `ctx: CharacterPartContext` prop. The
 * dispatcher components (`CharacterEye`, `CharacterStrap`) pick the
 * right renderer based on `ctx.eyeDesign` / `ctx.strapStyle`.
 */

export type { CharacterPartContext, CharacterVariantConfig } from "./CharacterPartContext"
export { buildPartContext, VARIANT_CONFIG, type BuildPartContextOptions } from "./buildPartContext"
export { CharacterDefs } from "./CharacterDefs"
export { CharacterEye } from "./eyes"
export { CharacterStrap } from "./straps"
export {
  Antenna,
  StatusLEDs,
  EarSensors,
  ForeheadMark,
  DataFlow,
  CircuitNodes,
} from "./decorations"
