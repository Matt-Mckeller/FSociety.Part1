"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * BloomShell — eight petals scale outward from a bright core in a gentle
 * bloom. Reads as positivity / gratitude / flourish.
 */
export function BloomShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const petals = Array.from({ length: 8 })
  const css = `
    @keyframes lensBloomOpen { 0%,100% { transform: scale(0.55); opacity: 0.65; } 50% { transform: scale(1); opacity: 1; } }
    @keyframes lensBloomCore { 0%,100% { r: 7px; } 50% { r: 10px; } }
    .lens-bloom { transform-origin: 50px 50px; animation: ${anim(on, "lensBloomOpen", dur)}; }
    .lens-bloom-core { animation: ${anim(on, "lensBloomCore", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Bloom lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-bloom">
        {petals.map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="26"
            rx="7"
            ry="18"
            fill={i % 2 === 0 ? palette.base : palette.accent}
            opacity="0.85"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </g>
      <circle className="lens-bloom-core" cx="50" cy="50" r="8" fill={palette.glow} />
      <circle cx="50" cy="50" r="4" fill="#fff" opacity="0.9" />
    </LensSvg>
  )
}
