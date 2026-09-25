/**
 * API Route: Scan Lotties Directory
 * Scans the dynamicAssets/lotties directory and returns a registry of available animations
 */

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const LOTTIES_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "dynamicAssets",
  "lotties",
)

interface LottieRegistryItem {
  id: string
  name: string
  displayName: string
  path: string
  filePath: string // Full path to the JSON file
  directoryPath: string // Full path to the lottie directory
  category: string
  description?: string
  tags?: string[]
}

interface ScanResult {
  success: boolean
  lotties: LottieRegistryItem[]
  error?: string
}

/**
 * Validate if a JSON object is a valid Lottie animation
 */
function validateLottieStructure(json: any): boolean {
  if (!json || typeof json !== "object") return false

  const requiredFields = ["v", "fr", "ip", "op", "layers"]
  for (const field of requiredFields) {
    if (!(field in json)) return false
  }

  if (!Array.isArray(json.layers)) return false

  return true
}

/**
 * Check if filename should be excluded
 */
function shouldExcludeFile(filename: string): boolean {
  const excludePatterns = [
    /_ThemeConfig\.json$/,
    /_Animation_Metadata\.json$/,
    /_LayerConfig\.json$/,
    /_validation\.json$/,
    /Optimized\.json$/,
    /DarkMode\.json$/,
    /LightMode\.json$/,
    /_minified\.json$/,
  ]

  return excludePatterns.some((pattern) => pattern.test(filename))
}

/**
 * Convert CamelCase to Title Case
 */
function camelToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

/**
 * Infer category from directory name or animation name
 */
function inferCategory(name: string): string {
  const categoryKeywords: Record<string, string[]> = {
    Space: ["rocket", "jupiter", "launch", "space"],
    Education: ["homework", "study", "learn"],
    Technology: [
      "code",
      "terminal",
      "backend",
      "frontend",
      "development",
      "modern",
      "technology",
    ],
    Business: ["business", "growth", "housing"],
    Game: ["chest", "crown", "ticket"],
    Emotion: ["smiling", "face", "angel"],
    Collaboration: ["design", "collaboration", "sprint"],
    Animation: ["bounce", "skating", "walking", "dance"],
  }

  const lowerName = name.toLowerCase()
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => lowerName.includes(keyword))) {
      return category
    }
  }

  return "Uncategorized"
}

/**
 * Generate tags from animation name
 */
function generateTags(name: string): string[] {
  const words = name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .split(" ")
  return words.filter((word) => word.length > 2)
}

/**
 * Scan a single directory for Lottie files
 */
async function scanDirectory(
  dirName: string,
  dirPath: string,
): Promise<LottieRegistryItem[]> {
  const items: LottieRegistryItem[] = []

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      // Only process JSON files at root level
      if (!entry.isFile() || !entry.name.endsWith(".json")) {
        continue
      }

      // Skip excluded files
      if (shouldExcludeFile(entry.name)) {
        continue
      }

      const filePath = path.join(dirPath, entry.name)

      try {
        // Read and validate the JSON
        const content = fs.readFileSync(filePath, "utf-8")
        const json = JSON.parse(content)

        // Validate it's a Lottie file
        if (!validateLottieStructure(json)) {
          continue
        }

        // Extract name without extension
        const animationName = entry.name.replace(".json", "")
        const displayName = camelToTitle(animationName)
        const category = inferCategory(animationName)
        const tags = generateTags(animationName)

        // Create unique ID using directory and filename
        const uniqueId = `${dirName}-${entry.name}`
          .toLowerCase()
          .replace(/\.json$/, "")
          .replace(/\s+/g, "-")

        items.push({
          id: uniqueId,
          name: animationName,
          displayName: `${displayName} (${dirName})`, // Add folder name to make it unique
          path: `/api/lotties/file?dir=${encodeURIComponent(dirName)}&file=${encodeURIComponent(entry.name)}`,
          filePath,
          directoryPath: dirPath,
          category,
          description: `${displayName} animation from ${dirName}`,
          tags,
        })
      } catch (error) {
        // Skip files that can't be read or parsed
        console.warn(`Failed to process ${entry.name}:`, error)
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirName}:`, error)
  }

  return items
}

/**
 * GET handler - Scan all lotties
 */
export async function GET() {
  try {
    // Check if directory exists
    if (!fs.existsSync(LOTTIES_DIR)) {
      return NextResponse.json(
        {
          success: false,
          error: `Lotties directory not found: ${LOTTIES_DIR}`,
          lotties: [],
        } as ScanResult,
        { status: 404 },
      )
    }

    const allLotties: LottieRegistryItem[] = []

    // Read all subdirectories
    const entries = fs.readdirSync(LOTTIES_DIR, { withFileTypes: true })

    for (const entry of entries) {
      // Skip non-directories and special files
      if (
        !entry.isDirectory() ||
        entry.name.startsWith(".") ||
        entry.name.startsWith("_")
      ) {
        continue
      }

      const dirPath = path.join(LOTTIES_DIR, entry.name)
      const lotties = await scanDirectory(entry.name, dirPath)
      allLotties.push(...lotties)
    }

    // Sort by category first, then by display name (required for MUI Autocomplete groupBy)
    allLotties.sort((a, b) => {
      const categoryCompare = a.category.localeCompare(b.category)
      if (categoryCompare !== 0) return categoryCompare
      return a.displayName.localeCompare(b.displayName)
    })

    return NextResponse.json({
      success: true,
      lotties: allLotties,
    } as ScanResult)
  } catch (error) {
    console.error("Error scanning lotties:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lotties: [],
      } as ScanResult,
      { status: 500 },
    )
  }
}
