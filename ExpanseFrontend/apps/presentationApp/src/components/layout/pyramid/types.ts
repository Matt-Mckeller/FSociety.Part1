import { ReactNode } from 'react';

/**
 * Configuration for a single pyramid layer
 */
export interface LayerConfig {
  /** Whether the layer is visible */
  visible?: boolean;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Fill width (space between stroke and content) in pixels */
  fillWidth?: number;
  /** Border radius in pixels */
  borderRadius?: number;
  /** Custom colors for this layer */
  colors?: {
    stroke?: string;
    fill?: string;
  };
}

/**
 * Corner position identifiers
 */
export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

/**
 * Border slot positions
 */
export type SlotPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Layer identifiers
 */
export type LayerLevel = 'outer' | 'middle' | 'inner';

/**
 * Border slot configuration
 */
export interface BorderSlotConfig {
  position: SlotPosition;
  layer: LayerLevel;
}

/**
 * Content slots for the pyramid layout
 */
export interface PyramidSlots {
  /** Top of outer layer - navigation/branding */
  header?: ReactNode;
  /** Bottom of outer layer */
  footer?: ReactNode;
  /** Left side of outer layer - navigation */
  leftNav?: ReactNode;
  /** Right side of outer layer */
  rightNav?: ReactNode;
  /** Top of middle layer - action controls */
  actionBar?: ReactNode;
  /** Bottom of middle layer - status info */
  statusBar?: ReactNode;
}

/**
 * Corner triangle configuration
 */
export interface CornerConfig {
  /** Whether to show corner triangles */
  show?: boolean;
  /** Size of corner triangles */
  size?: number | 'small' | 'medium' | 'large';
  /** Border radius for rounded corners */
  borderRadius?: number;
  /** Whether corners should animate on mount */
  animated?: boolean;
}

/**
 * Elevation style variants
 */
export type ElevationStyle = 'flat' | 'subtle' | 'pronounced';

/**
 * Color scheme variants
 */
export type ColorScheme = 'primary' | 'secondary' | 'gradient';

/**
 * Props for the main PyramidLayout component
 */
export interface PyramidLayoutProps {
  /** Content to render in the center area */
  children: ReactNode;
  
  /** Layer configuration */
  layers?: {
    outer?: LayerConfig;
    middle?: LayerConfig;
    inner?: LayerConfig;
  };
  
  /** Border slot content */
  slots?: PyramidSlots;
  
  /** Corner triangle configuration */
  corners?: CornerConfig;
  
  /** Elevation style */
  elevation?: ElevationStyle;
  
  /** Color scheme */
  colorScheme?: ColorScheme;
  
  /** Full screen mode (100vh) */
  fullScreen?: boolean;
}

/**
 * Props for PyramidLayer component
 */
export interface PyramidLayerProps {
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Width of the layer */
  width: number;
  /** Height of the layer */
  height: number;
  /** Stroke width */
  strokeWidth: number;
  /** Fill width (space between stroke and inner content) */
  fillWidth: number;
  /** Stroke color */
  strokeColor: string;
  /** Fill color */
  fillColor: string;
  /** Border radius */
  borderRadius: number;
  /** Content to render inside the layer */
  children?: ReactNode;
  /** Layer identifier for debugging */
  layer?: LayerLevel;
}

/**
 * Props for PyramidCornerTriangle component
 */
export interface PyramidCornerTriangleProps {
  /** Corner position */
  position: CornerPosition;
  /** Size of the triangle */
  size: number;
  /** Border radius for rounded corners */
  borderRadius: number;
  /** Stroke color */
  strokeColor: string;
  /** Fill color */
  fillColor: string;
  /** Stroke width */
  strokeWidth: number;
  /** Whether to animate on mount */
  animated?: boolean;
}

/**
 * Props for PyramidBorderSlot component
 */
export interface PyramidBorderSlotProps {
  /** Slot position */
  position: SlotPosition;
  /** Which layer this slot belongs to */
  layer: LayerLevel;
  /** Content to render */
  children: ReactNode;
  /** Style overrides */
  sx?: Record<string, unknown>;
}

/**
 * Calculated dimensions for the pyramid layout
 */
export interface PyramidDimensions {
  /** Viewport/container width */
  containerWidth: number;
  /** Viewport/container height */
  containerHeight: number;
  /** Content area dimensions */
  content: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Layer dimensions */
  layers: {
    outer: LayerDimensions;
    middle: LayerDimensions;
    inner: LayerDimensions;
  };
}

/**
 * Dimensions for a single layer
 */
export interface LayerDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Theme colors for pyramid layers
 */
export interface PyramidThemeColors {
  outer: {
    stroke: string;
    fill: string;
  };
  middle: {
    stroke: string;
    fill: string;
  };
  inner: {
    stroke: string;
    fill: string;
  };
  content: {
    background: string;
  };
  corners: {
    stroke: string;
    fill: string;
  };
}

/**
 * Default configuration values
 */
export const PYRAMID_DEFAULTS = {
  layers: {
    outer: {
      strokeWidth: 4,
      fillWidth: 12,
      borderRadius: 24,
    },
    middle: {
      strokeWidth: 3,
      fillWidth: 10,
      borderRadius: 20,
    },
    inner: {
      strokeWidth: 2,
      fillWidth: 8,
      borderRadius: 16,
    },
  },
  layerGap: 8,
  corners: {
    size: 48,
    borderRadius: 12,
  },
} as const;
