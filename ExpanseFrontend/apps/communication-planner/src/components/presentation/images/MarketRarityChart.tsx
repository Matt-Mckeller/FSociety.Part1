"use client"

import { gamingColors } from "../themes/gamingTheme"

interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
}

/**
 * Supply/demand visualization showing gamer women rarity
 * For: m1-b5 (Market Value Analysis)
 */
export function MarketRarityChart({
  width = "100%",
  height = 200,
  className,
}: SVGProps) {
  return (
    <svg
      viewBox="0 0 400 160"
      width={width}
      height={height}
      className={className}
      style={{ maxWidth: "100%" }}
    >
      <defs>
        <filter id="glow-cyan-4" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="bar-gradient-1" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={gamingColors.textMuted} />
          <stop offset="100%" stopColor={gamingColors.textSecondary} />
        </linearGradient>
        <linearGradient id="bar-gradient-2" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={gamingColors.neonCyan} />
          <stop offset="100%" stopColor={gamingColors.neonPink} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="160" fill={gamingColors.darkBg} rx="8" />

      {/* Title */}
      <text x="200" y="22" textAnchor="middle" fill={gamingColors.textPrimary} fontSize="12" fontWeight="600">
        DATING MARKET: GAMER/DEV DEMOGRAPHICS
      </text>

      {/* Chart area */}
      <g transform="translate(60, 40)">
        {/* Y-axis */}
        <line x1="0" y1="0" x2="0" y2="90" stroke={gamingColors.textMuted} strokeWidth="1" opacity="0.5" />
        
        {/* Bar 1: Men (large) */}
        <g transform="translate(40, 0)">
          <rect
            x="0"
            y="10"
            width="80"
            height="80"
            fill="url(#bar-gradient-1)"
            rx="4"
            opacity="0.6"
          />
          <text x="40" y="55" textAnchor="middle" fill={gamingColors.darkBg} fontSize="14" fontWeight="700">
            85%
          </text>
          <text x="40" y="110" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="10">
            Men
          </text>
        </g>

        {/* Bar 2: Women (small, glowing) */}
        <g transform="translate(160, 0)">
          <rect
            x="15"
            y="60"
            width="50"
            height="30"
            fill="url(#bar-gradient-2)"
            rx="4"
            filter="url(#glow-cyan-4)"
          />
          {/* Sparkle effect */}
          <circle cx="40" cy="68" r="3" fill="white" opacity="0.8" />
          <text x="40" y="80" textAnchor="middle" fill={gamingColors.darkBg} fontSize="11" fontWeight="700">
            15%
          </text>
          <text x="40" y="110" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="10" fontWeight="600" filter="url(#glow-cyan-4)">
            Women
          </text>
          {/* "RARE" badge */}
          <rect x="5" y="45" width="35" height="14" rx="7" fill={gamingColors.neonPink} />
          <text x="22.5" y="55" textAnchor="middle" fill={gamingColors.darkBg} fontSize="8" fontWeight="700">
            RARE
          </text>
        </g>
      </g>

      {/* Value indicator on right */}
      <g transform="translate(310, 50)">
        <rect x="0" y="0" width="70" height="60" rx="6" fill={gamingColors.cardBg} stroke={gamingColors.neonCyan} strokeWidth="1" opacity="0.8" />
        <text x="35" y="20" textAnchor="middle" fill={gamingColors.textMuted} fontSize="8">
          RARITY =
        </text>
        <text x="35" y="38" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="14" fontWeight="700" filter="url(#glow-cyan-4)">
          HIGH
        </text>
        <text x="35" y="52" textAnchor="middle" fill={gamingColors.neonPink} fontSize="11" fontWeight="600">
          VALUE
        </text>
      </g>

      {/* Subtitle */}
      <text x="200" y="150" textAnchor="middle" fill={gamingColors.textMuted} fontSize="9" opacity="0.8">
        Gamer/Developer demographics in dating market
      </text>
    </svg>
  )
}
