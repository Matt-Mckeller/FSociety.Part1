/**
 * Lottie Analysis and Improvement utilities
 */
import type { LottieAnimation } from "../types"

export interface AnalysisResult {
  score: number // 0-100
  strengths: string[]
  weaknesses: string[]
  visualAppeal: {
    colorHarmony: number // 0-10
    composition: number // 0-10
    animation: number // 0-10
    complexity: number // 0-10
  }
  improvements: Improvement[]
  technical: TechnicalAnalysis
}

export interface Improvement {
  category: "color" | "animation" | "composition" | "performance"
  priority: "high" | "medium" | "low"
  suggestion: string
  reasoning: string
  implementation?: string
}

export interface TechnicalAnalysis {
  layerCount: number
  shapeCount: number
  hasGradients: boolean
  hasAnimations: boolean
  colorCount: number
  colors: string[]
  duration: number
  fileSize: number
  complexity: "simple" | "medium" | "complex"
  issues: string[]
}

/**
 * Analyze Lottie animation structure
 */
export function analyzeLottie(animation: LottieAnimation): AnalysisResult {
  const technical = analyzeTechnical(animation)
  const visual = analyzeVisualAppeal(animation, technical)
  const improvements = generateImprovements(animation, technical, visual)
  const { strengths, weaknesses } = identifyStrengthsWeaknesses(
    technical,
    visual,
  )

  const score = calculateOverallScore(technical, visual)

  return {
    score,
    strengths,
    weaknesses,
    visualAppeal: visual,
    improvements,
    technical,
  }
}

/**
 * Analyze technical aspects
 */
function analyzeTechnical(animation: LottieAnimation): TechnicalAnalysis {
  const layers = animation.layers || []
  const layerCount = layers.length

  let shapeCount = 0
  let hasGradients = false
  let hasAnimations = false
  const colorSet = new Set<string>()
  const issues: string[] = []

  function traverse(obj: any, depth = 0) {
    if (!obj || typeof obj !== "object") return
    if (depth > 20) return // Prevent infinite recursion

    // Count shapes
    if (obj.ty === "sh" || obj.ty === "rc" || obj.ty === "el") {
      shapeCount++
    }

    // Check for fills and strokes
    if (obj.ty === "fl" && obj.c?.k) {
      const color = Array.isArray(obj.c.k)
        ? `rgb(${Math.round(obj.c.k[0] * 255)},${Math.round(obj.c.k[1] * 255)},${Math.round(obj.c.k[2] * 255)})`
        : "animated"
      if (color !== "animated") colorSet.add(color)
    }

    if (obj.ty === "st" && obj.c?.k) {
      const color = Array.isArray(obj.c.k)
        ? `rgb(${Math.round(obj.c.k[0] * 255)},${Math.round(obj.c.k[1] * 255)},${Math.round(obj.c.k[2] * 255)})`
        : "animated"
      if (color !== "animated") colorSet.add(color)
    }

    // Check for gradients
    if (obj.ty === "gf" || obj.ty === "gs") {
      hasGradients = true
    }

    // Check for animations (keyframes)
    if (obj.k && Array.isArray(obj.k) && obj.k.length > 1) {
      hasAnimations = true
    }

    // Recurse
    if (Array.isArray(obj)) {
      obj.forEach((item) => traverse(item, depth + 1))
    } else {
      Object.values(obj).forEach((value) => traverse(value, depth + 1))
    }
  }

  traverse(layers)

  // Identify issues
  if (layerCount === 0) issues.push("No layers found")
  if (shapeCount === 0) issues.push("No shapes found")
  if (colorSet.size === 0) issues.push("No colors detected")
  if (!hasAnimations) issues.push("No animations detected (static)")
  if (shapeCount > 100) issues.push("High shape count may impact performance")

  const duration = (animation.op - animation.ip) / animation.fr
  const fileSize = JSON.stringify(animation).length

  const complexity: "simple" | "medium" | "complex" =
    shapeCount < 30 ? "simple" : shapeCount < 70 ? "medium" : "complex"

  return {
    layerCount,
    shapeCount,
    hasGradients,
    hasAnimations,
    colorCount: colorSet.size,
    colors: Array.from(colorSet),
    duration,
    fileSize,
    complexity,
    issues,
  }
}

/**
 * Analyze visual appeal
 */
function analyzeVisualAppeal(
  animation: LottieAnimation,
  technical: TechnicalAnalysis,
): AnalysisResult["visualAppeal"] {
  // Color Harmony (0-10)
  let colorHarmony = 5
  if (technical.colorCount === 0) colorHarmony = 0
  else if (technical.colorCount === 1) colorHarmony = 3
  else if (technical.colorCount <= 4) colorHarmony = 9
  else if (technical.colorCount <= 7) colorHarmony = 7
  else colorHarmony = 5 // Too many colors

  // Composition (0-10)
  let composition = 5
  if (technical.layerCount === 0) composition = 0
  else if (technical.layerCount <= 3) composition = 4
  else if (technical.layerCount <= 8) composition = 9
  else if (technical.layerCount <= 15) composition = 7
  else composition = 5 // Too complex

  // Animation Quality (0-10)
  let animationQuality = technical.hasAnimations ? 8 : 2
  if (technical.duration < 1) animationQuality -= 2
  if (technical.duration > 5) animationQuality -= 1

  // Complexity (0-10) - balanced is best
  let complexityScore = 5
  if (technical.complexity === "simple") complexityScore = 6
  else if (technical.complexity === "medium") complexityScore = 9
  else complexityScore = 7

  return {
    colorHarmony,
    composition,
    animation: animationQuality,
    complexity: complexityScore,
  }
}

/**
 * Generate improvement suggestions
 */
function generateImprovements(
  animation: LottieAnimation,
  technical: TechnicalAnalysis,
  visual: AnalysisResult["visualAppeal"],
): Improvement[] {
  const improvements: Improvement[] = []

  // Color improvements
  if (technical.colorCount === 1) {
    improvements.push({
      category: "color",
      priority: "high",
      suggestion: "Add complementary colors for visual interest",
      reasoning: "Single-color animations can appear flat and monotonous",
      implementation: "Add 2-3 harmonious colors from a color palette",
    })
  }

  if (technical.colorCount > 8) {
    improvements.push({
      category: "color",
      priority: "medium",
      suggestion: "Reduce color count to 4-6 for better harmony",
      reasoning: "Too many colors can create visual chaos",
      implementation: "Group similar colors and consolidate palette",
    })
  }

  if (!technical.hasGradients && technical.complexity !== "simple") {
    improvements.push({
      category: "color",
      priority: "low",
      suggestion: "Consider adding subtle gradients for depth",
      reasoning: "Gradients can add dimensionality and polish",
      implementation: "Apply gradient fills to key elements",
    })
  }

  // Animation improvements
  if (!technical.hasAnimations) {
    improvements.push({
      category: "animation",
      priority: "high",
      suggestion: "Add keyframe animations for movement",
      reasoning: "Static designs miss the power of Lottie animations",
      implementation: "Animate position, scale, or rotation properties",
    })
  }

  if (technical.duration < 1.5) {
    improvements.push({
      category: "animation",
      priority: "medium",
      suggestion: "Extend animation duration to 2-3 seconds",
      reasoning: "Very short animations can feel rushed and abrupt",
      implementation: "Space out keyframes and add easing",
    })
  }

  if (technical.duration > 5) {
    improvements.push({
      category: "animation",
      priority: "low",
      suggestion: "Consider shortening to 3-4 seconds",
      reasoning: "Long animations may lose viewer attention",
      implementation: "Tighten timing and remove unnecessary frames",
    })
  }

  // Composition improvements
  if (technical.layerCount < 3) {
    improvements.push({
      category: "composition",
      priority: "medium",
      suggestion: "Add more layers for visual depth",
      reasoning: "Few layers can result in flat compositions",
      implementation: "Separate elements into foreground/background layers",
    })
  }

  if (technical.shapeCount > 80) {
    improvements.push({
      category: "performance",
      priority: "high",
      suggestion: "Simplify shapes to improve performance",
      reasoning: "High shape count impacts rendering performance",
      implementation: "Combine similar shapes and reduce detail",
    })
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  improvements.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
  )

  return improvements
}

/**
 * Identify strengths and weaknesses
 */
function identifyStrengthsWeaknesses(
  technical: TechnicalAnalysis,
  visual: AnalysisResult["visualAppeal"],
): { strengths: string[]; weaknesses: string[] } {
  const strengths: string[] = []
  const weaknesses: string[] = []

  // Strengths
  if (visual.colorHarmony >= 8) strengths.push("Excellent color harmony")
  if (visual.composition >= 8) strengths.push("Well-balanced composition")
  if (visual.animation >= 8) strengths.push("Smooth, engaging animation")
  if (technical.hasGradients) strengths.push("Uses gradients for depth")
  if (technical.complexity === "medium")
    strengths.push("Optimal complexity level")
  if (technical.duration >= 2 && technical.duration <= 4) {
    strengths.push("Perfect animation duration")
  }

  // Weaknesses
  if (visual.colorHarmony <= 4) weaknesses.push("Limited color palette")
  if (visual.composition <= 4) weaknesses.push("Simple composition")
  if (visual.animation <= 4) weaknesses.push("Lacks dynamic animation")
  if (technical.shapeCount > 80) weaknesses.push("High shape count")
  if (!technical.hasAnimations) weaknesses.push("Static (no animations)")
  if (technical.issues.length > 0) weaknesses.push(...technical.issues)

  return { strengths, weaknesses }
}

/**
 * Calculate overall score
 */
function calculateOverallScore(
  technical: TechnicalAnalysis,
  visual: AnalysisResult["visualAppeal"],
): number {
  const visualScore =
    (visual.colorHarmony +
      visual.composition +
      visual.animation +
      visual.complexity) /
    4

  let technicalScore = 5
  if (technical.hasAnimations) technicalScore += 2
  if (technical.hasGradients) technicalScore += 1
  if (technical.complexity === "medium") technicalScore += 2
  if (technical.issues.length === 0) technicalScore += 1

  const finalScore = (visualScore + technicalScore) / 2
  return Math.round(finalScore * 10) // 0-100
}
