/**
 * @expanse/character/2d → mascot
 * ==============================
 * Landing-page mascot wrappers around the `Character4eye` figure: a sized,
 * a11y-labelled reactive mascot plus a portal-friendly slot for positioning it.
 * App-specific lifecycle (persisting one mascot across slides, aura effects)
 * stays in the consuming app and composes these primitives.
 */

export {
  FourEyeMascot,
  type FourEyeMascotProps,
  type FourEyeMascotHandle,
} from "./FourEyeMascot"
export { MascotSlot, type MascotSlotProps, HOME_MASCOT_SIZE } from "./MascotSlot"
