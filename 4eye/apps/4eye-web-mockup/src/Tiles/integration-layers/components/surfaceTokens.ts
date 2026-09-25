"use client";

/**
 * Compatibility shim. The implementation moved to `@4eye/web/components/surface` so the
 * app-realm profile page and the layer panels share one contrast-safe token
 * source; the original names are re-exported here so no integration-layers file
 * had to change its imports.
 *
 * Prefer `useSurface` / `useInk` from `@4eye/web/components/surface` in new code.
 */

export { useSurface as useLayerSurface, useInk as useLayerInk } from "@4eye/web/components/surface";
