/**
 * OpenAI GPT-4 Vision Analysis for Lottie Animations
 */
import type { CapturedFrame } from "./frameCapture"
import type { LottieAnimation } from "../types"

export interface OpenAIAnalysis {
  provider: "openai"
  overallAssessment: string
  designEffectiveness: DesignEffectiveness
  strengths: string[]
  critiques: Critique[]
  audienceImpact: AudienceImpact
  improvementPlan: ImprovementStep[]
  professionalRecommendations: string[]
}

export interface DesignEffectiveness {
  impact: number // 0-100 - First impression strength
  craft: number // 0-100 - Technical execution
  motion: number // 0-100 - Animation quality
  clarity: number // 0-100 - Communication effectiveness
  resonance: number // 0-100 - Emotional connection
  overall: number // 0-100 - Average
}

export interface Critique {
  aspect: string
  observation: string
  issue: string
  impact: "critical" | "important" | "minor"
  suggestion: string
}

export interface AudienceImpact {
  firstImpression: string
  emotionalTone: string
  perceivedQuality: "premium" | "professional" | "adequate" | "amateur"
  trustworthiness: number // 0-100
  memorability: number // 0-100
  targetAudienceFit: string
}

export interface ImprovementStep {
  priority: number // 1-10
  category: "color" | "composition" | "motion" | "detail" | "concept"
  action: string
  rationale: string
  expectedImpact: string
  specificChanges?: string[]
}

/**
 * Analyze Lottie animation using OpenAI GPT-4 Vision
 */
export async function analyzeWithOpenAI(
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
): Promise<OpenAIAnalysis> {
  try {
    onProgress?.("Analyzing with OpenAI GPT-4...")

    const prompt = buildOpenAIPrompt(
      context,
      animation,
      options.includeVisualAnalysis || false,
    )

    // Call API route instead of direct OpenAI call (avoids CORS)
    const response = await fetch("/api/ai-vision/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        frames: options.includeVisualAnalysis ? frames : [],
        context,
        prompt,
      }),
    })

    if (!response.ok) {
      let errorMessage = "OpenAI API request failed"
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorMessage
      } catch (parseError) {
        // JSON parsing failed, use status text since body is already consumed
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }
      throw new Error(errorMessage)
    }

    const data = await response.json()
    const content = data.content

    if (!content) {
      throw new Error("No response from OpenAI")
    }

    // Log raw response to console
    console.group("🟢 OpenAI Vision Analysis Response")
    console.log("Model:", data.model)
    console.log("Timestamp:", new Date().toISOString())
    console.log("Usage:", data.usage)
    console.log("Raw Response:", content)
    console.groupEnd()

    onProgress?.("Parsing OpenAI analysis...")
    const parsedResult = parseOpenAIResponse(content)

    // Log parsed result
    console.group("🟢 OpenAI Vision Analysis - Parsed Result")
    console.log("Design Effectiveness:", parsedResult.designEffectiveness)
    console.log("Audience Impact:", parsedResult.audienceImpact)
    console.log("Critiques Count:", parsedResult.critiques.length)
    console.log("Improvements Count:", parsedResult.improvementPlan.length)
    console.log("Full Analysis:", parsedResult)
    console.groupEnd()

    return parsedResult
  } catch (error) {
    console.error("OpenAI analysis error:", error)
    throw new Error(
      error instanceof Error ? error.message : "OpenAI analysis failed",
    )
  }
}

function buildOpenAIPrompt(
  context: {
    animationName: string
    description: string
    purpose?: string
    targetAudience?: string
  },
  animation: LottieAnimation,
  includeVisualAnalysis: boolean,
): string {
  const layerCount = animation.layers?.length || 0
  const duration = animation.op / animation.fr
  const hasAssets = (animation.assets?.length || 0) > 0

  return `You are a world-class motion designer and visual critic analyzing a Lottie animation JSON file${includeVisualAnalysis ? " with visual frame screenshots" : ""}.

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

# Your Task
Provide a comprehensive critique focused on how this animation will be perceived by real audiences. Review for educational sites (6-12 and higher education). Check if it's professional, well-structured, and ready for customer-facing use. Go beyond technical metrics - consider emotional impact, professionalism, and communication effectiveness.

# Core Quality Assessment Criteria

## JSON Structure & Technical Quality
- Is the layer hierarchy logical and maintainable?
- Are animations and keyframes properly structured?
- Is the complexity appropriate for the animation's purpose?
- Are there optimization opportunities?
- Do timing and easing values create natural motion?

## Design Coherence (from JSON)
- Are color values harmonious?
- Do transform properties create balanced composition?
- Are shape paths clean and purposeful?
- Do animation sequences make sense?

${
  includeVisualAnalysis
    ? `
## Visual Analysis (from screenshots)
- Does the rendered output match intended design?
- Are there visual artifacts or rendering issues?
- Do colors and effects render correctly?
- Is the composition visually balanced?
`
    : ""
}

## Technical Issues
- Are there visible rendering errors, pixelation, or compression artifacts?
- Do edges appear clean or are they jagged/malformed?
- Are there unintended duplications, blending errors, or missing elements?
- Do textures look consistent and appropriate?

## Contextual Appropriateness
- Does the animation match its intended purpose/context?
- Are all elements present that should be there?
- Is anything present that seems out of place?

# Analysis Framework

## 1. Design Effectiveness (Score each 0-100)
- **Impact**: Does it grab attention? Is it memorable? First impression strength?
- **Craft**: Color harmony, composition, balance, detail quality, refinement
- **Motion**: Animation timing, easing, fluidity, purposeful movement (infer from frames)
- **Clarity**: Is the message/purpose immediately clear? Intuitive to understand?
- **Resonance**: Emotional connection, appropriate tone, delight factor

## 2. Audience Perspective
- What's the immediate first impression?
- What emotion does it evoke?
- Does it feel premium, professional, adequate, or amateur?
- How trustworthy/credible does it appear (0-100)?
- How memorable is it (0-100)?
- Who is this best suited for?

## 3. Critical Analysis Output Format
For each significant issue provide:
1. **Overall Assessment**: Brief summary (Normal/Minor Issues/Significant Issues)
2. **Strengths**: What works well
3. **Issues Identified**: Specific problems with location/description
4. **Recommendations**: Actionable suggestions for improvement
5. **Priority Level**: Critical/Important/Minor for each issue

## 4. Improvement Roadmap
Prioritize 5-8 specific improvements:
1. Highest priority changes with biggest visual impact
2. Quick wins that elevate quality
3. Refinements for polish

Be specific, actionable, and brutally honest. Output as JSON:

\`\`\`json
{
  "overall_assessment": "2-3 sentence summary of quality and audience perception",
  "design_effectiveness": {
    "impact": 75,
    "craft": 82,
    "motion": 68,
    "clarity": 90,
    "resonance": 70,
    "overall": 77
  },
  "strengths": [
    "Specific strength that works well"
  ],
  "critiques": [
    {
      "aspect": "Color Palette",
      "observation": "What you see",
      "issue": "Why it's problematic",
      "impact": "critical",
      "suggestion": "Specific fix"
    }
  ],
  "audience_impact": {
    "first_impression": "Describe what audience sees first",
    "emotional_tone": "The feeling it creates",
    "perceived_quality": "professional",
    "trustworthiness": 75,
    "memorability": 60,
    "target_audience_fit": "Best for X audience because..."
  },
  "improvement_plan": [
    {
      "priority": 1,
      "category": "color",
      "action": "Specific action to take",
      "rationale": "Why this matters most",
      "expected_impact": "How it will improve perception",
      "specific_changes": ["Change X to Y", "Add Z"]
    }
  ],
  "professional_recommendations": [
    "High-level guidance for making this production-ready"
  ]
}
\`\`\`

Focus on what real users will experience and how to make this truly effective.`
}

function parseOpenAIResponse(content: string): OpenAIAnalysis {
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
    const designEffectiveness: DesignEffectiveness = {
      impact: effectiveness.impact || 50,
      craft: effectiveness.craft || 50,
      motion: effectiveness.motion || 50,
      clarity: effectiveness.clarity || 50,
      resonance: effectiveness.resonance || 50,
      overall: effectiveness.overall || 50,
    }

    return {
      provider: "openai",
      overallAssessment: parsed.overall_assessment || "No assessment provided",
      designEffectiveness,
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
    console.error("Failed to parse OpenAI response:", error)
    throw new Error("Failed to parse analysis")
  }
}
