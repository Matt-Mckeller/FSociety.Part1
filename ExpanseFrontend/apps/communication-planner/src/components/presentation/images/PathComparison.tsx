"use client"

import { gamingColors } from "../themes/gamingTheme"

interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
}

/**
 * Fork in road showing rushed vs intentional path outcomes
 * For: m1-b6 (Early Marriage Trap)
 */
export function PathComparison({
  width = "100%",
  height = 220,
  className,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 180"
      width={width}
      height={height}
      className={className}
      style={{ maxWidth: "100%" }}
    >
      <defs>
        <filter id="glow-cyan-5" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="good-path" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gamingColors.neonCyan} />
          <stop offset="100%" stopColor={gamingColors.success} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="180" fill={gamingColors.darkBg} rx="8" />

      {/* Starting point */}
      <circle cx="40" cy="90" r="10" fill={gamingColors.textSecondary} opacity="0.8" />
      <text x="40" y="115" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="9">
        NOW
      </text>

      {/* PATH 1: Rushed (top) - problematic */}
      <g>
        {/* Path line */}
        <path
          d="M 50 85 Q 100 60, 150 50 T 280 40 L 340 45"
          stroke={gamingColors.textMuted}
          strokeWidth="3"
          fill="none"
          opacity="0.5"
          strokeDasharray="8 4"
        />
        
        {/* Obstacles/warning signs */}
        <g transform="translate(100, 40)">
          <text x="0" y="0" fill={gamingColors.warning} fontSize="14">⚠️</text>
        </g>
        <g transform="translate(180, 30)">
          <text x="0" y="0" fill={gamingColors.textMuted} fontSize="12">❓</text>
        </g>
        <g transform="translate(230, 35)">
          <text x="0" y="0" fill={gamingColors.error} fontSize="12">😰</text>
        </g>
        
        {/* End state (negative) */}
        <g transform="translate(340, 30)">
          <rect x="-25" y="-5" width="50" height="35" rx="4" fill={gamingColors.cardBg} stroke={gamingColors.textMuted} opacity="0.6" />
          <text x="0" y="10" textAnchor="middle" fill={gamingColors.textMuted} fontSize="8">TRAPPED</text>
          <text x="0" y="22" textAnchor="middle" fill={gamingColors.textMuted} fontSize="7" opacity="0.7">What-ifs</text>
        </g>
        
        {/* Label */}
        <text x="200" y="18" textAnchor="middle" fill={gamingColors.textMuted} fontSize="9" fontWeight="500">
          RUSHED PATH
        </text>
      </g>

      {/* PATH 2: Intentional (bottom) - positive */}
      <g>
        {/* Path line */}
        <path
          d="M 50 95 Q 100 110, 150 120 T 280 135 L 340 130"
          stroke="url(#good-path)"
          strokeWidth="4"
          fill="none"
          filter="url(#glow-cyan-5)"
        />
        
        {/* Milestones */}
        <g transform="translate(95, 108)">
          <circle cx="0" cy="0" r="8" fill={gamingColors.neonCyan} opacity="0.8" />
          <text x="0" y="3" textAnchor="middle" fill={gamingColors.darkBg} fontSize="7" fontWeight="700">1</text>
          <text x="0" y="22" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="7">Learn</text>
        </g>
        <g transform="translate(170, 120)">
          <circle cx="0" cy="0" r="8" fill={gamingColors.neonCyan} opacity="0.9" />
          <text x="0" y="3" textAnchor="middle" fill={gamingColors.darkBg} fontSize="7" fontWeight="700">2</text>
          <text x="0" y="22" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="7">Grow</text>
        </g>
        <g transform="translate(245, 132)">
          <circle cx="0" cy="0" r="8" fill={gamingColors.neonCyan} />
          <text x="0" y="3" textAnchor="middle" fill={gamingColors.darkBg} fontSize="7" fontWeight="700">3</text>
          <text x="0" y="22" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="7">Choose</text>
        </g>
        
        {/* End state (positive) */}
        <g transform="translate(340, 118)">
          <rect x="-30" y="-8" width="60" height="40" rx="4" fill={gamingColors.cardBg} stroke={gamingColors.success} strokeWidth="1.5" filter="url(#glow-cyan-5)" />
          <text x="0" y="8" textAnchor="middle" fill={gamingColors.success} fontSize="9" fontWeight="600">FREEDOM</text>
          <text x="0" y="22" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="7">Right choice</text>
        </g>
        
        {/* Label */}
        <text x="200" y="170" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="9" fontWeight="600" filter="url(#glow-cyan-5)">
          INTENTIONAL PATH
        </text>
      </g>

      {/* Fork point */}
      <circle cx="60" cy="90" r="5" fill={gamingColors.textSecondary} />
    </svg>
  )
}
