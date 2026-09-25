# Minimap Dual-Cursor Navigation System

> **Status**: In progress — Phase 1 (origin dot + destination dot + travel animation) active
> **Package**: `@expanse/shell` → `minimap-full/`
> **Storybook**: `hud-map-minimap-full-view-overlay--*`

---

## Overview

Two live cursors on the full-screen minimap work together to tell the user's story:
- **Origin dot** — *where you are now* — animated beacon that pulses toward the destination
- **Destination dot** — *where you're heading* — static marker with progress arc, no pulse

Both dots double as **progress meters**: ring fill and color encode 0 % → 100 % tile visit completion. All dots are hoverable for a tooltip with details.

---

## Visual Language

```
┌────────────────────────────────────────┐
│  [A] ──── directional pulse ────▶ [B] │
│   ↑                                 ↑  │
│ origin dot                  destination │
│ (you are here)              (next stop) │
│ P4 beacon rings                static   │
│ biased toward B             progress    │
│                               ring      │
└────────────────────────────────────────┘
```

Position: Both dots sit **below the tile chip** (below the label in `iconAndLabel` mode, directly below the chip in `titleOnTile` mode). Centered horizontally under the tile.

---

## Dot A — Origin (Current Location)

### Phase machine
```
"intro"  ──(lockDuration ms)──▶  "locked"
   ↑
resets when navigated to a new tile (position changes)
```

### Phase 1 — Target Lock (intro)
- 4 corner crosshair brackets start at ~1.8× tile width, converge to tile edges
- Center cross blazes at ~70% through the sweep
- Duration: configurable (`lockDuration`, default `1.1s`)
- One-shot (`animationIterationCount: 1`, `animationFillMode: "forwards"`)

### Phase 2 — Beacon (locked)
- Glowing dot at anchor point (8px circle, `boxShadow` glow)
- Two P4-style rings, 350ms stagger, 5.5s cycle (ba-dum then ~3s silence)
- **Directional bias**: rings are clipped to a sector angled toward the destination dot
  - Sector width: ±70° (140° wedge) centered on the θ angle to destination
  - When no destination: full 360° rings (no clip)
  - Clip implemented via `clip-path: polygon(50% 50%, <computed sector points>)`

### Navigation travel animation
- When `position` changes, the anchor `left`/`top` CSS properties transition instead of jumping
- Easing: `cubic-bezier(0.34, 1.56, 0.64, 1)` — spring overshoot (snappy, satisfying)
- Duration: `~0.45s`
- After arrival: phase resets to `"intro"` → Target Lock plays at new position
- The destination dot fades out as origin arrives

---

## Dot B — Destination (Navigation Target)

### Appearance
- Small circle (5–6px), no radar pulse
- Progress ring: thin arc drawn 0–360° proportional to `visitProgress` (0–1)
  - 0% — dim outline only
  - 1–99% — arc fills clockwise in accent color
  - 100% — full ring + warm gold glow

### States
| Progress | Ring | Dot color | Glow |
|---|---|---|---|
| 0 % | outline only (20% opacity) | dim gray | none |
| 1–99 % | partial arc (clockwise) | accent | subtle |
| 100 % | full ring | gold `#f59e0b` | warm |

### Interaction
- `pointerEvents: "auto"` (unlike origin dot)
- Hover → MUI `Tooltip` shows: tile name, visit %, last visited date
- Origin dot also hoverable (same tooltip schema)

---

## Progress Meter — All Tiles (Future Phase)

All tiles (not just active/destination) can optionally show a tiny progress pip:
- `showTileProgress?: boolean` prop on `MinimapFullGrid`
- `tileProgress: Record<string, number>` — keyed `"${x},${y}"`, value 0–1
- Mini pip (3–4px dot) below each chip, color-coded by completion tier:
  - Unvisited → transparent / no pip
  - 1–49% → dim accent
  - 50–99% → full accent
  - 100% → gold

When origin dot or destination dot is on a tile, the pip is replaced by the full dot (same position, no duplication).

---

## Data Model

```ts
// MinimapFullGrid new props
tileProgress?: Record<string, number>      // "x,y" → 0–1
destinationPosition?: { x: number; y: number }  // grid coords

// PlayerLocationBlip new props  
destinationPx?: { x: number; y: number }   // pixel coords for directional pulse
phase?: "intro" | "locked"                 // controlled externally OR internal timer
lockDuration?: number                      // ms, default 1100
onLocked?: () => void                      // callback when intro completes
```

---

## Component Architecture

```
MinimapFullGrid
├── MinimapTileGrid (tiles, chevrons, hover preview)
├── OriginDot        ← was PlayerLocationBlip (redesigned)
│   ├── intro: CrosshairLockOn
│   └── locked: DirectionalBeacon (P4 rings + sector clip)
└── DestinationDot   ← new component
    ├── ProgressRing (SVG arc)
    └── Tooltip (MUI)
```

**File locations**:
- `packages/@expanse/shell/src/map-and-navigation/minimap-full/PlayerLocationBlip.tsx` — redesign in place
- `packages/@expanse/shell/src/map-and-navigation/minimap-full/DestinationDot.tsx` — new file
- `packages/@expanse/shell/src/map-and-navigation/minimap-full/index.ts` — add DestinationDot export

---

## Implementation Phases

### Phase 1 (current) ✅ / 🔧 In progress
- [x] Origin dot: 4 static variant blips (ping/sonar/beacon/crosshair)
- [ ] Origin dot: Target Lock intro + P4 beacon locked phases
- [ ] Origin dot: directional pulse toward destination
- [ ] Navigation travel animation (spring ease on coordinates)
- [ ] Destination dot: static marker + progress ring
- [ ] Repositioned below tile chip bottom edge
- [ ] Storybook story: `BlipTargetLock`

### Phase 2
- [ ] All-tile progress pips (`showTileProgress` + `tileProgress` prop)
- [ ] Tooltip on hover for origin + destination dots
- [ ] `onLocked` callback for external phase control
- [ ] Re-trigger on tile navigate (prop: `retriggerOnNavigate`, default true)

### Phase 3
- [ ] Path/route visualization (line connecting origin → destination)
- [ ] Multi-stop route (ordered array of waypoints)
- [ ] Animated "trail" left by the origin dot as it travels

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Intro speed | 1.1s default | Deliberate and satisfying |
| Locked color shift | amber/gold when locked | Confirms the lock visually |
| Re-trigger on navigate | yes | Great navigation feedback |
| Directional pulse impl | `clip-path` sector | Pure CSS, no canvas |
| Travel animation impl | CSS `transition` on `left/top` + spring easing | Simple, smooth, reversible |
| Destination pulse | none (static) | Avoids visual noise; origin owns the energy |

---

## Key Constants (tunable)

```ts
const LOCK_DURATION_MS  = 1100       // crosshair sweep duration
const BEACON_CYCLE_S    = 5.5        // full P4 ba-dum loop
const BEACON_STAGGER_MS = 350        // ring 1 → ring 2 delay
const SECTOR_HALF_DEG   = 70         // ±70° directional wedge
const TRAVEL_DURATION_S = 0.45       // dot travel between tiles
const TRAVEL_EASING     = "cubic-bezier(0.34,1.56,0.64,1)"  // spring
const BELOW_CHIP_OFFSET = 8          // px gap below chip bottom edge
```
