/**
 * Test script for metadata generation API
 */

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function testMetadataGeneration() {
  const testFile =
    "/Users/mm/Projects/ExpanseFrontend/packages/dynamicAssets/lotties/SmilingFace/SmilingFace.json"

  console.log("Loading test file:", testFile)
  const lottieJson = JSON.parse(fs.readFileSync(testFile, "utf-8"))

  console.log(
    "Lottie file loaded. Dimensions:",
    lottieJson.w,
    "x",
    lottieJson.h,
  )
  console.log("Frame rate:", lottieJson.fr)
  console.log("Layers:", lottieJson.layers?.length || 0)

  console.log("\nSending request to API...")

  const response = await fetch(
    "http://localhost:3010/api/lottie-naming/generate-metadata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lottieJson,
        fileName: "SmilingFace.json",
      }),
    },
  )

  console.log("Response status:", response.status)

  const data = await response.json()

  if (response.ok) {
    console.log("\n✅ SUCCESS! Metadata generated:")
    console.log("\nSuggested Names:")
    data.metadata.suggestedNames.forEach((name, i) => {
      console.log(`  ${i + 1}. ${name}`)
    })

    console.log("\nDescription:")
    console.log(`  ${data.metadata.description}`)

    console.log("\nPurpose:")
    console.log(`  Primary: ${data.metadata.purpose.primary}`)
    console.log(`  Categories:`)
    Object.entries(data.metadata.purpose.categories).forEach(([cat, uses]) => {
      console.log(`    ${cat}:`)
      uses.forEach((use) => console.log(`      - ${use}`))
    })

    console.log("\nTags:")
    console.log(`  ${data.metadata.tags.join(", ")}`)
  } else {
    console.error("\n❌ ERROR:")
    console.error(data)
  }
}

testMetadataGeneration().catch(console.error)
