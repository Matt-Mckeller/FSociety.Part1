# Plan 05 — Remove Duplicate Headers from the Docs Page

**Target:** `ExpanseFrontend/apps/command-center` (package name `planning`), route `/docs/documentation/*`
**Effort:** ~1 hour. Smallest, most isolated change of the five plans — do it first.

> ## ✅ DONE — 2026-08-03
> Steps 1 and 2 applied; Step 4 turned out to be unnecessary (see below). `tsc --noEmit` clean.
> - `SectionRenderer.tsx` — duplicate `<h4>` removed; `<Box>` wrapper dropped with it
> - `sectionRegistry.ts` — `ExpanseEDU Highlights` → `Expanse EDU Highlights`
>
> Still open: Step 3 (skeleton height check) and the §4 visual verification, which need the app running.

---

## 1. Root cause

Every documentation section renders its title **twice**, from two independent places.

**Header #1 — `SectionRenderer.tsx:73-82`.** Wraps every migrated section and emits the registry
title:

```tsx
<Typography variant="h4" gutterBottom fontWeight={700} sx={{ display:"flex", alignItems:"center", gap:1 }}>
  {meta.icon && <span>{meta.icon}</span>}
  {meta.title}
</Typography>
<SectionComponent />
```

**Header #2 — `common/DocSection.tsx:48-50`.** Every section component's own wrapper emits its
title again:

```tsx
<Typography variant="h4" fontWeight={700} gutterBottom>
  {icon && `${icon} `}{title}
</Typography>
```

**Scope:** 124 `.tsx` files under `components/docs/sections/`; **123 use `DocSection`**. The only
one that does not is `_template.tsx`. So the duplication is universal, not incidental.

**It is also inconsistent.** The two titles come from different sources and have already drifted:

| Section | Registry title (`sectionRegistry.ts`) | `DocSection` title |
|---|---|---|
| `highlights` | `⭐ ExpanseEDU Highlights` | `⭐ Expanse EDU Highlights` |

Most sections pull their `DocSection` title from a data module
(`` <DocSection title={`🤖 ${aiUsage.title}`}> ``), while the registry hard-codes a second copy —
which is why they drift and why fixing this is worth doing properly rather than by hiding one.

---

## 2. Decision — keep `DocSection`, drop the `SectionRenderer` header

`DocSection` is the right survivor:

- It is the **richer** header — it also owns `description`, `actions`, and the `Divider`
  (`DocSection.tsx:41-66`). 13 sections already pass `description`; those would lose their subtitle
  if `DocSection` were the one removed.
- It is **co-located with the content**, so the title tracks the data module the section renders.
- Removing it instead would mean editing 123 files. Removing the `SectionRenderer` header is a
  **one-file change**.

The registry `title`/`icon` fields stay — they are still needed for navigation labels and for the
loading fallback. They simply stop being rendered as a page header.

---

## 3. Steps

### Step 1 — Remove the duplicate header

`components/docs/SectionRenderer.tsx` — delete the `<Typography variant="h4">` block at `:73-82`
and the now-unneeded `Box` wrapper, leaving:

```tsx
return (
  <Suspense fallback={<SectionLoadingFallback />}>
    <SectionComponent />
  </Suspense>
);
```

`meta` is still read for the `!meta` guard at `:63-66`, so that stays. Drop the now-unused
`Typography` import only if nothing else in the file uses it — `SectionErrorFallback` does
(`:45-52`), so **keep it**.

### Step 2 — Reconcile the drifted titles

With only one header rendering, the registry title becomes nav-only. Sweep for cases where the two
disagree and make the registry match the rendered title, so navigation and page header read the
same:

```bash
# List registry titles next to their section's DocSection title for manual diff
grep -A3 -E '^\s+"?[a-z-]+"?: \{' src/components/docs/registry/sectionRegistry.ts
```

Known: `highlights` — registry says `ExpanseEDU Highlights`, page says `Expanse EDU Highlights`.
Prefer the spaced form (`Expanse EDU`) — it matches the brand usage elsewhere in the repo.

### Step 3 — Align the loading fallback

`SectionLoadingFallback` (`:24-37`) renders a `Skeleton` sized for the header that is about to
disappear from `SectionRenderer` — but `DocSection`'s header arrives with the lazy chunk, so the
skeleton is still correct. Leave it; verify visually in Step 4 that the skeleton height matches
`DocSection`'s header + divider so there is no layout jump on load.

### Step 4 — ~~Fix `_template.tsx`~~ — not needed

**Correction:** an earlier `comm`-based diff misreported this (broken locale collation). Rechecked
with `grep -rL 'DocSection'`: the only file under `sections/` not using `DocSection` is
`rewards/rewardMeta.tsx`, which is a **shared icon/color helper, not a section** and is not in the
registry. `_template.tsx` already wraps in `DocSection` correctly.

All 123 real sections use `DocSection`, so Step 1 alone fixes every page.

---

## 4. Verification

1. `pnpm build` in `apps/command-center` — clean.
2. Load `/docs/documentation/?section=highlights` — exactly one `⭐ Expanse EDU Highlights`.
3. Spot-check one section per category (~20 categories), including the 13 with `description` — the
   subtitle must still render.
4. Check a slow-network load (throttle to 3G): skeleton → content with no header flash and no
   vertical jump.
5. Confirm nav labels still read correctly in `DocsNavigation` — Step 2 edits the same strings.

---

## 5. Related, out of scope

`src/docs/docs-layout-improvement-plan.md` and `docs-section-refactor-plan.md` already exist in this
app and cover broader docs-layout work. This plan deliberately does **only** the duplicate header
so it can ship immediately; fold the rest into those documents.
