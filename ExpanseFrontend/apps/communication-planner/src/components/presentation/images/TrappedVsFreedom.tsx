"use client"

import { gamingColors } from "../themes/gamingTheme"

interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
}

/**
 * Side-by-side comparison: Trapped vs Freedom to Choose
 * For: m1-b3 (Transformation - Perspective Shift)
 */
export function TrappedVsFreedom({
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
        <filter id="glow-cyan-2" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
        </filter>
        <linearGradient id="transform-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gamingColors.textMuted} />
          <stop offset="100%" stopColor={gamingColors.neonCyan} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="180" fill={gamingColors.darkBg} rx="8" />

      {/* LEFT: Trapped state */}
      <g transform="translate(30, 20)">
        {/* Cage bars */}
        <rect x="20" y="20" width="100" height="80" fill="none" stroke={gamingColors.textMuted} strokeWidth="2" rx="4" opacity="0.6" />
        {[35, 55, 75, 95, 115].map((x, i) => (
          <line key={i} x1={x} y1="20" x2={x} y2="100" stroke={gamingColors.textMuted} strokeWidth="1.5" opacity="0.4" />
        ))}
        
        {/* Figure inside */}
        <circle cx="70" cy="55" r="12" fill={gamingColors.textMuted} opacity="0.7" />
        <ellipse cx="70" cy="80" rx="10" ry="14" fill={gamingColors.textMuted} opacity="0.6" />
        
        {/* Worried expression */}
        <circle cx="65" cy="52" r="2" fill={gamingColors.cardBg} />
        <circle cx="75" cy="52" r="2" fill={gamingColors.cardBg} />
        <path d="M 64 60 Q 70 64, 76 60" stroke={gamingColors.cardBg} strokeWidth="1.5" fill="none" />
        
        {/* Label */}
        <text x="70" y="125" textAnchor="middle" fill={gamingColors.textMuted} fontSize="11" fontWeight="500">
          TRAPPED
        </text>
        <text x="70" y="140" textAnchor="middle" fill={gamingColors.textMuted} fontSize="9" opacity="0.7">
          Scarcity mindset
        </text>
      </g>

      {/* CENTER: Transformation arrow */}
      <g transform="translate(165, 60)">
        <path
          d="M 0 30 L 50 30"
          stroke="url(#transform-arrow)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-cyan-2)"
        />
        <polygon
          points="55,30 45,24 45,36"
          fill={gamingColors.neonCyan}
          filter="url(#glow-cyan-2)"
        />
        <text x="27" y="15" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="8" fontWeight="600">
          REFRAME
        </text>
      </g>

      {/* RIGHT: Freedom state */}
      <g transform="translate(230, 20)">
        {/* Open doors */}
        <path d="M 25 20 L 25 100 L 35 95 L 35 25 Z" fill={gamingColors.neonCyan} opacity="0.3" />
        <path d="M 115 20 L 115 100 L 105 95 L 105 25 Z" fill={gamingColors.neonCyan} opacity="0.3" />
        <line x1="25" y1="20" x2="25" y2="100" stroke={gamingColors.neonCyan} strokeWidth="2" filter="url(#glow-cyan-2)" />
        <line x1="115" y1="20" x2="115" y2="100" stroke={gamingColors.neonCyan} strokeWidth="2" filter="url(#glow-cyan-2)" />
        
        {/* Open space glow */}
        <ellipse cx="70" cy="60" rx="35" ry="30" fill={gamingColors.neonCyan} opacity="0.05" filter="url(#glow-cyan-2)" />
        
        {/* Figure - confident pose */}
        <circle cx="70" cy="50" r="14" fill={gamingColors.neonCyan} opacity="0.9" filter="url(#glow-cyan-2)" />
        <ellipse cx="70" cy="80" rx="12" ry="16" fill={gamingColors.neonCyan} opacity="0.7" />
        
        {/* Confident expression */}
        <circle cx="64" cy="47" r="2" fill={gamingColors.darkBg} />
        <circle cx="76" cy="47" r="2" fill={gamingColors.darkBg} />
        <path d="M 64 55 Q 70 59, 76 55" stroke={gamingColors.darkBg} strokeWidth="2" fill="none" />
        
        {/* Light rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 70 + Math.cos(rad) * 45
          const y1 = 60 + Math.sin(rad) * 40
          const x2 = 70 + Math.cos(rad) * 55
          const y2 = 60 + Math.sin(rad) * 50
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={gamingColors.neonCyan}
              strokeWidth="1.5"
              opacity="0.4"
            />
          )
        })}
        
        {/* Label */}
        <text x="70" y="125" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="11" fontWeight="600" filter="url(#glow-cyan-2)">
          FREEDOM
        </text>
        <text x="70" y="140" textAnchor="middle" fill={gamingColors.neonCyan} fontSize="9" opacity="0.8">
          Abundance mindset
        </text>
      </g>
    </svg>
  )
}
