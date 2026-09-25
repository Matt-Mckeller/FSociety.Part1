/**
 * Shared rendering helpers for lens shells.
 *
 * Animation strategy: each shell embeds a scoped <style> block of CSS
 * @keyframes inside its own <svg>. Keyframe names are namespaced per shell
 * type (identical duplicate definitions across instances are harmless).
 * Motion is driven by CSS animations so shells are SSR-safe and need no
 * runtime animation library. Reduced-motion is always respected.
 */

import React from "react"
import type { LensPalette, LensShellProps } from "../core/types"
import { paletteFor } from "../core/palettes"
import { durationFor } from "../core/motion"

export interface ResolvedShell {
  size: number
  palette: LensPalette
  /** Base duration in seconds for the motion personality. */
  dur: number
  /** Whether animation should run. */
  on: boolean
}

/** Normalize shell props into concrete render values. */
export function resolveShell(props: LensShellProps): ResolvedShell {
  const { size = 64, palette, motion = "steady", animated = true } = props
  return {
    size,
    palette: palette ?? paletteFor("neutral"),
    dur: durationFor(motion),
    on: animated,
  }
}

/** A reduced-motion guard appended to every shell's <style>. */
export const REDUCED_MOTION_GUARD = `@media (prefers-reduced-motion: reduce){*{animation:none!important}}`

export interface LensSvgProps {
  size: number
  title?: string
  className?: string
  /** Scoped CSS (keyframes + classes) for this shell. */
  css: string
  children: React.ReactNode
}

/** Square SVG wrapper with a 0 0 100 100 viewBox and embedded styles. */
export function LensSvg({ size, title, className, css, children }: LensSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <style>{css + REDUCED_MOTION_GUARD}</style>
      {children}
    </svg>
  )
}

/** Build a CSS animation shorthand string, or "none" when disabled. */
export function anim(on: boolean, name: string, seconds: number, ease = "ease-in-out", extra = ""): string {
  if (!on) return "none"
  return `${name} ${seconds}s ${ease} infinite ${extra}`.trim()
}
