"use client"

import { LensSvg, anim, resolveShell } from "./LensSvg"
import type { LensShellProps } from "../core/types"

/**
 * VoiceShell — a small origin dot with three signal arcs fanning out like a
 * voice / wifi mark; the arcs light up in sequence as the signal carries.
 * Reads as translate / speak / express.
 */
export function VoiceShell(props: LensShellProps) {
  const { size, palette, dur, on } = resolveShell(props)
  const css = `
    @keyframes lensVoiceArc {
      0%, 100% { opacity: 0.25; }
      12%      { opacity: 1; }
      45%      { opacity: 0.25; }
    }
    @keyframes lensVoiceDot { 0%, 100% { r: 4px; } 50% { r: 5.5px; } }
    .lens-voice-arc { animation: ${anim(on, "lensVoiceArc", dur, "ease-out")}; }
    .lens-voice-dot { animation: ${anim(on, "lensVoiceDot", dur)}; }
  `
  // Three arcs centered on the origin dot at (32, 68), fanning up-right.
  const arcs = [
    { r: 14, width: 3 },
    { r: 25, width: 3 },
    { r: 36, width: 3 },
  ]
  return (
    <LensSvg size={size} title={props.title ?? "Voice lens"} className={props.className} css={css}>
      <circle cx="50" cy="50" r="44" fill={palette.soft} />
      {arcs.map(({ r, width }, i) => (
        <path
          key={r}
          className="lens-voice-arc"
          d={`M ${32 + r * Math.cos(-Math.PI / 12)} ${68 + r * Math.sin(-Math.PI / 12)}
              A ${r} ${r} 0 0 0 ${32 + r * Math.cos((-5 * Math.PI) / 12)} ${68 + r * Math.sin((-5 * Math.PI) / 12)}`}
          fill="none"
          stroke={i === 1 ? palette.accent : palette.base}
          strokeWidth={width}
          strokeLinecap="round"
          style={{ animationDelay: `${(i * dur) / 5}s` }}
        />
      ))}
      <circle className="lens-voice-dot" cx="32" cy="68" r="4" fill={palette.base} />
      <circle cx="32" cy="68" r="1.8" fill={palette.glow} />
    </LensSvg>
  )
}
