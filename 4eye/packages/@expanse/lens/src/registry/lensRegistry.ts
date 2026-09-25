/**
 * Lens registry helpers — lookup, filter, and sort over LENSES.
 */

import type { LensDef, LensShellId, LensTheme } from "../core/types"
import { LENSES } from "./lenses.data"

/** id → LensDef map. */
export const LENS_MAP: Record<string, LensDef> = Object.fromEntries(
  LENSES.map((l) => [l.id, l]),
)

/** Look up a lens by id. */
export function getLens(id: string): LensDef | undefined {
  return LENS_MAP[id]
}

/** All distinct tags across the registry, sorted. */
export const ALL_LENS_TAGS: string[] = Array.from(
  new Set(LENSES.flatMap((l) => l.tags)),
).sort()

export interface LensQuery {
  /** Free-text match against word/id/description. */
  text?: string
  /** Restrict to a theme. */
  theme?: LensTheme
  /** Restrict to a shell. */
  shell?: LensShellId
  /** Require ALL of these tags. */
  tags?: string[]
}

/** Filter the registry by a query (all conditions AND together). */
export function queryLenses(q: LensQuery = {}): LensDef[] {
  const text = q.text?.trim().toLowerCase()
  return LENSES.filter((l) => {
    if (q.theme && l.theme !== q.theme) return false
    if (q.shell && l.shell !== q.shell) return false
    if (q.tags && q.tags.length && !q.tags.every((t) => l.tags.includes(t))) return false
    if (text) {
      const hay = `${l.word} ${l.id} ${l.description ?? ""}`.toLowerCase()
      if (!hay.includes(text)) return false
    }
    return true
  })
}

/** Group the registry by theme. */
export function lensesByTheme(): Record<LensTheme, LensDef[]> {
  const out = {} as Record<LensTheme, LensDef[]>
  for (const l of LENSES) (out[l.theme] ??= []).push(l)
  return out
}
