import { ReactNode } from "react"
import { SxProps, Theme } from "@mui/material"
import { TileConfig } from "../../navigation/types/TileConfig.types"
import { Position } from "../../navigation/types/Position.types"

/**
 * Visual variant for tile rendering
 */
export type TileVariant = "default" | "preview" | "thumbnail" | "skeleton"

/**
 * State of a tile
 */
export interface TileState {
  isActive: boolean
  isHovered: boolean
  isDisabled: boolean
  isLoading: boolean
}

/**
 * Props for Tile component
 * Tile = Visual representation of a TileConfig in the main grid view
 */
export interface TileProps {
  /** Tile configuration data */
  config: TileConfig
  
  /** State of the tile */
  state?: Partial<TileState>
  
  /** Visual variant */
  variant?: TileVariant
  
  /** The page content to render */
  children?: ReactNode
  
  /** Click handler */
  onClick?: () => void
  
  /** Hover state change handler */
  onHover?: (hovered: boolean) => void
  
  /** Material-UI sx prop for styling */
  sx?: SxProps<Theme>
}
