# @expanse/shell Core Concepts

> This document defines the fundamental architecture concepts.  
> See [ARCHITECTURE.md](./ARCHITECTURE.md) for implementation details.  
> See [DICTIONARY.md](./DICTIONARY.md) for terminology definitions.

---

## Hierarchy

```
Layout Paradigm (highest level)
    └── Spatial Layout | Basic Web Layout | Mobile Layout
            │
            ├── HUD / Chrome (action bars, minimap, controls)
            │   └── Floats on top of content (Spatial) or pushes content (Basic)
            │
            └── Tiles / Pages (the actual content)
                └── Rendered by Next.js/app
```

---

## Core Concepts

### Layout Paradigms
The overall application structure pattern. Determines navigation system and chrome behavior.

| Paradigm | Navigation | Chrome |
|----------|------------|--------|
| **Spatial** | MapGridNavigation (x,y positions) | HUD: floating action bars, minimap, orbs |
| **Basic Web** | Route-based, URL paths | ContentFrame: header, footer, sidebars (push content) |
| `mobile` | Tab + stack based | Tab bar, navigation stack |

### Map
The **conceptual navigation surface** for Spatial Layout - like a game map. The Map model defines:
- Position grid (x, y coordinates)
- Anchor slots for HUD components (top, bottom, left, right, corners)
- Minimap display area
- Floating controls

**Map is a concept, not a component** - it represents the spatial model that tiles exist within.

### HUD (Heads-Up Display)
The floating overlay layer in Spatial Layout. Contains action bars, orbs, minimap, navigation controls. HUD components use `position: fixed` and do NOT push content—they float over it.

### Tiles
The **actual pages/main content**. Each tile has:
- Position (`{ x, y }`)
- Metadata (SEO, display config, route)
- Content (React component, rendered by Next.js)

The Map chrome displays **over** the active tile.

### Action Bars
UI bars positioned in HUD slots. Variants include:
- **NavBar**: Navigation items derived from tile config
- **Toolbar**: Tool/mode selection (radio behavior - one active)
- **SettingsBar**: Toggle controls (checkbox behavior - multiple on/off)
- **StatusBar**: Display-only (XP, currency, progress)

### Header
Global context bar at the top. Contains branding, domain switcher, user menu. Header is **separate from ActionBars** because it's global scope and rarely changes.

### Docks
Corner-positioned containers that group ActionBars or quick-access buttons.
- **ActionDock**: Groups buttons at corners (top-left, top-right, bottom-left, bottom-right)

### Navigation
Generic interface with paradigm-specific adapters:

```
NavigationProvider (generic interface)
    │
    ├── navigate(target)
    ├── goBack()
    ├── canNavigate(target)
    │
    └── Adapters:
        ├── MapGridNavigation → position: {x,y}, directional movement (Spatial)
        ├── StandardNavigation → path-based routing (Basic Web)
        └── MobileNavigation  → tab + stack
```

---

## Visual Representation

### Spatial Layout (with HUD)
```
┌────────────────────────────────────────────┐
│         Header (global context)            │  ← HUD (fixed)
├────────────────────────────────────────────┤
│              ActionBar (top)               │  ← HUD (fixed)
├────────────────────────────────────────────┤
│                                            │
│                                            │
│              TILE CONTENT                  │  ← Rendered by Next.js
│            (active position)               │
│                                            │
│                                            │
├────────────────────────────────────────────┤
│ ┌──────┐          ActionBar (bottom)       │  ← HUD (fixed)
│ │Mini  │     [Nav] [Nav] [Nav] [Nav]       │
│ │ map  │                                   │
│ └──────┘                                   │
└────────────────────────────────────────────┘
```

### Basic Web Layout (with ContentFrame)
```
┌────────────────────────────────────────────┐
│                  Header                    │  ← Pushes content
├────────┬───────────────────────┬───────────┤
│        │                       │           │
│ Drawer │     PAGE CONTENT      │  Sidebar  │  ← Content flows
│        │     (route-based)     │           │
│        │                       │           │
├────────┴───────────────────────┴───────────┤
│                  Footer                    │  ← Pushes content
└────────────────────────────────────────────┘
```

---

## Provider Architecture

```tsx
<LayoutProvider layoutType="spatial" config={config}>
  {/* NavigationProvider is composed internally */}
  {/* Uses MapGridNavigation adapter when layoutType="spatial" */}
  
  <HUD>
    {/* Header, Action bars, minimap - floats on top */}
  </HUD>
  
  {children} {/* Tile content from Next.js */}
</LayoutProvider>
```

---

## Key Distinctions

| Concept | Is | Is NOT |
|---------|-----|--------|
| **Layout Paradigm** | Pattern selection (Spatial/Basic Web/Mobile) | A component |
| **Map** | Conceptual navigation surface | A visible component |
| **HUD** | Floating overlay layer (Spatial) | Content-pushing frame |
| **Tiles** | The actual pages/content | Part of the HUD |
| **Navigation** | Generic interface with adapters | Tied to one paradigm |
| **Action Bars** | UI in HUD slots | The navigation system |

---

## Terminology Reference

| Term | Definition |
|------|------------|
| **Map** | Conceptual navigation surface for Spatial Layout |
| **Tile** | A page/content unit with position and metadata |
| **HUD** | Heads-Up Display - floating overlay layer |
| **ContentFrame** | Structural shell that pushes content (Basic Web) |
| **Slot** | Anchor position for HUD components (top, bottom-center, etc.) |
| **Layer** | Stacking order for multiple bars at same slot (0, 1, 2) |
| **Adapter** | Navigation implementation for specific paradigm |

> For complete terminology, see [DICTIONARY.md](./DICTIONARY.md)
