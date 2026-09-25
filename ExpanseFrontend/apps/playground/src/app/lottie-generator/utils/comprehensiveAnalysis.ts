/**
 * Comprehensive AI Visual Analysis Orchestrator
 * Combines Claude and OpenAI vision analysis, then generates improvements
 */
import type { LottieAnimation } from "../types"
import { captureAnimationFrames, type CapturedFrame } from "./frameCapture"
import { analyzeWithClaude, type ClaudeAnalysis } from "./claudeVisionAnalysis"
import { analyzeWithOpenAI, type OpenAIAnalysis } from "./openaiAnalysis"
import { generateImprovedLottie } from "./lottieImprover"

export interface ComprehensiveAnalysis {
  frames: CapturedFrame[]
  claude?: ClaudeAnalysis
  openai?: OpenAIAnalysis
  synthesis: SynthesizedInsights
  timestamp: number
}

export interface SynthesizedInsights {
  consensusScore: number // 0-100
  agreedStrengths: string[]
  agreedIssues: string[]
  uniqueInsightsClaude: string[]
  uniqueInsightsOpenAI: string[]
  prioritizedImprovements: PrioritizedImprovement[]
  executiveSummary: string
}

export interface PrioritizedImprovement {
  rank: number
  category: string
  change: string
  reasoning: string
  expectedImpact: string
  sources: ("claude" | "openai" | "both")[]
  specificSteps: string[]
}

export interface AnalysisProgress {
  stage: string
  progress: number // 0-100
  message: string
}

/**
 * Run comprehensive AI analysis with both Claude and OpenAI
 */
export async function runComprehensiveAnalysis(
  animation: LottieAnimation,
  context: {
    animationName: string
    description: string
    purpose?: string
    targetAudience?: string
  },
  options: {
    useClaude?: boolean
    useOpenAI?: boolean
    includeVisualAnalysis?: boolean
    frameCount?: number
  } = {},
  onProgress?: (progress: AnalysisProgress) => void,
): Promise<ComprehensiveAnalysis> {
  const {
    useClaude = true,
    useOpenAI = true,
    includeVisualAnalysis = false,
    frameCount = 5,
  } = options

  try {
    // Step 1: Capture frames (optional, only if visual analysis enabled)
    let frames: CapturedFrame[] = []

    if (includeVisualAnalysis) {
      onProgress?.({
        stage: "capture",
        progress: 10,
        message: "Capturing animation frames for visual analysis...",
      })

      frames = await captureAnimationFrames(animation, frameCount)

      onProgress?.({
        stage: "capture",
        progress: 20,
        message: `Captured ${frames.length} frames`,
      })
    } else {
      onProgress?.({
        stage: "prepare",
        progress: 10,
        message: "Preparing JSON analysis...",
      })
    }

    // Step 2: Run analyses in parallel
    const analyses = await Promise.allSettled([
      useClaude
        ? analyzeWithClaude(
            animation,
            frames,
            context,
            { includeVisualAnalysis },
            (msg) =>
              onProgress?.({
                stage: "claude",
                progress: 40,
                message: msg,
              }),
          )
        : Promise.resolve(undefined),
      useOpenAI
        ? analyzeWithOpenAI(
            animation,
            frames,
            context,
            { includeVisualAnalysis },
            (msg) =>
              onProgress?.({
                stage: "openai",
                progress: 60,
                message: msg,
              }),
          )
        : Promise.resolve(undefined),
    ])

    const claudeResult =
      analyses[0].status === "fulfilled" ? analyses[0].value : undefined
    const openaiResult =
      analyses[1].status === "fulfilled" ? analyses[1].value : undefined

    // Log analysis results
    if (analyses[0].status === "rejected") {
      console.error("🔵 Claude Analysis Failed:", analyses[0].reason)
    }
    if (analyses[1].status === "rejected") {
      console.error("🟢 OpenAI Analysis Failed:", analyses[1].reason)
    }

    onProgress?.({
      stage: "synthesis",
      progress: 80,
      message: "Synthesizing insights...",
    })

    // Step 3: Synthesize insights
    const synthesis = synthesizeInsights(claudeResult, openaiResult)

    // Log synthesis result
    console.group("🟣 Comprehensive Analysis - Synthesis")
    console.log("Consensus Score:", synthesis.consensusScore)
    console.log("Executive Summary:", synthesis.executiveSummary)
    console.log("Agreed Strengths:", synthesis.agreedStrengths)
    console.log("Agreed Issues:", synthesis.agreedIssues)
    console.log("Prioritized Improvements:", synthesis.prioritizedImprovements)
    console.log("Full Synthesis:", synthesis)
    console.groupEnd()

    onProgress?.({
      stage: "complete",
      progress: 100,
      message: "Analysis complete",
    })

    const result = {
      frames,
      claude: claudeResult,
      openai: openaiResult,
      synthesis,
      timestamp: Date.now(),
    }

    // Log complete result
    console.group("✅ Comprehensive Analysis - Complete")
    console.log("Timestamp:", new Date(result.timestamp).toISOString())
    console.log("Frames Captured:", result.frames.length)
    console.log("Claude Analysis:", claudeResult ? "✓" : "✗")
    console.log("OpenAI Analysis:", openaiResult ? "✓" : "✗")
    console.log("Full Result:", result)
    console.groupEnd()

    return result
  } catch (error) {
    console.error("Comprehensive analysis error:", error)
    throw error
  }
}

/**
 * Synthesize insights from multiple AI analyses
 */
function synthesizeInsights(
  claude?: ClaudeAnalysis,
  openai?: OpenAIAnalysis,
): SynthesizedInsights {
  // Calculate consensus score
  const scores: number[] = []
  if (claude) scores.push(claude.designEffectiveness.overall)
  if (openai) scores.push(openai.designEffectiveness.overall)
  const consensusScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 50

  // Find agreed strengths
  const claudeStrengths = new Set(claude?.strengths || [])
  const openaiStrengths = new Set(openai?.strengths || [])
  const agreedStrengths: string[] = []
  const uniqueInsightsClaude: string[] = []
  const uniqueInsightsOpenAI: string[] = []

  claudeStrengths.forEach((s) => {
    const similar = Array.from(openaiStrengths).some((os) => areSimilar(s, os))
    if (similar) {
      agreedStrengths.push(s)
    } else {
      uniqueInsightsClaude.push(s)
    }
  })

  openaiStrengths.forEach((s) => {
    if (!agreedStrengths.some((as) => areSimilar(s, as))) {
      uniqueInsightsOpenAI.push(s)
    }
  })

  // Find agreed issues
  const claudeIssues = claude?.critiques.map((c) => c.aspect) || []
  const openaiIssues = openai?.critiques.map((c) => c.aspect) || []
  const agreedIssues = claudeIssues.filter((ci) =>
    openaiIssues.some((oi) => areSimilar(ci, oi)),
  )

  // Prioritize improvements
  const allImprovements: PrioritizedImprovement[] = []

  // Add Claude improvements
  claude?.improvementPlan.forEach((imp) => {
    allImprovements.push({
      rank: imp.priority,
      category: imp.category,
      change: imp.action,
      reasoning: imp.rationale,
      expectedImpact: imp.expectedImpact,
      sources: ["claude"],
      specificSteps: imp.specificChanges || [],
    })
  })

  // Add OpenAI improvements
  openai?.improvementPlan.forEach((imp) => {
    // Check if similar to Claude improvement
    const similar = allImprovements.find(
      (ai) => ai.category === imp.category && areSimilar(ai.change, imp.action),
    )
    if (similar) {
      similar.sources.push("openai")
      similar.rank = Math.min(similar.rank, imp.priority) // Use higher priority
    } else {
      allImprovements.push({
        rank: imp.priority,
        category: imp.category,
        change: imp.action,
        reasoning: imp.rationale,
        expectedImpact: imp.expectedImpact,
        sources: ["openai"],
        specificSteps: imp.specificChanges || [],
      })
    }
  })

  // Sort by priority and boost "both" sources
  const prioritizedImprovements = allImprovements
    .sort((a, b) => {
      const aScore = a.rank - (a.sources.length > 1 ? 2 : 0)
      const bScore = b.rank - (b.sources.length > 1 ? 2 : 0)
      return aScore - bScore
    })
    .slice(0, 8) // Top 8

  // Generate executive summary
  const executiveSummary = generateExecutiveSummary({
    consensusScore,
    agreedStrengths,
    agreedIssues,
    claude,
    openai,
  })

  return {
    consensusScore,
    agreedStrengths,
    agreedIssues,
    uniqueInsightsClaude,
    uniqueInsightsOpenAI,
    prioritizedImprovements,
    executiveSummary,
  }
}

/**
 * Check if two strings are similar (simple version)
 */
function areSimilar(a: string, b: string): boolean {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
  const aNorm = normalize(a)
  const bNorm = normalize(b)

  // Check for substring match
  if (aNorm.includes(bNorm) || bNorm.includes(aNorm)) return true

  // Check for word overlap
  const aWords = new Set(aNorm.split(/\s+/))
  const bWords = new Set(bNorm.split(/\s+/))
  const overlap = Array.from(aWords).filter((w) => bWords.has(w)).length
  return overlap >= 2 // At least 2 words in common
}

/**
 * Generate executive summary
 */
function generateExecutiveSummary(data: {
  consensusScore: number
  agreedStrengths: string[]
  agreedIssues: string[]
  claude?: ClaudeAnalysis
  openai?: OpenAIAnalysis
}): string {
  const { consensusScore, agreedStrengths, agreedIssues, claude, openai } = data

  const quality =
    consensusScore >= 80
      ? "excellent"
      : consensusScore >= 65
        ? "good"
        : consensusScore >= 50
          ? "adequate"
          : "needs improvement"

  const strengthsText =
    agreedStrengths.length > 0
      ? `Both AIs agree on these strengths: ${agreedStrengths.slice(0, 2).join(", ")}.`
      : "Limited agreed strengths identified."

  const issuesText =
    agreedIssues.length > 0
      ? `Key areas for improvement: ${agreedIssues.slice(0, 2).join(", ")}.`
      : "No major consensus issues."

  const audienceImpact = claude?.audienceImpact || openai?.audienceImpact
  const perception = audienceImpact
    ? `Perceived as ${audienceImpact.perceivedQuality} quality with ${audienceImpact.emotionalTone} emotional tone.`
    : ""

  return `Overall design effectiveness: ${consensusScore}/100 (${quality}). ${strengthsText} ${issuesText} ${perception}`.trim()
}

/**
 * Generate and apply improvements to Lottie
 */
export async function generateAndApplyImprovements(
  animation: LottieAnimation,
  analysis: ComprehensiveAnalysis,
  onProgress?: (message: string) => void,
): Promise<LottieAnimation> {
  onProgress?.("Generating improved version...")

  return generateImprovedLottie(animation, analysis, onProgress)
}
