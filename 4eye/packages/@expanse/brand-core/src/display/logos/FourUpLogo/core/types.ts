/**
 * 4up Logo - Core Type Definitions
 *
 * Framework-agnostic types for logo configuration and geometry.
 */

// ============================================
// Geometry Types
// ============================================

export interface Point {
  x: number;
  y: number;
}

export interface Circle {
  center: Point;
  radius: number;
}

export interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Line {
  start: Point;
  end: Point;
}

// ============================================
// Configuration Types
// ============================================

/** Wave rendering style */
export type WaveStyle = 'uniform' | 'wifi';

/** Shape type for logo elements */
export type LogoShape = 'circle' | 'square' | 'triangle';

/**
 * Complete logo configuration
 *
 * All measurements derive from baseUnit.
 * Default is 2-circle mode (showBaseCircle: false).
 */
export interface LogoConfig {
  // === Sizing ===
  /** Base measurement unit - all sizes derive from this */
  baseUnit: number;
  /** Scale factors for [base, middle, primary] circles */
  scaleFactors: [number, number, number];
  /** Shape of the logo elements */
  shape: LogoShape;

  // === Circle Mode ===
  /** Show all 3 circles (false = 2-circle mode, hides smallest) */
  showBaseCircle: boolean;

  // === Overlap (% of smaller circle's diameter) ===
  /** Overlap between base and middle circles */
  innerOverlap: number;
  /** Overlap between middle and primary circles */
  outerOverlap: number;

  // === Movement ===
  /** Angle of circle arrangement (degrees, 0=right, 90=up) */
  movementAngle: number;

  // === Center Hole ===
  /** Show transparent center hole in primary circle */
  showCenterHole: boolean;
  /** Center hole size as % of primary circle radius */
  centerHoleSize: number;

  // === Connector Lines (radial lines from hole to edge) ===
  /** Show connector lines through center hole */
  showConnectorLines: boolean;
  /** Width of connector lines */
  connectorLineWidth: number;
  /** Left line position (0=top, 50=center, 100=bottom) */
  leftLinePercent: number;
  /** Right line position (0=top, 50=center, 100=bottom) */
  rightLinePercent: number;

  // === Opacity ===
  /** Opacity of smaller visible circle (0-1) */
  smallCircleOpacity: number;
  /** Opacity of primary (largest) circle (0-1) */
  largeCircleOpacity: number;

  // === Colors ===
  /** Fill color for circles */
  fillColor: string;

  // === Waves ===
  /** Show sound wave arcs */
  showWaves: boolean;
  /** Number of wave arcs per side */
  waveCount: number;
  /** Distance from primary circle edge to first wave */
  waveOffset: number;
  /** Distance between consecutive wave arcs */
  waveSpacing: number;
  /** Angular span of wave arcs in degrees */
  waveArcSpan: number;
  /** Angle at which waves point (degrees, 0=right, 45=diagonal) */
  waveStartAngle: number;
  /** Stroke width of wave arcs */
  waveStrokeWidth: number;
  /** Color of wave arcs */
  waveColor: string;
  /** Base opacity of wave arcs (0-1) */
  waveOpacity: number;
  /** Fade outer waves (reduce opacity progressively) */
  waveFade: boolean;
  /** Wave arc style: 'uniform' or 'wifi' (4:2:1 tapering) */
  waveStyle: WaveStyle;
}

// ============================================
// Component Props
// ============================================

export interface LogoProps {
  /** Partial config to override defaults */
  config?: Partial<LogoConfig>;
  /** Overall size (width = height) in pixels */
  size?: number;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: Record<string, string | number>;
  /** Accessible title for the logo */
  title?: string;
  /** Accessible description */
  desc?: string;
}

// ============================================
// Calculated Geometry
// ============================================

export interface CalculatedGeometry {
  circles: Circle[];
  visibleCircles: Circle[];
  opacities: number[];
  primaryCircle: Circle;
  holeRadius: number;
  viewBox: ViewBox;
  waves: {
    topRight: string[];
    bottomLeft: string[];
  };
  connectorLines: {
    left: Line;
    right: Line;
  } | null;
}
