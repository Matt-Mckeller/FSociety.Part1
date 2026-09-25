#!/usr/bin/env node

// NOTE: CAN CONVERT THIS INTO SOMETHING THAT HELPS EXPORT THE THEME
// JSON AS A TS FILE

/**
 * Convert All Themes to TypeScript
 *
 * This script converts all JSON theme files to TypeScript format,
 * preserving the exact color mappings from the original JSON files.
 */

const fs = require("fs")
const path = require("path")

// Helper function to determine baseColor and mode from theme name
function getThemeInfo(themeName) {
  const parts = themeName.split("-")
  const color = parts[0]
  const mode = parts[1] || "light"

  return { baseColor: color, mode }
}

// Helper function to convert theme name to proper format
function formatThemeName(themeName) {
  return themeName.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

// Convert a single JSON theme file to TypeScript
function convertThemeToTypeScript(jsonPath, tsPath) {
  try {
    const jsonContent = fs.readFileSync(jsonPath, "utf8")
    const themeData = JSON.parse(jsonContent)

    // Extract theme info from filename
    const fileName = path.basename(jsonPath, ".json")
    const { baseColor, mode } = getThemeInfo(fileName)

    // Generate TypeScript content
    const tsContent = `import type { LottieThemeConfig } from "../../../../theming/lottieColorMapping"

export const ${fileName.replace(/-/g, "")}Theme: LottieThemeConfig = {
  themeId: "${themeData.themeName || fileName}",
  name: "${formatThemeName(fileName)}",
  description: "${(themeData.description || `Generated theme for ${fileName}`).replace(/'/g, "\\'")}",
  baseColor: "${baseColor}",
  mode: "${mode}",
  colors: {
${Object.entries(themeData.colors || {})
  .map(([key, value]) => `    ${key}: "${value}",`)
  .join("\n")}
  },
  skippedElements: ${JSON.stringify(themeData.skippedElements || [])},
  metadata: {
    created: new Date().toISOString(),
    version: "1.0.0",
    author: "Theme Converter",
    reasoning: "${(themeData.reasoning || "Converted from JSON theme file").replace(/'/g, "\\'")}",
  },
}

export default ${fileName.replace(/-/g, "")}Theme
`

    // Write TypeScript file
    fs.writeFileSync(tsPath, tsContent)
    console.log(`✅ Converted: ${jsonPath} → ${tsPath}`)

    return true
  } catch (error) {
    console.error(`❌ Error converting ${jsonPath}:`, error.message)
    return false
  }
}

// Convert all themes in a directory
function convertThemesInDirectory(dirPath) {
  const files = fs.readdirSync(dirPath)
  let converted = 0
  let errors = 0

  for (const file of files) {
    if (file.endsWith(".json")) {
      const jsonPath = path.join(dirPath, file)
      const tsPath = path.join(dirPath, file.replace(".json", ".ts"))

      // Skip if TypeScript file already exists
      if (fs.existsSync(tsPath)) {
        console.log(`⏭️  Skipping ${file} (TypeScript file already exists)`)
        continue
      }

      if (convertThemeToTypeScript(jsonPath, tsPath)) {
        converted++
      } else {
        errors++
      }
    }
  }

  return { converted, errors }
}

// Main execution
function main() {
  console.log("🔄 Converting all JSON theme files to TypeScript...\n")

  const baseDir = path.join(
    __dirname,
    "..",
    "packages",
    "dynamicAssets",
    "lotties",
  )

  // Find all theme directories
  const themeDirs = []

  function findThemeDirs(dir) {
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const itemPath = path.join(dir, item)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        if (item === "themes") {
          themeDirs.push(itemPath)
        } else {
          findThemeDirs(itemPath)
        }
      }
    }
  }

  findThemeDirs(baseDir)

  let totalConverted = 0
  let totalErrors = 0

  for (const themeDir of themeDirs) {
    console.log(`📁 Processing: ${themeDir}`)
    const { converted, errors } = convertThemesInDirectory(themeDir)
    totalConverted += converted
    totalErrors += errors
    console.log("")
  }

  console.log(`\n🎉 Conversion complete!`)
  console.log(`✅ Converted: ${totalConverted} files`)
  console.log(`❌ Errors: ${totalErrors} files`)
}

if (require.main === module) {
  main()
}

module.exports = { convertThemeToTypeScript, convertThemesInDirectory }
