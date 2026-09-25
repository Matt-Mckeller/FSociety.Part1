# @expanse Package Architecture

> **Last Updated:** April 2026
> **Status:** Active — This is the source of truth for @expanse package organization.

---

## Overview

The `@expanse` packages provide reusable infrastructure for Expanse products. They are designed to be:
- **Platform-agnostic:** Work on web (Next.js) and mobile (React Native)
- **Publish-ready:** Each package can be independently published to npm when needed
- **Composable:** Apps pick only what they need

---

## Package Organization

Packages are conceptually grouped into layers:

```
@expanse/
│
├── UTILITY ────────────────────────────────────────────────────────
│   ├── types/              Shared TypeScript interfaces (re-exports)
│   ├── utils/              Pure utility functions
│   └── validation/         Zod schemas ✅ COMPLETE
│
├── VISUAL ─────────────────────────────────────────────────────────
│   ├── theme/              MUI theming, palettes, dark/light
│   ├── layout/             Page structure, navigation, state
│   ├── ui/                 Interactive components (inputs, feedback)
│   └── assets/             Brand assets, logo, icons, illustrations
│
├── FEATURES ───────────────────────────────────────────────────────
│   ├── auth/               Authentication ✅ COMPLETE
│   ├── user/               Profile management, User type
│   ├── game/               Character, rewards, game UI
│   └── observability/      Analytics, events, monitoring
│
├── CONTENT ────────────────────────────────────────────────────────
│   ├── content/            CMS, content blocks (deferred)
│   └── i18n/               Internationalization (deferred)
│
└── ORCHESTRATION ──────────────────────────────────────────────────
    └── application/        Provider composition, ErrorBoundary
```

**Note:** The repository structure is flat (`packages/@expanse/*`), but this logical grouping guides implementation order and dependency direction.

---

## Dependencies

### App → Package Dependencies

Apps typically import from many @expanse packages:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              APPS                                        │
│   4eye-web, 4eye-mobile, expanse-services, etc.                         │
└─────────────────────────────────────────────────────────────────────────┘
        │         │         │         │         │         │
        ▼         ▼         ▼         ▼         ▼         ▼
    ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐
    │ auth  │ │ theme │ │layout │ │  ui   │ │assets │ │  ...  │
    └───────┘ └───────┘ └───────┘ └───────┘ └───────┘ └───────┘
```

### Internal Package Dependencies

Known interdependencies between packages:

```
@expanse/auth ──────────► @expanse/validation (schemas)
      │
      └─────────────────► @expanse/user (User type)
      │
      └─────────────────► @expanse/theme (optional: themed forms)

@expanse/shell ────────► @expanse/theme (theme-aware containers)
      │
      └─────────────────► @expanse/assets (logo in header)

@expanse/ui ────────────► @expanse/theme (themed components)

@expanse/application ───► ALL packages (orchestration)
```

**Note:** Additional interdependencies may emerge during implementation. Keep this section updated.

---

## Package Details

### Foundation Layer

#### @expanse/types
Optional convenience package that re-exports types from other packages.

```typescript
// Types are defined in their home packages:
@expanse/user/src/types/user.ts       // User, Profile
@expanse/theme/src/types/             // ThemeMode, ExpanseTheme
@expanse/shell/src/types/            // LayoutState, DrawerState

// @expanse/types re-exports for convenience:
export type { User, Profile } from '@expanse/user';
export type { ThemeMode } from '@expanse/theme';
```

#### @expanse/utils
Pure utility functions with no React dependencies.

```
src/
├── array/          # groupBy, unique, chunk, etc.
├── string/         # capitalize, slugify, truncate
├── date/           # formatDate, relativeTime
└── dom/            # copyToClipboard, scrollTo
```

#### @expanse/validation ✅ COMPLETE
Zod schemas for form validation.

```
src/
├── schemas/        # LoginSchema, SignupSchema, ProfileSchema
└── utils/          # validate(), formatErrors()
```

---

### Visual Layer

#### @expanse/theme
MUI theming system with multiple color themes × light/dark modes.

**Source:** `ExpanseFrontend/packages/ui/theme/`

```
src/
├── Brand/                  # Theme variants (stories, components)
│   ├── primary/
│   ├── blue/
│   ├── green/
│   ├── orange/
│   ├── red/
│   └── teal/
├── configs/
│   ├── common-theme.ts     # Typography, spacing, breakpoints
│   ├── primary/            # TODO: Reorganize into color folders
│   │   ├── light.ts
│   │   └── dark.ts
│   ├── blue/
│   │   ├── light.ts
│   │   └── dark.ts
│   └── ... (green, orange, red, teal)
├── context/
│   └── ThemeProvider.tsx   # Theme switching
├── hooks/
│   ├── useThemeContext.ts
│   ├── useDeviceType.ts
│   └── useWindowDimensions.ts
├── types/
└── utils/
    └── wcag-contrast.ts    # Accessibility helpers
```

**Migration Note:** Current configs (`blue-dark-theme.ts`, `blue-light-theme.ts`, etc.) should be reorganized into color-based folders to match Brand/ structure.

**Exports:**
- `ThemeProvider`, `useThemeContext`
- Theme configs (palettes, typography)
- Utility hooks

#### @expanse/shell
Page structure, navigation abstraction, and layout state.

**Source:** `ExpanseFrontend/packages/ui/application/` (Layout.context.tsx, components)

```
src/
├── primitives/
│   ├── PageShell.tsx           # Base page wrapper
│   ├── MaxWidthContainer.tsx   # Consistent max-width + padding
│   ├── SectionSpacer.tsx       # Vertical rhythm
│   └── BackdropContainer.tsx   # Full-screen overlay
│
├── templates/
│   ├── StandardLayout.tsx      # Traditional header/sidebar/content
│   ├── DashboardLayout.tsx     # App dashboard pattern
│   └── SymbolGridLayout.tsx    # Custom symbol-grid navigation
│
├── navigation/
│   ├── NavigationProvider.tsx  # Platform-agnostic abstraction
│   ├── web/                    # Next.js router implementation
│   ├── mobile/                 # React Navigation implementation
│   └── components/
│       ├── NavLink.tsx
│       ├── NavAccordion.tsx
│       └── Breadcrumbs.tsx
│
├── context/
│   └── LayoutProvider.tsx      # Combined layout state
│
└── hooks/
    ├── useNavigation.ts        # navigate(), back(), currentRoute
    ├── useDrawer.ts            # isOpen, open(), close(), toggle()
    ├── useSnackbar.ts          # show(), dismiss()
    ├── useLoading.ts           # start(), stop(), isLoading
    └── useLayoutStyle.ts       # Switch between layout templates
```

**Depends on:** `@expanse/theme`, `@expanse/assets` (logo for default header)

**Key Features:**
- Runtime layout switching via `useLayoutStyle()`
- Navigation abstraction works across web/mobile
- State synced remotely across devices (via observability)
- Event tracking integrated

#### @expanse/ui
Interactive UI components.

**Source:** `ExpanseFrontend/packages/ui/form/`, `ExpanseFrontend/packages/ui/theme/components/`

```
src/
├── inputs/
│   ├── EmailInput.tsx
│   ├── PasswordInput.tsx
│   ├── NameInput.tsx
│   ├── PhoneInput.tsx
│   └── index.ts
│
├── feedback/
│   ├── Snackbar.tsx            # Toast notification display
│   ├── LoadingSpinner.tsx      # Loading indicator
│   ├── ProgressBar.tsx
│   ├── Toast.tsx
│   └── index.ts
│
├── typography/
│   └── TypographyResponsive.tsx
│
└── index.ts
```

**Note:** Brand art components live in `@expanse/assets/brand/`.

#### @expanse/assets
Visual resources — both static assets and React components.

**Source:** `ExpanseFrontend/packages/dynamicAssets/`

```
src/
├── brand/
│   ├── logo/
│   │   ├── ExpanseLogo.tsx         # Main logo (from ExpanseLogoV4)
│   │   ├── ExpanseLogoMark.tsx     # Mark only (icon)
│   │   ├── ExpanseWordmark.tsx     # Text only
│   │   ├── presets/
│   │   │   ├── index.ts            # Re-exports all presets
│   │   │   ├── header.ts
│   │   │   ├── splash.ts
│   │   │   ├── footer.ts
│   │   │   └── marketing.ts
│   │   ├── components/             # Logo sub-components
│   │   ├── hooks/                  # Logo animation hooks
│   │   ├── shapes/                 # Logo shape definitions
│   │   ├── types.ts
│   │   └── utils/
│   ├── icons/                      # Brand-specific icons
│   ├── art/
│   │   ├── ExpandingBar.tsx
│   │   ├── ExpandingBorderBox.tsx
│   │   └── TripleDash.tsx
│   └── marketing/                  # Marketing visuals
│
├── common/
│   ├── icons/                  # Generic UI icons
│   └── illustrations/          # Empty states, errors
│
└── index.ts
```

**Logo Migration Note:**
The logo (`ExpanseLogoV4.component.tsx`) is complex with multiple sub-components, hooks, shapes, and animation logic. During migration:
- Rename to `ExpanseLogo.tsx` (drop version suffix)
- Keep `ExpanseLogoMark.tsx` (icon only) and `ExpanseWordmark.tsx` (text only)
- Preserve all sub-structure (components/, hooks/, shapes/, utils/)
- Presets as separate files in `presets/` folder with index re-export
- Usage: `<ExpanseLogo preset="header" />` or full props for customization

---

### Features Layer

#### @expanse/auth ✅ COMPLETE
Complete authentication system.

**Source:** Built fresh for 4eye (not migrated from ExpanseFrontend)

```
src/
├── components/         # LoginForm, SignupForm, etc.
├── context/            # AuthProvider
├── guards/             # Route protection
├── hooks/              # useAuth, useCheckAuthMethod
├── session/            # Web/Mobile session providers
├── storage/            # Token storage
├── graphql/            # Auth mutations/queries
└── types/
```

**Depends on:** `@expanse/validation`, `@expanse/user` (for User type)

#### @expanse/user
User profile management and the canonical User type.

**Source:** `ExpanseFrontend/packages/ui/user/`

```
src/
├── types/
│   └── user.ts             # User, Profile — CANONICAL LOCATION
│
├── components/
│   ├── ProfileView.tsx
│   ├── ProfileEdit.tsx
│   └── AvatarUpload.tsx
│
├── context/
│   └── UserProvider.tsx
│
├── hooks/
│   └── useUserProfile.ts
│
└── graphql/
```

**Note:** `User` type is defined here. `@expanse/auth` imports from here.

#### @expanse/game
Game experience — character, rewards, heavy-logic brand art.

**Source:** `ExpanseFrontend/packages/ui/game/`, `ExpanseFrontend/packages/dynamicAssets/` (character-related)

```
src/
├── character/
│   ├── ExpanseCharacter.tsx    # Main character component
│   ├── PushingProgress.tsx     # Animated character
│   └── states/                 # Character states/animations
│
├── rewards/
│   ├── XPDisplay.tsx
│   ├── CoinDisplay.tsx
│   ├── AchievementBadge.tsx
│   └── LevelProgress.tsx
│
├── animations/                 # Game-specific Lotties
│
└── ui/
    ├── GameProgressBar.tsx
    └── LeaderboardEntry.tsx
```

**Note:** Contains heavy-logic brand art that involves interaction, state, and animation. Lighter brand art lives in `@expanse/assets/brand/`.

#### @expanse/observability
Analytics, custom events, and monitoring.

**Source:** `ExpanseFrontend/packages/ui/application/` (Analytics.context.tsx, event tracking)

```
src/
├── analytics/
│   ├── AnalyticsProvider.tsx
│   ├── GoogleAnalytics.tsx
│   └── useAnalytics.ts
│
├── events/
│   ├── EventProvider.tsx
│   ├── useTrackEvent.ts
│   └── eventTypes.ts
│
├── logging/
│   └── structuredLogger.ts
│
└── performance/
    └── webVitals.ts
```

---

### Content Layer (Deferred)

#### @expanse/content
CMS integration and content rendering.

```
src/
├── blocks/             # Testimonial, FeatureCard, etc.
├── markdown/           # MD/MDX rendering
└── cms/                # CMS integration
```

#### @expanse/i18n
Internationalization.

```
src/
├── locale/             # Detection, switching
├── format/             # Date, number, currency
├── rtl/                # RTL support
└── translation/        # Translation utilities
```

---

### Orchestration Layer

#### @expanse/application
Provider composition and app setup.

```
src/
├── providers/
│   └── ApplicationProvider.tsx   # Composes all providers
│
├── components/
│   ├── ErrorBoundary.tsx
│   └── RouteGuard.tsx
│
├── context/
│   └── RoutesContext.tsx
│
└── hooks/
    └── useApplication.ts
```

**Usage:**
```tsx
import { ApplicationProvider } from '@expanse/application';

function App() {
  return (
    <ApplicationProvider
      theme="primary"
      themeMode="light"
      layoutStyle="standard"
    >
      {children}
    </ApplicationProvider>
  );
}
```

---

## Design Principles

### 1. Types Live With Their Package
```typescript
// ✅ Good: Type defined where it belongs
@expanse/user/src/types/user.ts

// ✅ Good: Import from source
import { User } from '@expanse/user';

// ✅ Optional: @expanse/types re-exports for convenience
import { User } from '@expanse/types';
```

### 2. Thin Platform Abstractions
Navigation abstraction wraps platform routers, doesn't replace them:
```typescript
// NavigationProvider wraps the platform router
<WebNavigationProvider>     {/* Wraps Next.js */}
<MobileNavigationProvider>  {/* Wraps React Navigation */}

// Components use universal hooks
const { navigate, back } = useNavigation();
```

### 3. Opinionated Templates, Flexible Primitives
```typescript
// Template: Use default or override slots
<StandardLayout
  header={<CustomHeader />}  // Override
  sidebar                     // Use default
>

// Primitive: Full composition control
<PageShell>
  <MyHeader />
  <MaxWidthContainer>{content}</MaxWidthContainer>
  <MyFooter />
</PageShell>
```

### 4. Publish-Ready Structure
Each package:
- Has complete `package.json`
- Exports only through `src/index.ts`
- Has no imports reaching outside its boundary
- Can be `npm publish`ed independently

---

## Repository Structure

```
4eye/
├── apps/
│   ├── 4eye-web/           # Main 4eye web app
│   ├── 4eye-mobile/        # React Native app
│   ├── api/                # NestJS backend
│   └── expanse-services/   # ExpanseServices website (from PersonalNext)
│
├── packages/
│   ├── @expanse/           # Reusable infrastructure
│   │   ├── types/
│   │   ├── utils/
│   │   ├── validation/     ✅
│   │   ├── theme/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── assets/
│   │   ├── auth/           ✅
│   │   ├── user/
│   │   ├── game/
│   │   ├── observability/
│   │   ├── content/        (deferred)
│   │   ├── i18n/           (deferred)
│   │   └── application/
│   │
│   └── @4eye/              # 4eye-specific packages
│       ├── types/
│       ├── core/
│       ├── features/
│       ├── ai-sdk/
│       └── graphql-schema/
│
└── docs/
    └── planning/
        └── expanse-packages/
            ├── ARCHITECTURE.md      # This file
            └── IMPLEMENTATION_PLAN.md
```

---

## Status Summary

| Package | Status | Notes |
|---------|--------|-------|
| @expanse/validation | ✅ Complete | Zod schemas |
| @expanse/auth | ✅ Complete | Full auth system |
| @expanse/theme | ~80% | Needs integration testing |
| @expanse/shell | ~20% | Primitives exist, needs templates + nav |
| @expanse/ui | ~15% | 3 inputs, rest empty |
| @expanse/user | Placeholder | Move User type here |
| @expanse/assets | New | Brand + common assets |
| @expanse/game | New | Character, rewards |
| @expanse/observability | Placeholder | Was "analytics" |
| @expanse/utils | Partial | Some utilities exist |
| @expanse/types | New | Optional re-exports |
| @expanse/application | Placeholder | Provider composition |
| @expanse/content | Deferred | CMS integration |
| @expanse/i18n | Deferred | Internationalization |

## Notes
Explore option of @expanse/animation/ or similar inside assets