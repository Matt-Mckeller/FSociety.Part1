# Lottie Naming System - Updated Plan (Web-Based Tool)

**Project Code:** `lottie-naming`  
**Status:** 🎯 Planning - Web App Approach  
**Started:** October 11, 2025  
**Current Animation:** AngelWingsHalo

---

## 🎯 Vision: Web-Based Lottie Naming Tool

Build a **visual, interactive web application** for naming Lottie animation components with AI assistance.

### Why Web-Based?

✅ **Visual & Interactive**

- See animation playing while naming
- Interactive component tree
- Edit names inline with immediate preview
- Compare before/after states

✅ **Platform Independent**

- Runs in browser (no VSCode required)
- Deploy internally or use locally
- Works on any platform (Mac, Windows, Linux)
- Shareable with team members

✅ **Reusable & Scalable**

- Process any Lottie animation
- Batch processing support
- Export/import name mappings
- Integrated validation

✅ **AI Powered**

- Claude API for intelligent suggestions
- Context-aware naming
- Human review and refinement
- Learn from previous naming patterns

---

## 🏗️ Architecture

### Tech Stack

```typescript
// Frontend Framework
Next.js 14+ (already in monorepo)
Location: apps/playground/src/app/lottie-naming-tool/

// Lottie Rendering
lottie-web (already installed)
React component wrapper

// UI Framework
Material-UI (already used)
Theme-aware components

// AI Integration
Claude API (Anthropic SDK)
Streaming responses for real-time feedback

// State Management
React hooks + Context
Local storage for drafts
```

### Application Structure

```
apps/playground/src/app/lottie-naming-tool/
├── page.tsx                          # Main tool page
├── components/
│   ├── FileUpload.tsx                # Upload Lottie JSON
│   ├── AnimationPreview.tsx          # Live Lottie preview
│   ├── ComponentTree.tsx             # Interactive tree view
│   ├── ComponentEditor.tsx           # Edit individual names
│   ├── AIGenerateButton.tsx          # Trigger AI naming
│   ├── ValidationPanel.tsx           # Show naming issues
│   └── ExportPanel.tsx               # Download results
├── utils/
│   ├── lottieParser.ts               # Parse JSON structure
│   ├── componentWalker.ts            # Traverse components
│   ├── claudeClient.ts               # Claude API integration
│   ├── nameValidator.ts              # Validation rules
│   └── jsonExporter.ts               # Export named JSON
└── types/
    └── naming.ts                     # TypeScript types
```

---

## 📊 Features & Workflow

### Phase 1: Core Tool (MVP)

#### 1. Upload & Preview

```typescript
// User uploads AngelWingsHalo.json
// App displays:
- ✅ Animation preview (playing)
- ✅ Component tree (expandable)
- ✅ Current names shown
```

#### 2. Component Tree View

```typescript
// Interactive tree showing all components
📁 AngelWingsHalo (Composition)
├─ 📄 Layer 1 → [Edit: "HaloContainer"]
│  ├─ 📁 Group 1 → [Edit: "HaloGradientGroup"]
│  │  ├─ 🎨 Fill 1 → [Edit: "HaloInnerGlow"]
│  │  ├─ 🎨 Fill 2 → [Edit: "HaloMidTone"]
│  │  └─ 🎨 Fill 3 → [Edit: "HaloOuterGlow"]
│  └─ 🔄 Transform → [Keep or Edit]
├─ 📄 Layer 2 → [Edit: "LeftWingOuterFeather"]
└─ ... (all 11 layers)

// Each item has:
- Current name display
- Edit button / inline editing
- Type indicator (layer, fill, shape, etc.)
- Themeable indicator (🎨 for fills/strokes)
```

#### 3. Manual Name Editing

```typescript
// Click any component to edit
- Inline text input
- Save/cancel buttons
- Validation feedback
- Convention hints
```

#### 4. Export Named JSON

```typescript
// Download updated Lottie JSON
- All approved names applied
- Original structure preserved
- Backup original included
```

---

### Phase 2: AI Integration

#### 5. AI Name Generation

```typescript
// "Generate Names with AI" button

Process:
1. User clicks button
2. Send component tree to Claude API
3. Claude analyzes structure + animation context
4. Returns semantic name suggestions
5. Display suggestions in UI with reasoning
6. User reviews and approves/edits/rejects
```

#### 6. AI Prompt Strategy

```typescript
const systemPrompt = `
You are an expert at naming Lottie animation components for theming.

Animation: AngelWingsHalo
Description: Angel wings with a gradient halo that needs theme customization

Components to name:
- 11 Layers (wings + halo)
- 15 Shape groups
- 13 Fills (some are gradient stops)
- 5 Strokes

Naming pattern: [Purpose][Location][Detail]
Examples:
- Layer: "HaloContainer", "LeftWingOuterFeather"
- Fill: "HaloInnerGlow", "WingFeatherFill"

Priority: Fills/Strokes (themeable) are CRITICAL
Secondary: Layers (for skip lists)

For each component, provide:
1. Suggested name
2. Brief reasoning
3. Themeable indicator
`;

// Claude returns structured JSON:
{
  "suggestions": [
    {
      "path": "layers[0]",
      "currentName": "Layer 1",
      "suggestedName": "HaloContainer",
      "reasoning": "Contains halo gradient elements",
      "isThemeable": false,
      "priority": "high"
    },
    // ... more suggestions
  ],
  "description": "Angel wings with themeable halo gradient..."
}
```

#### 7. Review & Refinement UI

```typescript
// Split-panel view
Left: Component tree with current names
Right: AI suggestions panel

For each suggestion:
[ ] Auto-approve all
[ ] Review individually

Component: layers[0]
Current:  "Layer 1"
Suggested: "HaloContainer" ✨
Reasoning: Contains halo gradient elements
Actions:  [✓ Accept] [✎ Edit] [✗ Reject]
```

---

### Phase 3: Advanced Features

#### 8. Validation & Quality Checks

```typescript
// Real-time validation as names are entered
✅ All themeable components named
✅ No generic names ("Fill 1", "Layer 2")
✅ Names follow convention pattern
⚠️ 2 transforms still named "Transform" (optional)
❌ 3 fills unnamed (critical)

// Visual indicators in tree
🟢 Named correctly
🟡 Named but could improve
🔴 Unnamed or generic
```

#### 9. Theme Mapping Preview

```typescript
// Show how names map to theme config
elementMappings: {
  "HaloInnerGlow": "primary.dark",    // ✅ Found
  "HaloMidTone": "primary.main",       // ✅ Found
  "HaloOuterGlow": "primary.light",    // ✅ Found
  "WingFill": ???                      // ⚠️ Not in JSON
}

skipElements: [
  "LeftWingOuterFeather",              // ✅ Found
  // ... all wing layers
]
```

#### 10. Batch Processing

```typescript
// Upload multiple Lotties
- Process sequentially
- Reuse naming patterns
- Export all at once
```

#### 11. Description Generation

```typescript
// AI generates 1-2 sentence description
"Angel wings with themeable halo gradient. Wings stay white,
halo matches theme colors across all 8 theme variants."

// Used in component file and documentation
```

---

## 🎨 UI Mockup (Text)

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Lottie Naming Tool                    [Upload JSON] [⚙️] ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                                           ┃
┃  ┌─────────────────────┐  ┌─────────────────────────┐   ┃
┃  │ Animation Preview   │  │ Component Tree          │   ┃
┃  │                     │  │                         │   ┃
┃  │   [Lottie playing]  │  │ 📁 AngelWingsHalo       │   ┃
┃  │                     │  │ ├─ 📄 HaloContainer ✓   │   ┃
┃  │   AngelWingsHalo    │  │ │  ├─ 📁 HaloGradient   │   ┃
┃  │   500x500px         │  │ │  │  ├─ 🎨 HaloInner.. │   ┃
┃  │   11 layers         │  │ │  │  ├─ 🎨 HaloMid... │   ┃
┃  │                     │  │ │  │  └─ 🎨 HaloOuter.. │   ┃
┃  └─────────────────────┘  │ ├─ 📄 LeftWingOuter ✓  │   ┃
┃                            │ ├─ 📄 LeftWingMid... ✓ │   ┃
┃  [🤖 Generate Names with AI]  │ └─ ... (7 more)    │   ┃
┃  [✓ Validate Names]       │                         │   ┃
┃  [💾 Export Named JSON]   └─────────────────────────┘   ┃
┃                                                           ┃
┃  Status: ✅ 45/45 components named (100%)                ┃
┃  Themeable: ✅ 13/13 named                               ┃
┃                                                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📋 Implementation Phases

### Sprint 1: MVP (Core Tool)

**Goal:** Basic upload, preview, tree view, manual editing, export

**Tasks:**

1. Create Next.js page at `/lottie-naming-tool`
2. Implement file upload component
3. Integrate lottie-web for preview
4. Build component tree parser
5. Create interactive tree UI
6. Implement manual name editing
7. Build JSON exporter
8. Basic validation

**Time Estimate:** 1-2 days

**Deliverable:** Working tool without AI

---

### Sprint 2: AI Integration

**Goal:** Claude API integration for name suggestions

**Tasks:**

1. Set up Claude API client
2. Design prompts for naming
3. Implement "Generate Names" feature
4. Build suggestion review UI
5. Add accept/reject/edit actions
6. Stream AI responses for UX
7. Handle API errors gracefully

**Time Estimate:** 1 day

**Deliverable:** AI-powered naming tool

---

### Sprint 3: Polish & Advanced Features

**Goal:** Validation, theme preview, batch processing

**Tasks:**

1. Advanced validation rules
2. Theme mapping preview
3. Batch processing support
4. Description generation
5. Export name mappings format
6. Save/load draft names
7. User preferences

**Time Estimate:** 1 day

**Deliverable:** Production-ready tool

---

## 🔧 Configuration & Setup

### Environment Variables

```bash
# .env.local
CLAUDE_API_KEY=your_api_key_here
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_MAX_TOKENS=4096
```

### Tool Access

```bash
# Development
npm run dev
# Navigate to: http://localhost:3000/lottie-naming-tool

# Production (optional)
# Deploy to internal subdomain: naming.expanse.services
```

---

## 📝 Naming Conventions (Enforced by Tool)

### Pattern

```
[Purpose][Location][Detail]
```

### Transform Groups Decision ✅

**Rename if specific purpose, keep "Transform" if generic**

```typescript
// Generic → Keep
"Transform" ✅

// Specific animated → Rename
"HaloRotationTransform" ✅
"WingFlutterTransform" ✅
```

**Note:** Transform names don't affect Lottie functionality (only `"ty": "tr"` matters)

### Scope: Comprehensive ✅

**Name ALL 9 component levels**

Priority order for theming:

1. **CRITICAL:** Fills, Strokes, Gradients
2. **HIGH:** Layers
3. **MEDIUM:** Shape Groups, Shape Elements
4. **LOW:** Transforms, Masks, Assets, Effects

---

## ✅ Success Criteria

### For Tool

- [ ] Upload any Lottie JSON
- [ ] Display animation preview
- [ ] Show complete component tree
- [ ] Edit names inline
- [ ] Generate names with AI
- [ ] Validate naming completeness
- [ ] Export named JSON
- [ ] Generate descriptions

### For AngelWingsHalo

- [ ] All 11 layers named
- [ ] All 13 fills/strokes named (themeable)
- [ ] All shape groups named
- [ ] No generic names remain
- [ ] Validation passes 100%
- [ ] Description generated
- [ ] Both standard + optimized versions named

---

## 🔗 Integration with Theming System

### Output Used By

1. **Theme Config** (`packages/dynamicAssets/lotties/config/`)

   - Use named fills/strokes in elementMappings
   - Use named layers in skipElements

2. **Component Files** (`.tsx`)

   - Add AI-generated description
   - Reference named elements

3. **Documentation**
   - Self-documenting JSON
   - Clear component structure

---

## 🚀 Getting Started (After Implementation)

```bash
# 1. Start dev server
npm run dev

# 2. Navigate to tool
open http://localhost:3000/lottie-naming-tool

# 3. Upload Lottie
Click "Upload JSON" → Select AngelWingsHalo.json

# 4. Generate names
Click "Generate Names with AI"
Review suggestions
Accept/Edit/Reject

# 5. Export
Click "Export Named JSON"
Save to animationData folder
```

---

## 📊 Comparison: Web Tool vs. CLI Scripts

| Aspect         | Web Tool ✅              | CLI Scripts       |
| -------------- | ------------------------ | ----------------- |
| Visual         | Animation preview + tree | Text only         |
| Platform       | Browser (any OS)         | Terminal required |
| AI Integration | Interactive suggestions  | Batch processing  |
| Ease of Use    | Intuitive UI             | Command line      |
| Team Friendly  | Shareable link           | Local only        |
| Reusability    | Built-in for any Lottie  | Requires setup    |

**Decision: Web Tool is superior for our use case** ✅

---

## 📝 Next Steps

1. ✅ **Approve this plan**
2. ⏳ **Sprint 1: Build MVP** (upload, tree, edit, export)
3. ⏳ **Sprint 2: Add AI** (Claude integration)
4. ⏳ **Sprint 3: Polish** (validation, theme preview)
5. ⏳ **Test with AngelWingsHalo**
6. ⏳ **Use for all future Lotties**

---

**Ready to build? Let's start with Sprint 1!** 🚀

---

**Last Updated:** October 11, 2025  
**Status:** Planning Complete - Ready for Implementation
