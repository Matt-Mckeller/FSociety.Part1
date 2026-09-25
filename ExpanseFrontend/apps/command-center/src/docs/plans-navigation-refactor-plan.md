# Plans Section Navigation Refactor Plan

## Executive Summary

The Plans section (`/docs/plans`) has **116 broken related document links** across 34 data files, plus breadcrumb navigation issues. Unlike DocsView.tsx (which had 10k+ lines of dead code), PlansView.tsx is already well-architected at 355 lines. This refactor focuses on **fixing navigation bugs** rather than architectural overhaul.

---

## Current Issues

### 1. Broken Related Document Links (Critical)
**Impact:** All "Related Documents" links navigate to wrong URLs

```typescript
// Example from data/plans/modules/generation/pipelines/overview.ts
relatedDocuments: [
  { path: '/modules/generation/pipelines/data-stacking' }, // ❌ Navigates to /modules/...
  // Correct: '/docs/plans/modules/generation/pipelines/data-stacking'
]
```

**Scope:** 116 paths across 34 files

### 2. Breadcrumbs Build Invalid Paths (High)
**Impact:** Clicking breadcrumb segments navigates to non-existent routes

```typescript
// Current: Builds links from URL segments
// Path: /docs/plans/modules/generation/overview
// Renders: Home > Docs > Plans > Modules > Generation > Overview
//          ↑ /docs (wrong) ↑ /docs/plans (ok) ↑ /docs/plans/modules (404!)
```

**Root cause:** Breadcrumbs creates links for every path segment, but `/docs` and `/docs/plans/modules` don't have routes.

### 3. Pipeline Sub-Routes Missing from Sidebar (Medium)
**Impact:** 6 pipeline detail pages unreachable from navigation

Missing routes:
- `/docs/plans/modules/generation/pipelines/data-stacking`
- `/docs/plans/modules/generation/pipelines/audience-reviews`
- `/docs/plans/modules/generation/pipelines/cultural-alignment`
- `/docs/plans/modules/generation/pipelines/perspective-balancing`
- `/docs/plans/modules/generation/pipelines/design-review`
- `/docs/plans/modules/generation/pipelines/examples`

### 4. PLANS_BASE_PATH Duplicated (Low)
**Impact:** Maintenance burden, potential drift

Defined independently in:
- `PlansView.tsx` (line 48)
- `Sidebar.tsx` (line 54)
- `Breadcrumbs.tsx` (line 9)

---

## Solution Architecture

### Approach: Component-Level Fixes (NOT Data File Changes)

**Rationale:**
- Data files should be **portable** (usable in other apps without path coupling)
- Paths in data files are **relative to the module root** by design
- Fix at the **rendering layer** where context (mount point) is known
- Single changeset of ~5 files vs 34 files

### Changes Required

#### 1. Create Shared Constants (`constants/plans.ts`)
```typescript
// Single source of truth for Plans section configuration
export const PLANS_BASE_PATH = '/docs/plans';
export const PLANS_MODULES_PATH = `${PLANS_BASE_PATH}/modules`;
```

#### 2. Fix RelatedLinks Component
```typescript
// Before
<RouterLink to={doc.path}>  // doc.path = '/modules/generation/overview'

// After
const resolvePath = (path: string) => {
  if (path.startsWith('/modules/')) {
    return `${PLANS_BASE_PATH}${path}`;
  }
  return path.startsWith('/') ? `${PLANS_BASE_PATH}${path}` : path;
};
<RouterLink to={resolvePath(doc.path)}>
```

#### 3. Fix Breadcrumbs Component
```typescript
// Before: Links to /docs, /docs/plans, /docs/plans/modules (broken)
// After: Skip first 2 segments (docs/plans), only link valid routes

// New logic:
// - Start breadcrumb AFTER /docs/plans 
// - Only create links for paths that have defined routes
// - "Modules" segment: link to parent module (generation), not /modules
```

#### 4. Add Pipeline Sub-Routes to Sidebar
```typescript
// Add children array to pipelines nav item
{
  id: 'gen-pipelines',
  label: 'Pipelines & Review',
  path: `${PLANS_BASE_PATH}/modules/generation/pipelines`,
  children: [
    { id: 'pipeline-data-stacking', label: 'Data Stacking', path: `${PLANS_BASE_PATH}/modules/generation/pipelines/data-stacking` },
    { id: 'pipeline-audience-reviews', label: 'Audience Reviews', path: `${PLANS_BASE_PATH}/modules/generation/pipelines/audience-reviews` },
    // ... etc
  ]
}
```

#### 5. Add Modules Index Route
```typescript
// PlansView.tsx - catch users who navigate to /docs/plans/modules
<Route 
  path="modules" 
  element={<Navigate to={PLANS_BASE_PATH} replace />} 
/>
```

---

## Implementation Plan

### Phase 1: Setup (2 files)
| File | Action |
|------|--------|
| `constants/plans.ts` | CREATE - shared constants |
| `constants/index.ts` | CREATE - barrel export |

### Phase 2: Core Fixes (3 files)
| File | Lines | Action |
|------|-------|--------|
| `RelatedLinks.tsx` | ~28 | MODIFY - add path resolution |
| `Breadcrumbs.tsx` | ~112 | MODIFY - fix segment handling |
| `Sidebar.tsx` | ~420 | MODIFY - import constant, add pipeline children |

### Phase 3: Routes (1 file)
| File | Lines | Action |
|------|-------|--------|
| `PlansView.tsx` | ~355 | MODIFY - import constant, add modules redirect |

---

## File-by-File Changes

### 1. `src/constants/plans.ts` (NEW)
```typescript
/**
 * Plans section configuration
 * Single source of truth for navigation paths
 */
export const PLANS_BASE_PATH = '/docs/plans';
export const PLANS_MODULES_PATH = `${PLANS_BASE_PATH}/modules`;
```

### 2. `src/constants/index.ts` (NEW)
```typescript
export * from './plans';
```

### 3. `RelatedLinks.tsx` (MODIFY)
- Import `PLANS_BASE_PATH` from constants
- Add `resolvePath()` helper function
- Apply to `RouterLink to={...}` prop

### 4. `Breadcrumbs.tsx` (MODIFY)
- Import `PLANS_BASE_PATH` from constants
- Filter out first 2 segments ('docs', 'plans') from breadcrumb links
- Only render clickable links for valid routes (skip 'modules' as standalone)
- Keep current segment as non-clickable text

### 5. `Sidebar.tsx` (MODIFY)
- Import `PLANS_BASE_PATH` from constants
- Remove local constant definition
- Add `children` array to generation > pipelines item with 6 sub-routes

### 6. `PlansView.tsx` (MODIFY)
- Import `PLANS_BASE_PATH` from constants
- Remove local constant definition
- Add `<Route path="modules" element={<Navigate to={PLANS_BASE_PATH} replace />} />`

---

## Verification Checklist

- [ ] TypeScript compiles (`npx tsc --noEmit`)
- [ ] No console errors on page load
- [ ] Related documents links navigate correctly
- [ ] Breadcrumbs only link to valid routes
- [ ] Pipeline sub-pages accessible from sidebar
- [ ] `/docs/plans/modules` redirects to dashboard
- [ ] Existing navigation still works

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Break existing working links | Low | High | All changes are additive (prefix, not replace) |
| Miss some broken paths | Medium | Low | Path resolution handles all `/modules/` prefixes |
| Breadcrumb regression | Low | Medium | Keep Home link working, test all levels |

---

## Estimated Effort

| Phase | Files | Estimated Lines Changed |
|-------|-------|------------------------|
| Constants | 2 (new) | ~10 |
| Core Fixes | 3 | ~50 |
| Routes | 1 | ~10 |
| **Total** | **6** | **~70** |

Compare to data file approach: 34 files, ~116 line changes, ongoing maintenance burden.

---

## Decision

**Proceed with Option B: Component-level fixes**

This approach:
1. Maintains data portability
2. Creates single source of truth for paths
3. Fixes root cause at rendering layer
4. Minimizes changeset
5. Avoids coupling data to specific mount points
