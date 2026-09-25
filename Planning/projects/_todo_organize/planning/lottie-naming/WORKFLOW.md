# Lottie Naming Workflow Guide

**Version:** 1.0  
**Last Updated:** October 10, 2025

---

## 🎯 Overview

This guide walks through the complete workflow for naming a Lottie animation using the AI-assisted naming system.

**Estimated Time:** 30-60 minutes per animation  
**Method:** AI-assisted (Claude API) with human review

---

## 📋 Prerequisites

### Required Tools

- Node.js 18+ and npm
- TypeScript
- Claude API key (for API method)
- VSCode (recommended)

### Environment Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env

# 3. Add Claude API key to .env
CLAUDE_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_MAX_TOKENS=4096
```

### File Requirements

- Lottie JSON file (e.g., `AngelWingsHalo.json`)
- Located in `packages/dynamicAssets/lotties/[AnimationName]/`

---

## 🔄 Complete Workflow

### Step 1: Analyze the Lottie JSON

**Purpose:** Extract all components and their context for naming

```bash
npm run lottie:analyze AngelWingsHalo
```

**What it does:**

- Walks the entire JSON tree
- Identifies all 9 component levels
- Extracts context (shape types, colors, hierarchy)
- Generates structured analysis report

**Output:**

```
scripts/lottie/naming/output/AngelWingsHalo-analysis.json
```

**Review the analysis:**

```bash
code scripts/lottie/naming/output/AngelWingsHalo-analysis.json
```

**Expected content:**

```json
{
  "animationId": "AngelWingsHalo",
  "summary": {
    "totalLayers": 11,
    "totalShapeGroups": 15,
    "totalFills": 13,
    "totalStrokes": 5,
    "totalGradients": 1,
    "unnamedComponents": 25
  },
  "components": [
    {
      "path": "layers[0]",
      "level": "Layer",
      "currentName": "Layer 1",
      "type": "shape",
      "context": {
        "containsShapes": ["Ellipse"],
        "hasFills": true,
        "hasGradients": true,
        "visualDescription": "Top layer with ellipse and gradient"
      }
    }
  ]
}
```

---

### Step 2: Generate Name Suggestions

**Purpose:** Use Claude AI to suggest semantic names for all components

#### Method A: Automated (API)

```bash
npm run lottie:generate-names AngelWingsHalo
```

**What it does:**

- Loads analysis report
- Sends to Claude API with naming instructions
- Receives semantic name suggestions
- Formats as name mappings JSON
- Saves for review

#### Method B: Manual (VSCode + Claude)

```bash
# Export analysis for manual processing
npm run lottie:export-analysis AngelWingsHalo

# This creates a formatted report for you to paste into Claude
# Follow the instructions in the output
```

**Output:**

```
scripts/lottie/naming/output/AngelWingsHalo-name-mappings.json
```

---

### Step 3: Review Name Suggestions

**Purpose:** Human review and approval of AI suggestions

```bash
# Open mappings file in VSCode
code scripts/lottie/naming/output/AngelWingsHalo-name-mappings.json
```

**Review checklist:**

- [ ] Names are semantic and descriptive
- [ ] Names follow conventions (see NAMING_CONVENTIONS.md)
- [ ] Themeable elements (fills/gradients) clearly named
- [ ] Location specified (Left/Right, Inner/Outer)
- [ ] No generic names ("Fill 1", "Layer 2")
- [ ] Names match theme mapping keys

**Edit mappings as needed:**

```json
{
  "mappings": [
    {
      "path": "layers[0]",
      "currentName": "Layer 1",
      "suggestedName": "HaloContainer",
      "approved": true, // ← Change to false if you want to skip
      "manualOverride": null // ← Add your own name here
    }
  ]
}
```

**Approval options:**

- `approved: true` - Use suggested name
- `approved: false` - Skip this component
- `manualOverride: "YourName"` - Use custom name instead

---

### Step 4: Apply Names to JSON

**Purpose:** Update the Lottie JSON with approved names

```bash
npm run lottie:apply-names AngelWingsHalo
```

**What it does:**

- Creates backup of original JSON
- Loads approved name mappings
- Applies names to JSON components
- Verifies JSON structure integrity
- Saves updated JSON

**Safety features:**

- ✅ Automatic backup created
- ✅ JSON validation before save
- ✅ Rollback on errors
- ✅ Dry-run mode available

**Dry-run (preview without changes):**

```bash
npm run lottie:apply-names AngelWingsHalo --dry-run
```

**Files created:**

```
packages/dynamicAssets/lotties/AngelWingsHalo/
├── AngelWingsHalo.json                 ← Updated with new names
└── AngelWingsHalo.json.backup          ← Original backup
```

---

### Step 5: Validate Naming Completeness

**Purpose:** Verify all components properly named

```bash
npm run lottie:validate AngelWingsHalo
```

**What it checks:**

- All layers have semantic names
- All fills/strokes/gradients named (themeable elements)
- No generic names remain ("Fill 1", "Shape 2")
- Names follow conventions
- Themeable elements match theme config

**Output:**

```
scripts/lottie/naming/output/AngelWingsHalo-validation-report.json
```

**Validation report format:**

```json
{
  "animationId": "AngelWingsHalo",
  "validatedAt": "2025-10-10T12:00:00Z",
  "status": "PASS",
  "summary": {
    "totalComponents": 45,
    "namedComponents": 45,
    "completionRate": 100,
    "themeableComponents": 13,
    "themeableNamed": 13
  },
  "issues": [],
  "recommendations": []
}
```

**View report:**

```bash
code scripts/lottie/naming/output/AngelWingsHalo-validation-report.json
```

---

### Step 6: Update Theme Configuration

**Purpose:** Use new names in theme mapping configuration

**Edit the theme config:**

```typescript
// packages/dynamicAssets/lotties/config/angelWingsHalo.config.ts

export const angelWingsHaloConfig: LottieThemeMapping = {
  animationId: "AngelWingsHalo",

  elementMappings: {
    // Use the new names from validation
    HaloInnerGlow: "primary.dark",
    HaloMidTone: "primary.main",
    HaloOuterGlow: "primary.light",
  },

  skipElements: [
    // Use the new wing layer names
    "LeftWingOuterFeather",
    "LeftWingMidOuterFeather",
    "LeftWingMidFeather",
    "LeftWingMidInnerFeather",
    "LeftWingInnerFeather",
    "RightWingInnerFeather",
    "RightWingMidInnerFeather",
    "RightWingMidFeather",
    "RightWingMidOuterFeather",
    "RightWingOuterFeather",
  ],
}
```

---

### Step 7: Test in Application

**Purpose:** Verify theming works with new names

```bash
# Start development server
npm run dev

# Navigate to demo page
open http://localhost:3000/demo
```

**Testing checklist:**

- [ ] Animation loads successfully
- [ ] Halo gradient themes correctly
- [ ] Wings stay white (skip list works)
- [ ] Theme switching works
- [ ] All 8 theme variants render properly
- [ ] No console errors

---

## 🔄 Iterative Refinement

If validation or testing reveals issues:

### Option 1: Refine Individual Names

```bash
# Edit name mappings
code scripts/lottie/naming/output/AngelWingsHalo-name-mappings.json

# Re-apply names
npm run lottie:apply-names AngelWingsHalo

# Re-validate
npm run lottie:validate AngelWingsHalo
```

### Option 2: Regenerate Names

```bash
# Re-run AI generation with updated context
npm run lottie:generate-names AngelWingsHalo --regenerate

# Review and approve
code scripts/lottie/naming/output/AngelWingsHalo-name-mappings.json

# Apply and validate
npm run lottie:apply-names AngelWingsHalo
npm run lottie:validate AngelWingsHalo
```

### Option 3: Rollback to Original

```bash
# Restore from backup
npm run lottie:restore-backup AngelWingsHalo
```

---

## 🎯 Success Criteria

Before considering naming complete:

- [ ] ✅ Analysis complete (no errors)
- [ ] ✅ Names generated and reviewed
- [ ] ✅ All approved names applied
- [ ] ✅ Validation passes (100% completion)
- [ ] ✅ Theme config updated
- [ ] ✅ Animation works in application
- [ ] ✅ All themes render correctly
- [ ] ✅ Documentation updated (if needed)

---

## 📊 Troubleshooting

### Issue: Analysis fails to parse JSON

**Solution:**

```bash
# Verify JSON is valid
npm run lottie:validate-json AngelWingsHalo

# Check for syntax errors
code packages/dynamicAssets/lotties/AngelWingsHalo/AngelWingsHalo.json
```

### Issue: Claude API errors

**Solution:**

```bash
# Check API key is set
echo $CLAUDE_API_KEY

# Check API rate limits
# Wait and retry, or use manual method
npm run lottie:export-analysis AngelWingsHalo
```

### Issue: Names not applying correctly

**Solution:**

```bash
# Run in dry-run mode to see what would change
npm run lottie:apply-names AngelWingsHalo --dry-run

# Check path matching in mappings
# Ensure paths match JSON structure
```

### Issue: Validation fails after application

**Solution:**

```bash
# Check validation report for specific issues
code scripts/lottie/naming/output/AngelWingsHalo-validation-report.json

# Address each issue
# Re-run validation
npm run lottie:validate AngelWingsHalo
```

### Issue: Theming doesn't work with new names

**Solution:**

```bash
# Verify theme config uses correct names
code packages/dynamicAssets/lotties/config/angelWingsHalo.config.ts

# Check browser console for errors
# Ensure element names match exactly (case-sensitive)
```

---

## 🔧 Advanced Options

### Custom Analysis Depth

```bash
# Analyze only specific levels
npm run lottie:analyze AngelWingsHalo --levels=2,5

# Analyze with verbose output
npm run lottie:analyze AngelWingsHalo --verbose
```

### Batch Processing (Future)

```bash
# Process multiple animations
npm run lottie:batch-analyze Animation1 Animation2 Animation3
```

### Export for Documentation

```bash
# Generate human-readable report
npm run lottie:export-report AngelWingsHalo --format=markdown
```

---

## 📚 Next Steps

After completing naming for one animation:

1. **Test Reusability**: Try on a second animation
2. **Refine System**: Update scripts based on learnings
3. **Document Patterns**: Add new examples to conventions
4. **Automate More**: Reduce manual steps where possible

---

## 📖 Related Documentation

- [PROJECT_PLAN.md](./PROJECT_PLAN.md) - Complete project plan
- [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) - Naming standards
- [Script README](../../../scripts/lottie/naming/README.md) - Script documentation
- [Component Reference](../lottie-theming-system/COMPONENT_REFERENCE.md) - Lottie component guide

---

**Last Updated:** October 10, 2025  
**Version:** 1.0
