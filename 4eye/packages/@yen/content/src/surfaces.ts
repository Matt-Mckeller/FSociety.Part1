/**
 * 4eye surface inventory.
 *
 * Taken from a diff of every route in `apps/4eye-web-mockup/src/app` against
 * the three navigation configs (`appNavigationConfig`, `websiteNavigationConfig`,
 * `technicalNavigationConfig`) on 2026-08-06.
 *
 * `reach` is the interesting column. A surface can be fully built and still be
 * unreachable — either it has a route that no navigation links to, or it has no
 * route at all. Both cases are recorded rather than quietly omitted, because
 * "what exists but cannot be found" was the single most useful thing the audit
 * turned up.
 */

export type SurfaceReach =
  /** Linked from navigation — a visitor can find it. */
  | "linked"
  /** Route exists, no nav entry. Reachable only by typing the URL. */
  | "unlinked"
  /** Built feature with no route pointing at it at all. */
  | "no-route";

export type SurfaceRealm = "app" | "website" | "technical" | "unrouted";

export interface Surface {
  id: string;
  label: string;
  realm: SurfaceRealm;
  reach: SurfaceReach;
  /** Route path, or null where none exists. */
  path: string | null;
  /** Approximate built size of the backing feature, where measured. */
  size?: string;
  note?: string;
}

export const REACH_META: Record<SurfaceReach, { label: string; color: string }> = {
  linked: { label: "Linked", color: "#16a34a" },
  unlinked: { label: "No nav entry", color: "#f59e0b" },
  "no-route": { label: "No route", color: "#ef4444" },
};

export const REALM_META: Record<SurfaceRealm, { label: string; blurb: string }> = {
  app: { label: "App realm", blurb: "The product surface a signed-in player uses." },
  website: { label: "Website realm", blurb: "The public-facing marketing and explanation surface." },
  technical: { label: "Technical", blurb: "Developer-facing reference for the platform." },
  unrouted: { label: "Built, unrouted", blurb: "Features with no route pointing at them at all." },
};

export const SURFACES: Surface[] = [
  // ── App realm ──────────────────────────────────────────────────────────
  { id: "dashboard", label: "Dashboard", realm: "app", reach: "linked", path: "/appRealm/dashboard" },
  { id: "map", label: "Map", realm: "app", reach: "linked", path: "/appRealm/map" },
  {
    id: "media-studio",
    label: "Media Studio",
    realm: "app",
    reach: "linked",
    path: "/appRealm/media",
    note: "Make media action from Sequences — library, cut pipeline, publish to Videos.",
  },
  { id: "command-center", label: "Command Center", realm: "app", reach: "linked", path: "/appRealm/command-center", size: "604 KB" },
  { id: "classes", label: "Classes", realm: "app", reach: "linked", path: "/appRealm/classes" },
  { id: "notes", label: "Notes", realm: "app", reach: "linked", path: "/appRealm/notes" },
  { id: "profile", label: "Profile", realm: "app", reach: "linked", path: "/appRealm/profile" },
  { id: "rooms", label: "Rooms", realm: "app", reach: "linked", path: "/appRealm/rooms" },
  { id: "social", label: "Social", realm: "app", reach: "linked", path: "/appRealm/social" },
  { id: "stores", label: "Stores", realm: "app", reach: "linked", path: "/appRealm/stores" },
  {
    id: "character",
    label: "Character",
    realm: "app",
    reach: "unlinked",
    path: "/appRealm/character",
    size: "604 KB",
    note: "The largest single feature in the app, and nothing links to it.",
  },
  { id: "inventory", label: "Inventory", realm: "app", reach: "unlinked", path: "/appRealm/inventory", size: "60 KB" },
  { id: "learning", label: "Learning", realm: "app", reach: "unlinked", path: "/appRealm/learning", size: "84 KB" },
  { id: "recaps", label: "Recaps", realm: "app", reach: "unlinked", path: "/appRealm/recaps" },

  // ── Website realm ──────────────────────────────────────────────────────
  { id: "home", label: "Home", realm: "website", reach: "linked", path: "/" },
  { id: "why", label: "Why", realm: "website", reach: "linked", path: "/why" },
  { id: "who", label: "Who", realm: "website", reach: "linked", path: "/who" },
  { id: "learn", label: "Learn", realm: "website", reach: "linked", path: "/learn" },
  { id: "money", label: "Money", realm: "website", reach: "linked", path: "/money" },
  { id: "projects", label: "Projects", realm: "website", reach: "linked", path: "/projects" },
  { id: "gamification", label: "Gamification", realm: "website", reach: "linked", path: "/gamification" },
  { id: "marketing-content", label: "Marketing content", realm: "website", reach: "unlinked", path: "/marketing-content" },
  {
    id: "integration-layers",
    label: "Integration layers",
    realm: "website",
    reach: "unlinked",
    path: "/integration-layers",
    size: "260 KB",
    note: "Now represented on this site as its own page.",
  },
  { id: "sample", label: "Sample", realm: "website", reach: "unlinked", path: "/sample", size: "84 KB" },

  // ── Technical ──────────────────────────────────────────────────────────
  { id: "technical", label: "Overview", realm: "technical", reach: "linked", path: "/technical" },
  { id: "api", label: "API", realm: "technical", reach: "linked", path: "/technical/api" },
  { id: "auth", label: "Auth", realm: "technical", reach: "linked", path: "/technical/auth" },
  { id: "data", label: "Data", realm: "technical", reach: "linked", path: "/technical/data" },
  { id: "sdk", label: "SDK", realm: "technical", reach: "linked", path: "/technical/sdk" },
  { id: "webhooks", label: "Webhooks", realm: "technical", reach: "linked", path: "/technical/webhooks" },
  { id: "pipelines", label: "Pipelines", realm: "technical", reach: "linked", path: "/technical/pipelines" },
  { id: "performance", label: "Performance", realm: "technical", reach: "linked", path: "/technical/performance" },
  { id: "tech-integrations", label: "Integrations", realm: "technical", reach: "linked", path: "/technical/integrations" },
  { id: "changelog", label: "Changelog", realm: "technical", reach: "linked", path: "/technical/changelog" },

  // ── Built, no route ────────────────────────────────────────────────────
  { id: "profiles", label: "Profiles", realm: "unrouted", reach: "no-route", path: null, size: "224 KB", note: "Identity/data counterpart to the Character tile." },
  { id: "create", label: "Create", realm: "unrouted", reach: "no-route", path: null, size: "204 KB" },
  { id: "scene-studio", label: "Scene Studio", realm: "unrouted", reach: "no-route", path: null, size: "124 KB", note: "Image generation pipeline; has its own API and CLI." },
  { id: "spellbook", label: "Spellbook", realm: "unrouted", reach: "no-route", path: null, size: "84 KB" },
  { id: "journal", label: "Journal", realm: "unrouted", reach: "no-route", path: null, size: "84 KB" },
  { id: "entity-tile", label: "Entity Tile", realm: "unrouted", reach: "no-route", path: null, size: "92 KB", note: "Shared building block rather than a destination." },
];

export function surfacesInRealm(realm: SurfaceRealm): Surface[] {
  return SURFACES.filter((s) => s.realm === realm);
}

export const REACH_COUNTS = {
  linked: SURFACES.filter((s) => s.reach === "linked").length,
  unlinked: SURFACES.filter((s) => s.reach === "unlinked").length,
  noRoute: SURFACES.filter((s) => s.reach === "no-route").length,
};
