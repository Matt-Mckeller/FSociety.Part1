# AI-Powered Lottie Theming System - Implementation Plan

## 🎯 Goals

1. **Context-Aware**: Detect skin tones, sparkles, shadows automatically
2. **Accessibility-First**: Ensure WCAG AAA compliance
3. **Dual-Mode**: Support light & dark themes
4. **Reusable**: Export to MUI theme configs
5. **Self-Improving**: Learn from user feedback
6. **Gallery Integration**: Visual comparison and selection UI

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Gallery UI (Frontend)                    │
│  - Animation preview with theme switcher                     │
│  - AI vs Algorithmic comparison view                         │
│  - Manual adjustment sliders                                 │
│  - Export to theme config                                    │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│              AI Generation Pipeline (Node.js)                │
│  1. Animation Analyzer (extract layers, colors)              │
│  2. Semantic Classifier (skin, sparkles, etc.)               │
│  3. Multi-Model AI Generator (GPT-4V, Claude, Gemini)        │
│  4. Accessibility Validator (WCAG checker)                   │
│  5. Results Aggregator (merge + rank variants)               │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│              Storage & Configuration                         │
│  - gallery/config/aiThemeMappings.js (generated)             │
│  - packages/ui/theme/aiGeneratedColors.ts (MUI export)       │
│  - .ai-theming-cache/ (intermediate results)                 │
└─────────────────────────────────────────────────────────────┘
```

## 📦 Phase 1: Core Infrastructure (Days 1-3)

### 1.1 Animation Analyzer

**File**: `scripts/lottie/analyzeForAI.js`

**Purpose**: Extract structured information for AI analysis

**Features**:

- Parse Lottie JSON recursively
- Extract all colors with layer paths
- Detect color relationships (gradients, harmonies)
- Calculate complexity metrics
- Generate color statistics

**Output**:

```json
{
  "animation": "AngelWingsHalo",
  "layers": [
    {
      "path": "HaloContainer/HaloRight",
      "name": "HaloRight",
      "colors": ["#611790"],
      "lightness": 32.7,
      "saturation": 71.5,
      "hue": 276.9,
      "semanticHints": ["primary", "main"],
      "relationships": {
        "partOf": "gradient",
        "contrastedWith": ["HaloLeft"]
      }
    }
  ],
  "complexity": "medium",
  "colorPalette": {
    "dominant": "#611790",
    "range": { "min": 32.7, "max": 60.0 }
  }
}
```

### 1.2 Semantic Classifier

**File**: `scripts/lottie/semanticClassifier.js`

**Purpose**: Auto-detect special layer types

**Rules Engine**:

```javascript
const CLASSIFICATION_RULES = {
  skin: {
    namePatterns: /\b(skin|flesh|face|hand|arm|leg|body|person|character)\b/i,
    hueRange: [0, 50], // Orange-red range
    saturationMin: 20,
    lightnessRange: [30, 80],
  },

  sparkle: {
    namePatterns:
      /\b(sparkle|star|glint|shine|glow|twinkle|highlight|bright)\b/i,
    lightnessMin: 90, // Very bright
    saturationMax: 20, // Mostly desaturated
  },

  shadow: {
    namePatterns: /\b(shadow|shade|dark|depth)\b/i,
    lightnessMax: 40,
    saturationMax: 50,
  },

  background: {
    namePatterns: /\b(background|bg|base|canvas|backdrop)\b/i,
    area: "large", // Covers significant portion
  },
}
```

### 1.3 AI Prompt Generator

**File**: `scripts/lottie/generateAIPrompt.js`

**Purpose**: Create optimized prompts for each AI model

**GPT-4 Vision Prompt Template**:

```markdown
# Lottie Animation Color Theming Analysis

## Task

Generate optimal color mappings for this Lottie animation to match the target theme color while preserving artistic intent and ensuring accessibility.

## Animation Data

- **Name**: {animationName}
- **Original Colors**: {colorList}
- **Layer Structure**: {layerHierarchy}
- **Semantic Classification**: {classifications}

## Target Theme

- **Color**: {themeHex}
- **Mode**: {lightMode | darkMode}
- **Lightness**: {themeLightness}%
- **Context**: {webApp | mobileApp | presentation}

## Requirements

### 1. Preserve Special Elements

- **Skin Tones**: Keep natural hue (0-50°), adjust lightness only
- **Sparkles/Highlights**: Maintain high lightness (>90%), can tint slightly
- **Shadows**: Use theme hue but keep dark (L<30%)

### 2. Accessibility (CRITICAL)

- All foreground-background pairs must achieve WCAG AA (4.5:1 contrast)
- Prefer AAA (7:1) when possible
- No pure black (#000000) or pure white (#FFFFFF) except highlights

### 3. Artistic Intent

- Preserve lightness relationships between gradient colors
- Maintain visual hierarchy (main elements vs details)
- Keep appropriate saturation levels for element types

### 4. Theme Harmony

- Primary elements: Full theme color
- Accents: Theme color with adjusted lightness
- Backgrounds: Highly desaturated theme color

## Output Format (JSON)

{
"mappings": {
"HaloContainer/HaloRight": {
"color": "#1d36a6",
"reasoning": "Darker gradient part, maintains 35% range with HaloLeft",
"metrics": {
"lightness": 38.3,
"contrast": 4.8,
"accessibility": "AA"
}
}
},
"strategy": "relative-preservation-with-accessibility-boost",
"confidence": 0.95,
"alternatives": [
{ "color": "#1a34a0", "reason": "Slightly darker for more contrast" }
]
}
```

## 📦 Phase 2: Multi-Model AI Integration (Days 4-6)

### 2.1 AI Provider Abstraction

**File**: `scripts/lottie/aiProviders.js`

```javascript
class AIProvider {
  async generateThemeMapping(animationData, themeColor, mode) {
    throw new Error("Must implement generateThemeMapping")
  }
}

class OpenAIProvider extends AIProvider {
  constructor(apiKey) {
    super()
    this.client = new OpenAI({ apiKey })
  }

  async generateThemeMapping(animationData, themeColor, mode) {
    const prompt = generatePrompt(animationData, themeColor, mode)
    const response = await this.client.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    })
    return JSON.parse(response.choices[0].message.content)
  }
}

class AnthropicProvider extends AIProvider {
  // Similar implementation for Claude
}

class GeminiProvider extends AIProvider {
  // Similar implementation for Gemini
}
```

### 2.2 Multi-Model Consensus

**File**: `scripts/lottie/consensusGenerator.js`

```javascript
async function generateWithConsensus(animation, theme, mode) {
  // Run all providers in parallel
  const results = await Promise.allSettled([
    openai.generateThemeMapping(animation, theme, mode),
    anthropic.generateThemeMapping(animation, theme, mode),
    gemini.generateThemeMapping(animation, theme, mode),
  ])

  // Aggregate results
  const variants = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value)

  // Rank by confidence and accessibility
  const ranked = rankVariants(variants)

  return {
    recommended: ranked[0],
    alternatives: ranked.slice(1, 3),
    consensus: calculateConsensus(variants),
  }
}
```

## 📦 Phase 3: Gallery Integration (Days 7-9)

### 3.1 AI Theme Comparison UI

**File**: `gallery/components/AIThemeComparison.html`

**Features**:

- Side-by-side: Algorithmic vs AI (GPT-4) vs AI (Claude)
- Interactive theme color picker
- Light/Dark mode toggle
- Accessibility metrics display
- Export button to save selection

### 3.2 Automated Generation Pipeline

**File**: `scripts/lottie/generateAllThemes.js`

```bash
# Generate themes for all animations × all theme colors
node scripts/lottie/generateAllThemes.js \
  --animations AngelWingsHalo,Homework,RocketLaunch \
  --themes "#667eea,#4285f4,#09C577,#f91a4b" \
  --models gpt4v,claude,gemini \
  --output gallery/config/aiThemeMappings.js
```

### 3.3 MUI Theme Export

**File**: `scripts/lottie/exportToMUI.js`

```javascript
// Convert AI mappings to MUI theme format
function exportToMUITheme(aiMappings) {
  return {
    palette: {
      primary: {
        main: aiMappings.primaryColor,
        light: aiMappings.lightVariant,
        dark: aiMappings.darkVariant,
      },
      lottie: {
        AngelWingsHalo: {
          light: aiMappings.AngelWingsHalo["#667eea"].layers,
          dark: aiMappings.AngelWingsHalo["#667eea"].darkMode.layers,
        },
      },
    },
  }
}
```

## 📦 Phase 4: Learning System (Days 10-12)

### 4.1 User Feedback Collection

```javascript
// Track which AI variant users select
function trackSelection(animation, theme, selectedVariant, rating) {
  analytics.track("ai_theme_selected", {
    animation,
    theme,
    variant: selectedVariant.model, // 'gpt4v', 'claude', 'gemini'
    confidence: selectedVariant.confidence,
    rating,
    timestamp: Date.now(),
  })
}
```

### 4.2 Pattern Detection

```javascript
// Analyze user preferences over time
function analyzeUserPreferences() {
  const patterns = {
    colorAdjustments: {
      "#667eea": { avgLightnessOffset: -5 }, // Users prefer darker
      "#4285f4": { avgSaturationOffset: +10 }, // Users prefer more vibrant
    },
    modelPreferences: {
      gpt4v: 0.45, // Selected 45% of time
      claude: 0.35,
      gemini: 0.2,
    },
  }
  return patterns
}
```

## 🔧 Implementation Details

### API Keys & Configuration

**File**: `.env.local`

```bash
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# Optional: Rate limiting
AI_MAX_REQUESTS_PER_MINUTE=10
AI_CACHE_TTL_HOURS=72
```

### Cost Optimization

```javascript
const COST_PER_REQUEST = {
  "gpt-4-vision": 0.03, // ~$0.03 per theme
  "claude-3.5-sonnet": 0.02, // ~$0.02 per theme
  "gemini-1.5-pro": 0.01, // ~$0.01 per theme
}

// For 100 animations × 10 themes × 3 models = 3000 requests
// Total cost: ~$60-90 (one-time generation)
```

### Caching Strategy

```javascript
// Cache AI results to avoid regeneration
const cacheKey = `${animation}_${theme}_${mode}_${model}_v1`
const cached = await redis.get(cacheKey)
if (cached) return JSON.parse(cached)

const result = await ai.generate(...)
await redis.setex(cacheKey, 60 * 60 * 24 * 7, JSON.stringify(result)) // 7 days
```

## 📊 Success Metrics

### Quality Metrics

- **Accessibility Score**: % of themes meeting WCAG AA
- **User Satisfaction**: Average rating 1-5
- **Selection Rate**: % of users choosing AI vs algorithmic
- **Manual Adjustments**: % of users making tweaks

### Performance Metrics

- **Generation Time**: <30s per animation-theme pair
- **Cache Hit Rate**: >80% for repeated requests
- **API Cost**: <$0.10 per unique generation

## 🚀 Quick Start Commands

```bash
# 1. Setup
npm install openai @anthropic-ai/sdk @google/generative-ai
cp .env.example .env.local  # Add API keys

# 2. Analyze animation
node scripts/lottie/analyzeForAI.js \
  packages/dynamicAssets/lotties/AngelWingsHalo/AngelWingsHaloOptimized.json

# 3. Generate single theme
node scripts/lottie/generateSingleTheme.js \
  --animation AngelWingsHalo \
  --theme "#667eea" \
  --mode light

# 4. Batch generate all themes
node scripts/lottie/generateAllThemes.js

# 5. View in gallery
python3 -m http.server 8000
open http://localhost:8000/gallery/index.html
```

## 🎨 Expected Results

### Before (Algorithmic Only)

- Fixed rules apply to all animations
- Some color relationships lost
- Manual tuning needed for best results

### After (AI-Enhanced)

- Context-aware color selection
- Preserved artistic intent
- Automatic accessibility compliance
- Superior aesthetic quality
- Exportable to theme configs

## 📝 Next Steps

1. ✅ Review this plan and provide feedback
2. ⏳ Implement Phase 1 (Animation Analyzer)
3. ⏳ Set up AI providers and test with one animation
4. ⏳ Build gallery comparison UI
5. ⏳ Generate themes for all animations
6. ⏳ Collect user feedback and iterate

## 🤔 Open Questions

1. **Budget**: What's acceptable API cost for initial generation? ($50-100?)
2. **Models**: Should we start with one model or all three from day 1?
3. **Scope**: How many animations × themes should we generate initially?
4. **Workflow**: Generate all at once, or on-demand in gallery?
5. **Storage**: Store in git or load from external DB/CDN?
6. **Updates**: How often should we regenerate (weekly, monthly, on-demand)?

---

**Estimated Timeline**: 2 weeks for MVP
**Estimated Cost**: $50-100 one-time + ~$10/month maintenance
**Expected Improvement**: 30-50% better user ratings vs algorithmic only
