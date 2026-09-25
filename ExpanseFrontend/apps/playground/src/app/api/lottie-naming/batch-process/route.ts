/**
 * API Route: Batch Process Lottie Animations
 *
 * Processes multiple Lottie animations through the naming tool pipeline
 * and generates all required files for ExpanseLottie structure.
 *
 * Uses the same code as the interactive UI for consistency.
 *
 * POST /api/lottie-naming/batch-process
 */

import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { generateElementNames } from "../generate-element-names/elementNamingService"
import { generateMetadata } from "../generate-metadata/metadataService"
import { generateSchemaFileInline } from "../../../lottie-naming-tool/services/export/schemaGenerator"
import {
  generateAnimationThemesFileContent,
  generateConsolidatedThemesFile,
  generateComponentFileContent,
} from "../../../lottie-naming-tool/services/theme/themeFileGenerator"
import {
  generateThemes,
  COLOR_PALETTES,
} from "../../../lottie-naming-tool/services/theme"
import type { ExpanseLottie } from "expanse.dynamicAssets"

// ============================================================================
// Types
// ============================================================================

interface BatchProcessRequest {
  /** List of animation names (folder names in /lotties/) */
  animations: string[]
  /** Processing options */
  options?: {
    /** Generate AI element names (default: true) */
    generateNames?: boolean
    /** Generate AI metadata (default: true) */
    generateMetadata?: boolean
    /** Generate AI-powered theme color configs (default: true) */
    generateAIThemes?: boolean
    /** Save files to filesystem (default: true) */
    saveToFilesystem?: boolean
    /** Skip animations that already have schema files (default: true) */
    skipExisting?: boolean
  }
}

interface AnimationResult {
  name: string
  status: "success" | "error" | "skipped"
  message?: string
  filesCreated?: string[]
  durationMs?: number
}

interface BatchProcessResponse {
  success: boolean
  processed: number
  successful: number
  failed: number
  skipped: number
  results: AnimationResult[]
  totalDurationMs: number
}

// ============================================================================
// Configuration
// ============================================================================

const LOTTIES_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "dynamicAssets",
  "lotties",
)

const THEMING_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "dynamicAssets",
  "theming",
  "animations",
)

// Standard themes that all animations support
const STANDARD_THEMES = [
  "purple-light",
  "purple-dark",
  "blue-light",
  "blue-dark",
  "green-light",
  "green-dark",
  "orange-light",
  "orange-dark",
  "red-light",
  "red-dark",
]

/**
 * Build default metadata when none is provided
 */
function buildDefaultMetadata(animationName: string) {
  return {
    animationName,
    alternativeNames: [animationName],
    description: `${animationName} animation with themeable elements`,
    tags: ["lottie", "animation"],
    recommendations: {
      suggestedColors: [],
      recommendedColorPalettes: [],
      elementGroups: {
        logicalGrouped: {},
        sharedColor: {},
        themingPriority: {},
        visualHierarchy: {},
      },
      optionalAiContext: {},
      optionalAiStylePrompts: {},
    },
  }
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Check if animation already has schema file
 */
function hasExistingSchema(animationDir: string): boolean {
  const files = fs.readdirSync(animationDir)
  return files.some((f) => f.endsWith(".expanse-lottie.ts"))
}

/**
 * Find the main Lottie JSON file in a directory
 */
function findMainLottieJson(
  animationDir: string,
  animationName: string,
): string | null {
  const files = fs.readdirSync(animationDir)

  // Priority: exact match, then any JSON that looks like the main animation
  const exactMatch = files.find((f) => f === `${animationName}.json`)
  if (exactMatch) return path.join(animationDir, exactMatch)

  // Look for first valid Lottie JSON (excluding theme/config files)
  const excludePatterns = [
    /_ThemeConfig\.json$/,
    /_Animation_Metadata\.json$/,
    /_LayerConfig\.json$/,
    /_validation\.json$/,
    /Optimized\.json$/,
    /DarkMode\.json$/,
    /LightMode\.json$/,
    /_minified\.json$/,
    /_ExpanseNamingExport\.json$/,
  ]

  const validJson = files.find((f) => {
    if (!f.endsWith(".json")) return false
    return !excludePatterns.some((pattern) => pattern.test(f))
  })

  return validJson ? path.join(animationDir, validJson) : null
}

/**
 * Validate Lottie JSON structure
 */
function isValidLottieJson(json: any): boolean {
  if (!json || typeof json !== "object") return false
  const requiredFields = ["v", "fr", "ip", "op", "layers"]
  return requiredFields.every((field) => field in json)
}

/**
 * Build an ExpanseLottie schema from elements for theme generation
 */
function buildSchemaForThemes(
  animationName: string,
  elements: Record<string, any>,
  metadata: any,
): ExpanseLottie {
  return {
    animationName,
    description: metadata?.description || `${animationName} animation`,
    tags: metadata?.tags || [],
    alternativeNames: metadata?.alternativeNames || [animationName],
    recommendations: metadata?.recommendations || {
      suggestedColors: [],
      recommendedColorPalettes: [],
      elementGroups: {
        logicalGrouped: {},
        sharedColor: {},
        themingPriority: {},
        visualHierarchy: {},
      },
      optionalAiContext: {},
      optionalAiStylePrompts: {},
    },
    elements,
  }
}

// ============================================================================
// Main Processing Logic
// ============================================================================

async function processAnimation(
  animationName: string,
  options: BatchProcessRequest["options"],
): Promise<AnimationResult> {
  const startTime = Date.now()
  const filesCreated: string[] = []

  try {
    const animationDir = path.join(LOTTIES_DIR, animationName)

    // Check if directory exists
    if (!fs.existsSync(animationDir)) {
      return {
        name: animationName,
        status: "error",
        message: `Directory not found: ${animationDir}`,
      }
    }

    // Check if already has schema
    if (options?.skipExisting !== false && hasExistingSchema(animationDir)) {
      return {
        name: animationName,
        status: "skipped",
        message: "Already has schema file",
      }
    }

    // Find main Lottie JSON
    const lottieJsonPath = findMainLottieJson(animationDir, animationName)
    if (!lottieJsonPath) {
      return {
        name: animationName,
        status: "error",
        message: "No valid Lottie JSON found",
      }
    }

    // Load and validate JSON
    const lottieJsonContent = fs.readFileSync(lottieJsonPath, "utf-8")
    const lottieJson = JSON.parse(lottieJsonContent)

    if (!isValidLottieJson(lottieJson)) {
      return {
        name: animationName,
        status: "error",
        message: "Invalid Lottie JSON structure",
      }
    }

    console.log(`[BatchProcess] Processing ${animationName}...`)

    // Step 1: Generate metadata (if enabled)
    let metadata: any = undefined
    if (options?.generateMetadata !== false) {
      console.log(`[BatchProcess] Generating metadata for ${animationName}...`)
      try {
        const metadataResult = await generateMetadata({ lottieJson })
        if (metadataResult.success && metadataResult.metadata) {
          metadata = metadataResult.metadata
          console.log(`[BatchProcess] Metadata generated for ${animationName}`)
        }
      } catch (error) {
        console.warn(
          `[BatchProcess] Metadata generation failed for ${animationName}:`,
          error,
        )
        // Continue without metadata
      }
    }

    // Step 2: Generate element names (if enabled)
    let elements: Record<string, any> = {}
    if (options?.generateNames !== false) {
      console.log(
        `[BatchProcess] Generating element names for ${animationName}...`,
      )
      const namingResult = await generateElementNames({
        lottieJson,
        metadata: metadata
          ? {
              name: metadata.animationName,
              description: metadata.description,
              tags: metadata.tags,
            }
          : undefined,
      })

      if (!namingResult.success || !namingResult.data) {
        return {
          name: animationName,
          status: "error",
          message: namingResult.error || "Element naming failed",
          durationMs: Date.now() - startTime,
        }
      }

      elements = namingResult.data.elements
      console.log(
        `[BatchProcess] Generated ${Object.keys(elements).length} element names for ${animationName}`,
      )
    }

    // Step 3: Save files (if enabled)
    if (options?.saveToFilesystem !== false) {
      // Generate schema file using existing generator
      const schemaContent = generateSchemaFileInline({
        animationName,
        metadata: metadata || buildDefaultMetadata(animationName),
        elements,
      })
      const schemaPath = path.join(
        animationDir,
        `${animationName}.expanse-lottie.ts`,
      )
      fs.writeFileSync(schemaPath, schemaContent)
      filesCreated.push(`${animationName}.expanse-lottie.ts`)

      // Step 4: Generate AI-powered theme configs (if enabled)
      // Uses the same theme generation as the interactive UI
      if (options?.generateAIThemes !== false) {
        console.log(
          `[BatchProcess] Generating AI themes for ${animationName}...`,
        )

        // Build schema for theme generation
        const schema = buildSchemaForThemes(animationName, elements, metadata)

        try {
          // Generate themes using the same AI-powered generator as interactive UI
          const themeResult = await generateThemes({
            animationName,
            schema,
            lottieJson,
            palettes: COLOR_PALETTES,
            variant: "default",
            onProgress: (progress) => {
              console.log(
                `[BatchProcess] Theme generation: ${progress.message}`,
              )
            },
            allowCreativeColors: true,
          })

          if (themeResult.themes.length > 0) {
            // Generate consolidated themes file using the same generator as interactive UI
            const themeConfigsContent = generateConsolidatedThemesFile(
              animationName,
              themeResult,
            )
            const themeConfigsPath = path.join(
              animationDir,
              `${animationName}.theme-configs.ts`,
            )
            fs.writeFileSync(themeConfigsPath, themeConfigsContent)
            filesCreated.push(`${animationName}.theme-configs.ts`)
            console.log(
              `[BatchProcess] Generated ${themeResult.themes.length} AI-powered themes for ${animationName}`,
            )
          } else {
            console.warn(
              `[BatchProcess] No themes generated for ${animationName}`,
            )
          }
        } catch (error) {
          console.warn(
            `[BatchProcess] AI theme generation failed for ${animationName}:`,
            error,
          )
          // Continue without theme configs - they can be generated later
        }
      }

      // Generate themes registry file using existing generator
      const themesRegistryContent = generateAnimationThemesFileContent(
        animationName,
        ["default"],
        { default: STANDARD_THEMES },
      )
      const themesRegistryPath = path.join(
        THEMING_DIR,
        `${animationName}.themes.ts`,
      )
      fs.writeFileSync(themesRegistryPath, themesRegistryContent)
      filesCreated.push(`theming/animations/${animationName}.themes.ts`)

      // Generate component file using existing generator
      const componentContent = generateComponentFileContent(animationName)
      const componentPath = path.join(animationDir, `${animationName}.tsx`)
      fs.writeFileSync(componentPath, componentContent)
      filesCreated.push(`${animationName}.tsx`)

      console.log(
        `[BatchProcess] Created ${filesCreated.length} files for ${animationName}`,
      )
    }

    return {
      name: animationName,
      status: "success",
      filesCreated,
      durationMs: Date.now() - startTime,
    }
  } catch (error) {
    console.error(`[BatchProcess] Error processing ${animationName}:`, error)
    return {
      name: animationName,
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
      durationMs: Date.now() - startTime,
    }
  }
}

// ============================================================================
// API Handler
// ============================================================================

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body: BatchProcessRequest = await request.json()
    const { animations, options } = body

    if (!animations || !Array.isArray(animations) || animations.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "No animations specified",
          processed: 0,
          successful: 0,
          failed: 0,
          skipped: 0,
          results: [],
          totalDurationMs: 0,
        } as BatchProcessResponse,
        { status: 400 },
      )
    }

    console.log(
      `[BatchProcess] Starting batch process for ${animations.length} animations`,
    )

    const results: AnimationResult[] = []
    let successful = 0
    let failed = 0
    let skipped = 0

    // Process animations sequentially (to avoid API rate limits)
    for (const animationName of animations) {
      const result = await processAnimation(animationName, options)
      results.push(result)

      if (result.status === "success") successful++
      else if (result.status === "error") failed++
      else if (result.status === "skipped") skipped++
    }

    const response: BatchProcessResponse = {
      success: failed === 0,
      processed: animations.length,
      successful,
      failed,
      skipped,
      results,
      totalDurationMs: Date.now() - startTime,
    }

    console.log(
      `[BatchProcess] Completed: ${successful} successful, ${failed} failed, ${skipped} skipped`,
    )

    return NextResponse.json(response)
  } catch (error) {
    console.error("[BatchProcess] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        processed: 0,
        successful: 0,
        failed: 0,
        skipped: 0,
        results: [],
        totalDurationMs: Date.now() - startTime,
      } as BatchProcessResponse,
      { status: 500 },
    )
  }
}

/**
 * GET handler - List available animations for processing
 */
export async function GET() {
  try {
    if (!fs.existsSync(LOTTIES_DIR)) {
      return NextResponse.json({
        success: false,
        error: "Lotties directory not found",
        animations: [],
      })
    }

    const entries = fs.readdirSync(LOTTIES_DIR, { withFileTypes: true })
    const animations = entries
      .filter((e) => e.isDirectory())
      .map((e) => {
        const dir = path.join(LOTTIES_DIR, e.name)
        const hasSchema = hasExistingSchema(dir)
        const hasJson = findMainLottieJson(dir, e.name) !== null

        return {
          name: e.name,
          hasSchema,
          hasJson,
          needsMigration: hasJson && !hasSchema,
        }
      })

    const needsMigration = animations.filter((a) => a.needsMigration)
    const alreadyMigrated = animations.filter((a) => a.hasSchema)

    return NextResponse.json({
      success: true,
      total: animations.length,
      needsMigration: needsMigration.length,
      alreadyMigrated: alreadyMigrated.length,
      animations,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        animations: [],
      },
      { status: 500 },
    )
  }
}
