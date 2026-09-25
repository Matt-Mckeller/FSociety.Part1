"use client"

import React, { type ReactNode } from "react"
import { Box, Typography } from "@mui/material"
import { useNavigation } from "@expanse/map"

export interface TilePageRouterProps {
  /** Map of `tile.id` -> page node. */
  pages: Record<string, ReactNode>
  /** Rendered when there is no tile at the current position or no match in `pages`. */
  fallback?: ReactNode
}

/**
 * Renders the page node for the currently active navigation tile.
 *
 * Looks up `currentTile.id` from `useNavigation()` in the `pages` map.
 * Designed to be dropped inside a `HudContentArea`.
 */
export function TilePageRouter({ pages, fallback }: TilePageRouterProps) {
  const { position, getTileAt } = useNavigation()
  const tile = getTileAt(position.x, position.y)
  const node = tile ? pages[tile.id] : undefined

  if (node !== undefined) return <>{node}</>
  if (fallback !== undefined) return <>{fallback}</>

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "text.secondary",
      }}
    >
      <Typography variant="body2" sx={{ fontStyle: "italic" }}>
        No page configured for tile {tile?.id ?? `(${position.x + 1}, ${position.y + 1})`}
      </Typography>
    </Box>
  )
}
