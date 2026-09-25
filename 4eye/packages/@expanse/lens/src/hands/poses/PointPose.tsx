"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, Palm } from "../handParts"

/**
 * PointPose — a fist with the index finger extended, tapping toward what it
 * found. Reads as find / target / detect.
 */
export function PointPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandTap { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes lensHandTarget { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
    .lens-hand-tap { animation: ${anim(on, "lensHandTap", dur)}; }
    .lens-hand-target { animation: ${anim(on, "lensHandTarget", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Point"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      <circle className="lens-hand-target" cx="42" cy="22" r="3.5" fill={palette.glow} />
      <g className="lens-hand-tap">
        <Finger x={42} y={50} length={22} stroke={palette.accent} />
      </g>
      <Palm cx={50} cy={62} width={34} height={26} stroke={palette.base} />
      {[50, 58, 64].map((x) => (
        <Finger key={x} x={x} y={50} length={6} width={8} stroke={palette.base} />
      ))}
      <Finger x={36} y={68} length={16} angle={90} stroke={palette.base} />
    </LensSvg>
  )
}
