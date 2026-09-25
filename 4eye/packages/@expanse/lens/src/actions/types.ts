/**
 * @expanse/lens/actions — types.
 *
 * Pure data, NO React. An "action" is a simple (mostly one-word)
 * verb in the 4eye symbol-language. Each action belongs to one
 * transformation category, inherits that category's theme + lens, and
 * can be filtered/sorted by tags.
 */

import type { LensTheme } from "../core/types"
import type { TransformCategory } from "../core/tags"

export interface LensAction {
  /** Stable kebab-case id (slug of the word). */
  id: string
  /** Display word (mostly a single word). */
  word: string
  /** Transformation family this action belongs to. */
  category: TransformCategory
  /** Brand pillar (derived from category). */
  theme: LensTheme
  /** Registry lens id this action renders with. */
  lensId: string
  /** Filter tags: category + theme + any domain tags. */
  tags: string[]
}

/** Representative registry lens for each transformation category. */
export const CATEGORY_LENS: Record<TransformCategory, string> = {
  perceive: "notice",
  analyze: "analyze",
  recall: "recall",
  reframe: "reframe",
  summarize: "summarize",
  synthesize: "synthesize",
  practice: "practice",
  organize: "organize",
  focus: "focus",
  regulate: "regulate",
  protect: "protect",
  grow: "grow",
  connect: "connect",
  celebrate: "celebrate",
  movement: "move",
  mood: "mood",
  status: "status",
}
