/**
 * Claude Vision Analysis for Lottie Animations
 */
import Anthropic from "@anthropic-ai/sdk"
import type { CapturedFrame } from "./frameCapture"
import type { LottieAnimation } from "../types"

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
  dangerouslyAllowBrowser: true,
})

export interface ClaudeAnalysis {
  provider: "claude"
  overallAssessment: string
  designEffectiveness: {
    impact: number
    craft: number
    motion: number
    clarity: number
    resonance: number
    overall: number
  }
  strengths: string[]
  critiques: Array<{
    aspect: string
    observation: string
    issue: string
    impact: "critical" | "important" | "minor"
    suggestion: string
  }>
  audienceImpact: {
    firstImpression: string
    emotionalTone: string
    perceivedQuality: "premium" | "professional" | "adequate" | "amateur"
    trustworthiness: number
    memorability: number
    targetAudienceFit: string
  }
  improvementPlan: Array<{
    priority: number
    category: string
    action: string
    rationale: string
    expectedImpact: string
    specificChanges?: string[]
  }>
  professionalRecommendations: string[]
}

/**
 * Analyze Lottie animation using Claude Vision
 */
export async function analyzeWithClaude(
  animation: LottieAnimation,
  frames: CapturedFrame[],
  context: {
    animationName: string
    description: string
    purpose?: string
    targetAudience?: string
  },
  options: {
    includeVisualAnalysis?: boolean
  } = {},
  onProgress?: (message: string) => void,
): Promise<ClaudeAnalysis> {
  try {
    onProgress?.("Analyzing with Claude...")

    const prompt = buildClaudePrompt(context, animation)

    // Build content array
    const messageContent: any[] = [
      {
        type: "text",
        text: prompt,
      },
    ]

    // Optionally add visual frames
    if (options.includeVisualAnalysis && frames.length > 0) {
      onProgress?.("Adding visual frame analysis...")
      const imageContents = frames.map((frame) => {
        const base64Data = frame.dataUrl.split(",")[1]
        return {
          type: "image" as const,
          source: {
            type: "base64" as const,
            media_type: "image/png" as const,
            data: base64Data,
          },
        }
      })
      messageContent.push(...imageContents)
    }

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: messageContent,
        },
      ],
    })

    const responseContent = response.content[0]
    if (responseContent.type !== "text") {
      throw new Error("Unexpected response type")
    }

    // Log raw response to console
    console.group("🔵 Claude Analysis Response")
    console.log("Model:", "claude-sonnet-4-5-20250929")
    console.log("Timestamp:", new Date().toISOString())
    console.log(
      "Visual Analysis:",
      options.includeVisualAnalysis ? "Enabled" : "JSON Only",
    )
    console.log("Raw Response:", responseContent.text)
    console.groupEnd()

    onProgress?.("Parsing Claude analysis...")
    const parsedResult = parseClaudeResponse(responseContent.text)

    // Log parsed result
    console.group("🔵 Claude Vision Analysis - Parsed Result")
    console.log("Design Effectiveness:", parsedResult.designEffectiveness)
    console.log("Audience Impact:", parsedResult.audienceImpact)
    console.log("Critiques Count:", parsedResult.critiques.length)
    console.log("Improvements Count:", parsedResult.improvementPlan.length)
    console.log("Full Analysis:", parsedResult)
    console.groupEnd()

    return parsedResult
  } catch (error) {
    console.error("Claude analysis error:", error)
    throw new Error(
      error instanceof Error ? error.message : "Claude analysis failed",
    )
  }
}

function buildClaudePrompt(
  context: {
    animationName: string
    description: string
    purpose?: string
    targetAudience?: string
  },
  animation: LottieAnimation,
): string {
  // Get animation technical details
  const layerCount = animation.layers?.length || 0
  const duration = animation.op / animation.fr
  const hasAssets = (animation.assets?.length || 0) > 0

  return `You are an expert motion designer and brand consultant analyzing a Lottie animation JSON file.

# Animation Context
- Name: ${context.animationName}
- Description: ${context.description}
${context.purpose ? `- Purpose: ${context.purpose}` : ""}
${context.targetAudience ? `- Target Audience: ${context.targetAudience}` : ""}

# Animation Technical Details
- Layers: ${layerCount}
- Duration: ${duration.toFixed(2)} seconds
- Frame Rate: ${animation.fr} fps
- Dimensions: ${animation.w}x${animation.h}
- Has Assets: ${hasAssets ? "Yes" : "No"}

# Complete Lottie JSON Structure
Note: Full JSON provided (not truncated) so you can analyze the complete animation structure, all layers, keyframes, shapes, paths, colors, and timing.

\`\`\`json
${JSON.stringify(animation, null, 2)}
\`\`\`

# Your Mission
Analyze this Lottie animation JSON through the lens of audience perception, technical quality, and emotional impact. Think like a design director reviewing work before it goes to a client for educational sites (6-12 and higher education). Evaluate if it's professional, well-structured, and ready for customer-facing use.

# Core Quality Assessment

## JSON Structure & Technical Quality
- Is the layer structure logical and well-organized?
- Are shapes, paths, and animations properly defined?
- Is the complexity appropriate for the animation's purpose?
- Are there unnecessary layers or bloat?
- Are keyframes and animations smooth and purposeful?
- Do easing functions create natural motion?
- Is the file size optimized?

## Design Coherence (from JSON analysis)
- Are color values harmonious and intentional?
- Do shape coordinates create balanced composition?
- Are transform properties (position, scale, rotation) appropriate?
- Do animation timings make sense (in/out points, frame sequences)?
- Are there any obvious structural errors or inconsistencies?

## Code Quality
- Are layers semantically named?
- Is the animation data clean and well-structured?
- Are there redundant or empty layers?
- Do assets reference correctly?

## Visual Analysis (if screenshots provided)
- Does the rendered output match the intended design?
- Are there visual artifacts or rendering issues?
- Do colors, shadows, and effects render correctly?
- Is the composition visually balanced when displayed?

# Design Effectiveness (0-100 each)
1. **Impact**: First impression potential, attention-grabbing elements, memorable design
2. **Craft**: Color harmony, composition balance, detail quality, refinement level
3. **Motion**: Animation timing, easing quality, fluid transitions, purposeful movement
4. **Clarity**: Clear visual hierarchy, intuitive understanding, message clarity
5. **Resonance**: Appropriate tone, emotional connection potential, audience fit

# Audience Perception
- Expected first impression
- Likely emotional response
- Perceived quality level (premium/professional/adequate/amateur)
- Trust and credibility impression (0-100)
- Memorability potential (0-100)
- Target audience alignment

# Critical Feedback Structure
For each issue identified:
1. **Overall Assessment**: Brief summary (Normal/Minor Issues/Significant Issues)
2. **Strengths**: What works well
3. **Issues Identified**: Specific problems with location/description
4. **Recommendations**: Actionable suggestions for improvement
5. **Priority Level**: Critical/High/Medium/Low for each issue

## Action Plan
Prioritize 5-8 improvements by impact:
1. Changes that transform perception
2. Quick fixes with high ROI
3. Polish that elevates to premium

Be direct, specific, and actionable. Return JSON:

\`\`\`json
{
  "overall_assessment": "Executive summary of quality and perception",
  "design_effectiveness": {
    "impact": 75,
    "craft": 82,
    "motion": 68,
    "clarity": 90,
    "resonance": 70,
    "overall": 77
  },
  "strengths": ["What genuinely works well"],
  "critiques": [
    {
      "aspect": "Element or principle",
      "observation": "What you observe",
      "issue": "Why it's problematic for audience",
      "impact": "critical",
      "suggestion": "Specific fix with details"
    }
  ],
  "audience_impact": {
    "first_impression": "What audience sees/feels first",
    "emotional_tone": "Emotion evoked",
    "perceived_quality": "professional",
    "trustworthiness": 75,
    "memorability": 60,
    "target_audience_fit": "Ideal for X because..."
  },
  "improvement_plan": [
    {
      "priority": 1,
      "category": "color",
      "action": "Exact change needed",
      "rationale": "Why this matters",
      "expected_impact": "How perception improves",
      "specific_changes": ["Detail 1", "Detail 2"]
    }
  ],
  "professional_recommendations": ["Strategic guidance"]
}
\`\`\`

Focus on real-world impact and audience perception.`
}

function parseClaudeResponse(content: string): ClaudeAnalysis {
  // Extract JSON
  let jsonText = content.trim()
  const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/)
  if (jsonMatch) {
    jsonText = jsonMatch[1]
  } else {
    const objMatch = jsonText.match(/\{[\s\S]*\}/)
    if (objMatch) {
      jsonText = objMatch[0]
    }
  }

  try {
    const parsed = JSON.parse(jsonText)

    const effectiveness = parsed.design_effectiveness || {}

    return {
      provider: "claude",
      overallAssessment: parsed.overall_assessment || "No assessment provided",
      designEffectiveness: {
        impact: effectiveness.impact || 50,
        craft: effectiveness.craft || 50,
        motion: effectiveness.motion || 50,
        clarity: effectiveness.clarity || 50,
        resonance: effectiveness.resonance || 50,
        overall: effectiveness.overall || 50,
      },
      strengths: parsed.strengths || [],
      critiques: (parsed.critiques || []).map((c: any) => ({
        aspect: c.aspect || "Unknown",
        observation: c.observation || "",
        issue: c.issue || "",
        impact: c.impact || "minor",
        suggestion: c.suggestion || "",
      })),
      audienceImpact: {
        firstImpression: parsed.audience_impact?.first_impression || "",
        emotionalTone: parsed.audience_impact?.emotional_tone || "",
        perceivedQuality:
          parsed.audience_impact?.perceived_quality || "adequate",
        trustworthiness: parsed.audience_impact?.trustworthiness || 50,
        memorability: parsed.audience_impact?.memorability || 50,
        targetAudienceFit: parsed.audience_impact?.target_audience_fit || "",
      },
      improvementPlan: (parsed.improvement_plan || []).map((imp: any) => ({
        priority: imp.priority || 5,
        category: imp.category || "detail",
        action: imp.action || "",
        rationale: imp.rationale || "",
        expectedImpact: imp.expected_impact || "",
        specificChanges: imp.specific_changes || [],
      })),
      professionalRecommendations: parsed.professional_recommendations || [],
    }
  } catch (error) {
    console.error("Failed to parse Claude response:", error)
    throw new Error("Failed to parse analysis")
  }
}
