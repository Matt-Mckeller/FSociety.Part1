/**
 * Test script for Lottie Generator
 * Run with: node --loader ts-node/esm test-generator.mjs
 */

import {
  generateLottieAnimation,
  EXAMPLE_PROMPTS,
} from "./utils/claudeGenerator"

async function testGeneration() {
  console.log("🧪 Testing Lottie Generator\n")
  console.log("=".repeat(60))

  // Test 1: Simple generation
  console.log("\n📝 Test 1: Generating simple animation...")
  console.log("Description:", EXAMPLE_PROMPTS.loading)

  try {
    let streamLength = 0
    const result = await generateLottieAnimation(
      EXAMPLE_PROMPTS.loading,
      {
        width: 256,
        height: 256,
        duration: 2,
        style: "flat",
        complexity: "simple",
      },
      (text) => {
        streamLength = text.length
        if (streamLength % 1000 === 0) {
          process.stdout.write(".")
        }
      },
    )

    console.log(`\n✓ Streamed ${streamLength} characters`)

    if (result.success && result.animation) {
      console.log("✓ Animation generated successfully!")
      console.log(`  - Name: ${result.animation.nm}`)
      console.log(`  - Dimensions: ${result.animation.w}x${result.animation.h}`)
      console.log(`  - Frame rate: ${result.animation.fr}fps`)
      console.log(`  - Layers: ${result.metadata?.layerCount}`)
      console.log(`  - Shapes: ${result.metadata?.shapeCount}`)
      console.log(`  - Duration: ${result.metadata?.duration}s`)
      console.log(
        `  - File size: ${(result.metadata?.fileSize || 0 / 1024).toFixed(2)}KB`,
      )
    } else {
      console.error("✗ Generation failed:", result.error)
      return false
    }
  } catch (error) {
    console.error("✗ Error during generation:", error)
    return false
  }

  console.log("\n" + "=".repeat(60))
  console.log("✓ All tests passed!")
  return true
}

// Run tests
testGeneration().then((success) => {
  process.exit(success ? 0 : 1)
})
