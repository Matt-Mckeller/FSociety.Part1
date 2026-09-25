/**
 * AI-powered Lottie Improvement Generator
 * Takes analysis feedback and generates an improved version
 */
import Anthropic from "@anthropic-ai/sdk"
import type { LottieAnimation } from "../types"
import type { ComprehensiveAnalysis } from "./comprehensiveAnalysis"

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true,
})

/**
 * Generate improved Lottie based on AI analysis
 */
export async function generateImprovedLottie(
  originalAnimation: LottieAnimation,
  analysis: ComprehensiveAnalysis,
  onProgress?: (message: string) => void,
): Promise<LottieAnimation> {
  onProgress?.("Building improvement prompt...")

  const prompt = buildImprovementPrompt(originalAnimation, analysis)

  onProgress?.("Generating improved animation...")

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 16000,
      system: IMPROVEMENT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== "text") {
      throw new Error("Unexpected response type")
    }

    // Log raw response
    console.group("🔧 Lottie Improvement Generation - Raw Response")
    console.log("Model:", "claude-sonnet-4-5-20250929")
    console.log("Timestamp:", new Date().toISOString())
    console.log("Raw Response Length:", content.text.length)
    console.log("Raw Response:", content.text)
    console.groupEnd()

    onProgress?.("Parsing improved animation...")

    // Extract JSON
    let jsonText = content.text.trim()
    const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      jsonText = jsonMatch[1]
    } else {
      const objMatch = jsonText.match(/\{[\s\S]*\}/)
      if (objMatch) {
        jsonText = objMatch[0]
      }
    }

    const improvedAnimation = JSON.parse(jsonText)

    // Validate it's still a valid Lottie
    if (!improvedAnimation.v || !improvedAnimation.layers) {
      throw new Error("Generated animation is not valid Lottie format")
    }

    // Log improved animation
    console.group("🔧 Lottie Improvement - Generated Animation")
    console.log("Animation Name:", improvedAnimation.nm || "Untitled")
    console.log("Layers Count:", improvedAnimation.layers?.length || 0)
    console.log("Frame Rate:", improvedAnimation.fr)
    console.log("Duration:", improvedAnimation.op + " frames")
    console.log(
      "Improvements Applied:",
      analysis.synthesis.prioritizedImprovements.length,
    )
    console.log("Full Animation:", improvedAnimation)
    console.groupEnd()

    onProgress?.("Improved animation generated successfully!")

    return improvedAnimation
  } catch (error) {
    console.error("Improvement generation error:", error)
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate improvements",
    )
  }
}

const IMPROVEMENT_SYSTEM_PROMPT = `You are an expert Lottie animation developer and designer. Your task is to take an existing Lottie animation and improve it based on detailed AI analysis feedback.

CRITICAL RULES:
1. Output ONLY valid Lottie JSON - no explanations, no markdown except the JSON code block
2. Maintain the core concept and animation purpose
3. Preserve the same dimensions and frame rate
4. Keep semantic naming conventions [Purpose][Location][Detail]
5. Apply ALL high-priority improvements from the analysis
6. Focus on changes that have maximum visual impact

IMPROVEMENT STRATEGIES:

**Color Enhancements:**
- Apply color theory (complementary, analogous, triadic)
- Add gradients for depth where appropriate
- Ensure sufficient contrast
- Use professional color palettes

**Composition Improvements:**
- Balance visual weight
- Create clear focal points
- Use rule of thirds
- Add visual hierarchy
- Separate layers for depth

**Animation Refinements:**
- Add proper easing (ease-in-out, elastic, etc.)
- Create anticipation and follow-through
- Smooth transitions between states
- Add secondary motion for polish
- Ensure purposeful movement

**Detail & Polish:**
- Add subtle details that elevate quality
- Refine shape paths for smoothness
- Add effects (shadows, glows, etc.) sparingly
- Ensure all elements have proper anchor points
- Optimize performance while adding quality

OUTPUT FORMAT:
Return the complete improved Lottie JSON. Make it noticeably better while maintaining the original concept.`

function buildImprovementPrompt(
  originalAnimation: LottieAnimation,
  analysis: ComprehensiveAnalysis,
): string {
  const { synthesis, claude, openai } = analysis

  // Build improvement instructions
  const improvements = synthesis.prioritizedImprovements
    .slice(0, 5) // Top 5
    .map((imp, idx) => {
      return `${idx + 1}. [${imp.category.toUpperCase()}] ${imp.change}
   - Reason: ${imp.reasoning}
   - Impact: ${imp.expectedImpact}
   - Sources: ${imp.sources.join(" + ")}
   ${imp.specificSteps.length > 0 ? `- Steps: ${imp.specificSteps.join("; ")}` : ""}`
    })
    .join("\n\n")

  return `# Task: Improve This Lottie Animation

## Current Quality Assessment
- Overall Score: ${synthesis.consensusScore}/100
- ${synthesis.executiveSummary}

## What's Working Well
${synthesis.agreedStrengths.map((s) => `✓ ${s}`).join("\n")}

## Critical Issues to Fix
${synthesis.agreedIssues.map((i) => `✗ ${i}`).join("\n")}

## Priority Improvements to Implement

${improvements}

## Audience Perception Goals
${
  claude?.audienceImpact
    ? `
- Current: Perceived as ${claude.audienceImpact.perceivedQuality}
- Target: Premium/Professional quality
- Emotional Tone: ${claude.audienceImpact.emotionalTone}
- Trustworthiness: ${claude.audienceImpact.trustworthiness}/100 → Target: 85+
- Memorability: ${claude.audienceImpact.memorability}/100 → Target: 80+
`
    : ""
}

## Original Animation JSON

\`\`\`json
${JSON.stringify(originalAnimation, null, 2)}
\`\`\`

## Your Task

Apply the priority improvements above to transform this animation. Make changes that will:
1. Increase the design effectiveness score to 80+
2. Elevate perceived quality to "professional" or "premium"
3. Improve emotional resonance and memorability
4. Fix all critical issues
5. Maintain the original concept and purpose

Output the complete improved Lottie JSON with all enhancements applied.`
}
