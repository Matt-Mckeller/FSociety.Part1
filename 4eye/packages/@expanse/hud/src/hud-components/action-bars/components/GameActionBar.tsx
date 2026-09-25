import React from "react"
import BackpackIcon from "@mui/icons-material/Backpack"
import AssignmentIcon from "@mui/icons-material/Assignment"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import BoltIcon from "@mui/icons-material/Bolt"

import { MenuOrbList, type MenuOrbItem } from "./MenuOrbList"

/**
 * Default game-bar pills shipped with the library. Exported so consumer
 * apps can spread + selectively override (e.g. wire `onClick` onto the
 * `quests` item from a downstream Quests modal provider) without copying
 * the icon imports or losing future additions.
 *
 * Stable keys: `spellbook` | `achievements` | `inventory` | `quests`.
 */
export const GAME_ITEMS: ReadonlyArray<MenuOrbItem> = [
  { key: "spellbook",    icon: <BoltIcon />,        label: "Spellbook",    tone: "primary" },
  { key: "achievements", icon: <EmojiEventsIcon />, label: "Achievements", tone: "warning" },
  { key: "inventory",    icon: <BackpackIcon />,    label: "Inventory",    tone: "accent"  },
  { key: "quests",       icon: <AssignmentIcon />,  label: "Quests",       tone: "danger", badge: 2 },
]

export interface GameActionBarProps {
  /**
   * Override the default item list. Use {@link GAME_ITEMS} as the base if
   * you only want to wire handlers / badges onto specific keys:
   *
   * ```tsx
   * const items = GAME_ITEMS.map(item =>
   *   item.key === "quests"
   *     ? { ...item, onClick: openQuestsModal, badge: unclaimedCount || undefined }
   *     : item,
   * )
   * <GameActionBar items={items} />
   * ```
   */
  items?: ReadonlyArray<MenuOrbItem>
  /**
   * Layout direction forwarded to {@link MenuOrbList}. Default `"vertical"`
   * for rail-mounted panels; use `"horizontal"` for inline shelves.
   */
  direction?: "vertical" | "horizontal"
}

/**
 * Pre-wired HUD game panel: Spellbook / Achievements / Inventory / Quests.
 *
 * Each pill carries its own brand triple-layer chrome (see {@link MenuOrbList}),
 * so no surrounding panel surface is needed.
 *
 * Pass `items` to override or extend the defaults — see {@link GAME_ITEMS}.
 */
export function GameActionBar({
  items = GAME_ITEMS,
  direction,
}: GameActionBarProps = {}) {
  return <MenuOrbList items={items} direction={direction} />
}
