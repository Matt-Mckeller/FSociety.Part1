"use client"

import { Box, Chip, Divider, IconButton, Tooltip, Typography, type SxProps, type Theme } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import HelpIcon from "@mui/icons-material/Help"
import type { ComponentType, ReactNode } from "react"
import { useNavigation } from '@expanse/map/navigation'
import type { Position } from '@expanse/map/navigation/types'

// =============================================================================
// Types
// =============================================================================

/** Which edge of the screen the bar renders on — determines orientation */
export type SimpleBarEdge = "top" | "bottom" | "left" | "right"

/** A navigation item displayed in the bar */
export interface SimpleBarItem {
  id: string
  icon: ComponentType<{ sx?: SxProps<Theme> }>
  label: string
  /** Grid position to navigate to when clicked */
  position: Position
  hoverColor?: string
}

export interface SimpleBarProps {
  /** Edge to render on — controls orientation and border placement */
  edge?: SimpleBarEdge
  /** Height for top/bottom bars, width for left/right bars (default: 56) */
  size?: number
  /** Navigation items — primarily used in vertical (left/right) bars */
  items?: SimpleBarItem[]
  /** Start slot: left side of horizontal bars, top of vertical bars */
  startSlot?: ReactNode
  /** End slot: right side of horizontal bars, bottom of vertical bars */
  endSlot?: ReactNode
  /** Show current tile title — horizontal bars only */
  showTitle?: boolean
  /** Show home navigation button */
  showHome?: boolean
  /** Show settings button */
  showSettings?: boolean
  /** Show help button */
  showHelp?: boolean
  /** Override the home position */
  homePosition?: Position
  onSettingsClick?: () => void
  onHelpClick?: () => void
  /** Glass-morphism background style */
  glassEffect?: boolean
  /** Show divider after items — vertical bars only */
  showDivider?: boolean
  sx?: SxProps<Theme>
}

// =============================================================================
// Component
// =============================================================================

/**
 * A simple, orientation-aware layout bar.
 *
 * Renders as a horizontal strip (top/bottom) or vertical strip (left/right)
 * based on the `edge` prop. Horizontal bars show the current tile title and
 * action buttons; vertical bars primarily show icon-based navigation items.
 *
 * @example
 * ```tsx
 * // Horizontal top bar
 * <SimpleBar edge="top" showHome showTitle />
 *
 * // Vertical side bar with navigation items
 * <SimpleBar edge="left" items={sidebarItems} />
 *
 * // Bottom bar with custom slots
 * <SimpleBar
 *   edge="bottom"
 *   startSlot={<StatusIndicator />}
 *   endSlot={<UserMenu />}
 * />
 * ```
 */
export function SimpleBar({
  edge = "top",
  size = 56,
  items = [],
  startSlot,
  endSlot,
  showTitle = true,
  showHome = true,
  showSettings = false,
  showHelp = false,
  homePosition,
  onSettingsClick,
  onHelpClick,
  glassEffect = true,
  showDivider = true,
  sx,
}: SimpleBarProps) {
  const { currentTile, navigateTo, homePosition: defaultHome, position: currentPos } = useNavigation()

  const home = homePosition ?? defaultHome
  const isHorizontal = edge === "top" || edge === "bottom"

  const glassStyles: SxProps<Theme> = glassEffect
    ? { bgcolor: "rgba(20, 20, 30, 0.95)", backdropFilter: "blur(8px)" }
    : { bgcolor: "background.paper" }

  const borderStyles: Record<SimpleBarEdge, SxProps<Theme>> = {
    top: { borderBottom: "1px solid", borderColor: "divider" },
    bottom: { borderTop: "1px solid", borderColor: "divider" },
    left: { borderRight: "1px solid", borderColor: "divider" },
    right: { borderLeft: "1px solid", borderColor: "divider" },
  }

  return (
    <Box
      sx={ ({
        display: "flex",
        flexDirection: isHorizontal ? ("row" as const) : ("column" as const),
        alignItems: "center",
        justifyContent: isHorizontal ? ("space-between" as const) : ("flex-start" as const),
        ...(isHorizontal ? { px: 2, width: "100%", height: size } : { py: 2, height: "100%", width: size }),
        gap: 1,
        ...glassStyles,
        ...(borderStyles[edge] as SxProps<Theme>),
        ...sx,
      }) as SxProps<Theme>}
    >
      {/* Start section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {showHome && (
          <Tooltip title="Home">
            <IconButton
              onClick={() => navigateTo(home.x, home.y)}
              size="small"
              sx={{ color: "text.secondary" }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
        )}

        {isHorizontal && showTitle && currentTile && (
          <>
            <Typography variant="h6" sx={{ ml: 1 }}>
              {currentTile.seo.title}
            </Typography>
            {currentTile.display.category && (
              <Chip
                label={currentTile.display.category}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            )}
          </>
        )}

        {startSlot}
      </Box>

      {/* Navigation items (primarily for vertical bars) */}
      {items.map((item) => {
        const Icon = item.icon
        const isActive = currentPos.x === item.position.x && currentPos.y === item.position.y

        return (
          <Tooltip
            key={item.id}
            title={item.label}
            placement={isHorizontal ? "bottom" : edge === "left" ? "right" : "left"}
          >
            <IconButton
              onClick={() => navigateTo(item.position.x, item.position.y)}
              sx={{
                color: isActive ? "primary.main" : "text.secondary",
                "&:hover": {
                  color: item.hoverColor ?? "primary.light",
                  bgcolor: "action.hover",
                },
              }}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        )
      })}

      {!isHorizontal && showDivider && items.length > 0 && (
        <Divider sx={{ width: "60%", my: 1 }} />
      )}

      {/* End section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {endSlot}

        {showSettings && (
          <Tooltip title="Settings">
            <IconButton onClick={onSettingsClick} size="small" sx={{ color: "text.secondary" }}>
              <MoreHorizIcon />
            </IconButton>
          </Tooltip>
        )}

        {showHelp && (
          <Tooltip title="Help">
            <IconButton onClick={onHelpClick} size="small" sx={{ color: "text.secondary" }}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}
