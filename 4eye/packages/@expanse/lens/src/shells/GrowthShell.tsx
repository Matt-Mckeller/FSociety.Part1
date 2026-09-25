"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * GrowthShell — three bars rise to staggered heights as a sprout leaf
 * unfurls above. Reads as improve / progress / compound.
 */
export function GrowthShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const bars = [
    { x: 30, h: 22 },
    { x: 46, h: 34 },
    { x: 62, h: 48 },
  ]
  const css = `
    @keyframes lensGrowRise { 0% { transform: scaleY(0.2); } 60% { transform: scaleY(1.05); } 100% { transform: scaleY(1); } }
    @keyframes lensGrowLeaf { 0% { transform: scale(0) rotate(-20deg); opacity: 0; } 70% { opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
    .lens-grow-bar { transform-origin: bottom; transform-box: fill-box; animation: ${anim(on, "lensGrowRise", dur, "ease-out")}; }
    .lens-grow-leaf { transform-origin: 70px 32px; animation: ${anim(on, "lensGrowLeaf", dur, "ease-out")}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Growth lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <line x1="22" y1="78" x2="78" y2="78" stroke={palette.base} strokeWidth="2.5" opacity="0.5" />
      {bars.map((b, i) => (
        <rect
          key={i}
          className="lens-grow-bar"
          x={b.x}
          y={78 - b.h}
          width="11"
          height={b.h}
          rx="3"
          fill={i === 2 ? palette.accent : palette.base}
          style={{ animationDelay: `${i * dur * 0.15}s` }}
        />
      ))}
      <g className="lens-grow-leaf">
        <path d="M68 32 q 10 -10 18 -4 q -2 12 -16 12 Z" fill={palette.accent} />
        <path d="M68 32 q -8 -6 -2 -16" fill="none" stroke={palette.base} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </LensSvg>
  )
}
