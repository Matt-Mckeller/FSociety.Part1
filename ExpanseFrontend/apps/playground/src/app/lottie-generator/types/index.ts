/**
 * Types for Lottie Animation Generator
 */

export interface GenerationOptions {
  width?: number
  height?: number
  duration?: number
  frameRate?: number
  style?: "flat" | "gradient" | "outlined" | "illustrated"
  complexity?: "simple" | "medium" | "complex"
}

export interface LottieAnimation {
  v: string // version
  fr: number // frame rate
  ip: number // in point
  op: number // out point
  w: number // width
  h: number // height
  nm: string // name
  layers: any[] // layer objects
  [key: string]: any // additional properties
}

export interface GenerationRequest {
  description: string
  options?: GenerationOptions
  animationName?: string
}

export interface GenerationResult {
  success: boolean
  animation?: LottieAnimation
  error?: string
  metadata?: {
    layerCount: number
    shapeCount: number
    duration: number
    fileSize: number
  }
}
