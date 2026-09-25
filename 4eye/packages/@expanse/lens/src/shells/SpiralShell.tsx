"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * SpiralShell — a logarithmic spiral slowly rotates while a traveller dot
 * winds inward, evoking compounding attention / momentum / recall.
 */
export function SpiralShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensSpiralSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes lensSpiralCore { 0%,100% { opacity: 1; } 50% { opacity: 0.55; } }
    .lens-spiral { transform-origin: 50px 50px; animation: ${anim(on, "lensSpiralSpin", dur, "linear")}; }
    .lens-spiral-core { animation: ${anim(on, "lensSpiralCore", dur)}; }
  `
  // Approximate expanding spiral via chained quadratic curves.
  const spiral =
    "M50 50 q 4 -4 8 0 q 6 6 0 14 q -10 10 -22 0 q -14 -14 0 -30 q 18 -18 38 0 q 22 22 0 44"
  return (
    <LensSvg size={size} title={props.title ?? "Spiral lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-spiral">
        <path d={spiral} fill="none" stroke={palette.base} strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="94" r="4.5" fill={palette.accent} />
      </g>
      <circle className="lens-spiral-core" cx="50" cy="50" r="6" fill={palette.base} />
      <circle cx="48" cy="48" r="2" fill={palette.glow} />
    </LensSvg>
  )
}
