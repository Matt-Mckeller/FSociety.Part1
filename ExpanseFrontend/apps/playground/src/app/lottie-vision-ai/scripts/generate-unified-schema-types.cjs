#!/usr/bin/env node
/**
 * Type Definition Generator
 *
 * Generates TypeScript type definitions for AI prompts from the unified schema.
 * This ensures the AI always receives the correct, up-to-date interface definitions.
 *
 * Usage:
 *   node ./scripts/generate-unified-schema-types.ts
 *
 * This script should be run:
 *   - Before committing changes to lottieThemeTypes.ts
 *   - Automatically via GitHub Actions on PR/push
 *   - As part of the build process
 */

const ts = require("typescript")
const fs = require("fs")
const path = require("path")

// Source file containing the unified schema
const SOURCE_FILE = path.resolve(
  __dirname,
  "../../../../../../packages/dynamicAssets/types/ExpanseLottieTypes.ts",
)

// Output file for generated definitions
const UNIFIED_SCHEMA_OUTPUT_PATH = path.resolve(
  __dirname,
  "../generated/generatedUnifiedSchemaType.ts",
)

/**
 * Generate the output file
 */
function generateTypeDefinitions() {
  console.log("🔄 Generating AI type definitions...")
  console.log(`📖 Reading from: ${SOURCE_FILE}`)
  console.log(`📝 Writing to: ${UNIFIED_SCHEMA_OUTPUT_PATH}`)

  const typeFileText = fs.readFileSync(SOURCE_FILE, "utf-8")

  // Generate output content
  const timestamp = new Date().toISOString()
  const generatedOutputFileContent = `/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from: packages/dynamicAssets/types/ExpanseLottieTypes.ts
 * Generated at: ${timestamp}
 *
 * To regenerate: npx ts-node ./generate-unified-schema-types.ts
 *
 * This file provides TypeScript type definitions to AI models for structured output.
 * It ensures the AI knows exactly what fields to include in its JSON responses.
 */

export const TYPE_DEFINITIONS = \`${typeFileText.replace(/`/g, "\\`")}\`
`

  // Write output file
  fs.writeFileSync(
    UNIFIED_SCHEMA_OUTPUT_PATH,
    generatedOutputFileContent,
    "utf-8",
  )

  console.log(`✅ Generated: ${UNIFIED_SCHEMA_OUTPUT_PATH}`)
  console.log("✨ Type definitions updated successfully!")
}

// Run the generator
try {
  generateTypeDefinitions()
  process.exit(0)
} catch (error) {
  console.error("❌ Error generating type definitions:", error)
  process.exit(1)
}
