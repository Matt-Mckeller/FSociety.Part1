import React from "react"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import LabelIcon from "@mui/icons-material/Label"
import LabelOffIcon from "@mui/icons-material/LabelOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"

import { MenuOrbList, type MenuOrbItem } from "./MenuOrbList"
import { useActionBarVisibility, useRailPreferences } from "../../../hud/overlay-state"

interface SettingsActionBarProps {
  mode: "light" | "dark"
  onThemeModeChange: (next: "light" | "dark") => void
  onAccessibilityClick?: () => void
}

/**
 * HUD settings panel: theme toggle + accessibility + rail label toggle,
 * rendered with the shared {@link MenuOrbList} pattern so it matches
 * every other HUD FAB panel. Pass to `FabTrigger.panel`.
 */
export function SettingsActionBar({
  mode,
  onThemeModeChange,
  onAccessibilityClick,
}: SettingsActionBarProps) {
  const isDark = mode === "dark"
  const {
    labelsVisible,
    toggleLabels,
    chromeGuideVisible,
    toggleChromeGuide,
  } = useRailPreferences()
  const { visible: barsVisible, toggle: toggleBars } = useActionBarVisibility()
  const items: ReadonlyArray<MenuOrbItem> = [
    {
      key: "theme",
      icon: isDark ? <LightModeIcon /> : <DarkModeIcon />,
      label: isDark ? "Switch to light mode" : "Switch to dark mode",
      tone: "warning",
      onClick: () => onThemeModeChange(isDark ? "light" : "dark"),
    },
    {
      key: "action-bars",
      icon: barsVisible ? <VisibilityIcon /> : <VisibilityOffIcon />,
      label: barsVisible ? "Hide bars" : "Show bars",
      tone: "primary",
      onClick: toggleBars,
    },
    {
      key: "rail-labels",
      icon: labelsVisible ? <LabelIcon /> : <LabelOffIcon />,
      label: labelsVisible ? "Hide button labels" : "Show button labels",
      tone: "primary",
      onClick: toggleLabels,
    },
    {
      key: "chrome-guide",
      icon: <TravelExploreIcon />,
      label: chromeGuideVisible
        ? "Hide HUD chrome names"
        : "Show HUD chrome names",
      tone: "info",
      onClick: toggleChromeGuide,
    },
    {
      key: "accessibility",
      icon: <AccessibilityNewIcon />,
      label: "Accessibility",
      tone: "info",
      onClick: onAccessibilityClick,
    },
  ]
  return <MenuOrbList items={items} />
}
