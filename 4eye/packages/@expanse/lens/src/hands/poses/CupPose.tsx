"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger } from "../handParts"

/**
 * CupPose — cupped hands receiving a falling point of light. Reads as
 * gather / receive / synthesize.
 */
export function CupPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandCupDrop {
      0%   { transform: translateY(0); opacity: 0; }
      25%  { opacity: 1; }
      70%  { transform: translateY(26px); opacity: 1; }
      100% { transform: translateY(26px); opacity: 0; }
    }
    @keyframes lensHandCupBowl { 0%,68%,100% { transform: translateY(0); } 78% { transform: translateY(1.5px); } }
    .lens-hand-cup-drop { animation: ${anim(on, "lensHandCupDrop", dur, "ease-in")}; }
    .lens-hand-cup-bowl { animation: ${anim(on, "lensHandCupBowl", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Cupped hands"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <circle className="lens-hand-cup-drop" cx="50" cy="30" r="4" fill={palette.glow} />
      <g className="lens-hand-cup-bowl">
        <path
          d="M26 52 Q28 72 50 74 Q72 72 74 52"
          fill="none"
          stroke={palette.base}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M34 54 Q36 66 50 67 Q64 66 66 54"
          fill="none"
          stroke={palette.accent}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
      <Finger x={28} y={90} length={14} angle={20} stroke={palette.base} />
      <Finger x={72} y={90} length={14} angle={-20} stroke={palette.base} />
    </LensSvg>
  )
}
