# Lottie Theming Edge Cases - Index

## Overview

This directory documents edge cases that can break or complicate Lottie animation theming. Each case includes:

- **What the problem is**
- **How it affects our JavaScript theming code**
- **Detection strategies**
- **Solutions for both AI prompts and code**

---

## Edge Cases by Priority

### 🔴 CRITICAL - Must Handle

#### 1. Precomp Embedded Layers

**File:** `01-PRECOMP_EMBEDDED_LAYERS.md`

**Impact:** ❌ **BREAKS THEMING** - Themes wrong location, visible colors don't change

**Quick Summary:**

- Precomps (`ty: 0`) can have embedded `layers` array
- Embedded layers are what Lottie renders, not `assets[X]` reference
- Must use paths like `layers[7].layers[0]...` not `assets[0].layers[0]...`

**Status:** ✅ **FIXED** - Prompt updated, RocketLaunch working

---

### 🟠 HIGH PRIORITY - Should Handle

#### 2. Layer Effects

**File:** `02-LAYER_EFFECTS.md`

**Impact:** ❌ **BREAKS THEMING** - Effects override shape colors completely

**Quick Summary:**

- Fill/Tint effects (`ty: 21, 20`) override ALL shape fills
- Must theme the effect color (`layers[X].ef[0].ef[0].v.k`), not shapes
- Common in After Effects exports

**Status:** ⚠️ **DOCUMENTED** - Needs prompt update + optional code changes

**Recommendation:** ✅ **ADD TO PROMPT** - Common enough to cause issues

---

### 🟡 MEDIUM PRIORITY - Consider Handling

#### 3. Shape Repeaters

**File:** `03-SHAPE_REPEATERS.md`

**Impact:** ⚠️ **USUALLY WORKS** - Paths typically stay valid, but can shift

**Quick Summary:**

- Repeaters (`ty: "rp"`) can shift item indices
- Usually added after fills, so paths stay valid
- Theming one fill affects all repeated copies (desired behavior)

**Status:** ⚠️ **DOCUMENTED** - Needs prompt update

**Recommendation:** ✅ **ADD TO PROMPT** - Good to document even if usually works

---

#### 4. Merge Paths

**File:** `04-MERGE_PATHS.md`

**Impact:** ⚠️ **PARTIALLY BROKEN** - Themes wrong fills in merged shapes

**Quick Summary:**

- Merge operations (`ty: "mm"`) combine shapes with boolean operations
- Only last shape's fill is visible
- AI should map only controlling fill, not all individual fills

**Status:** ⚠️ **DOCUMENTED** - Needs prompt update

**Recommendation:** 🤔 **CONSIDER** - Less common, but good to document

---

### 🟢 LOW PRIORITY - Document Only

#### 5. Multiple Fills/Strokes

**File:** `05-MULTIPLE_FILLS.md`

**Impact:** ✅ **WORKS BUT WASTEFUL** - Maps hidden elements unnecessarily

**Quick Summary:**

- Shapes can have multiple fills, only last is visible
- AI might map all fills, creating bloated theme files
- Should detect and map only visible (topmost) fill

**Status:** ⚠️ **DOCUMENTED**

**Recommendation:** 🤔 **OPTIONAL** - Works but creates waste

---

## Decision Matrix

| Edge Case               | Breaks Theming? | Common?     | Prompt Update | Code Update | Priority    |
| ----------------------- | --------------- | ----------- | ------------- | ----------- | ----------- |
| Precomp Embedded Layers | ✅ Yes          | Medium      | ✅ Done       | ❌ No       | 🔴 Critical |
| Layer Effects           | ✅ Yes          | Medium-High | ⏳ Todo       | ⚠️ Optional | 🟠 High     |
| Shape Repeaters         | ⚠️ Rarely       | Low-Medium  | ⏳ Todo       | ⚠️ Optional | 🟡 Medium   |
| Merge Paths             | ⚠️ Partial      | Low         | ⏳ Todo       | ⚠️ Optional | 🟡 Medium   |
| Multiple Fills          | ❌ No           | Medium      | ⏳ Todo       | ⚠️ Optional | 🟢 Low      |

---

## Recommended Action Plan

### Phase 1: Critical (Do Now)

- [x] ✅ Precomp embedded layers - DONE

### Phase 2: High Priority (Next)

- [ ] 🟠 Add Layer Effects to AI prompt
- [ ] 🟠 Add layer effects detection section
- [ ] 🟠 Add Example 4 with layer effects

### Phase 3: Medium Priority (Consider)

- [ ] 🟡 Add Shape Repeaters note to prompt
- [ ] 🟡 Add Merge Paths note to prompt
- [ ] 🟡 Add Multiple Fills optimization note

### Phase 4: Optional Code Enhancements

- [ ] ⚠️ Add `isLayerEffect` flag to LayerConfig interface
- [ ] ⚠️ Add `itemType` field for validation
- [ ] ⚠️ Add `isHidden` flag for overlaid fills
- [ ] ⚠️ Add path validation helper functions
- [ ] ⚠️ Add auto-fix for shifted paths

---

## Testing Strategy

### For Each Edge Case:

1. **Create test Lottie** with the edge case
2. **Run through naming tool** to see what AI generates
3. **Apply theme** using the paths
4. **Visual verification** - does it work?
5. **Adjust prompt** if needed
6. **Re-test** until working

### Test Files to Create:

- `test-precomp-embedded.json` ✅ (RocketLaunch serves as this)
- `test-layer-effect.json` ⏳
- `test-shape-repeater.json` ⏳
- `test-merge-paths.json` ⏳
- `test-multiple-fills.json` ⏳

---

## Quick Reference

### How to Use This Documentation

1. **Before analyzing a new animation:**

   - Check for precomps (`ty: 0` with embedded `layers`)
   - Check for layer effects (`ef` array)
   - Note any repeaters or merge paths

2. **When generating LayerConfig:**

   - Use embedded layer paths for precomps
   - Use effect paths when effects are present
   - Map only visible fills when multiple exist

3. **When theming fails:**
   - Consult this index
   - Check which edge case applies
   - Follow the solution strategy

---

## File Organization

```
naming-edge-cases/
├── 00-INDEX.md                       ← You are here
├── 01-PRECOMP_EMBEDDED_LAYERS.md     ← Technical deep dive
├── 01-PRECOMP_FIX_SUMMARY.md         ← Quick summary
├── 02-LAYER_EFFECTS.md               ← High priority
├── 03-SHAPE_REPEATERS.md             ← Medium priority
├── 04-MERGE_PATHS.md                 ← Medium priority
└── 05-MULTIPLE_FILLS.md              ← Low priority
```

---

## Summary Recommendations

### What to Add to AI Prompt (Priority Order):

1. ✅ **Precomp embedded layers** - DONE
2. 🟠 **Layer effects detection** - HIGH PRIORITY
3. 🟡 **Shape repeaters note** - MEDIUM PRIORITY
4. 🟡 **Merge paths note** - MEDIUM PRIORITY
5. 🟢 **Multiple fills optimization** - LOW PRIORITY

### What Code Changes Are Needed:

**Required:**

- None - our current code works for most cases

**Recommended:**

- Add `detectLayerEffects()` helper function
- Add `isLayerEffect` flag to LayerConfig interface

**Optional:**

- Add path validation helpers
- Add `itemType` for validation
- Add `isHidden` flag for overlaid elements

---

**Last Updated:** After RocketLaunch precomp fix  
**Status:** Index complete, awaiting Phase 2 implementation
