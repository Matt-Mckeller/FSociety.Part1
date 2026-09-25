"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, KnuckleRow, Palm } from "../handParts"

/**
 * FistPose — a closed fist: a rounded palm with a scalloped knuckle row and
 * the thumb wrapped across the front. Gently clenches. Reads as strength /
 * protect / hold.
 */
export function FistPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandClench { 0%,100% { transform: scale(1); } 50% { transform: scale(0.95); } }
    .lens-hand-clench { transform-origin: 50px 58px; animation: ${anim(on, "lensHandClench", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Fist"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <g className="lens-hand-clench">
        <Palm cx={50} cy={62} width={38} height={30} stroke={palette.base} />
        {/* folded knuckles along the top */}
        <KnuckleRow x={32} y={49} count={4} step={9} rise={6} stroke={palette.base} />
        {/* thumb wrapped across the front */}
        <Finger x={36} y={72} length={22} width={10} angle={62} stroke={palette.accent} />
      </g>
    </LensSvg>
  )
}
