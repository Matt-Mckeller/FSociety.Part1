"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * CondenseShell — three concentric ring layers; a bright highlight selects
 * outer → middle → inner in sequence, ending on the smallest piece with a
 * glow. Reads as distill / tighten / keep only the essence.
 */
export function CondenseShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  // Each ring "lights up" for a third of the cycle; the inner ring's pass
  // ends the loop so the eye lands on the condensed center.
  const css = `
    @keyframes lensCondenseSelect {
      0%, 100% { opacity: 0; stroke-width: 3; }
      8%       { opacity: 1; stroke-width: 4.5; }
      28%      { opacity: 1; }
      36%      { opacity: 0; stroke-width: 3; }
    }
    @keyframes lensCondenseCore {
      0%, 60%  { r: 5px; opacity: 0.6; }
      78%      { r: 8px; opacity: 1; }
      100%     { r: 5px; opacity: 0.6; }
    }
    .lens-condense-select { animation: ${anim(on, "lensCondenseSelect", dur, "ease-in-out")}; opacity: 0; }
    .lens-condense-core { animation: ${anim(on, "lensCondenseCore", dur, "ease-out")}; }
  `
  const layers = [
    { r: 40, delay: 0 },
    { r: 27, delay: dur / 3 },
    { r: 14, delay: (2 * dur) / 3 },
  ]
  return (
    <LensSvg size={size} title={props.title ?? "Condense lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {/* the three static layers */}
      {layers.map(({ r }) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={palette.base} strokeWidth="2" opacity="0.45" />
      ))}
      {/* the moving selection highlight, walking inward */}
      {layers.map(({ r, delay }) => (
        <circle
          key={`sel-${r}`}
          className="lens-condense-select"
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={palette.accent}
          strokeWidth="3"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      <circle className="lens-condense-core" cx="50" cy="50" r="5" fill={palette.glow} />
    </LensSvg>
  )
}
