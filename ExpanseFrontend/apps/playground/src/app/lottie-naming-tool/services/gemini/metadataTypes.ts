/**
 * TypeScript types for Lottie metadata analysis
 * These types are used both for type-checking and for generating prompts
 *
 * The METADATA_TYPES_DOC constant reads actual TypeScript source files
 * to ensure the AI prompt stays in sync with the canonical type definitions.
 */

import fs from "fs"
import path from "path"

// Re-export from the canonical source for actual TypeScript usage
export type {
  ApplicationContext,
  ContextSpecificMetaData,
  ExpanseLottieMetadata,
} from "expanse.dynamicAssets/types/ExpanseLottie"

/**
 * Path to the types directory relative to this file
 * This resolves to packages/dynamicAssets/types/metadata/
 */
const TYPES_BASE_PATH = path.resolve(
  __dirname,
  "../../../../../../../../packages/dynamicAssets/types/metadata",
)

/**
 * Read a TypeScript file and return its contents
 */
function readTypeFile(filename: string): string {
  try {
    const filePath = path.join(TYPES_BASE_PATH, filename)
    return fs.readFileSync(filePath, "utf-8")
  } catch (error) {
    console.error(`Failed to read type file: ${filename}`, error)
    return `// Failed to load ${filename}`
  }
}

/**
 * String representation of the TypeScript interfaces for AI prompts
 * This reads the actual source files to stay in sync with the canonical types
 */
export const METADATA_TYPES_DOC = `\`\`\`typescript
// === ApplicationContext.ts ===
${readTypeFile("ApplicationContext.ts")}

// === AnimationPurpose.ts ===
${readTypeFile("AnimationPurpose.ts")}

// === ContextSpecificMetaData.ts ===
${readTypeFile("ContextSpecificMetaData.ts")}

// === ExpanseLottieMetadata.ts ===
${readTypeFile("ExpanseLottieMetadata.ts")}
\`\`\``
console.log("--- METADATA_TYPES_DOC ---")
console.log({ METADATA_TYPES_DOC })
console.log("--- End of METADATA_TYPES_DOC ---")
