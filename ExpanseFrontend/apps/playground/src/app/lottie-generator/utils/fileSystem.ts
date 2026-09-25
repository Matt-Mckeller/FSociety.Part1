/**
 * File System utilities for saving Lottie animations
 */
import type { LottieAnimation } from "../types"

/**
 * Save Lottie animation to the local filesystem
 */
export async function saveLottieToFile(
  animation: LottieAnimation,
  filename?: string,
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    const animationName = filename || animation.nm || "animation"
    const sanitizedName = animationName
      .replace(/[^a-z0-9-_]/gi, "-")
      .toLowerCase()
    const finalFilename = `${sanitizedName}.json`

    // Save to results directory (same as other tools)
    const response = await fetch("/api/lottie-generator/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animation,
        filename: finalFilename,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to save: ${response.statusText}`)
    }

    const result = await response.json()
    return {
      success: true,
      path: result.path,
    }
  } catch (error) {
    console.error("Error saving file:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Download Lottie animation to user's Downloads folder
 */
export function downloadLottieAnimation(
  animation: LottieAnimation,
  filename?: string,
): void {
  const animationName = filename || animation.nm || "animation"
  const sanitizedName = animationName
    .replace(/[^a-z0-9-_]/gi, "-")
    .toLowerCase()
  const finalFilename = `${sanitizedName}.json`

  const blob = new Blob([JSON.stringify(animation, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = finalFilename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
