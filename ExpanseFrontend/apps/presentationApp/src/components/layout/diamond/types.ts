import { ReactNode } from 'react'

/**
 * Layout mode for DiamondLayout
 */
export type DiamondLayoutMode = 'full' | 'diamonds-only'

/**
 * Corner position identifiers
 */
export type DiamondCornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * Bar position identifiers
 */
export type BarPosition = 'top-1' | 'top-2' | 'bottom-1' | 'bottom-2'

/**
 * Elevation levels (1 = lowest, 3 = highest)
 */
export type ElevationLevel = 1 | 2 | 3

/**
 * Bar configuration
 */
export interface BarConfig {
  height?: number
  visible?: boolean
  elevation?: ElevationLevel
}

/**
 * Spacing configuration for interactive controls
 */
export interface SpacingConfig {
  barGap: number
  contentPadding: number
  diamondInset: number
}

/**
 * Visibility configuration
 */
export interface VisibilityConfig {
  topBar1: boolean
  topBar2: boolean
  bottomBar1: boolean
  bottomBar2: boolean
  diamonds: boolean
}

/**
 * Diamond corner visibility
 */
export interface DiamondCornerConfig {
  topLeft: boolean
  topRight: boolean
  bottomLeft: boolean
  bottomRight: boolean
}

/**
 * Content slots for bars
 */
export interface DiamondSlots {
  topBar1?: ReactNode
  topBar2?: ReactNode
  bottomBar1?: ReactNode
  bottomBar2?: ReactNode
}

/**
 * Corner configuration
 */
export interface DiamondCornersConfig {
  show?: boolean
  size?: number | 'auto'
  positions?: DiamondCornerPosition[]
  animated?: boolean
}

/**
 * Props for DiamondLayout component
 */
export interface DiamondLayoutProps {
  children: ReactNode
  
  /** Layout mode - 'full' shows bars + diamonds, 'diamonds-only' hides bars */
  mode?: DiamondLayoutMode
  
  /** Bar configuration */
  bars?: {
    topBar1?: BarConfig
    topBar2?: BarConfig
    bottomBar1?: BarConfig
    bottomBar2?: BarConfig
  }
  
  /** Bar content slots */
  slots?: DiamondSlots
  
  /** Corner configuration */
  corners?: DiamondCornersConfig
  
  /** Spacing configuration */
  spacing?: Partial<SpacingConfig>
  
  /** Elevation style */
  elevation?: 'flat' | 'subtle' | 'pronounced'
  
  /** Color scheme */
  colorScheme?: 'primary' | 'secondary' | 'gradient'
  
  /** Full screen mode */
  fullScreen?: boolean
}

/**
 * Props for DiamondCorner component
 */
export interface DiamondCornerProps {
  position: DiamondCornerPosition
  size: number
  strokeColor: string
  gradientColors: {
    edge: string
    center: string
  }
  strokeWidth: number
  animated?: boolean
}

/**
 * Props for DiamondBar component
 */
export interface DiamondBarProps {
  position: BarPosition
  elevation: ElevationLevel
  height?: number
  backgroundColor: string
  textColor: string
  children?: ReactNode
}

/**
 * Props for LayoutControls component
 */
export interface LayoutControlsProps {
  mode: DiamondLayoutMode
  onModeChange: (mode: DiamondLayoutMode) => void
  
  spacing: SpacingConfig
  onSpacingChange: (key: keyof SpacingConfig, value: number) => void
  
  visibility: VisibilityConfig
  onVisibilityChange: (key: keyof VisibilityConfig, value: boolean) => void
  
  diamondCorners: DiamondCornerConfig
  onDiamondCornerChange: (corner: keyof DiamondCornerConfig, value: boolean) => void
}

/**
 * Theme colors for diamond layout
 */
export interface DiamondThemeColors {
  bars: {
    level1: {
      background: string
      text: string
    }
    level2: {
      background: string
      text: string
    }
  }
  content: {
    background: string
    shadow: string
  }
  diamonds: {
    edge: string
    center: string
    stroke: string
  }
}

/**
 * Default configuration values
 */
export const DIAMOND_DEFAULTS = {
  bars: {
    topBar1: { height: 40, elevation: 1 as ElevationLevel },
    topBar2: { height: 36, elevation: 2 as ElevationLevel },
    bottomBar1: { height: 36, elevation: 2 as ElevationLevel },
    bottomBar2: { height: 40, elevation: 1 as ElevationLevel },
  },
  spacing: {
    barGap: 0,
    contentPadding: 0,
    diamondInset: 0,
  },
  corners: {
    positions: ['top-left', 'top-right', 'bottom-left'] as DiamondCornerPosition[],
    animated: true,
  },
} as const
