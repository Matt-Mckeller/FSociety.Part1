"use client"

import { gamingColors } from "../themes/gamingTheme"

interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
}

/**
 * Timeline showing experiences as stepping stones leading to present opportunity
 * For: m1-b1 (Opening Reframe)
 */
export function SteppingStonesTimeline({
  width = "100%",
  height = 200,
  className,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 120"
      width={width}
      height={height}
      className={className}
      style={{ maxWidth: "100%" }}
    >
      <defs>
        {/* Glow filter */}
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Gradient for path */}
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gamingColors.textMuted} />
          <stop offset="50%" stopColor={gamingColors.neonCyan} />
          <stop offset="100%" stopColor={gamingColors.neonPink} />
        </linearGradient>
      </defs>

      {/* Background subtle grid */}
      <rect width="400" height="120" fill={gamingColors.darkBg} rx="8" />

      {/* Glowing path line */}
      <path
        d="M 30 60 Q 100 30, 140 60 T 260 60 T 370 60"
        stroke="url(#path-gradient)"
        strokeWidth="2"
        fill="none"
        filter="url(#glow-cyan)"
        opacity="0.7"
      />

      {/* Stepping stones */}
      {[
        { x: 40, label: "Past", color: gamingColors.textMuted, opacity: 0.5 },
        { x: 120, label: "Learned", color: gamingColors.textSecondary, opacity: 0.7 },
        { x: 200, label: "Grew", color: gamingColors.neonCyan, opacity: 0.85 },
        { x: 280, label: "NOW", color: gamingColors.neonCyan, opacity: 1 },
        { x: 360, label: "Future", color: gamingColors.neonPink, opacity: 1 },
      ].map((stone, i) => (
        <g key={i}>
          {/* Stone circle */}
          <circle
            cx={stone.x}
            cy="60"
            r={i === 3 ? 18 : i === 4 ? 14 : 12}
            fill={stone.color}
            opacity={stone.opacity}
            filter={i >= 2 ? "url(#glow-cyan)" : undefined}
          />
          {/* Inner glow for current */}
          {i === 3 && (
            <circle
              cx={stone.x}
              cy="60"
              r="22"
              fill="none"
              stroke={gamingColors.neonCyan}
              strokeWidth="2"
              opacity="0.4"
              filter="url(#glow-cyan)"
            />
          )}
          {/* Label */}
          <text
            x={stone.x}
            y={i === 3 ? 95 : 90}
            textAnchor="middle"
            fill={stone.color}
            fontSize={i === 3 ? "12" : "10"}
            fontWeight={i >= 3 ? "600" : "400"}
            opacity={stone.opacity}
          >
            {stone.label}
          </text>
        </g>
      ))}

      {/* Arrow at end */}
      <polygon
        points="375,60 365,54 365,66"
        fill={gamingColors.neonPink}
        filter="url(#glow-pink)"
      />
    </svg>
  )
}
