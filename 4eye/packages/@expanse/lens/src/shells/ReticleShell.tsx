"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * ReticleShell — a focus crosshair: ticks rotate, brackets breathe, the
 * center dot pulses as it "locks on". Reads as focus / target / precision.
 */
export function ReticleShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensReticleSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes lensReticleLock { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.55); opacity: 0.7; } }
    @keyframes lensReticleBracket { 0%,100% { transform: scale(1); } 50% { transform: scale(0.9); } }
    .lens-ret-ticks { transform-origin: 50px 50px; animation: ${anim(on, "lensReticleSpin", dur * 2, "linear")}; }
    .lens-ret-brackets { transform-origin: 50px 50px; animation: ${anim(on, "lensReticleBracket", dur)}; }
    .lens-ret-dot { transform-origin: 50px 50px; animation: ${anim(on, "lensReticleLock", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Reticle lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-ret-ticks" stroke={palette.accent} strokeWidth="2">
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1="50" y1="12" x2="50" y2="22" transform={`rotate(${a} 50 50)`} />
        ))}
      </g>
      <g className="lens-ret-brackets" fill="none" stroke={palette.base} strokeWidth="3" strokeLinecap="round">
        <path d="M30 22 H22 V30" />
        <path d="M70 22 H78 V30" />
        <path d="M30 78 H22 V70" />
        <path d="M70 78 H78 V70" />
      </g>
      <circle cx="50" cy="50" r="20" fill="none" stroke={palette.base} strokeWidth="1.5" opacity="0.6" />
      <circle className="lens-ret-dot" cx="50" cy="50" r="7" fill={palette.base} />
    </LensSvg>
  )
}
