"use client"

/**
 * WatchSvg — extracted from VisionWatchCharacter for the "watch" device
 * variant. Unchanged behavior: smartwatch with a pulsing notification dot.
 */

export const WATCH_W = 56
export const WATCH_H = 36

export function WatchSvg() {
  return (
    <svg
      width={WATCH_W}
      height={WATCH_H}
      viewBox="0 0 56 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Strap */}
      <rect x={4} y={14} width={48} height={8} rx={2} fill="#1f2937" opacity={0.85} />
      {/* Body */}
      <rect x={14} y={6} width={28} height={24} rx={6} fill="#0f172a" stroke="#cbd5e1" strokeWidth={1.2} />
      {/* Face */}
      <rect x={17} y={9} width={22} height={18} rx={3.5} fill="#0ea5e9" opacity={0.18} />
      {/* Tick marks */}
      <circle cx={28} cy={11} r={0.8} fill="#cbd5e1" />
      <circle cx={28} cy={25} r={0.8} fill="#cbd5e1" />
      <circle cx={20} cy={18} r={0.8} fill="#cbd5e1" />
      <circle cx={36} cy={18} r={0.8} fill="#cbd5e1" />
      {/* Hands */}
      <line x1={28} y1={18} x2={28} y2={12.5} stroke="#7dd3fc" strokeWidth={1.2} strokeLinecap="round" />
      <line x1={28} y1={18} x2={33} y2={18} stroke="#7dd3fc" strokeWidth={1} strokeLinecap="round" />
      {/* Notification dot */}
      <circle className="watch-dot" cx={36} cy={10} r={2.2} fill="#f59e0b" />
    </svg>
  )
}
