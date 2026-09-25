# 🎉 Lottie Naming System - Planning Complete!

**Date:** October 11, 2025  
**Status:** ✅ All Planning Done - Ready for Implementation  
**Approach:** Web-Based Visual Tool

---

## 📋 Quick Summary

We're building a **web-based tool** to name Lottie animation components with AI assistance.

**Why:** Make theming Lotties easy by giving all components semantic names  
**How:** Interactive web app with visual preview + Claude AI suggestions  
**Where:** `apps/playground/src/app/lottie-naming-tool/`

---

## ✅ All Decisions Made

| Decision               | Choice                        | Reason                                 |
| ---------------------- | ----------------------------- | -------------------------------------- |
| **Method**             | Web-based tool                | Visual, reusable, team-friendly        |
| **Naming Pattern**     | `[Purpose][Location][Detail]` | Clear, semantic, themeable             |
| **Scope**              | All 9 component levels        | Comprehensive, one-time effort         |
| **Transform Groups**   | Rename if specific            | Safe, doesn't break Lottie             |
| **AI Integration**     | Claude API + UI               | Interactive suggestions + human review |
| **Descriptions**       | Yes, AI-generated             | For docs and component files           |
| **Both JSON versions** | Yes, keep in sync             | Standard + Optimized                   |

**No outstanding questions - everything is decided!** ✅

---

## 📖 Key Documents (Click to Open)

### Start Here 👇

1. **[WEB_TOOL_PLAN.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/WEB_TOOL_PLAN.md)** ⭐
   - Complete architecture
   - UI mockups
   - Implementation phases
   - **This is your build guide!**

### Reference

2. **[DECISIONS.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/DECISIONS.md)**
   - All 7 decisions with rationale
3. **[NAMING_CONVENTIONS.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/NAMING_CONVENTIONS.md)**
   - Naming patterns and examples
4. **[README.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/README.md)**
   - Project overview

---

## 🎨 What You're Building

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Lottie Naming Tool              [Upload JSON] [⚙️] ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ┌─────────────────┐  ┌───────────────────────────┐ ┃
┃ │ Preview         │  │ Component Tree            │ ┃
┃ │ [Animation]     │  │ 📁 AngelWingsHalo         │ ┃
┃ │                 │  │ ├─ 📄 HaloContainer ✓     │ ┃
┃ │                 │  │ │  ├─ 🎨 HaloInnerGlow ✓  │ ┃
┃ │                 │  │ │  ├─ 🎨 HaloMidTone ✓    │ ┃
┃ │                 │  │ │  └─ 🎨 HaloOuterGlow ✓  │ ┃
┃ │                 │  │ ├─ 📄 LeftWingOuter ✓     │ ┃
┃ └─────────────────┘  │ └─ ...                    │ ┃
┃                      └───────────────────────────┘ ┃
┃ [🤖 Generate Names with AI]                        ┃
┃ [✓ Validate] [💾 Export]                           ┃
┃ Status: ✅ 45/45 named (100%)                      ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Features:**

- ✅ Upload Lottie JSON
- ✅ Visual animation preview
- ✅ Interactive component tree
- ✅ AI name generation (Claude)
- ✅ Manual editing capability
- ✅ Real-time validation
- ✅ Export named JSON
- ✅ Description generation

---

## 🚀 Implementation Phases

### Sprint 1: MVP (1-2 days)

**Build core tool:**

- File upload
- Animation preview (lottie-web)
- Component tree view
- Manual name editing
- Export functionality

**Deliverable:** Working tool without AI

### Sprint 2: AI Integration (1 day)

**Add Claude API:**

- Generate button
- API client
- Suggestion UI
- Accept/reject/edit flow

**Deliverable:** AI-powered naming

### Sprint 3: Polish (1 day)

**Advanced features:**

- Validation indicators
- Theme mapping preview
- Batch processing
- Save/load drafts

**Deliverable:** Production-ready tool

---

## 💻 Tech Stack

```typescript
// All already in your monorepo!
Frontend: Next.js 14+
Location: apps/playground/src/app/lottie-naming-tool/
Lottie:   lottie-web (already installed)
UI:       Material-UI (already using)
AI:       Claude API (Anthropic SDK)
```

**Zero new dependencies needed!** ✅

---

## 📁 What Gets Created

```
apps/playground/src/app/lottie-naming-tool/
├── page.tsx                     # Main page
├── components/
│   ├── FileUpload.tsx
│   ├── AnimationPreview.tsx
│   ├── ComponentTree.tsx
│   ├── ComponentEditor.tsx
│   ├── AIGenerateButton.tsx
│   ├── ValidationPanel.tsx
│   └── ExportPanel.tsx
├── utils/
│   ├── lottieParser.ts          # Parse JSON
│   ├── componentWalker.ts       # Traverse tree
│   ├── claudeClient.ts          # AI integration
│   ├── nameValidator.ts         # Validation
│   └── jsonExporter.ts          # Export
└── types/
    └── naming.ts                # TypeScript types
```

---

## 🎯 Success Criteria

### Tool Works When:

- [ ] Can upload any Lottie JSON
- [ ] Animation plays correctly
- [ ] Component tree shows all levels
- [ ] Can edit names inline
- [ ] AI generates good suggestions
- [ ] Validation catches issues
- [ ] Export produces correct JSON

### AngelWingsHalo Complete When:

- [ ] All 11 layers named
- [ ] All 13 fills/strokes named
- [ ] All groups/shapes named
- [ ] Both standard + optimized done
- [ ] Validation 100% pass
- [ ] Description generated
- [ ] Ready for theme config

---

## 📊 What CLI Scripts Do We Keep?

**Keep these for automation:**

- `lottie:analyze` - Quick JSON analysis
- `lottie:validate` - Automated validation

**Don't need these (web tool replaces):**

- ~~`lottie:generate-names`~~ (web UI does this)
- ~~`lottie:apply-names`~~ (web UI does this)

---

## 🎓 How It Works (User Perspective)

1. **Open Tool** → `http://localhost:3000/lottie-naming-tool`
2. **Upload** → Drag/drop `AngelWingsHalo.json`
3. **Preview** → See animation playing
4. **Tree View** → Expand to see all components
5. **Click "Generate"** → AI suggests names for everything
6. **Review** → Accept/edit/reject each suggestion
7. **Validate** → Check for issues (visual indicators)
8. **Export** → Download named JSON
9. **Use** → Update theme config with new names

**Time:** ~15 minutes per Lottie (including review)

---

## 🔧 Setup Requirements

```bash
# 1. Environment variable
echo "CLAUDE_API_KEY=your_key" >> .env.local

# 2. Start dev server
npm run dev

# 3. Navigate to tool
open http://localhost:3000/lottie-naming-tool
```

That's it! No other setup needed.

---

## 💡 Key Advantages Over Alternatives

### vs. VSCode Chat

- ✅ More visual (see animation)
- ✅ Better UX (interactive tree)
- ✅ Team accessible (browser-based)

### vs. CLI Scripts

- ✅ Visual feedback
- ✅ Easier to use
- ✅ No command line required

### vs. Manual Naming

- ✅ AI assistance (faster)
- ✅ Validation (catch errors)
- ✅ Reusable (all future lotties)

---

## 📝 Example Output

**Before (generic):**

```json
{
  "nm": "Layer 1",
  "shapes": [
    {
      "nm": "Fill 1"
    }
  ]
}
```

**After (semantic):**

```json
{
  "nm": "HaloContainer",
  "shapes": [
    {
      "nm": "HaloInnerGlow"
    }
  ]
}
```

**Theme Config (uses names):**

```typescript
elementMappings: {
  "HaloInnerGlow": "primary.dark",  // ✅ Clear mapping
}
```

---

## 🎉 Ready to Build!

**Next Step:** Start Sprint 1

**Command:**

```bash
mkdir -p apps/playground/src/app/lottie-naming-tool/{components,utils,types}
```

**Reference:** [WEB_TOOL_PLAN.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/WEB_TOOL_PLAN.md)

---

## 📞 Questions? Check These:

- **Architecture?** → [WEB_TOOL_PLAN.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/WEB_TOOL_PLAN.md)
- **Decisions?** → [DECISIONS.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/DECISIONS.md)
- **Naming Rules?** → [NAMING_CONVENTIONS.md](file:///Users/mm/Projects/ExpanseFrontend/docs/planning/lottie-naming/NAMING_CONVENTIONS.md)

---

**Planning Complete - Let's Build! 🚀**

---

**Created:** October 11, 2025  
**Status:** ✅ Ready for Implementation  
**Estimated Time:** 3-4 days total
