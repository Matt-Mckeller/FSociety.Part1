"use client";
/**
 * ProfileFrame - Tiered gamification profile border system
 *
 * A comprehensive tier-based border system for profile photos with:
 * - 5 progression tiers (Spark → Glow → Shine → Radiance → Brilliance)
 * - SVG-based decorative borders
 * - GSAP animations for higher tiers
 * - MUI theme color integration
 *
 * @module character/profile/ProfileFrame
 */
import { useRef, useEffect, useId, CSSProperties } from "react"
import gsap from "gsap"
import { ProfilePhoto, ProfilePhotoProps, ProfileZoom } from "./ProfilePhoto"

// =============================================================================
// TIER SYSTEM TYPES
// =============================================================================

/** Tier levels for gamification progression */
export type TierLevel = 1 | 2 | 3 | 4 | 5

/** Tier names for display and accessibility */
export const TIER_NAMES: Record<TierLevel, string> = {
  1: "Spark",
  2: "Glow",
  3: "Shine",
  4: "Radiance",
  5: "Brilliance",
}

/** Tier descriptions for tooltips/accessibility */
export const TIER_DESCRIPTIONS: Record<TierLevel, string> = {
  1: "Beginning your journey",
  2: "Building momentum",
  3: "Making an impact",
  4: "Leading the way",
  5: "Mastery achieved",
}

/** Theme color keys from MUI palette */
export type ThemeColorKey =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning"

/** Tier configuration for visual styling */
export interface TierConfig {
  name: string
  description: string
  /** Primary border color (use MUI theme color or hex) */
  borderColor: string
  /** Secondary/accent color for decorations */
  accentColor: string
  /** Glow color for tier 3+ */
  glowColor?: string
  /** Border width in pixels */
  borderWidth: number
  /** Whether to show animated glow */
  showGlow: boolean
  /** Whether to show decorative elements */
  showDecorations: boolean
  /** Whether to show particle effects (tier 5) */
  showParticles: boolean
  /** Animation intensity (0-1) */
  animationIntensity: number
}

/** Default tier configurations */
export const TIER_CONFIGS: Record<TierLevel, TierConfig> = {
  1: {
    name: "Spark",
    description: "Beginning your journey",
    borderColor: "#6b7280", // Neutral gray
    accentColor: "#9ca3af",
    borderWidth: 2,
    showGlow: false,
    showDecorations: false,
    showParticles: false,
    animationIntensity: 0,
  },
  2: {
    name: "Glow",
    description: "Building momentum",
    borderColor: "#3b82f6", // Blue
    accentColor: "#60a5fa",
    glowColor: "#3b82f620",
    borderWidth: 3,
    showGlow: true,
    showDecorations: false,
    showParticles: false,
    animationIntensity: 0.3,
  },
  3: {
    name: "Shine",
    description: "Making an impact",
    borderColor: "#8b5cf6", // Purple
    accentColor: "#a78bfa",
    glowColor: "#8b5cf640",
    borderWidth: 3,
    showGlow: true,
    showDecorations: true,
    showParticles: false,
    animationIntensity: 0.5,
  },
  4: {
    name: "Radiance",
    description: "Leading the way",
    borderColor: "#f59e0b", // Amber/Gold
    accentColor: "#fbbf24",
    glowColor: "#f59e0b50",
    borderWidth: 4,
    showGlow: true,
    showDecorations: true,
    showParticles: false,
    animationIntensity: 0.7,
  },
  5: {
    name: "Brilliance",
    description: "Mastery achieved",
    borderColor: "#ef4444", // Red/Ruby
    accentColor: "#f87171",
    glowColor: "#ef444460",
    borderWidth: 4,
    showGlow: true,
    showDecorations: true,
    showParticles: true,
    animationIntensity: 1,
  },
}

// =============================================================================
// PROFILE FRAME PROPS
// =============================================================================

export interface ProfileFrameProps
  extends Omit<
    ProfilePhotoProps,
    "borderWidth" | "borderColor" | "borderStyle"
  > {
  /** Tier level (1-5) determines visual complexity */
  tier?: TierLevel
  /** Size of the frame in pixels (default: 200) */
  size?: number
  /** Override tier colors with custom colors */
  customColors?: {
    primary?: string
    accent?: string
    glow?: string
  }
  /** Use MUI theme colors (requires theme context) */
  themeColor?: ThemeColorKey
  /** Theme palette reference for MUI integration */
  palette?: {
    primary?: { main: string; light: string; dark: string }
    secondary?: { main: string; light: string; dark: string }
    success?: { main: string; light: string }
    error?: { main: string; light: string }
    info?: { main: string; light: string }
    warning?: { main: string; light: string }
  }
  /** Disable animations */
  disableAnimations?: boolean
  /** Show tier badge */
  showBadge?: boolean
  /** Badge position */
  badgePosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /** Frame shape */
  shape?: "circle" | "hexagon" | "rounded"
  /** Additional className */
  className?: string
  /** Profile zoom level */
  zoom?: ProfileZoom
}

// =============================================================================
// SVG BORDER COMPONENTS
// =============================================================================

interface BorderProps {
  size: number
  config: TierConfig
  uniqueId: string
}

/** Tier 1: Simple thin border */
const Tier1Border = ({ size, config }: BorderProps) => {
  const r = size / 2 - config.borderWidth
  const cx = size / 2
  const cy = size / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={config.borderColor}
        strokeWidth={config.borderWidth}
      />
    </svg>
  )
}

/** Tier 2: Gradient border with subtle glow */
const Tier2Border = ({ size, config, uniqueId }: BorderProps) => {
  const r = size / 2 - config.borderWidth - 2
  const cx = size / 2
  const cy = size / 2
  const gradientId = `tier2-gradient-${uniqueId}`
  const glowId = `tier2-glow-${uniqueId}`

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.borderColor} />
          <stop offset="50%" stopColor={config.accentColor} />
          <stop offset="100%" stopColor={config.borderColor} />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Glow layer */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 2}
        fill="none"
        stroke={config.glowColor}
        strokeWidth={config.borderWidth + 4}
        filter={`url(#${glowId})`}
        className="tier2-glow"
      />
      {/* Main border */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={config.borderWidth}
      />
    </svg>
  )
}

/** Tier 3: Animated pulse ring with decorative dots */
const Tier3Border = ({ size, config, uniqueId }: BorderProps) => {
  const r = size / 2 - config.borderWidth - 4
  const cx = size / 2
  const cy = size / 2
  const gradientId = `tier3-gradient-${uniqueId}`
  const glowId = `tier3-glow-${uniqueId}`
  const decorDots = 8

  // Calculate dot positions around the circle
  const dots = Array.from({ length: decorDots }, (_, i) => {
    const angle = (i / decorDots) * Math.PI * 2 - Math.PI / 2
    const dotR = r + config.borderWidth + 6
    return {
      x: cx + Math.cos(angle) * dotR,
      y: cy + Math.sin(angle) * dotR,
    }
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}
      className="tier3-border"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.borderColor} />
          <stop offset="30%" stopColor={config.accentColor} />
          <stop offset="70%" stopColor={config.borderColor} />
          <stop offset="100%" stopColor={config.accentColor} />
        </linearGradient>
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer glow ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 4}
        fill="none"
        stroke={config.glowColor}
        strokeWidth={8}
        filter={`url(#${glowId})`}
        className="tier3-glow-ring"
      />
      {/* Pulse ring (animated) */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 2}
        fill="none"
        stroke={config.accentColor}
        strokeWidth={1}
        strokeOpacity={0.5}
        className="tier3-pulse-ring"
      />
      {/* Main border */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={config.borderWidth}
      />
      {/* Decorative dots */}
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={3}
          fill={i % 2 === 0 ? config.borderColor : config.accentColor}
          className={`tier3-dot tier3-dot-${i}`}
        />
      ))}
    </svg>
  )
}

/** Tier 4: Multi-layer border with ornate frame */
const Tier4Border = ({ size, config, uniqueId }: BorderProps) => {
  const r = size / 2 - config.borderWidth - 6
  const cx = size / 2
  const cy = size / 2
  const gradientId = `tier4-gradient-${uniqueId}`
  const glowId = `tier4-glow-${uniqueId}`
  const decorCount = 12
  const innerR = r - 4
  const outerR = r + 8

  // Ornamental points around the frame
  const ornaments = Array.from({ length: decorCount }, (_, i) => {
    const angle = (i / decorCount) * Math.PI * 2 - Math.PI / 2
    const isLarge = i % 3 === 0
    return {
      x: cx + Math.cos(angle) * outerR,
      y: cy + Math.sin(angle) * outerR,
      size: isLarge ? 5 : 3,
      angle: (angle * 180) / Math.PI,
    }
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}
      className="tier4-border"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.accentColor} />
          <stop offset="25%" stopColor={config.borderColor} />
          <stop offset="50%" stopColor={config.accentColor} />
          <stop offset="75%" stopColor={config.borderColor} />
          <stop offset="100%" stopColor={config.accentColor} />
        </linearGradient>
        <radialGradient id={`${gradientId}-radial`} cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="transparent" />
          <stop offset="100%" stopColor={config.glowColor} />
        </radialGradient>
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background glow */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR + 10}
        fill={`url(#${gradientId}-radial)`}
        className="tier4-bg-glow"
      />
      {/* Outer glow ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 4}
        fill="none"
        stroke={config.glowColor}
        strokeWidth={10}
        filter={`url(#${glowId})`}
        className="tier4-glow-ring"
      />
      {/* Outer decorative ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 2}
        fill="none"
        stroke={config.accentColor}
        strokeWidth={1}
        strokeDasharray="4 4"
        className="tier4-outer-ring"
      />
      {/* Main gradient border */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={config.borderWidth}
      />
      {/* Inner accent ring */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke={config.borderColor}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      {/* Ornamental diamonds */}
      {ornaments.map((orn, i) => (
        <g
          key={i}
          transform={`translate(${orn.x}, ${orn.y}) rotate(${orn.angle + 45})`}
        >
          <rect
            x={-orn.size / 2}
            y={-orn.size / 2}
            width={orn.size}
            height={orn.size}
            fill={i % 3 === 0 ? config.borderColor : config.accentColor}
            className={`tier4-ornament tier4-ornament-${i}`}
          />
        </g>
      ))}
    </svg>
  )
}

/** Tier 5: Ultimate frame with particles and complex animations */
const Tier5Border = ({ size, config, uniqueId }: BorderProps) => {
  const r = size / 2 - config.borderWidth - 8
  const cx = size / 2
  const cy = size / 2
  const gradientId = `tier5-gradient-${uniqueId}`
  const glowId = `tier5-glow-${uniqueId}`
  const particleCount = 16
  const decorCount = 16
  const innerR = r - 6
  const outerR = r + 10

  // Particles floating around
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2
    const dist = outerR + 5 + Math.random() * 10
    return {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      size: 2 + Math.random() * 2,
      delay: i * 0.1,
    }
  })

  // Crown-like ornaments
  const crowns = Array.from({ length: decorCount }, (_, i) => {
    const angle = (i / decorCount) * Math.PI * 2 - Math.PI / 2
    const isLarge = i % 4 === 0
    const isMedium = i % 2 === 0
    return {
      x: cx + Math.cos(angle) * outerR,
      y: cy + Math.sin(angle) * outerR,
      height: isLarge ? 12 : isMedium ? 8 : 4,
      width: isLarge ? 6 : isMedium ? 4 : 3,
      angle: (angle * 180) / Math.PI + 90,
    }
  })

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none", overflow: "visible" }}
      className="tier5-border"
    >
      <defs>
        {/* Animated gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.accentColor}>
            <animate
              attributeName="stop-color"
              values={`${config.accentColor};${config.borderColor};${config.accentColor}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor={config.borderColor}>
            <animate
              attributeName="stop-color"
              values={`${config.borderColor};${config.accentColor};${config.borderColor}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor={config.accentColor}>
            <animate
              attributeName="stop-color"
              values={`${config.accentColor};${config.borderColor};${config.accentColor}`}
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <radialGradient id={`${gradientId}-radial`} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="90%" stopColor={config.glowColor} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id={`${glowId}-intense`}
          x="-200%"
          y="-200%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer aura glow */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR + 20}
        fill={`url(#${gradientId}-radial)`}
        className="tier5-aura"
      />

      {/* Pulsing glow ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 6}
        fill="none"
        stroke={config.glowColor}
        strokeWidth={14}
        filter={`url(#${glowId}-intense)`}
        className="tier5-glow-ring"
      />

      {/* Secondary pulse ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 3}
        fill="none"
        stroke={config.accentColor}
        strokeWidth={2}
        strokeOpacity={0.6}
        strokeDasharray="8 4"
        className="tier5-pulse-ring"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Main gradient border */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={config.borderWidth}
      />

      {/* Inner accent rings */}
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke={config.borderColor}
        strokeWidth={1}
        strokeOpacity={0.6}
      />
      <circle
        cx={cx}
        cy={cy}
        r={innerR - 3}
        fill="none"
        stroke={config.accentColor}
        strokeWidth={0.5}
        strokeOpacity={0.4}
      />

      {/* Crown ornaments */}
      {crowns.map((crown, i) => (
        <g
          key={i}
          transform={`translate(${crown.x}, ${crown.y}) rotate(${crown.angle})`}
          className={`tier5-crown tier5-crown-${i}`}
        >
          {/* Diamond shape */}
          <polygon
            points={`0,${-crown.height / 2} ${crown.width / 2},0 0,${crown.height / 2} ${-crown.width / 2},0`}
            fill={i % 4 === 0 ? config.borderColor : config.accentColor}
            fillOpacity={i % 4 === 0 ? 1 : 0.8}
          />
        </g>
      ))}

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <circle
          key={i}
          cx={particle.x}
          cy={particle.y}
          r={particle.size}
          fill={config.accentColor}
          fillOpacity={0.8}
          className={`tier5-particle tier5-particle-${i}`}
        >
          <animate
            attributeName="opacity"
            values="0.8;0.3;0.8"
            dur={`${1.5 + particle.delay}s`}
            repeatCount="indefinite"
            begin={`${particle.delay}s`}
          />
          <animate
            attributeName="r"
            values={`${particle.size};${particle.size * 1.5};${particle.size}`}
            dur={`${2 + particle.delay}s`}
            repeatCount="indefinite"
            begin={`${particle.delay}s`}
          />
        </circle>
      ))}
    </svg>
  )
}

// =============================================================================
// TIER BADGE COMPONENT
// =============================================================================

interface TierBadgeProps {
  tier: TierLevel
  config: TierConfig
  size: number
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  /**
   * Distance from the padded container edge to the inner frame box. The badge
   * is anchored to the frame (not the decoration padding) so it always hugs the
   * border ring regardless of how far a tier's decorations bleed outward.
   */
  inset?: number
}

export const TierBadge = ({
  tier,
  config,
  size,
  position,
  inset = 0,
}: TierBadgeProps) => {
  const badgeSize = Math.max(24, size * 0.18)
  const fontSize = badgeSize * 0.5
  const edge = inset - badgeSize * 0.2

  const positionStyles: Record<typeof position, CSSProperties> = {
    "top-left": { top: edge, left: edge },
    "top-right": { top: edge, right: edge },
    "bottom-left": { bottom: edge, left: edge },
    "bottom-right": { bottom: edge, right: edge },
  }

  return (
    <div
      className="tier-badge"
      style={{
        position: "absolute",
        ...positionStyles[position],
        width: badgeSize,
        height: badgeSize,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${config.borderColor}, ${config.accentColor})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: config.showGlow
          ? `0 0 ${badgeSize * 0.4}px ${config.glowColor || config.borderColor}`
          : "0 2px 8px rgba(0,0,0,0.3)",
        border: `2px solid ${config.accentColor}`,
        zIndex: 10,
      }}
      title={`${config.name} - ${config.description}`}
    >
      <span
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize,
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {tier}
      </span>
    </div>
  )
}

// =============================================================================
// MAIN PROFILE FRAME COMPONENT
// =============================================================================

/**
 * Calculate extra padding needed for tier decorations
 * Higher tiers have more elaborate decorations that extend beyond the base size
 */
export function getTierDecorativePadding(tier: TierLevel): number {
  const padding: Record<TierLevel, number> = {
    1: 0,
    2: 4,
    3: 12,
    4: 24, // Radiance: ornate crowns + glow blur bleed beyond the box
    5: 40, // Brilliance: particles, aura, and intense glow blur extend ~25-30px past the edge
  }
  return padding[tier]
}

/**
 * ProfileFrame - Tiered gamification border for profile photos
 *
 * Wraps ProfilePhoto with decorative SVG borders based on tier level.
 * Higher tiers get increasingly elaborate borders with animations.
 *
 * ## Tiers
 * 1. **Spark** - Simple thin border, neutral color
 * 2. **Glow** - Gradient border with subtle glow
 * 3. **Shine** - Animated pulse, decorative dots
 * 4. **Radiance** - Multi-layer ornate frame
 * 5. **Brilliance** - Full effects with particles
 *
 * @example
 * // Basic tier 3 frame
 * <ProfileFrame tier={3} size={200} variant="friendly" />
 *
 * @example
 * // With MUI theme integration
 * <ProfileFrame
 *   tier={4}
 *   themeColor="primary"
 *   palette={theme.palette}
 *   showBadge
 * />
 */
export const ProfileFrame = ({
  tier = 1,
  size = 200,
  customColors,
  themeColor,
  palette,
  disableAnimations = false,
  showBadge = false,
  badgePosition = "bottom-right",
  shape = "circle",
  className,
  zoom = "face",
  variant = "friendly",
  ...profileProps
}: ProfileFrameProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId().replace(/:/g, "")

  // Get tier configuration with optional overrides
  const getConfig = (): TierConfig => {
    const baseConfig = { ...TIER_CONFIGS[tier] }

    // Apply MUI theme colors if provided
    if (themeColor && palette && palette[themeColor]) {
      const paletteColor = palette[themeColor]
      baseConfig.borderColor = paletteColor.main
      baseConfig.accentColor = paletteColor.light
      baseConfig.glowColor = `${paletteColor.main}50`
    }

    // Apply custom color overrides
    if (customColors) {
      if (customColors.primary) baseConfig.borderColor = customColors.primary
      if (customColors.accent) baseConfig.accentColor = customColors.accent
      if (customColors.glow) baseConfig.glowColor = customColors.glow
    }

    // Disable animations if requested
    if (disableAnimations) {
      baseConfig.animationIntensity = 0
      baseConfig.showParticles = false
    }

    return baseConfig
  }

  const config = getConfig()

  // GSAP animations for tiers 2+
  useEffect(() => {
    if (disableAnimations || tier < 2 || !frameRef.current) return undefined

    const ctx = gsap.context(() => {
      // Tier 2: Subtle glow pulse
      if (tier === 2) {
        gsap.to(".tier2-glow", {
          strokeOpacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      // Tier 3: Pulse ring expansion and dot shimmer
      if (tier === 3) {
        gsap.to(".tier3-pulse-ring", {
          attr: { r: "+=8" },
          strokeOpacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.out",
        })
        gsap.to(".tier3-dot", {
          scale: 1.3,
          opacity: 0.7,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          stagger: 0.1,
          ease: "sine.inOut",
        })
      }

      // Tier 4: Ring rotation and ornament glow
      if (tier === 4) {
        gsap.to(".tier4-outer-ring", {
          rotation: 360,
          transformOrigin: "center center",
          duration: 30,
          repeat: -1,
          ease: "none",
        })
        gsap.to(".tier4-ornament", {
          scale: 1.2,
          opacity: 0.8,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          stagger: 0.08,
          ease: "sine.inOut",
        })
        gsap.to(".tier4-glow-ring", {
          strokeOpacity: 0.5,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      }

      // Tier 5: Complex multi-layered animations
      if (tier === 5) {
        // Aura breathing
        gsap.to(".tier5-aura", {
          scale: 1.05,
          opacity: 0.8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
        // Glow ring pulse
        gsap.to(".tier5-glow-ring", {
          strokeWidth: "+=4",
          strokeOpacity: 0.4,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        })
        // Crown shimmer
        gsap.to(".tier5-crown", {
          scale: 1.15,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          stagger: 0.06,
          ease: "sine.inOut",
        })
      }
    }, frameRef)

    return () => {
      void ctx.revert()
    }
  }, [tier, disableAnimations])

  // Render appropriate border based on tier
  const renderBorder = () => {
    const borderProps = { size, config, uniqueId }

    switch (tier) {
      case 1:
        return <Tier1Border {...borderProps} />
      case 2:
        return <Tier2Border {...borderProps} />
      case 3:
        return <Tier3Border {...borderProps} />
      case 4:
        return <Tier4Border {...borderProps} />
      case 5:
        return <Tier5Border {...borderProps} />
      default:
        return <Tier1Border {...borderProps} />
    }
  }

  // Calculate inner photo size (account for border decorations)
  const getPhotoSize = (): number => {
    const padding = {
      1: config.borderWidth * 2 + 4,
      2: config.borderWidth * 2 + 8,
      3: config.borderWidth * 2 + 16,
      4: config.borderWidth * 2 + 24,
      5: config.borderWidth * 2 + 32,
    }
    return size - (padding[tier] || padding[1])
  }

  const photoSize = getPhotoSize()

  // Calculate decorative padding for tier elements that extend beyond base size
  const decorativePadding = getTierDecorativePadding(tier)
  const containerSize = size + decorativePadding * 2

  return (
    <div
      ref={frameRef}
      className={`profile-frame profile-frame-tier-${tier} ${className || ""}`}
      style={{
        position: "relative",
        width: containerSize,
        height: containerSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG Border - centered within container */}
      <div
        style={{
          position: "absolute",
          top: decorativePadding,
          left: decorativePadding,
          width: size,
          height: size,
        }}
      >
        {renderBorder()}
      </div>

      {/* Profile Photo */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: photoSize,
          height: photoSize,
        }}
      >
        <ProfilePhoto
          size={photoSize}
          zoom={zoom}
          variant={variant}
          borderStyle={
            shape === "hexagon"
              ? "circle"
              : shape === "rounded"
                ? "rounded"
                : "circle"
          }
          background="gradient"
          shadow={false}
          {...profileProps}
        />
      </div>

      {/* Tier Badge */}
      {showBadge && (
        <TierBadge
          tier={tier}
          config={config}
          size={size}
          position={badgePosition}
          inset={decorativePadding}
        />
      )}
    </div>
  )
}

export default ProfileFrame
