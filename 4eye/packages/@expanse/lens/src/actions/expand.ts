/**
 * Action expander — turns the word banks into a de-duplicated,
 * fully-tagged list of {@link LensAction}s.
 *
 * Deterministic: same input banks → same output array & order.
 */

import type { TransformCategory } from "../core/tags"
import { TRANSFORM_CATEGORIES, CATEGORY_THEME } from "../core/tags"
import type { LensAction } from "./types"
import { CATEGORY_LENS } from "./types"
import { ACTION_WORDS } from "./words.data"

/** Slugify a display word into a stable kebab id. */
export function slugify(word: string): string {
  return word
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Build one action record for a word in a category. */
function makeAction(word: string, category: TransformCategory): LensAction {
  const theme = CATEGORY_THEME[category]
  return {
    id: slugify(word),
    word: word.replace(/-/g, " "),
    category,
    theme,
    lensId: CATEGORY_LENS[category],
    tags: [category, theme],
  }
}

/**
 * Expand all banks into a single de-duplicated list. When the same id
 * appears in two categories, the first category (by TRANSFORM_CATEGORIES
 * order) wins.
 */
export function buildActions(): LensAction[] {
  const seen = new Set<string>()
  const out: LensAction[] = []
  for (const category of TRANSFORM_CATEGORIES) {
    for (const word of ACTION_WORDS[category]) {
      const action = makeAction(word, category)
      if (seen.has(action.id)) continue
      seen.add(action.id)
      out.push(action)
    }
  }
  return out
}

/** The full materialized action list (built once at module load). */
export const ACTIONS: LensAction[] = buildActions()

/** Total action count — exported for sanity checks / stories. */
export const ACTION_COUNT = ACTIONS.length
