# Command Center /docs Layout Improvement Plan

## Executive Summary

This plan identifies high-value improvements to the `/docs/plans` and `/docs/documentation` sections focusing on layout, organization, and visual polish. Prioritized by impact and effort.

---

## Current Issues Identified

### 1. **Extra Space Between Sidebar and Content** (HIGH PRIORITY)
**Location:** [MainLayout.tsx](../components/plans/layout/MainLayout.tsx)

**Root Cause:** The main content area has `px: { xs: 2, sm: 2.5, md: 3 }` padding, but combined with the `ml: DRAWER_WIDTH` margin, creates excessive horizontal space.

**Fix:**
```typescript
// Before (MainLayout.tsx line 96-101)
<Box sx={{ px: { xs: 2, sm: 2.5, md: 3 }, py: 2.5, ... }}>

// After
<Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 2.5, pl: { md: 4 }, ... }}>
```

### 2. **Content Width Too Wide on Large Screens** (HIGH PRIORITY)
**Issue:** On large monitors, text spans too wide making it hard to read.

**Fix:** Add `maxWidth` constraint to content area:
```typescript
<Box sx={{ 
  maxWidth: 960,  // Or 1100 for wider content
  mx: 'auto',     // Center content
  ...
}}>
```

### 3. **Search Bar Not Functional** (MEDIUM PRIORITY)
**Location:** [MainLayout.tsx](../components/plans/layout/MainLayout.tsx#L70-L95)

The search input exists but doesn't filter anything. Either:
- Remove it (simplify)
- Implement actual search with fuzzy matching

### 4. **Inconsistent Navigation Patterns** (MEDIUM PRIORITY)
**Issue:** Plans uses URL paths (`/docs/plans/modules/generation`), Docs uses query params (`?section=highlights`).

**Recommendation:** Standardize on URL paths for better:
- Browser history/back button
- Shareable links
- SEO (if applicable)

---

## High-Value Improvements

### Tier 1: Quick Wins (< 1 hour each)

| # | Improvement | Impact | Files |
|---|-------------|--------|-------|
| 1 | **Fix sidebar-content gap** | High | `MainLayout.tsx` |
| 2 | **Add content max-width** | High | `MainLayout.tsx` |
| 3 | **Remove non-functional search** | Medium | `MainLayout.tsx` |
| 4 | **Add sticky TOC for long pages** | High | `GenericModulePage.tsx` |
| 5 | **Improve mobile menu icon** | Low | `MainLayout.tsx` |

### Tier 2: Medium Effort (1-3 hours each)

| # | Improvement | Impact | Files |
|---|-------------|--------|-------|
| 6 | **Add collapsible sidebar on desktop** | Medium | `MainLayout.tsx`, `Sidebar.tsx` |
| 7 | **Add keyboard navigation (arrows)** | Medium | `Sidebar.tsx` |
| 8 | **Add loading skeletons** | Medium | `GenericModulePage.tsx` |
| 9 | **Improve section expand/collapse UX** | Medium | `Section.tsx` |
| 10 | **Add "Expand All/Collapse All" button** | Low | `SectionList` |

### Tier 3: Larger Efforts (3+ hours)

| # | Improvement | Impact | Files |
|---|-------------|--------|-------|
| 11 | **Migrate Docs to URL-based routing** | High | `DocsView.tsx`, `DocsNavigation.tsx` |
| 12 | **Add full-text search** | High | New component |
| 13 | **Add dark mode toggle** | Medium | Theme system |
| 14 | **Add print-friendly styles** | Low | CSS |

---

## Detailed Implementation: Tier 1

### 1. Fix Sidebar-Content Gap

**File:** `src/components/plans/layout/MainLayout.tsx`

```tsx
// Current (lines 96-101)
<Box
  sx={{
    px: { xs: 2, sm: 2.5, md: 3 },
    py: 2.5,
    flexGrow: 1,
    width: "100%",
  }}
>

// Proposed
<Box
  sx={{
    px: { xs: 2, sm: 3, md: 4, lg: 5 },
    py: { xs: 2, md: 3 },
    flexGrow: 1,
    width: "100%",
    maxWidth: { lg: 1100 },
  }}
>
```

### 2. Add Content Max-Width

Same file, wrap content in a constrained container:

```tsx
<Box
  sx={{
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 2, md: 3 },
    flexGrow: 1,
  }}
>
  <Box sx={{ maxWidth: 960, width: '100%' }}>
    <Breadcrumbs />
    <Box sx={{ mt: 1 }}>
      <Outlet />
    </Box>
  </Box>
</Box>
```

### 3. Remove Non-Functional Search

**Option A:** Remove completely (simplest)
```tsx
// Delete lines 70-95 (TextField component)
```

**Option B:** Replace with page title or breadcrumb
```tsx
<Typography variant="h6" sx={{ fontWeight: 600 }}>
  4up Plans
</Typography>
```

### 4. Add Sticky Table of Contents

For long module pages, add a right-side TOC:

**File:** `src/components/plans/pages/GenericModulePage.tsx`

```tsx
export function GenericModulePage({ module }: GenericModulePageProps) {
  const sectionIds = module.sections.map(s => ({ id: s.id, title: s.title }));
  
  return (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <ModulePage module={module}>
          <SectionList sections={module.sections} />
          {module.relatedDocuments && (
            <RelatedLinks documents={module.relatedDocuments} />
          )}
        </ModulePage>
      </Box>
      
      {/* Sticky TOC - only show if enough sections */}
      {sectionIds.length > 3 && (
        <Box
          sx={{
            width: 200,
            flexShrink: 0,
            display: { xs: 'none', lg: 'block' },
            position: 'sticky',
            top: 100,
            alignSelf: 'flex-start',
          }}
        >
          <Typography variant="overline" color="text.secondary">
            On This Page
          </Typography>
          <List dense disablePadding>
            {sectionIds.map(({ id, title }) => (
              <ListItemButton 
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                sx={{ py: 0.5, borderRadius: 1 }}
              >
                <ListItemText 
                  primary={title}
                  primaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
```

### 5. Improve Mobile Menu

Add better visual feedback for the mobile menu button:

```tsx
// In MainLayout.tsx AppBar section
{isMobile && (
  <IconButton
    edge="start"
    onClick={() => setSidebarOpen(true)}
    sx={{
      mr: 2,
      color: "text.primary",
      bgcolor: alpha(theme.palette.primary.main, 0.05),
      "&:hover": {
        bgcolor: alpha(theme.palette.primary.main, 0.1),
      },
    }}
  >
    <MenuIcon />
  </IconButton>
)}
```

---

## Layout Recommendations

### Current Layout Issues

```
┌──────────────────────────────────────────────────────────────┐
│ Header (80px)                                                │
├─────────────┬────────────────────────────────────────────────┤
│             │  ← Extra gap here                              │
│  Sidebar    │  ┌──────────────────────────────────────────┐  │
│  (280px)    │  │ Content too wide on large screens       │  │
│  Fixed      │  │                                          │  │
│             │  │                                          │  │
│             │  └──────────────────────────────────────────┘  │
│             │                                                │
└─────────────┴────────────────────────────────────────────────┘
```

### Proposed Layout

```
┌──────────────────────────────────────────────────────────────┐
│ Header (80px) - Simplified, no non-functional search        │
├─────────────┬──────────────────────────────────┬─────────────┤
│             │  Content (max-width: 960px)      │ TOC (200px) │
│  Sidebar    │  ┌──────────────────────────────┐│             │
│  (280px)    │  │ Readable width              ││  Sticky     │
│  Collapsible│  │ Proper spacing              ││  On This    │
│             │  │                              ││  Page       │
│             │  └──────────────────────────────┘│             │
│             │                                  │             │
└─────────────┴──────────────────────────────────┴─────────────┘
```

---

## Priority Order for Implementation

1. **Fix sidebar-content gap** - Immediate visual improvement
2. **Add content max-width** - Better readability
3. **Remove/replace search** - Cleaner UI, removes broken feature
4. **Add sticky TOC** - Better navigation for long pages
5. **Collapsible sidebar** - More content space when needed

---

## Files to Modify

| File | Changes |
|------|---------|
| `layout/MainLayout.tsx` | Gap fix, max-width, search removal |
| `pages/GenericModulePage.tsx` | Sticky TOC |
| `content/Section.tsx` | Add `id` attributes for TOC links |
| `navigation/Sidebar.tsx` | Collapse toggle (optional) |

---

## Estimated Total Effort

| Tier | Items | Time |
|------|-------|------|
| Tier 1 (Quick Wins) | 5 | ~2-3 hours |
| Tier 2 (Medium) | 5 | ~8-12 hours |
| Tier 3 (Large) | 4 | ~20+ hours |

**Recommended:** Start with Tier 1 items 1-3 for immediate impact.
