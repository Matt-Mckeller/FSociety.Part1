/**
 * ActionButton Component
 *
 * Individual button for use in Action Bars and Action Groups.
 * Supports icons, labels, badges, and various display modes.
 *
 * @example
 * ```tsx
 * // Icon only (default)
 * <ActionButton icon={<HomeIcon />} label="Home" onClick={goHome} />
 *
 * // With visible label
 * <ActionButton
 *   icon={<EditIcon />}
 *   label="Edit"
 *   labelDisplay="icon-label-below"
 *   onClick={edit}
 * />
 *
 * // With badge
 * <ActionButton
 *   icon={<ChatIcon />}
 *   label="Messages"
 *   badge={5}
 *   onClick={openChat}
 * />
 * ```
 */

"use client"

import React, { useContext } from "react"
import {
  Box,
  IconButton,
  Tooltip,
  Badge,
  Typography,
  useTheme,
  alpha,
  type SxProps,
  type Theme,
} from "@mui/material"
import type { ActionButtonProps } from "./types"
import { BUTTON_SIZE_PX, LABEL_SIZE_PX, type ActionButtonActiveShape } from "./types"
import { ActionGroupContext, type ActionGroupContextValue } from "../action-group"
import { useActionBarSurface } from "../action-bars"

// =============================================================================
// Theme Color Helper
// =============================================================================

interface ColorTokens {
  /** Icon/text color for inactive state */
  text: string
  /** Icon/text color for disabled state */
  textDisabled: string
  /** Background on hover */
  hoverBg: string
  /** Background when active */
  activeBg: string
  /** Background when active + hover */
  activeHoverBg: string
  /** Primary accent color (for active state) */
  accent: string
}

/**
 * Derive colors from theme palette based on mode.
 * 
 * We compute colors based on theme.palette.mode rather than relying on
 * theme.palette.action colors, since those can be misconfigured for dark mode.
 * 
 * @param theme - MUI theme
 * @param modeOverride - Optional override for light/dark mode (for special cases like glass overlays)
 */
function getColorsFromTheme(theme: Theme, modeOverride?: "dark" | "light"): ColorTokens {
  const mode = modeOverride ?? theme.palette.mode
  const isDark = mode === "dark"
  const primary = theme.palette.primary.main
  
  // Compute colors based on actual mode, not action palette
  // This ensures proper contrast regardless of theme configuration
  if (isDark) {
    // Dark mode: use white-based colors for visibility on dark backgrounds
    return {
      text: alpha(theme.palette.common.white, 0.7),
      textDisabled: alpha(theme.palette.common.white, 0.38),
      hoverBg: alpha(theme.palette.common.white, 0.08),
      activeBg: alpha(primary, 0.24),
      activeHoverBg: alpha(primary, 0.32),
      accent: theme.palette.primary.light, // Use lighter shade for better visibility
    }
  }
  
  // Light mode: use black-based colors for visibility on light backgrounds
  return {
    text: alpha(theme.palette.common.black, 0.54),
    textDisabled: alpha(theme.palette.common.black, 0.38),
    hoverBg: alpha(theme.palette.common.black, 0.04),
    activeBg: alpha(primary, 0.12),
    activeHoverBg: alpha(primary, 0.20),
    accent: primary,
  }
}

// =============================================================================
// Shape Styles Helper
// =============================================================================

interface ShapeStyleResult {
  borderRadius: string | number
  clipPath?: string
  pt?: number
  /** Whether shape needs special pseudo-element handling (diamond) */
  usePseudoBg?: boolean
}

/**
 * Get CSS styles for active shape background
 */
function getActiveShapeStyles(shape: ActionButtonActiveShape, _sizePx: number): ShapeStyleResult {
  switch (shape) {
    case "circle":
      return { borderRadius: "50%" }
    case "square":
      return { borderRadius: 0 }
    case "diamond":
      // Diamond uses pseudo-element for rotated background
      return {
        borderRadius: 1,
        usePseudoBg: true,
      }
    case "triangle":
      // Triangle using clip-path (pointing up)
      return {
        borderRadius: 0,
        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
        pt: 0.5,
      }
    case "rounded":
    default:
      return { borderRadius: 1 }
  }
}

// =============================================================================
// Component
// =============================================================================

export function ActionButton({
  icon,
  iconOn,
  label,
  value,
  onClick,
  disabled = false,
  active: activeProp,
  badge,
  badgeColor = "primary",
  size = "md",
  labelDisplay = "icon-only",
  labelSize = "xs",
  tooltipPlacement = "top",
  colorMode = "auto",
  activeShape = "rounded",
  sx,
}: ActionButtonProps) {
  const theme = useTheme()
  const groupContext = useContext(ActionGroupContext)
  const surfaceContext = useActionBarSurface()

  // Determine active state from context or prop
  const isActiveFromGroup = groupContext?.isActive(value ?? "") ?? false
  const active = activeProp ?? isActiveFromGroup

  // Handle click - delegate to group if in context
  const handleClick = () => {
    if (groupContext && value) {
      groupContext.onSelect(value)
    }
    onClick?.()
  }

  // Determine effective color mode:
  // 1. Explicit prop (not "auto") takes precedence
  // 2. Surface context from ActionBar
  // 3. Fall back to theme mode (undefined = auto)
  const effectiveColorMode: "dark" | "light" | undefined = 
    colorMode !== "auto" 
      ? colorMode 
      : surfaceContext?.surfaceColorMode

  // Get colors from theme
  const colors = getColorsFromTheme(theme, effectiveColorMode)
  const sizePx = BUTTON_SIZE_PX[size]
  const labelFontSize = LABEL_SIZE_PX[labelSize]

  // Determine which icon to show
  const displayIcon = active && iconOn ? iconOn : icon

  // Show tooltip only when label is not visible
  const showTooltip = labelDisplay === "icon-only"

  // Layout direction for label
  const isVertical = labelDisplay === "icon-label-below"
  const isHorizontal = labelDisplay === "icon-label-right"

  // Get shape-specific styles
  const shapeStyles = getActiveShapeStyles(activeShape, sizePx)
  const isDiamond = shapeStyles.usePseudoBg

  // Diamond shape: use pseudo-element for rotated background
  const diamondPseudoStyles = isDiamond
    ? {
        position: "relative" as const,
        bgcolor: "transparent",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "85%",
          height: "85%",
          transform: "translate(-50%, -50%) rotate(45deg)",
          bgcolor: active ? colors.activeBg : "transparent",
          borderRadius: 0.5,
          transition: "all 0.15s ease-in-out",
          zIndex: 0,
        },
        "&:hover::before": {
          bgcolor: active ? colors.activeHoverBg : colors.hoverBg,
        },
        "& .MuiSvgIcon-root": {
          position: "relative",
          zIndex: 1,
        },
      }
    : {}

  // Button base styles
  const buttonSx: SxProps<Theme> = {
    color: active ? colors.accent : colors.text,
    bgcolor: isDiamond ? "transparent" : active ? colors.activeBg : "transparent",
    width: isHorizontal ? "auto" : sizePx,
    height: isVertical ? "auto" : sizePx,
    minWidth: sizePx,
    borderRadius: shapeStyles.borderRadius,
    clipPath: shapeStyles.clipPath,
    pt: shapeStyles.pt,
    "&:hover": isDiamond
      ? {}
      : {
          bgcolor: active ? colors.activeHoverBg : colors.hoverBg,
        },
    "&.Mui-disabled": {
      color: colors.textDisabled,
    },
    transition: "all 0.15s ease-in-out",
    ...diamondPseudoStyles,
    ...sx,
  }

  // Render icon-only button
  if (labelDisplay === "icon-only") {
    const button = (
      <IconButton
        onClick={handleClick}
        disabled={disabled}
        size="small"
        sx={buttonSx}
        aria-label={label}
      >
        {displayIcon}
      </IconButton>
    )

    const wrappedButton =
      badge !== undefined ? (
        <Badge
          badgeContent={badge}
          color={badgeColor}
          sx={{
            "& .MuiBadge-badge": {
              fontSize: 10,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
            },
          }}
        >
          {button}
        </Badge>
      ) : (
        button
      )

    return showTooltip ? (
      <Tooltip title={label} placement={tooltipPlacement} arrow disableInteractive>
        <span style={{ display: "inline-flex" }}>{wrappedButton}</span>
      </Tooltip>
    ) : (
      wrappedButton
    )
  }

  // Render button with visible label
  // Note: activeShape primarily affects icon-only buttons; labels use simpler styling
  const containerSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: isVertical ? "column" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: isVertical ? 0.25 : 0.75,
    px: isHorizontal ? 1.5 : 0.5,
    py: isVertical ? 0.75 : 0.5,
    borderRadius: activeShape === "square" ? 0 : activeShape === "circle" ? 3 : 1,
    cursor: disabled ? "not-allowed" : "pointer",
    color: active ? colors.accent : colors.text,
    bgcolor: active ? colors.activeBg : "transparent",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.15s ease-in-out",
    "&:hover": disabled
      ? {}
      : {
          bgcolor: active ? colors.activeHoverBg : colors.hoverBg,
        },
    ...sx,
  }

  const content = (
    <Box sx={containerSx} onClick={disabled ? undefined : handleClick}>
      {labelDisplay !== "label-only" && displayIcon}
      {label && (
        <Typography
          variant="caption"
          sx={{
            fontSize: labelFontSize,
            fontWeight: active ? 600 : 400,
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: isHorizontal ? 80 : 60,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  )

  return badge !== undefined ? (
    <Badge
      badgeContent={badge}
      color={badgeColor}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: 10,
          minWidth: 16,
          height: 16,
          padding: "0 4px",
        },
      }}
    >
      {content}
    </Badge>
  ) : (
    content
  )
}

export default ActionButton
