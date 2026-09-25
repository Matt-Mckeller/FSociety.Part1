import { ReactNode } from 'react'

/**
 * Layout mode for CinemaLayout
 */
export type CinemaLayoutMode = 'full' | 'diamonds-only'

/**
 * Corner position identifiers
 */
export type CinemaCornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * Bar position identifiers
 */
export type CinemaBarPosition = 'top-primary' | 'top-secondary' | 'bottom-primary' | 'bottom-secondary'

/**
 * Shadow direction options
 */
export type ShadowDirection = 'inward' | 'center' | 'none'

/**
 * Diamond (elongated corner shape) configuration
 */
export interface DiamondConfig {
  /** Width of the diamond in pixels */
  width: number
  /** Height of the diamond in pixels */
  height: number
}

/**
 * Diamond color configuration
 */
export interface DiamondColorConfig {
  /** Whether diamond fill color is enabled */
  enabled: boolean
  /** Edge color for gradient */
  edge?: string
  /** Center color for gradient */
  center?: string
}

/**
 * Shadow configuration
 */
export interface ShadowConfig {
  /** Whether shadows are enabled */
  enabled: boolean
  /** Direction shadows point */
  direction: ShadowDirection
  /** Shadow intensity (opacity) */
  intensity?: 'subtle' | 'medium' | 'strong'
  /** Shadow blur radius in pixels (default: 12) */
  blur?: number
  /** Shadow spread radius in pixels (default: 0) */
  spread?: number
  /** Shadow offset distance in pixels (default: 4) */
  offset?: number
}

/**
 * Bar color preset type
 */
export type BarColorPresetName = 'primary' | 'secondary' | 'neutral' | 'monochrome' | 'accent'

/**
 * Custom bar color values
 */
export interface BarColorPreset {
  primary: { background: string; text: string }
  secondary: { background: string; text: string }
}

/**
 * Bar color configuration
 */
export interface BarColorConfig {
  /** Use theme colors, a preset, or custom colors */
  mode: 'theme' | 'preset'
  /** Preset name when mode is 'preset' */
  preset?: BarColorPresetName
}

/**
 * Individual bar configuration
 */
export interface CinemaBarSettings {
  /** Height in pixels */
  height: number
  /** Whether bar is visible */
  visible: boolean
}

/**
 * Bar pair configuration (primary + secondary)
 */
export interface CinemaBarPairConfig {
  primary: CinemaBarSettings
  secondary: CinemaBarSettings
}

/**
 * FAB (Floating Action Button) configuration
 */
export interface FabConfig {
  /** Whether FAB is shown */
  show: boolean
  /** Size in pixels (default 56) */
  size?: number
  /** FAB content (icon) */
  children?: ReactNode
  /** Click handler */
  onClick?: () => void
}

/**
 * Content slots for bars
 */
export interface CinemaSlots {
  topPrimary?: ReactNode
  topSecondary?: ReactNode
  bottomPrimary?: ReactNode
  bottomSecondary?: ReactNode
}

/**
 * Corner visibility configuration
 */
export interface CinemaCornerConfig {
  positions?: CinemaCornerPosition[]
  show?: boolean
  animated?: boolean
  /** Diamond color configuration */
  colors?: DiamondColorConfig
}

/**
 * Spacing configuration
 */
export interface CinemaSpacingConfig {
  barGap: number
  contentPadding: number
  diamondInset: number
}

/**
 * Visibility toggles for controls
 */
export interface CinemaVisibilityConfig {
  topPrimary: boolean
  topSecondary: boolean
  bottomPrimary: boolean
  bottomSecondary: boolean
  corners: boolean
  fab: boolean
}

/**
 * Props for CinemaLayout component
 */
export interface CinemaLayoutProps {
  children: ReactNode
  
  /** Layout mode - 'full' shows bars + diamonds, 'diamonds-only' hides bars */
  mode?: CinemaLayoutMode
  
  /** Diamond (elongated corner shape) configuration */
  diamond?: Partial<DiamondConfig>
  
  /** Corner configuration */
  corners?: CinemaCornerConfig
  
  /** Bar configuration */
  bars?: {
    top?: Partial<CinemaBarPairConfig>
    bottom?: Partial<CinemaBarPairConfig>
  }
  
  /** Shadow configuration */
  shadows?: Partial<ShadowConfig>
  
  /** Bar color configuration */
  barColors?: BarColorConfig
  
  /** FAB configuration */
  fab?: Partial<FabConfig>
  
  /** Bar content slots */
  slots?: CinemaSlots
  
  /** Spacing configuration */
  spacing?: Partial<CinemaSpacingConfig>
  
  /** Color scheme */
  colorScheme?: 'primary' | 'secondary' | 'neutral'
  
  /** Full screen mode */
  fullScreen?: boolean
}

/**
 * Props for CinemaBar component
 */
export interface CinemaBarProps {
  position: CinemaBarPosition
  height: number
  backgroundColor: string
  textColor: string
  shadow?: string
  children?: ReactNode
}

/**
 * Props for CinemaDiamond component
 */
export interface CinemaDiamondProps {
  position: CinemaCornerPosition
  width: number
  height: number
  strokeColor: string
  gradientColors?: {
    edge: string
    center: string
  }
  /** Whether to fill with color (false = outline only) */
  fillEnabled?: boolean
  strokeWidth: number
  animated?: boolean
}

/**
 * Props for CinemaFab component
 */
export interface CinemaFabProps {
  size?: number
  children?: ReactNode
  onClick?: () => void
  backgroundColor?: string
  shadowColor?: string
}

/**
 * Props for CinemaControls component
 */
export interface CinemaControlsProps {
  mode: CinemaLayoutMode
  onModeChange?: (mode: CinemaLayoutMode) => void
  
  diamond: DiamondConfig
  onDiamondChange?: (config: DiamondConfig) => void
  
  diamondColors: DiamondColorConfig
  onDiamondColorsChange?: (config: DiamondColorConfig) => void
  
  shadows: ShadowConfig
  onShadowsChange?: (config: ShadowConfig) => void
  
  barColors: BarColorConfig
  onBarColorsChange?: (config: BarColorConfig) => void
  
  spacing: CinemaSpacingConfig
  onSpacingChange?: (config: CinemaSpacingConfig) => void
  
  corners: CinemaCornerPosition[]
  onCornersChange?: (corners: CinemaCornerPosition[]) => void
  
  visibility: CinemaVisibilityConfig
  onVisibilityChange?: (config: CinemaVisibilityConfig) => void
}

/**
 * Default values
 */
export const CINEMA_DEFAULTS = {
  diamond: {
    width: 120,
    height: 60,  // 2:1 aspect ratio
  },
  diamondColors: {
    enabled: true,
  },
  bars: {
    top: {
      primary: { height: 48, visible: true },
      secondary: { height: 24, visible: true },
    },
    bottom: {
      primary: { height: 48, visible: true },
      secondary: { height: 24, visible: true },
    },
  },
  shadows: {
    enabled: true,
    direction: 'inward' as ShadowDirection,
    intensity: 'medium' as const,
    blur: 12,
    spread: 0,
    offset: 4,
  },
  barColors: {
    mode: 'theme' as const,
  },
  fab: {
    show: true,
    size: 56,
  },
  spacing: {
    barGap: 0,
    contentPadding: 0,
    diamondInset: 8,
  },
  corners: ['top-left', 'top-right', 'bottom-left'] as CinemaCornerPosition[],
} as const
