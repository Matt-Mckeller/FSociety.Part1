import { route } from "../routes";
import type { MapGridNavigationConfig } from "@expanse/map";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

/**
 * 4eye marketing HUD navigation grid (3 wide × 4 tall, wrapAround).
 *
 *   y=0:  ·                money            ·
 *   y=1:  gamification     why              soon (placeholder)
 *   y=2:  projects         HOME (/)         learn
 *   y=3:  ·                who              ·
 *
 * Shoulders at y=1 (Game left of Why, Soon right of Why) keep the
 * occupied set symmetric so it reads as a plus, not a pistol. Both
 * shoulders are open-fill circular chips with Expanse 1:2:3 rings:
 *   - Game: ink rings
 *   - Soon: gray rings
 * Every other tile keeps its category fill.
 *
 * Color groups:
 *   - blue    (primary):   projects, learn, who, money, why
 *   - neutral (secondary): home — a calm slate anchor at the center,
 *                          distinct from the blue section tiles without
 *                          competing for attention. Note this value is used
 *                          as a *swatch background* behind a white icon in
 *                          the location bar, so it must stay dark enough for
 *                          the white glyph to read (a near-white silver would
 *                          vanish) — hence slate, not pure silver.
 *   - purple  (tertiary):  gamification
 *
 * Note: marketing-content has been folded into Learn; the
 * `/marketing-content` route redirects to `/learn`.
 */

const BLUE    = { inactive: "rgba(59,130,246,0.4)",   active: "#3b82f6" };
const NEUTRAL = { inactive: "rgba(100,116,139,0.4)",  active: "#64748b" };
const PURPLE  = { inactive: "rgba(168,85,247,0.4)",   active: "#a855f7" };
const GRAY    = { inactive: "rgba(120,113,108,0.35)", active: "#78716c" };
/** Game shoulder — ink rings, open fill. */
const RING_INK = "#1c1917";
/** Soon shoulder — stone gray rings, open fill. */
const RING_GRAY = "#78716c";

export const WEBSITE_HUD_NAV_CONFIG: MapGridNavigationConfig = {
  dimensions: {
    width: 3,
    height: 4,
    homePosition: { x: 1, y: 2 },
    wrapAround: true,
  },
  // Human-readable group labels for the minimap legend. Categories are
  // keyed on the same values used in `tiles[].display.category` below.
  // Colors come from the theme (theme.components.ExpanseMinimapTile.
  // categoryColors); this map only owns the legend label half.
  //
  // Placeholders until real group names are settled — legend shows them
  // via tooltip on the color swatches (not as prominent inline text).
  categoryLabels: {
    primary:   "Group A",
    secondary: "Group B",
    tertiary:  "Group C",
  },
  // Next.js owns URL state. Keep `mode: "hybrid"` so `initialFromUrl` maps the
  // current pathname → tile on hard-load, but disable `syncUrl` so the
  // built-in `useRouteSync` does not fight `NextRouterNavigationBridge` by
  // calling `window.history.replaceState` on every position change.
  routing: {
    mode: "hybrid",
    syncUrl: false,
    initialFromUrl: true,
  },
  tiles: [
    // Row 0
    {
      id: "money",
      position: { x: 1, y: 0 },
      url: route("/money"),
      seo: { title: "Money — 4eye" },
      display: { label: "Money", category: "primary", colors: BLUE, icon: AttachMoneyRoundedIcon },
    },
    // Row 1
    {
      id: "gamification",
      position: { x: 0, y: 1 },
      url: route("/gamification"),
      seo: { title: "Gamification — 4eye" },
      display: {
        label: "Game",
        category: "tertiary",
        colors: PURPLE,
        icon: SportsEsportsRoundedIcon,
        chip: "outline",
        ring: RING_INK,
      },
    },
    {
      id: "why",
      position: { x: 1, y: 1 },
      url: route("/why"),
      seo: { title: "Why — 4eye" },
      display: { label: "Why", category: "primary", colors: BLUE, icon: AutoAwesomeRoundedIcon },
    },
    {
      id: "soon",
      position: { x: 2, y: 1 },
      seo: { title: "Soon — 4eye" },
      behavior: { disabled: true },
      display: {
        label: "Soon",
        category: "secondary",
        colors: GRAY,
        icon: RadioButtonUncheckedRoundedIcon,
        chip: "outline",
        ring: RING_GRAY,
      },
    },
    // Row 2 (home center)
    {
      id: "projects",
      position: { x: 0, y: 2 },
      url: route("/projects"),
      seo: { title: "Projects — 4eye" },
      display: { label: "Projects", category: "primary", colors: BLUE, icon: InsightsRoundedIcon },
    },
    {
      id: "home",
      position: { x: 1, y: 2 },
      url: route("/"),
      seo: { title: "4eye Marketing" },
      display: { label: "Home", category: "secondary", colors: NEUTRAL, icon: HomeRoundedIcon },
    },
    {
      id: "learn",
      position: { x: 2, y: 2 },
      url: route("/learn"),
      seo: { title: "Learn — 4eye" },
      display: { label: "Learn", category: "primary", colors: BLUE, icon: AccountTreeRoundedIcon },
    },
    // Row 3
    {
      id: "who",
      position: { x: 1, y: 3 },
      url: route("/who"),
      seo: { title: "Who — 4eye" },
      display: { label: "Who", category: "primary", colors: BLUE, icon: RocketLaunchRoundedIcon },
    },
  ],
};
