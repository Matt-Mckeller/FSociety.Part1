# Contextual Orbs System Feature Spec

> Phase 3 of HUD Implementation | Status: ✅ Complete

## Overview

The Contextual Orbs system provides floating action buttons arranged in configurable layouts around the screen. Orbs are filtered based on visibility rules from HudContext, and can be persistent (always visible) or contextual (shown based on current state).

## Components Created

### 1. ContextualOrbs
**Path:** `src/hud-complete/components/orbs/ContextualOrbs.tsx`

Main container component that reads orb configuration from HudContext.

**Features:**
- Reads visible orbs from `useVisibleOrbs()` hook (pre-filtered by visibility rules)
- Supports 8 screen positions (corners, edges, centers)
- Auto-selects layout pattern based on position
- Color mode support (light/dark/auto)
- Icon resolver callback for custom icon mapping
- Click handler callback with orb ID and action

**Props:**
```typescript
interface ContextualOrbsProps {
  position?: OrbPosition;                           // Screen position
  layout?: OrbPattern;                              // Layout pattern
  size?: OrbSize;                                   // xs | sm | md | lg | xl
  shape?: OrbShape;                                 // circle | square | diamond | hexagon | pill
  variant?: OrbVariant;                             // glass | solid | glow | pulse | outline
  colorMode?: OrbColorMode;                         // light | dark | auto
  showPersistent?: boolean;                         // Show persistent orbs
  showContextual?: boolean;                         // Show contextual orbs
  containerWidth?: number;                          // Container width for layouts
  containerHeight?: number;                         // Container height
  spacing?: number;                                 // Spacing between orbs
  overlapping?: boolean;                            // Allow overlap
  overlapPercent?: number;                          // Overlap amount
  onOrbClick?: (orbId: string, action: string) => void;
  iconResolver?: (iconName: string) => ReactNode;   // Icon name to component
  sx?: SxProps<Theme>;
}
```

**Screen Positions:**
- `bottom-left`, `bottom-right`, `bottom-center`
- `top-left`, `top-right`, `top-center`
- `left-center`, `right-center`

### 2. OrbClusterManager
**Path:** `src/hud-complete/components/orbs/OrbClusterManager.tsx`

State management for orb cluster interactions.

**Features:**
- Collapse/expand state for cluster
- Sub-action expansion (expandable orbs)
- Hover and active orb tracking
- Drag-to-reposition support
- Custom position persistence
- Animation state tracking
- Tooltip visibility toggle

**State:**
```typescript
interface OrbClusterState {
  isCollapsed: boolean;                             // Cluster collapsed
  expandedOrb: ExpandedOrbState | null;             // Currently expanded orb
  hoveredOrbId: string | null;                      // Hovered orb
  activeOrbId: string | null;                       // Pressed orb
  dragState: OrbDragState | null;                   // Drag in progress
  customPosition: { x: number; y: number } | null;  // Custom position
  showTooltips: boolean;                            // Tooltip visibility
  animationState: 'idle' | 'expanding' | 'collapsing' | 'dragging';
}
```

**Hooks Provided:**
- `useOrbClusterManager()` - Full state and actions
- `useOrbClusterCollapse()` - Collapse state only
- `useExpandedOrb()` - Expanded orb state
- `useOrbDrag()` - Drag state and handlers
- `useOrbInteraction()` - Hover/active state

### 3. Orb Positioning Utilities
**Path:** `src/hud-complete/components/orbs/orbPositioning.ts`

Functions for calculating orb positions in various layouts.

**Layout Calculators:**
```typescript
// Arc layouts
calculateBottomArcPositions(params: LayoutParams): Position[]
calculateTopArcPositions(params: LayoutParams): Position[]
calculateArcPositions(params: ArcParams): Position[]

// Stack layouts
calculateStackPositions(params: LayoutParams, side: 'left' | 'right'): Position[]

// Row layouts
calculateRowPositions(params: LayoutParams, vertical: 'top' | 'center' | 'bottom'): Position[]

// Other layouts
calculateRadialPositions(params: LayoutParams): Position[]
calculateCornerPositions(params: LayoutParams): Position[]
calculateDiagonalPositions(params: LayoutParams, corner: 'top-left' | 'top-right'): Position[]

// Pattern router
calculatePositionsForPattern(pattern: OrbPattern, params: LayoutParams): Position[]
```

**Animation Helpers:**
```typescript
// Interpolate between position sets
interpolatePositions(from: Position[], to: Position[], progress: number): Position[]

// Easing function
easeInOutCubic(t: number): number

// Spring physics
spring(current: number, target: number, velocity: number, stiffness?: number, damping?: number): { value: number; velocity: number }
```

**Overlap Adjustment:**
```typescript
applyOverlap(positions: Position[], overlapPercent: number, orbSize: number, direction: 'horizontal' | 'vertical' | 'radial'): Position[]
```

## Integration with HudContext

The orb system integrates with visibility rules:

```tsx
// OrbConfig with visibility rules
const learnMoreOrb: OrbConfig = {
  id: "learn-more",
  icon: "School",
  action: "learnMore",
  label: "Learn More",
  color: "cyan",
  visibleWhen: [
    { field: "domain", equals: "learning" },
  ],
};

// Context provides filtered orbs
const { persistent, contextual } = useVisibleOrbs();
// persistent: always-shown orbs
// contextual: domain/state-specific orbs
```

## Usage Example

```tsx
import {
  HudContextProvider,
  ContextualOrbs,
  OrbClusterManagerProvider,
} from "@expanse/shell";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Icon resolver for string → ReactNode
const iconResolver = (name: string) => {
  const icons: Record<string, ReactNode> = {
    AutoAwesome: <AutoAwesomeIcon />,
    // ... other icons
  };
  return icons[name] ?? null;
};

function App() {
  const handleOrbClick = (orbId: string, action: string) => {
    console.log(`Orb clicked: ${orbId}, action: ${action}`);
  };

  return (
    <HudContextProvider preset="desktop-default">
      <OrbClusterManagerProvider>
        <ContextualOrbs
          position="bottom-right"
          layout="bottom-arc"
          size="md"
          colorMode="dark"
          iconResolver={iconResolver}
          onOrbClick={handleOrbClick}
        />
      </OrbClusterManagerProvider>
    </HudContextProvider>
  );
}
```

## Layout Patterns

| Pattern | Description | Best Position |
|---------|-------------|---------------|
| `bottom-arc` | Arc sweeping up from bottom | `bottom-*` |
| `top-arc` | Arc sweeping down from top | `top-*` |
| `left-stack` | Vertical stack on left edge | `left-center` |
| `right-stack` | Vertical stack on right edge | `right-center` |
| `bottom-row` | Horizontal row at bottom | `bottom-center` |
| `radial` | Circle around center | any |
| `corners` | 4 corners (max 4 orbs) | any |
| `diagonal-tl` | Diagonal from top-left | any |
| `diagonal-tr` | Diagonal from top-right | any |
| `custom` | User-provided positions | any |

## Relationship to Existing Components

The hud-complete orbs system builds on existing hud-components:

- **ActionOrb** (`hud-components/orbs/ActionOrb.tsx`) - Single orb rendering
- **OrbCluster** (`hud-components/orbs/OrbCluster.tsx`) - Basic cluster layout
- **Types** (`hud-components/orbs/types.ts`) - OrbSize, OrbColor, OrbPattern, etc.

ContextualOrbs adds:
- HudContext integration for visibility filtering
- Screen positioning (fixed position with configurable location)
- State management for interactions
- Additional positioning utilities

## Files Created

| File | Purpose |
|------|---------|
| `orbs/ContextualOrbs.tsx` | Main container with context integration |
| `orbs/OrbClusterManager.tsx` | State management context |
| `orbs/orbPositioning.ts` | Position calculation utilities |
| `orbs/index.ts` | Module exports |
| `components/index.ts` | Updated with orb exports |

## Exports

```typescript
// Components
export { ContextualOrbs, convertOrbConfigToItem };

// State Manager
export { OrbClusterManagerProvider };
export { useOrbClusterManager, useOrbClusterCollapse, useExpandedOrb, useOrbDrag, useOrbInteraction };

// Positioning
export { calculatePositionsForPattern, calculateArcPositions, ... };
export { applyOverlap, interpolatePositions, easeInOutCubic, spring };
export { getOrbSizeInPx };

// Types
export type { ContextualOrbsProps, OrbPosition };
export type { OrbClusterState, OrbClusterActions, ExpandedOrbState, OrbDragState };
export type { Position, LayoutParams, ArcParams };
```

## Next Steps (Phase 4)

The orb system is complete. Next phase focuses on:
- **Layout Variants** - Different HUD layouts (standard, compact, fullscreen)
- Screen layout configuration
- Responsive breakpoint handling
