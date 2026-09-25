# Lottie Naming Project

**Project Name:** Lottie Naming System  
**Project Code:** `lottie-naming`  
**Parent Project:** [Lottie Theming System](../lottie-theming-system/PROJECT_PLAN.md)  
**Status:** 🚧 Planning Phase  
**Started:** October 10, 2025

---

## 🎯 Project Goal

Create a reusable, AI-assisted system for comprehensively naming all components in Lottie JSON files. This system will work for AngelWingsHalo initially, then be reusable for all future Lottie animations.

---

## 📊 Scope

### Current Sprint: AngelWingsHalo

- **File**: `packages/dynamicAssets/lotties/AngelWingsHalo/AngelWingsHalo.json`
- **Target**: Name all 9 component levels with semantic, descriptive names
- **Method**: AI-assisted (Claude API) with human review

### Future Scope

- Reusable for all Lottie animations
- Importable plan for GitHub Copilot
- Scriptable execution (minimal human intervention)

---

## 🤖 AI Integration Decision

### ✅ Decision: **Claude API with Manual Review**

**Rationale:**

1. API allows full automation (reusable for all lotties)
2. Manual review step ensures quality
3. VSCode visualization available via file links
4. Build system to support both API and manual workflows

**Implementation:**

```typescript
// Config flag to choose method
const config = {
  aiMethod: "api" | "manual", // API or manual VSCode workflow
  apiKey: process.env.CLAUDE_API_KEY,
  model: "claude-sonnet-4-20250514",
}
```

---

## 📋 Component Levels to Name

Based on `scripts/lottie/README_MATT.MD`:

| Level                   | Has `nm` Field | Rename Priority | Example Names                       |
| ----------------------- | -------------- | --------------- | ----------------------------------- |
| 1. Composition          | ✅ Yes         | Medium          | `Main`, `AngelWingsAnimation`       |
| 2. Layer                | ✅ Yes         | **CRITICAL**    | `HaloContainer`, `LeftWingOuter`    |
| 3. Shape Group          | ✅ Yes         | **HIGH**        | `HaloGradientGroup`, `FeatherGroup` |
| 4. Shape Element        | ✅ Yes         | **HIGH**        | `HaloEllipse`, `WingPath`           |
| 5. Fill/Stroke/Gradient | ✅ Yes         | **CRITICAL**    | `HaloInnerGlow`, `WingFill`         |
| 6. Transform Groups     | ✅ Yes         | Low             | Usually keep `Transform`            |
| 7. Masks/Mattes         | ✅ Yes         | Medium          | `CircularReveal`, `EdgeMask`        |
| 8. Assets               | ✅ Yes/ID      | Medium          | `BackgroundTexture`, `LogoImage`    |
| 9. Effects              | ⚠️ Sometimes   | Low             | `GaussianBlur`, `SoftGlow`          |

**Focus Order:**

1. **Fills/Strokes/Gradients** (critical for theming)
2. **Layers** (needed for skip list)
3. **Shape Groups & Elements** (organizational clarity)
4. Everything else (completeness)

---

## 🏗️ System Architecture

### Phase 1: Analysis

**Script:** `scripts/lottie/naming/analyze.ts`

**Purpose:** Walk JSON tree and extract all components

**Output:** Structured report for AI analysis

### Phase 2: AI Name Generation

**Script:** `scripts/lottie/naming/generateNames.ts`

**Purpose:** Use Claude API to suggest semantic names

**Output:** Name mappings with suggestions

### Phase 3: Name Application

**Script:** `scripts/lottie/naming/applyNames.ts`

**Purpose:** Apply approved names to JSON

**Output:** Updated JSON with comprehensive names

### Phase 4: Validation

**Script:** `scripts/lottie/naming/validate.ts`

**Purpose:** Verify naming completeness

**Output:** Validation report

---

## 📁 File Structure

```
docs/planning/lottie-naming/
├── README.md (this file)
├── PROJECT_PLAN.md
├── NAMING_CONVENTIONS.md
└── WORKFLOW.md

scripts/lottie/naming/
├── README.md
├── analyze.ts
├── generateNames.ts
├── applyNames.ts
├── validate.ts
├── config.ts
└── utils/
    ├── jsonWalker.ts
    ├── componentIdentifier.ts
    ├── nameGenerator.ts
    └── claudeAPI.ts
```

---

## 🚀 Quick Start

### Web-Based Tool (Recommended)

```bash
# 1. Start development server
npm run dev

# 2. Navigate to tool
open http://localhost:3000/lottie-naming-tool

# 3. Upload Lottie JSON
# 4. Click "Generate Names with AI"
# 5. Review and approve suggestions
# 6. Export named JSON
```

### Alternative: CLI Scripts (Legacy)

```bash
# Analyze structure
npm run lottie:analyze AngelWingsHalo

# Generate names (requires manual setup)
npm run lottie:generate-names AngelWingsHalo

# Apply names
npm run lottie:apply-names AngelWingsHalo

# Validate
npm run lottie:validate AngelWingsHalo
```

**Note:** Web tool is preferred for visual workflow

---

## 📚 Documentation

- **[WEB_TOOL_PLAN.md](./WEB_TOOL_PLAN.md)** - Complete web tool plan ⭐ **START HERE**
- **[DECISIONS.md](./DECISIONS.md)** - All finalized decisions
- **[NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)** - Naming standards and patterns
- **[WORKFLOW.md](./WORKFLOW.md)** - Step-by-step workflow guide (CLI legacy)
- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Original project plan (CLI approach)
- [scripts/lottie/naming/README.md](../../../scripts/lottie/naming/README.md) - Script documentation (legacy)

---

**Last Updated:** October 10, 2025
