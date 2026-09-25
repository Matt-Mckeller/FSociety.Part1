"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * PrismShell — a triangle slowly rotates while a refracted beam splits
 * into a small spectrum. Reads as reframe / perspective / insight.
 */
export function PrismShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensPrismTilt { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
    @keyframes lensPrismBeam { 0%,100% { opacity: 0.35; } 50% { opacity: 0.9; } }
    .lens-prism { transform-origin: 50px 52px; animation: ${anim(on, "lensPrismTilt", dur)}; }
    .lens-prism-beam { animation: ${anim(on, "lensPrismBeam", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Prism lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {/* incoming beam */}
      <line x1="6" y1="50" x2="42" y2="50" stroke={palette.base} strokeWidth="3" />
      {/* refracted spectrum */}
      <g className="lens-prism-beam">
        <line x1="58" y1="50" x2="92" y2="36" stroke="#ef4444" strokeWidth="2.2" />
        <line x1="58" y1="50" x2="92" y2="46" stroke={palette.accent} strokeWidth="2.2" />
        <line x1="58" y1="50" x2="92" y2="56" stroke="#22c55e" strokeWidth="2.2" />
        <line x1="58" y1="50" x2="92" y2="66" stroke="#3b82f6" strokeWidth="2.2" />
      </g>
      <g className="lens-prism">
        <path d="M50 26 L72 66 L28 66 Z" fill="none" stroke={palette.base} strokeWidth="3" strokeLinejoin="round" />
        <path d="M50 26 L72 66 L28 66 Z" fill={palette.glow} opacity="0.18" />
      </g>
    </LensSvg>
  )
}
