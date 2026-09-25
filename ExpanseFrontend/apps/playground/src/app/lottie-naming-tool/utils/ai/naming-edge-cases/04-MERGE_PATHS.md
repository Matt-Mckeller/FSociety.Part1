# Merge Paths Edge Case

## Severity: 🟡 MEDIUM - Can Make Individual Fills Inaccessible

## The Problem

Merge Paths operations (`ty: "mm"`) combine multiple shapes using boolean operations (Union, Intersect, Subtract). This can make **individual shape fills inaccessible** because they're rendered as one merged shape.

---

## Lottie Structure Example

### Before Merge Paths

```javascript
{
  "shapes": [
    {
      "ty": "gr",
      "nm": "Circle",
      "it": [
        { "ty": "el", "nm": "Ellipse" },        // Circle path
        { "ty": "fl", "c": { "k": [1, 0, 0, 1] } },  // Red fill
        { "ty": "tr" }
      ]
    },
    {
      "ty": "gr",
      "nm": "Rectangle",
      "it": [
        { "ty": "rc", "nm": "Rectangle" },      // Rectangle path
        { "ty": "fl", "c": { "k": [0, 0, 1, 1] } },  // Blue fill
        { "ty": "tr" }
      ]
    }
  ]
}

// Can theme independently:
// shapes[0].it[1].c.k  → Circle fill (red)
// shapes[1].it[1].c.k  → Rectangle fill (blue)
```

### After Merge Paths (Union)

```javascript
{
  "shapes": [
    {
      "ty": "gr",
      "nm": "Circle",
      "it": [
        { "ty": "el" },
        { "ty": "fl", "c": { "k": [1, 0, 0, 1] } },  // Still exists but...
        { "ty": "tr" }
      ]
    },
    {
      "ty": "gr",
      "nm": "Rectangle",
      "it": [
        { "ty": "rc" },
        { "ty": "fl", "c": { "k": [0, 0, 1, 1] } },  // Might be ignored
        { "ty": "tr" }
      ]
    },

    // ⚠️ MERGE PATHS ADDED
    {
      "ty": "mm",                    // Merge Paths
      "nm": "Merge Paths 1",
      "mm": 1,                       // Mode: 1 = Union
      "hd": false
    }
  ]
}
```

**What Renders:**

- The merge operation combines both shapes
- Only ONE fill is used (typically from the last shape before the merge)
- Individual fills may no longer control their shapes

---

## Impact on Our JavaScript Theming

### ❌ **Common Case (PARTIALLY BROKEN)**

```javascript
// Try to theme both fills independently
const layerConfig = {
  CircleFill: {
    path: "layers[0].shapes[0].it[1].c.k",
    originalColor: "#ff0000ff",
  },
  RectangleFill: {
    path: "layers[0].shapes[1].it[1].c.k",
    originalColor: "#0000ffff",
  },
}

// Apply themes
_.set(animationData, "layers[0].shapes[0].it[1].c.k", redColor) // ❌ May not show
_.set(animationData, "layers[0].shapes[1].it[1].c.k", blueColor) // ✅ This one renders

// Result: Both shapes show blue (or red, depending on merge order)
// Individual theming doesn't work - the merge uses one fill for all
```

### ✅ **Solution (Theme the Visible Fill)**

```javascript
// Determine which fill is actually used by the merge
// Usually it's the LAST shape's fill before the merge operation

const layerConfig = {
  // Only map the fill that's actually rendered
  MergedShapesFill: {
    path: "layers[0].shapes[1].it[1].c.k", // Last shape's fill
    originalColor: "#0000ffff",
    note: "This fill controls all merged shapes (Circle + Rectangle)",
  },
}

// Now theming works for the merged result
_.set(animationData, "layers[0].shapes[1].it[1].c.k", greenColor)
// Result: Both circle and rectangle turn green ✅
```

---

## Detection Strategy

### Detect Merge Paths

```javascript
function hasMergePaths(shapes) {
  return shapes.some((shape) => shape.ty === "mm")
}

function findMergePathsInfo(shapes) {
  const mergeIndex = shapes.findIndex((shape) => shape.ty === "mm")
  if (mergeIndex === -1) return null

  const merge = shapes[mergeIndex]

  // Find which shapes are affected (all shapes before the merge)
  const affectedShapes = shapes.slice(0, mergeIndex)

  // Usually the last shape's fill is used
  const lastShape = affectedShapes[affectedShapes.length - 1]

  return {
    mergeIndex,
    mergeMode: merge.mm, // 1=Union, 2=Subtract, 3=Intersect, etc.
    affectedShapeCount: affectedShapes.length,
    controllingFillPath: findFillPath(lastShape),
  }
}
```

---

## AI Prompt Addition

```
MERGE PATHS - COMBINED SHAPE DETECTION
═══════════════════════════════════════════════════════════════════

Merge Paths (ty: "mm") combine multiple shapes into one!

WHAT HAPPENS:
- Multiple shapes are rendered as one merged shape
- Boolean operations: Union, Subtract, Intersect, Exclude
- Only ONE fill/stroke is visible (usually from last shape)
- Individual shape fills are ignored

DETECTION:
1. Look for items with ty: "mm" in shapes array
2. Shapes BEFORE the merge are combined
3. Typically the LAST shape's fill controls the merged result

CORRECT MAPPING:
If shapes[0], shapes[1], shapes[2], shapes[3 = merge]:

❌ DON'T map all fills individually:
   shapes[0].it[1].c.k  ← Won't show
   shapes[1].it[1].c.k  ← Won't show
   shapes[2].it[1].c.k  ← This one shows (last before merge)

✅ DO map only the controlling fill:
   shapes[2].it[1].c.k  ← Maps to "MergedShapesFill"

   Note: "This fill controls all merged shapes (Union operation)"

MERGE MODES:
- mm: 1 → Union (combines shapes)
- mm: 2 → Subtract (cuts out)
- mm: 3 → Intersect (only overlapping parts)
- mm: 4 → Exclude (opposite of intersect)
```

---

## Code Changes Needed

### Add Merge Path Detection

```typescript
// NEW: Helper to detect and handle merge paths
export function analyzeMergePaths(shapes: any[]): {
  hasMerge: boolean
  controllingFillIndices: number[]
  mergeInfo: Array<{ mode: number; affectedShapes: number[] }>
} {
  const merges: any[] = []
  const controllingFills: number[] = []

  let currentGroupStart = 0

  shapes.forEach((shape, idx) => {
    if (shape.ty === "mm") {
      // Found a merge - shapes before this are merged
      const affectedShapes = Array.from(
        { length: idx - currentGroupStart },
        (_, i) => currentGroupStart + i,
      )

      // Last shape before merge controls the fill
      if (affectedShapes.length > 0) {
        controllingFills.push(affectedShapes[affectedShapes.length - 1])
      }

      merges.push({
        mode: shape.mm,
        affectedShapes,
      })

      currentGroupStart = idx + 1
    }
  })

  return {
    hasMerge: merges.length > 0,
    controllingFillIndices: controllingFills,
    mergeInfo: merges,
  }
}
```

---

## Summary

**Current Code Impact:** ⚠️ **PARTIALLY BROKEN** - Themes wrong fills in merged shapes

**Required Changes:**

1. ⚠️ AI must detect `ty: "mm"` (merge paths)
2. ⚠️ AI must identify which fill controls merged result
3. ⚠️ AI should NOT map fills that are ignored by merge
4. ✅ Optional: Add merge detection helper

**Prompt Changes:** ✅ **RECOMMENDED** - Add merge paths section

**Priority:** 🟡 **MEDIUM** - Common in complex designs
