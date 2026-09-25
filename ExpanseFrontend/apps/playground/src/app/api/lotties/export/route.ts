/**
 * API Route: Export Lottie Files
 * Writes exported files to the filesystem for existing lotties
 */

import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

interface ExportRequest {
  directoryPath: string
  files: Array<{
    filename: string
    content: string
    /** Optional subdirectory relative to directoryPath */
    subdirectory?: string
  }>
}

interface ExportResult {
  success: boolean
  filesWritten: string[]
  error?: string
}

/**
 * POST handler - Export files to filesystem
 */
export async function POST(request: NextRequest) {
  try {
    const body: ExportRequest = await request.json()
    const { directoryPath, files } = body

    // Validate directory path
    if (!directoryPath || typeof directoryPath !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid directory path",
          filesWritten: [],
        } as ExportResult,
        { status: 400 },
      )
    }

    // Security check: ensure path is within the project
    const normalizedPath = path.normalize(directoryPath)
    const projectRoot = path.join(process.cwd(), "..", "..")
    if (!normalizedPath.startsWith(projectRoot)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid directory path: outside project",
          filesWritten: [],
        } as ExportResult,
        { status: 403 },
      )
    }

    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      return NextResponse.json(
        {
          success: false,
          error: `Directory not found: ${directoryPath}`,
          filesWritten: [],
        } as ExportResult,
        { status: 404 },
      )
    }

    const filesWritten: string[] = []

    // Write each file
    for (const file of files) {
      // Determine the target directory (may include subdirectory)
      let targetDir = directoryPath
      if (file.subdirectory) {
        targetDir = path.join(directoryPath, file.subdirectory)
        // Create subdirectory if it doesn't exist
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true })
          console.log(`Created directory: ${targetDir}`)
        }
      }

      const filePath = path.join(targetDir, file.filename)
      const relativeFilePath = file.subdirectory
        ? path.join(file.subdirectory, file.filename)
        : file.filename

      try {
        fs.writeFileSync(filePath, file.content, "utf-8")
        filesWritten.push(relativeFilePath)
        console.log(`Successfully wrote: ${filePath}`)
      } catch (error) {
        console.error(`Failed to write ${file.filename}:`, error)
        return NextResponse.json(
          {
            success: false,
            error: `Failed to write ${file.filename}: ${error instanceof Error ? error.message : "Unknown error"}`,
            filesWritten,
          } as ExportResult,
          { status: 500 },
        )
      }
    }

    return NextResponse.json({
      success: true,
      filesWritten,
    } as ExportResult)
  } catch (error) {
    console.error("Error exporting files:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        filesWritten: [],
      } as ExportResult,
      { status: 500 },
    )
  }
}
