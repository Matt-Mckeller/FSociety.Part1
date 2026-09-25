/**
 * Shared profile vocabulary
 * =========================
 * The framing/border options common to BOTH the 2D `ProfilePhoto` and the
 * 3D `ProfileAvatar3D`. The unified `ProfileAvatar` speaks only this shared
 * vocabulary so a single set of props drives whichever renderer is active.
 *
 * @module character/profile/types
 */

/** Renderer the unified avatar shows. */
export type ProfileMode = "2d" | "3d"

/**
 * Framing presets supported by both renderers.
 *
 * (The 2D renderer additionally supports `eye` / `tight` extreme crops; those
 * are 2D-only and intentionally excluded from the shared toggle surface.)
 */
export type SharedProfileZoom = "full" | "head" | "face" | "shoulders" | "torso"

/** Border shape, identical across renderers. */
export type SharedProfileBorder = "circle" | "rounded" | "square" | "none"
