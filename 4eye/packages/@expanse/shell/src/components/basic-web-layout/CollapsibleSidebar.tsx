"use client"

import { useState } from "react"
import { Box, Typography, IconButton, Collapse, type SxProps, type Theme } from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Z_INDEX } from "@expanse/theme"

// =============================================================================
// Types
// =============================================================================

export interface CollapsibleSidebarProps {
  /** Side position (left or right) */
  side?: "left" | "right"
  /** Width when expanded in pixels (default: 240) */
  width?: number
  /** Initially collapsed */
  defaultCollapsed?: boolean
  /** Title text */
  title?: string
  /** Logo/branding element */
  logo?: React.ReactNode
  /** Main content */
  children?: React.ReactNode
  /** Glass morphism effect */
  glassEffect?: boolean
  /** Elevated style with shadow */
  elevated?: boolean
  /** Custom styles */
  sx?: SxProps<Theme>
}

// =============================================================================
// Component
// =============================================================================

/**
 * Collapsible sidebar for basic web layouts.
 * Can be minimized to save screen space with toggle button.
 * 
 * Used for navigation panels in traditional web apps (not HUD/spatial layouts).
 * 
 * @example
 * ```tsx
 * <CollapsibleSidebar
 *   side="left"
 *   width={240}
 *   title="Navigation"
 *   defaultCollapsed={false}
 * >
 *   <MenuItems />
 * </CollapsibleSidebar>
 * ```
 */
export function CollapsibleSidebar({
  side = "left",
  width = 240,
  defaultCollapsed = false,
  title,
  logo,
  children,
  glassEffect = false,
  elevated = false,
  sx,
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const collapsedWidth = 48
  const currentWidth = isCollapsed ? collapsedWidth : width

  const glassStyles: SxProps<Theme> = glassEffect
    ? {
        bgcolor: "rgba(20, 20, 30, 0.8)",
        backdropFilter: "blur(10px)",
        borderRight: side === "left" ? "1px solid" : undefined,
        borderLeft: side === "right" ? "1px solid" : undefined,
        borderColor: "divider",
      }
    : {
        bgcolor: "background.paper",
      }

  const elevationStyles: SxProps<Theme> = elevated
    ? {
        boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
      }
    : {}

  const CollapseIcon = side === "left" ? ChevronLeftIcon : ChevronRightIcon
  const ExpandIcon = side === "left" ? ChevronRightIcon : ChevronLeftIcon

  return (
    <Box
      sx={{
        position: "fixed",
        [side]: 0,
        top: 0,
        bottom: 0,
        width: currentWidth,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        zIndex: Z_INDEX.BARS,
        transition: "width 0.3s ease",
        ...glassStyles,
        ...elevationStyles,
        ...sx,
      }}
    >
      {/* Collapsed state - Just toggle button */}
      {isCollapsed && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            py: 2,
          }}
        >
          <IconButton
            onClick={() => setIsCollapsed(false)}
            size="small"
            color="primary"
          >
            <ExpandIcon />
          </IconButton>
        </Box>
      )}

      {/* Expanded state */}
      <Collapse
        in={!isCollapsed}
        orientation="horizontal"
        timeout={300}
        sx={{ width: "100%", height: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            height: "100%",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* Header section */}
          {(logo || title) && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 2,
                py: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                flexShrink: 0,
              }}
            >
              {logo && (
                <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  {logo}
                </Box>
              )}
              {title && (
                <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                  {title}
                </Typography>
              )}
              <IconButton
                onClick={() => setIsCollapsed(true)}
                size="small"
                sx={{ ml: "auto" }}
              >
                <CollapseIcon />
              </IconButton>
            </Box>
          )}

          {/* Content section */}
          <Box
            sx={{
              flexGrow: 1,
              overflow: "auto",
              px: 2,
              py: 2,
            }}
          >
            {children}
          </Box>
        </Box>
      </Collapse>
    </Box>
  )
}
