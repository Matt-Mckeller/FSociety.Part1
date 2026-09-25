"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * OrbitShell — three satellites orbit a core on tilted rings. Reads as
 * systems / connection / synthesis.
 */
export function OrbitShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensOrbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes lensOrbitSpinRev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    @keyframes lensOrbitCore { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } }
    .lens-orbit-a { transform-origin: 50px 50px; animation: ${anim(on, "lensOrbitSpin", dur, "linear")}; }
    .lens-orbit-b { transform-origin: 50px 50px; animation: ${anim(on, "lensOrbitSpinRev", dur * 1.4, "linear")}; }
    .lens-orbit-core { animation: ${anim(on, "lensOrbitCore", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Orbit lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-orbit-a">
        <ellipse cx="50" cy="50" rx="36" ry="16" fill="none" stroke={palette.base} strokeWidth="1.5" opacity="0.5" />
        <circle cx="86" cy="50" r="6" fill={palette.base} />
      </g>
      <g className="lens-orbit-b" transform="rotate(60 50 50)">
        <ellipse cx="50" cy="50" rx="36" ry="16" fill="none" stroke={palette.accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx="14" cy="50" r="5" fill={palette.accent} />
      </g>
      <circle className="lens-orbit-core" cx="50" cy="50" r="9" fill={palette.base} />
      <circle cx="47" cy="47" r="2.5" fill={palette.glow} />
    </LensSvg>
  )
}
