/**
 * locationContent — defaults + per-tile overrides for the bottom two
 * sections of the right-side map context panel.
 *
 * - Next Best Actions: a default list of suggested tiles + a per-tile
 *   override map (keyed by `tileId`).
 * - Navigation Suggestions: per-direction default slot (question icon,
 *   page label, chip kinds) + a per-tile override map that can replace
 *   any direction's slot.
 *
 * v1 placeholder data — wire to real tile metadata later.
 */

import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
// Page icons — small glyph next to each direction's destination label.
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import type {
  ContentItem,
  Direction,
  DirectionSlot,
  LocationContent,
} from "./types";

/**
 * Default direction slots — one per cardinal direction. Shown when no
 * per-tile override exists. The chip kinds are intentionally distinct
 * per direction so the user learns the spatial vocabulary:
 *
 *   ↑ Up    = Why  (purpose, emotion, what matters)
 *   ← Left  = What (definitions, complexity, demos)
 *   → Right = How  (process, references, media)
 *   ↓ Down  = Who  (audience, money, brand)
 */
export const DEFAULT_NAVIGATION: Record<Direction, DirectionSlot> = {
  up: {
    question: "Why",
    QuestionIcon: HelpCenterRoundedIcon,
    pageLabel: "Purpose",
    PageIcon: FlagRoundedIcon,
    difficulty: 2,
    minutesEstimate: "~2 min",
    recommendationReason: "Best starting point — sets the context for everything else.",
    chipKinds: ["emotion", "purpose", "highValue", "highlights"],
  },
  left: {
    question: "What",
    QuestionIcon: HelpOutlineRoundedIcon,
    pageLabel: "Explore",
    PageIcon: ExploreRoundedIcon,
    difficulty: 3,
    minutesEstimate: "~5 min",
    chipKinds: ["explore", "details", "demo", "feelings", "process", "memory"],
  },
  right: {
    question: "How",
    QuestionIcon: SettingsSuggestRoundedIcon,
    pageLabel: "Reference",
    PageIcon: MenuBookRoundedIcon,
    difficulty: 4,
    minutesEstimate: "~10 min",
    chipKinds: ["factual", "media", "process", "memory"],
  },
  down: {
    question: "Who",
    QuestionIcon: PersonSearchRoundedIcon,
    pageLabel: "People",
    PageIcon: GroupsRoundedIcon,
    difficulty: 1,
    minutesEstimate: "~1 min",
    chipKinds: ["brand", "money", "future"],
  },
};

/** Default Next Best Actions when no per-tile list is registered. */
export const DEFAULT_NEXT_BEST_ACTIONS: ContentItem[] = [
  { id: "nba-tour",      label: "Take the tour",         Icon: RocketLaunchRoundedIcon, blurb: "60-second orientation." },
  { id: "nba-overview",  label: "See the overview",      Icon: VisibilityRoundedIcon,   blurb: "What 4eye does, in one screen." },
  { id: "nba-quickwin",  label: "Claim a quick win",     Icon: EmojiEventsRoundedIcon,  blurb: "First reward in under a minute." },
  { id: "nba-connect",   label: "Connect related tiles", Icon: HubRoundedIcon,          blurb: "Discover what links here." },
];

/** Per-tile content overrides. Keyed by tile id. */
const TILE_OVERRIDES: Record<string, LocationContent> = {
  // Example seed entry — extend as the map data fills out.
  // "rewards": {
  //   nextBestActions: [...],
  //   navigation: { up: { ...DEFAULT_NAVIGATION.up, pageLabel: "Welcome" } },
  // },
};

/**
 * Resolve location-scoped content for the active tile, falling back to
 * the section defaults when no override is registered.
 */
export function getLocationContent(tileId: string | null): {
  nextBestActions: ContentItem[];
  navigation: Record<Direction, DirectionSlot>;
} {
  const override = (tileId && TILE_OVERRIDES[tileId]) || {};

  return {
    nextBestActions: override.nextBestActions ?? DEFAULT_NEXT_BEST_ACTIONS,
    navigation: {
      up:    override.navigation?.up    ?? DEFAULT_NAVIGATION.up,
      down:  override.navigation?.down  ?? DEFAULT_NAVIGATION.down,
      left:  override.navigation?.left  ?? DEFAULT_NAVIGATION.left,
      right: override.navigation?.right ?? DEFAULT_NAVIGATION.right,
    },
  };
}
