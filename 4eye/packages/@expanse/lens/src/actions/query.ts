/**
 * Action query utilities — filter & sort over the materialized ACTIONS.
 * Pure, no React.
 */

import type { LensTheme } from "../core/types"
import type { TransformCategory } from "../core/tags"
import type { LensAction } from "./types"
import { ACTIONS } from "./expand"

/** id → LensAction map. */
export const ACTION_MAP: Record<string, LensAction> = Object.fromEntries(
  ACTIONS.map((a) => [a.id, a]),
)

/** Look up an action by id. */
export function getAction(id: string): LensAction | undefined {
  return ACTION_MAP[id]
}

export interface ActionQuery {
  /** Free-text match against word / id. */
  text?: string
  /** Restrict to a category. */
  category?: TransformCategory
  /** Restrict to a theme. */
  theme?: LensTheme
  /** Require ALL of these tags. */
  tags?: string[]
}

export type ActionSort = "word" | "category" | "theme"

/** Filter the action list (all conditions AND together). */
export function queryActions(q: ActionQuery = {}): LensAction[] {
  const text = q.text?.trim().toLowerCase()
  return ACTIONS.filter((a) => {
    if (q.category && a.category !== q.category) return false
    if (q.theme && a.theme !== q.theme) return false
    if (q.tags && q.tags.length && !q.tags.every((t) => a.tags.includes(t))) return false
    if (text) {
      const hay = `${a.word} ${a.id}`.toLowerCase()
      if (!hay.includes(text)) return false
    }
    return true
  })
}

/** Return a sorted copy of a list of actions. */
export function sortActions(list: LensAction[], by: ActionSort = "word"): LensAction[] {
  return [...list].sort((a, b) => {
    if (by === "word") return a.word.localeCompare(b.word)
    if (by === "category") return a.category.localeCompare(b.category) || a.word.localeCompare(b.word)
    return a.theme.localeCompare(b.theme) || a.word.localeCompare(b.word)
  })
}

/** Count of actions per category. */
export function actionCountsByCategory(): Record<string, number> {
  const out: Record<string, number> = {}
  for (const a of ACTIONS) out[a.category] = (out[a.category] ?? 0) + 1
  return out
}
