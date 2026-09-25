# Layout Extraction Plan - ExpanseFrontend → @expanse/shell

**Date:** 2026-03-26  
**Phase:** 2.2 - Extract Layout System  
**Status:** In Progress

---

## Overview

Extract layout primitives, context, and components from ExpanseFrontend to create the @expanse/shell package.

### System Capabilities

- **Layout Context**: Snackbar, loading spinner, and drawer state management
- **Layout Components**: Snackbar, loading indicators, backdrop containers, navigation components
- **Responsive Utilities**: Device detection, window dimensions (already in @expanse/theme)
- **Theme Integration**: MUI breakpoints, z-index layering, spacing utilities

---

## Extraction Strategy

### ✅ **What We're Keeping**

1. **LayoutProvider & Context**
   - Snackbar state management (message, type, open/close methods)
   - Loading spinner state (process ID queue for stacked loading)
   - Drawer state (open/close for side navigation)
   - Type definitions: `LayoutContextType`, `SnackbarProps`, `DrawerProps`, `LoadingSpinnerProps`

2. **Core Layout Components**
   - `Snackbar` — Toast notification UI (wraps MUI Snackbar + LayoutContext)
   - `ExpanseLoadingSpinner` & `CenteredExpanseLoadingSpinner` — Loading indicators with GSAP animations
   - `BackdropContainer` — Fixed backdrop utility
   - `LightDarkModeToggleSwitch` — Theme toggle switch
   - `SectionSpacer` — Vertical spacing utility
   - `ExpandableNavAccordion` — Collapsible navigation menu

3. **Navigation Components (with refactoring)**
   - `NavLink` — Navigation link with optional analytics tracking
   - `NestableNavLink` — Nested navigation link

4. **Utilities**
   - Z-index constants (drawer: 1200, modal: 1300, snackbar: 1400)
   - **Note:** useWindowDimensions and useDeviceType are already in @expanse/theme

### 🔧 **What We're Adapting**

1. **LoadingSpinner Logo Dependency**
   - Remove hardcoded `expanse.dynamicAssets/logo` import
   - Make logo injectable via props or React Context
   - Provide default fallback (MUI CircularProgress)

2. **NavLink Analytics Dependency**
   - Make AnalyticsContext optional
   - Add optional `onNavigate` callback prop
   - Analytics tracking becomes opt-in, not required

3. **DEVICE_TYPE Type**
   - Already defined in @expanse/theme/hooks/useDeviceType.ts
   - Re-export from layout for convenience

### ❌ **What We're NOT Extracting**

1. **App Shell Components** (Not reusable infrastructure)
   - `PageHeader`, `PageFooter`, `SideDrawer`, `StandardLayout` from apps
   - These are app-specific patterns to be copied/composed, not shared packages
   - Per PACKAGE_ARCHITECTURE.md: "Layout primitives in @expanse/shell (apps build PageHeader/Footer/Drawer)"

2. **Game-Specific Components**
   - `GameDrawer` — Expanse game-specific
   - Character components — Not layout-related

3. **Data Visualization Components** (Not layout)
   - `ExpandingBar`, `ExpandingBorderBox`, `ProgressBar`, `TripleDash`
   - These will go in @expanse/ui (UI components package)

4. **Already Extracted**
   - `useWindowDimensions` — Already in @expanse/theme
   - `useDeviceType` — Already in @expanse/theme

---

## File-by-File Extraction Plan

### **Phase 1: Core Context**

#### 1. `src/context/LayoutProvider.tsx` 🔧
- **Source**: `ExpanseFrontend/packages/ui/application/context/Layout.context.tsx`
- **Action**: Direct copy with minor cleanup
- **Changes**:
  - Update imports (use @expanse/theme for DEVICE_TYPE if needed)
  - Keep all three state managers (snackbar, loading, drawer)
  - Export: `LayoutProvider`, `LayoutContext`, internal hooks

#### 2. `src/types/index.ts` ✅
- **Source**: `ExpanseFrontend/packages/ui/application/types/index.ts` (layout types)
- **Content**:
  ```typescript
  export interface SnackbarProps {
    snackbarMessage: string
    showSnackbarError: (errorMessage: string) => void
    showSnackbarSuccess: (successMessage: string) => void
    closeSnackbar: () => void
    closeAlert: () => void
    snackbarOpen: boolean
    alertType: AlertColor
  }
  
  export interface DrawerProps {
    drawerOpen: boolean
    setDrawerOpen: (v: boolean) => void
  }
  
  export interface LoadingSpinnerProps {
    loading: boolean
    currentLoadingProcessIDs: string[]
    addLoadingProcessID: (processName: string) => void
    removeLoadingProcessID: (processName: string) => void
  }
  
  export type LayoutContextType = SnackbarProps & DrawerProps & LoadingSpinnerProps
  ```

### **Phase 2: Layout Components**

#### 3. `src/components/Snackbar.tsx` ✅
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/snackbar.component.tsx`
- **Action**: Direct copy
- **Dependencies**: React Context (LayoutContext), @mui/material

#### 4. `src/components/LoadingSpinner.tsx` 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/loadingSpinner.component.tsx`
- **Action**: Adapt to remove logo dependency
- **Changes**:
  - Remove `import { ExpanseLogo } from "expanse.dynamicAssets/logo"`
  - Add optional `logo?: React.ReactNode` prop
  - Default to `<CircularProgress />` if no logo provided
  - Keep GSAP animations

#### 5. `src/components/BackdropContainer.tsx` ✅
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/backdrop-container.compnent.tsx`
- **Action**: Direct copy
- **Dependencies**: @mui/system only

#### 6. `src/components/LightDarkModeToggle.tsx` ✅
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/lightDarkModeToggleSwitch.component.tsx`
- **Action**: Direct copy
- **Dependencies**: @mui/material, ThemeContext from @expanse/theme

#### 7. `src/components/SectionSpacer.tsx` ✅
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/sectionSpacer.component.tsx`
- **Action**: Direct copy
- **Dependencies**: @mui/material

#### 8. `src/components/ExpandableNavAccordion.tsx` ✅
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/expandableNavAccordion.component.tsx`
- **Action**: Direct copy
- **Dependencies**: @mui/material

#### 9. `src/components/NavLink.tsx` 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/navLink.component.tsx`
- **Action**: Adapt to make analytics optional
- **Changes**:
  - Remove required AnalyticsContext dependency
  - Add optional `onNavigate?: (path: string) => void` callback prop
  - If onNavigate provided, call it on navigation
  - Remove analytics imports

#### 10. `src/components/NestableNavLink.tsx` 🔧
- **Source**: `ExpanseFrontend/packages/ui/theme/components/layout/nestableNavLink.component.tsx`
- **Action**: Same as NavLink
- **Changes**: Make analytics optional

### **Phase 3: Export Structure**

#### 11. `src/components/index.ts` ✅
- **Action**: Re-export all layout components
- **Content**:
  ```typescript
  export { Snackbar } from './Snackbar'
  export { ExpanseLoadingSpinner, CenteredExpanseLoadingSpinner } from './LoadingSpinner'
  export { BackdropContainer } from './BackdropContainer'
  export { LightDarkModeToggle } from './LightDarkModeToggle'
  export { SectionSpacer } from './SectionSpacer'
  export { ExpandableNavAccordion } from './ExpandableNavAccordion'
  export { NavLink } from './NavLink'
  export { NestableNavLink } from './NestableNavLink'
  ```

#### 12. `src/context/index.ts` ✅
- **Action**: Re-export context
- **Content**:
  ```typescript
  export { LayoutProvider, LayoutContext } from './LayoutProvider'
  export { useSnackbar, useLoadingSpinner, useDrawer } from './LayoutProvider'
  ```

#### 13. `src/constants/index.ts` ✅
- **Action**: Z-index constants
- **Content**:
  ```typescript
  export const LAYOUT_Z_INDEX = {
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
  } as const
  ```

#### 14. `src/index.ts` ✅
- **Action**: Main package entry point
- **Content**:
  ```typescript
  // Context and providers
  export * from './context'
  
  // Components
  export * from './components'
  
  // Types
  export * from './types'
  
  // Constants
  export * from './constants'
  
  // Re-export device/window hooks from @expanse/theme
  export { useDeviceType, useWindowDimensions } from '@expanse/theme'
  export type { DEVICE_TYPE } from '@expanse/theme'
  ```

---

## Dependencies

### package.json additions:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.15.0",
    "@mui/system": "^5.15.0"
  },
  "dependencies": {
    "@expanse/theme": "workspace:*",
    "gsap": "^3.12.0",
    "next": "^14.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0"
  }
}
```

---

## Testing Strategy

### 1. **Unit Tests**
- LayoutProvider state management (snackbar, loading, drawer)
- Hook behavior (useSnackbar, useLoadingSpinner, useDrawer)
- Component rendering (all layout components)

### 2. **Integration Tests**
- LayoutProvider → Component integration
- Multi-process loading spinner queue
- Snackbar success/error message display
- Drawer open/close state

### 3. **Visual Testing**
- Create test page with all components
- Verify loading spinner animations (GSAP)
- Test snackbar positioning and alerts
- Verify responsive behavior

---

## Implementation Steps

1. ✅ Analyze ExpanseFrontend layout system
2. ⏳ Create extraction plan (this document)
3. ⏳ Extract LayoutProvider and Context
4. ⏳ Extract layout components (adapt LoadingSpinner, NavLink)
5. ⏳ Create export index files
6. ⏳ Update package.json dependencies
7. ⏳ Test layout system
8. ⏳ Commit Phase 2.2

---

## Success Criteria

- [ ] LayoutProvider manages snackbar, loading, and drawer state
- [ ] All layout components render without errors
- [ ] LoadingSpinner works without hardcoded logo (injectable)
- [ ] NavLink works without required analytics (optional callback)
- [ ] Full TypeScript type safety
- [ ] Re-exports device/window hooks from @expanse/theme
- [ ] Clean git commit with verification

---

## Notes

- **Hooks Already Extracted**: useWindowDimensions and useDeviceType were extracted in Phase 2.1 (@expanse/theme). We'll re-export them from @expanse/shell for convenience.
- **App Shells Not Included**: PageHeader, PageFooter, SideDrawer components stay in apps as composition examples per PACKAGE_ARCHITECTURE.md.
- **Logo Strategy**: LoadingSpinner logo will be injectable via props/context. Apps can provide their own logo or use default CircularProgress.
- **Analytics Strategy**: NavLink analytics will be optional via `onNavigate` callback. Apps can integrate their own analytics.

---

**Last Updated:** 2026-03-26  
**Status:** Ready to extract
