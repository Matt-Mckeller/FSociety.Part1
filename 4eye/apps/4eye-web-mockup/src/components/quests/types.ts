/**
 * Quests — domain types.
 *
 * v2: quests carry an optional `trigger` — an exploration-event key (see
 * `@4eye/web/components/exploration`) that the provider checks against the live
 * exploration ledger to derive real completion. Quests with no `trigger`
 * fall back to the v1 static `completed` flag (used for the genuinely
 * time-based `early-explorer` quest and the not-yet-buildable
 * `join-edu` quest). The provider layers `claimed` state on top via
 * `localStorage`, unchanged from v1.
 *
 * See `_Implementation_plans/projects/quests.md`.
 */

import type { ReactNode } from "react"

/**
 * Visual + interaction state of a single quest card. Derived inside
 * the provider — never stored on the seed.
 */
export type QuestStatus = "incomplete" | "completed-unclaimed" | "completed-claimed"

export interface Quest {
  /**
   * Stable id used as the React key, the localStorage entry key, and the
   * coin-fly animation correlation key. Keep snake-or-kebab cased and
   * stable across deploys.
   */
  id: string

  /** Card title rendered in 700-weight body text. */
  title: string

  /**
   * One-line subtitle describing the quest. Plain string today; can be
   * upgraded to ReactNode if we want inline icons.
   */
  description: string

  /**
   * Optional larger badge / illustration. Defaults to a generic icon
   * when omitted. Keep visually small (≤32px) — the card is dense.
   */
  icon?: ReactNode

  /**
   * Coins awarded on claim. Drives the coin-fly animation count and the
   * `addCoins()` call to MarketingProgress.
   */
  rewardCoins: number

  /**
   * Optional XP reward label for display in compact quest chips.
   *
   * Current provider only awards coins; this field is present so the UI
   * can show motivational "coins + XP" framing without coupling to the
   * provider math. If omitted, UI may derive a lightweight default.
   */
  rewardXp?: number

  /**
   * Exploration-event key (see `@4eye/web/components/exploration`) that marks
   * this quest complete once fired, e.g. `"route:/projects"` or
   * `"action:lens-toggle"`. When set, this takes priority over
   * `completed` for deriving live completion.
   */
  trigger?: string

  /**
   * Static v1 fallback completion flag, used only when `trigger` is
   * unset (time-based/ungated quests like `early-explorer`, or quests
   * intentionally left out of scope like `join-edu`). The provider
   * combines the effective completed value with the persisted `claimed`
   * set to derive the {@link QuestStatus}:
   *
   *   - `completed=false` -> `"incomplete"`
   *   - `completed=true & !claimed` -> `"completed-unclaimed"`
   *   - `completed=true & claimed` -> `"completed-claimed"`
   */
  completed: boolean

  /**
   * Optional next-action hint shown on incomplete cards. When provided,
   * the incomplete card becomes a clickable link: clicking dismisses
   * the modal and navigates to this href so the user can go do the
   * thing.
   */
  unlocksHref?: string

  /**
   * Visible label for the `unlocksHref` link (defaults to "Go do it").
   * Ignored when `unlocksHref` is not set.
   */
  unlocksLabel?: string
}
