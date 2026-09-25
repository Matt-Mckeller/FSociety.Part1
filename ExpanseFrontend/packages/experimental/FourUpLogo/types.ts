/**
 * FourUp Logo Component Types
 *
 * TypeScript interfaces for the 4up logo system
 */

// ============================================
// Shape Types
// ============================================

export type LogoShape = "circle" | "square" | "triangle"

// ============================================
// Geometry Types
// ============================================

export interface Point {
  x: number
  y: number
}

export interface Circle {
  center: Point
  radius: number
}

export interface ViewBox {
  x: number
  y: number
  width: number
  height: number
}

export interface WaveSet {
  topRight: string[]
  bottomLeft: string[]
}

// ============================================
// Configuration Types
// ============================================

export interface LogoConfig {
  // Shape & Scaling
  shape: LogoShape
  baseUnit: number
  scaleFactors: [number, number, number]
  showBaseCircle: boolean

  // Positioning
  movementAngle: number
  innerOverlap: number
  outerOverlap: number

  // Center Hole
  showCenterHole: boolean
  centerHoleSize: number
  showConnectorLines: boolean
  connectorLineWidth: number
  leftLinePercent: number
  rightLinePercent: number

  // Sound Waves
  showWaves: boolean
  waveCount: number
  waveOffset: number
  waveSpacing: number
  waveArcSpan: number
  waveStartAngle: number
  waveStrokeWidth: number
  waveFade: boolean

  // Colors & Opacity
  fillColor: string
  baseOpacity: number
  primaryOpacity: number
  waveColor: string
  waveOpacity: number
}

// ============================================
// Preset Types
// ============================================

export interface ColorPreset {
  name: string
  color: string
  description?: string
}

export interface OpacityPreset {
  name: string
  baseOpacity: number
  primaryOpacity: number
  waveOpacity: number
}

export interface OverlapPreset {
  name: string
  innerOverlap: number
  outerOverlap: number
}

export interface RatioPreset {
  name: string
  scaleFactors: [number, number, number]
  description?: string
}

// ============================================
// Component Props Types
// ============================================

export interface FourUpLogoProps {
  /** Partial config to override defaults */
  config?: Partial<LogoConfig>
  /** SVG size in pixels */
  size?: number
  /** Additional CSS class */
  className?: string
  /** SVG id attribute */
  id?: string
  /** Accessible title */
  title?: string
  /** Accessible description */
  description?: string
}
