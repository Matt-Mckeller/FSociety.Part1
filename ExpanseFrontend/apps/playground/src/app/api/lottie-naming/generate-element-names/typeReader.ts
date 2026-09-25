/**
 * Type Reader for Element Naming
 *
 * Reads TypeScript type definitions from the filesystem at runtime.
 * This allows the AI to receive the actual type definitions without
 * needing to regenerate hardcoded strings.
 */

import fs from "fs"
import path from "path"

/**
 * Base path to the element types directory
 */
const ELEMENTS_TYPES_PATH = path.resolve(
  process.cwd(),
  "../../packages/dynamicAssets/types/elements",
)

/**
 * Type files to read for element naming context
 */
const ELEMENT_TYPE_FILES = [
  "ExpanseLottieElementDetails.ts",
  "ElementType.ts",
  "RoleFunction.ts",
  "VisualLevel.ts",
  "SemanticRole.ts",
  "GradientColorStop.ts",
]

/**
 * Read a TypeScript file and return its contents
 */
function readTypeFile(filename: string): string {
  try {
    const filePath = path.join(ELEMENTS_TYPES_PATH, filename)
    return fs.readFileSync(filePath, "utf-8")
  } catch (error) {
    console.error(`[TypeReader] Failed to read type file: ${filename}`, error)
    return `// Failed to load ${filename}`
  }
}

/**
 * Read all element type files and return as a formatted string for AI prompts
 */
export function getElementTypesDoc(): string {
  const typeContents = ELEMENT_TYPE_FILES.map((file) => {
    const content = readTypeFile(file)
    return `// === ${file} ===\n${content}`
  }).join("\n\n")

  return `\`\`\`typescript
${typeContents}
\`\`\``
}

/**
 * Get just the ExpanseLottieElementDetails type for focused context
 */
export function getElementDetailsTypeDoc(): string {
  const content = readTypeFile("ExpanseLottieElementDetails.ts")
  return `\`\`\`typescript
${content}
\`\`\``
}
