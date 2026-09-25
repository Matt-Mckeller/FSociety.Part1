# Plan Lottie Export & UI Alignment with expectations 10/22

Goal: Update the lottie naming tool to be doing what is actually desired. There is a difference in the flow, and current export functionality and the end goal.

---

# Prompt

Context: LottieNamingTool, LottieThemeingDemo, ExpanseLotties, LottieRegistry, etc

App says themes are being generated, ui looks good, says files will be downloaded as a zip. Actually its a single file with multiple exports, which is actually better than the current setup which has multiple separate files. Perhaps we can update the current configuration to do this, and also update the ui to say export themes.

# Active Project: Lottie System Architecture Improvements (1/06/26)

## Overview

Consolidate and simplify the Lottie naming, theming, and component systems. Current state has significant duplication and format mismatches.

## Task Tracking

### Task 1: ✅ COMPLETED - Homework Animation Integration

- Added to LottieThemingDemo, theme discovery, and registry
- Created TypeScript theme files (was only JSON)
- Fixed missing entries in lottieThemeDiscovery.ts and lottieThemeRegistry.ts

### Task 2: ✅ COMPLETED - Consolidate Theme Discovery & Registry

**Problem:** Two files with overlapping responsibilities:

- `lottieThemeDiscovery.ts` - hardcoded async functions
- `lottieThemeRegistry.ts` - hardcoded sync functions + type definitions

**Files:**

- `/packages/dynamicAssets/theming/lottieThemeDiscovery.ts` (now deprecated, re-exports from registry)
- `/packages/dynamicAssets/theming/lottieThemeRegistry.ts` (single source of truth)

**Changes Made:**

- Added `VariantThemeSupport` interface for per-variant theme lists
- Refactored `ANIMATION_THEME_SUPPORT` to use `variantThemes` array
- Added async functions: `getThemesForVariant`, `getAllVariants`, `getAllThemes`, `themeExists`
- Deprecated `lottieThemeDiscovery.ts` - now just re-exports from registry

### Task 3: ✅ COMPLETED - Create Lottie Component Factory

**Problem:** Each component is ~150 lines with ~80% identical boilerplate

**Files Created:**

- ✅ `/packages/dynamicAssets/theming/createLottieComponent.tsx` - Factory function
- ✅ `/packages/dynamicAssets/lotties/Homework/Homework.tsx` - Now uses factory (33 lines vs 151)
- 📦 `/packages/dynamicAssets/lotties/Homework/Homework.original.tsx` - Backup of original

**Factory Features:**

- Full theming support (preset themes and custom hex colors)
- Variant support
- Ref forwarding with animation control methods (play, pause, stop, goToFrame)
- Theme preloading for faster switching
- Automatic CSS class name generation
- TypeScript generics for type safety

**Result:**

```tsx
// Before: 151 lines
// After: 33 lines (including imports and comments)
export const Homework = createLottieComponent({
  animationName: "Homework",
  baseAnimationData: BaseAnimationData,
  schema: HomeworkSchema,
})
```

**Note:** SSR error in terminal is unrelated - it's from lottie-web being imported by other components (AngelWingsHalo) that don't use dynamic imports.

### Task 4: ✅ COMPLETED - Fix Export Format Mismatch

**Problem:** Naming tool exports `.json` theme files, but runtime requires `.ts`

**Files Created/Modified:**

- `/apps/playground/src/app/lottie-naming-tool/services/theme/` - New theme generation service
  - `colorPalettes.ts` - 10 color palettes (5 colors × 2 modes) from UI theme configs
  - `types.ts` - Theme generation types
  - `themeGenerator.ts` - AI-powered theme generation (1-3 themes per API call)
  - `themeFileGenerator.ts` - TypeScript file generators
  - `index.ts` - Exports
- `/apps/playground/src/app/lottie-naming-tool/components/ThemeGenerationPanel.tsx` - New UI component
- `/apps/playground/src/app/api/lotties/export/route.ts` - Updated to support subdirectories

**Features:**

- AI generates color mappings using Gemini 2.5 Pro
- Generates TypeScript `.ts` files matching `LottieThemeConfig` interface
- Generates React component using `createLottieComponent()` factory
- Generates registry entry snippet for `lottieThemeRegistry.ts`
- Supports variant naming (e.g., "default", "minimal")
- Progressive generation with status updates
- 1-3 themes per API call for quality
- File export to animation's source directory with subdirectory creation

**Status:** Completed - Ready for testing

### Task 5: ⬜ TODO - Standardize Asset Organization

**Standard folder structure per animation:**

```
/lotties/{AnimationName}/
  ├── {AnimationName}.json
  ├── {AnimationName}.tsx
  ├── {AnimationName}.expanse-lottie.ts
  └── themes/
      ├── default/
      │   └── {theme}.ts
      └── {variant}/
```

**Cleanup tasks:**

- Remove `.unified-schema.ts` files (legacy naming)
- Remove duplicate `.json` theme files
- Update barrel exports

**Status:** Not started

### Task 6: ⬜ FUTURE - Auto-Register New Animations

**Goal:** When exporting from naming tool:

1. Auto-add to theme registry
2. Auto-generate component file using factory
3. Auto-update barrel exports

**Status:** Future enhancement

---

# Status Update From Prior to 1/05/26

// Update status and current state
// Update expected state
// Plan Goals
// Plan Tasks

**Exporting Updates from UI**
Homework Lottie Animation Migrated to Themed and Expanse Variant.

# New Tasks/Goals 1/05/26

Relevant Projects/Areas: lottie naming project, lottie themeing project, and expanse lotties, and others as needed

- Goals: Improved architecture & code cleanliness. Exports completely working and updated with the details listed below. Others as stated below.
- [x] Test Exports for the Homework Expanse Lottie. Make sure the elements were renamed as expected when exported from the UI. Add this animation to the display in the Lottie Theming demo & make sure its working as expected.
  - Updates: Seemed like it was missing an entry for the lottieThemeDiscovery.ts, also a LottieThemeRegistry.ts file
    - Also the theme files utilize typescript files but we exported as json, so this likely needs updated
    - After working with AI the lottie animation seems to be working.
- **Architecture Review & Improvements:** There seems to be alot of reused code for the Expanse Lottie Components, Improve the readability and reusability if possible Ideally the components are drastically simplified unless they need custom overrides. Goal = Improve Reusability and abstraction of the ExpanseLottie Interface Etc, simplify but maintain support for future expansion as these will be reused in many different places. Also the current lottie themeing project exports as json but implementation seems to utilize typescript, so this likely needs updated.
- **Architecture Review & Improvements 2:** Can we better organize these assets so that they show up and are managed from their folder better in terms of the lottie naming demo exports, gallery display etc. Generally review current folder/directory structure and management of assets and options for improving this area. Also a related piece seems to be the lottieThemeDiscovery.ts and LottieThemeRegistry.ts file

# Current State

Exporting as expected?
Needs tested.
Is the quality of the layer naming good? Is it functional and operating?
Need to test, also is it exporting themes?

# Expected State

Able to export with the Expanse Lottie TypeScript Component
Theme Variants automatically created and exported
Export able to save to folder location rather than a download
Export and logic happening on the backend
Some good way to manage template changes as the lottie expanse component changes

# Other Tasks

- Update the minified json export name to match the `{animationName}_ExpanseNamingExport.json` format

# Some Relevant files / locations

- /Users/mm/Projects/ExpanseFrontend/apps/playground/src/app/lottie-naming-tool
- /Users/mm/Projects/ExpanseFrontend/packages/dynamicAssets/lotties
- /Users/mm/Projects/ExpanseFrontend/packages/dynamicAssets/lotties/RocketLaunch/RocketLaunch.unified-schema.ts ( Correct )
- /Users/mm/Projects/ExpanseFrontend/packages/dynamicAssets/lotties/RocketLaunch/RocketLaunchUpAndRightRed_ExpanseNamingExport.json ( CORRECT )
- /Users/mm/Projects/ExpanseFrontend/packages/dynamicAssets/lotties/SmilingFace/SmilingFaceAnimation.unified-schema.ts ( Current Unified Schema Export. WRONG. IS PARTIAL. )

# Questions

- Whats the current process flow for the lottie application?
