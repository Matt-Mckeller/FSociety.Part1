/**
 * realmActions — realm-scoped "next best action" tile cards for the
 * right-side map panel.
 *
 * Unlike the directional Why/What/How/Who cards (see `locationContent.ts`),
 * these cards are keyed by **realm** and surface the realm's headline
 * destination tiles. Each card carries two framings, toggled by the
 * Setup ↔ Explore segmented control:
 *
 *   - `setup`   — "configure this" — onboarding-oriented copy + features.
 *   - `explore` — "discover this"  — capability-oriented copy + features.
 *
 * A realm with no entry here (e.g. `website`, `technical`) falls back to
 * the directional cards, so existing realms render unchanged.
 *
 * Future: personalise the card set + ordering to the user's current
 * context, goals, and history (see the section tooltip).
 */

import HubRoundedIcon from "@mui/icons-material/HubRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";

import type { RealmKey } from "@4eye/web/lib/hud/realmRegistry";
import type { SvgIconLike } from "./types";

/** Which framing the Setup ↔ Explore toggle is showing. */
export type ActionMode = "setup" | "explore";

/** One framing of a tile card (copy + feature bullets). */
export interface TileCardFraming {
  /** One-line description shown under the title. */
  description: string;
  /** Short feature labels rendered as chips. */
  features: string[];
}

/** A realm destination tile rendered as a next-best-action card. */
export interface RealmTileCard {
  id: string;
  /** Tile id to navigate to when the card is clicked. */
  tileId: string;
  /** Card title — the tile's name. */
  label: string;
  /** Glyph shown in the card header (matches the map tile's icon). */
  Icon: SvgIconLike;
  /** Accent color (matches the map tile's active color). */
  accent: string;
  /** Setup framing — "configure this". */
  setup: TileCardFraming;
  /** Explore framing — "discover this". */
  explore: TileCardFraming;
}

/** Tile colors mirror `appNavigationConfig` so the cards echo the map. */
const BLUE = "#3b82f6";
const PURPLE = "#a855f7";

/**
 * App-realm headline tiles. Order = reading priority in the panel.
 * Plan → Room → Profile → Social.
 */
const APP_TILE_CARDS: RealmTileCard[] = [
  {
    id: "plan",
    tileId: "command",
    label: "Plan",
    Icon: HubRoundedIcon,
    accent: BLUE,
    setup: {
      description: "Plan Your World, Write your own story, and Become who you want to be.",
      features: ["Compass", "Work", "Executive Thinking"],
    },
    explore: {
      description: "Plan Your World, Write your own story, and Become who you want to be.",
      features: ["Compass", "Work", "Executive Thinking"],
    },
  },
  {
    id: "room",
    tileId: "rooms",
    label: "Room",
    Icon: MeetingRoomRoundedIcon,
    accent: BLUE,
    setup: {
      description: "Create your first room and invite people to collaborate.",
      features: ["Create a room", "Invite crew", "Set room goals"],
    },
    explore: {
      description: "Discover shared spaces where work and learning happen.",
      features: ["Live sessions", "Shared boards", "Room activity"],
    },
  },
  {
    id: "profile",
    tileId: "profile",
    label: "Profile",
    Icon: AccountCircleRoundedIcon,
    accent: BLUE,
    setup: {
      description: "Set up your avatar, identity, and preferences.",
      features: ["Avatar & identity", "Skills & traits", "Preferences"],
    },
    explore: {
      description: "Track your stats, achievements, and growth over time.",
      features: ["XP & level", "Achievements", "Progress timeline"],
    },
  },
  {
    id: "social",
    tileId: "social",
    label: "Social",
    Icon: GroupRoundedIcon,
    accent: PURPLE,
    setup: {
      description: "Connect with your classes and build out your crew.",
      features: ["Join classes", "Add crew", "Notifications"],
    },
    explore: {
      description: "Discover class feeds and what your crew is up to.",
      features: ["Class feed", "Crew activity", "Leaderboard"],
    },
  },
];

/** Realms that surface tile cards instead of the directional defaults. */
const REALM_TILE_CARDS: Partial<Record<RealmKey, RealmTileCard[]>> = {
  app: APP_TILE_CARDS,
};

/**
 * Tile cards for a realm, or `null` when the realm has none (caller
 * should fall back to the directional Why/What/How/Who cards).
 */
export function getRealmTileCards(realm: RealmKey): RealmTileCard[] | null {
  return REALM_TILE_CARDS[realm] ?? null;
}
