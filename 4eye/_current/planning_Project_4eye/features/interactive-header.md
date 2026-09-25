# Interactive Header System Feature Spec

> Phase 2 of HUD Implementation | Status: ✅ Complete

## Overview

The Interactive Header provides a configurable, contextual header bar for the HUD system. It supports multiple display states, pill-style buttons with popovers, and integrates with the HudContext for state management.

## Components Created

### 1. HeaderButton
**Path:** `src/hud-complete/components/header/HeaderButton.tsx`

Pill-style button component for header navigation.

**Features:**
- Customizable icon + label display
- Dropdown indicator (chevron) with rotation animation
- Badge support for notifications
- Tooltip integration
- Three color modes: light, dark, auto (theme-based)
- Three sizes: small, medium, large
- Full accessibility support (aria-haspopup, aria-expanded)

**Props:**
```typescript
interface HeaderButtonProps {
  id: string;
  icon?: ReactNode;
  label: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  badge?: number | string;
  disabled?: boolean;
  tooltip?: string;
  onClick?: (event: MouseEvent) => void;
  colorMode?: "light" | "dark" | "auto";
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
  buttonProps?: Partial<ButtonProps>;
}
```

### 2. HeaderPopover
**Path:** `src/hud-complete/components/header/HeaderPopover.tsx`

Dropdown panel that anchors to header buttons.

**Features:**
- Consistent styling across color modes
- Fade animation on open/close
- Configurable width and max height
- Horizontal alignment options (left, center, right)
- Click-away close behavior
- Backdrop blur effect in dark mode

**Helper Components:**
- `PopoverSection` - Titled section container
- `PopoverDivider` - Horizontal divider
- `PopoverItem` - Selectable item with icon, label, description

### 3. InteractiveHeader
**Path:** `src/hud-complete/components/header/InteractiveHeader.tsx`

Main header composition component.

**Features:**
- Reads button config from HudContext via `useVisibleHeaderButtons`
- Manages popover state (which button's popover is open)
- Refs tracking for popover anchoring
- Alignment options (left, center, right)
- Callbacks for button clicks, popover open/close

**Variant Components:**
- `MinimalHeader` - Simple domain > area breadcrumb
- `BreadcrumbHeader` - Full navigation breadcrumb with multiple levels

### 4. HeaderStateManager
**Path:** `src/hud-complete/components/header/HeaderStateManager.tsx`

State machine for header display states.

**States (from HeaderDisplayState type):**
- **Core:** default, party, achievement, quest, interactive
- **Learning:** learning-quiz, learning-progress, learning-feedback
- **Communication:** notification, announcement, feedback
- **AI:** ai-communication, ai-response
- **Special:** celebration, progress-push, presentation, error

**Features:**
- Reducer-based state management
- State transition validation (optional)
- History tracking for debugging
- Temporary state support (auto-reverts after timeout)
- Go-back navigation to previous state

**Hooks Provided:**
- `useHeaderStateManager` - Full context access
- `useHeaderState` - Current state only
- `useSetHeaderState` - State setter only

**Preset Helpers:**
```typescript
headerStatePresets.showDefault(setState);
headerStatePresets.showParty(setState);
headerStatePresets.showCelebration(setState);
// ... etc for all 17 states
```

## Integration with HudContext

The header components integrate with the main HudContext:

```tsx
// Context reads visible buttons after visibility rules
const buttons = useVisibleHeaderButtons();

// Header state from context
const { displayState, setDisplayState } = useHeaderState();
```

## Usage Example

```tsx
import {
  HudContextProvider,
  InteractiveHeader,
  HeaderStateManagerProvider,
} from "@expanse/shell";

function App() {
  return (
    <HudContextProvider preset="desktop-default">
      <HeaderStateManagerProvider initialState="default">
        <InteractiveHeader
          colorMode="auto"
          buttonSize="medium"
          onButtonClick={(id) => console.log(`Clicked: ${id}`)}
          renderPopoverContent={(buttonId) => (
            <PopoverContent buttonId={buttonId} />
          )}
        />
      </HeaderStateManagerProvider>
    </HudContextProvider>
  );
}
```

## State Machine Transitions

Valid transitions are defined to prevent invalid state jumps:

```
default → party, achievement, quest, interactive, notification, ...
party → default, interactive, notification, celebration
achievement → default, celebration
quest → default, learning-quiz, achievement, interactive
learning-quiz → learning-progress, learning-feedback, default
... etc
```

Transition validation is optional and disabled by default.

## Exports

All header components are exported from the main package:

```typescript
// Components
export { HeaderButton, HeaderPopover, InteractiveHeader };
export { MinimalHeader, BreadcrumbHeader };
export { PopoverSection, PopoverDivider, PopoverItem };

// State Manager
export { HeaderStateManagerProvider };
export { useHeaderStateManager, useHeaderState, useSetHeaderState };
export { headerStatePresets, isValidTransition, VALID_TRANSITIONS };

// Types
export type { HeaderButtonProps, HeaderPopoverProps };
export type { InteractiveHeaderProps, MinimalHeaderProps, BreadcrumbHeaderProps };
export type { HeaderStateManagerContextValue, HeaderStateTransition };
```

## Files Created

| File | Purpose |
|------|---------|
| `header/HeaderButton.tsx` | Pill button component |
| `header/HeaderPopover.tsx` | Dropdown panel + helpers |
| `header/InteractiveHeader.tsx` | Main header + variants |
| `header/HeaderStateManager.tsx` | State machine + context |
| `header/index.ts` | Module exports |
| `components/index.ts` | Updated with header exports |

## Dependencies

- MUI components: Button, Badge, Tooltip, Popover, Paper, Box, Stack, Fade
- MUI icons: KeyboardArrowDownIcon
- HUD types: HeaderDisplayState, HeaderButtonConfig
- Context: useVisibleHeaderButtons from HudContext

## Next Steps (Phase 3)

The header system is complete. Next phase focuses on:
- **Contextual Orbs System** - Floating orb cluster with drag behavior
- Orb visibility rules based on context
- Cluster layouts and positioning
