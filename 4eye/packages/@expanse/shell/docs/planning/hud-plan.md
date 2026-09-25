# HUD Iteration Plan

**Status**: Planning  
**Created**: 2026-04-10  
**Priority**: High

**Related Documents**:
- [hud-summary.md](./hud-summary.md) — What to build (features, components, specs)
- [hud-roadmap.md](./hud-roadmap.md) — **Execution order** (phases, dependencies, validation)
- [hud-tasks.md](./hud-tasks.md) — Individual tasks (status tracking)

## Executive Summary

Further iterate on the HUD demo to solidify concepts for use across websites, apps, and presentations. The goal is to finalize at least 1 version (likely 3+ variants with significant overlap) while organizing for modular support.

---

## Primary Goals

### Core Objective
Build an improved web layout system that can **toggle between Basic Web Layout and Spatial Layout**.

### Why Spatial/HUD Layout?

| Goal | Description |
|------|-------------|
| **Next-Gen Presentations** | Support building next generation of live presentations and web content, especially with AI integrations |
| **Gamification Appeal** | Appeal to younger generations through gamification vibe - XP bars, currency, achievements, levels |
| **Complex Scalable Layouts** | Handle complex layouts that support scalable innovation better than standard nested menus |
| **Visual-First Navigation** | Utilize icons and visuals more than relying only on language |
| **Marketing Differentiation** | Represent innovation, something different, next level - serves as a marketing tactic |
| **AI Integration** | Build applications that support AI integration into web better than previous approaches (orbs, actions, contextual AI) |
| **Accessibility** | Improvements through more visuals, spatial access, and accessible tools |
| **Learning Science** | Support visual/spatial learning, 4 actions for memory, engagement, etc. |
| **Social/Group Work** | Support group work and social environments, multiple screens |
| **Unique Interactions** | Provide unique interactions through action orbs, spatial navigation, contextual actions |

### Specific Features

1. **Layout Toggle**: Switch between Basic Web Layout ↔ Spatial Layout
2. **AI Orbs**: Quick access to AI features (chat, voice, vision) through action orbs
3. **Gamification Display**: XP bars, currency, achievements, levels - visible and engaging
4. **Spatial Navigation**: Minimap, spatial traversal through content/presentations
5. **Presentation Mode**: Gamified presentation traversal, spatial representation
6. **Multi-Screen Support**: Social environments, collaborative layouts
7. **Visual Language**: Icons, symbols, spatial positioning over text-heavy menus

### Success Criteria

- [ ] Can toggle between Basic Web Layout and Spatial Layout
- [ ] Domains switch via header - all relevant components update
- [ ] Presets work out of the box with no manual configuration
- [ ] Adding new presets requires only config file
- [ ] Works in light and dark themes
- [ ] Mobile/tablet responsive variants work correctly
- [ ] Orbs change based on context (page, domain)
- [ ] Expandable orbs work (tap → sub-options)
- [ ] Gamification elements (XP, currency) display correctly
- [ ] Minimap navigation functional
- [ ] **Can visualize variations in Storybook to compare designs**

### Secondary Goal: Design Visualization
Use Storybook variations to:
- Visualize layouts before building apps
- Compare which designs look best
- Present to stakeholders
- Prepare for implementation
- Easier than reading text

### Non-Goals (This Iteration)

- Full backend integration
- Persistence of user settings to database
- Mobile app deployment (React Native)
- Full spellbook/transformation system
- Complete inventory/reward backend

---

## Part 1: Status Bar System ~~Refactoring~~ (ALREADY IMPLEMENTED)

**Status**: ✅ Complete - exists in `ExpanseFrontend/packages/brandCore/src/status/`

### Existing Features (No work needed)
- `ProfileStatusDisplay` - 3-bar staircase/horizontal layout
- `GenericStatusBar` - Slot-based architecture
- `CurrencyStatusBarSimple`, `ProgressStatusBar`, `ProfileIconStatusBarSimple`
- Layout variants: `staircase`, `horizontal`
- Expandable with GSAP animations
- Multiple slots per bar support

### TODO: Add Storybook Example
- [ ] Create story in @expanse/shell demonstrating integration with HUD
- [ ] Show expandable behavior

---

## Part 1b: Existing @expanse/shell Components

**Status**: ✅ Already implemented - review before building duplicates

| Component | Location | What It Does |
|-----------|----------|--------------|
| `ActionOrb` | `features/orbs` | Floating action button (5 shapes, 5 variants, 8 colors) |
| `OrbCluster` | `features/orbs` | Groups orbs in patterns (10 patterns including `bottom-row`, `right-stack`) |
| `SpatialBar` | `features/spatial-bar` | Edge/corner action bar (8 positions, collapsible) |
| `SpatialBarButton` | `features/spatial-bar` | Icon button with tooltip/badge |
| `ActionDock` | `features/action-dock` | Corner button stack |
| `Minimap` | `features/minimap` | Grid overview (3 variants: grid, dots, blocks) |
| `ScreenOverlay` | `features/overlays` | 9-slot floating chrome (top, bottom, left, right, corners) |
| `NavigationProvider` | `features/navigation` | Grid navigation context |
| `HudCollapseHandle` | `features/hud-shared` | 7 collapse handle styles |

### Key Integration Points
- **Orb positions**: Use `OrbCluster pattern` prop (`bottom-row`, `right-stack`, `corners`, etc.)
- **Chrome layout**: Use `ScreenOverlay` slots (topLeft, bottomCenter, etc.)
- **Navigation**: Use `NavigationProvider` for grid state

---

## Part 2: Complete HUD System Architecture

### Location
Create at: `4eye/packages/@expanse/shell/src/features/hud-complete/`

### 2.1 Source from Current Demo
- Copy from: `hud-shared/HudOverview.stories.tsx`
- This becomes the primary development focus

---

### 2.2 Architecture Overview

**Existing Context Systems** (already in @expanse/shell):
- `NavigationProvider` - Grid position, navigation state
- `MapProvider` - Map configuration (spatial navigation surface)
- `useMapContext()`, `useNavigation()` hooks

**New Context Needed**:
- `HudContextProvider` - Manages HUD-specific config (presets, header buttons, orb visibility)
- Works alongside NavigationProvider, doesn't replace it

**4 Layers:**
```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: STORIES                                           │
│  Stories just pick a preset + optionally override context   │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3: COMPONENTS                                        │
│  HudShell, ProfileStatusDisplay, InteractiveHeader, etc.    │
│  → Many already exist (OrbCluster, SpatialBar, Minimap)     │
│  → New: Header buttons, AI Input Bar, Party Profiles        │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: CONTEXT                                           │
│  HudContextProvider (NEW) + NavigationProvider (EXISTS)     │
│  → HudContext: presets, header config, orb visibility       │
│  → NavigationContext: grid position, tiles                  │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: CONFIG / PRESETS                                  │
│  Type-safe JSON-like objects defining each variant          │
│  → AI-readable, extendable, importable                      │
└─────────────────────────────────────────────────────────────┘
```

---

### 2.3 Layer 1: Config & Presets

**Type Definitions** (AI-readable, extendable):
```ts
// types/hud-config.ts

interface HudConfig {
  // Identity
  id: string;
  name: string;
  description?: string;
  
  // Platform
  platform: 'desktop' | 'mobile' | 'tablet';
  
  // Layout
  layout: {
    content: 'single' | 'grid-2x2' | 'side-by-side' | 'stacked' | 'main-sidebar' | 'focus' | 'light-dark-split';
    // Maps to OrbCluster 'pattern' prop
    orbPattern: 'bottom-row' | 'right-stack' | 'corners' | 'left-stack' | 'radial' | 'custom';
    statusConfig: 'compact' | 'expanded' | 'minimal' | 'presentation' | 'learning' | 'social';
    showMinimap: boolean;
    showViewControls: boolean;
  };
  
  // Domain Context
  domain: {
    active: 'learning' | 'work' | 'life' | 'religion';
    available: ('learning' | 'work' | 'life' | 'religion')[];
  };
  
  // Header
  header: {
    buttons: HeaderButtonConfig[];
    expandable: boolean;
  };
  
  // Orbs
  orbs: {
    items: OrbConfig[];
    persistent: OrbConfig[];  // Always shown
    contextual: OrbConfig[];  // Based on domain/app
  };
  
  // Features
  features: {
    celebrations: 'none' | 'subtle' | 'normal' | 'full';
    aiInputBar: boolean;
    spellbook: boolean;
    inventory: boolean;
  };
}

interface HeaderButtonConfig {
  id: string;
  icon: string;
  label: string;
  popover: PopoverConfig;
  visibleWhen?: VisibilityRule[];
}

interface OrbConfig {
  id: string;
  icon: string;
  action: string;
  size?: 'sm' | 'md' | 'lg';
  visibleWhen?: VisibilityRule[];
}

interface VisibilityRule {
  field: 'domain' | 'app' | 'platform' | 'userRole';
  equals?: string | string[];
  notEquals?: string | string[];
}
```

**Preset Examples:**
```ts
// presets/index.ts

export const presets = {
  'desktop-default': {
    id: 'desktop-default',
    name: 'Desktop Default',
    platform: 'desktop',
    layout: {
      content: 'single',
      orbPosition: 'center',
      statusConfig: 'compact',
      showMinimap: true,
      showViewControls: true,
    },
    domain: { active: 'learning', available: ['learning', 'work', 'life', 'religion'] },
    header: { buttons: [...defaultHeaderButtons], expandable: true },
    orbs: { items: [...defaultOrbs], persistent: ['ai', 'mic'], contextual: ['cam', 'more'] },
    features: { celebrations: 'normal', speechToText: true, spellbook: true, inventory: true },
  },
  
  'mobile-moba': {
    id: 'mobile-moba',
    name: 'Mobile MOBA Style',
    platform: 'mobile',
    layout: {
      content: 'single',
      orbPosition: 'bottom-right',
      statusConfig: 'minimal',
      showMinimap: false,
      showViewControls: false,
    },
    // ... rest
  },
  
  'presentation': {
    id: 'presentation',
    name: 'Presentation Mode',
    platform: 'desktop',
    layout: {
      content: 'single',
      orbPosition: 'center',
      statusConfig: 'presentation',
      showMinimap: false,
      showViewControls: false,
    },
    // ... rest
  },
  
  'learning-focus': { /* ... */ },
  'work-dashboard': { /* ... */ },
  'light-dark-compare': { /* ... */ },
} satisfies Record<string, HudConfig>;

export type PresetId = keyof typeof presets;
```

---

### 2.4 Layer 2: Context Provider

**Context holds config + interactive state:**
```ts
// context/HudContext.tsx

interface HudContextValue {
  // Current config (from preset or custom)
  config: HudConfig;
  
  // Runtime state (user can change these)
  state: {
    activeDomain: string;
    activeHeaderTab: string | null;
    expandedPanels: string[];
    celebrationQueue: CelebrationEvent[];
  };
  
  // Actions
  actions: {
    setDomain: (domain: string) => void;
    togglePanel: (panelId: string) => void;
    triggerCelebration: (event: CelebrationEvent) => void;
    updateConfig: (partial: Partial<HudConfig>) => void;
  };
}

// Usage
<HudContextProvider 
  preset="desktop-default"           // Start from preset
  overrides={{ domain: { active: 'work' } }}  // Optional overrides
>
  <HudShell />
</HudContextProvider>

// Or fully custom
<HudContextProvider config={myCustomConfig}>
  <HudShell />
</HudContextProvider>
```

---

### 2.5 Layer 3: Components

**Components read from context automatically:**
```tsx
// components/HudShell.tsx
function HudShell({ children }) {
  const { config } = useHudContext();
  
  return (
    <div className={`hud-shell platform-${config.platform}`}>
      <HudShell.Header />
      <HudShell.Content layout={config.layout.content}>
        {children}
      </HudShell.Content>
      <HudShell.Orbs />
      <HudShell.Footer />
    </div>
  );
}

// Sub-components also read from context
function ContextualOrbs() {
  const { config, state } = useHudContext();
  const visibleOrbs = filterByVisibility(config.orbs.items, state);
  
  return (
    <OrbCluster position={config.layout.orbPosition}>
      {visibleOrbs.map(orb => <ActionOrb key={orb.id} {...orb} />)}
    </OrbCluster>
  );
}

function InteractiveHeader() {
  const { config, state, actions } = useHudContext();
  const visibleButtons = filterByVisibility(config.header.buttons, state);
  
  return (
    <Header>
      {visibleButtons.map(btn => (
        <HeaderButton 
          key={btn.id} 
          {...btn} 
          onClick={() => actions.togglePanel(btn.id)}
        />
      ))}
    </Header>
  );
}
```

**Slot overrides still possible:**
```tsx
// Override just one part
<HudContextProvider preset="desktop-default">
  <HudShell>
    <HudShell.Orbs>
      <CustomOrbs />  {/* Override default orbs */}
    </HudShell.Orbs>
  </HudShell>
</HudContextProvider>
```

---

### 2.6 Layer 4: Stories

**Stories are simple - just pick preset + interact:**
```tsx
// HudComplete.stories.tsx

export const DesktopDefault: Story = {
  render: () => (
    <HudContextProvider preset="desktop-default">
      <HudShell>
        <DemoContent />
      </HudShell>
    </HudContextProvider>
  ),
};

export const MobileMoba: Story = {
  render: () => (
    <HudContextProvider preset="mobile-moba">
      <HudShell>
        <DemoContent />
      </HudShell>
    </HudContextProvider>
  ),
};

// Interactive story with controls
export const Interactive: Story = {
  render: (args) => (
    <HudContextProvider 
      preset={args.preset}
      overrides={{
        domain: { active: args.domain },
        layout: { orbPosition: args.orbPosition },
      }}
    >
      <HudShell>
        <DemoContent />
      </HudShell>
    </HudContextProvider>
  ),
  argTypes: {
    preset: { control: 'select', options: Object.keys(presets) },
    domain: { control: 'select', options: ['learning', 'work', 'life', 'religion'] },
    orbPosition: { control: 'select', options: ['center', 'bottom-right', 'split', 'floating'] },
  },
};
```

---

### 2.7 File Structure

```
hud-complete/
├── index.ts                    # Public exports
├── types/
│   ├── hud-config.ts           # HudConfig, OrbConfig, etc.
│   ├── visibility-rules.ts     # VisibilityRule types
│   └── index.ts
├── presets/
│   ├── desktop-default.ts
│   ├── mobile-moba.ts
│   ├── presentation.ts
│   ├── learning-focus.ts
│   ├── work-dashboard.ts
│   └── index.ts                # Export all presets
├── context/
│   ├── HudContext.tsx
│   ├── useHudContext.ts
│   └── visibility-filter.ts    # Helper to filter by rules
├── components/
│   ├── HudShell.tsx
│   ├── StatusPanel.tsx
│   ├── InteractiveHeader.tsx
│   ├── ContextualOrbs.tsx
│   ├── ContentArea.tsx
│   └── index.ts
├── config/
│   ├── default-header-buttons.ts
│   ├── default-orbs.ts
│   └── domain-configs.ts       # What each domain shows
└── stories/
    ├── HudComplete.stories.tsx
    ├── Presets.stories.tsx
    └── Interactive.stories.tsx
```

---

### 2.8 Benefits Summary

| Requirement | How It's Met |
|-------------|--------------|
| **Presets** | `presets/` folder with ready-to-use configs |
| **Different types** | Type-safe `HudConfig` with layout, domain, orbs, features |
| **Extendable** | Add new presets, new visibility rules, new orb types |
| **AI-readable** | Clean TypeScript interfaces, JSON-like config objects |
| **Clean** | 4 clear layers, single responsibility per layer |
| **Easy to use** | `<HudContextProvider preset="mobile-moba"><HudShell /></HudContextProvider>` |
| **Context-driven** | Components read from context, react to domain/app changes |
| **Interactive** | User can change domain, toggle panels at runtime |

---

## Part 3: Navigation & Layout Controls

### 3.1 Minimap System
| Task | Description |
|------|-------------|
| [ ] Add minimap component | Port/adapt from `symbol-grid/src/features/navigation/components/Minimap/` |
| [ ] Add minimap toggle button | Position near action panel |

### 3.2 View Controls Panel
**Location**: Above minimap, right side of screen

| Control | Description |
|---------|-------------|
| [ ] Grid view toggle | Show content in grid layout |
| [ ] Basic Web Layout toggle | Switch to traditional web layout |
| [ ] Light/dark mode toggle | Move here from current position |
| [ ] Zoom/accessibility actions | New button with zoom controls |
| [ ] Pin functionality | Clarify purpose, keep in panel |

### 3.3 Action Buttons Relocation
- [ ] Move action buttons to **bottom center** (where grid editing button currently is)

---

## Part 4: View Modes System

### 4.1 View Mode Components
Create reusable components for:
- [ ] Reading level views (multiple levels)
- [ ] Content transformation options
- [ ] Interactive learning mode

### 4.2 Buttons & Alerts
| Component | Description |
|-----------|-------------|
| [ ] View mode toggle button | Pull up view mode selector |
| [ ] Learning suggestion alert | Auto notification for interactive learning based on user goals |
| [ ] Suggested actions notification | Different from learning alerts, suggests spells/recommendations |

### 4.3 Main Content Area Layouts
**Purpose**: How the main screen/content area can be divided

| Layout | Description |
|--------|-------------|
| [ ] Single panel | Full content area (default) |
| [ ] 2x2 Square grid | 4 equal panels |
| [ ] Side-by-side | 2 vertical panels |
| [ ] Stacked | 2 horizontal panels |
| [ ] Main + sidebar | Large panel + smaller side panel |
| [ ] Focus mode | Single panel, minimal HUD |
| [ ] Light/Dark split | 50/50 showing same content in both themes |

```
SINGLE:           2x2 SQUARE:        SIDE-BY-SIDE:
┌───────────┐     ┌─────┬─────┐     ┌─────┬─────┐
│           │     │  1  │  2  │     │     │     │
│  Content  │     ├─────┼─────┤     │  1  │  2  │
│           │     │  3  │  4  │     │     │     │
└───────────┘     └─────┴─────┘     └─────┴─────┘

LIGHT/DARK SPLIT:
┌─────────────────┬─────────────────┐
│                 │                 │
│   LIGHT MODE    │   DARK MODE     │
│   (preview)     │   (preview)     │
│                 │                 │
└─────────────────┴─────────────────┘
```

---

## Part 5: 4eye Brand Integration

### 5.0 Header Context System (Centralized)

**Purpose**: Manage which header buttons/items are visible based on context

**HeaderContextProvider** should control:
- Which buttons appear in header
- Button order and grouping  
- Available options within each button's popover
- Context-dependent visibility rules

**Visibility Factors**:
| Factor | Example |
|--------|---------|
| Selected Domain | Learning shows: Grade, Subject, Goals |
| Current App | Different apps show different buttons |
| User Settings | User can hide/show certain buttons |
| Layout Context | Mobile vs Desktop shows different counts |
| User Role | Teacher vs Student sees different options |

**Implementation**:
```tsx
<HeaderContextProvider
  domain={currentDomain}
  app={currentApp}
  userSettings={userPrefs}
  layout={isMobile ? 'mobile' : 'desktop'}
>
  <InteractiveHeader />
</HeaderContextProvider>
```

### 5.1 Status Bar Integration
**Challenge**: Incorporate 4eye status bar while keeping current header

**Options to explore**:
- [ ] Status bar components in header (smaller state, first version only)
- [ ] Multiple status bar sets
- [ ] Expansion on interaction

### 5.2 Experience/Progress System
| Component | State | Description |
|-----------|-------|-------------|
| [ ] 4eye pushing progress bar | Interactive | Integrate 4eye character with existing push animation |
| [ ] 4eye Chat Icon | Default: slightly desaturated | Comes alive on hover/interaction |
| [ ] Experience celebration | Conditional | 4eye pops out on large XP gain (maybe on hover only to avoid distraction) |

**Note**: Push animation for progress bar already exists - just need to add 4eye character integration

#### Progress Bar Placement Options

**Option A: Status Panel (Top-Left) - Default**
```
┌───────────────────────────────────────┐
│ [👤][💰][⭐]                          │
│ ████████░░ ← 4eye pushes here         │
│      🐾→                              │
└───────────────────────────────────────┘
```
- Compact, fits with other status metrics
- Expands to show push animation on interaction

**Option B: Full-Width Below Header - Celebration Mode**
```
┌─────────────────────────────────────────────────────────────┐
│ [Status Panel]    [Header Buttons]           [View Controls]│
├─────────────────────────────────────────────────────────────┤
│ ███████████████████░░░░░░░░  🐾→                 Level 5    │
└─────────────────────────────────────────────────────────────┘
```
- More dramatic, visible progress
- 4eye has room to animate across full width

**Option C: Above Orbs (Bottom)**
```
┌─────────────────────────────────────────────────────────────┐
│                         ██████░░░ 🐾→                       │
│                        [○] [○] [○] [○]                      │
├─────────────────────────────────────────────────────────────┤
│                      BOTTOM ACTION BAR                       │
└─────────────────────────────────────────────────────────────┘
```
- Near actions where XP is earned
- Natural animation space

**Recommendation**: Use Option A (Status Panel) for passive/default display. On reward claim or level up, temporarily expand to Option B (Full-Width) for the celebration animation, then return to compact state.

### 5.3 Interactive Header Panel
**On header interaction**:
- [ ] Drop-down panel below header
- [ ] Layout options: 1 large square, multiple panels
- [ ] Align panel sides with top bar
- [ ] Form different grid layouts

---

## Part 6: Inventory & Rewards System

### 6.1 Backpack/Inventory
- [ ] Backpack icon
- [ ] Inventory page/modal
- [ ] Item display system

### 6.2 Rewards
- [ ] Rewards from interactions
- [ ] Visual feedback for gains

---

## Part 6b: Party Profiles

**Intent**: Show active members/participants in presentations or collaborative sessions

### 6b.1 Components
| Task | Description |
|------|-------------|
| [ ] Profile image component | Support 4eye variants + real photos |
| [ ] 4eye variants | Different colors, eye pieces, decorations, shapes, levels |
| [ ] Status indicators | Speaking, viewing, away |
| [ ] Expandable panel | Collapse to icons, expand to full list |

### 6b.2 Placement
- [ ] Side panel (TBD exact position)
- [ ] Collapsible/expandable

---

## Part 6c: User Type / Role System

**Intent**: Tailor content and views based on user role

### 6c.1 Selector Component
| Task | Description |
|------|-------------|
| [ ] Role selector dropdown | General, Student, Teacher, Investor, etc. |
| [ ] Role-based config | Define what changes per role |
| [ ] Placement variants | Header, action bar, modal, main content |

### 6c.2 Role Effects
- [ ] Content priority changes
- [ ] Page ordering changes
- [ ] View styling changes
- [ ] Available actions change

### 6c.3 Goals vs Roles
- [ ] Explore goals-based alternative for general web
- [ ] Design exploration in Storybook

---

## Part 7: Navigation Components

### 7.1 Page Navigator
**Reference**: `symbol-grid` project page navigator

**Features**:
- [ ] Full list of pages
- [ ] Additional navigation tools
- [ ] Category organization

### 7.2 Full Screen Navigator
**Purpose**: Full-screen version of minimap for each site

**Features**:
| Feature | Description |
|---------|-------------|
| [ ] Full page of nav links | No header, more space |
| [ ] List view | Optimized list display |
| [ ] Grid view | Visual grid layout |
| [ ] Color-based support | Color coding for navigation |

### 7.3 Special Pages Button
**Reference**: `symbol-grid/src/utils/pageConfig.ts`
- [ ] Create reusable component
- [ ] Add to Storybook

---

## Part 8: Action Systems

### 8.1 AI Input Bar
**Intent**: AI interaction - voice, camera, text input to 4eye

| Task | Description |
|------|-------------|
| [ ] Mic button | Speech input toggle |
| [ ] Cam button | Camera/visual input |
| [ ] Text input | Type to AI |
| [ ] Language select | Source + translation |
| [ ] Trigger mechanism | Orb-triggered vs always visible (explore both) |
| [ ] Slide animation | Bar slides up from bottom or out of action bar |

### 8.2 Expandable Orbs
**Intent**: Second-level actions without cluttering screen

| Task | Description |
|------|-------------|
| [ ] Expansion trigger | Tap orb → show sub-options |
| [ ] Radial/fan pattern | Options fan around orb |
| [ ] Floating menu pattern | List appears near orb |
| [ ] Center modal pattern | Options appear center (important actions) |
| [ ] Non-disruptive design | Avoid covering main content |

### 8.3 Context-Dependent Orbs
| Context | Orbs to Show |
|---------|---------------|
| Web page | Explore, Contact, Learn More, Sign Up, Login, Pay, Clarify |
| Presentation | Next, Previous, Bookmark, Ask Question |
| Learning | Practice, Quiz, Explain, Simplify |
| AI chat active | Mic, Cam, Send, Stop |

### 8.4 Language Selection
- [ ] Global language selection action button
- [ ] Integration with AI Input Bar

---

## Part 9: Spellbook System

### 9.1 Spellbook Screens
**Purpose**: Transform content into different formats/modalities

**Transformation types**:
- [ ] Visual transformation
- [ ] Different learning modalities
- [ ] Content quality assessment
- [ ] Trustworthiness analysis

### 9.2 Spell Recommendations
- [ ] Suggested spells notification button
- [ ] Sort by recommended
- [ ] Distinct from other notification types

---

## Part 10: Action Orbs Layout

### Current State
- Located at: `4eye/packages/@expanse/shell/src/features/orbs/`
- Patterns: `right-stack`, etc.

### 10.1 Position Variants by Platform

| Platform | Recommended Position | Rationale |
|----------|---------------------|-----------|
| Mobile | Bottom-right (MOBA style) | Thumb-reachable, like Wild Rift |
| Desktop/Web | Center, above bottom bar | More screen real estate |
| Tablet | Either, user preference | Test both |

### 10.2 Layout Options
| Layout | Description |
|--------|-------------|
| [ ] Mixed sizes | Some smaller, some larger orbs |
| [ ] Variable counts | Primarily 4, but flexible |
| [ ] Split layout | Left side vs right side distinction |
| [ ] Persistent vs contextual | Always-present actions vs changing actions |
| [ ] Simple divider | Visual separation between action types |
| [ ] Horizontal row | For center-above-bar position |
| [ ] Vertical stack | For bottom-right position |
| [ ] Diamond/cluster | Grouped arrangement |
| [ ] Draggable/floating | User-positioned |

### 10.3 Nested Action Bars
- [ ] Action bar sliding in/out of another action bar. With draggable handles to push them in or out. Obviously differentiated from the other likely by size and a dividing line or similar 
- [ ] Smooth transitions

---

## Part 11: Storybook Organization

### 11.0 Documentation Pages
**Location**: `@expanse/shell/src/docs/`

| Doc | Status | Purpose |
|-----|--------|---------|
| `LayoutSystems.mdx` | Exists | Web vs Spatial paradigms overview |
| `HUD-FeatureSummary.mdx` | ✅ Created | HUD goals, components, presets |
| `HUD-Architecture.mdx` | TODO | Context system, presets, layers |

**Future**: Merge into unified Layout docs once HUD is stable.

### 11.1 Story Structure
```
Layout Systems/
├── HUD/
│   ├── Overview/
│   │   ├── Complete Demo (interactive controls)
│   │   ├── Desktop Default
│   │   ├── Mobile MOBA
│   │   └── Presentation Mode
│   ├── Platform Variants/
│   │   ├── Desktop
│   │   ├── Mobile
│   │   └── Tablet
│   ├── Orb Positions/
│   │   ├── Center (Desktop default)
│   │   ├── Bottom Right (Mobile MOBA)
│   │   ├── Split Left/Right
│   │   └── Floating Draggable
│   ├── Content Layouts/
│   │   ├── Single Panel
│   │   ├── 2x2 Grid
│   │   ├── Side by Side
│   │   ├── Stacked
│   │   ├── Main + Sidebar
│   │   ├── Focus Mode
│   │   └── Light/Dark Split
│   ├── Status Configs/
│   │   ├── Compact Header
│   │   ├── Expanded Editor
│   │   ├── Minimal Mobile
│   │   ├── Presentation
│   │   ├── Learning
│   │   └── Social
│   └── Animations/
│       ├── Celebration: Subtle
│       ├── Celebration: Medium
│       ├── Celebration: Full
│       └── Progress Bar Push
```

### 11.2 Interactive Controls
The main "Complete Demo" story should have Storybook controls for:
- [ ] Platform selector (desktop/mobile/tablet)
- [ ] Orb position dropdown
- [ ] Content layout dropdown
- [ ] Status config dropdown
- [ ] Celebration trigger buttons
- [ ] Theme toggle

### 11.3 Individual Component Stories
- [ ] ActionOrb variants
- [ ] OrbCluster layouts
- [ ] SpatialBar positions
- [ ] ActionDock items
- [ ] Header buttons
- [ ] Minimap
- [ ] Status panel states

---

## Implementation Priorities

### Phase 1: Foundation (Current Focus)
1. Create HUD demo copy with architecture
2. ~~Generic slot-based status bar~~ ✅ Already exists - add Storybook demo
3. Profile Status Display component
4. Minimap + toggle
5. View controls panel

### Phase 2: Actions & Orbs
1. Orb Group component with positions
2. Expandable orbs (radial, menu patterns)
3. Context-dependent orb config
4. AI Input Bar (mic, cam, text)
5. Action button relocation

### Phase 3: Navigation
1. Page navigator
2. Full screen navigator
3. Special pages component

### Phase 4: 4eye Integration
1. Status bar header integration
2. Chat button/icon variants
3. Progress bar animation
4. Celebration system

### Phase 5: Social & Roles
1. Party Profiles component
2. User Type / Role selector
3. Role-based view changes

### Phase 6: Inventory & Spells
1. Backpack/inventory
2. Reward system
3. Spellbook screens

---

---

## Technical Notes

### Package Locations
| Package | Path | Purpose |
|---------|------|---------|
| @expanse/shell | `4eye/packages/@expanse/shell/` | HUD, navigation, spatial components |
| brandCore | `ExpanseFrontend/packages/brandCore/` | Status bars, GSAP animations |
| symbol-grid | `ExpanseFrontend/apps/symbol-grid/` | Reference navigation implementation |

---

## Part 12: Display Items Catalog

### Purpose
Catalog of all displayable information that can appear in HUD areas. Items are interchangeable components with consistent container styling.

### Context & Location Items
| Item | Example | Display Options |
|------|---------|----------------|
| Domain | Learning, Work, Life, Religion | Symbol, text, icon |
| Context | School, Office, Home, Other ( please specify, manual entry ) | Symbol, badge |
| Location Details | Grade 10, Classroom X, Department | Breadcrumb, tags |
| Subject/Topic | Math, History, Project Alpha | Symbol, label |
| Current Page/Section | Chapter 3, Module 2 | Breadcrumb |

### Goals & Objectives
| Item | Source | Notes |
|------|--------|-------|
| User Goals | User-defined | "Improve Learning Experience" |
| App Goals | Settings-based | "Learn a second language", "Challenge me", "Grow socially" |
| Extension Goals | Plugin-defined | Third-party goal tracking |
| Progress Toward Goals | Calculated | Percentage, steps remaining |

### User Preferences (Display as Symbols)
| Preference | Options | Visual |
|------------|---------|--------|
| Communication Style | Concise, Storytelling, Detailed | Symbol icon |
| Learning Modality | Visual, Auditory, Kinesthetic, Reading | Symbol icon |
| Challenge Level | Easy, Medium, Hard, Adaptive | Symbol icon |

### Active Modes & Transformations
| Mode | Example States |
|------|---------------|
| Transformation Modes | Visual enabled, Concise enabled |
| Reading Level | Simplified, Standard, Advanced |
| Language | English, Spanish, Translation active |
| Accessibility | High contrast, Large text |

### Resources & Limits
| Item | Type |
|------|------|
| Spending Budget | Currency limit |
| Time Budget | Session/daily limits |
| Energy/Focus | Gamified resource |
| API Credits | Usage tracking |

### Social & Notifications
| Item | Notes |
|------|-------|
| Fellow Achievements | "John earned Explorer badge" |
| Announcements | System/teacher messages |
| Notifications | Alerts, reminders |
| 4eye Messages | AI companion chat |

### Status Metrics
| Item | Type |
|------|------|
| Currency/Coins | Multiple types possible |
| Experience/XP | Current + progress to next |
| Level | Current level |
| Insights Count | Collected insights |
| Streak | Days/sessions |

### Display Location Options
| Location | Best For |
|----------|----------|
| Header Status Bar | Always-visible metrics (compact) |
| Header Drop-down | Detailed status, goals, context |
| Side Panel | Extended information, lists |
| Bottom Bar | Actions, quick toggles |
| Floating Orbs | Primary actions |
| Symbol Grid | All items as navigable symbols |

---

## Part 13: Status Bar Configurations

### Variants Needed
| Config | Use Case | Content Focus |
|--------|----------|---------------|
| Compact Header | Browsing, reading | Minimal metrics |
| Expanded Editor | Creating, editing | Tools + status |
| Minimal Mobile | Small screens | Essential only |
| Presentation Mode | Demos, teaching | Clean, large |
| Learning Mode | Study sessions | Goals, progress, context |
| Social Mode | Collaboration | Achievements, chat |

---

## Part 14: Celebration System

### Trigger Levels
| Trigger | Animation Level | Description |
|---------|-----------------|-------------|
| Passive XP gain | None/Subtle | Number ticks up, brief glow |
| Task completion | Subtle | Progress bar fills, soft pulse |
| Claiming reward | Full | 4eye pops out, pushes progress bar, particles |
| Level up | Medium-Full | Celebration, can be user-preference controlled |
| Achievement unlock | Full | Worth interrupting, announcement style |
| Streak milestone | Medium | Encouraging, not disruptive |

### User Preference Control
- [ ] Setting: Celebration intensity (None, Subtle, Normal, Full)
- [ ] Setting: Allow interruptions for major achievements
- [ ] Context-aware: Reduce during focused work

---

## Open Questions (Resolved)

1. ~~**Header expansion**~~: **RESOLVED** - Tabbed panels (Status, Actions, 4eye, Goals) with interchangeable display items from catalog above
2. **Pin functionality**: Need to review in Storybook - check current demo
3. ~~**Status bar sets**~~: **RESOLVED** - 6 configurations: Compact, Expanded, Minimal, Presentation, Learning, Social
4. ~~**Experience celebration**~~: **RESOLVED** - Tiered system with user preference control

---

## Part 15: Visualization Plan

### Purpose
Create visual diagrams to ensure alignment on HUD layout and component placement.

### Diagrams to Create

#### 15.1 HUD Layout Overview (Desktop/Web)
```
┌───────────────────┐  ┌─────────────────────────────────────────┐  ┌──────────────┐
│ STATUS PANEL      │  │    INTERACTIVE HEADER BUTTONS           │  │ VIEW CONTROLS│
│ [👤][💰][⭐]      │  │ [Domain▼][Context▼][Goals▼][More▼]      │  │ [☀️][📊][🔍]│
│ → expands right   │  │ Each button → popover with options      │  │              │
└───────────────────┘  └─────────────────────────────────────────┘  └──────────────┘
│                                                                   │              │
│     LEFT PANEL                                                    │ VIEW CONTROLS│
│     - Tools                                                       │ - Grid/List  │
│     - Navigation                                                  │ - Light/Dark │
│                                                                   │ - Zoom/A11y  │
│                                                                   ├──────────────┤
│                                                                   │   MINIMAP    │
│                        MAIN CONTENT                               │   [Toggle]   │
│                                                                   │              │
│                                                                   │              │
├───────────────────────────────────────────────────────────────────┴──────────────┤
│                              [ORBS]                                              │
│                         [AI][Mic][Cam][+]                                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│                          BOTTOM ACTION BAR                                       │
│                    [Actions from old grid edit location]                         │
└──────────────────────────────────────────────────────────────────────────────────┘
```

#### 15.1b HUD Layout (Mobile - MOBA Style)
```
┌─────────────────────────────────────────────────────────────────┐
│ [👤][💰][⭐]        [Domain▼][Context▼]           [☀️][📊]     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                                                                 │
│                        MAIN CONTENT                             │
│                                                                 │
│                                                                 │
│                                                     ┌─────────┐ │
│                                                     │  [AI]   │ │
│                                                     │ [Mic]   │ │
│                                                     │ [Cam]   │ │
│                                                     │  [+]    │ │
├─────────────────────────────────────────────────────┴─────────┤
│                    BOTTOM ACTION BAR                           │
└────────────────────────────────────────────────────────────────┘
```

#### 15.1c Orb Position Variants
```
OPTION A: Bottom Right (Mobile MOBA style - Wild Rift)
┌────────────────────────────────────┐
│                          [Orbs]   │
│                            ○      │
│                           ○ ○     │
│                            ○      │
├────────────────────────────┴──────┤
│        [Bottom Bar]               │
└───────────────────────────────────┘

OPTION B: Center Above Bottom Bar (Desktop/Web)
┌───────────────────────────────────┐
│                                   │
│         ○   ○   ○   ○            │
│        [──Bottom Bar──]          │
└───────────────────────────────────┘

OPTION C: Split Left/Right
┌───────────────────────────────────┐
│  [○○]                     [○○]   │
│ Persistent            Contextual │
├───────────────────────────────────┤
│        [Bottom Bar]               │
└───────────────────────────────────┘

OPTION D: Floating Cluster (Draggable)
┌───────────────────────────────────┐
│         User-positioned           │
│              ┌───┐               │
│              │○○○│               │
│              └───┘               │
└───────────────────────────────────┘
```

#### 15.2 Interactive Header Buttons (NOT Breadcrumbs)
```
Each button is a pill with icon + label, click opens popover:

[📚 Learning ▼]  [🏫 Grade 10 ▼]  [🎯 2 Goals]  [📐 Math ▼]  [⚙️ Prefs ▼]
       ↓                ↓               ↓             ↓            ↓
  ┌────────────┐  ┌─────────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐
  │ Domains    │  │ Contexts    │  │ Goals    │  │ Topics  │  │ Prefs    │
  │ ● Learning │  │ ● School    │  │ 🔷 A     │  │ ● Math  │  │ Concise  │
  │ ○ Work     │  │ ○ Grade 9   │  │ 🔶 B     │  │ ○ Sci   │  │ Visual   │
  │ ○ Life     │  │ ○ Grade 10  │  │ + Add    │  │ ○ Eng   │  │ Audio    │
  │ ○ Religion │  │ ○ Grade 11  │  └──────────┘  └─────────┘  └──────────┘
  └────────────┘  └─────────────┘

NOTE: Which buttons appear depends on:
  - Selected domain
  - Current app
  - User settings
  - Layout context

Managed by: HeaderContextProvider (centralized layout context)
```

#### 15.2b Profile Status Display Expansion (Top-Left)
```
EXPANDED (default): [👤 Profile][💰 1,234 coins][⭐ Level 5][🔥 7d streak]
                         ↓ minimize option
COLLAPSED:          [👤][💰][⭐]  ← for focus modes
```

#### 15.3 Symbol Display System
```
Preferences as Symbols:
[📝] Concise    [📖] Storytelling    [👁] Visual    [🎧] Auditory

Active Transformations:
[✓ Visual] [✓ Concise] [○ Audio] [○ Detailed]

Domain Symbols:
[📚] Learning  [💼] Work  [🏠] Life  [⛪] Religion
```

#### 15.4 Celebration Levels Visual
```
SUBTLE:     Progress bar glows briefly
            ████████████░░░ → ████████████████ ✨

MEDIUM:     4eye peeks, thumbs up
            [Progress fills] + [4eye: 👍]

FULL:       4eye pops out, pushes bar, particles
            [4eye: 🎉 "Great job!"] + [Confetti] + [Sound]
```

### Storybook Visualization Stories
- [ ] Create story: "HUD Layout Variants" - all 6 configurations side by side
- [ ] Create story: "Display Items Gallery" - all displayable items
- [ ] Create story: "Header States" - collapsed, expanded, with different tabs
- [ ] Create story: "Celebration Animations" - all trigger levels
- [ ] Create story: "Symbol System" - preferences, domains, modes as symbols

### Interactive Review Process
1. Start Storybook (running at localhost:6006)
2. Review "Layout Systems/HUD/Overview" → "Complete HUD Demo"
3. Create new stories for each proposed layout
4. Iterate based on visual feedback

---

## Change Log

| Date | Change |
|------|--------|
| 2026-04-10 | Initial plan creation from user requirements |
| 2026-04-10 | Added: Display Items Catalog (Part 12), Status Bar Configurations (Part 13), Celebration System (Part 14), Visualization Plan (Part 15) |
| 2026-04-10 | Updated: Domain options (no Gaming), Header as interactive buttons (not breadcrumbs), HeaderContextProvider for centralized control, Orb position variants (Mobile: bottom-right MOBA style, Web: center above bottom bar), Multiple layout diagrams |
| 2026-04-10 | Marked Part 1 (Status Bar System) as ALREADY IMPLEMENTED - only need Storybook demo |

