"use client";
import React, { useMemo } from "react"
import { Box } from "@mui/material"
import { TileGridProps } from "../types"
import { Tile } from "./Tile"
import { TileContent } from "./TileContent"

/**
 * Helper to get position key
 */
function positionKey(x: number, y: number): string {
  return `${x},${y}`
}

/**
 * TileGrid - Container that renders tiles based on variant
 */
export function TileGrid({
  config,
  registry,
  currentPosition,
  variant = "single",
  onTileClick,
}: TileGridProps) {
  // Create a lookup map of tiles by position key
  const tileMap = useMemo(() => {
    const map = new Map<string, typeof config.tiles[0]>()
    config.tiles.forEach(tile => {
      const key = positionKey(tile.position.x, tile.position.y)
      map.set(key, tile)
    })
    return map
  }, [config.tiles])
  
  // Determine which tiles to render based on variant
  const tilesToRender = useMemo(() => {
    const tiles: Array<{ x: number; y: number }> = []
    
    switch (variant) {
      case "single":
        tiles.push(currentPosition)
        break
      
      case "with-neighbors":
        // Current tile
        tiles.push(currentPosition)
        // Adjacent neighbors
        tiles.push(
          { x: currentPosition.x - 1, y: currentPosition.y }, // left
          { x: currentPosition.x + 1, y: currentPosition.y }, // right
          { x: currentPosition.x, y: currentPosition.y - 1 }, // top
          { x: currentPosition.x, y: currentPosition.y + 1 }, // bottom
        )
        break
      
      case "overview":
        // Render all tiles from config
        config.tiles.forEach(tile => {
          tiles.push(tile.position)
        })
        break
    }
    
    return tiles
  }, [variant, currentPosition, config.tiles])
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: variant === "overview" ? "row" : "column",
        flexWrap: variant === "overview" ? "wrap" : "nowrap",
        gap: variant === "overview" ? 2 : 0,
        width: "100%",
        height: "100%",
      }}
    >
      {tilesToRender.map(({ x, y }) => {
        const key = positionKey(x, y)
        const tileConfig = tileMap.get(key)
        
        if (!tileConfig) return null
        
        const PageComponent = registry[key]
        const isActive = x === currentPosition.x && y === currentPosition.y
        
        return (
          <Tile
            key={key}
            config={tileConfig}
            state={{ isActive }}
            variant={variant === "overview" ? "thumbnail" : "default"}
            onClick={() => onTileClick?.({ x, y })}
          >
            <TileContent>
              {PageComponent ? <PageComponent /> : null}
            </TileContent>
          </Tile>
        )
      })}
    </Box>
  )
}
