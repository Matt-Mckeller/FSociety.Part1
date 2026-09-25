import type { ReactNode } from "react"

import { TilePageRouter } from "../tiles/TilePageRouter"

/**
 * Resolution order: `pages` map (demo) > `children` (Next app mode) >
 * `contentSlot` (legacy / deprecated).
 */
export function resolveHudContent({
  pages,
  children,
  contentSlot,
}: {
  pages?: Record<string, ReactNode>
  children?: ReactNode
  contentSlot?: ReactNode
}): ReactNode {
  if (pages) return <TilePageRouter pages={pages} />
  return children ?? contentSlot ?? null
}
