# HUD Implementation Roadmap

**Purpose**: Streamlined implementation plan with clear phases, dependencies, and validation criteria.  
**Status**: Ready for Implementation  
**Last Updated**: 2026-04-12

---

## Overview

This is the **execution-focused** companion to `hud-summary.md` (what to build) and `hud-plan.md` (architecture details). This document answers: **In what order do we build it?**

### Design Principles
1. **Correct Dependencies** — Never start work before prerequisites exist
2. **Incremental Value** — Each phase delivers usable, demonstrable output
3. **Right-Sized Tasks** — 1-4 hour chunks, completable in single sessions
4. **Clear Validation** — Know exactly when each phase is "done"
5. **Risk-First** — Tackle uncertain/complex items early
6. **Momentum** — Quick wins first to build confidence

### Critical Path
```
Types → Context → Shell → (Header | Orbs | Layouts) → Presets → Stories → MVP
```

---

## Phase Summary

| Phase | Name | Duration | Dependencies | Deliverable |
|-------|------|----------|--------------|-------------|
| 0 | Architecture & Types | 1 day | None | Type system, 1 preset |
| 1 | Context Foundation | 1 day | Phase 0 | Working HudContextProvider |
| 2 | Interactive Header | 2 days | Phase 1 | Header buttons with popovers |
| 3 | Orb Integration | 1 day | Phase 1 | Orbs connected to context |
| 4 | Content Layouts | 1 day | Phase 1 | 7 layout variants |
| 5 | Status System | 1 day | Phase 1 | 6 status configurations |
| 6 | Presets & Stories | 1 day | Phases 2-5 | **MVP: 6 presets, full demo** |
| 7 | AI Features | 2 days | Phase 6 | AI Input Bar, Action Lists |
| 8 | Navigation | 1 day | Phase 6 | Minimap, view controls |
| 9 | Celebration System | 1 day | Phase 5 | XP celebrations |
| 10 | Social Features | 2 days | Phase 6 | Party Profiles, roles |
| 11 | Advanced Features | Future | All | Spellbook, inventory |

**MVP Complete**: After Phase 6 (~8 days)  
**Full Feature Set**: After Phase 10 (~14 days)

---

## Phase 0: Architecture & Types

**Goal**: Establish the type system that everything else builds on.  
**Location**: `4eye/packages/@expanse/shell/src/features/hud-complete/types/`

### Tasks

#### 0.1 Create Type Definitions
**File**: `types/hud-config.ts`

```ts
// Core config interface
interface HudConfig {
  id: string;
  name: string;
  description?: string;
  platform: 'desktop' | 'mobile' | 'tablet';
  layout: LayoutConfig;
  domain: DomainConfig;
  header: HeaderConfig;
  orbs: OrbsConfig;
  features: FeaturesConfig;
}

interface LayoutConfig {
  content: 'single' | 'grid-2x2' | 'side-by-side' | 'stacked' | 'main-sidebar' | 'focus' | 'light-dark-split';
  orbPattern: 'bottom-row' | 'right-stack' | 'corners' | 'left-stack' | 'radial' | 'floating';
  statusConfig: 'compact' | 'expanded' | 'minimal' | 'presentation' | 'learning' | 'social';
  showMinimap: boolean;
  showViewControls: boolean;
}

interface DomainConfig {
  active: 'learning' | 'work' | 'life' | 'religion';
  available: ('learning' | 'work' | 'life' | 'religion')[];
}

interface HeaderConfig {
  buttons: HeaderButtonConfig[];
  displayState: HeaderDisplayState;
  expandable: boolean;
}

type HeaderDisplayState = 
  | 'default' | 'party' | 'achievement' | 'interactive'
  | 'learning-quiz' | 'learning-progress' | 'feedback' | 'learning-feedback'
  | 'announcement' | 'notification' | 'presentation'
  | 'ai-communication' | 'ai-response' | 'error';

interface HeaderButtonConfig {
  id: string;
  icon: string;
  label: string;
  popover: PopoverConfig;
  visibleWhen?: VisibilityRule[];
}

interface OrbsConfig {
  items: OrbConfig[];
  persistent: string[];    // IDs of always-shown orbs
  contextual: string[];    // IDs of context-dependent orbs
}

interface OrbConfig {
  id: string;
  icon: string;
  action: string;
  size?: 'sm' | 'md' | 'lg';
  expandable?: boolean;
  subActions?: OrbConfig[];
  visibleWhen?: VisibilityRule[];
}

interface FeaturesConfig {
  celebrations: 'none' | 'subtle' | 'normal' | 'full';
  aiInputBar: boolean;
  actionLists: boolean;
  spellbook: boolean;
  inventory: boolean;
}

interface VisibilityRule {
  field: 'domain' | 'app' | 'platform' | 'userRole' | 'headerState';
  equals?: string | string[];
  notEquals?: string | string[];
}
```

#### 0.2 Create First Preset
**File**: `presets/desktop-default.ts`

Create one complete, working preset that exercises all type fields. This validates the type system works before building more.

#### 0.3 Create Index Exports
**Files**: `types/index.ts`, `presets/index.ts`

### Validation Criteria
- [ ] TypeScript compiles with no errors
- [ ] All config interfaces have clear, documented properties
- [ ] One complete preset exists and type-checks
- [ ] Can import types from package

---

## Phase 1: Context Foundation

**Goal**: Create the context system that components read from.  
**Location**: `4eye/packages/@expanse/shell/src/features/hud-complete/context/`

### Tasks

#### 1.1 Create HudContext
**File**: `context/HudContext.tsx`

```tsx
interface HudContextValue {
  // From preset or custom config
  config: HudConfig;
  
  // Runtime state (can change)
  state: {
    activeDomain: string;
    activeHeaderTab: string | null;
    expandedPanels: string[];
    headerDisplayState: HeaderDisplayState;
  };
  
  // Actions
  actions: {
    setDomain: (domain: string) => void;
    setHeaderState: (state: HeaderDisplayState) => void;
    togglePanel: (panelId: string) => void;
    updateConfig: (partial: Partial<HudConfig>) => void;
  };
}
```

#### 1.2 Create HudContextProvider
**File**: `context/HudContextProvider.tsx`

```tsx
<HudContextProvider 
  preset="desktop-default"
  overrides={{ domain: { active: 'work' } }}
>
  {children}
</HudContextProvider>
```

#### 1.3 Create useHudContext Hook
**File**: `context/useHudContext.ts`

#### 1.4 Create Visibility Filter Helper
**File**: `context/visibility-filter.ts`

Function to filter items based on VisibilityRules and current state.

#### 1.5 Create Basic HudShell
**File**: `components/HudShell.tsx`

Minimal shell that renders slots for Header, Content, Orbs, Footer. Reads layout from context.

### Validation Criteria
- [ ] Can wrap any content in `<HudContextProvider preset="desktop-default">`
- [ ] `useHudContext()` returns config and state
- [ ] Changing domain via `actions.setDomain()` updates state
- [ ] `HudShell` renders without errors

---

## Phase 2: Interactive Header

**Goal**: Build the header button system with popovers and state management.  
**Dependencies**: Phase 1 (context must exist)  
**Location**: `4eye/packages/@expanse/shell/src/features/hud-complete/components/header/`

### Tasks

#### 2.1 HeaderContextProvider
**File**: `components/header/HeaderContext.tsx`

Manages which buttons are visible based on domain, app, user role, layout.

```tsx
<HeaderContextProvider
  domain={currentDomain}
  layout={isMobile ? 'mobile' : 'desktop'}
>
  <InteractiveHeader />
</HeaderContextProvider>
```

#### 2.2 HeaderButton Component
**File**: `components/header/HeaderButton.tsx`

Pill-style button with icon + label. Click opens popover.

```
[📚 Learning ▼]
```

- Hover state
- Active state (popover open)
- Disabled state

#### 2.3 HeaderPopover Component
**File**: `components/header/HeaderPopover.tsx`

Dropdown panel that appears below header button. Supports:
- List of options (selectable)
- Grouped options
- Custom content slot

#### 2.4 InteractiveHeader Component
**File**: `components/header/InteractiveHeader.tsx`

Composes HeaderButtons, reads visible buttons from context, manages popover state.

#### 2.5 Header State Manager
**File**: `components/header/HeaderStateManager.tsx`

Controls the 14 header display states:
- Default, Party, Achievement, Interactive
- Learning Quiz, Learning Progress, Feedback, Learning Feedback
- Announcement, Notification, Presentation
- AI Communication, AI Response, Error

### Validation Criteria
- [ ] Header renders correct buttons based on preset
- [ ] Clicking button opens popover
- [ ] Selecting option updates context
- [ ] Header state changes affect display (e.g., party mode shows avatars)
- [ ] Mobile shows fewer buttons than desktop

---

## Phase 3: Orb Integration

**Goal**: Connect existing OrbCluster to HUD context.  
**Dependencies**: Phase 1  
**Note**: OrbCluster already exists—this phase integrates it.

### Tasks

#### 3.1 ContextualOrbs Component
**File**: `components/ContextualOrbs.tsx`

Reads orb config from HudContext, filters by visibility, renders OrbCluster.

```tsx
function ContextualOrbs() {
  const { config, state } = useHudContext();
  const visibleOrbs = filterByVisibility(config.orbs.items, state);
  
  return (
    <OrbCluster pattern={config.layout.orbPattern}>
      {visibleOrbs.map(orb => <ActionOrb key={orb.id} {...orb} />)}
    </OrbCluster>
  );
}
```

#### 3.2 Position Variants Story
**File**: `stories/OrbPositions.stories.tsx`

Stories showing orbs in different positions:
- Center (desktop default)
- Bottom-right (mobile MOBA)
- Split left/right
- Floating/draggable

#### 3.3 Expandable Orb Prototype
**File**: `components/ExpandableOrb.tsx`

Single pattern to start: radial expansion showing sub-actions.

### Validation Criteria
- [ ] Orbs render in position specified by preset
- [ ] Different presets show different orb sets
- [ ] At least one expandable orb pattern works
- [ ] Orbs change when domain changes

---

## Phase 4: Content Layouts

**Goal**: Support 7 different content area arrangements.  
**Dependencies**: Phase 1

### Tasks

#### 4.1 ContentArea Component
**File**: `components/ContentArea.tsx`

Container that arranges children based on layout prop.

#### 4.2 Layout Variants
Implement all 7:

```
SINGLE:           GRID-2X2:          SIDE-BY-SIDE:
┌───────────┐     ┌─────┬─────┐     ┌─────┬─────┐
│  content  │     │  1  │  2  │     │  1  │  2  │
└───────────┘     ├─────┼─────┤     └─────┴─────┘
                  │  3  │  4  │
                  └─────┴─────┘

STACKED:          MAIN-SIDEBAR:      FOCUS:
┌───────────┐     ┌───────┬───┐     ┌─────────────┐
│     1     │     │       │   │     │             │
├───────────┤     │ main  │ s │     │   content   │
│     2     │     │       │   │     │             │
└───────────┘     └───────┴───┘     └─────────────┘

LIGHT-DARK-SPLIT:
┌────────────┬────────────┐
│   LIGHT    │   DARK     │
│   MODE     │   MODE     │
└────────────┴────────────┘
```

#### 4.3 Layout Switcher UI
**File**: `components/LayoutSwitcher.tsx`

Dropdown or icon buttons to switch between layouts.

### Validation Criteria
- [ ] All 7 layouts render correctly
- [ ] LayoutSwitcher changes layout in real-time
- [ ] Light/dark split shows same content in both themes
- [ ] Layouts respond to viewport size changes

---

## Phase 5: Status System

**Goal**: Integrate status bars with 6 configurations.  
**Dependencies**: Phase 1

### Tasks

#### 5.1 StatusPanel Component
**File**: `components/StatusPanel.tsx`

Container for status displays that reads config from context.

#### 5.2 Status Configurations
Define behavior for each:

| Config | Description | Show |
|--------|-------------|------|
| `compact` | Minimal header metrics | XP, coins, level |
| `expanded` | Editor mode with tools | All bars + tools |
| `minimal` | Mobile essentials | XP only |
| `presentation` | Clean, large | Timer, slide count |
| `learning` | Study session | Goals, progress, subject |
| `social` | Collaboration | Achievements, party |

#### 5.3 Integrate ProfileStatusDisplay
Import from brandCore, connect to HudContext.

### Validation Criteria
- [ ] StatusPanel renders differently for each statusConfig
- [ ] Switching preset changes status display
- [ ] ProfileStatusDisplay expands/collapses correctly
- [ ] All 6 configurations display appropriate content

---

## Phase 6: Presets & Stories (MVP)

**Goal**: Create complete presets and Storybook demo.  
**Dependencies**: Phases 2-5 (all component systems)

### Tasks

#### 6.1 Create 6 Complete Presets

| Preset | Platform | Use Case |
|--------|----------|----------|
| `desktop-default` | desktop | Basic web/app |
| `mobile-moba` | mobile | Mobile-first, gaming style |
| `presentation` | desktop | Presentations, demos |
| `learning-focus` | desktop | Study sessions |
| `work-dashboard` | desktop | Productivity |
| `social-collab` | desktop | Group work |

#### 6.2 Create Story Structure
```
HUD/
├── Complete Demo (interactive all controls)
├── Presets/
│   ├── Desktop Default
│   ├── Mobile MOBA
│   ├── Presentation
│   ├── Learning Focus
│   ├── Work Dashboard
│   └── Social Collab
├── Components/
│   ├── Interactive Header
│   ├── Orb Positions
│   ├── Content Layouts
│   └── Status Configs
```

#### 6.3 Interactive Demo Story
Single story with Storybook controls for:
- Preset selector
- Domain dropdown
- Layout dropdown
- Status config dropdown
- Orb position dropdown
- Header state buttons

### Validation Criteria
- [ ] All 6 presets render without errors
- [ ] Interactive demo allows switching all major options
- [ ] Visual differences are clear between presets
- [ ] Can present variations to stakeholders
- [ ] Mobile preset shows mobile-appropriate layout

**🎯 MVP COMPLETE after Phase 6**

---

## Phase 7: AI Features

**Goal**: Add AI input capabilities and action lists.  
**Dependencies**: Phase 6 (MVP)

### Tasks

#### 7.1 AI Input Bar
**File**: `components/ai/AIInputBar.tsx`

- Mic button (speech input)
- Cam button (visual input)  
- Text input field
- Language selector
- Slide-up animation from bottom

#### 7.2 Action Lists Component
**File**: `components/ai/ActionLists.tsx`

Lists available AI actions for current context:
- Navigate, Contact, Learn More, Expand, Clarify, Simplify
- Different from Spellbook (transforms) vs Action Lists (what AI can do)
- Can display as popover, panel, or read aloud

#### 7.3 Language Selection
**File**: `components/ai/LanguageSelector.tsx`

Source + target language for translation.

### Validation Criteria
- [ ] AI Input Bar appears when `features.aiInputBar: true`
- [ ] Action Lists shows context-appropriate actions
- [ ] Language selection updates context

---

## Phase 8: Navigation

**Goal**: Integrate minimap and navigation controls.  
**Dependencies**: Phase 6

### Tasks

#### 8.1 Minimap Integration
Port/adapt from `symbol-grid/src/features/navigation/components/Minimap/`

#### 8.2 View Controls Panel
Location: Top-right or right side

- Grid view toggle
- Standard layout toggle
- Light/dark mode toggle
- Zoom/accessibility
- Pin functionality

#### 8.3 Page Navigator
Full list of pages with categories.

### Validation Criteria
- [ ] Minimap appears when `showMinimap: true`
- [ ] Click minimap section navigates
- [ ] View controls toggle work
- [ ] Page navigator lists all sections

---

## Phase 9: Celebration System

**Goal**: Add XP celebrations and feedback animations.  
**Dependencies**: Phase 5 (status system)

### Tasks

#### 9.1 Celebration Event System
**File**: `components/celebrations/CelebrationManager.tsx`

Queue and display celebration animations.

#### 9.2 Trigger Levels

| Trigger | Animation |
|---------|-----------|
| Passive XP | Number ticks, brief glow |
| Task complete | Progress fill, soft pulse |
| Claim reward | 4eye pops out, particles |
| Level up | Full celebration |
| Achievement | Announcement style |

#### 9.3 User Preference Control
Setting: Celebration intensity (none, subtle, normal, full)

### Validation Criteria
- [ ] `triggerCelebration()` action works
- [ ] Different trigger levels show different animations
- [ ] User preference respected
- [ ] Celebrations don't disrupt flow

---

## Phase 10: Social Features

**Goal**: Support collaborative and role-based experiences.  
**Dependencies**: Phase 6

### Tasks

#### 10.1 Party Profiles Component
**File**: `components/social/PartyProfiles.tsx`

- Profile images (4eye variants or real photos)
- Status indicators (speaking, viewing, away)
- Expandable list

#### 10.2 Role Selector
**File**: `components/social/RoleSelector.tsx`

Dropdown: General, Student, Teacher, Investor, Parent, Developer

#### 10.3 Role-Based Content Changes
- Content priority changes
- Available actions change
- View styling changes

### Validation Criteria
- [ ] Party profiles appear in party header state
- [ ] Role selection updates context
- [ ] Different roles see different header buttons

---

## Phase 11: Advanced Features (Future)

**Scope**: Post-MVP enhancements

### Planned
- Spellbook screens (content transformation)
- Inventory/backpack system
- Quest/achievement buttons
- Interactive notifications (polls, quizzes in header)
- Legend component (icon/page explanations)
- Nested action bars

---

## File Structure

```
hud-complete/
├── index.ts                    # Public exports
├── types/
│   ├── hud-config.ts           # All interfaces
│   └── index.ts
├── presets/
│   ├── desktop-default.ts
│   ├── mobile-moba.ts
│   ├── presentation.ts
│   ├── learning-focus.ts
│   ├── work-dashboard.ts
│   ├── social-collab.ts
│   └── index.ts
├── context/
│   ├── HudContext.tsx
│   ├── HudContextProvider.tsx
│   ├── useHudContext.ts
│   └── visibility-filter.ts
├── components/
│   ├── HudShell.tsx
│   ├── ContentArea.tsx
│   ├── StatusPanel.tsx
│   ├── ContextualOrbs.tsx
│   ├── LayoutSwitcher.tsx
│   ├── header/
│   │   ├── HeaderContext.tsx
│   │   ├── HeaderButton.tsx
│   │   ├── HeaderPopover.tsx
│   │   ├── InteractiveHeader.tsx
│   │   └── HeaderStateManager.tsx
│   ├── ai/
│   │   ├── AIInputBar.tsx
│   │   ├── ActionLists.tsx
│   │   └── LanguageSelector.tsx
│   ├── social/
│   │   ├── PartyProfiles.tsx
│   │   └── RoleSelector.tsx
│   └── celebrations/
│       └── CelebrationManager.tsx
└── stories/
    ├── HudComplete.stories.tsx
    ├── Presets.stories.tsx
    ├── Interactive.stories.tsx
    └── Components/
        ├── InteractiveHeader.stories.tsx
        ├── OrbPositions.stories.tsx
        ├── ContentLayouts.stories.tsx
        └── StatusConfigs.stories.tsx
```

---

## Dependency Graph

```
              ┌─────────────────┐
              │  Phase 0: Types │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ Phase 1: Context│
              └────────┬────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼─────┐  ┌──────▼─────┐  ┌──────▼─────┐
│ Phase 2:   │  │ Phase 3:   │  │ Phase 4:   │
│ Header     │  │ Orbs       │  │ Layouts    │
└──────┬─────┘  └──────┬─────┘  └──────┬─────┘
       │               │               │
       │        ┌──────▼─────┐         │
       │        │ Phase 5:   │         │
       │        │ Status     │         │
       │        └──────┬─────┘         │
       │               │               │
       └───────────────┼───────────────┘
                       │
              ┌────────▼────────┐
              │ Phase 6: Presets│
              │ 🎯 MVP COMPLETE │
              └────────┬────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
┌──────▼─────┐  ┌──────▼─────┐  ┌──────▼─────┐
│ Phase 7:   │  │ Phase 8:   │  │ Phase 9:   │
│ AI         │  │ Navigation │  │ Celebrate  │
└────────────┘  └────────────┘  └──────┬─────┘
                                       │
                              ┌────────▼────────┐
                              │ Phase 10: Social│
                              └─────────────────┘
```

---

## Task Sizing Reference

| Size | Hours | Example |
|------|-------|---------|
| XS | < 1 | Create type file, add export |
| S | 1-2 | Single component, one pattern |
| M | 2-4 | Component + story + integration |
| L | 4-8 | Feature with multiple components |
| XL | 8+ | Break into smaller tasks |

Most tasks in this plan are S or M. If a task feels XL, break it down.

---

## How to Use This Plan

### For Each Phase:
1. Read the phase description and tasks
2. Check dependencies are complete
3. Create files in order listed
4. Run validation criteria
5. Create/update Storybook stories
6. Mark phase complete

### Prompting Pattern:
```
"Implement Phase X: [Name]. 
Start with task X.1: [Description].
Create file at [path]."
```

### Progress Tracking:
Update `hud-tasks.md` as tasks complete. This roadmap defines *sequence*; tasks.md tracks *status*.

---

## Success Metrics

### MVP (Phase 6 Complete)
- [ ] 6 presets render correctly
- [ ] Interactive demo works in Storybook
- [ ] Can toggle between standard and HUD layout
- [ ] Domain switching changes all components
- [ ] Mobile and desktop variants work
- [ ] Can present to stakeholders for feedback

### Full Feature Set (Phase 10 Complete)
- [ ] All 16 new components implemented
- [ ] Celebration system engages users
- [ ] AI input bar functional
- [ ] Social features support collaboration
- [ ] Roles change user experience
