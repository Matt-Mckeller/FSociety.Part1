/**
 * Sample quest seed for the marketing prototype.
 *
 * v2: most quests now carry a `trigger` — an exploration-event key (see
 * `@4eye/web/components/exploration`) — so completion reflects what the user
 * actually did instead of a hand-asserted flag. Two quests intentionally
 * still rely on the static v1 `completed` fallback:
 *
 *   - `early-explorer`  — genuinely time-based (grandfathered), no
 *     real "action" to trigger off of.
 *   - `join-edu`        — out of scope for now; its `/edu` route +
 *     signup form don't exist yet, so it stays permanently locked.
 *
 * The `claimed` half of the state lives in localStorage and is owned by
 * QuestsProvider — so after the user clicks Claim, the same seed item
 * flips from `completed-unclaimed` to `completed-claimed` without
 * touching this file.
 */

import type { Quest } from "./types"

export const QUEST_SEED: ReadonlyArray<Quest> = [
  {
    id: "explore-highlights",
    title: "Explore the Highlights",
    description: "You watched the home reel.",
    rewardCoins: 12,
    rewardXp: 50,
    trigger: "media:home-reel-watched",
    completed: false,
  },
  {
    id: "view-projects",
    title: "Tour the Projects",
    description: "You opened the projects page.",
    rewardCoins: 10,
    rewardXp: 40,
    trigger: "route:/projects",
    completed: false,
  },
  {
    id: "early-explorer",
    title: "Early Explorer",
    description: "Visited 4eye in its first month.",
    rewardCoins: 5,
    rewardXp: 20,
    completed: true,
  },
  {
    id: "minimap-mastery",
    title: "Minimap Mastery",
    description: "Opened the full map for the first time.",
    rewardCoins: 8,
    rewardXp: 30,
    trigger: "action:minimap-open",
    completed: false,
  },
  {
    id: "lens-toggle",
    title: "See it Both Ways",
    description: "Toggle the brand-promise lens to flip Goal ↔ Translation.",
    rewardCoins: 15,
    rewardXp: 60,
    trigger: "action:lens-toggle",
    completed: false,
    unlocksHref: "/projects",
    unlocksLabel: "Try the lens",
  },
  {
    id: "join-edu",
    title: "Join the Edu Beta",
    description: "Sign up to be notified when 4eye Edu opens.",
    rewardCoins: 20,
    rewardXp: 75,
    completed: false,
    unlocksHref: "/edu",
    unlocksLabel: "Open Edu",
  },
  {
    id: "curious-clicker",
    title: "Curious Clicker",
    description: "Click around and explore the app.",
    rewardCoins: 10,
    rewardXp: 30,
    trigger: "engagement:10-clicks",
    completed: false,
  },
]
