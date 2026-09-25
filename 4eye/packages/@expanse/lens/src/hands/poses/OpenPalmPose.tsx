"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, Palm } from "../handParts"

/**
 * OpenPalmPose — an open hand, fingers gently splaying. Reads as offer /
 * reveal / perspective.
 */
export function OpenPalmPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandSplayL { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-4deg); } }
    @keyframes lensHandSplayR { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(4deg); } }
    .lens-hand-splay-l { transform-origin: 39px 54px; animation: ${anim(on, "lensHandSplayL", dur)}; }
    .lens-hand-splay-r { transform-origin: 63px 54px; animation: ${anim(on, "lensHandSplayR", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Open palm"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <Palm cx={50} cy={65} width={32} height={24} stroke={palette.base} />
      <g className="lens-hand-splay-l">
        <Finger x={39} y={54} length={18} angle={-8} stroke={palette.base} />
      </g>
      <Finger x={47} y={54} length={25} angle={-2} stroke={palette.base} />
      <Finger x={55} y={54} length={25} angle={2} stroke={palette.base} />
      <g className="lens-hand-splay-r">
        <Finger x={63} y={54} length={18} angle={8} stroke={palette.base} />
      </g>
      <Finger x={33} y={66} length={17} angle={-55} stroke={palette.accent} />
    </LensSvg>
  )
}
