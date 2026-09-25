"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * RingPulseShell — three concentric rings expand outward and fade,
 * staggered. Reads as signal / awareness / broadcast.
 */
export function RingPulseShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const rings = [0, 1, 2]
  const css = `
    @keyframes lensRingPulse {
      0%   { transform: scale(0.3); opacity: 0; }
      20%  { opacity: 0.9; }
      100% { transform: scale(1); opacity: 0; }
    }
    @keyframes lensRingCore { 0%,100% { r: 7px; } 50% { r: 10px; } }
    .lens-ring { transform-origin: 50px 50px; animation: ${anim(on, "lensRingPulse", dur, "ease-out")}; }
    .lens-ring-core { animation: ${anim(on, "lensRingCore", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Pulse lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {rings.map((i) => (
        <circle
          key={i}
          className="lens-ring"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={i % 2 === 0 ? palette.base : palette.accent}
          strokeWidth="3"
          style={{ animationDelay: `${(i * dur) / 3}s` }}
        />
      ))}
      <circle className="lens-ring-core" cx="50" cy="50" r="8" fill={palette.base} />
      <circle cx="50" cy="50" r="3" fill={palette.glow} />
    </LensSvg>
  )
}
