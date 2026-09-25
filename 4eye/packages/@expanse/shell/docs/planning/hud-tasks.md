# HUD Iteration - Task Breakdown

**Parent Plan**: [hud-plan.md](./hud-plan.md)

This document breaks the master plan into individual prompt-ready tasks.

---

## Task Set A: Status Bar ~~Generification~~ (ALREADY IMPLEMENTED)

**Status**: ✅ Features exist - just need Storybook demo

### A1: Create Storybook Demo of Existing Status Bar
**Scope**: Show existing layouts and slot system

**Subtasks**:
1. Create story showing all layout variants (staircase, horizontal, expandable)
2. Demonstrate multi-slot usage (multiple currencies in one bar)
3. Check if `balanced-horizontal` (1-2-1) exists or needs to be added

---

## Task Set B: HUD Demo Expansion

### B1: Copy Complete HUD Demo
**Scope**: Create working copy for iteration
**Files**: Create at `4eye/packages/@expanse/shell/src/features/hud-complete/`

**Subtasks**:
1. Copy `HudOverview.stories.tsx` structure
2. Set up as primary development file
3. Add all new components here

**Example prompt**:
> "Create a copy of the HUD demo at hud-complete/ that we'll use as the primary development focus for all new HUD features."

---

### B2: Add Minimap + Toggle
**Scope**: Integrate minimap component
**Reference**: `ExpanseFrontend/apps/symbol-grid/src/features/navigation/components/Minimap/`

**Subtasks**:
1. Port/adapt Minimap component to @expanse/shell
2. Add minimap toggle button
3. Position in standard location

---

### B3: View Controls Panel
**Scope**: Create unified view controls
**Location**: Above minimap, right side

**Subtasks**:
1. Create panel container
2. Add grid view button
3. Add Basic Web Layout button (switch paradigms)
4. Move light/dark mode toggle here
5. Add zoom/accessibility button
6. Keep/clarify pin button

---

### B4: Relocate Action Buttons
**Scope**: Move action buttons to bottom center
**Files**: HUD demo

---

### B5: Bar Content Audit & Reorganization
**Scope**: Sort out which buttons live on which bar
**Context**: Current HUD has buttons scattered without clear ownership

**Subtasks**:
1. Inventory every button currently rendered on the HUD demo
2. Assign each to its correct bar:
   - **Bottom Action Bar** — primary page actions (edit, create, share, etc.)
   - **AI Input Bar** — mic, cam, text, lang, send
   - **View Controls Panel** — grid/list, theme, a11y, pin, paradigm switch
   - **Orb Group** — context-dependent quick actions
   - **Minimap** — navigation chrome (see B6)
3. Remove duplicates and ungrouped lone buttons
4. Document ownership in Storybook docs page

---

### B6: Move Back/Forward Arrows to Minimap
**Scope**: The orphan back/forward action buttons belong with navigation, not actions

**Subtasks**:
1. Remove back/forward from the action bar / floating placement
2. Add prev/next page controls to the Minimap chrome (header or footer of the minimap)
3. Wire to existing page navigation
4. Style to match minimap, not action buttons

---

### B7: Orb Group Positioning
**Scope**: Orbs should be a coherent set at bottom-middle, not a lone pencil/edit button

**Subtasks**:
1. Move orb group to bottom-center of viewport (above the Bottom Action Bar)
2. Replace the standalone pencil/edit with a proper orb cluster
3. Confirm orb count + default actions for the demo (4-orb default per hud-summary §7.4)
4. **Open question**: explore a *second* orb set
   - Possible locations: opposite edge (top-center), side (left/right-center), corner cluster, or contextual pop-out
   - Use case: separate "global" orbs from "page-context" orbs
   - Add Storybook variants to compare placements before committing

---

## Task Set C: View Modes

### C1: View Mode System Architecture
**Scope**: Create view mode component system

**Subtasks**:
1. Define view mode types (reading levels, etc.)
2. Create `ViewModeSelector` component
3. Create toggle button

---

### C2: Learning Suggestion Alerts
**Scope**: Auto-notification for interactive learning

**Subtasks**:
1. Create alert button component
2. Connect to user goals
3. Show relevant suggestions

---

### C3: Suggested Actions Notification
**Scope**: Different notification type for spell suggestions

**Subtasks**:
1. Create notification button
2. Sort by recommended
3. Visual distinction from learning alerts

---

## Task Set D: 4eye Integration

### D0: Header Context Provider
**Scope**: Centralized context for header button visibility

**Subtasks**:
1. Create `HeaderContextProvider` component
2. Define visibility rules based on: domain, app, user settings, layout
3. Create `useHeaderContext` hook
4. Integrate with interactive header buttons

**Example prompt**:
> "Create a HeaderContextProvider that controls which buttons appear in the interactive header based on the selected domain, current app, user settings, and device layout (mobile vs desktop)."

---

### D1: Header Status Bar Integration
**Scope**: Add 4eye status to header

**Subtasks**:
1. Smaller state status bars in header
2. Show only first version by default
3. Add expansion on interaction

---

### D2: 4eye Chat Icon
**Scope**: Integrate chat icon with interaction states

**Subtasks**:
1. Add icon (slightly desaturated default)
2. Add hover animation (brings to life)
3. Interaction states

---

### D3: Experience Celebration System
**Scope**: 4eye character animations for XP gains

**Subtasks**:
1. 4eye pops out on large XP gain
2. Consider hover-only to avoid distraction
3. Push progress bar animation option

---

### D4: Header Drop-Down Panel
**Scope**: Interactive panel below header

**Subtasks**:
1. Create panel component
2. Support: 1 large square OR multiple panels
3. Align sides with header
4. Grid layout variations

---

## Task Set E: Inventory & Rewards (UI Only)

### E1: Backpack Button & Inventory Shell
**Scope**: Add backpack UI to HUD

**Subtasks**:
1. Create backpack icon button
2. Create inventory modal/page shell (empty)
3. Position on HUD

---

### E2: Rewards Button
**Scope**: Button with notification chip for unclaimed rewards

**Subtasks**:
1. Create rewards button
2. Add notification chip/badge (shows count when rewards available)
3. Position on HUD

**Note**: Actual reward logic, display options, and unclaimed rewards view = later iteration

---

## Task Set F: Navigation

### F1: Page Navigator
**Scope**: Full page list with navigation tools
**Reference**: symbol-grid page navigator

**Subtasks**:
1. Create `PageNavigator` component
2. Full list display
3. Additional nav tools

---

### F2: Full Screen Navigator
**Scope**: Full-screen minimap variant

**Subtasks**:
1. Create full-page navigation component
2. List view mode
3. Grid view mode
4. Color coding support
5. Remove header when active

---

### F3: Special Pages Component
**Scope**: Reusable special pages button
**Reference**: `symbol-grid/src/utils/pageConfig.ts`

**Subtasks**:
1. Create reusable component
2. Add Storybook story

---

## Task Set G: Actions & Speech

### G1: Speech-to-Text Bar
**Scope**: Real-time STT action bar

**Subtasks**:
1. Create STT toggle button
2. Add source language selection
3. Add target language for translation

---

### G2: Language Selection Button
**Scope**: Global language selection

**Subtasks**:
1. Create language selector component
2. Add to action bar
3. Integrate with STT

---

### G3: ActionButton Visual Polish
**Scope**: Improve the buttons that live inside action bars

**Subtasks**:
1. Audit current `ActionButton` states (default / hover / active / disabled / selected)
2. Tighten icon sizing, padding, and hit targets across thicknesses
3. Consistent ripple / press feedback (or replace MUI ripple with custom)
4. Badge + tooltip alignment polish
5. Verify contrast on every `ActionBar` variant (glass, solid, frosted, minimal, outlined, technical)
6. Ensure dark/light theme + `colorMode` primary/secondary all read clearly

---

### G4: Action Bar Identity & Labels
**Scope**: Make it obvious which bar is which

**Subtasks**:
1. Add optional `label` prop to `ActionBar` (e.g. "Tools", "AI Input", "View")
2. Display modes: `always` | `hover` | `none` (default `none`)
3. Position options: leading edge of bar, floating tag above/below, or inline divider
4. Style as subtle caption — not competing with buttons
5. Hover reveal: fade in with bar focus / pointer enter
6. Use labels to distinguish stacked or nested bars (pairs with I2)
7. Storybook: showcase Bottom / AI Input / View Controls / Orb Group bars side-by-side with labels on

---

## Task Set H: Spellbook

### H1: Spellbook Screens
**Scope**: Content transformation UI

**Subtasks**:
1. Create spellbook modal/page
2. Transformation types:
   - Visual transformation
   - Learning modalities
   - Quality assessment
   - Trustworthiness analysis
3. Action buttons for each type

---

### H2: Spell Recommendations
**Scope**: Smart spell suggestions

**Subtasks**:
1. Create recommendation notification
2. Sort algorithm by relevance
3. Visual distinction from other alerts

---

## Task Set I: Action Orbs

### I0: Orb Position Variants
**Scope**: Platform-specific orb positioning

**Subtasks**:
1. Create position variant stories:
   - Bottom-right (mobile MOBA style)
   - Center above bottom bar (desktop)
   - Split left/right
   - Draggable/floating
2. Implement responsive positioning logic
3. Add user preference for position

---

### I1: Orb Layout Variants
**Scope**: New orb arrangement options

**Subtasks**:
1. Mixed sizes (small + large)
2. Variable counts (focus on 4)
3. Left/right split layouts
4. Persistent vs contextual divider

---

### I2: Nested Action Bars
**Scope**: Bars sliding in/out of each other

**Subtasks**:
1. Sliding animation system
2. Parent-child bar relationships
3. Transition effects

---

## Task Set J: Storybook

### J1: View Types Organization
**Scope**: Organize view components

**Subtasks**:
1. Group view type components
2. Create secondary viewing area
3. Update story structure

---

## Recommended Order

**Week 1**:
- B1: Copy HUD Demo
- B2: Add Minimap
- B3: View Controls Panel
- B4: Relocate Actions

**Week 2**:
- A1: Generic Status Bar
- A2: Balanced Layout
- D1: Header Status Integration

**Week 3**:
- F1: Page Navigator
- F2: Full Screen Nav
- F3: Special Pages

**Week 4**:
- D2: Chat Icon
- H1: Spellbook Screens
- G1: Speech-to-Text

**Week 5+**:
- Remaining tasks based on priority

---

## Task Set K: Visualization & Review

### K1: Create Storybook Layout Gallery
**Scope**: Visual comparison of all HUD configurations

**Subtasks**:
1. Create "HUD Layout Variants" story showing all 6 configs
2. Side-by-side comparison view
3. Interactive toggle between variants

---

### K2: Display Items Gallery Story
**Scope**: Document all displayable items visually

**Subtasks**:
1. Create gallery of all display item components
2. Group by category (Status, Goals, Preferences, etc.)
3. Show symbol representations

---

### K3: Header States Story
**Scope**: Demonstrate header expansion/collapse

**Subtasks**:
1. Collapsed state
2. Expanded with each tab (Status, Goals, 4eye, Rewards)
3. Transition animations

---

### K4: Celebration Animations Demo
**Scope**: Show all celebration trigger levels

**Subtasks**:
1. Subtle (progress glow)
2. Medium (4eye peek)
3. Full (pop out + particles)
4. Interactive triggers for testing
