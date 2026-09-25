# HUD Type System & Architecture

> **Status:** ✅ Implemented (Phase 0)  
> **Priority:** High - Foundation for all other phases  
> **Location:** `@expanse/shell/src/hud-complete/`

---

## Overview

The HUD type system provides the foundation for the entire HUD configuration system.
It defines type-safe interfaces for all HUD components, enabling:
- Preset-based configuration
- Runtime state management
- Visibility rules
- Platform-specific variants

## Architecture

### 4-Layer Design

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: STORIES                                           │
│  Pick preset + optionally override with Storybook controls  │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3: COMPONENTS                                        │
│  HudShell, InteractiveHeader, ContextualOrbs, etc.          │
│  → Components read from context, not props                  │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2: CONTEXT                                           │
│  HudContextProvider manages config + runtime state          │
│  → Provides actions to change state                         │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1: CONFIG / PRESETS (✅ Implemented)                 │
│  Type-safe interfaces + preset configurations               │
│  → AI-readable, extendable, importable                      │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
hud-complete/
├── index.ts              # Public exports
├── types/
│   ├── hud-config.ts     # All type definitions
│   └── index.ts
├── config/
│   ├── default-header-buttons.ts
│   ├── default-orbs.ts
│   └── index.ts
├── presets/
│   ├── desktop-default.ts
│   ├── mobile-moba.ts
│   ├── presentation.ts
│   ├── learning-focus.ts
│   ├── work-dashboard.ts
│   ├── social-collab.ts
│   └── index.ts
├── context/              # Phase 1
└── components/           # Phase 2+
```

---

## Core Types

### HudConfig

The main configuration interface. Defines a complete HUD preset.

```ts
interface HudConfig {
  // Identity
  id: string;
  name: string;
  description?: string;
  
  // Platform
  platform: "desktop" | "mobile" | "tablet";
  
  // Configuration sections
  layout: LayoutConfig;
  domain: DomainConfig;
  header: HeaderConfig;
  orbs: OrbsConfig;
  features: FeaturesConfig;
}
```

### LayoutConfig

Controls the visual layout of the HUD.

| Field | Type | Description |
|-------|------|-------------|
| `content` | `ContentLayout` | How main content area is divided (single, grid-2x2, etc.) |
| `orbPattern` | `OrbPattern` | Orb arrangement (bottom-row, right-stack, etc.) |
| `statusConfig` | `StatusConfig` | Status display mode (compact, expanded, etc.) |
| `showMinimap` | `boolean` | Show minimap (desktop only) |
| `showViewControls` | `boolean` | Show view controls panel |

### Content Layouts

| Layout | Description | Use Case |
|--------|-------------|----------|
| `single` | Full content area | Default, most screens |
| `grid-2x2` | 4 equal panels | Multi-view, comparison |
| `side-by-side` | 2 vertical panels | Split view |
| `stacked` | 2 horizontal panels | Top/bottom split |
| `main-sidebar` | Large + small panel | Primary + secondary content |
| `focus` | Single panel, minimal HUD | Distraction-free mode |
| `light-dark-split` | Theme comparison | Design preview |

### HeaderConfig

Controls header buttons and states.

| Field | Type | Description |
|-------|------|-------------|
| `buttons` | `HeaderButtonConfig[]` | Available header buttons |
| `displayState` | `HeaderDisplayState` | Current display mode |
| `expandable` | `boolean` | Can expand/contract |
| `partyDisplay` | `"replace" \| "split" \| "overlay"` | Party view behavior |

### Header Display States

17 states for different contexts:

- **Core**: `default`, `party`, `achievement`, `quest`, `interactive`
- **Learning**: `learning-quiz`, `learning-progress`, `learning-feedback`
- **Communication**: `notification`, `announcement`, `feedback`
- **AI**: `ai-communication`, `ai-response`
- **Special**: `celebration`, `progress-push`, `presentation`, `error`

### OrbsConfig

Controls action orbs.

| Field | Type | Description |
|-------|------|-------------|
| `items` | `OrbConfig[]` | All available orbs |
| `persistent` | `string[]` | IDs of always-shown orbs |
| `contextual` | `string[]` | IDs of context-dependent orbs |

### FeaturesConfig

Feature toggles.

| Field | Type | Description |
|-------|------|-------------|
| `celebrations` | `CelebrationLevel` | Animation intensity |
| `aiInputBar` | `boolean` | Show AI input bar |
| `actionLists` | `boolean` | Show available actions |
| `spellbook` | `boolean` | Enable content transformation |
| `inventory` | `boolean` | Show inventory/backpack |
| `speechToText` | `boolean` | Enable STT |

---

## Visibility Rules

Conditional display based on runtime state.

```ts
interface VisibilityRule {
  field: "domain" | "app" | "platform" | "userRole" | "headerState" | "feature";
  equals?: string | string[];
  notEquals?: string | string[];
  isTrue?: boolean;
  isFalse?: boolean;
}
```

**Example:**
```ts
// Show only in learning domain
visibleWhen: [{ field: "domain", equals: "learning" }]

// Show except on mobile
visibleWhen: [{ field: "platform", notEquals: "mobile" }]

// Show when feature is enabled
visibleWhen: [{ field: "feature", equals: "gamification" }]
```

---

## Presets

6 presets implemented:

| Preset ID | Platform | Use Case | Key Features |
|-----------|----------|----------|--------------|
| `desktop-default` | desktop | General browsing | Full features, minimap |
| `mobile-moba` | mobile | Mobile apps | Right-stack orbs, minimal header |
| `presentation` | desktop | Demos, teaching | Clean, party-ready |
| `learning-focus` | desktop | Study sessions | Goals prominent, learning orbs |
| `work-dashboard` | desktop | Productivity | Professional, main+sidebar |
| `social-collab` | desktop | Group work | Party profiles, side-by-side |

### Using Presets

```ts
import { presets, getPreset, isPresetId } from "@expanse/shell";

// Get a preset
const config = presets["desktop-default"];

// Type-safe getter
const config = getPreset("learning-focus");

// Validate user input
if (isPresetId(userInput)) {
  const config = getPreset(userInput);
}
```

---

## Type Reuse

The HUD system reuses types from existing modules:

| Type | Source | Description |
|------|--------|-------------|
| `OrbColor` | `hud-components/orbs` | Valid orb colors |
| `OrbPattern` | `hud-components/orbs` | Orb arrangement patterns |
| `OrbSize` | `hud-components/orbs` | Orb size options |

Import from hud-complete for convenience:
```ts
import type { OrbColor, OrbPattern, OrbSize } from "@expanse/shell/hud-complete";
```

---

## HudState (Runtime)

Separate from config - values that change during use:

```ts
interface HudState {
  activeDomain: Domain;
  activeHeaderTab: string | null;
  expandedPanels: string[];
  headerDisplayState: HeaderDisplayState;
  celebrationQueue: CelebrationEvent[];
  userRole: UserRole;
  collapsed: boolean;
}
```

Managed by `HudContextProvider` (Phase 1).

---

## Next Steps

Phase 0 is complete. Next:

1. **Phase 1: Context** - Create `HudContextProvider` and `useHudContext`
2. **Phase 2: Header** - Interactive header with popovers
3. **Phase 3: Orbs** - Connect orbs to context
4. **Phase 4: Layouts** - Content area variants
5. **Phase 5: Status** - Status configurations
6. **Phase 6: Stories** - Complete Storybook demo (MVP)

---

## References

- [hud-summary.md](../hud-summary.md) - Feature descriptions
- [hud-roadmap.md](../hud-roadmap.md) - Implementation phases
- [hud-plan.md](../hud-plan.md) - Architecture details
- [OrbCluster types](../../../src/hud-components/orbs/types.ts) - Shared orb types
