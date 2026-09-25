# Plan: Navigation Enhancements & Concepts Section

## Overview

This plan outlines three major changes to the presentationApp documentation wiki:

1. **Drawer-based panels** for quests and similar features
2. **Move Decorative & Theming** into Design & Mockups category
3. **New Concepts section** for high-level system understanding

---

## 1. Drawer-Based Side Panels for Exploration

### Concept
Add right-side sliding drawers for interactive exploration of features like Quests, Chat, Notes, etc. This mirrors the actual application's panel system and allows users to see features "in context."

### Implementation

**Files to modify:**
- `src/app/docs/layout.tsx` - Add drawer state and drawer components

**Drawer types to implement:**
1. **Quest Panel Drawer** - Shows quest list, progress, rewards
2. **Chat Panel Drawer** - Shows chat interface mockup
3. **Notes Panel Drawer** - Shows notes interface mockup
4. **Inventory Drawer** - Shows user inventory/unlockables

**UI Pattern:**
```tsx
// Right-side drawer triggered by icon buttons in the main content
<Drawer anchor="right" open={activeDrawer === 'quests'} onClose={() => setActiveDrawer(null)}>
  <QuestPanelPreview />
</Drawer>
```

**Navigation Integration:**
- Add "Open Panel" buttons within relevant feature pages
- Add floating action buttons (FAB) in the layout for quick drawer access
- Store drawer state in URL params for shareability

### Tasks
- [ ] Add drawer state management to layout.tsx
- [ ] Create drawer wrapper component with common styling
- [ ] Create QuestDrawer component with mock quest data
- [ ] Create placeholder drawers for Chat, Notes, Inventory
- [ ] Add "View Panel" buttons to relevant feature pages
- [ ] Add optional FAB menu for quick drawer access

---

## 2. Move Decorative & Theming to Design & Mockups

### Rationale
Decorative elements (characters, transitions, branding) and theming (colors, themes) are design-focused rather than feature-focused. They belong in the Design & Mockups section.

### Files to Modify

**Navigation update:**
- `src/app/docs/layout.tsx` - Move items from Features to Design & Mockups children

**File moves:**
```
features/decorative/page.tsx → design-mockups/decorative/page.tsx
features/theming/page.tsx → design-mockups/theming/page.tsx
```

**Files to update:**
- `src/app/docs/features/page.tsx` - Remove decorative and theming cards
- `src/app/docs/design-mockups/page.tsx` - Add decorative and theming sections

### Additional Design-Related Items to Consider Moving

After searching, these already exist in design-mockups or are feature-specific:
- Layout system ✓ (already in design-mockups)
- UI regions ✓ (already in design-mockups)

**Potentially add to Design & Mockups:**
- Color palette documentation
- Typography standards
- Spacing/grid system
- Component style guide
- Animation specifications

### Tasks
- [ ] Create design-mockups/decorative directory and move page
- [ ] Create design-mockups/theming directory and move page
- [ ] Update layout.tsx navigation to reflect new structure
- [ ] Update features/page.tsx to remove moved items
- [ ] Update design-mockups/page.tsx to include new sections
- [ ] Add design system sub-sections (colors, typography, spacing)
- [ ] Update any cross-links in other pages

---

## 3. Concepts Section - High-Level System Understanding

### Purpose
Create a dedicated section for understanding core systems at a conceptual level, separate from feature implementation details.

### Key Concepts to Document

| Concept | Description | Related Features |
|---------|-------------|------------------|
| Currency System | Coins earned and spent, economy design | Quests, Unlockables, Game UI |
| Experience (XP) System | Points, levels, progression curves | Quests, Game UI, Unlockables |
| Quest System | Objectives, tracking, rewards | Quests, Panel System |
| Level/Progression | User levels, what unlocks when | Unlockables, Game UI |
| Action Economy | Cooldowns, resource costs | Action Bars, AI Actions |
| Feedback Loop | User actions → system responses | Feedback, All features |
| Learning Modes | Different learning style approaches | AI Actions, Learning |
| Collaboration Model | Presenter/audience relationships | Collaboration, Chat |

### Sync Strategy

**Option A: Single Source of Truth (Recommended)**
- Concepts page contains the authoritative high-level overview
- Feature pages link TO concepts for system understanding
- Feature pages contain implementation details only
- Pros: Clear ownership, no duplication, easy to maintain
- Cons: Users must navigate between pages

**Option B: Shared React Components**
- Create reusable "concept cards" that render the same content
- Both concepts page and feature pages import the same component
- Pros: Guaranteed consistency
- Cons: More complex, changes require understanding component structure

**Option C: Concepts as Slide Presentations**
- Concepts ARE the actual presentation content
- Documentation references live presentation slides
- Pros: Direct connection to actual product content
- Cons: Requires presentation infrastructure to be built first

**Option D: Generated Content**
- Single markdown/JSON source files for each concept
- Build script generates pages for both locations
- Pros: True single source, flexible output
- Cons: Build complexity, harder to edit inline

### Recommended Approach: Option A with Concept Cards

1. **Concepts Section** - Full explanations with diagrams, data models, examples
2. **Feature Pages** - Link to concepts with "Learn more about [concept]"
3. **Shared Concept Cards** - Reusable summary components that can be embedded

**Example Concept Card:**
```tsx
<ConceptCard 
  concept="currency"
  variant="summary" // or "full" for concepts page
/>
```

### File Structure
```
docs/
  concepts/
    page.tsx                 // Concepts index with all concept cards
    currency/page.tsx        // Deep dive on currency
    experience/page.tsx      // Deep dive on XP/levels
    quests/page.tsx          // Deep dive on quest system
    progression/page.tsx     // Deep dive on user progression
    learning-modes/page.tsx  // Deep dive on learning approaches
    collaboration/page.tsx   // Deep dive on presenter/audience model
```

### Tasks
- [ ] Create concepts directory and index page
- [ ] Create placeholder pages for each core concept
- [ ] Design ConceptCard component for reusability
- [ ] Add concepts to navigation in layout.tsx
- [ ] Create concept linking pattern for feature pages
- [ ] Document sync strategy for future maintainers

---

## Implementation Order

### Phase 1: Structure Changes
1. Move decorative & theming to design-mockups
2. Update navigation in layout.tsx
3. Create concepts directory structure

### Phase 2: Content
4. Create concept placeholder pages
5. Design and implement ConceptCard component
6. Add concept links to relevant feature pages

### Phase 3: Drawers
7. Implement drawer infrastructure in layout
8. Create quest drawer with mock content
9. Add drawer triggers to feature pages
10. Create additional drawer panels

---

## Questions for Discussion

1. **Concept Detail Level**: Should concepts be:
   - Brief overviews (1 paragraph + diagram)?
   - Full deep-dives (full page with examples)?
   - Both (summary + expandable details)?

2. **Drawer Content**: Should drawers show:
   - Static mockups of the feature?
   - Interactive demos (future)?
   - Documentation content?

3. **Design System Expansion**: Should Design & Mockups include:
   - Component library documentation?
   - Design tokens/variables?
   - Animation library?

4. **Sync vs. Independence**: For concepts, prefer:
   - Strict sync (shared components)?
   - Loose coupling (manual updates)?
   - Generated from source (build step)?

---

## Files Changed Summary

**Move/Create:**
- `design-mockups/decorative/page.tsx` (move from features)
- `design-mockups/theming/page.tsx` (move from features)
- `concepts/page.tsx` (new)
- `concepts/currency/page.tsx` (new)
- `concepts/experience/page.tsx` (new)
- `concepts/quests/page.tsx` (new)
- `concepts/progression/page.tsx` (new)

**Modify:**
- `layout.tsx` (navigation updates + drawer infrastructure)
- `features/page.tsx` (remove decorative/theming cards)
- `design-mockups/page.tsx` (add decorative/theming sections)

---

*Created: 2026-02-22*
*Status: Draft Plan - Ready for Review*
