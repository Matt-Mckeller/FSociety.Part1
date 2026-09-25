"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger } from "../handParts"

/**
 * HeartPose — two hands shaping a heart, pulsing softly. Reads as care /
 * encourage / flourish.
 */
export function HeartPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandHeartBeat { 0%,100% { transform: scale(1); } 50% { transform: scale(1.07); } }
    @keyframes lensHandHeartFill { 0%,100% { opacity: 0.12; } 50% { opacity: 0.3; } }
    .lens-hand-heart { transform-origin: 50px 54px; animation: ${anim(on, "lensHandHeartBeat", dur)}; }
    .lens-hand-heart-fill { animation: ${anim(on, "lensHandHeartFill", dur)}; }
  `
  const heart =
    "M50 74 C34 62 28 47 37 39 C44 33 50 40 50 46 C50 40 56 33 63 39 C72 47 66 62 50 74 Z"
  return (
    <LensSvg size={size} title={props.title ?? "Heart hands"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {/* the hands forming it from below */}
      <Finger x={36} y={88} length={16} angle={28} stroke={palette.base} />
      <Finger x={64} y={88} length={16} angle={-28} stroke={palette.base} />
      <g className="lens-hand-heart">
        <path className="lens-hand-heart-fill" d={heart} fill={palette.glow} />
        <path d={heart} fill="none" stroke={palette.accent} strokeWidth="3" strokeLinejoin="round" />
      </g>
    </LensSvg>
  )
}
