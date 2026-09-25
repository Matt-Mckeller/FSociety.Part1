/**
 * @expanse/character/profile — Unified 2D ⇄ 3D Avatar (web)
 * ========================================================
 * Bridges the 2D SVG `ProfilePhoto` and the true-3D `ProfileAvatar3D` behind a
 * single `ProfileAvatar` with an optional renderer toggle. Web-only: it imports
 * both renderers, so it deliberately lives outside `/2d` and `/3d` to preserve
 * each renderer's platform firewall. The 3D surface is code-split and loads on
 * demand.
 *
 * Use the individual renderers (`@expanse/character/2d` → `ProfilePhoto`,
 * `@expanse/character/3d` → `ProfileAvatar3D`) directly when you only ever need
 * one view.
 */

export { ProfileAvatar } from "./ProfileAvatar"
export type {
  ProfileAvatarProps,
  ProfileAvatar3DOptions,
} from "./ProfileAvatar"
export { ProfileModeToggle } from "./ProfileModeToggle"
export type { ProfileModeToggleProps } from "./ProfileModeToggle"
export type {
  ProfileMode,
  SharedProfileZoom,
  SharedProfileBorder,
} from "./types"
