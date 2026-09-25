"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, Palm } from "../handParts"

/**
 * WavePose — an open hand rocking side to side from the wrist. Reads as
 * signal / greet / flow.
 */
export function WavePose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandWave { 0%,100% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
    @keyframes lensHandWaveArc { 0%,100% { opacity: 0.2; } 50% { opacity: 0.8; } }
    .lens-hand-wave { transform-origin: 50px 86px; animation: ${anim(on, "lensHandWave", dur)}; }
    .lens-hand-wave-arc { animation: ${anim(on, "lensHandWaveArc", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Wave"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <path
        className="lens-hand-wave-arc"
        d="M22 38 Q26 30 34 27"
        fill="none"
        stroke={palette.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        className="lens-hand-wave-arc"
        d="M78 38 Q74 30 66 27"
        fill="none"
        stroke={palette.accent}
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ animationDelay: `${dur / 2}s` }}
      />
      <g className="lens-hand-wave">
        <Palm cx={50} cy={66} width={30} height={22} stroke={palette.base} />
        <Finger x={40} y={56} length={16} angle={-8} stroke={palette.base} />
        <Finger x={47} y={56} length={21} angle={-2} stroke={palette.base} />
        <Finger x={54} y={56} length={21} angle={2} stroke={palette.base} />
        <Finger x={61} y={56} length={16} angle={8} stroke={palette.base} />
        <Finger x={34} y={66} length={14} angle={-55} stroke={palette.base} />
      </g>
    </LensSvg>
  )
}
