import { ExpanseLottie } from "expanse.dynamicAssets"
import { analyzeAndNameLottie } from "./runtime/analyzeLotties"
import fs from "fs"
import { LottieAnimation } from "expanse.dynamicAssets"
import path from "path"

interface LottieAnalysisInput {
  lottieJsonPath: string
  userMetaData: {
    name?: string
    description?: string
    purpose?: string
  }
}

const runAnalysis = async (
  input: LottieAnalysisInput,
): Promise<Partial<ExpanseLottie>> => {
  const lottieJson = await retrieveLottieJson(input.lottieJsonPath)
  const exportPath = path.dirname(input.lottieJsonPath)

  const result = await analyzeAndNameLottie({
    lottie: lottieJson,
    userProvidedMetadata: input.userMetaData,
  })

  exportLottieUnifiedTheme(result as ExpanseLottie, exportPath)

  return result
}

// Lottie export
const exportLottieUnifiedTheme = (
  analyzedLottie: ExpanseLottie,
  exportPath?: string,
): void => {
  console.log({ analyzedLottie })
  const outputDir = "./output"

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }
  const animationName = analyzedLottie.animationName || "lottie"
  const fileName = `${animationName}.unifiedTheme.json`
  const defaultPath = `${outputDir}/${fileName}`

  // Save to ./output directory
  fs.writeFileSync(defaultPath, JSON.stringify(analyzedLottie, null, 2))
  console.log(`Saved to: ${defaultPath}`)

  // Save to provided export path if specified
  if (exportPath) {
    const dir = exportPath.substring(0, exportPath.lastIndexOf("/"))
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(
      `${exportPath}/${fileName}`,
      JSON.stringify(analyzedLottie, null, 2),
    )
    console.log(`Saved to: ${exportPath}/${fileName}`)
  }
}

// Grabs the Lottie JSON from a given file system path, returns it as an object
const retrieveLottieJson = (path: string): LottieAnimation => {
  const json = fs.readFileSync(path, "utf-8")
  return JSON.parse(json) as LottieAnimation
}

// List of Lottie JSON paths
const lottieList: LottieAnalysisInput[] = [
  {
    lottieJsonPath:
      "/Users/mm/Projects/ExpanseFrontend/packages/dynamicAssets/lotties/SmilingFace/SmilingFace.json",
    userMetaData: {
      name: "SmilingFace",
      description: "A smiling face animation",
      purpose: "Use as an emoji in chat applications",
    },
  },
]

const selectedLottie = lottieList[0]

// Run the analysis and wait for completion
;(async () => {
  try {
    console.log("🚀 Starting analysis...")
    const result = await runAnalysis(selectedLottie)
    console.log("✅ Analysis complete!")
  } catch (error) {
    console.error("❌ Error during analysis:", error)
    process.exit(1)
  }
})()
