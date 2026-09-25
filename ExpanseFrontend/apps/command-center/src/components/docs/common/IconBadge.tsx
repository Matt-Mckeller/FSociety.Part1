/**
 * IconBadge - Circular color-coded icon badge
 * Upgrades plain emoji/text into a consistent, colorful visual anchor
 * used across reward cards, category headers, and hero banners.
 */
import { Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import type { ReactNode } from "react"

function relativeLuminance(hex: string): number {
  const c = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.substring(i, i + 2), 16) / 255)
  const lin = (v: number) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function darken(hex: string, amount: number): string {
  const c = hex.replace("#", "")
  const channels = [0, 2, 4].map((i) =>
    Math.round(parseInt(c.substring(i, i + 2), 16) * (1 - amount))
      .toString(16)
      .padStart(2, "0"),
  )
  return `#${channels.join("")}`
}

/**
 * Icon glyphs need to read clearly regardless of which accent hex a caller
 * passes in - light/desaturated tokens (e.g. the muted SAD_ASH/SAD_GREY
 * palette) fail contrast as a "tint" glyph or as white text on "solid".
 */
function legibleIconColor(hex: string): string {
  return relativeLuminance(hex) > 0.4 ? darken(hex, 0.35) : hex
}

export interface IconBadgeProps {
  /** MUI icon component or emoji string */
  icon: ReactNode
  /** Accent color (hex) - drives background tint, border, and icon color */
  color: string
  /** Badge diameter */
  size?: "sm" | "md" | "lg" | "xl"
  /** Flat tint (default) or solid gradient fill */
  variant?: "tint" | "solid"
}

const sizeMap = {
  sm: { box: 32, font: "1rem" },
  md: { box: 44, font: "1.375rem" },
  lg: { box: 56, font: "1.75rem" },
  xl: { box: 76, font: "2.25rem" },
}

export function IconBadge({
  icon,
  color,
  size = "md",
  variant = "tint",
}: IconBadgeProps) {
  const { box, font } = sizeMap[size]
  const isSolid = variant === "solid"

  return (
    <Box
      sx={{
        width: box,
        height: box,
        minWidth: box,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        fontSize: font,
        lineHeight: 1,
        color: isSolid ? (relativeLuminance(color) > 0.4 ? "#1E293B" : "#FFFFFF") : legibleIconColor(color),
        background: isSolid
          ? `linear-gradient(135deg, ${color}, ${alpha(color, 0.7)})`
          : alpha(color, 0.14),
        border: isSolid ? "none" : `1px solid ${alpha(color, 0.3)}`,
        boxShadow: isSolid ? `0 6px 14px -4px ${alpha(color, 0.55)}` : "none",
        "& .MuiSvgIcon-root": {
          fontSize: `calc(${font} * 1.15)`,
        },
      }}
    >
      {icon}
    </Box>
  )
}

export default IconBadge
