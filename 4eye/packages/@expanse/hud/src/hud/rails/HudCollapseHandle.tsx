"use client";

import React, { ReactNode } from "react";
import { Box, IconButton, useTheme, type SxProps, type Theme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// =============================================================================
// Types
// =============================================================================

/**
 * Handle style variations
 */
export type CollapseHandleStyle = 
  | "tab"      // Rounded tab with menu icon
  | "notch"    // Recessed notch shape
  | "dots"     // Three dots indicator
  | "arrow"    // Chevron arrow pointing outward
  | "icon"     // Custom icon preview
  | "pill"     // Horizontal pill shape
  | "minimal"; // Subtle line indicator

/**
 * Direction the handle points/expands toward
 */
export type CollapseHandleDirection = "up" | "down" | "left" | "right";

/**
 * Color mode for theming
 */
export type CollapseHandleColorMode = "dark" | "light" | "auto";

/**
 * Props for HudCollapseHandle
 */
export interface HudCollapseHandleProps {
  /** Handle style variant */
  style?: CollapseHandleStyle;
  /** Direction to expand toward */
  direction?: CollapseHandleDirection;
  /** Click handler for expanding */
  onClick?: () => void;
  /** Custom icon for 'icon' style */
  icon?: ReactNode;
  /** Icons to show as preview (for 'icon' style with multiple) */
  previewIcons?: ReactNode[];
  /** Color mode */
  colorMode?: CollapseHandleColorMode;
  /** Custom styles */
  sx?: SxProps<Theme>;
}

// =============================================================================
// Helper: Get arrow icon based on direction
// =============================================================================

function getArrowIcon(direction: CollapseHandleDirection) {
  switch (direction) {
    case "up": return <ExpandLessIcon />;
    case "down": return <ExpandMoreIcon />;
    case "left": return <ChevronLeftIcon />;
    case "right": return <ChevronRightIcon />;
  }
}

// =============================================================================
// Component
// =============================================================================

/**
 * Collapsed state handle for HUD components.
 * 
 * Shows a small interactive element that hints at hidden content
 * and allows expanding the collapsed bar.
 * 
 * @example
 * ```tsx
 * // Tab handle for bottom bar
 * <HudCollapseHandle style="tab" direction="up" onClick={expand} />
 * 
 * // Arrow handle for left bar
 * <HudCollapseHandle style="arrow" direction="right" onClick={expand} />
 * 
 * // Icon preview handle
 * <HudCollapseHandle 
 *   style="icon" 
 *   previewIcons={[<HomeIcon />, <SearchIcon />]} 
 *   onClick={expand}
 * />
 * ```
 */
export function HudCollapseHandle({
  style = "tab",
  direction = "up",
  onClick,
  icon,
  previewIcons,
  colorMode = "auto",
  sx,
}: HudCollapseHandleProps) {
  const theme = useTheme();
  
  // Resolve color mode: auto detects from theme
  const resolvedColorMode = colorMode === "auto" 
    ? (theme.palette.mode === "dark" ? "dark" : "light")
    : colorMode;
  
  const isDark = resolvedColorMode === "dark";
  
  // Base colors
  const colors = {
    bg: isDark ? "rgba(40, 40, 40, 0.95)" : "rgba(250, 250, 250, 0.95)",
    bgHover: isDark ? "rgba(60, 60, 60, 0.95)" : "rgba(235, 235, 235, 0.95)",
    border: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.1)",
    text: isDark ? "#ffffff" : "#1a1a1a",
    textMuted: isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
  };

  // Base styles shared across all variants
  const baseStyles: SxProps<Theme> = {
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transition: "all 0.2s ease",
    cursor: "pointer",
    color: colors.text,
    "&:hover": {
      bgcolor: colors.bgHover,
    },
  };

  // Render based on style
  switch (style) {
    case "tab":
      return (
        <IconButton
          onClick={onClick}
          aria-label="Expand"
          sx={[
            baseStyles,
            {
              bgcolor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: direction === "up" || direction === "down" 
                ? "0 0 8px 8px" 
                : "0 8px 8px 0",
              px: 2,
              py: 0.75,
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      );

    case "notch":
      return (
        <Box
          onClick={onClick}
          role="button"
          tabIndex={0}
          aria-label="Expand"
          sx={[
            baseStyles,
            {
              bgcolor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 
                direction === "up" ? "0 0 12px 12px" :
                direction === "down" ? "12px 12px 0 0" :
                direction === "left" ? "0 12px 12px 0" :
                "12px 0 0 12px",
              width: direction === "left" || direction === "right" ? 16 : 48,
              height: direction === "up" || direction === "down" ? 16 : 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                bgcolor: colors.bgHover,
                width: direction === "left" || direction === "right" ? 20 : 48,
                height: direction === "up" || direction === "down" ? 20 : 48,
              },
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          <Box
            sx={{
              width: direction === "left" || direction === "right" ? 4 : 24,
              height: direction === "up" || direction === "down" ? 4 : 24,
              borderRadius: 2,
              bgcolor: colors.textMuted,
            }}
          />
        </Box>
      );

    case "dots":
      return (
        <IconButton
          onClick={onClick}
          aria-label="Expand"
          sx={[
            baseStyles,
            {
              bgcolor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 2,
              px: 1.5,
              py: 0.5,
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          <MoreHorizIcon fontSize="small" />
        </IconButton>
      );

    case "arrow":
      return (
        <IconButton
          onClick={onClick}
          aria-label="Expand"
          sx={[
            baseStyles,
            {
              bgcolor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: "50%",
              p: 0.75,
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          {getArrowIcon(direction)}
        </IconButton>
      );

    case "icon":
      return (
        <IconButton
          onClick={onClick}
          aria-label="Expand"
          sx={[
            baseStyles,
            {
              bgcolor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 2,
              px: 1.5,
              py: 0.75,
              gap: 0.5,
              display: "flex",
              alignItems: "center",
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          {/* Show single icon or up to 3 preview icons */}
          {icon ? (
            <Box sx={{ display: "flex", "& > svg": { width: 18, height: 18 } }}>{icon}</Box>
          ) : previewIcons ? (
            <>
              {previewIcons.slice(0, 3).map((previewIcon, i) => (
                <Box 
                  key={i} 
                  sx={{ 
                    display: "flex", 
                    opacity: 0.7, 
                    "& > svg": { width: 16, height: 16 } 
                  }}
                >
                  {previewIcon}
                </Box>
              ))}
            </>
          ) : (
            <MenuIcon fontSize="small" />
          )}
          {getArrowIcon(direction)}
        </IconButton>
      );

    case "pill":
      return (
        <Box
          onClick={onClick}
          role="button"
          tabIndex={0}
          aria-label="Expand"
          sx={[
            baseStyles,
            {
              bgcolor: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 3,
              px: 3,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: colors.textMuted,
            }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: colors.textMuted,
            }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: colors.textMuted,
            }}
          />
        </Box>
      );

    case "minimal":
    default:
      return (
        <Box
          onClick={onClick}
          role="button"
          tabIndex={0}
          aria-label="Expand"
          sx={[
            {
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                "& > div": {
                  bgcolor: colors.text,
                  width: direction === "left" || direction === "right" ? 6 : 32,
                  height: direction === "up" || direction === "down" ? 6 : 32,
                },
              },
            },
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ]}
        >
          <Box
            sx={{
              width: direction === "left" || direction === "right" ? 4 : 24,
              height: direction === "up" || direction === "down" ? 4 : 24,
              borderRadius: 2,
              bgcolor: colors.textMuted,
              transition: "all 0.2s ease",
            }}
          />
        </Box>
      );
  }
}

export default HudCollapseHandle;
