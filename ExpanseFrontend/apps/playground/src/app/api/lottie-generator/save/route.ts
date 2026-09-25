import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const { animation, filename } = await request.json()

    if (!animation || !filename) {
      return NextResponse.json(
        { error: "Missing animation or filename" },
        { status: 400 },
      )
    }

    // Save to results directory at workspace root
    const resultsDir = join(process.cwd(), "../../../results/generated-lotties")

    // Create directory if it doesn't exist
    if (!existsSync(resultsDir)) {
      await mkdir(resultsDir, { recursive: true })
    }

    const filePath = join(resultsDir, filename)
    await writeFile(filePath, JSON.stringify(animation, null, 2), "utf-8")

    console.log(`✓ Saved Lottie animation to: ${filePath}`)

    return NextResponse.json({
      success: true,
      path: filePath,
      filename,
    })
  } catch (error) {
    console.error("Error saving Lottie file:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to save file",
      },
      { status: 500 },
    )
  }
}
