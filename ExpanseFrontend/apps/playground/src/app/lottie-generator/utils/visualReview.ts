/**
 * Claude-powered visual improvement suggestions
 */
import Anthropic from "@anthropic-ai/sdk"
import type { LottieAnimation } from "../types"
import type { AnalysisResult } from "./lottieAnalysis"

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true,
})

export interface VisualReview {
  overallFeedback: string
  visualAppealScore: number // 0-100
  strengths: string[]
  improvements: DetailedImprovement[]
  colorPaletteSuggestion?: ColorPalette
  animationEnhancements?: AnimationEnhancement[]
}

export interface DetailedImprovement {
  aspect: string
  currentState: string
  suggestion: string
  reasoning: string
  impact: "high" | "medium" | "low"
  beforeAfter?: {
    before: string
    after: string
  }
}

export interface ColorPalette {
  name: string
  colors: {
    hex: string
    name: string
    usage: string
  }[]
  reasoning: string
}

export interface AnimationEnhancement {
  element: string
  enhancement: string
  easing: string
  timing: string
  reasoning: string
}

/**
 * Get AI-powered visual improvement suggestions
 */
export async function getVisualImprovements(
  animation: LottieAnimation,
  analysis: AnalysisResult,
  onStream?: (text: string) => void,
): Promise<VisualReview> {
  const prompt = buildReviewPrompt(animation, analysis)

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4000,
      system: VISUAL_REVIEW_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: !!onStream,
    })

    if (onStream) {
      let fullText = ""
      // @ts-expect-error - streaming type
      for await (const event of response) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          fullText += event.delta.text
          onStream(fullText)
        }
      }
      return parseVisualReview(fullText)
    }

    // @ts-expect-error - non-streaming type
    const content = response.content[0]
    if (content.type !== "text") {
      throw new Error("Unexpected response type")
    }
    return parseVisualReview(content.text)
  } catch (error) {
    console.error("Visual review error:", error)
    throw error
  }
}

const VISUAL_REVIEW_SYSTEM_PROMPT = `You are an expert animation designer and visual critic specializing in Lottie animations. Your role is to review animations and provide actionable feedback to make them more visually appealing.

Focus Areas:
1. **Color Theory**: Harmony, contrast, emotional impact
2. **Composition**: Balance, focal points, visual hierarchy
3. **Animation**: Timing, easing, fluidity, purposeful movement
4. **Polish**: Details that elevate quality

Provide constructive, specific feedback that designers can implement.

Output Format (JSON):
{
  "overall_feedback": "2-3 sentence summary of the animation's visual quality",
  "visual_appeal_score": 75,
  "strengths": [
    "Specific strength #1",
    "Specific strength #2"
  ],
  "improvements": [
    {
      "aspect": "Color Palette",
      "current_state": "Single blue tone",
      "suggestion": "Add complementary orange accents",
      "reasoning": "Creates visual interest through color contrast",
      "impact": "high"
    }
  ],
  "color_palette_suggestion": {
    "name": "Ocean Breeze",
    "colors": [
      {"hex": "#2563EB", "name": "Primary Blue", "usage": "Main elements"},
      {"hex": "#F59E0B", "name": "Accent Orange", "usage": "Highlights"}
    ],
    "reasoning": "Complementary colors create dynamic contrast"
  },
  "animation_enhancements": [
    {
      "element": "Main character",
      "enhancement": "Add anticipation before movement",
      "easing": "ease-out",
      "timing": "Add 0.2s delay at start",
      "reasoning": "Creates more natural, appealing motion"
    }
  ]
}

Be specific, actionable, and encouraging. Focus on improvements that have the most visual impact.`

function buildReviewPrompt(
  animation: LottieAnimation,
  analysis: AnalysisResult,
): string {
  return `Please review this Lottie animation and provide detailed visual improvement suggestions.

# Animation Details
- Name: ${animation.nm || "Untitled"}
- Dimensions: ${animation.w}x${animation.h}
- Duration: ${analysis.technical.duration.toFixed(2)}s
- Frame Rate: ${animation.fr}fps

# Current Analysis
- Layers: ${analysis.technical.layerCount}
- Shapes: ${analysis.technical.shapeCount}
- Colors: ${analysis.technical.colorCount} (${analysis.technical.colors.slice(0, 5).join(", ")})
- Has Gradients: ${analysis.technical.hasGradients ? "Yes" : "No"}
- Has Animations: ${analysis.technical.hasAnimations ? "Yes" : "No"}
- Complexity: ${analysis.technical.complexity}

# Visual Scores
- Color Harmony: ${analysis.visualAppeal.colorHarmony}/10
- Composition: ${analysis.visualAppeal.composition}/10
- Animation Quality: ${analysis.visualAppeal.animation}/10
- Complexity Balance: ${analysis.visualAppeal.complexity}/10

# Current Assessment
Strengths: ${analysis.strengths.join(", ") || "None identified"}
Weaknesses: ${analysis.weaknesses.join(", ") || "None identified"}

# Technical Structure
${JSON.stringify(animation, null, 2).substring(0, 2000)}...

Please provide:
1. Overall visual feedback
2. Score (0-100) for visual appeal
3. Specific strengths to celebrate
4. Detailed improvements with reasoning
5. Color palette suggestions if needed
6. Animation enhancement suggestions

Focus on making this animation more visually appealing, polished, and professional.`
}

function parseVisualReview(text: string): VisualReview {
  // Extract JSON from response
  let jsonText = text.trim()
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    jsonText = jsonMatch[0]
  }

  try {
    const parsed = JSON.parse(jsonText)

    return {
      overallFeedback: parsed.overall_feedback || "No feedback provided",
      visualAppealScore: parsed.visual_appeal_score || 50,
      strengths: parsed.strengths || [],
      improvements: (parsed.improvements || []).map((imp: any) => ({
        aspect: imp.aspect || "Unknown",
        currentState: imp.current_state || "",
        suggestion: imp.suggestion || "",
        reasoning: imp.reasoning || "",
        impact: imp.impact || "medium",
        beforeAfter: imp.before_after,
      })),
      colorPaletteSuggestion: parsed.color_palette_suggestion
        ? {
            name: parsed.color_palette_suggestion.name || "Custom Palette",
            colors: (parsed.color_palette_suggestion.colors || []).map(
              (c: any) => ({
                hex: c.hex || "#000000",
                name: c.name || "Color",
                usage: c.usage || "",
              }),
            ),
            reasoning: parsed.color_palette_suggestion.reasoning || "",
          }
        : undefined,
      animationEnhancements: parsed.animation_enhancements
        ? (parsed.animation_enhancements || []).map((enh: any) => ({
            element: enh.element || "",
            enhancement: enh.enhancement || "",
            easing: enh.easing || "",
            timing: enh.timing || "",
            reasoning: enh.reasoning || "",
          }))
        : undefined,
    }
  } catch (error) {
    console.error("Failed to parse visual review:", error)
    // Return fallback
    return {
      overallFeedback: text.substring(0, 200),
      visualAppealScore: 50,
      strengths: [],
      improvements: [],
    }
  }
}
