# Status System Feature Spec

## Overview

Phase 5 of the HUD system provides a status display panel with 6 configurations optimized for different use cases and platforms.

## Components

### StatusPanel

Main container that renders status information based on the current `statusConfig`.

```tsx
import { StatusPanel } from "@expanse/shell";

// Auto-reads config from HudContext
<StatusPanel />

// Override config
<StatusPanel config="presentation" position="top-right" />

// With custom data
<StatusPanel
  config="learning"
  data={{
    goalLabel: "Complete 5 lessons",
    goalProgress: 60,
    subject: "Mathematics",
    streakDays: 7,
  }}
/>
```

### Status Configurations

| Config | Description | Metrics Shown | Recommended For |
|--------|-------------|---------------|-----------------|
| `compact` | Minimal header metrics | XP, coins, level | Desktop, Tablet |
| `expanded` | Full stats with labels | XP, coins, level, avatar, name | Desktop |
| `minimal` | Just avatar and level | Level, avatar | Mobile |
| `presentation` | Clean, large for demos | Slides, timer | Desktop |
| `learning` | Study session tracking | Goals, progress, subject, streak | Desktop, Tablet |
| `social` | Collaboration features | Achievements, party, online status | Desktop, Tablet |

### Position Options

```tsx
type StatusPosition =
  | "top-right"     // Floating top-right corner
  | "top-left"      // Floating top-left corner
  | "bottom-right"  // Floating bottom-right corner
  | "bottom-left"   // Floating bottom-left corner
  | "header"        // Inline in header (no positioning)
  | "inline";       // Inline flow (no positioning)
```

### StatusData Interface

```tsx
interface StatusData {
  // Core stats
  xp?: number;
  xpMax?: number;
  level?: number;
  coins?: number;
  avatarUrl?: string;
  displayName?: string;

  // Presentation mode
  slideNumber?: number;
  totalSlides?: number;
  timerSeconds?: number;

  // Learning mode
  goalLabel?: string;
  goalProgress?: number;
  subject?: string;
  streakDays?: number;

  // Social mode
  achievementsCount?: number;
  partyMembers?: Array<{ id: string; name: string; avatarUrl?: string }>;
  isOnline?: boolean;
}
```

### StatusConfigSwitcher

UI component for switching between status configurations.

```tsx
import { StatusConfigSwitcher } from "@expanse/shell";

// Dropdown (default)
<StatusConfigSwitcher
  value="compact"
  onChange={setConfig}
  variant="dropdown"
/>

// Icon buttons
<StatusConfigSwitcher variant="icons" value={config} onChange={setConfig} />

// Vertical menu with descriptions
<StatusConfigSwitcher variant="menu" value={config} onChange={setConfig} showDescriptions />

// Toggle buttons
<StatusConfigSwitcher variant="toggles" value={config} onChange={setConfig} />

// Filter by platform
<StatusConfigSwitcher filterByPlatform="mobile" value={config} onChange={setConfig} />
```

### StatusConfigPreview

Visual preview of a status configuration.

```tsx
<StatusConfigPreview
  config="learning"
  size={64}
  selected={config === "learning"}
  onClick={() => setConfig("learning")}
  showLabel
/>
```

### StatusPreviewGrid

Grid of all status configuration previews.

```tsx
<StatusPreviewGrid
  value="compact"
  onChange={setConfig}
  columns={3}
  showLabels
/>
```

## Status Config Info

Metadata about each configuration:

```tsx
import { STATUS_CONFIG_INFO, getAllStatusConfigs, getStatusConfigForPlatform } from "@expanse/shell";

const info = STATUS_CONFIG_INFO["learning"];
// {
//   id: "learning",
//   label: "Learning",
//   description: "Study session - goals, progress, subject",
//   metrics: ["goal", "progress", "subject", "streak"],
//   recommended: ["desktop", "tablet"],
// }

const allConfigs = getAllStatusConfigs();
const mobileConfigs = getStatusConfigForPlatform("mobile"); // ["minimal"]
```

## Integration with HudContext

StatusPanel automatically reads the `statusConfig` from HudContext:

```tsx
import { useLayoutConfig, HudContextProvider } from "@expanse/shell";

function StatusIntegration() {
  const { statusConfig } = useLayoutConfig();

  return (
    <>
      <StatusPanel />
      <StatusConfigSwitcher value={statusConfig} onChange={...} />
    </>
  );
}
```

## Collapsible Panel

StatusPanel supports collapsible behavior:

```tsx
// Uncontrolled
<StatusPanel collapsible defaultCollapsed={false} />

// Controlled
<StatusPanel
  collapsible
  collapsed={isCollapsed}
  onCollapsedChange={setIsCollapsed}
/>
```

## Individual Status Renders

Each configuration renders a specialized layout:

### Compact
- Level badge chip
- XP progress bar (mini)
- Coins with icon

### Expanded
- Avatar + name header
- XP card with full progress
- Coins card with large number

### Minimal
- Avatar (small)
- Level number
- XP bar (micro)

### Presentation
- Large slide number (current/total)
- Timer display (MM:SS format)

### Learning
- Subject with icon
- Streak badge
- Goal progress card with label
- Session XP counter

### Social
- Online status indicator
- Achievement count badge
- Party member avatars with tooltips

## Files

- [StatusPanel.tsx](../src/hud-complete/components/status/StatusPanel.tsx) - Main panel component
- [StatusConfigSwitcher.tsx](../src/hud-complete/components/status/StatusConfigSwitcher.tsx) - Config switching UI
- [index.ts](../src/hud-complete/components/status/index.ts) - Module exports
