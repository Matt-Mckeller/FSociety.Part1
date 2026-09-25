/**
 * API Route: Serve Lottie JSON File
 * Returns a specific Lottie JSON file from the filesystem
 */

import { NextRequest, NextResponse } from "next/server"
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

/**
 * GET handler - Serve a specific Lottie file
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dir = searchParams.get("dir")
    const file = searchParams.get("file")

    if (!dir || !file) {
      return NextResponse.json(
        { error: "Missing dir or file parameter" },
        { status: 400 },
      )
    }

    // Security: prevent path traversal
    if (dir.includes("..") || file.includes("..")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 403 })
    }

    // Only allow JSON files
    if (!file.endsWith(".json")) {
      return NextResponse.json(
        { error: "Only JSON files are allowed" },
        { status: 403 },
      )
    }

    const filePath = path.join(LOTTIES_DIR, dir, file)

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File not found: ${dir}/${file}` },
        { status: 404 },
      )
    }

    // Read and parse the JSON
    const content = fs.readFileSync(filePath, "utf-8")
    const json = JSON.parse(content)

    return NextResponse.json(json)
  } catch (error) {
    console.error("Error serving Lottie file:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to read file",
      },
      { status: 500 },
    )
  }
}
