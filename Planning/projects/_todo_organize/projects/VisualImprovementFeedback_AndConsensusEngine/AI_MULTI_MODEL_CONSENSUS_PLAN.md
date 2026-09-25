# Multi-Model AI Consensus System for Lottie Theming
**Date**: October 10, 2025  
**Architecture**: 4+ AI Models with Consensus Ranking

## 🎯 System Overview

A sophisticated AI pipeline that queries **multiple AI models** simultaneously, collects their responses, and generates a **consensus-based recommendation** with all individual results available for comparison.

### Core Concept: "AI Council"

Instead of trusting one AI, we create an **AI Council** where each model provides:
1. **Color theme mappings** for specific theme colors
2. **Design improvement recommendations** with priorities
3. **Visual appeal analysis** with scoring
4. **Business context alignment** suggestions

The system then:
- **Compares** all responses
- **Identifies consensus** areas (where models agree)
- **Highlights disagreements** (where models differ)
- **Ranks** results by confidence and quality metrics
- **Presents all options** to the user for final selection

## 🤖 AI Model Stack (4+ Models)

### 1. Claude Sonnet 4.5 (Anthropic)
**Model**: `claude-sonnet-4-5-20250929`

**Strengths**:
- Highest intelligence across tasks
- Excellent reasoning and aesthetic judgment
- Strong with visual composition analysis
- Great at explaining "why" behind choices

**Best For**:
- Color theory and harmony analysis
- Design critique and improvements
- Accessibility reasoning
- Business context alignment

**API**:
```javascript
import Anthropic from '@anthropic-ai/sdk'
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
```

**Cost**: $3/MTok input, $15/MTok output

---

### 2. Gemini 2.5 Pro (Google)
**Model**: `gemini-2.5-pro`

**Strengths**:
- State-of-the-art thinking model
- 1M+ token context window
- Excellent for complex multi-step reasoning
- Strong multimodal capabilities

**Best For**:
- Deep animation structure analysis
- Pattern recognition across layers
- Complex color relationship understanding
- Long-form design recommendations

**API**:
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })
```

**Cost**: Competitive pricing for large contexts

---

### 3. GPT-4o (OpenAI)
**Model**: `gpt-4o` or `gpt-4-turbo` (latest with vision)

**Strengths**:
- Proven track record in production
- Strong visual understanding
- Fast inference times
- Excellent at structured outputs

**Best For**:
- Balanced analysis
- Quick consensus generation
- Structured JSON responses
- Reliable baseline

**API**:
```javascript
import OpenAI from 'openai'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
```

**Cost**: ~$5-10/MTok (varies by model version)

---

### 4. Gemini 2.5 Flash (Google)
**Model**: `gemini-2.5-flash`

**Strengths**:
- Fastest response time
- Best price-performance
- Thinking + agentic capabilities
- Good for quick iterations

**Best For**:
- Real-time generation
- Cost-effective consensus validation
- Quick A/B testing
- High-volume requests

**API**: Same as Gemini Pro (different model string)

**Cost**: Most cost-effective

---

### 5. Adobe Firefly (Optional - Image Generation Focus)
**Model**: Firefly API v3

**Strengths**:
- Native Adobe creative ecosystem
- IP indemnification for commercial use
- Strong with design aesthetics
- Image generation capabilities

**Best For**:
- Visual preview generation
- Design-forward recommendations
- Commercial-safe outputs
- Creative workflow integration

**API**:
```javascript
// Requires Adobe Developer Console setup
const FIREFLY_API_KEY = process.env.ADOBE_FIREFLY_API_KEY
const FIREFLY_CLIENT_ID = process.env.ADOBE_CLIENT_ID
```

**Cost**: Credit-based system (limited availability)

**Note**: Firefly is under limited availability and focuses on image generation. For text-based analysis (color themes, design recommendations), we'll use the 4 LLM models above.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Request                                 │
│  Animation: "AngelWingsHalo"                                     │
│  Theme Color: "#667eea"                                          │
│  Context: "B2B SaaS achievement notification"                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Pre-Processing Pipeline                         │
│  • Parse Lottie JSON (colors, layers, structure)                │
│  • Semantic classification (skin, sparkles, shadows)            │
│  • Generate shared prompt context                               │
│  • Calculate complexity metrics                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│            Parallel AI Model Execution (4 models)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Claude 4.5   │  │ Gemini 2.5   │  │ GPT-4o       │          │
│  │ Sonnet       │  │ Pro          │  │              │          │
│  │ (Anthropic)  │  │ (Google)     │  │ (OpenAI)     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         ↓                  ↓                  ↓                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Response 1   │  │ Response 2   │  │ Response 3   │          │
│  │ • Themes     │  │ • Themes     │  │ • Themes     │          │
│  │ • Improvements│ │ • Improvements│ │ • Improvements│          │
│  │ • Score: 8.2 │  │ • Score: 8.5 │  │ • Score: 8.0 │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                              ↓                                   │
│  ┌──────────────┐                                               │
│  │ Gemini 2.5   │                                               │
│  │ Flash (Fast) │  ← Used for quick validation/consensus       │
│  └──────────────┘                                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Consensus Engine                                │
│  • Compare all responses                                        │
│  • Calculate agreement scores                                   │
│  • Identify common recommendations                              │
│  • Highlight unique insights                                    │
│  • Rank by confidence + quality                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Consensus Output                                │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ 🏆 CONSENSUS (3/4 models agree)                      │      │
│  │ • Expand gradient range to 35% (unanimous)           │      │
│  │ • Use purple (#667eea) for premium feel (3/4)        │      │
│  │ • Accessibility: WCAG AA compliant (4/4)             │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ 📊 INDIVIDUAL RESULTS (Click to expand)              │      │
│  │ • Claude 4.5: Score 8.2, 5 improvements              │      │
│  │ • Gemini 2.5: Score 8.5, 6 improvements              │      │
│  │ • GPT-4o: Score 8.0, 4 improvements                  │      │
│  │ • Gemini Flash: Score 8.3, 5 improvements            │      │
│  └──────────────────────────────────────────────────────┘      │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐      │
│  │ 🎨 ALL COLOR THEMES (Compare side-by-side)          │      │
│  │ [Claude] [Gemini Pro] [GPT-4o] [Gemini Flash]       │      │
│  └──────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    User Selects Preferred Result
```

## 📋 Implementation Plan

### Phase 1: Foundation Infrastructure (Days 1-3)

#### Day 1: Core Pipeline Setup

**File**: `scripts/lottie/ai-theming/pipeline.js`

```javascript
/**
 * Multi-Model AI Pipeline Orchestrator
 * Coordinates parallel execution of multiple AI models
 */

import { ClaudeProvider } from './providers/claudeProvider.js'
import { GeminiProvider } from './providers/geminiProvider.js'
import { OpenAIProvider } from './providers/openaiProvider.js'
import { ConsensusEngine } from './consensus/consensusEngine.js'
import { analyzeAnimation } from './analyze/animationAnalyzer.js'
import { classifyLayers } from './analyze/semanticClassifier.js'

class AIThemingPipeline {
  constructor() {
    this.providers = {
      claude: new ClaudeProvider(process.env.ANTHROPIC_API_KEY),
      geminiPro: new GeminiProvider(process.env.GOOGLE_AI_API_KEY, 'pro'),
      geminiFlash: new GeminiProvider(process.env.GOOGLE_AI_API_KEY, 'flash'),
      openai: new OpenAIProvider(process.env.OPENAI_API_KEY)
    }
    
    this.consensus = new ConsensusEngine()
  }
  
  /**
   * Generate theme recommendations from all AI models
   */
  async generateThemeConsensus(options) {
    const {
      animationName,
      themeColor,
      mode = 'light',
      context = {}
    } = options
    
    // 1. Pre-process animation
    console.log(`[Pipeline] Analyzing ${animationName}...`)
    const animationData = await loadAnimation(animationName)
    const analysis = analyzeAnimation(animationData)
    const semantics = classifyLayers(analysis)
    
    // 2. Build shared prompt context
    const promptContext = this.buildPromptContext({
      analysis,
      semantics,
      themeColor,
      mode,
      context
    })
    
    // 3. Execute all models in parallel
    console.log(`[Pipeline] Querying 4 AI models in parallel...`)
    const results = await this.executeParallel(promptContext)
    
    // 4. Generate consensus
    console.log(`[Pipeline] Generating consensus...`)
    const consensus = this.consensus.analyze(results)
    
    return {
      consensus,
      individual: results,
      metadata: {
        animationName,
        themeColor,
        mode,
        context,
        timestamp: Date.now()
      }
    }
  }
  
  /**
   * Execute all AI providers in parallel with timeout
   */
  async executeParallel(promptContext, timeout = 30000) {
    const promises = Object.entries(this.providers).map(([name, provider]) => 
      this.executeWithTimeout(name, provider, promptContext, timeout)
    )
    
    const results = await Promise.allSettled(promises)
    
    return results.map((result, idx) => {
      const providerName = Object.keys(this.providers)[idx]
      
      if (result.status === 'fulfilled') {
        return {
          provider: providerName,
          success: true,
          data: result.value,
          executionTime: result.value.executionTime
        }
      } else {
        return {
          provider: providerName,
          success: false,
          error: result.reason.message,
          executionTime: null
        }
      }
    })
  }
  
  /**
   * Execute single provider with timeout
   */
  async executeWithTimeout(name, provider, promptContext, timeout) {
    const startTime = Date.now()
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`${name} timeout after ${timeout}ms`)), timeout)
    )
    
    const executionPromise = provider.generateThemeAndAnalysis(promptContext)
    
    const result = await Promise.race([executionPromise, timeoutPromise])
    
    return {
      ...result,
      executionTime: Date.now() - startTime
    }
  }
  
  /**
   * Build shared prompt context for all models
   */
  buildPromptContext(options) {
    const { analysis, semantics, themeColor, mode, context } = options
    
    return {
      // Animation data
      animation: {
        name: analysis.name,
        duration: analysis.metadata.duration,
        complexity: analysis.metadata.complexity,
        colorCount: analysis.colors.length,
        layerCount: analysis.layers.length
      },
      
      // Color analysis
      colors: analysis.colors.map(c => ({
        hex: c.hex,
        hsl: c.hsl,
        path: c.path,
        semantic: semantics[c.path] || []
      })),
      
      // Theme requirements
      theme: {
        color: themeColor,
        mode,
        targetLightness: mode === 'light' ? '20-70%' : '50-90%'
      },
      
      // Business context
      context: {
        purpose: context.purpose || 'General UI animation',
        audience: context.audience || 'Business professionals',
        brandValues: context.brandValues || ['trust', 'innovation'],
        surroundingText: context.surroundingText || '',
        pageContext: context.pageContext || '',
        emotionalTone: context.emotionalTone || 'professional'
      },
      
      // Requirements
      requirements: {
        accessibility: 'WCAG AA minimum, AAA preferred',
        preserveSkinTones: semantics.hasSkinTones || false,
        preserveSparkles: semantics.hasSparkles || false,
        maintainGradients: semantics.hasGradients || false
      }
    }
  }
}

export default AIThemingPipeline
```

---

#### Day 2: Individual AI Providers

**File**: `scripts/lottie/ai-theming/providers/claudeProvider.js`

```javascript
import Anthropic from '@anthropic-ai/sdk'

export class ClaudeProvider {
  constructor(apiKey) {
    this.client = new Anthropic({ apiKey })
    this.model = 'claude-sonnet-4-5-20250929'
    this.name = 'Claude Sonnet 4.5'
  }
  
  async generateThemeAndAnalysis(promptContext) {
    const prompt = this.buildPrompt(promptContext)
    
    const message = await this.client.messages.create({
      model: this.model,
      max_tokens: 8192,
      temperature: 0.7,
      messages: [{
        role: 'user',
        content: prompt
      }]
    })
    
    const response = JSON.parse(message.content[0].text)
    
    return {
      provider: this.name,
      model: this.model,
      ...response
    }
  }
  
  buildPrompt(ctx) {
    return `You are an expert UI/UX designer and color theorist analyzing a Lottie animation for optimal theming.

# Animation Analysis

**Name**: ${ctx.animation.name}
**Complexity**: ${ctx.animation.complexity}
**Colors**: ${ctx.animation.colorCount} unique colors
**Layers**: ${ctx.animation.layerCount} layers

**Color Palette**:
${ctx.colors.map(c => `- ${c.hex} (H=${c.hsl.h}°, S=${c.hsl.s}%, L=${c.hsl.l}%) - Path: ${c.path}`).join('\n')}

**Semantic Classifications**:
${ctx.colors.filter(c => c.semantic.length > 0).map(c => 
  `- ${c.path}: ${c.semantic.map(s => s.type).join(', ')}`
).join('\n') || 'None detected'}

# Target Theme

**Color**: ${ctx.theme.color}
**Mode**: ${ctx.theme.mode} (background is ${ctx.theme.mode === 'light' ? 'white' : 'black'})
**Target Lightness Range**: ${ctx.theme.targetLightness}

# Business Context

**Purpose**: ${ctx.context.purpose}
**Audience**: ${ctx.context.audience}
**Brand Values**: ${ctx.context.brandValues.join(', ')}
${ctx.context.surroundingText ? `**Surrounding Text**: "${ctx.context.surroundingText}"` : ''}
${ctx.context.pageContext ? `**Page Context**: ${ctx.context.pageContext}` : ''}
**Emotional Tone**: ${ctx.context.emotionalTone}

# Requirements

1. **Accessibility**: ${ctx.requirements.accessibility}
2. **Preserve Skin Tones**: ${ctx.requirements.preserveSkinTones ? 'YES - Keep natural hues (0-50°)' : 'N/A'}
3. **Preserve Sparkles**: ${ctx.requirements.preserveSparkles ? 'YES - Keep very light (L>90%)' : 'N/A'}
4. **Maintain Gradients**: ${ctx.requirements.maintainGradients ? 'YES - Preserve lightness relationships' : 'N/A'}

# Your Tasks

Provide a comprehensive analysis with:

1. **Color Theme Mappings**: For each color in the palette, provide optimal themed color
2. **Visual Appeal Score**: Rate overall aesthetic appeal (0-10)
3. **Design Improvements**: Specific actionable recommendations
4. **Business Alignment**: How well it fits the context, best use cases
5. **Accessibility Audit**: Contrast ratios, color blind safety
6. **Confidence Score**: How confident you are in your recommendations (0-1)

# Output Format (JSON only, no markdown)

{
  "colorMappings": {
    "path/to/layer": {
      "original": "#611790",
      "themed": "#1d36a6",
      "reasoning": "Maintains gradient relationship with partner color",
      "lightness": 38.3,
      "saturation": 78.2,
      "contrastRatio": 4.8,
      "accessibility": "AA"
    }
  },
  "visualAppeal": {
    "score": 8.2,
    "strengths": ["Beautiful gradient depth", "Symmetrical composition"],
    "weaknesses": ["Gradient range too narrow"],
    "composition": { "score": 8, "notes": "Well balanced" },
    "colorHarmony": { "score": 7, "notes": "Could use wider range" },
    "timing": { "score": 9, "notes": "Smooth animation" }
  },
  "improvements": [
    {
      "category": "color-harmony",
      "priority": "high",
      "issue": "Gradient range only 11.7%, loses depth",
      "recommendation": "Expand to 35% range",
      "impact": "Better visual depth and contrast",
      "difficulty": "easy",
      "reasoning": "Wider range creates more visual interest"
    }
  ],
  "businessAlignment": {
    "fitScore": 8.5,
    "bestUseCases": ["Achievement notifications", "Premium unlocks"],
    "avoidContexts": ["Error messages", "Urgent warnings"],
    "emotionalImpact": "Positive, aspirational, premium",
    "brandMatch": "Aligns well with innovation and trust"
  },
  "accessibility": {
    "colorBlindSafe": true,
    "motionSafe": true,
    "contrastCompliant": "AA",
    "wcagLevel": "AA",
    "concerns": []
  },
  "confidence": 0.92,
  "reasoning": "High confidence due to clear gradient structure and straightforward theming requirements"
}`
  }
}
```

**Similar files needed**:
- `geminiProvider.js` (using `@google/generative-ai`)
- `openaiProvider.js` (using `openai` SDK)

---

#### Day 3: Consensus Engine

**File**: `scripts/lottie/ai-theming/consensus/consensusEngine.js`

```javascript
/**
 * Consensus Engine
 * Analyzes multiple AI responses and generates consensus
 */

export class ConsensusEngine {
  /**
   * Analyze multiple AI results and generate consensus
   */
  analyze(results) {
    const successful = results.filter(r => r.success)
    
    if (successful.length === 0) {
      throw new Error('All AI models failed')
    }
    
    return {
      summary: this.generateSummary(successful),
      colorConsensus: this.analyzeColorConsensus(successful),
      improvementConsensus: this.analyzeImprovementConsensus(successful),
      scoreConsensus: this.analyzeScoreConsensus(successful),
      businessConsensus: this.analyzeBusinessConsensus(successful),
      disagreements: this.identifyDisagreements(successful),
      recommended: this.selectRecommended(successful),
      metadata: {
        totalModels: results.length,
        successfulModels: successful.length,
        failedModels: results.filter(r => !r.success).length,
        avgExecutionTime: this.calculateAvgTime(successful)
      }
    }
  }
  
  /**
   * Generate high-level summary
   */
  generateSummary(results) {
    const agreement = this.calculateOverallAgreement(results)
    const avgScore = this.calculateAvgScore(results)
    
    return {
      agreement: agreement, // 0-1 scale
      agreementLevel: agreement > 0.8 ? 'high' : agreement > 0.6 ? 'medium' : 'low',
      avgVisualAppealScore: avgScore,
      unanimousRecommendations: this.findUnanimous(results),
      splitRecommendations: this.findSplit(results)
    }
  }
  
  /**
   * Analyze color mapping consensus
   */
  analyzeColorConsensus(results) {
    const allMappings = results.map(r => r.data.colorMappings)
    const layers = this.getAllLayers(allMappings)
    
    return layers.map(layer => {
      const suggestions = allMappings
        .map(m => m[layer])
        .filter(Boolean)
      
      if (suggestions.length === 0) return null
      
      // Check if all models agree (within 5% lightness)
      const unanimous = this.checkColorUnanimity(suggestions)
      
      return {
        layer,
        unanimous,
        consensus: unanimous ? suggestions[0].themed : this.findMedianColor(suggestions),
        alternatives: unanimous ? [] : suggestions.map(s => ({
          color: s.themed,
          provider: s.provider,
          reasoning: s.reasoning
        })),
        agreementScore: this.calculateColorAgreement(suggestions),
        accessibilityConsensus: this.checkAccessibilityConsensus(suggestions)
      }
    }).filter(Boolean)
  }
  
  /**
   * Analyze improvement recommendation consensus
   */
  analyzeImprovementConsensus(results) {
    const allImprovements = results.flatMap(r => 
      r.data.improvements.map(imp => ({ ...imp, provider: r.provider }))
    )
    
    // Group similar improvements
    const grouped = this.groupSimilarImprovements(allImprovements)
    
    return Object.entries(grouped).map(([category, improvements]) => {
      const count = improvements.length
      const totalModels = results.length
      const agreement = count / totalModels
      
      return {
        category,
        mentionedBy: count,
        totalModels,
        agreement,
        priority: this.calculatePriority(improvements),
        commonIssue: this.findCommonPhrasing(improvements.map(i => i.issue)),
        commonRecommendation: this.findCommonPhrasing(improvements.map(i => i.recommendation)),
        allVariations: improvements.map(i => ({
          provider: i.provider,
          issue: i.issue,
          recommendation: i.recommendation,
          priority: i.priority
        }))
      }
    }).sort((a, b) => b.agreement - a.agreement)
  }
  
  /**
   * Analyze visual appeal score consensus
   */
  analyzeScoreConsensus(results) {
    const scores = results.map(r => r.data.visualAppeal.score)
    
    return {
      average: this.mean(scores),
      median: this.median(scores),
      stdDev: this.standardDeviation(scores),
      range: { min: Math.min(...scores), max: Math.max(...scores) },
      agreement: this.stdDev(scores) < 0.5 ? 'high' : this.stdDev(scores) < 1.0 ? 'medium' : 'low',
      individual: results.map(r => ({
        provider: r.provider,
        score: r.data.visualAppeal.score,
        strengths: r.data.visualAppeal.strengths,
        weaknesses: r.data.visualAppeal.weaknesses
      }))
    }
  }
  
  /**
   * Analyze business alignment consensus
   */
  analyzeBusinessConsensus(results) {
    const allUseCases = results.flatMap(r => r.data.businessAlignment.bestUseCases)
    const allAvoid = results.flatMap(r => r.data.businessAlignment.avoidContexts)
    
    return {
      bestUseCases: this.findConsensusItems(allUseCases, results.length),
      avoidContexts: this.findConsensusItems(allAvoid, results.length),
      fitScores: {
        average: this.mean(results.map(r => r.data.businessAlignment.fitScore)),
        range: {
          min: Math.min(...results.map(r => r.data.businessAlignment.fitScore)),
          max: Math.max(...results.map(r => r.data.businessAlignment.fitScore))
        }
      }
    }
  }
  
  /**
   * Identify key disagreements between models
   */
  identifyDisagreements(results) {
    const disagreements = []
    
    // Check color mappings
    const colorDisagreements = this.findColorDisagreements(results)
    if (colorDisagreements.length > 0) {
      disagreements.push({
        type: 'color-mappings',
        count: colorDisagreements.length,
        details: colorDisagreements
      })
    }
    
    // Check improvement priorities
    const priorityDisagreements = this.findPriorityDisagreements(results)
    if (priorityDisagreements.length > 0) {
      disagreements.push({
        type: 'priorities',
        count: priorityDisagreements.length,
        details: priorityDisagreements
      })
    }
    
    return disagreements
  }
  
  /**
   * Select recommended result (best combination)
   */
  selectRecommended(results) {
    // Score each result based on multiple factors
    const scored = results.map(r => ({
      provider: r.provider,
      score: this.calculateResultScore(r),
      data: r.data
    }))
    
    // Return highest scoring
    scored.sort((a, b) => b.score - a.score)
    
    return {
      primary: scored[0],
      alternatives: scored.slice(1),
      reasoning: this.explainSelection(scored[0], scored)
    }
  }
  
  /**
   * Calculate overall result quality score
   */
  calculateResultScore(result) {
    let score = 0
    
    // Visual appeal score (0-10)
    score += result.data.visualAppeal.score
    
    // Confidence score (0-1) weighted
    score += result.data.confidence * 5
    
    // Accessibility compliance
    if (result.data.accessibility.contrastCompliant === 'AAA') score += 3
    else if (result.data.accessibility.contrastCompliant === 'AA') score += 2
    
    // Number of improvements (more is better)
    score += Math.min(result.data.improvements.length * 0.5, 3)
    
    // Execution time penalty (slower is worse)
    if (result.executionTime > 10000) score -= 1
    else if (result.executionTime > 20000) score -= 2
    
    return score
  }
  
  // Utility methods
  mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length
  }
  
  median(arr) {
    const sorted = [...arr].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  }
  
  standardDeviation(arr) {
    const avg = this.mean(arr)
    const squareDiffs = arr.map(val => Math.pow(val - avg, 2))
    return Math.sqrt(this.mean(squareDiffs))
  }
  
  // ... more utility methods
}
```

---

### Phase 2: Context-Aware Features (Days 4-6)

#### Day 4: Context Enrichment

**File**: `scripts/lottie/ai-theming/context/contextBuilder.js`

```javascript
/**
 * Context Builder
 * Enriches animation analysis with business context
 */

export class ContextBuilder {
  /**
   * Build comprehensive context for AI analysis
   */
  build(options) {
    const {
      animation,
      userContext = {},
      pageContext = {},
      detectedContext = {}
    } = options
    
    return {
      // User-provided context
      purpose: userContext.purpose || this.inferPurpose(animation),
      audience: userContext.audience || 'Business professionals',
      brandValues: userContext.brandValues || ['professionalism', 'trust'],
      emotionalTone: userContext.emotionalTone || this.inferTone(animation),
      
      // Surrounding content context
      surroundingText: pageContext.surroundingText || '',
      headingText: pageContext.headingText || '',
      ctaText: pageContext.ctaText || '',
      pageType: pageContext.pageType || 'dashboard',
      
      // Auto-detected context
      animationCategory: detectedContext.category,
      visualTheme: detectedContext.theme,
      complexity: detectedContext.complexity,
      
      // Industry/domain
      industry: userContext.industry || 'SaaS',
      productType: userContext.productType || 'B2B platform'
    }
  }
  
  /**
   * Infer purpose from animation name and structure
   */
  inferPurpose(animation) {
    const name = animation.name.toLowerCase()
    
    if (name.includes('rocket') || name.includes('launch')) {
      return 'Launch announcement or progress indication'
    }
    if (name.includes('homework') || name.includes('complete')) {
      return 'Task completion or achievement celebration'
    }
    if (name.includes('angel') || name.includes('wings')) {
      return 'Premium feature or milestone celebration'
    }
    if (name.includes('sprint') || name.includes('velocity')) {
      return 'Performance metrics or speed indication'
    }
    
    return 'General UI enhancement'
  }
  
  /**
   * Infer emotional tone from animation characteristics
   */
  inferTone(animation) {
    // Analyze animation characteristics
    const hasSparkles = animation.semantics?.hasSparkles
    const hasFastMotion = animation.metadata?.duration < 2
    const colorful = animation.colors?.length > 5
    
    if (hasSparkles) return 'celebratory'
    if (hasFastMotion) return 'energetic'
    if (colorful) return 'playful'
    
    return 'professional'
  }
}
```

---

### Phase 3: Gallery Integration (Days 7-10)

#### Day 7: API Endpoints

**File**: `gallery/api/ai-consensus.js`

```javascript
import express from 'express'
import AIThemingPipeline from '../../scripts/lottie/ai-theming/pipeline.js'

const router = express.Router()
const pipeline = new AIThemingPipeline()

/**
 * POST /api/ai-consensus/generate
 * Generate multi-model consensus theme
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      animation,
      themeColor,
      mode = 'light',
      context = {}
    } = req.body
    
    // Validate inputs
    if (!animation || !themeColor) {
      return res.status(400).json({
        error: 'Missing required fields: animation, themeColor'
      })
    }
    
    // Generate consensus
    const result = await pipeline.generateThemeConsensus({
      animationName: animation,
      themeColor,
      mode,
      context
    })
    
    res.json({
      success: true,
      data: result,
      models: {
        total: result.metadata.totalModels,
        successful: result.metadata.successfulModels,
        failed: result.metadata.failedModels
      }
    })
    
  } catch (error) {
    console.error('[API] Consensus generation failed:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

/**
 * POST /api/ai-consensus/compare
 * Compare individual model results
 */
router.post('/compare', async (req, res) => {
  try {
    const { resultId } = req.body
    
    // Fetch stored result
    const result = await fetchStoredResult(resultId)
    
    res.json({
      success: true,
      data: {
        consensus: result.consensus,
        individual: result.individual,
        comparison: generateComparison(result.individual)
      }
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

export default router
```

---

#### Day 8-9: Gallery UI Components

**File**: `gallery/components/ConsensusPanel.html`

```html
<div class="consensus-panel">
  <!-- Header -->
  <div class="panel-header">
    <h2>🤖 AI Council Consensus</h2>
    <div class="model-badges">
      <span class="badge claude active">Claude 4.5 ✓</span>
      <span class="badge gemini-pro active">Gemini Pro ✓</span>
      <span class="badge gpt4 active">GPT-4o ✓</span>
      <span class="badge gemini-flash active">Gemini Flash ✓</span>
    </div>
  </div>
  
  <!-- Consensus Summary -->
  <div class="consensus-summary">
    <div class="agreement-meter">
      <div class="meter-fill" style="width: 85%"></div>
      <span class="meter-label">85% Agreement</span>
    </div>
    
    <div class="consensus-score">
      <div class="score-value">8.3</div>
      <div class="score-label">Avg Visual Appeal</div>
      <div class="score-range">Range: 8.0 - 8.5</div>
    </div>
  </div>
  
  <!-- Unanimous Recommendations -->
  <div class="unanimous-section">
    <h3>✅ Unanimous (4/4 models agree)</h3>
    <div class="recommendation">
      <span class="priority high">HIGH</span>
      <div class="content">
        <strong>Expand gradient range to 35%</strong>
        <p>Current 11.7% range loses visual depth. All models recommend expanding to 30-40% for better contrast.</p>
        <div class="impact">Impact: +40% visual depth, better page presence</div>
      </div>
    </div>
  </div>
  
  <!-- Consensus Recommendations -->
  <div class="consensus-section">
    <h3>🎯 Consensus (3/4 models agree)</h3>
    <div class="recommendation">
      <span class="priority medium">MEDIUM</span>
      <div class="content">
        <strong>Add subtle motion blur to wings</strong>
        <p>Claude, Gemini Pro, and GPT-4o recommend adding motion blur. Gemini Flash suggests keeping current timing.</p>
      </div>
    </div>
  </div>
  
  <!-- Color Theme Comparison -->
  <div class="color-comparison">
    <h3>🎨 Color Theme Comparison</h3>
    <div class="theme-grid">
      <div class="theme-option" data-provider="claude">
        <div class="preview">
          <div class="color-swatch" style="background: #1d36a6"></div>
          <div class="color-swatch" style="background: #7b92fb"></div>
        </div>
        <div class="label">Claude 4.5</div>
        <div class="score">Score: 8.2</div>
      </div>
      
      <div class="theme-option recommended" data-provider="gemini-pro">
        <div class="preview">
          <div class="color-swatch" style="background: #1c35a8"></div>
          <div class="color-swatch" style="background: #7a91fa"></div>
        </div>
        <div class="label">Gemini Pro ⭐</div>
        <div class="score">Score: 8.5</div>
      </div>
      
      <!-- More theme options -->
    </div>
  </div>
  
  <!-- Individual Results (Expandable) -->
  <details class="individual-results">
    <summary>📊 View Individual Model Results (4)</summary>
    
    <div class="model-result">
      <h4>Claude Sonnet 4.5</h4>
      <div class="result-content">
        <div class="score">Visual Appeal: 8.2/10</div>
        <div class="strengths">
          <strong>Strengths:</strong>
          <ul>
            <li>Beautiful gradient creates depth</li>
            <li>Symmetrical composition is pleasing</li>
          </ul>
        </div>
        <div class="improvements">
          <strong>5 Improvements Suggested</strong>
          <button onclick="showDetails('claude')">View Details</button>
        </div>
      </div>
    </div>
    
    <!-- More model results -->
  </details>
  
  <!-- Disagreements -->
  <details class="disagreements">
    <summary>⚠️ Model Disagreements (2)</summary>
    
    <div class="disagreement">
      <h4>Shadow Darkness</h4>
      <div class="positions">
        <div class="position">
          <strong>Claude & GPT-4o:</strong> Keep shadows subtle (L=25%)
        </div>
        <div class="position">
          <strong>Gemini Pro & Flash:</strong> Make shadows darker (L=15%)
        </div>
      </div>
      <div class="recommendation">
        💡 Consider context: Use subtle for light themes, darker for dark themes
      </div>
    </div>
  </details>
  
  <!-- Export Options -->
  <div class="export-options">
    <button class="btn-primary" onclick="applyConsensus()">
      Apply Consensus Theme
    </button>
    <button class="btn-secondary" onclick="exportToMUI()">
      Export to MUI Theme
    </button>
    <button class="btn-secondary" onclick="compareAll()">
      Compare All Side-by-Side
    </button>
  </div>
</div>

<style>
.consensus-panel {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 32px;
  margin: 24px 0;
}

.agreement-meter {
  position: relative;
  height: 40px;
  background: #e0e0e0;
  border-radius: 20px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #09C577 0%, #667eea 100%);
  transition: width 0.5s ease;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.theme-option {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.theme-option.recommended {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
}

.theme-option:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}

.color-swatch {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: inline-block;
  margin: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
```

---

### Phase 4: Testing & Optimization (Days 11-12)

#### Performance Optimization

```javascript
// Cache layer for frequent queries
import Redis from 'redis'

class CacheLayer {
  constructor() {
    this.redis = Redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    })
    this.ttl = 3600 // 1 hour
  }
  
  async getCached(key) {
    const cached = await this.redis.get(key)
    return cached ? JSON.parse(cached) : null
  }
  
  async setCached(key, value) {
    await this.redis.setex(key, this.ttl, JSON.stringify(value))
  }
  
  generateKey(options) {
    return `consensus:${options.animationName}:${options.themeColor}:${options.mode}:${JSON.stringify(options.context)}`
  }
}
```

---

## 💰 Cost Analysis

### Per-Request Cost Breakdown

**4 Models per request**:
- Claude Sonnet 4.5: ~$0.04
- Gemini 2.5 Pro: ~$0.02
- GPT-4o: ~$0.03
- Gemini 2.5 Flash: ~$0.01

**Total per consensus**: ~$0.10

### Monthly Estimates (1000 DAU)

**Without caching**:
- 1000 users × 4 animations × 3 themes = 12,000 requests
- 12,000 × $0.10 = $1,200/month

**With 80% cache hit rate**:
- Effective requests: 2,400
- **Cost: $240/month**

**With progressive caching** (popular combos cached longer):
- **Cost: $150-200/month**

---

## 📊 Success Metrics

### Quality Metrics
- **Consensus Agreement**: Target >80% for color mappings
- **User Satisfaction**: Rating of consensus vs individual results
- **Improvement Adoption**: % of recommendations implemented
- **Accessibility Compliance**: 100% WCAG AA minimum

### Performance Metrics
- **Parallel Execution Time**: Target <5 seconds for all 4 models
- **Cache Hit Rate**: Target >80%
- **Model Failure Rate**: Target <5%
- **Cost Per User**: Target <$0.20/month

### Consensus Quality
- **Agreement Score**: Measure how often models agree
- **Disagreement Resolution**: Track which model was "right"
- **User Preference**: Which model users select most

---

## 🚀 Quick Start Guide

### 1. Install Dependencies

```bash
npm install \
  @anthropic-ai/sdk \
  @google/generative-ai \
  openai \
  express \
  node-cache \
  redis
```

### 2. Set Environment Variables

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...
OPENAI_API_KEY=sk-...
REDIS_URL=redis://localhost:6379
```

### 3. Test Single Animation

```bash
node scripts/lottie/ai-theming/test-consensus.js \
  --animation AngelWingsHalo \
  --theme "#667eea" \
  --context "Achievement notification for completing project milestone"
```

### 4. Start Gallery Server

```bash
cd gallery
npm start
```

### 5. Generate Consensus

```bash
curl -X POST http://localhost:3000/api/ai-consensus/generate \
  -H "Content-Type: application/json" \
  -d '{
    "animation": "AngelWingsHalo",
    "themeColor": "#667eea",
    "mode": "light",
    "context": {
      "purpose": "Achievement notification",
      "surroundingText": "Congratulations! You completed your milestone.",
      "emotionalTone": "celebratory"
    }
  }'
```

---

## 🎯 Next Steps

1. **Review this plan** - Confirm approach and scope
2. **Approve budget** - $150-240/month for AI API costs
3. **Set up API keys** - Get access to all 4 providers
4. **Choose starting point**:
   - Option A: Build foundation (Days 1-3) first
   - Option B: Prototype with 2 models, expand to 4
   - Option C: Full implementation (12 days)

---

## 📝 Notes

**Adobe Firefly**: Currently focuses on image generation (not text analysis). We can explore adding it later for:
- Generating visual previews of themed animations
- Creating marketing assets from animations
- Providing design mockups

For now, the 4 LLM models (Claude, Gemini Pro/Flash, GPT-4o) provide comprehensive text-based analysis.

**Extensibility**: Architecture supports adding more models easily:
```javascript
this.providers = {
  ...existingProviders,
  mistral: new MistralProvider(apiKey),  // Easy to add
  cohere: new CohereProvider(apiKey)      // Easy to add
}
```

---

Ready to implement this multi-model consensus system! 🚀✨
