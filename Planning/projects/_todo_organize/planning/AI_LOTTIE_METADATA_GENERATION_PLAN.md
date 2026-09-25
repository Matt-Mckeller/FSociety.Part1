# AI Lottie Metadata Generation - Implementation Plan

**Date:** October 20, 2025  
**Status:** 📋 Planning Phase  
**Goal:** Automate UnifiedThemeSchema generation with AI-powered metadata

---

## 🎯 Project Goals

### Primary Objectives

1. **AI-Generated Metadata**: Use Claude 4.5 Sonnet to automatically generate:

   - Animation name alternatives
   - Animation descriptions
   - Purpose/use case categories
   - Tags and categorization

2. **Schema Export**: Export complete `UnifiedThemeSchema` TypeScript files from the LottieNamingTool

3. **Purpose Field Addition**: Add structured purpose metadata to UnifiedThemeSchema type definition

4. **Batch Processing**: Support analyzing and exporting multiple animations at once

5. **LangChain Integration**: Migrate AI interactions to use LangChain for better prompt management and chain composition

---

## 📐 Architecture Overview

### Data Flow

```
┌─────────────────┐
│ Upload Lottie   │
│ JSON File(s)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ LangChain Analysis Pipeline         │
│ ┌─────────────────────────────────┐ │
│ │ 1. Structure Analysis Chain     │ │
│ │    - Parse JSON structure       │ │
│ │    - Identify key elements      │ │
│ │    - Extract visual patterns    │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 2. Metadata Generation Chain    │ │
│ │    - Generate name options      │ │
│ │    - Create descriptions        │ │
│ │    - Suggest purpose categories │ │
│ │    - Generate tags              │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 3. Element Naming Chain         │ │
│ │    (existing functionality)     │ │
│ └─────────────────────────────────┘ │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌──────────────────────────────────────┐
│ Interactive Review UI                │
│ - Preview AI suggestions             │
│ - Edit/approve metadata              │
│ - Batch operations                   │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ Export UnifiedThemeSchema            │
│ - Generate .unified-schema.ts        │
│ - Generate component stub (optional) │
│ - Batch export support               │
└──────────────────────────────────────┘
```

---

## 📋 Type System Updates

### 1. Add Purpose Field to UnifiedThemeSchema

**Location:** `/packages/utility/lottieThemeTypes.ts`

```typescript
export interface UnifiedThemeSchema {
  /** Animation name this schema applies to */
  animationName: string

  /** Description of the animation and its themeable elements */
  description: string

  /** Animation-level metadata tags */
  tags: string[]

  /** NEW: Structured purpose and use case information */
  purpose: {
    /** Primary use case description */
    primary: string

    /** Categorized use cases with descriptions */
    categories: {
      [category: string]: string[]
    }

    /** Context where this animation is most effective */
    contexts?: string[]

    /** Recommended placement/timing */
    recommendations?: string[]
  }

  /** NEW: Alternative names suggested by AI */
  alternativeNames?: string[]

  /** Existing element definitions */
  elements: {
    // ... existing structure
  }

  /** Existing recommendations */
  recommendations: {
    // ... existing structure
  }
}
```

### 2. Purpose Categories Structure

```typescript
/**
 * Purpose categories for animation use cases
 * These align with the Expanse Education platform needs
 */
export const PURPOSE_CATEGORIES = {
  // User Feedback
  CELEBRATION: "celebration",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",

  // States
  LOADING: "loading",
  EMPTY_STATE: "empty-state",
  ONBOARDING: "onboarding",
  COMPLETION: "completion",

  // Engagement
  MOTIVATION: "motivation",
  REWARD: "reward",
  ACHIEVEMENT: "achievement",
  ENCOURAGEMENT: "encouragement",

  // Educational
  LEARNING: "learning",
  PRACTICE: "practice",
  ASSESSMENT: "assessment",
  PROGRESS: "progress",

  // Social
  SHARING: "sharing",
  COLLABORATION: "collaboration",
  COMMUNITY: "community",

  // Navigation
  TRANSITION: "transition",
  INTRODUCTION: "introduction",
  CONCLUSION: "conclusion",

  // Branding
  LOGO: "logo",
  BRAND: "brand",
  IDENTITY: "identity",

  // Decorative
  AMBIENT: "ambient",
  BACKGROUND: "background",
  ORNAMENTAL: "ornamental",
} as const

export type PurposeCategory =
  (typeof PURPOSE_CATEGORIES)[keyof typeof PURPOSE_CATEGORIES]

/**
 * Example purpose object for RandomDance animation
 */
export const EXAMPLE_PURPOSE = {
  primary: "Celebratory feedback for user achievements and milestones",
  categories: {
    celebration: [
      "Task completion celebrations",
      "Achievement unlocks",
      "Milestone reached moments",
    ],
    success: [
      "Successful quiz completion",
      "Assignment submitted successfully",
      "Perfect score feedback",
    ],
    motivation: [
      "Attendance streak rewards",
      "Learning goal achieved",
      "Progress milestone visual",
    ],
    reward: [
      "Points earned animation",
      "Badge unlock celebration",
      "Level up sequence",
    ],
  },
  contexts: ["educational", "gamification", "positive-reinforcement"],
  recommendations: [
    "Use after completing significant tasks",
    "Display for 2-3 seconds maximum",
    "Pair with sound effects for maximum impact",
    "Ensure animation is skippable for accessibility",
  ],
}
```

---

## 🤖 LangChain Integration

### Architecture

```typescript
/**
 * LangChain setup for Lottie metadata generation
 */

import { ChatAnthropic } from "@langchain/anthropic"
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "@langchain/core/prompts"
import { StructuredOutputParser } from "langchain/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"

// Initialize Claude 4.5 Sonnet
const model = new ChatAnthropic({
  modelName: "claude-3-5-sonnet-20241022",
  temperature: 0.7,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
})
```

### Chain 1: Animation Metadata Analysis

**Purpose:** Analyze Lottie JSON structure and generate high-level metadata

**Input:** Lottie JSON structure  
**Output:** Name suggestions, description, tags, purpose categories

```typescript
interface MetadataAnalysisInput {
  lottieJson: LottieData
  fileName: string
  existingLayers?: string[]
}

interface MetadataAnalysisOutput {
  suggestedNames: string[]
  description: string
  tags: string[]
  purpose: {
    primary: string
    categories: Record<string, string[]>
    contexts: string[]
    recommendations: string[]
  }
}

const metadataAnalysisChain = RunnableSequence.from([
  // System prompt
  ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`
You are an expert at analyzing Lottie animations and generating semantic metadata.

Your task is to analyze the structure, visual elements, and patterns in a Lottie JSON file and generate:
1. Alternative animation names (3-5 options)
2. A clear, concise description
3. Relevant tags for categorization
4. Purpose and use case information

Context: These animations will be used in an educational platform (Expanse Education) that focuses on:
- Student motivation and engagement
- Positive behavioral reinforcement (PBIS)
- Learning gamification
- Achievement celebration
- Progress visualization

Focus on practical use cases that would benefit students, teachers, and educational environments.
    `),
    HumanMessagePromptTemplate.fromTemplate(`
Analyze this Lottie animation:

File Name: {fileName}
Layer Names: {layerNames}
Color Palette: {colors}
Animation Type Indicators: {typeIndicators}

Structure Summary:
{structureSummary}

Generate metadata following this exact JSON format:
{{
  "suggestedNames": ["Name1", "Name2", "Name3"],
  "description": "A clear description of what this animation depicts and its visual characteristics",
  "tags": ["tag1", "tag2", "tag3"],
  "purpose": {{
    "primary": "Main use case description",
    "categories": {{
      "category-name": ["specific use case 1", "specific use case 2"],
      "another-category": ["use case 1", "use case 2"]
    }},
    "contexts": ["context1", "context2"],
    "recommendations": ["recommendation 1", "recommendation 2"]
  }}
}}

Available purpose categories: {availableCategories}
    `),
  ]),
  model,
  StructuredOutputParser.fromZodSchema(MetadataAnalysisOutputSchema),
])
```

### Chain 2: Component File Generation

**Purpose:** Generate complete React component file with typed props

**Input:** UnifiedThemeSchema + animation metadata  
**Output:** Complete `.tsx` component file

```typescript
interface ComponentGenerationInput {
  schema: UnifiedThemeSchema
  animationName: string
  exportOptions: {
    includeStorybook?: boolean
    includeTests?: boolean
    includeDocumentation?: boolean
  }
}

interface ComponentGenerationOutput {
  componentCode: string
  storyCode?: string
  testCode?: string
  readmeCode?: string
}

const componentGenerationChain = RunnableSequence.from([
  ChatPromptTemplate.fromMessages([
    SystemMessagePromptTemplate.fromTemplate(`
You are an expert React/TypeScript developer specializing in animation components.

Generate a complete, production-ready React component for a Lottie animation based on the provided schema.

Requirements:
- TypeScript with full type safety
- Use existing useThemedLottie hook
- Props for theme customization
- Accessibility attributes
- Performance optimization (memo, useMemo)
- Comprehensive JSDoc comments
- Follow project conventions from the example below

Example component structure:
{exampleComponent}
    `),
    HumanMessagePromptTemplate.fromTemplate(`
Generate a React component for this animation:

Schema: {schema}
Animation Name: {animationName}

Export Options:
{exportOptions}
    `),
  ]),
  model,
  StructuredOutputParser.fromZodSchema(ComponentGenerationOutputSchema),
])
```

### Chain 3: Batch Processing Chain

**Purpose:** Process multiple animations in parallel with progress tracking

```typescript
const batchProcessingChain = async (
  animations: Array<{ fileName: string; lottieJson: LottieData }>,
) => {
  const results = await Promise.allSettled(
    animations.map(async ({ fileName, lottieJson }) => {
      // Run metadata analysis
      const metadata = await metadataAnalysisChain.invoke({
        fileName,
        lottieJson,
        // ... other params
      })

      // Generate schema
      const schema = generateUnifiedThemeSchema(metadata, lottieJson)

      // Generate component
      const component = await componentGenerationChain.invoke({
        schema,
        animationName: metadata.suggestedNames[0],
        exportOptions: {
          /* ... */
        },
      })

      return { metadata, schema, component }
    }),
  )

  return results
}
```

---

## 🎨 UI/UX Updates

### New Features for LottieNamingTool

#### 1. Metadata Generation Panel

```
┌────────────────────────────────────────────────┐
│ 📝 Animation Metadata                          │
├────────────────────────────────────────────────┤
│                                                │
│ Current Name: RandomDance                      │
│ [🤖 Generate Metadata with AI]                 │
│                                                │
│ ┌─ Suggested Names ──────────────────────────┐ │
│ │ ○ JoyfulDanceAnimation                     │ │
│ │ ● CelebrationDance                 [Edit]  │ │
│ │ ○ FreeformDanceMotion                      │ │
│ │ ○ DynamicCelebration                       │ │
│ │ ○ EnthusiasticMovement                     │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ┌─ Description ───────────────────────────────┐ │
│ │ A playful and energetic animation          │ │
│ │ depicting spontaneous, celebratory dance   │ │
│ │ movements. Features dynamic, free-flowing  │ │
│ │ motion that conveys joy and enthusiasm.    │ │
│ │                                [Edit Text] │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ┌─ Purpose & Use Cases ──────────────────────┐ │
│ │ Primary: Celebration feedback for          │ │
│ │          achievements and milestones       │ │
│ │                                            │ │
│ │ Categories:                                │ │
│ │  ✓ celebration                             │ │
│ │    • Task completion celebrations          │ │
│ │    • Achievement unlocks                   │ │
│ │    • Milestone reached moments             │ │
│ │                                            │ │
│ │  ✓ success                                 │ │
│ │    • Successful quiz completion            │ │
│ │    • Assignment submitted                  │ │
│ │                                            │ │
│ │  ✓ motivation                              │ │
│ │    • Attendance streak rewards             │ │
│ │    • Learning goal achieved                │ │
│ │                          [Edit Categories] │ │
│ └────────────────────────────────────────────┘ │
│                                                │
│ ┌─ Tags ──────────────────────────────────────┐ │
│ │ celebration joy dance movement energy      │ │
│ │ success achievement gamification playful   │ │
│ │                                 [Edit Tags]│ │
│ └────────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

#### 2. Batch Processing Interface

```
┌────────────────────────────────────────────────┐
│ 📦 Batch Processing                            │
├────────────────────────────────────────────────┤
│                                                │
│ [Upload Multiple Files] or [Process Folder]   │
│                                                │
│ ┌──────────────────────────────────────────┐  │
│ │ Queue (5 animations)                     │  │
│ │                                          │  │
│ │ ✅ RandomDance.json        [View]       │  │
│ │ ⏳ RocketLaunch.json       Processing... │  │
│ │ ⏸️  AngelWings.json        Pending       │  │
│ │ ⏸️  Celebration.json       Pending       │  │
│ │ ⏸️  Success.json           Pending       │  │
│ └──────────────────────────────────────────┘  │
│                                                │
│ Progress: ████████░░░░░░░░ 40% (2/5)          │
│                                                │
│ [⏸️ Pause] [⏹️ Stop] [⚙️ Settings]             │
│                                                │
└────────────────────────────────────────────────┘
```

#### 3. Export Options Panel

```
┌────────────────────────────────────────────────┐
│ 💾 Export Options                              │
├────────────────────────────────────────────────┤
│                                                │
│ ☑ Generate .unified-schema.ts file             │
│ ☑ Generate React component (.tsx)              │
│ ☐ Generate Storybook story                     │
│ ☐ Generate unit tests                          │
│ ☐ Generate README.md                           │
│                                                │
│ Component Options:                             │
│   ☑ Include type definitions                   │
│   ☑ Include JSDoc comments                     │
│   ☑ Use memo optimization                      │
│   ☑ Include accessibility props                │
│                                                │
│ Export Location:                               │
│ packages/dynamicAssets/lotties/[AnimationName] │
│                                   [📁 Change]  │
│                                                │
│ [💾 Export] [💾 Export All]                    │
│                                                │
└────────────────────────────────────────────────┘
```

---

## 🔧 Implementation Phases

### Phase 1: Type System & Schema Updates (Day 1)

**Goal:** Update type definitions and schema structure

**Tasks:**

- [ ] Update `UnifiedThemeSchema` interface with `purpose` and `alternativeNames` fields
- [ ] Create `PURPOSE_CATEGORIES` constant and types
- [ ] Add Zod schemas for validation
- [ ] Update existing schema examples (AngelWingsHalo, RocketLaunch)
- [ ] Create migration guide for existing schemas

**Files to modify:**

- `/packages/utility/lottieThemeTypes.ts`
- `/packages/dynamicAssets/lotties/AngelWingsHalo/AngelWingsHalo.unified-schema.ts`
- `/packages/dynamicAssets/lotties/RocketLaunch/RocketLaunch.unified-schema.ts`

**Deliverables:**

- Updated type definitions
- Updated example schemas
- Documentation

---

### Phase 2: LangChain Integration (Day 2)

**Goal:** Set up LangChain and create AI analysis chains

**Tasks:**

- [ ] Install LangChain dependencies
  ```bash
  npm install @langchain/anthropic @langchain/core langchain zod
  ```
- [ ] Create LangChain configuration module
- [ ] Implement metadata analysis chain
- [ ] Implement component generation chain
- [ ] Create prompt templates
- [ ] Add response parsing and validation
- [ ] Create error handling and retry logic

**Files to create:**

- `/apps/playground/src/app/lottie-naming-tool/services/langchain/config.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/langchain/chains/metadataAnalysis.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/langchain/chains/componentGeneration.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/langchain/prompts/metadata.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/langchain/parsers/metadataParser.ts`

**Deliverables:**

- Working LangChain integration
- Metadata analysis chain
- Component generation chain
- Unit tests

---

### Phase 3: Metadata Generation UI (Day 3)

**Goal:** Build UI for AI metadata generation

**Tasks:**

- [ ] Create MetadataGenerationPanel component
- [ ] Add "Generate Metadata" button and loading states
- [ ] Display AI suggestions (names, description, purpose, tags)
- [ ] Add edit capabilities for each metadata field
- [ ] Create purpose category selector
- [ ] Add tag editor component
- [ ] Implement real-time validation
- [ ] Add streaming display for AI responses

**Files to create:**

- `/apps/playground/src/app/lottie-naming-tool/components/MetadataGenerationPanel.tsx`
- `/apps/playground/src/app/lottie-naming-tool/components/PurposeCategorySelector.tsx`
- `/apps/playground/src/app/lottie-naming-tool/components/TagEditor.tsx`
- `/apps/playground/src/app/lottie-naming-tool/components/NameSelector.tsx`

**Deliverables:**

- Complete metadata generation UI
- Interactive editing capabilities
- Real-time validation

---

### Phase 4: Export Functionality (Day 4)

**Goal:** Implement schema and component file export

**Tasks:**

- [ ] Create UnifiedThemeSchema generator
- [ ] Create React component template generator
- [ ] Implement file export utilities
- [ ] Add preview before export
- [ ] Create export options panel
- [ ] Add validation before export
- [ ] Implement batch export

**Files to create:**

- `/apps/playground/src/app/lottie-naming-tool/services/export/schemaGenerator.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/export/componentGenerator.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/export/fileExporter.ts`
- `/apps/playground/src/app/lottie-naming-tool/components/ExportOptionsPanel.tsx`

**Deliverables:**

- Working schema export
- Working component export
- Export preview
- Batch export support

---

### Phase 5: Batch Processing (Day 5)

**Goal:** Implement batch processing for multiple animations

**Tasks:**

- [ ] Create batch processing queue system
- [ ] Implement parallel processing with rate limiting
- [ ] Add progress tracking
- [ ] Create batch processing UI
- [ ] Add pause/resume functionality
- [ ] Implement error handling for batch operations
- [ ] Add batch export summary report

**Files to create:**

- `/apps/playground/src/app/lottie-naming-tool/services/batch/batchProcessor.ts`
- `/apps/playground/src/app/lottie-naming-tool/services/batch/queue.ts`
- `/apps/playground/src/app/lottie-naming-tool/components/BatchProcessingPanel.tsx`
- `/apps/playground/src/app/lottie-naming-tool/components/ProcessingQueue.tsx`

**Deliverables:**

- Working batch processing
- Queue management
- Progress tracking
- Batch summary reports

---

### Phase 6: Testing & Documentation (Day 6)

**Goal:** Comprehensive testing and documentation

**Tasks:**

- [ ] Write unit tests for all new services
- [ ] Write integration tests for AI chains
- [ ] Test export functionality with real animations
- [ ] Create user documentation
- [ ] Create API documentation
- [ ] Add examples and tutorials
- [ ] Performance testing
- [ ] Edge case testing

**Deliverables:**

- Test suite with >80% coverage
- User documentation
- API documentation
- Tutorial videos/guides

---

## 📁 File Structure

```
apps/playground/src/app/lottie-naming-tool/
├── components/
│   ├── MetadataGenerationPanel.tsx       # NEW: Main metadata UI
│   ├── PurposeCategorySelector.tsx       # NEW: Purpose category editor
│   ├── TagEditor.tsx                     # NEW: Tag management
│   ├── NameSelector.tsx                  # NEW: Name selection UI
│   ├── ExportOptionsPanel.tsx            # NEW: Export configuration
│   ├── BatchProcessingPanel.tsx          # NEW: Batch operations UI
│   ├── ProcessingQueue.tsx               # NEW: Queue display
│   └── ... (existing components)
│
├── services/
│   ├── langchain/                        # NEW: LangChain integration
│   │   ├── config.ts
│   │   ├── chains/
│   │   │   ├── metadataAnalysis.ts
│   │   │   └── componentGeneration.ts
│   │   ├── prompts/
│   │   │   ├── metadata.ts
│   │   │   └── component.ts
│   │   └── parsers/
│   │       ├── metadataParser.ts
│   │       └── componentParser.ts
│   │
│   ├── export/                           # NEW: Export services
│   │   ├── schemaGenerator.ts
│   │   ├── componentGenerator.ts
│   │   └── fileExporter.ts
│   │
│   └── batch/                            # NEW: Batch processing
│       ├── batchProcessor.ts
│       └── queue.ts
│
├── types/
│   ├── types.ts                          # UPDATED: Add metadata types
│   └── aiNaming.ts                       # UPDATED: Add LangChain types
│
└── utils/
    └── ... (existing utilities)

packages/utility/
└── lottieThemeTypes.ts                   # UPDATED: Add purpose field

packages/dynamicAssets/lotties/
├── RandomDance/                          # NEW: Generated from tool
│   ├── RandomDance.json
│   ├── RandomDance.unified-schema.ts     # Generated by tool
│   └── RandomDance.tsx                   # Generated by tool
└── ... (other animations)
```

---

## 🧪 Example Output

### Generated UnifiedThemeSchema for RandomDance

```typescript
import type { UnifiedThemeSchema } from "../../../utility/lottieThemeTypes"

export const RandomDanceSchema: UnifiedThemeSchema = {
  animationName: "CelebrationDance",

  alternativeNames: [
    "RandomDance",
    "JoyfulDanceAnimation",
    "FreeformDanceMotion",
    "DynamicCelebration",
    "EnthusiasticMovement",
  ],

  description:
    "A playful and energetic animation depicting spontaneous, celebratory dance movements. Features dynamic, free-flowing motion that conveys joy, celebration, and uninhibited expression. The animation loops seamlessly, creating a sense of continuous energy and enthusiasm.",

  tags: [
    "celebration",
    "joy",
    "dance",
    "movement",
    "energy",
    "success",
    "achievement",
    "gamification",
    "playful",
    "animation",
  ],

  purpose: {
    primary:
      "Celebratory feedback for user achievements and milestones in educational contexts",

    categories: {
      celebration: [
        "Task completion celebrations",
        "Achievement unlocks",
        "Milestone reached moments",
        "Perfect score celebrations",
      ],
      success: [
        "Successful quiz completion",
        "Assignment submitted successfully",
        "Test passed feedback",
        "Goal achieved notification",
      ],
      motivation: [
        "Attendance streak rewards",
        "Learning goal achieved",
        "Progress milestone visual",
        "Effort recognition",
      ],
      reward: [
        "Points earned animation",
        "Badge unlock celebration",
        "Level up sequence",
        "Bonus content unlocked",
      ],
      engagement: [
        "Break time indicator",
        "Transition between activities",
        "Positive reinforcement moment",
        "Student delight injection",
      ],
    },

    contexts: [
      "educational",
      "gamification",
      "positive-reinforcement",
      "student-engagement",
      "pbis-rewards",
    ],

    recommendations: [
      "Use after completing significant tasks or achievements",
      "Display for 2-3 seconds maximum to maintain pacing",
      "Pair with sound effects for maximum impact and accessibility",
      "Ensure animation is skippable for users who prefer reduced motion",
      "Consider size and placement to avoid overwhelming other UI elements",
      "Use sparingly to maintain special feeling and avoid animation fatigue",
    ],
  },

  elements: {
    // ... element definitions (generated by existing naming tool)
  },

  recommendations: {
    // ... AI recommendations (generated by existing tool)
  },
}
```

### Generated React Component

````typescript
/**
 * CelebrationDance - Lottie Animation Component
 *
 * A playful and energetic animation depicting spontaneous, celebratory dance
 * movements. Features dynamic, free-flowing motion that conveys joy, celebration,
 * and uninhibited expression.
 *
 * @purpose Celebratory feedback for user achievements and milestones
 * @tags celebration, joy, dance, success, achievement
 *
 * @example
 * ```tsx
 * <CelebrationDance
 *   variant="light"
 *   size="medium"
 *   onComplete={() => console.log('Dance complete!')}
 * />
 * ```
 */

import { memo, useMemo } from 'react'
import { useThemedLottie } from '../_useThemedLottie'
import { CelebrationDanceSchema } from './CelebrationDance.unified-schema'
import type { UseThemedLottieOptions } from '../_useThemedLottie'

export interface CelebrationDanceProps {
  /** Theme variant to apply */
  variant?: 'light' | 'dark' | 'accent'
  /** Animation size */
  size?: 'small' | 'medium' | 'large' | number
  /** Whether to loop the animation */
  loop?: boolean
  /** Whether to autoplay */
  autoplay?: boolean
  /** Callback when animation completes */
  onComplete?: () => void
  /** Accessibility label */
  ariaLabel?: string
  /** Additional CSS classes */
  className?: string
}

export const CelebrationDance = memo(function CelebrationDance({
  variant = 'light',
  size = 'medium',
  loop = true,
  autoplay = true,
  onComplete,
  ariaLabel = 'Celebration dance animation',
  className,
}: CelebrationDanceProps) {
  const options: UseThemedLottieOptions = useMemo(
    () => ({
      schema: CelebrationDanceSchema,
      variant,
      loop,
      autoplay,
      onComplete,
    }),
    [variant, loop, autoplay, onComplete]
  )

  const { containerProps, animationData } = useThemedLottie(options)

  const sizeValue = useMemo(() => {
    if (typeof size === 'number') return size
    const sizeMap = { small: 100, medium: 200, large: 400 }
    return sizeMap[size]
  }, [size])

  return (
    <div
      {...containerProps}
      className={className}
      style={{ width: sizeValue, height: sizeValue }}
      role="img"
      aria-label={ariaLabel}
    />
  )
})

CelebrationDance.displayName = 'CelebrationDance'
````

---

## 🔑 Environment Variables

Add to `.env.local`:

```bash
# Anthropic API for Claude 4.5 Sonnet
ANTHROPIC_API_KEY=your_api_key_here

# Optional: Rate limiting
LANGCHAIN_MAX_CONCURRENCY=3
LANGCHAIN_MAX_RETRIES=2
LANGCHAIN_TIMEOUT_MS=30000
```

---

## 📦 Dependencies to Install

```bash
# LangChain core
npm install @langchain/anthropic @langchain/core langchain

# Validation
npm install zod

# Utilities
npm install p-queue p-retry
```

---

## ✅ Success Criteria

1. **AI Generation Works**

   - [ ] Successfully generates metadata for uploaded animations
   - [ ] Provides 3-5 quality name suggestions
   - [ ] Generates accurate descriptions
   - [ ] Suggests relevant purpose categories
   - [ ] Creates appropriate tags

2. **Export Functionality**

   - [ ] Exports valid TypeScript files
   - [ ] Generated schemas pass type checking
   - [ ] Components compile without errors
   - [ ] Files are correctly formatted

3. **Batch Processing**

   - [ ] Processes multiple animations without errors
   - [ ] Handles failures gracefully
   - [ ] Provides accurate progress tracking
   - [ ] Completes within reasonable time

4. **User Experience**

   - [ ] Intuitive UI for metadata editing
   - [ ] Clear feedback on AI generation progress
   - [ ] Easy export process
   - [ ] Helpful error messages

5. **Code Quality**
   - [ ] > 80% test coverage
   - [ ] No TypeScript errors
   - [ ] Follows project conventions
   - [ ] Well documented

---

## 🚀 Next Steps After Implementation

1. **Generate schemas for all existing animations** (~50 animations)
2. **Create showcase page** demonstrating purpose-based animation search
3. **Build recommendation engine** suggesting animations based on use case
4. **Integrate with main app** for context-aware animation selection
5. **Add analytics** to track which animations are most effective

---

## 📚 References

- [LangChain TypeScript Docs](https://js.langchain.com/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Lottie JSON Structure](https://lottiefiles.github.io/lottie-docs/)
- [Your existing naming conventions](./lottie-naming/NAMING_CONVENTIONS.md)

---

**Ready to implement? Let's start with Phase 1!** 🎯
