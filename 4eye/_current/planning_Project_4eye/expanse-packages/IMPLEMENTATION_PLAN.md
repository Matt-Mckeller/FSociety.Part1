# @expanse Implementation Plan

> **Last Updated:** April 2026
> **Related:** [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Phase Overview

| Phase | Focus | Packages | Goal |
|-------|-------|----------|------|
| **1** | Visual Foundation | theme, layout, user, types | Font, theme UI, TypographyResponsive, User type |
| **2** | Integration | ExpanseServices app | Test packages in real app |
| **3** | Layout & UI | layout, ui | Templates, navigation abstraction, components |
| **4** | Assets | assets, game | Brand assets, game experience |
| **5** | Observability | observability | Analytics, events, monitoring |
| **6** | Orchestration | application | Provider composition |
| **Deferred** | Content | content, i18n | CMS, internationalization |

---

## Source References

> **⚠️ Note:** ExpanseFrontend packages have significant overlap and files in unexpected locations. This is a primary motivation for this migration. **Source references below may be outdated.** Verify actual file locations when implementing.

Migration sources from `ExpanseFrontend/packages/`:

| @expanse Package | Source Location |
|------------------|-----------------|
| theme | `ui/theme/` |
| layout | `ui/application/` (Layout.context.tsx), `ui/theme/components/layout/` |
| ui | `ui/form/inputs/`, `ui/theme/components/` |
| assets | `dynamicAssets/` |
| game | `ui/game/`, `dynamicAssets/` (character) |
| user | `ui/user/` |
| observability | `ui/application/` (Analytics.context.tsx) |
| application | `ui/application/` (Application.context.tsx) |
| auth | *(built fresh for 4eye)* |
| validation | *(built fresh for 4eye)* |

---

## Planning Approach

**Each package migration is collaborative:**

1. **Discuss** — Review current state, source files, and requirements
2. **Plan** — Define folder structure, exports, migration steps
3. **Questions** — Address open questions before implementation
4. **Implement** — Execute migration with checkpoints
5. **Review** — Verify integration, update documentation

The steps below are starting points. Each phase will involve discussion to refine scope, address questions, and adjust approach before implementation begins.

---

## Phase 1: Visual Foundation

**Goal:** Establish complete visual system — font, theme context improvements, theme UI components, TypographyResponsive, settings page, and User type relocation.

**⚠️ Important:** `@expanse/auth` is complete and working. Do not modify auth internals.

### Task Overview

| # | Task | Package | Est. |
|---|------|---------|------|
| 1.1 | Font migration | @expanse/theme | 20m |
| 1.2 | ThemeContext improvements | @expanse/theme | 30m |
| 1.3 | Theme selector components | @expanse/theme | 60m |
| 1.4 | Integrate theme with 4eye-web | @expanse/theme | 20m |
| 1.5 | TypographyResponsive migration | @expanse/shell | 20m |
| 1.6 | SettingsPage component | @expanse/shell | 30m |
| 1.7 | Move User type | @expanse/user | 15m |
| 1.8 | Create @expanse/types | @expanse/types | 15m |
| 1.9 | Update repository docs | docs/ | 20m |

---

### 1.1 Font Migration

**Source:** `ExpanseFrontend/packages/ui/theme/font/` (18 Xpens TTF files)

**Target structure:**
```
@expanse/theme/src/
├── font/
│   ├── Xpens-Regular.ttf
│   ├── Xpens-Bold.ttf
│   ├── ... (all 18 variants)
│   └── OFL.txt
└── fonts/
    ├── index.ts              # Metadata exports (fontFamily, weights, file names)
    └── README.md             # Usage docs for each platform
```

**Exports:**
```typescript
// @expanse/theme/src/fonts/index.ts
export const fontFamily = {
  xpens: '"Xpens", system-ui, sans-serif',
};

export const fontWeights = {
  thin: 100, extraLight: 200, light: 300, regular: 400,
  medium: 500, semiBold: 600, bold: 700, extraBold: 800, black: 900,
};

export const fontFiles = {
  regular: 'Xpens-Regular.ttf',
  bold: 'Xpens-Bold.ttf',
  // ...all variants
};
```

**Platform loading:**

| Platform | Approach |
|----------|----------|
| **Next.js** | Use `next/font/local` pointing to node_modules for optimization |
| **Mobile** | Copy script in prebuild copies fonts to `assets/fonts/` |
| **Other web** | Create own @font-face CSS using exported metadata |

**Next.js example:**
```typescript
// 4eye-web/app/fonts.ts
import localFont from 'next/font/local';

export const xpens = localFont({
  src: [
    { path: '../../packages/@expanse/theme/src/font/Xpens-Regular.ttf', weight: '400' },
    { path: '../../packages/@expanse/theme/src/font/Xpens-Bold.ttf', weight: '700' },
  ],
  variable: '--font-xpens',
});
```

**Mobile script:**
```json
// 4eye-mobile/package.json
{
  "scripts": {
    "copy-fonts": "cp -r ../../packages/@expanse/theme/src/font ./assets/fonts",
    "prebuild": "npm run copy-fonts && expo prebuild"
  }
}
```

**Benefits:**
- Single source of truth (fonts in theme package)
- Next.js font optimization (preload, no layout shift)
- Mobile works with standard Expo/RN font loading
- No magic CSS imports — explicit configuration
- Easy future updates — change once, all apps get it

---

### 1.2 ThemeContext Improvements

**Current issues:**
- Nested ternary chains 6 levels deep for palette/component selection
- Duplicate code for light/dark theme creation
- Missing dependency arrays in useMemo
- No system preference detection

**Improvements:**
1. Replace ternary chains with lookup objects
2. Extract theme creation to utility function
3. Add `initialThemeMode="system"` option (detect OS preference)
4. Fix useMemo dependencies
5. Add JSDoc comments

**Example refactor:**
```typescript
// Before: 6-level ternary chain
const selectedDarkThemePalette =
  themeSelection === "primary" ? darkThemePalette
    : themeSelection === "blue" ? blueDarkThemePalette : ...

// After: lookup object
const PALETTES = {
  primary: { light: lightThemePalette, dark: darkThemePalette },
  blue: { light: blueLightThemePalette, dark: blueDarkThemePalette },
  // ...
} as const;
const selectedPalette = PALETTES[themeSelection]?.[themeMode];
```

---

### 1.3 Theme Selector Components

**Components to create:**

#### ThemeColorSelector
Carousel-style color theme picker:
- Configurable `visibleCount` (default: 3)
- Arrow buttons for navigation with **slide animation**
- Infinite scroll (wraps around)
- Prop to specify which colors to include
- Responsive design

```typescript
interface ThemeColorSelectorProps {
  colors?: ExpanseTheme[];      // Which themes to show (default: all)
  visibleCount?: number;        // Visible at once (default: 3)
  onChange?: (color: ExpanseTheme) => void;
  size?: 'small' | 'medium' | 'large';
}

// Usage
<ThemeColorSelector colors={['primary', 'blue', 'green']} visibleCount={3} />
```

#### LightDarkModeToggle
Migrated from ExpanseFrontend with cleanup:
- Remove LayoutContext dependency (only needs ThemeContext)
- Fix sizing/spacing issues (noted in source TODO)
- Add size variants

```typescript
interface LightDarkModeToggleProps {
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}
```

**Target structure:**
```
@expanse/theme/src/components/
├── ThemeColorSelector/
│   ├── ThemeColorSelector.tsx
│   ├── ColorSwatch.tsx
│   └── index.ts
├── LightDarkModeToggle/
│   └── LightDarkModeToggle.tsx
└── index.ts
```

---

### 1.4 Integrate Theme with 4eye-web

**Current:** 4eye-web uses inline `theme/theme.ts` with basic MUI createTheme.

**Changes:**
| File | Change |
|------|---------|
| `4eye-web/package.json` | Add `@expanse/theme` |
| `4eye-web/tsconfig.json` | Add path alias |
| `4eye-web/app/providers.tsx` | Use `@expanse/theme` ThemeProvider |
| `4eye-web/app/layout.tsx` | Import font CSS |
| `4eye-web/theme/` | Delete after verification |

**After:**
```typescript
import { ThemeProvider } from '@expanse/theme';
import '@expanse/theme/font.css';

<ThemeProvider initialTheme="primary" initialThemeMode="system">
  {children}
</ThemeProvider>
```

---

### 1.5 TypographyResponsive Migration

**Source:** `ExpanseFrontend/packages/ui/theme/components/utility/typographyResponsive.tsx`

**Target:** `@expanse/shell/src/components/TypographyResponsive/`

**Why layout not theme?** It's a layout concern (fitting text in containers), not a color/typography definition.

---

### 1.6 SettingsPage Component

**Location:** `@expanse/shell` (reusable component)

```typescript
interface SettingsPageProps {
  sections: SettingsSection[];
  title?: string;
}

interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
}

// Usage
<SettingsPage
  title="Settings"
  sections={[
    {
      id: 'appearance',
      title: 'Appearance',
      content: (
        <>
          <LightDarkModeToggle />
          <ThemeColorSelector />
        </>
      ),
    },
  ]}
/>
```

---

### 1.7 Move User Type

**Current:** `User` in `@expanse/auth/src/types/types.ts`  
**Target:** `@expanse/user/src/types/user.ts`

**Minimal changes:**
1. Create `@expanse/user/src/types/user.ts` with User interface
2. Update `@expanse/auth` to import User from @expanse/user
3. Re-export User from @expanse/auth for backwards compatibility
4. Verify 4eye-web compiles

**No changes to auth logic or components.**

---

### 1.8 Create @expanse/types

Convenience re-exports:

```typescript
// @expanse/types/src/index.ts
export type { User } from '@expanse/user';
export type { ThemeMode, ExpanseTheme } from '@expanse/theme';
export type { LoginInput, SignupInput } from '@expanse/validation';
export type { AuthPayload, AuthState } from '@expanse/auth';
```

---

### 1.9 Update Repository Docs

| File | Changes |
|------|---------|
| `docs/technical/PACKAGE_ARCHITECTURE.md` | Add font, components sections |
| `docs/technical/MONOREPO_STRUCTURE.md` | Update tree |
| `docs/technical/MUI_THEME_SYSTEM.md` | Add ThemeColorSelector, font info |

---

## Phase 2: ExpanseServices App

**Goal:** Create new app to test @expanse packages end-to-end.

### 2.1 Create App Scaffold

```bash
# Create from PersonalNext template
cp -r ExpanseFrontend/apps/personalNext 4eye/apps/expanse-services

# Update package.json
# - name: "expanse-services"  
# - Replace expanse.ui deps with @expanse/* deps
```

**Files to create:**
```
apps/expanse-services/
├── package.json              # Updated dependencies
├── next.config.mjs
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Uses @expanse/application (or manual providers)
│   │   ├── page.tsx
│   │   └── ...
│   ├── components/           # App-specific
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── config/
└── public/
```

### 2.2 Integrate @expanse Packages

```tsx
// src/app/providers.tsx
import { ThemeProvider } from '@expanse/theme';
import { LayoutProvider } from '@expanse/shell';
import { AnalyticsProvider } from '@expanse/observability';

export function AppProviders({ children }) {
  return (
    <ThemeProvider initialTheme="primary" initialThemeMode="light">
      <LayoutProvider>
        {children}
      </LayoutProvider>
    </ThemeProvider>
  );
}
```

### 2.3 Verify Integration

- [ ] Theme switching works
- [ ] Layout primitives render correctly
- [ ] No import errors
- [ ] Build succeeds

---

## Phase 3: Layout & UI

**Goal:** Complete layout system with navigation abstraction.

### 3.1 Layout Primitives

Already exist (partial). Ensure working:
- [ ] `PageShell`
- [ ] `MaxWidthContainer`
- [ ] `SectionSpacer`
- [ ] `BackdropContainer`

Update `@expanse/shell/src/index.ts` to export them.

### 3.2 Layout Context & Hooks

```typescript
// packages/@expanse/shell/src/context/LayoutProvider.tsx
export function LayoutProvider({ children }) {
  const drawer = useDrawer();
  const snackbar = useSnackbar();
  const loading = useLoading();
  const layoutStyle = useLayoutStyle();
  
  return (
    <LayoutContext.Provider value={{ drawer, snackbar, loading, layoutStyle }}>
      {children}
    </LayoutContext.Provider>
  );
}
```

**Hooks to implement:**
- [ ] `useDrawer()` — `{ isOpen, open, close, toggle }`
- [ ] `useSnackbar()` — `{ show, dismiss, message, type }`
- [ ] `useLoading()` — `{ isLoading, start, stop }`
- [ ] `useLayoutStyle()` — `{ style, setStyle }` (runtime switching)

### 3.3 Layout Templates

```typescript
// packages/@expanse/shell/src/templates/StandardLayout.tsx
export function StandardLayout({
  header = <DefaultHeader />,
  sidebar,
  footer = <DefaultFooter />,
  children,
}) {
  return (
    <PageShell>
      {header}
      <Flex>
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <Main>{children}</Main>
      </Flex>
      {footer}
    </PageShell>
  );
}
```

Templates to create:
- [ ] `StandardLayout` — traditional header/content/footer
- [ ] `DashboardLayout` — sidebar + content
- [ ] `SymbolGridLayout` — custom symbol-grid navigation (later)

### 3.4 Navigation Abstraction

```typescript
// packages/@expanse/shell/src/navigation/NavigationProvider.tsx
export function NavigationProvider({ children, platform }) {
  const router = platform === 'web' 
    ? useNextRouter() 
    : useReactNavigation();
  
  const value = {
    navigate: (path) => router.push(path),
    back: () => router.back(),
    currentRoute: router.pathname,
  };
  
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
```

**Components:**
- [ ] `NavLink` — link with active state
- [ ] `NavAccordion` — expandable nav section
- [ ] `Breadcrumbs` — breadcrumb trail

### 3.5 UI Components

Migrate from ExpanseFrontend:

**Inputs (some exist):**
- [x] `EmailInput`
- [x] `PasswordInput`
- [x] `NameInput`
- [ ] `PhoneInput`
- [ ] `PasscodeInput`

**Feedback:**
- [ ] `Snackbar` — migrate from ExpanseFrontend
- [ ] `LoadingSpinner` — migrate
- [ ] `ProgressBar` — migrate
- [ ] `Toast`

**Typography:**
- [ ] `TypographyResponsive` — migrate

---

## Phase 3.5-3.9: Grid Navigation System

> **Goal:** Configurable grid-based navigation with multiple input methods, action bar slots, SEO support, and animation. Integrated into existing `LayoutProvider`.

### Overview

The Grid Navigation System transforms traditional hierarchical navigation into a 2D grid space. Users navigate via keyboard, arrow buttons, minimap, or touch gestures. The system supports:

- Configurable grid dimensions (default 9×9)
- SEO-friendly URLs and meta tags
- App-defined page registry mapping positions to content
- Action bar slots (top/bottom/left/right)
- Multiple animation modes
- User preference toggling (when app allows)

### 3.5 Core Types & Provider

**Files to create:**
```
@expanse/shell/src/
├── navigation/
│   ├── index.ts
│   ├── types.ts                    # All navigation types
│   ├── GridNavigationProvider.tsx  # Context & state
│   ├── useNavigation.ts            # Single hook for all nav
│   ├── useNavigationSEO.ts         # SEO/meta management
│   ├── useNavigationURL.ts         # URL sync
│   └── constants.ts                # Defaults
```

**Core Types (`types.ts`):**
```typescript
export interface Position {
  x: number;
  y: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';
export type NavigationMethod = 'keyboard' | 'button' | 'minimap' | 'swipe' | 'direct';
export type NavigationStyle = 'traditional' | 'grid';

export interface TileConfig {
  position: Position;
  id: string;
  seo: {
    title: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  url?: string;
  display: {
    label: string;
    icon?: React.ComponentType;
    colors: {
      inactive: string;
      active: string;
      hover?: string;
    };
    category?: string;
  };
  behavior?: {
    disabled?: boolean;
    hidden?: boolean;
    external?: string;
  };
}

export interface GridNavigationConfig {
  grid: {
    width: number;
    height: number;
    homePosition?: Position;
    wrapAround?: boolean;
  };
  tiles: TileConfig[];
  routing: {
    mode: 'query' | 'path' | 'hybrid';
    basePath?: string;
    syncUrl?: boolean;
    initialFromUrl?: boolean;
  };
  animation: NavigationAnimationConfig;
  tileInteraction: TileInteractionConfig;
  inputs: InputConfig;
  layout: LayoutSlotsConfig;
  onNavigate?: (from: Position, to: Position, method: NavigationMethod) => void;
  onTileEnter?: (tile: TileConfig) => void;
  onTileLeave?: (tile: TileConfig) => void;
}

export interface NavigationAnimationConfig {
  default: { type: 'fade' | 'slide' | 'scale' | 'none'; duration: number };
  adjacent?: { type: 'fade' | 'slide' | 'scale' | 'none'; duration: number; slideDirection?: 'natural' | 'fixed' };
  directJump?: { type: 'fade' | 'scale' | 'zoom' | 'none'; duration: number };
  goHome?: { type: 'fade' | 'scale' | 'zoom' | 'none'; duration: number };
}

export interface TileInteractionConfig {
  hover: { scale: number; duration: number; shadow?: boolean; showLabel?: boolean };
  active: { scale: number; ringWidth?: number; ringColor?: string; pulseAnimation?: boolean };
  disabled: { opacity: number; cursor: string };
}
```

**NavigationHook interface:**
```typescript
export interface NavigationHook {
  // Position State
  position: Position;
  gridSize: { width: number; height: number };
  homePosition: Position;
  
  // Navigation Actions
  navigate: (direction: Direction) => void;
  navigateTo: (x: number, y: number) => void;
  goHome: () => void;
  goBack: () => void;
  
  // Query Helpers
  canNavigate: (direction: Direction) => boolean;
  isValidPosition: (x: number, y: number) => boolean;
  isHome: boolean;
  
  // Page Registry
  currentTile: TileConfig | null;
  getTileAt: (x: number, y: number) => TileConfig | null;
  
  // Mode
  navigationStyle: NavigationStyle;
  setNavigationStyle: (style: NavigationStyle) => void;
  gridEnabled: boolean;
}
```

**Tasks:**
- [ ] Define all types in `types.ts`
- [ ] Create `GridNavigationProvider` with position state
- [ ] Implement `useNavigation` hook
- [ ] Add keyboard input handling (Arrow keys, WASD)
- [ ] Implement wrap-around boundary logic (default: on)
- [ ] Add navigation history for `goBack()`

---

### 3.6 Layout Shell & Action Bars

**Files to create:**
```
@expanse/shell/src/
├── components/
│   ├── GridLayout/
│   │   ├── GridLayout.tsx          # Main shell with slots
│   │   ├── ActionBar.tsx           # Generic bar component
│   │   ├── MainContent.tsx         # Animated content area
│   │   └── index.ts
```

**GridLayout Structure:**
```
┌──────────────────────────────────────────────────────┐
│                    TOP BAR (slot)                     │
├────────┬─────────────────────────────────┬───────────┤
│  LEFT  │                                 │   RIGHT   │
│  BAR   │         MAIN CONTENT            │   BAR     │
│ (slot) │   (animated, renders children)  │  (slot)   │
├────────┴─────────────────────────────────┴───────────┤
│                   BOTTOM BAR (slot)                   │
│                         [NavigationPad] [Minimap]     │
└──────────────────────────────────────────────────────┘
```

**ActionBar Props:**
```typescript
interface ActionBarProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  height?: number;           // For top/bottom
  width?: number;            // For left/right
  sticky?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}
```

**Tasks:**
- [ ] Create `GridLayout` shell component
- [ ] Create `ActionBar` generic component
- [ ] Create `MainContent` with animation support
- [ ] Implement slot configuration from `GridNavigationConfig`
- [ ] Add collapse/expand functionality for sidebar bars
- [ ] Default bottom bar with NavigationPad + Minimap toggle

---

### 3.7 Navigation Controls

**Files to create:**
```
@expanse/shell/src/
├── navigation/
│   ├── components/
│   │   ├── NavigationPad.tsx       # Arrow button controls
│   │   ├── Minimap.tsx             # Grid overview + click nav
│   │   ├── MinimapTile.tsx         # Individual tile in minimap
│   │   └── index.ts
```

**NavigationPad:**
- D-pad style arrow buttons (up/down/left/right)
- Optional home button in center
- Size variants: `compact` | `medium` | `full`
- Mobile-friendly touch targets
- Visual feedback on button press
- Disabled state when can't navigate that direction

**Minimap:**
- Visual grid overview showing all tiles
- Current position highlighted with `active` color
- Click any tile to navigate directly
- Hover to see tile label/info
- Position: overlay (toggle) or embedded in sidebar
- Size configurable
- Show/hide labels option

**Tile Interaction Animation:**
- Hover: scale up (1.1x), optional shadow
- Active: ring/border, optional pulse
- Disabled: reduced opacity (0.5)
- All animated with gsap

**Tasks:**
- [ ] Create `NavigationPad` with arrow buttons
- [ ] Create `Minimap` component
- [ ] Create `MinimapTile` with hover/active states
- [ ] Implement tile colors (inactive/active/hover)
- [ ] Add gsap animations for interactions
- [ ] Wire to `useNavigation` hook

---

### 3.8 Touch & Scroll Input

**Files to create:**
```
@expanse/shell/src/
├── navigation/
│   ├── hooks/
│   │   ├── useKeyboardNavigation.ts
│   │   ├── useTouchNavigation.ts
│   │   └── useScrollNavigation.ts   # Future: edge-scroll
```

**Touch Navigation:**
- Swipe gestures on designated zones (edges by default)
- Configurable swipe threshold
- Direction detection
- Prevent conflict with content scrolling

**Scroll Behavior:**
- Default: `content-only` (scroll only affects page content)
- Optional: `edge-navigate` (scroll at content edge triggers grid nav)

**Tasks:**
- [ ] Extract keyboard handling to `useKeyboardNavigation`
- [ ] Create `useTouchNavigation` for swipe gestures
- [ ] Create `useScrollNavigation` for edge-scroll (opt-in)
- [ ] Respect input focus (no nav when typing)
- [ ] Configurable zones for touch

---

### 3.9 Integration & Settings

**Updates to existing:**
```
@expanse/shell/src/
├── context/
│   ├── LayoutProvider.tsx          # ADD: navigation integration
├── hooks/
│   ├── useLayout.ts                # ADD: navigation in return
├── components/
│   ├── SettingsPage/               # ADD: navigation settings section
│   │   └── NavigationSettings.tsx
```

**LayoutProvider Integration:**
```typescript
interface LayoutContextValue {
  // Existing
  drawer: DrawerState;
  snackbar: SnackbarState;
  loading: LoadingState;
  
  // New
  navigation: NavigationHook;
  navigationStyle: NavigationStyle;
  setNavigationStyle: (style: NavigationStyle) => void;
  gridConfig?: GridNavigationConfig;
}
```

**Settings UI:**
- Toggle navigation style (when app allows)
- Wrap-around on/off
- Keyboard navigation on/off
- Animation preferences

**SEO Integration:**
- Document title updates on position change
- Meta tags update (description, og:image, etc.)
- URL sync (query params or path-based)
- Initial position from URL on load

**Tasks:**
- [ ] Integrate `GridNavigationProvider` into `LayoutProvider`
- [ ] Add `navigation` to `useLayout` hook return
- [ ] Create `NavigationSettings` component
- [ ] Implement `useNavigationSEO` for meta tags
- [ ] Implement `useNavigationURL` for URL sync
- [ ] Support `routing.mode`: query, path, hybrid
- [ ] Test in expanse-services app

---

### Implementation Order

| Phase | Focus | Estimate |
|-------|-------|----------|
| 3.5 | Types, Provider, useNavigation, keyboard input | 2hr |
| 3.6 | GridLayout, ActionBar, MainContent, animation | 1.5hr |
| 3.7 | NavigationPad, Minimap, tile interactions | 1.5hr |
| 3.8 | Touch input, scroll behavior | 1hr |
| 3.9 | LayoutProvider integration, settings, SEO, URL | 1hr |

**Total: ~7 hours**

---

### Documentation Requirements

Each component/hook must include:
1. **JSDoc comments** with `@example` blocks
2. **README.md** in `@expanse/shell/src/navigation/README.md`
3. **Storybook stories** (future)
4. **Update this plan** when implementation differs

---

## Phase 4: Assets & Game

**Source:** `ExpanseFrontend/packages/dynamicAssets/`

### 4.1 Create @expanse/assets Structure

```bash
mkdir -p packages/@expanse/assets/src/{brand/{logo,icons,art,marketing},common/{icons,illustrations}}
```

### 4.2 Logo Migration

**Source:** `ExpanseFrontend/packages/dynamicAssets/logo/`

The logo is complex with sub-components, hooks, shapes, and animation logic:
```
dynamicAssets/logo/
├── ExpanseLogoV4.component.tsx  # Current version
├── components/                   # Sub-components
├── hooks/                        # Animation hooks
├── shapes/                       # Shape definitions
├── types.ts
├── utils/
└── index.ts
```

**Migration steps:**
1. Copy folder structure to `@expanse/assets/src/brand/logo/`
2. Rename `ExpanseLogoV4.component.tsx` → `ExpanseLogo.tsx`
3. Create `presets.ts` for common configurations:
   ```typescript
   export const logoPresets = {
     header: { size: 'md', animated: false, theme: 'auto' },
     splash: { size: 'lg', animated: true, theme: 'dark' },
     footer: { size: 'sm', animated: false, theme: 'auto' },
   };
   ```
4. Update exports:
   ```typescript
   // Main usage
   import { ExpanseLogo, logoPresets } from '@expanse/assets';
   <ExpanseLogo {...logoPresets.header} />
   
   // Full customization
   <ExpanseLogo size="lg" animated theme="dark" />
   ```
5. Clean up and document

### 4.3 Other Brand Assets

**Migrate from ExpanseFrontend:**
- [ ] Brand icons (`dynamicAssets/icons/`)
- [ ] ExpandingBar, ExpandingBorderBox, TripleDash (`ui/theme/components/`)
- [ ] Marketing visuals (`dynamicAssets/graphics/`)

### 4.4 Create @expanse/game Structure

**Source:** `ExpanseFrontend/packages/ui/game/`, `dynamicAssets/`

```bash
mkdir -p packages/@expanse/game/src/{character,rewards,animations,ui}
```

**Build:**
- [ ] Character components (from expanse.ui/game)
- [ ] PushingProgress animation
- [ ] XP/Coin displays
- [ ] Achievement badges

---

## Phase 5: Observability

### 5.1 Rename & Restructure

Current `@expanse/analytics` becomes `@expanse/observability`.

```
src/
├── analytics/          # GA, tracking
├── events/             # Custom event system
├── logging/            # Structured logs
└── performance/        # Web vitals
```

### 5.2 Event System

```typescript
// packages/@expanse/observability/src/events/useTrackEvent.ts
export function useTrackEvent() {
  return (eventName: string, properties?: Record<string, unknown>) => {
    // Send to analytics
    // Log structured event
    // Handle privacy (no PII)
  };
}
```

---

## Phase 6: Orchestration

### 6.1 ApplicationProvider

```typescript
// packages/@expanse/application/src/providers/ApplicationProvider.tsx
export function ApplicationProvider({
  children,
  theme = 'primary',
  themeMode = 'light',
  layoutStyle = 'standard',
  enableAnalytics = true,
}) {
  return (
    <ThemeProvider initialTheme={theme} initialThemeMode={themeMode}>
      <LayoutProvider initialStyle={layoutStyle}>
        <NavigationProvider>
          <ObservabilityProvider enabled={enableAnalytics}>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </ObservabilityProvider>
        </NavigationProvider>
      </LayoutProvider>
    </ThemeProvider>
  );
}
```

### 6.2 ErrorBoundary

- [ ] Create error boundary component
- [ ] Log errors to observability
- [ ] Show user-friendly fallback

---

## Deferred: Content & i18n

### @expanse/content
- CMS integration (headless CMS TBD)
- Content blocks (Testimonial, FeatureCard)
- Markdown/MDX rendering

### @expanse/i18n
- Locale detection
- RTL support
- Translation utilities
- Integration with content system

---

## Checklist Summary

### Phase 1 — Visual Foundation
- [ ] 1.1 Copy Xpens font files + create metadata exports in @expanse/theme
- [ ] 1.2 Refactor ThemeContext (lookup objects, system preference)
- [ ] 1.3 Create ThemeColorSelector (carousel with slide animation)
- [ ] 1.3 Create LightDarkModeToggle component
- [ ] 1.4 Integrate theme with 4eye-web (next/font/local), delete local theme.ts
- [ ] 1.5 Migrate TypographyResponsive to @expanse/shell
- [ ] 1.6 Create SettingsPage component in @expanse/shell
- [ ] 1.7 Move User type to @expanse/user
- [ ] 1.8 Create @expanse/types with re-exports
- [ ] 1.9 Update repository documentation

### Phase 2 — ExpanseServices
- [ ] Create app scaffold
- [ ] Integrate @expanse packages
- [ ] Verify build & runtime

### Phase 3 — Layout & UI
- [x] Export layout primitives
- [x] Implement LayoutProvider + hooks
- [ ] Create templates (Standard, Dashboard)
- [ ] Navigation abstraction
- [ ] Migrate UI components (feedback, typography)
- [ ] **Grid Navigation System** (see 3.5-3.9 below)

### Phase 4 — Assets & Game
- [ ] Create assets structure
- [ ] Migrate logo (ExpanseLogoV4 → ExpanseLogo + presets)
- [ ] Migrate brand icons & art
- [ ] Create game package structure
- [ ] Build character & rewards components

### Phase 5 — Observability
- [ ] Rename analytics → observability
- [ ] Implement event system
- [ ] Add structured logging

### Phase 6 — Orchestration
- [ ] Create ApplicationProvider
- [ ] Implement ErrorBoundary
- [ ] Documentation

---

## Next Action

**Start with Phase 1.1:** Move User type to @expanse/user.

This unblocks proper package dependencies and is a contained change.
