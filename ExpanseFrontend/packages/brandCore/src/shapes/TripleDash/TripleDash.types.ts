import { SxProps, Theme } from "@mui/material"
import { SVGProps } from "react"

export type TripleDashOrientation = "horizontal" | "vertical"
export type TripleDashAlign = "start" | "end" | "center"
export type TripleDashOrder = "ascending" | "descending"
export type TripleDashAnimationType =
  | "none"
  | "stagger-in"
  | "grow"
  | "fade-in"
  | "slide-in"

export interface TripleDashAnimation {
  /**
   * Type of entrance animation
   * - 'none': No animation
   * - 'stagger-in': Lines animate in sequentially with fade and slide
   * - 'grow': Lines grow from 0 to full length
   * - 'fade-in': Simple opacity fade
   * - 'slide-in': Lines slide in from alignment direction
   * @default 'none'
   */
  type?: TripleDashAnimationType

  /**
   * Duration of each line's animation in ms
   * @default 300
   */
  duration?: number

  /**
   * Delay between each line's animation start (for stagger effects)
   * @default 100
   */
  staggerDelay?: number

  /**
   * CSS easing function
   * @default 'ease-out'
   */
  easing?: string

  /**
   * Whether animation triggers on viewport entry using IntersectionObserver
   * @default false
   */
  animateOnView?: boolean

  /**
   * Whether animation replays on hover
   * @default false
   */
  animateOnHover?: boolean
}

export interface TripleDashProps {
  // === Orientation & Alignment ===
  /**
   * Orientation of the dash group
   * - 'horizontal': Lines stack vertically, extend horizontally
   * - 'vertical': Lines stack horizontally, extend vertically
   * @default 'horizontal'
   */
  orientation?: TripleDashOrientation

  /**
   * Alignment of the varying line ends
   * - 'start': Lines aligned to start edge
   * - 'end': Lines aligned to end edge
   * - 'center': Lines centered
   * @default 'end'
   */
  align?: TripleDashAlign

  /**
   * Order of line lengths from first to last
   * - 'ascending': 1, 2, 3 (short to long)
   * - 'descending': 3, 2, 1 (long to short)
   * @default 'ascending'
   */
  order?: TripleDashOrder

  // === Sizing ===
  /**
   * Thickness of each line in pixels
   * @default 3
   */
  strokeWidth?: number

  /**
   * Gap between lines in pixels
   * When undefined, uses proportional calculation (0.5x shortest line)
   */
  gap?: number

  /**
   * Border radius of line ends
   * @default strokeWidth / 2 (fully rounded)
   */
  borderRadius?: number

  // === Colors ===
  /**
   * Color of the lines. Accepts:
   * - Theme palette keys: 'primary.main', 'secondary.dark', etc.
   * - CSS colors: '#000', 'rgba(0,0,0,0.5)', 'currentColor'
   * - Array of 3 colors for individual line colors
   * @default 'text.primary'
   */
  color?: string | [string, string, string]

  // === Animation ===
  /**
   * Animation configuration
   */
  animation?: TripleDashAnimation

  // === Container ===
  /**
   * Additional styles for the outer container
   */
  sx?: SxProps<Theme>

  /**
   * HTML attributes for the SVG element
   */
  svgProps?: SVGProps<SVGSVGElement>

  /**
   * Test ID for testing purposes
   */
  "data-testid"?: string
}

/**
 * Internal type for calculated line dimensions
 */
export interface CalculatedLine {
  x: number
  y: number
  width: number
  height: number
}
