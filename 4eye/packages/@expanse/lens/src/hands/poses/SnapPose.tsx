"use client"

import { LensSvg, anim, resolveShell } from "../../shells/LensSvg"
import type { LensShellProps } from "../../core/types"
import { Finger, KnuckleRow, Palm } from "../handParts"

/**
 * SnapPose — a hand mid-snap: thumb and middle finger press while a spark
 * bursts off the contact point. Reads as recall / spark / momentum.
 */
export function SnapPose(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensHandSnapSpark {
      0%, 45%, 100% { opacity: 0; transform: scale(0.4); }
      58%           { opacity: 1; transform: scale(1.15); }
      80%           { opacity: 0; transform: scale(1.35); }
    }
    @keyframes lensHandSnapFlick {
      0%, 45%, 100% { transform: rotate(0deg); }
      55%           { transform: rotate(-9deg); }
      70%           { transform: rotate(0deg); }
    }
    .lens-hand-snap-spark { transform-origin: 40px 36px; animation: ${anim(on, "lensHandSnapSpark", dur, "ease-out")}; }
    .lens-hand-snap-flick { transform-origin: 56px 66px; animation: ${anim(on, "lensHandSnapFlick", dur, "ease-out")}; }
  `
  return (
    <LensSvg size={size} title={props.title ?? "Snap"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {/* the spark flying off the snap point */}
      <g className="lens-hand-snap-spark" stroke={palette.glow} strokeWidth="2.5" strokeLinecap="round">
        <line x1="40" y1="28" x2="40" y2="21" />
        <line x1="31" y1="32" x2="26" y2="28" />
        <line x1="49" y1="32" x2="54" y2="28" />
        <circle cx="40" cy="36" r="2.5" fill={palette.glow} stroke="none" />
      </g>
      <g className="lens-hand-snap-flick">
        {/* hand body + curled fingers */}
        <Palm cx={62} cy={68} width={28} height={24} angle={-12} stroke={palette.base} />
        <KnuckleRow x={54} y={58} count={3} step={8} rise={5} stroke={palette.base} />
        {/* middle finger and thumb pressed at the snap point */}
        <Finger x={58} y={66} length={26} width={9} angle={-32} stroke={palette.base} />
        <Finger x={46} y={70} length={22} width={9} angle={2} stroke={palette.accent} />
      </g>
    </LensSvg>
  )
}
