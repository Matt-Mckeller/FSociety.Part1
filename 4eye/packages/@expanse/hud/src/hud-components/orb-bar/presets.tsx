import React, { type ReactNode } from "react"

// Default-context icons
import ExploreIcon from "@mui/icons-material/Explore"
import ChatIcon from "@mui/icons-material/Chat"
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined"
import EditIcon from "@mui/icons-material/Edit"
import LoginIcon from "@mui/icons-material/Login"

// Game-context icons
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import AssignmentIcon from "@mui/icons-material/Assignment"
import BoltIcon from "@mui/icons-material/Bolt"

// Learn-context icons
import SchoolIcon from "@mui/icons-material/School"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import QuizIcon from "@mui/icons-material/Quiz"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"

import type { OrbItem } from "../orbs"

// =============================================================================
// Types
// =============================================================================

export type OrbBarContext = "default" | "game" | "learn"

export interface OrbBarContextPreset {
  /** Display label for the bar */
  label: string
  /** Default orb items for this context */
  items: OrbItem[]
}

// =============================================================================
// Helpers
// =============================================================================

const icon = (Component: React.ComponentType): ReactNode => <Component />

// =============================================================================
// Presets
// =============================================================================

export const ORB_BAR_PRESETS: Record<OrbBarContext, OrbBarContextPreset> = {
  default: {
    label: "Actions",
    items: [
      { id: "explore",  icon: icon(ExploreIcon),     label: "Explore",  color: "primary" },
      { id: "chat",     icon: icon(ChatIcon),        label: "Chat",     color: "ai" },
      { id: "edit",     icon: icon(EditIcon),        label: "Edit",     color: "default" },
      { id: "help",     icon: icon(HelpOutlineIcon), label: "Help",     color: "info" },
      {
        id: "sign-in",
        icon: icon(LoginIcon),
        label: "Sign In",
        color: "primary",
        // TODO: wire to real auth flow. For now log so we can see it fired.
        onClick: () => {
          // eslint-disable-next-line no-console
          console.log("[orb-bar] Sign In clicked")
        },
      },
    ],
  },
  game: {
    label: "Quick actions",
    items: [
      { id: "play",      icon: icon(SportsEsportsIcon), label: "Play",      color: "primary", hotkey: "P" },
      { id: "inventory", icon: icon(Inventory2Icon),    label: "Inventory", color: "warning", hotkey: "I" },
      { id: "quests",    icon: icon(AssignmentIcon),    label: "Quests",    color: "success", hotkey: "Q" },
      { id: "achievements", icon: icon(EmojiEventsIcon), label: "Achievements", color: "warning", hotkey: "A" },
      { id: "ability",   icon: icon(BoltIcon),          label: "Ability",   color: "ai", hotkey: "E" },
    ],
  },
  learn: {
    label: "Learn",
    items: [
      { id: "practice", icon: icon(SchoolIcon),       label: "Practice",  color: "primary" },
      { id: "quiz",     icon: icon(QuizIcon),         label: "Quiz me",   color: "success" },
      { id: "explain",  icon: icon(LightbulbIcon),    label: "Explain",   color: "info" },
      { id: "simplify", icon: icon(AutoAwesomeIcon),  label: "Simplify",  color: "ai" },
    ],
  },
}
