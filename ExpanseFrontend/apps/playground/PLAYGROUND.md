# 🎮 Expanse Playground

> Testing ground for Lottie animation tools and components

## Quick Start

```bash
# From project root
npm run dev --workspace=playground

# Open http://localhost:3010
```

## Environment Variables

```bash
# Required for AI features
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...  # Claude API (naming, generator)
GOOGLE_GENERATIVE_AI_API_KEY=...          # Gemini API (vision-ai)
```

---

## Projects Overview

| Project                                   | Status        | Purpose                        |
| ----------------------------------------- | ------------- | ------------------------------ |
| [lottie-gallery](#lottie-gallery)         | ✅ Production | Browse/preview all animations  |
| [lottie-generator](#lottie-generator)     | ✅ Production | AI-generate Lotties from text  |
| [lottie-naming-tool](#lottie-naming-tool) | ✅ Production | AI semantic naming for theming |
| [lottie-theming](#lottie-theming)         | ✅ Production | Theme variants live preview    |
| [lottie-vision-ai](#lottie-vision-ai)     | 🔧 Scripts    | Batch vision AI analysis       |

---

## lottie-gallery

**Goal:** Browse, filter, and preview all Lottie animations with live theming.

**Features:**

- Visual grid of all animations
- Filter by category, sort options
- Toggle pending/approved animations
- Live theme color switching

**Key Files:**

- `page.tsx` - Main gallery page
- `hooks/useGalleryState.ts` - State management
- `components/AnimationGrid.tsx` - Grid display

---

## lottie-generator

**Goal:** Generate Lottie animations from text descriptions using Claude AI.

**Features:**

- Text-to-animation generation
- Semantic naming convention (`[Purpose][Location][Detail]`)
- Live preview with playback controls
- Download/save to filesystem

**Docs:** See [README.md](src/app/lottie-generator/README.md) and [QUICK_START.md](src/app/lottie-generator/QUICK_START.md)

---

## lottie-naming-tool

**Goal:** Transform generic layer names into semantic names for theming.

**Features:**

- AI-powered naming via Claude 3.5 Sonnet
- Vision mode for complex animations
- Element tree visualization
- Export JSON + theme templates

**Output Schema:** `ExpanseLottieSchema` from `expanse.dynamicAssets`

**Business Context:** Foundation for automation, potential marketplace, component sales.

**Docs:** See [README.md](src/app/lottie-naming-tool/README.md)

---

## lottie-theming

**Goal:** Demonstrate theme registry system with live previews.

**Features:**

- Theme variant switching (color + light/dark mode)
- Shareable links via URL query params
- Uses `LottieThemingDemo` from `expanse.dynamicAssets`

**Key Files:**

- `page.tsx` - Demo page with theme controls
- `components/ThemeControls.tsx` - Theme selector UI
- `components/AnimationPreview.tsx` - Preview wrapper

---

## lottie-vision-ai

**Goal:** Batch analyze Lottie files using Gemini vision AI.

**Features:**

- Generate `ExpanseLottieSchema` for each animation
- Export analysis results to filesystem
- CLI-based (not browser UI)

**Key Files:**

- `batch-lotties.ts` - Batch processing script
- `runtime/analyzeLotties.ts` - Analysis logic
- `gemini/client.ts` - Gemini API client

**Usage:**

```bash
npx ts-node src/app/lottie-vision-ai/batch-lotties.ts
```

---

## API Endpoints

| Endpoint                 | Purpose                         |
| ------------------------ | ------------------------------- |
| `/api/lottie-generator/` | Claude streaming for generation |
| `/api/lottie-naming/`    | Naming analysis endpoint        |
| `/api/ai-vision/`        | Vision analysis endpoint        |
| `/api/logs/`             | Session logging                 |
| `/api/lotties/`          | Lottie file operations          |

---

## Core Schema

All tools produce/consume `ExpanseLottieSchema`:

```typescript
interface ExpanseLottieSchema extends ExpanseLottieMetadata {
  animationName: string
  description: string
  tags: string[]
  elements: {
    [elementName: string]: ExpanseLottieElementDetails
  }
  recommendations: {
    /* AI suggestions */
  }
}
```

See full types: `packages/dynamicAssets/types/ExpanseLottie.ts`

---

## Related Packages

- `expanse.dynamicAssets` - Lottie components & theming
- `expanse.staticAssets` - Static asset management
