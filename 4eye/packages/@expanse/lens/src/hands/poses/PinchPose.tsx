"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, KnuckleRow, Palm } from "../handParts"

/**
 * PinchPose — a side-view hand with thumb and index closing on a point of
 * light; the rest of the fingers curl into the palm. Reads as distill /
 * precision / focus.
 */
export function PinchPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  // Thumb and index tips converge on the held point, then ease back open.
  const css = `
    @keyframes lensHandPinchIndex { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(6deg); } }
    @keyframes lensHandPinchThumb { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-7deg); } }
    @keyframes lensHandPinchSpark { 0%,100% { opacity: 0.5; r: 3px; } 50% { opacity: 1; r: 4.5px; } }
    .lens-hand-pinch-index { transform-origin: 60px 70px; animation: ${anim(on, "lensHandPinchIndex", dur)}; }
    .lens-hand-pinch-thumb { transform-origin: 44px 72px; animation: ${anim(on, "lensHandPinchThumb", dur)}; }
    .lens-hand-pinch-spark { animation: ${anim(on, "lensHandPinchSpark", dur)}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Pinch"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {/* curled hand body */}
      <Palm cx={62} cy={72} width={26} height={22} angle={-8} stroke={palette.base} />
      <KnuckleRow x={54} y={62} count={3} step={8} rise={5} stroke={palette.base} />
      {/* index reaching up to the pinch point */}
      <g className="lens-hand-pinch-index">
        <Finger x={60} y={70} length={30} width={9} angle={-20} stroke={palette.base} />
      </g>
      {/* thumb reaching up to meet it */}
      <g className="lens-hand-pinch-thumb">
        <Finger x={44} y={72} length={26} width={9} angle={8} stroke={palette.accent} />
      </g>
      {/* the held essence, in the gap between the tips */}
      <circle className="lens-hand-pinch-spark" cx="50" cy="43" r="3.5" fill={palette.glow} />
    </LensSvg>
  )
}
