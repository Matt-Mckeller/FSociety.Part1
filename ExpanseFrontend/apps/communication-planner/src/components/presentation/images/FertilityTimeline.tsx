"use client"

import { gamingColors } from "../themes/gamingTheme"

interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
}

/**
 * Modern fertility options timeline showing extended possibilities
 * For: m1-b7 (Modern Options)
 */
export function FertilityTimeline({
  width = "100%",
  height = 180,
  className,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 140"
      width={width}
      height={height}
      className={className}
      style={{ maxWidth: "100%" }}
    >
      <defs>
        <filter id="glow-cyan-6" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-success" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gamingColors.neonCyan} />
          <stop offset="50%" stopColor={gamingColors.neonPink} />
          <stop offset="100%" stopColor={gamingColors.success} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="140" fill={gamingColors.darkBg} rx="8" />

      {/* Title */}
      <text x="200" y="20" textAnchor="middle" fill={gamingColors.textPrimary} fontSize="11" fontWeight="600">
        MODERN OPTIONS: YOUR TIMELINE IS FLEXIBLE
      </text>

      {/* Main timeline bar */}
      <rect
        x="30"
        y="60"
        width="340"
        height="6"
        rx="3"
        fill="url(#timeline-gradient)"
        filter="url(#glow-cyan-6)"
        opacity="0.8"
      />

      {/* Age markers */}
      {[
        { x: 30, label: "25", current: false },
        { x: 100, label: "30", current: true },
        { x: 170, label: "35", current: false },
        { x: 240, label: "40", current: false },
        { x: 310, label: "45+", current: false },
      ].map((marker, i) => (
        <g key={i}>
          <circle
            cx={marker.x}
            cy="63"
            r={marker.current ? 8 : 5}
            fill={marker.current ? gamingColors.neonCyan : gamingColors.textSecondary}
            filter={marker.current ? "url(#glow-cyan-6)" : undefined}
          />
          <text
            x={marker.x}
            y="85"
            textAnchor="middle"
            fill={marker.current ? gamingColors.neonCyan : gamingColors.textMuted}
            fontSize={marker.current ? "10" : "9"}
            fontWeight={marker.current ? "600" : "400"}
          >
            {marker.label}
          </text>
          {marker.current && (
            <text x={marker.x} y="95" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="7" opacity="0.8">
              YOU
            </text>
          )}
        </g>
      ))}

      {/* Option icons with labels */}
      {/* Option 1: Egg Freezing */}
      <g transform="translate(70, 35)">
        <circle cx="12" cy="10" r="10" fill={gamingColors.neonCyan} opacity="0.2" />
        <text x="12" y="14" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="10">❄️</text>
        <text x="12" y="-2" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="7">Freeze</text>
      </g>

      {/* Option 2: Natural later */}
      <g transform="translate(155, 35)">
        <circle cx="12" cy="10" r="10" fill={gamingColors.neonPink} opacity="0.2" />
        <text x="12" y="14" textAnchor="middle" fill={gamingColors.neonPink} fontSize="10">🤰</text>
        <text x="12" y="-2" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="7">Natural</text>
      </g>

      {/* Option 3: IVF */}
      <g transform="translate(220, 35)">
        <circle cx="12" cy="10" r="10" fill={gamingColors.neonPurple} opacity="0.2" />
        <text x="12" y="14" textAnchor="middle" fill={gamingColors.neonPurple} fontSize="10">🧬</text>
        <text x="12" y="-2" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="7">IVF</text>
      </g>

      {/* Option 4: Surrogacy */}
      <g transform="translate(285, 35)">
        <circle cx="12" cy="10" r="10" fill={gamingColors.success} opacity="0.2" />
        <text x="12" y="14" textAnchor="middle" fill={gamingColors.success} fontSize="10">👪</text>
        <text x="12" y="-2" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="7">Surrogacy</text>
      </g>

      {/* Extending arrow */}
      <g transform="translate(350, 60)">
        <path
          d="M 0 3 L 20 3"
          stroke={gamingColors.success}
          strokeWidth="2"
          strokeDasharray="4 2"
          filter="url(#glow-success)"
        />
        <polygon
          points="22,3 16,0 16,6"
          fill={gamingColors.success}
          filter="url(#glow-success)"
        />
      </g>

      {/* Footer message */}
      <text x="200" y="120" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="9">
        Technology keeps extending what&apos;s possible
      </text>
      <text x="200" y="132" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="8" fontWeight="500" filter="url(#glow-cyan-6)">
        Your timeline is yours to control
      </text>
    </svg>
  )
}
