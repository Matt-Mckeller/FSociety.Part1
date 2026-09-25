// Main layout component
export { PyramidLayout, default } from './PyramidLayout';

// Layer components
export { PyramidLayer, PyramidLayerCSS } from './PyramidLayer';

// Corner triangle components
export { PyramidCornerTriangle, PyramidCorners } from './PyramidCornerTriangle';

// Border slot components
export { PyramidBorderSlot, PyramidSlotContainer } from './PyramidBorderSlot';

// Hooks
export { usePyramidDimensions, getAdjustedBorderRadius } from './hooks/usePyramidDimensions';
export { usePyramidTheme, getElevationStyles } from './hooks/usePyramidTheme';

// Types
export type {
  PyramidLayoutProps,
  PyramidLayerProps,
  PyramidCornerTriangleProps,
  PyramidBorderSlotProps,
  PyramidSlots,
  PyramidDimensions,
  PyramidThemeColors,
  LayerConfig,
  LayerLevel,
  LayerDimensions,
  CornerConfig,
  CornerPosition,
  SlotPosition,
  ElevationStyle,
  ColorScheme,
  BorderSlotConfig,
} from './types';

export { PYRAMID_DEFAULTS } from './types';
