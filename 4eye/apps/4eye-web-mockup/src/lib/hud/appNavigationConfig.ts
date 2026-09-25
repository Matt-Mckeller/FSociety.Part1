import { route } from "../routes";
import type { MapGridNavigationConfig } from "@expanse/map";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";

/**
 * 4eye App Realm HUD navigation grid (3 wide × 3 tall).
 *
 *   y=0:  game         sequences    command
 *   y=1:  rooms        ai-chat      social (includes classes)
 *   y=2:  profile      stores       journal (notes + recaps)
 *
 * The center tile hosts the AI Chat + Learn experience.
 * Learning tab is accessible via the Chat/Learn mode toggle inside the tile.
 *
 * Color groups:
 *   - blue   (primary):   game, rooms, profile, command
 *   - purple (secondary): social
 *   - emerald (explore):  sequences
 *   - teal   (tertiary):  stores, journal
 *   - indigo (anchor):    ai-chat (home/AI — distinct accent)
 */

const BLUE    = { inactive: "rgba(59,130,246,0.4)",   active: "#3b82f6" };
const PURPLE  = { inactive: "rgba(168,85,247,0.4)",   active: "#a855f7" };
const TEAL    = { inactive: "rgba(20,184,166,0.4)",   active: "#14b8a6" };
const EMERALD = { inactive: "rgba(16,185,129,0.4)",   active: "#10b981" };
/** Distinct accent for the home/AI anchor tile (center of the grid). */
const INDIGO  = { inactive: "rgba(99,102,241,0.45)",  active: "#6366f1" };

export const APP_HUD_NAV_CONFIG: MapGridNavigationConfig = {
  dimensions: {
    width: 3,
    height: 3,
    homePosition: { x: 1, y: 1 },
    wrapAround: true,
  },
  // Placeholder group names until taxonomy is settled. Legend surfaces
  // these via tooltip on swatches (inline labels stay hidden by default).
  categoryLabels: {
    primary:   "Group A",
    secondary: "Group B",
    tertiary:  "Group C",
  },
  routing: {
    mode: "hybrid",
    syncUrl: false,
    initialFromUrl: true,
  },
  tiles: [
    // Row 0
    {
      id: "game",
      position: { x: 0, y: 0 },
      url: route("/appRealm/classes"),
      seo: { title: "Game — 4eye" },
      display: { label: "Game", category: "primary", colors: BLUE, icon: SportsEsportsRoundedIcon },
    },
    {
      id: "sequences",
      position: { x: 1, y: 0 },
      url: route("/appRealm/map"),
      seo: { title: "Sequences — 4eye" },
      display: { label: "Sequences", category: "secondary", colors: EMERALD, icon: TimelineRoundedIcon },
    },
    {
      id: "command",
      position: { x: 2, y: 0 },
      url: route("/appRealm/command-center"),
      seo: { title: "Plan — 4eye" },
      display: { label: "Plan", category: "primary", colors: BLUE, icon: HubRoundedIcon },
    },
    // Row 1 (home center)
    {
      id: "rooms",
      position: { x: 0, y: 1 },
      url: route("/appRealm/rooms"),
      seo: { title: "Rooms — 4eye" },
      display: { label: "Rooms", category: "primary", colors: BLUE, icon: MeetingRoomRoundedIcon },
    },
    {
      id: "ai-chat",
      position: { x: 1, y: 1 },
      url: route("/appRealm/dashboard"),
      seo: { title: "AI Chat — 4eye" },
      display: { label: "AI Chat", category: "secondary", colors: INDIGO, icon: SmartToyRoundedIcon },
    },
    {
      id: "social",
      position: { x: 2, y: 1 },
      url: route("/appRealm/social"),
      seo: { title: "Social — 4eye" },
      display: { label: "Social", category: "secondary", colors: PURPLE, icon: GroupRoundedIcon },
    },
    // Row 2
    {
      id: "profile",
      position: { x: 0, y: 2 },
      url: route("/appRealm/profile"),
      seo: { title: "Profile — 4eye" },
      display: { label: "Profile", category: "primary", colors: BLUE, icon: AccountCircleRoundedIcon },
    },
    {
      id: "stores",
      position: { x: 1, y: 2 },
      url: route("/appRealm/stores"),
      seo: { title: "Stores — 4eye" },
      display: { label: "Stores", category: "tertiary", colors: TEAL, icon: StorefrontRoundedIcon },
    },
    {
      id: "journal",
      position: { x: 2, y: 2 },
      url: route("/appRealm/notes"),
      seo: { title: "Journal — 4eye" },
      display: { label: "Journal", category: "tertiary", colors: TEAL, icon: MenuBookRoundedIcon },
    },
  ],
};
