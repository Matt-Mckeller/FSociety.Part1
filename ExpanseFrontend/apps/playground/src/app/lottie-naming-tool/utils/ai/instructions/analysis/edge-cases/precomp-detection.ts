/**
 * Precomp Detection Instructions
 * CRITICAL: How to handle precomposed layers with embedded data
 *
 * This is the #1 most common mistake in Lottie analysis!
 */

export const precompDetectionInstructions = `
CRITICAL: PRECOMPOSED LAYERS (PRECOMPS) - COMMON PITFALL
═══════════════════════════════════════════════════════════════════
Precomps (ty: 0) can have EMBEDDED LAYERS that override asset data!

WHAT IS A PRECOMP?
- A layer that references a pre-composed asset composition
- Type indicator: ty: 0
- Has a "refId" field pointing to an asset (e.g., "comp_0")
- Acts like a "symbol" or "component" that can be reused

⚠️ THE CRITICAL ISSUE:
When a precomp has embedded layers, Lottie renders from the EMBEDDED
layers, NOT from the asset reference!

EXAMPLE STRUCTURE:

  assets[0] = {              // ❌ Template/reference (NOT rendered)
    id: "comp_0",
    layers: [...]            // This is just a template
  }

  layers[7] = {              // ✅ Precomp instance (ACTUALLY rendered)
    ty: 0,                   // Type 0 = precomp
    refId: "comp_0",         // Points to assets[0]
    layers: [                // ⚠️ EMBEDDED LAYERS - USE THESE PATHS!
      {
        shapes: [...]        // These colors are what Lottie renders
      }
    ]
  }

DETECTION ALGORITHM:
1. Check if layer.ty === 0 (precomp type indicator)
2. Check if layer.layers exists and is an array with elements
3. If BOTH conditions true → Use embedded layer paths
4. If condition 2 false → Use asset reference paths (rare case)

PATH EXAMPLES:

❌ WRONG (points to template, won't affect rendering):
   "assets[0].layers[0].shapes[0].it[1].c.k"

✅ CORRECT (points to rendered data):
   "layers[7].layers[0].shapes[0].it[1].c.k"
                 ↑
         embedded layer inside precomp at index 7

NESTED PRECOMP EXAMPLE:
   "layers[7].layers[0].shapes[2].it[0].it[0].it[2].c.k"
    └──────┘ └─────────┘
    precomp  embedded layer with nested shape groups

WHY THIS MATTERS:
- ❌ Theming "assets[X]..." paths won't change visual colors
- ✅ Only "layers[X].layers[Y]..." paths affect rendering
- Embedded layers store "resolved" composition state
- Multiple precomp instances can have different embedded values
- This is the #1 reason for "theming doesn't work" bugs

DETECTION CODE PATTERN:
\`\`\`javascript
// Check if layer is a precomp with embedded layers
const isPrecompWithEmbedded = (layer) => {
  return layer.ty === 0 &&                // Is precomp type
         Array.isArray(layer.layers) &&   // Has layers property
         layer.layers.length > 0          // Has embedded content
}

// Use this to decide path format:
if (isPrecompWithEmbedded(layer)) {
  // Use: layers[7].layers[0]...
} else {
  // Use: layers[7]... or assets[X].layers[Y]...
}
\`\`\`

VISUAL EXPLANATION:
┌─────────────────────────────────────────────────────────────┐
│ assets[0] (comp_0)                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ layers: [                                               │ │
│ │   { ty: 4, shapes: [...] }  // Template definition     │ │
│ │ ]                                                       │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                        ↓ references (not rendered)
┌─────────────────────────────────────────────────────────────┐
│ layers[7]                                                   │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ty: 0, refId: "comp_0"                                  │ │
│ │ layers: [  ← EMBEDDED (actually rendered!)             │ │
│ │   {                                                     │ │
│ │     ty: 4,                                              │ │
│ │     shapes: [                                           │ │
│ │       { it: [{ c: { k: [1,0,0,1] } }] }  ← USE THIS!   │ │
│ │     ]                                                   │ │
│ │   }                                                     │ │
│ │ ]                                                       │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

COMPLETE EXAMPLE:
Given this Lottie structure:
\`\`\`json
{
  "assets": [
    {
      "id": "comp_0",
      "layers": [
        { "ty": 4, "shapes": [...] }  // Template
      ]
    }
  ],
  "layers": [
    {
      "ind": 7,
      "ty": 0,  // ← Precomp!
      "refId": "comp_0",
      "layers": [  // ← Embedded layers!
        {
          "ty": 4,
          "shapes": [
            {
              "it": [
                {
                  "ty": "fl",
                  "c": { "k": [1, 0, 0, 1] }  // Red fill
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
\`\`\`

The CORRECT path is:
  "layers[7].layers[0].shapes[0].it[0].c.k"
                ↑
        embedded layer, NOT assets[0]

COMMON MISTAKES:
1. Using "assets[0].layers[0]..." → Wrong, not rendered
2. Using "layers[7].shapes[0]..." → Wrong, shapes are in embedded layer
3. Not checking for embedded layers → Missing actual rendered colors
4. Assuming all precomps use asset paths → Wrong assumption

ALWAYS REMEMBER:
If ty === 0 AND layers array exists → Use "layers[X].layers[Y]..." paths!
`
