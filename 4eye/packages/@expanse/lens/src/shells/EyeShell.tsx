"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * EyeShell — an almond eye holding a smaller eye inside its iris. The lid
 * blinks slowly while the inner pupil dilates. Reads as visualize / reveal /
 * inner sight.
 */
export function EyeShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensEyeBlink {
      0%, 88%, 100% { transform: scaleY(1); }
      92%           { transform: scaleY(0.12); }
      96%           { transform: scaleY(1); }
    }
    @keyframes lensEyeDilate { 0%, 100% { r: 4px; } 50% { r: 6.5px; } }
    @keyframes lensEyeGleam { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.95; } }
    .lens-eye-lid { transform-origin: 50px 50px; animation: ${anim(on, "lensEyeBlink", dur * 1.5, "ease-in-out")}; }
    .lens-eye-pupil { animation: ${anim(on, "lensEyeDilate", dur)}; }
    .lens-eye-gleam { animation: ${anim(on, "lensEyeGleam", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Eye lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-eye-lid">
        {/* outer almond eye */}
        <path
          d="M14 50 Q50 22 86 50 Q50 78 14 50 Z"
          fill="none"
          stroke={palette.base}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* iris */}
        <circle cx="50" cy="50" r="17" fill="none" stroke={palette.accent} strokeWidth="2.5" />
        {/* the smaller eye nested in the iris */}
        <path
          d="M38 50 Q50 41 62 50 Q50 59 38 50 Z"
          fill="none"
          stroke={palette.base}
          strokeWidth="2"
        />
        <circle className="lens-eye-pupil" cx="50" cy="50" r="4" fill={palette.base} />
        <circle className="lens-eye-gleam" cx="53" cy="47" r="1.6" fill={palette.glow} />
      </g>
    </LensSvg>
  )
}
