"use client"

import React from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import HomeIcon from "@mui/icons-material/Home"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { ActionBar } from "../action-bars"
import type { ActionBarProps } from "../action-bars"
import { ActionButton } from "../action-button"
import { useNavigation } from "@expanse/map"

// =============================================================================
// Types
// =============================================================================

export type NavigationBarLayout = "horizontal" | "vertical" | "compact"

export interface NavigationBarProps
  extends Omit<ActionBarProps, "children" | "orientation"> {
  /**
   * Layout of nav buttons.
   * - "horizontal" (default): prev / home / next
   * - "vertical": up / home / down
   * - "compact": just back + forward
   * @default "horizontal"
   */
  layout?: NavigationBarLayout
  /** Show home button. @default true */
  showHome?: boolean
  /** Show "go back in history" button. @default false */
  showBack?: boolean
}

// =============================================================================
// Component
// =============================================================================

/**
 * NavigationBar — page navigation chrome.
 *
 * Wraps `ActionBar` with prev/next/home buttons wired to `useNavigation`.
 * Designed to live inside the `MinimapDock` slot or anywhere page navigation
 * belongs. Replaces stray prev/next action buttons in the HUD.
 *
 * @example
 * ```tsx
 * <NavigationBar layout="horizontal" variant="frosted" />
 * ```
 */
export function NavigationBar({
  layout = "horizontal",
  showHome = true,
  showBack = false,
  variant = "frosted",
  shape = "pill",
  thickness = "sm",
  ...rest
}: NavigationBarProps) {
  const { navigate, goHome, goBack, canNavigate, isHome } = useNavigation()

  const isVertical = layout === "vertical"

  const prevDir = isVertical ? "up" : "left"
  const nextDir = isVertical ? "down" : "right"
  const PrevIcon = isVertical ? KeyboardArrowUpIcon : ChevronLeftIcon
  const NextIcon = isVertical ? KeyboardArrowDownIcon : ChevronRightIcon

  return (
    <ActionBar
      variant={variant}
      shape={shape}
      thickness={thickness}
      orientation={isVertical ? "vertical" : "horizontal"}
      {...rest}
    >
      {showBack && (
        <ActionButton
          icon={<ArrowBackIcon />}
          label="Back"
          onClick={goBack}
        />
      )}
      <ActionButton
        icon={<PrevIcon />}
        label={isVertical ? "Previous (up)" : "Previous"}
        onClick={() => navigate(prevDir)}
        disabled={!canNavigate(prevDir)}
      />
      {showHome && (
        <ActionButton
          icon={<HomeIcon />}
          label="Home"
          onClick={goHome}
          active={isHome}
        />
      )}
      <ActionButton
        icon={<NextIcon />}
        label={isVertical ? "Next (down)" : "Next"}
        onClick={() => navigate(nextDir)}
        disabled={!canNavigate(nextDir)}
      />
    </ActionBar>
  )
}
