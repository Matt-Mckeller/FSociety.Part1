# Lottie Naming System - Project Plan

**Project Code:** `lottie-naming`  
**Status:** 🚧 Phase 1 - Setup  
**Started:** October 10, 2025  
**Current Animation:** AngelWingsHalo

---

## 🎯 Project Objectives

1. ✅ Create reusable naming system for Lottie animations
2. ✅ Use AI (Claude) to generate semantic names
3. ✅ Name ALL 9 component levels comprehensively
4. ✅ Make system scriptable and repeatable
5. ✅ Support both API and manual workflows

---

## 📊 Progress Tracker

### Phase 1: Setup & Infrastructure ⏳ CURRENT

- [ ] **Task 1.1**: Create project documentation
  - Status: 🔄 In Progress
- [ ] **Task 1.2**: Create script folder structure

  - `scripts/lottie/naming/`
  - Status: ⏳ Next

- [ ] **Task 1.3**: Implement configuration system

  - Support API and manual modes
  - Environment variables for API key
  - Status: ⏳ Pending

- [ ] **Task 1.4**: Set up npm scripts
  - `lottie:analyze`
  - `lottie:generate-names`
  - `lottie:apply-names`
  - `lottie:validate`
  - Status: ⏳ Pending

### Phase 2: Analysis System 🔄

- [ ] **Task 2.1**: Implement JSON walker utility

  - Recursively traverse Lottie JSON
  - Identify all component types
  - Status: ⏳ Pending

- [ ] **Task 2.2**: Implement component identifier

  - Classify component levels (1-9)
  - Extract context for naming
  - Status: ⏳ Pending

- [ ] **Task 2.3**: Create analysis script

  - Generate structured component report
  - Export for AI analysis
  - Status: ⏳ Pending

- [ ] **Task 2.4**: Test analysis on AngelWingsHalo
  - Verify all components found
  - Check context extraction
  - Status: ⏳ Pending

### Phase 3: AI Name Generation 🔄

- [ ] **Task 3.1**: Implement Claude API client

  - Authentication
  - Request formatting
  - Response parsing
  - Status: ⏳ Pending

- [ ] **Task 3.2**: Create name generation prompts

  - System prompt for naming task
  - Component-specific context
  - Naming convention rules
  - Status: ⏳ Pending

- [ ] **Task 3.3**: Implement name generator

  - Send analysis to Claude
  - Receive name suggestions
  - Format as mappings JSON
  - Status: ⏳ Pending

- [ ] **Task 3.4**: Add manual workflow support

  - Export analysis report
  - Import name mappings
  - Status: ⏳ Pending

- [ ] **Task 3.5**: Test generation on AngelWingsHalo
  - Generate names via API
  - Review quality
  - Status: ⏳ Pending

### Phase 4: Name Application 🔄

- [ ] **Task 4.1**: Implement name applier

  - Load name mappings
  - Create JSON backup
  - Apply names to components
  - Status: ⏳ Pending

- [ ] **Task 4.2**: Add safety checks

  - Verify JSON structure after changes
  - Rollback on errors
  - Status: ⏳ Pending

- [ ] **Task 4.3**: Test application on AngelWingsHalo
  - Apply generated names
  - Verify JSON integrity
  - Status: ⏳ Pending

### Phase 5: Validation System 🔄

- [ ] **Task 5.1**: Implement validator

  - Check naming completeness
  - Identify remaining generic names
  - Verify themeable elements named
  - Status: ⏳ Pending

- [ ] **Task 5.2**: Generate validation report

  - Summary statistics
  - Remaining issues
  - Quality metrics
  - Status: ⏳ Pending

- [ ] **Task 5.3**: Test validation on AngelWingsHalo
  - Run full validation
  - Document any gaps
  - Status: ⏳ Pending

### Phase 6: Documentation & Refinement 🔄

- [ ] **Task 6.1**: Document workflow

  - Step-by-step guide
  - Screenshots/examples
  - Status: ⏳ Pending

- [ ] **Task 6.2**: Create naming conventions guide

  - Pattern standards
  - Examples by component type
  - Status: ⏳ Pending

- [ ] **Task 6.3**: Test on second animation
  - Validate reusability
  - Refine as needed
  - Status: ⏳ Future

---

## 🎨 Naming Convention Standards

### Pattern: `[ComponentType][Location][Purpose][Detail]`

### Examples by Level

#### Level 2: Layers

```
✅ HaloContainer
✅ LeftWingOuterFeather
✅ RightWingInnerFeather
❌ Layer 1
❌ Shape Layer 2
```

#### Level 3: Shape Groups

```
✅ HaloGradientGroup
✅ FeatherOutlineGroup
✅ InnerGlowGroup
❌ Group 1
❌ Shape Group
```

#### Level 4: Shape Elements

```
✅ HaloEllipse
✅ WingFeatherPath
✅ OuterRingCircle
❌ Ellipse 1
❌ Path
```

#### Level 5: Fills/Strokes/Gradients (CRITICAL)

```
✅ HaloInnerGlow
✅ HaloMidTone
✅ HaloOuterGlow
✅ WingFeatherFill
✅ OutlineStroke
❌ Fill 1
❌ Gradient Fill
```

### Naming Rules

1. **Be Specific**: Describe purpose, not just type
2. **Use Location**: Left/Right, Inner/Outer, Top/Bottom
3. **Indicate Hierarchy**: Parent context in name
4. **Themeable First**: Prioritize fills/strokes/gradients
5. **Consistent Pattern**: Follow established conventions
6. **No Numbers**: Avoid "Fill 1", "Layer 2" unless truly sequential

---

## 🤖 Claude API Integration

### Configuration

```typescript
// .env file
CLAUDE_API_KEY = your_api_key_here
CLAUDE_MODEL = claude - sonnet - 4 - 20250514
CLAUDE_MAX_TOKENS = 4096
```

### API Workflow

1. **Analysis** → Generate component report
2. **Send to Claude** → Request semantic names
3. **Receive Suggestions** → Parse into mappings
4. **Human Review** → Approve/edit suggestions
5. **Apply Names** → Update JSON with approved names

### Prompt Strategy

```typescript
const systemPrompt = `You are an expert at naming Lottie animation components.
Given a structured report of Lottie JSON components, suggest semantic, 
descriptive names following these conventions:

Pattern: [ComponentType][Location][Purpose][Detail]

Examples:
- Layer: "HaloContainer", "LeftWingOuterFeather"
- Fill: "HaloInnerGlow", "WingFeatherFill"
- Shape: "HaloEllipse", "FeatherPath"

Rules:
1. Be specific about purpose
2. Include location (Left/Right, Inner/Outer)
3. Prioritize fills/strokes/gradients (themeable)
4. No generic names like "Fill 1" or "Layer 2"
5. Consider animation context (angel wings with halo)`
```

---

## 📁 Output Files

### Analysis Output

```
scripts/lottie/naming/output/
└── AngelWingsHalo-analysis.json
```

### Name Mappings

```
scripts/lottie/naming/output/
└── AngelWingsHalo-name-mappings.json
```

Format:

```json
{
  "animationId": "AngelWingsHalo",
  "version": "1.0.0",
  "generatedAt": "2025-10-10T12:00:00Z",
  "mappings": [
    {
      "path": "layers[0]",
      "level": "Layer",
      "currentName": "Layer 1",
      "suggestedName": "HaloContainer",
      "approved": true,
      "reasoning": "Contains halo gradient elements"
    }
  ]
}
```

### Validation Report

```
scripts/lottie/naming/output/
└── AngelWingsHalo-validation-report.json
```

---

## 🚀 Execution Plan

### Sprint 1: Infrastructure (Current)

**Duration:** 1 session  
**Goal:** Set up project structure and scripts

**Tasks:**

1. Create all documentation files
2. Set up `scripts/lottie/naming/` folder
3. Implement configuration system
4. Add npm scripts to package.json

**Deliverables:**

- Complete project structure
- Configuration files
- Empty script templates

### Sprint 2: Analysis System

**Duration:** 1-2 sessions  
**Goal:** Build component analysis system

**Tasks:**

1. Implement JSON walker
2. Implement component identifier
3. Create analysis script
4. Test on AngelWingsHalo

**Deliverables:**

- Working analysis script
- AngelWingsHalo analysis report

### Sprint 3: AI Integration

**Duration:** 1-2 sessions  
**Goal:** Implement Claude API name generation

**Tasks:**

1. Claude API client
2. Prompt engineering
3. Name generator script
4. Test on AngelWingsHalo

**Deliverables:**

- Working name generation
- Generated name mappings for AngelWingsHalo

### Sprint 4: Application & Validation

**Duration:** 1 session  
**Goal:** Apply names and validate results

**Tasks:**

1. Implement name applier
2. Implement validator
3. Apply to AngelWingsHalo
4. Generate validation report

**Deliverables:**

- Fully named AngelWingsHalo.json
- Validation report
- Updated theme configuration

### Sprint 5: Documentation & Polish

**Duration:** 1 session  
**Goal:** Complete documentation and test reusability

**Tasks:**

1. Write comprehensive workflow guide
2. Document lessons learned
3. Test on second animation (if available)
4. Refine system based on learnings

**Deliverables:**

- Complete documentation
- Reusable naming system
- Ready for future animations

---

## 📊 Success Criteria

### For AngelWingsHalo

- [ ] All 11 layers have semantic names
- [ ] All shape groups named
- [ ] All fills/strokes/gradients named (themeable elements)
- [ ] No generic names remain ("Fill 1", "Layer 2")
- [ ] Names match theme mapping keys
- [ ] JSON structure intact after naming
- [ ] Validation report shows 100% completion

### For System

- [ ] Reusable for any Lottie animation
- [ ] Scriptable end-to-end
- [ ] Both API and manual workflows supported
- [ ] Documentation complete
- [ ] Tested on at least 2 animations

---

## 🔗 Related Projects

- **Parent:** [Lottie Theming System](../lottie-theming-system/PROJECT_PLAN.md)
- **Depends On:** This naming system feeds into theming system
- **Used By:** All future Lottie animations

---

## 📝 Decision Log

### Decision 1: API vs Manual Workflow

**Date:** October 10, 2025  
**Decision:** Implement both, default to API  
**Rationale:** API is more scalable, but manual provides flexibility

### Decision 2: Comprehensive vs Partial Naming

**Date:** October 10, 2025  
**Decision:** Comprehensive (all 9 levels)  
**Rationale:** Creates reusable system, better for future animations

### Decision 3: Transform Group Naming

**Date:** October 10, 2025  
**Decision:** Keep as "Transform" unless special purpose  
**Rationale:** Standard convention, rarely needs theming

---

**Last Updated:** October 10, 2025  
**Next Review:** After Sprint 1 completion
