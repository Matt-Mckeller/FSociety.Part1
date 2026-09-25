/**
 * Gradient Extraction Instructions
 * How to parse and convert Lottie gradient data
 */

export const gradientExtractionInstructions = `
GRADIENT COLOR EXTRACTION:
═══════════════════════════════════════════════════════════════════

LOTTIE GRADIENT STRUCTURE:
Lottie stores gradients as flat arrays with alternating offset and RGBA values:
[offset1, r1, g1, b1, a1, offset2, r2, g2, b2, a2, offset3, r3, g3, b3, a3, ...]

STRUCTURE BREAKDOWN:
- offset: Position in gradient (0-1 range)
  * 0 = gradient start point
  * 0.5 = middle of gradient
  * 1 = gradient end point
  
- r, g, b, a: Color values (0-1 range)
  * r = red channel
  * g = green channel
  * b = blue channel
  * a = alpha channel

PARSING ALGORITHM:
1. Start at index 0
2. Read offset value (index i)
3. Read r, g, b, a values (indices i+1, i+2, i+3, i+4)
4. Convert RGBA to hex: "#rrggbbaa"
5. Create stop object: {"offset": offset, "color": "#rrggbbaa"}
6. Move to next stop (i += 5)
7. Repeat until end of array

EXAMPLES:

Example 1: Simple 2-stop gradient (red to blue)
Input:  [0, 1, 0, 0, 1,    1, 0, 0, 1, 1]
         ↑  ↑  ↑  ↑  ↑     ↑  ↑  ↑  ↑  ↑
         offset r  g  b  a  offset r g b a
         
Parse:
  Stop 1: offset=0, rgba=[1,0,0,1] → {"offset": 0, "color": "#ff0000ff"}
  Stop 2: offset=1, rgba=[0,0,1,1] → {"offset": 1, "color": "#0000ffff"}

Output: [
  {"offset": 0, "color": "#ff0000ff"},
  {"offset": 1, "color": "#0000ffff"}
]

Example 2: 3-stop gradient (white to gray to black)
Input:  [0, 1, 1, 1, 1,    0.5, 0.5, 0.5, 0.5, 1,    1, 0, 0, 0, 1]

Parse:
  Stop 1: offset=0,   rgba=[1,1,1,1]       → {"offset": 0, "color": "#ffffffff"}
  Stop 2: offset=0.5, rgba=[0.5,0.5,0.5,1] → {"offset": 0.5, "color": "#808080ff"}
  Stop 3: offset=1,   rgba=[0,0,0,1]       → {"offset": 1, "color": "#000000ff"}

Output: [
  {"offset": 0, "color": "#ffffffff"},
  {"offset": 0.5, "color": "#808080ff"},
  {"offset": 1, "color": "#000000ff"}
]

Example 3: Gradient with transparency
Input:  [0, 1, 1, 1, 0,    1, 1, 1, 1, 1]
         ↑  ↑  ↑  ↑  ↑     ↑  ↑  ↑  ↑  ↑
         0  r  g  b  a=0   1  r  g  b  a=1
         
Parse:
  Stop 1: offset=0, rgba=[1,1,1,0] → {"offset": 0, "color": "#ffffff00"} (transparent white)
  Stop 2: offset=1, rgba=[1,1,1,1] → {"offset": 1, "color": "#ffffffff"} (opaque white)

Output: [
  {"offset": 0, "color": "#ffffff00"},
  {"offset": 1, "color": "#ffffffff"}
]

VALIDATION:
- Array length must be divisible by 5 (offset + 4 RGBA values per stop)
- Offset values should be between 0 and 1
- Offset values should be in ascending order (0 → 1)
- Minimum 2 stops (10 values), but can have many more
- RGBA values should be between 0 and 1

FINDING GRADIENTS IN LOTTIE:
- Look for paths ending with .g.k.k
- Check ty: "gf" (gradient fill) or ty: "gs" (gradient stroke)
- Value will be the flat array described above
`
