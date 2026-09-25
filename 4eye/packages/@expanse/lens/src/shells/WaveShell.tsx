"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * WaveShell — two calm sine waves drift in opposite directions while a
 * soft halo breathes. Reads as regulate / breathe / heal.
 */
export function WaveShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensWaveDriftL { from { transform: translateX(0); } to { transform: translateX(-30px); } }
    @keyframes lensWaveDriftR { from { transform: translateX(0); } to { transform: translateX(30px); } }
    @keyframes lensWaveHalo { 0%,100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.08); opacity: 0.8; } }
    .lens-wave-a { animation: ${anim(on, "lensWaveDriftL", dur, "linear")}; }
    .lens-wave-b { animation: ${anim(on, "lensWaveDriftR", dur, "linear")}; }
    .lens-wave-halo { transform-origin: 50px 50px; animation: ${anim(on, "lensWaveHalo", dur)}; }
  `
  // A 60px-wavelength path tiled wide so the -30/+30 drift loops seamlessly.
  const wave = "M-10 0 q 7.5 -10 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0 t 15 0"
  return (
    <LensSvg size={size} title={props.title ?? "Wave lens"} className={props.className} css={css}>
      <circle className="lens-wave-halo" cx="50" cy="50" r="42" fill={palette.soft} />
      <clipPath id="lensWaveClip">
        <circle cx="50" cy="50" r="40" />
      </clipPath>
      <g clipPath="url(#lensWaveClip)">
        <g className="lens-wave-a" transform="translate(0 42)">
          <path d={wave} fill="none" stroke={palette.base} strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="lens-wave-b" transform="translate(0 58)">
          <path d={wave} fill="none" stroke={palette.accent} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>
      <circle cx="50" cy="50" r="40" fill="none" stroke={palette.glow} strokeWidth="2" opacity="0.6" />
    </LensSvg>
  )
}
