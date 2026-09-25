# 🎯 Lottie Naming System - Final Decisions

**Date:** October 11, 2025  
**Status:** ✅ Planning Complete - Ready to Build

---

## ✅ All Decisions Finalized

### 1. **Naming Pattern** ✅

```
[Purpose][Location][Detail]
```

**Examples:**

- `HaloContainer` (Layer)
- `LeftWingOuterFeather` (Layer)
- `HaloInnerGlow` (Fill)
- `HaloGradientGroup` (Shape Group)

**Approved:** Yes ✓

---

### 2. **Transform Groups** ✅

**Decision:** Rename if specific purpose, keep "Transform" if generic

**Rationale:**

- Transform names don't affect Lottie functionality
- Only `"ty": "tr"` property matters
- Safe to rename for better documentation

**Examples:**

```typescript
// Generic animation → Keep default
"Transform" ✅

// Specific animated behavior → Rename for clarity
"HaloRotationTransform" ✅
"WingFlutterTransform" ✅
```

**Approved:** Yes ✓

---

### 3. **Scope** ✅

**Decision:** Comprehensive - Name ALL 9 component levels

**Priority Order:**

1. **CRITICAL** (for theming): Fills, Strokes, Gradients, Layers
2. **HIGH** (for organization): Shape Groups, Shape Elements
3. **MEDIUM** (for completeness): Transforms (if specific), Masks, Assets
4. **LOW** (rare): Effects

**Rationale:**

- One-time comprehensive effort
- Creates reusable system
- Self-documenting JSON
- Benefits all future Lotties

**Approved:** Yes ✓

---

### 4. **Optimized JSON** ✅

**Decision:** Rename both Standard and Optimized versions

**Approach:**

- Use Standard as primary (better color fidelity)
- Apply same names to Optimized version
- Document any differences due to optimization
- Keep both versions in sync

**Approved:** Yes ✓

---

### 5. **Implementation Method** ✅

**Decision:** Web-Based Visual Tool (NOT VSCode Chat, NOT CLI Scripts)

**Why Web-Based Tool:**

- ✅ Visual: See animation while naming
- ✅ Interactive: Edit names inline with tree view
- ✅ Platform Independent: Runs in browser
- ✅ Team Friendly: Shareable, deployable
- ✅ Reusable: Works for any Lottie
- ✅ AI Powered: Claude API integration
- ✅ No VSCode Required: Universal access

**Tech Stack:**

- Next.js (apps/playground/src/app/lottie-naming-tool/)
- lottie-web (animation preview)
- Material-UI (UI components)
- Claude API (name generation)

**Approved:** Yes ✓

---

### 6. **AI Integration** ✅

**Decision:** Claude API with interactive UI

**Workflow:**

1. User uploads Lottie JSON
2. Tool displays animation + component tree
3. User clicks "Generate Names with AI"
4. Claude analyzes and suggests names
5. User reviews suggestions in UI
6. User accepts/edits/rejects each suggestion
7. Export updated JSON

**Approved:** Yes ✓

---

### 7. **Description Generation** ✅

**Decision:** Yes - AI generates description for each Lottie

**Format:**

```typescript
/**
 * Angel wings with themeable halo gradient. Wings stay white,
 * halo matches theme colors across all 8 theme variants.
 */
```

**Used In:**

- Component `.tsx` files
- Theme config documentation
- Tool export metadata

**Approved:** Yes ✓

---

## 📊 Summary

| Question         | Decision                            | Approved |
| ---------------- | ----------------------------------- | -------- |
| Naming Pattern   | `[Purpose][Location][Detail]`       | ✅       |
| Transform Groups | Rename if specific, keep if generic | ✅       |
| Scope            | Comprehensive (all 9 levels)        | ✅       |
| Optimized JSON   | Rename both versions                | ✅       |
| Method           | Web-based visual tool               | ✅       |
| AI Integration   | Claude API + interactive UI         | ✅       |
| Descriptions     | Yes, AI-generated                   | ✅       |

---

## 🚀 Next Phase: Implementation

### Sprint 1: MVP (Core Tool)

**Build:** Upload, preview, tree view, manual editing, export

**Files to Create:**

```
apps/playground/src/app/lottie-naming-tool/
├── page.tsx
├── components/
│   ├── FileUpload.tsx
│   ├── AnimationPreview.tsx
│   ├── ComponentTree.tsx
│   ├── ComponentEditor.tsx
│   └── ExportPanel.tsx
└── utils/
    ├── lottieParser.ts
    └── jsonExporter.ts
```

**Time:** 1-2 days

---

### Sprint 2: AI Integration

**Build:** Claude API integration, suggestion UI

**Files to Create:**

```
└── components/
    ├── AIGenerateButton.tsx
    ├── SuggestionReview.tsx
    └── utils/
        └── claudeClient.ts
```

**Time:** 1 day

---

### Sprint 3: Polish

**Build:** Validation, theme preview, batch processing

**Time:** 1 day

---

## 📖 Documentation Created

All planning docs saved in `docs/planning/lottie-naming/`:

1. ✅ **[README.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/README.md)** - Project overview
2. ✅ **[WEB_TOOL_PLAN.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/WEB_TOOL_PLAN.md)** - Complete web tool plan ⭐
3. ✅ **[NAMING_CONVENTIONS.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/NAMING_CONVENTIONS.md)** - Naming standards
4. ✅ **[DECISIONS.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/DECISIONS.md)** - This file

---

## ✅ Ready to Build!

**Primary Document:** [WEB_TOOL_PLAN.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/WEB_TOOL_PLAN.md)

**Contains:**

- Complete architecture
- UI mockups
- Implementation phases
- Code structure
- Feature list
- Success criteria

---

**All planning complete. Ready to start Sprint 1?** 🚀

**Command to create tool:**

```bash
# Create the tool structure
mkdir -p apps/playground/src/app/lottie-naming-tool/{components,utils,types}

# Start development
npm run dev
# Navigate to: http://localhost:3000/lottie-naming-tool
```

---

**Last Updated:** October 11, 2025
