"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, Palm } from "../handParts"

/**
 * PeacePose — index and middle fingers raised in a V, bouncing slightly.
 * Reads as celebrate / win.
 */
export function PeacePose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandVLeft { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-3deg); } }
    @keyframes lensHandVRight { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(3deg); } }
    .lens-hand-v-l { transform-origin: 44px 56px; animation: ${anim(on, "lensHandVLeft", dur)}; }
    .lens-hand-v-r { transform-origin: 56px 56px; animation: ${anim(on, "lensHandVRight", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Peace sign"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-hand-v-l">
        <Finger x={44} y={56} length={30} angle={-12} stroke={palette.accent} />
      </g>
      <g className="lens-hand-v-r">
        <Finger x={56} y={56} length={30} angle={12} stroke={palette.accent} />
      </g>
      <Palm cx={50} cy={67} width={32} height={24} stroke={palette.base} />
      <Finger x={62} y={56} length={6} width={8} stroke={palette.base} />
      <Finger x={36} y={64} length={14} angle={40} stroke={palette.base} />
    </LensSvg>
  )
}
