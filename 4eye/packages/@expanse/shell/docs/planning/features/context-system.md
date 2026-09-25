# HUD Context System

> **Status:** ✅ Implemented (Phase 1)  
> **Priority:** High - Required for all HUD components  
> **Location:** `@expanse/shell/src/hud-complete/context/`

---

## Overview

The HUD Context System provides centralized state management for the entire HUD.
Components read configuration and state from context, enabling:
- Preset-driven configuration
- Runtime state changes (domain, header state, etc.)
- Visibility filtering for buttons/orbs
- Actions to modify state

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   HudContextProvider                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  config: HudConfig (from preset + overrides)            ││
│  │  state: HudState (runtime values)                       ││
│  │  actions: HudActions (state modifiers)                  ││
│  └─────────────────────────────────────────────────────────┘│
│                           │                                  │
│              ┌────────────┼────────────┐                     │
│              ▼            ▼            ▼                     │
│         HudShell    InteractiveHeader  ContextualOrbs       │
│         (reads)         (reads)        (reads)              │
└─────────────────────────────────────────────────────────────┘
```

## Usage

### Basic Usage

```tsx
import { HudContextProvider, HudShell, useHudContext } from '@expanse/shell';

// Wrap your app with the provider
function App() {
  return (
    <HudContextProvider preset="desktop-default">
      <HudShell>
        <MyContent />
      </HudShell>
    </HudContextProvider>
  );
}

// Access context in any component
function MyContent() {
  const { config, state, actions } = useHudContext();
  
  return (
    <div>
      <p>Current domain: {state.activeDomain}</p>
      <button onClick={() => actions.setDomain('work')}>
        Switch to Work
      </button>
    </div>
  );
}
```

### With Overrides

```tsx
<HudContextProvider
  preset="desktop-default"
  overrides={{
    domain: { active: 'work' },
    features: { celebrations: 'subtle' },
  }}
>
  <HudShell>
    <MyContent />
  </HudShell>
</HudContextProvider>
```

### Custom Configuration

```tsx
<HudContextProvider config={myCustomConfig}>
  <HudShell>
    <MyContent />
  </HudShell>
</HudContextProvider>
```

---

## API Reference

### HudContextProvider

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `preset` | `PresetId` | Preset to use (default: `"desktop-default"`) |
| `overrides` | `HudConfigOverrides` | Partial config to merge with preset |
| `config` | `HudConfig` | Full custom config (ignores preset) |
| `initialState` | `Partial<HudState>` | Override initial state |
| `onDomainChange` | `(domain) => void` | Callback when domain changes |
| `onHeaderStateChange` | `(state) => void` | Callback when header state changes |
| `onCelebration` | `(event) => void` | Callback when celebration triggers |

### useHudContext

Returns the full context value:

```ts
const {
  config,    // HudConfig - current configuration
  state,     // HudState - runtime state
  actions,   // HudActions - state modifiers
  presetId,  // string | null - original preset ID
  isReady,   // boolean - true when provider mounted
} = useHudContext();
```

### HudState

Runtime state that changes during use:

| Field | Type | Description |
|-------|------|-------------|
| `activeDomain` | `Domain` | Current domain |
| `activeHeaderTab` | `string \| null` | Open header popover |
| `expandedPanels` | `string[]` | IDs of expanded panels |
| `headerDisplayState` | `HeaderDisplayState` | Current header state |
| `celebrationQueue` | `CelebrationEvent[]` | Pending celebrations |
| `userRole` | `UserRole` | Current user role |
| `collapsed` | `boolean` | HUD minimized state |

### HudActions

Available actions:

| Action | Signature | Description |
|--------|-----------|-------------|
| `setDomain` | `(domain: Domain) => void` | Change active domain |
| `setHeaderState` | `(state: HeaderDisplayState) => void` | Change header state |
| `togglePanel` | `(id: string) => void` | Toggle panel expanded |
| `expandPanel` | `(id: string) => void` | Expand a panel |
| `collapsePanel` | `(id: string) => void` | Collapse a panel |
| `setActiveHeaderTab` | `(id: string \| null) => void` | Set active popover |
| `triggerCelebration` | `(event: CelebrationEvent) => void` | Queue celebration |
| `clearCelebration` | `() => void` | Clear next celebration |
| `setUserRole` | `(role: UserRole) => void` | Set user role |
| `toggleCollapsed` | `() => void` | Toggle HUD collapsed |
| `resetConfig` | `() => void` | Reset to original preset |

---

## Derived Hooks

Convenience hooks for specific use cases:

### useDomain

```ts
const { current, available, setDomain } = useDomain();
```

### useHeaderState

```ts
const {
  displayState,
  activeTab,
  expandable,
  partyDisplay,
  setDisplayState,
  setActiveTab,
} = useHeaderState();
```

### useVisibleHeaderButtons

```ts
const buttons = useVisibleHeaderButtons();
// Returns only buttons that pass visibility rules
```

### useVisibleOrbs

```ts
const { persistent, contextual } = useVisibleOrbs();
// Returns orbs split by category
```

### useFeatureEnabled

```ts
const hasAiBar = useFeatureEnabled('aiInputBar');
```

### useCelebrations

```ts
const { queue, next, level, trigger, clear } = useCelebrations();
```

### useLayoutConfig

```ts
const {
  content,
  orbPattern,
  statusConfig,
  showMinimap,
  showViewControls,
  platform,
  collapsed,
} = useLayoutConfig();
```

### usePanelState

```ts
const { isExpanded, toggle, expand, collapse } = usePanelState('settings');
```

---

## Visibility Filtering

Items (buttons, orbs) can have `visibleWhen` rules:

```ts
// Show only in learning domain
visibleWhen: [{ field: "domain", equals: "learning" }]

// Show except on mobile
visibleWhen: [{ field: "platform", notEquals: "mobile" }]

// Show when feature is enabled
visibleWhen: [{ field: "feature", equals: "gamification" }]
```

### Using the Filter

```ts
import { filterHeaderButtons, filterOrbs, getVisibleOrbs } from '@expanse/shell';

// Filter buttons
const visible = filterHeaderButtons(buttons, state, { features: ['gamification'] });

// Filter orbs
const visible = filterOrbs(orbs, state, { app: 'presentation' });

// Get orbs split by category
const { persistent, contextual } = getVisibleOrbs(orbsConfig, state);
```

---

## HudShell Component

Basic container that reads from context:

```tsx
<HudShell
  header={<InteractiveHeader />}
  orbs={<ContextualOrbs />}
  footer={<ActionBar />}
  minimap={<Minimap />}
  viewControls={<ViewControls />}
>
  <MainContent />
</HudShell>
```

### Compound Components

```tsx
<HudShell>
  <HudShell.Header>
    <MyHeader />
  </HudShell.Header>
  
  <HudShell.Content>
    <MyContent />
  </HudShell.Content>
  
  <HudShell.Orbs>
    <OrbCluster items={orbs} />
  </HudShell.Orbs>
  
  <HudShell.Footer>
    <ActionBar />
  </HudShell.Footer>
</HudShell>
```

---

## Files

```
context/
├── index.ts              # Module exports
├── HudContext.ts         # Context definition, types, defaults
├── HudContextProvider.tsx # Provider component with reducer
├── useHudContext.ts      # Main hook + derived hooks
└── visibility-filter.ts  # Visibility rule evaluation
```

---

## Next Steps

Phase 1 complete. Next phases:

- **Phase 2**: Interactive header with popovers
- **Phase 3**: Orb integration with context
- **Phase 4**: Content layout variants
- **Phase 5**: Status configurations
- **Phase 6**: Complete presets & Storybook demo (MVP)

---

## References

- [types-architecture.md](./types-architecture.md) - Type definitions
- [hud-summary.md](../hud-summary.md) - Feature descriptions
- [hud-roadmap.md](../hud-roadmap.md) - Implementation phases
