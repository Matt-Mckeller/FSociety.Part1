"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * ConvergeShell — the inverse of RingPulse: rings travel inward and fade
 * into a brightening core, pulling what matters to the center. Reads as
 * summarize / gather / essence.
 */
export function ConvergeShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const rings = [0, 1, 2]
  const css = `
    @keyframes lensConvergeRing {
      0%   { transform: scale(1); opacity: 0; }
      20%  { opacity: 0.9; }
      100% { transform: scale(0.25); opacity: 0; }
    }
    @keyframes lensConvergeCore {
      0%, 100% { r: 6px; opacity: 0.7; }
      50%      { r: 10px; opacity: 1; }
    }
    .lens-converge-ring { transform-origin: 50px 50px; animation: ${anim(on, "lensConvergeRing", dur, "ease-in")}; }
    .lens-converge-core { animation: ${anim(on, "lensConvergeCore", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Converge lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {rings.map((i) => (
        <circle
          key={i}
          className="lens-converge-ring"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={i % 2 === 0 ? palette.base : palette.accent}
          strokeWidth="3"
          style={{ animationDelay: `${(i * dur) / 3}s` }}
        />
      ))}
      <circle className="lens-converge-core" cx="50" cy="50" r="6" fill={palette.base} />
      <circle cx="50" cy="50" r="3" fill={palette.glow} />
    </LensSvg>
  )
}
