"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * ShieldShell — a shield outline with a diagonal shimmer that sweeps
 * across and a checkmark that draws in. Reads as protect / guard / safe.
 */
export function ShieldShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensShieldShine { 0% { transform: translateX(-50px); } 60%,100% { transform: translateX(50px); } }
    @keyframes lensShieldPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.04); } }
    .lens-shield { transform-origin: 50px 50px; animation: ${anim(on, "lensShieldPulse", dur)}; }
    .lens-shield-shine { animation: ${anim(on, "lensShieldShine", dur, "ease-in-out")}; }
  `
  const shieldPath = "M50 16 L80 26 V52 C80 70 66 80 50 86 C34 80 20 70 20 52 V26 Z"
  return (
    <LensSvg size={size} title={props.title ?? "Shield lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-shield">
        <path d={shieldPath} fill={palette.glow} opacity="0.22" />
        <path d={shieldPath} fill="none" stroke={palette.base} strokeWidth="3.5" strokeLinejoin="round" />
        <clipPath id="lensShieldClip">
          <path d={shieldPath} />
        </clipPath>
        <g clipPath="url(#lensShieldClip)">
          <rect className="lens-shield-shine" x="30" y="10" width="14" height="90" fill={palette.accent} opacity="0.35" transform="rotate(18 50 50)" />
        </g>
        <path d="M40 52 L47 60 L62 40" fill="none" stroke={palette.accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </LensSvg>
  )
}
