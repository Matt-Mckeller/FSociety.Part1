"use client"

import { gamingColors } from "../themes/gamingTheme"

interface SVGProps {
  width?: number | string
  height?: number | string
  className?: string
}

/**
 * Two figures with shared interests creating a bond
 * For: m1-b4a (Mismatched Couple Story)
 */
export function SharedInterestsBond({
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
        <filter id="glow-pink-3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-cyan-3" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={gamingColors.neonPink} />
          <stop offset="50%" stopColor={gamingColors.neonCyan} />
          <stop offset="100%" stopColor={gamingColors.neonPink} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="160" fill={gamingColors.darkBg} rx="8" />

      {/* Connection lines between figures */}
      <path
        d="M 130 70 Q 200 40, 270 70"
        stroke="url(#connection-gradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        strokeDasharray="8 4"
        filter="url(#glow-cyan-3)"
      />
      <path
        d="M 140 85 Q 200 60, 260 85"
        stroke="url(#connection-gradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        strokeDasharray="4 4"
      />

      {/* Left figure (Person 1) */}
      <g transform="translate(80, 40)">
        {/* Body */}
        <ellipse cx="30" cy="70" rx="20" ry="25" fill={gamingColors.neonCyan} opacity="0.7" />
        {/* Head */}
        <circle cx="30" cy="30" r="18" fill={gamingColors.neonCyan} opacity="0.9" filter="url(#glow-cyan-3)" />
        {/* Eyes */}
        <circle cx="24" cy="27" r="3" fill={gamingColors.darkBg} />
        <circle cx="36" cy="27" r="3" fill={gamingColors.darkBg} />
        {/* Smile */}
        <path d="M 22 35 Q 30 42, 38 35" stroke={gamingColors.darkBg} strokeWidth="2" fill="none" />
      </g>

      {/* Right figure (Person 2) */}
      <g transform="translate(250, 40)">
        {/* Body */}
        <ellipse cx="30" cy="70" rx="20" ry="25" fill={gamingColors.neonPink} opacity="0.7" />
        {/* Head */}
        <circle cx="30" cy="30" r="18" fill={gamingColors.neonPink} opacity="0.9" filter="url(#glow-pink-3)" />
        {/* Eyes */}
        <circle cx="24" cy="27" r="3" fill={gamingColors.darkBg} />
        <circle cx="36" cy="27" r="3" fill={gamingColors.darkBg} />
        {/* Smile */}
        <path d="M 22 35 Q 30 42, 38 35" stroke={gamingColors.darkBg} strokeWidth="2" fill="none" />
      </g>

      {/* Floating shared interest icons */}
      {/* Gaming controller (center top) */}
      <g transform="translate(185, 25)">
        <rect x="0" y="5" width="30" height="16" rx="4" fill={gamingColors.neonCyan} opacity="0.8" filter="url(#glow-cyan-3)" />
        <circle cx="8" cy="13" r="3" fill={gamingColors.darkBg} />
        <rect x="18" y="10" width="4" height="4" rx="1" fill={gamingColors.darkBg} />
        <rect x="23" y="10" width="4" height="4" rx="1" fill={gamingColors.darkBg} />
      </g>

      {/* Heart (center) */}
      <g transform="translate(186, 55)">
        <path
          d="M 15 8 C 8 0, 0 5, 5 12 L 15 24 L 25 12 C 30 5, 22 0, 15 8 Z"
          fill={gamingColors.neonPink}
          opacity="0.9"
          filter="url(#glow-pink-3)"
        />
      </g>

      {/* Star/anime sparkle (bottom center) */}
      <g transform="translate(190, 95)">
        <polygon
          points="10,0 12,7 20,7 14,12 16,20 10,15 4,20 6,12 0,7 8,7"
          fill={gamingColors.neonCyan}
          opacity="0.7"
          filter="url(#glow-cyan-3)"
        />
      </g>

      {/* Small floating elements */}
      <circle cx="160" cy="50" r="4" fill={gamingColors.neonPink} opacity="0.5" />
      <circle cx="240" cy="55" r="3" fill={gamingColors.neonCyan} opacity="0.5" />
      <circle cx="175" cy="100" r="3" fill={gamingColors.neonCyan} opacity="0.4" />
      <circle cx="225" cy="105" r="4" fill={gamingColors.neonPink} opacity="0.4" />

      {/* Label */}
      <text x="200" y="145" textAnchor="middle" fill={gamingColors.textSecondary} fontSize="10" fontWeight="500">
        SHARED INTERESTS CREATE DEEP BONDS
      </text>
    </svg>
  )
}
