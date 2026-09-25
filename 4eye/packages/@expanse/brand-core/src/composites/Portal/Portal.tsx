/**
 * Portal Composite
 *
 * A perspective ellipse effect for teleportation/portal visuals.
 * Supports ground portals, wall portals, and floating variants.
 */

"use client"

import React, { useId, useMemo } from "react"
import type { PortalProps, PortalVariant } from "../../types"
import { PORTAL_DEFAULTS, EFFECT_DEFAULTS } from "../../constants"
import { GlowFilter } from "../../primitives/effects/GlowFilter"
import { RadialGradientDef } from "../../primitives/effects/GradientDef"
import { useBrandContext, useGlowEnabled } from "../../context/BrandContext"

/**
 * Get transform based on portal variant
 */
function getVariantTransform(
  variant: PortalVariant,
  centerX: number,
  centerY: number,
  width: number,
): string {
  switch (variant) {
    case "wall":
      return "" // No transform, facing camera
    case "floating":
      return `rotate(-15, ${centerX}, ${centerY})` // Slight tilt
    case "ground":
    default:
      return "" // Ground portal uses depth for perspective
  }
}

export function Portal({
  id,
  className,
  style,
  centerX = 100,
  centerY = 100,
  width = 100,
  depth = PORTAL_DEFAULTS.depth,
  variant = PORTAL_DEFAULTS.variant,
  rings = PORTAL_DEFAULTS.rings,
  ringSpacing = PORTAL_DEFAULTS.ringSpacing,
  primaryColor,
  secondaryColor,
  showVortex = true,
  glow,
  glowIntensity = EFFECT_DEFAULTS.glowIntensity,
  opacity = 1,
  animated = false,
  animationSpeed = PORTAL_DEFAULTS.animationSpeed,
}: PortalProps) {
  const uniqueId = useId()
  const componentId = id ?? `portal-${uniqueId}`
  const { resolveColor } = useBrandContext()
  const globalGlowEnabled = useGlowEnabled()

  // Resolve colors
  const resolvedPrimary = primaryColor ?? resolveColor("primaryColor")
  const resolvedSecondary = secondaryColor ?? resolveColor("accentColor")

  // Determine if glow should be shown
  const showGlow = glow ?? globalGlowEnabled
  const glowFilterId = `${componentId}-glow`
  const vortexGradientId = `${componentId}-vortex`

  // Calculate dimensions
  const rx = width / 2
  const ry = rx * depth // Perspective squish

  // Generate ring configurations (from outer to inner)
  const ringConfigs = useMemo(() => {
    const configs: Array<{ rx: number; ry: number; opacity: number }> = []
    for (let i = 0; i < rings; i++) {
      const factor = 1 - i / rings
      const ringRx = rx * factor
      const ringRy = ry * factor
      // Opacity increases toward center
      const ringOpacity = opacity * (0.3 + (1 - factor) * 0.7)
      configs.push({
        rx: ringRx,
        ry: ringRy,
        opacity: ringOpacity,
      })
    }
    return configs
  }, [rx, ry, rings, opacity])

  // ViewBox calculation
  const padding = showGlow ? rx * 0.4 : rx * 0.15
  const viewWidth = (rx + padding) * 2
  const viewHeight = (ry + padding) * 2
  const viewCenterX = viewWidth / 2
  const viewCenterY = viewHeight / 2

  // Animation keyframes
  const animationStyle: React.CSSProperties = animated
    ? {
        animation: `portal-pulse ${2 / animationSpeed}s ease-in-out infinite`,
      }
    : {}

  const transform = getVariantTransform(
    variant,
    viewCenterX,
    viewCenterY,
    width,
  )

  return (
    <svg
      id={componentId}
      className={className}
      style={style}
      width={viewWidth}
      height={viewHeight}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
    >
      <defs>
        {/* Glow filter */}
        {showGlow && (
          <GlowFilter
            id={glowFilterId}
            blur={rx * 0.1}
            color={resolvedPrimary}
            intensity={glowIntensity}
          />
        )}

        {/* Vortex gradient */}
        {showVortex && (
          <RadialGradientDef
            id={vortexGradientId}
            cx="50%"
            cy="50%"
            r="50%"
            stops={[
              { offset: 0, color: resolvedSecondary, opacity: 0.8 },
              { offset: 0.5, color: resolvedPrimary, opacity: 0.5 },
              { offset: 1, color: resolvedPrimary, opacity: 0 },
            ]}
          />
        )}

        {/* Animation keyframes (if animated) */}
        {animated && (
          <style>{`
            @keyframes portal-pulse {
              0%, 100% { opacity: ${opacity}; transform: scale(1); }
              50% { opacity: ${opacity * 0.8}; transform: scale(0.98); }
            }
            @keyframes portal-spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        )}
      </defs>

      <g
        transform={transform}
        filter={showGlow ? `url(#${glowFilterId})` : undefined}
        style={animationStyle}
      >
        {/* Vortex center (innermost) */}
        {showVortex && (
          <ellipse
            cx={viewCenterX}
            cy={viewCenterY}
            rx={rx * 0.4}
            ry={ry * 0.4}
            fill={`url(#${vortexGradientId})`}
            opacity={opacity}
          />
        )}

        {/* Concentric rings */}
        {ringConfigs.map((ring, index) => (
          <ellipse
            key={index}
            cx={viewCenterX}
            cy={viewCenterY}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={resolvedPrimary}
            strokeWidth={2}
            opacity={ring.opacity}
            style={
              animated && index === rings - 1
                ? {
                    animation: `portal-spin ${10 / animationSpeed}s linear infinite`,
                  }
                : undefined
            }
          />
        ))}
      </g>
    </svg>
  )
}

/**
 * PortalInline - A portal that renders inline without its own SVG wrapper
 * For composing with other SVG elements
 */
export interface PortalInlineProps extends Omit<PortalProps, "style"> {
  /** Apply defs externally */
  defsOnly?: boolean
}

export function PortalInline({
  id,
  className,
  centerX = 100,
  centerY = 100,
  width = 100,
  depth = PORTAL_DEFAULTS.depth,
  variant = PORTAL_DEFAULTS.variant,
  rings = PORTAL_DEFAULTS.rings,
  primaryColor = "#ffffff",
  secondaryColor = "#4a90d9",
  showVortex = true,
  glow = false,
  glowIntensity = EFFECT_DEFAULTS.glowIntensity,
  opacity = 1,
  defsOnly = false,
}: PortalInlineProps) {
  const uniqueId = useId()
  const componentId = id ?? `portal-inline-${uniqueId}`
  const glowFilterId = `${componentId}-glow`
  const vortexGradientId = `${componentId}-vortex`

  // Calculate dimensions
  const rx = width / 2
  const ry = rx * depth

  // Generate ring configurations
  const ringConfigs = useMemo(() => {
    const configs: Array<{ rx: number; ry: number; opacity: number }> = []
    for (let i = 0; i < rings; i++) {
      const factor = 1 - i / rings
      configs.push({
        rx: rx * factor,
        ry: ry * factor,
        opacity: opacity * (0.3 + (1 - factor) * 0.7),
      })
    }
    return configs
  }, [rx, ry, rings, opacity])

  const transform = getVariantTransform(variant, centerX, centerY, width)

  // If only rendering defs, return just that
  if (defsOnly) {
    return (
      <>
        {glow && (
          <GlowFilter
            id={glowFilterId}
            blur={rx * 0.1}
            color={primaryColor}
            intensity={glowIntensity}
          />
        )}
        {showVortex && (
          <RadialGradientDef
            id={vortexGradientId}
            cx="50%"
            cy="50%"
            r="50%"
            stops={[
              { offset: 0, color: secondaryColor, opacity: 0.8 },
              { offset: 0.5, color: primaryColor, opacity: 0.5 },
              { offset: 1, color: primaryColor, opacity: 0 },
            ]}
          />
        )}
      </>
    )
  }

  return (
    <>
      <defs>
        {glow && (
          <GlowFilter
            id={glowFilterId}
            blur={rx * 0.1}
            color={primaryColor}
            intensity={glowIntensity}
          />
        )}
        {showVortex && (
          <RadialGradientDef
            id={vortexGradientId}
            stops={[
              { offset: 0, color: secondaryColor, opacity: 0.8 },
              { offset: 0.5, color: primaryColor, opacity: 0.5 },
              { offset: 1, color: primaryColor, opacity: 0 },
            ]}
          />
        )}
      </defs>

      <g
        id={componentId}
        className={className}
        transform={transform}
        filter={glow ? `url(#${glowFilterId})` : undefined}
      >
        {showVortex && (
          <ellipse
            cx={centerX}
            cy={centerY}
            rx={rx * 0.4}
            ry={ry * 0.4}
            fill={`url(#${vortexGradientId})`}
            opacity={opacity}
          />
        )}

        {ringConfigs.map((ring, index) => (
          <ellipse
            key={index}
            cx={centerX}
            cy={centerY}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={primaryColor}
            strokeWidth={2}
            opacity={ring.opacity}
          />
        ))}
      </g>
    </>
  )
}
