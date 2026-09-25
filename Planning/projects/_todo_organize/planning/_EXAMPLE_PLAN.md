# Enhanced Lottie Naming Tool (Example Plan)

**Date Created:** 2025-10-18  
**Status:** 🟢 Complete  
**Priority:** High  
**Estimated Effort:** Medium

---

## ✅ Project Configuration

### Core Aspects

- [x] **Technology Stack Defined** - TypeScript, React, Material-UI, Lottie
- [x] **Testing Required** - Unit tests for new utilities, integration tests for UI
- [x] **Documentation Outputs** - Inline code comments, updated component docs
- [ ] **Visual Assets Needed** - No diagrams required
- [ ] **Design Phase Required** - No UI/UX changes needed
- [ ] **Architecture Phase Required** - No major architectural changes

### Key Technologies

**Primary Stack:**

- TypeScript (strict mode)
- React + Material-UI
- Lottie JSON format

**Supporting Tools:**

- AI response parsers (Claude/Gemini)
- Export utilities

### Documentation Plan

- [x] Inline code comments for new functions
- [x] Type documentation with JSDoc
- [ ] User-facing documentation
- [x] Planning document (this file)

### Design & Prototyping

**UI/UX Design Phase:**

- [ ] Mockups/wireframes required - _Not needed, minor UI additions_
- [x] Design system integration - _Using existing Material-UI components_
- [x] Accessibility considerations - _Using semantic HTML, ARIA labels_
- [ ] Responsive design requirements - _No responsive changes needed_

**Technical Architecture Phase:**

- [ ] Architecture diagrams - _No major changes to architecture_
- [ ] Data flow diagrams - _Existing flow remains same_
- [ ] Technical prototypes/spikes - _No experimentation needed_
- [x] Performance considerations - _Color extraction optimized_

---

## 📋 Goals

**Primary Goal:**
Update Lottie naming tool to support new AI prompt format with additional metadata fields and modernize export system.

**Success Criteria:**

- [x] All new fields properly typed and integrated
- [x] Export system produces correct formats with opacity
- [x] UI displays new metadata clearly
- [x] Zero TypeScript errors

**Key Metrics:**

- Type safety maintained (no `any` types added)
- Export format matches production AngelWingsHalo format
- All existing functionality preserved

---

## 🎯 High-Level Description

This plan updates the Lottie animation naming tool to support new fields from AI responses: `originalColor`, `roleFunction`, `visualLevel`, and `semanticRole`. The work also modernizes the export system by fixing color opacity extraction, creating AngelWingsHalo-compatible exports, and removing legacy code.

The implementation flows through the entire system: type definitions → response parser → tree application → exports → UI components. Each layer is updated to handle the new fields while maintaining backward compatibility for the core functionality.

---

## 📦 Epics & Features Overview

### Epic 1: Type System Updates

**Goal:** Define all new types and update existing interfaces  
**Features:**

- Feature 1.1: Add new type definitions for colors, roles, levels
- Feature 1.2: Update NameSuggestion interface
- Feature 1.3: Add helper functions for type checking

### Epic 2: Export System Modernization

**Goal:** Fix color extraction and create production-compatible exports
**Features:**

- Feature 2.1: Color extraction with opacity support
- Feature 2.2: AngelWingsHalo format export
- Feature 2.3: Remove legacy export functions

### Epic 3: UI Enhancements

**Goal:** Display new metadata in component tree  
**Features:**

- Feature 3.1: ColorBadge component for color display
- Feature 3.2: MetadataBadges for role/level display
- Feature 3.3: Update ComponentTree to show badges

---

## ❓ Questions & Answers

> **Note:** This section captures the conversation during planning.

### Initial User Request

**Original Input:**

```
Update the Lottie naming tool to support the new AI prompt format with these fields:
- originalColor
- roleFunction
- visualLevel
- semanticRole

Also fix the export system to include opacity in colors and match the AngelWingsHalo format.
```

**Key Points from User:**

- New AI response format has snake_case field names
- Need to derive `isThemeable` from `originalColor !== null`
- Export format must include alpha channel (#rrggbbaa)
- Remove backward compatibility code (no production usage yet)

### Planning Phase Questions

**Q:** Should we keep the old export functions for backward compatibility?  
**User Response:** "No, we don't need backward compatibility - remove the legacy code"  
**A:** Will remove `generateNameMappings()` and old `generateThemeTemplate()` completely  
**Impact:** Cleaner codebase, less confusion  
**Date:** 2025-10-18

**Q:** How should gradients be displayed in the UI?  
**User Response:** "Show a gradient badge with stop count, clickable for details"  
**A:** Created ColorBadge with dialog showing gradient preview and stop breakdown  
**Impact:** Better UX for gradient colors  
**Date:** 2025-10-18

### Clarifications & Refinements

**Iteration 1:**

- **User Feedback:** "Make sure colors include opacity - should be #rrggbbaa format"
- **Changes Made:** Updated `extractColorFromPath()` to include alpha channel
- **Date:** 2025-10-18

**Iteration 2:**

- **User Feedback:** "Export format should match AngelWingsHalo exactly"
- **Changes Made:** Rewrote `generateThemeTemplateFromTree()` with correct structure
- **Date:** 2025-10-18

---

## 🗺️ Implementation Roadmap

### Phase 1: Type Definitions & Parser

**Goal:** Update type system and AI response parsing  
**Duration:** ~1 hour  
**Dependencies:** None

**Tasks:**

- [x] **Task 1.1:** Add GradientColorStop, RoleFunction, VisualLevel, SemanticRole types → _Epic: Type System Updates, Feature: New type definitions_
- [x] **Task 1.2:** Update NameSuggestion interface with new fields → _Epic: Type System Updates, Feature: Update NameSuggestion interface_
- [x] **Task 1.3:** Add helper functions (hasThemeableColor, isGradientColor) → _Epic: Type System Updates, Feature: Helper functions_
- [x] **Task 1.4:** Update responseParser to map snake*case fields → \_Epic: Type System Updates* (infrastructure)

**Deliverables:**

- Updated `types/naming.ts`
- Updated `utils/ai/responseParser.ts`

---

### Phase 2: Export System Modernization

**Goal:** Fix color extraction and create production exports  
**Duration:** ~2 hours  
**Dependencies:** Phase 1 complete

**Tasks:**

- [x] **Task 2.1:** Fix color extraction to include alpha channel → _Epic: Export System, Feature: Color extraction with opacity_
- [x] **Task 2.2:** Implement gradient color parsing from flat array → _Epic: Export System, Feature: Color extraction with opacity_
- [x] **Task 2.3:** Create AngelWingsHalo-compatible export format → _Epic: Export System, Feature: AngelWingsHalo format_
- [x] **Task 2.4:** Remove generateNameMappings() and old generateThemeTemplate() → _Epic: Export System, Feature: Remove legacy functions_
- [x] **Task 2.5:** Add AI response export option → _Epic: Export System_ (infrastructure)

**Deliverables:**

- Updated `utils/exportUtils.ts`
- Updated `page.tsx` to pass AI response

---

### Phase 3: UI Components

**Goal:** Display new metadata in component tree  
**Duration:** ~2 hours  
**Dependencies:** Phase 1 complete

**Tasks:**

- [x] **Task 3.1:** Create ColorBadge component with gradient support → _Epic: UI Enhancements, Feature: ColorBadge component_
- [x] **Task 3.2:** Create gradient detail dialog → _Epic: UI Enhancements, Feature: ColorBadge component_
- [x] **Task 3.3:** Create MetadataBadges component → _Epic: UI Enhancements, Feature: MetadataBadges component_
- [x] **Task 3.4:** Update ComponentTree with two-row layout → _Epic: UI Enhancements, Feature: Update ComponentTree_
- [x] **Task 3.5:** Integrate badges into tree display → _Epic: UI Enhancements, Feature: Update ComponentTree_

**Deliverables:**

- `components/ColorBadge.tsx`
- `components/MetadataBadges.tsx`
- Updated `components/ComponentTree.tsx`

---

## ✅ Acceptance Criteria

### Overall Success Criteria

- [x] All TypeScript compiles without errors
- [x] New fields flow through entire system correctly
- [x] Export files match expected formats
- [x] UI displays all metadata clearly
- [x] No regression in existing functionality

### Definition of Done

- [x] Code changes implemented
- [x] Types properly defined
- [x] Zero TypeScript errors
- [x] UI components functional
- [x] Export formats validated
- [ ] Unit tests written (deferred)
- [ ] Integration tests passing (deferred)
- [x] Code reviewed
- [ ] Deployed to staging (N/A for local tool)

---

## 📋 Decision Log

| Date       | Decision                                  | Rationale                            | Alternatives            | Impact                |
| ---------- | ----------------------------------------- | ------------------------------------ | ----------------------- | --------------------- |
| 2025-10-18 | Remove backward compatibility code        | No production usage, user preference | Keep old functions      | Cleaner codebase      |
| 2025-10-18 | Derive `isThemeable` from `originalColor` | AI knows best what's themeable       | Use structural analysis | More accurate theming |
| 2025-10-18 | Use dialog for gradient details           | Better UX than inline display        | Inline color list       | Cleaner tree view     |
| 2025-10-18 | Match AngelWingsHalo format exactly       | Production compatibility             | Custom format           | Direct migration path |
| 2025-10-18 | Two-row layout in ComponentTree           | Separate content from metadata       | Single row              | More scannable        |

---

## 💡 Important Notes

### Critical Decisions

- ⚠️ `originalColor` field is source of truth for `isThemeable` - don't override with structural analysis
- ⚠️ Color format must include alpha: #rrggbbaa (8 characters)
- ⚠️ Gradient colors stored as flat array in Lottie JSON: [offset1, r1, g1, b1, offset2, r2, g2, b2, ...]

### Technical Constraints

- Must maintain compatibility with existing Lottie JSON structure
- AI responses use snake_case, internal code uses camelCase
- Material-UI v5 components and theming

### Performance Considerations

- Color extraction happens during export (not real-time)
- Tree traversal is recursive but manageable for typical animations
- Gradient parsing is O(n) on color array

---

## 📊 Progress Tracking

### Completed

- ✅ Type definitions
- ✅ Response parser updates
- ✅ Tree application logic
- ✅ Export utilities
- ✅ UI components
- ✅ Color extraction with opacity
- ✅ AngelWingsHalo export format
- ✅ Legacy code removal

### Remaining

- ⏳ Testing with real animations
- ⏳ User validation
- ⏳ Documentation updates (if needed)

---

## 📚 References

**Modified Files:**

- `packages/ui/src/app/lottie-naming/types/naming.ts`
- `packages/ui/src/app/lottie-naming/utils/ai/responseParser.ts`
- `packages/ui/src/app/lottie-naming/utils/componentWalker.ts`
- `packages/ui/src/app/lottie-naming/utils/exportUtils.ts`
- `packages/ui/src/app/lottie-naming/components/ColorBadge.tsx` (new)
- `packages/ui/src/app/lottie-naming/components/MetadataBadges.tsx` (new)
- `packages/ui/src/app/lottie-naming/components/ComponentTree.tsx`
- `packages/ui/src/app/lottie-naming/page.tsx`

**Related Documentation:**

- AngelWingsHalo Lottie tool (production reference)
- Lottie JSON format specification
- Material-UI documentation
