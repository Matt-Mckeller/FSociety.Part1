"use client"

import React from "react"
import {
  Box,
  IconButton,
  Tooltip,
  Badge,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material"
import type { NavBarProps, NavItemProps } from "../types/NavBar.types"
import type { NavItem } from "../types/ActionBarPosition.types"
import {
  resolveActionBarPosition,
  resolveActionBarSize,
} from "../types/ActionBarPosition.types"

// =============================================================================
// NavItem Component
// =============================================================================

/**
 * Individual navigation item
 */
function NavItemButton({
  item,
  isActive = false,
  showActiveIndicator = true,
  orientation = "horizontal",
  onClick,
  sx,
}: NavItemProps) {
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: orientation === "vertical" ? "column" : "row",
        alignItems: "center",
        gap: 0.5,
        position: "relative",
        ...sx,
      }}
    >
      {/* Icon */}
      {item.icon && (
        <IconButton
          onClick={onClick}
          disabled={item.disabled}
          sx={{
            color: isActive ? "primary.main" : "text.secondary",
            "&:hover": {
              color: "primary.main",
              bgcolor: "action.hover",
            },
          }}
        >
          {item.badge !== undefined ? (
            <Badge badgeContent={item.badge} color="error" max={99}>
              {item.icon}
            </Badge>
          ) : (
            item.icon
          )}
        </IconButton>
      )}
      
      {/* Label (shown in vertical orientation or if no icon) */}
      {(orientation === "vertical" || !item.icon) && item.label && (
        <Typography
          variant="caption"
          sx={{
            color: isActive ? "primary.main" : "text.secondary",
            fontSize: orientation === "vertical" ? "0.65rem" : "0.75rem",
            fontWeight: isActive ? 600 : 400,
            textAlign: "center",
            maxWidth: 64,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.label}
        </Typography>
      )}
      
      {/* Active indicator */}
      {showActiveIndicator && isActive && (
        <Box
          sx={{
            position: "absolute",
            bottom: orientation === "horizontal" ? -4 : undefined,
            left: orientation === "vertical" ? -4 : "50%",
            transform: orientation === "horizontal" ? "translateX(-50%)" : undefined,
            top: orientation === "vertical" ? "50%" : undefined,
            width: orientation === "horizontal" ? 4 : 4,
            height: orientation === "horizontal" ? 4 : 4,
            borderRadius: "50%",
            bgcolor: "primary.main",
          }}
        />
      )}
    </Box>
  )
  
  // Wrap in tooltip if there's a tooltip or label (for icon-only items)
  const tooltipTitle = item.tooltip || (item.icon && !item.icon && item.label)
  if (tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle} placement={orientation === "vertical" ? "right" : "top"}>
        {content}
      </Tooltip>
    )
  }
  
  return content
}

// =============================================================================
// NavBar Component
// =============================================================================

/**
 * NavBar Component
 * 
 * A specialized ActionBar for navigation. Displays NavItems with active state
 * indication based on current position.
 * 
 * @example
 * ```tsx
 * <NavBar
 *   items={navItems}
 *   currentPosition={{ x: 1, y: 0 }}
 *   position="bottom-center"
 *   showActiveIndicator
 *   onNavigate={(item) => navigateTo(item.position)}
 * />
 * ```
 */
export function NavBar({
  items,
  currentPosition,
  position = "bottom-center",
  size = "md",
  skin,
  showActiveIndicator = true,
  onNavigate,
  sx,
}: NavBarProps) {
  const resolvedPosition = resolveActionBarPosition(position)
  const resolvedSize = resolveActionBarSize(size)
  
  const isHorizontal = resolvedPosition.orientation !== "vertical"
  
  // Determine active item
  const isItemActive = (item: NavItem): boolean => {
    if (item.active !== undefined) return item.active
    if (!currentPosition) return false
    return item.position.x === currentPosition.x && item.position.y === currentPosition.y
  }
  
  // Skin styles
  const skinStyles: SxProps<Theme> = skin?.background === "glass"
    ? {
        bgcolor: "rgba(20, 20, 30, 0.85)",
        backdropFilter: `blur(${skin.blur ?? 12}px)`,
        border: "1px solid",
        borderColor: "divider",
      }
    : skin?.background === "transparent"
    ? {
        bgcolor: "transparent",
      }
    : {
        bgcolor: skin?.background ?? "background.paper",
      }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: isHorizontal ? 1 : 2,
        px: isHorizontal ? 2 : 1,
        minHeight: isHorizontal ? resolvedSize : undefined,
        minWidth: !isHorizontal ? resolvedSize : undefined,
        borderRadius: skin?.borderRadius ?? 2,
        boxShadow: skin?.shadow ? 3 : undefined,
        ...skinStyles,
        ...sx,
      }}
    >
      {items
        .filter(item => !item.hidden)
        .map(item => (
          <NavItemButton
            key={item.id}
            item={item}
            isActive={isItemActive(item)}
            showActiveIndicator={showActiveIndicator}
            orientation={isHorizontal ? "horizontal" : "vertical"}
            onClick={() => {
              item.onClick?.()
              onNavigate?.(item)
            }}
          />
        ))}
    </Box>
  )
}

export default NavBar
