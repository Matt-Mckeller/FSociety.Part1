import { test, expect } from "@playwright/test"
import * as path from "path"

test.describe("Lottie Naming Tool", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3010/lottie-naming-tool")
    await page.waitForLoadState("networkidle")
  })

  test("should load and display the Lottie Naming Tool", async ({ page }) => {
    // Check that the main title is visible
    await expect(page.locator("text=Lottie Naming Tool")).toBeVisible()

    // Check that file upload panel is visible
    await expect(page.locator("text=Upload Lottie File")).toBeVisible()
  })

  test("should process RocketLaunchUpAndRightRed.json with multi-phase mode", async ({
    page,
  }) => {
    // Verify multi-phase button is present and shows as recommended
    const multiPhaseButton = page.locator('button:has-text("Multi-Phase")')
    await expect(multiPhaseButton).toBeVisible()
    await expect(multiPhaseButton).toContainText("Recommended")

    // Path to the test file
    const filePath = path.resolve(
      __dirname,
      "../../../../packages/dynamicAssets/lotties/animationData/RocketLaunchPadUpAndRight/RocketLaunchUpAndRightRed.json",
    )

    // Upload the file
    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles(filePath)

    // Wait for the animation to be loaded
    await page.waitForTimeout(2000)

    // Check that component tree is visible
    await expect(page.locator("text=Component Tree")).toBeVisible()

    // Check that Generate Names button is enabled
    const generateButton = page.locator('button:has-text("Generate Names")')
    await expect(generateButton).toBeEnabled()

    // Click Generate Names
    await generateButton.click()

    // Wait for streaming to start
    await page.waitForTimeout(1000)

    // Should see phase messages
    const responseArea = page.locator('[class*="ClaudeResponse"]').first()

    // Wait for response with timeout (up to 60 seconds for API call)
    await page.waitForSelector("text=/Phase|Animation size|Processing/", {
      timeout: 10000,
    })

    // Wait for the response to complete (no "isStreaming" state)
    await page.waitForFunction(
      () => {
        const button = document.querySelector(
          'button:has-text("Generate Names")',
        )
        return button && !button.hasAttribute("disabled")
      },
      { timeout: 120000 }, // 2 minutes max for processing
    )

    // Check that we got a response (either component names or error message)
    const hasComponentNames =
      (await page.locator("text=component_names").count()) > 0
    const hasSuccess =
      (await page.locator("text=/renamed|suggested|Component/i").count()) > 0
    const hasError = (await page.locator("text=/error|failed/i").count()) > 0

    if (hasError) {
      // Capture the error for debugging
      const errorText = await page
        .locator("text=/error|failed/i")
        .first()
        .textContent()
      console.log("Error encountered:", errorText)

      // Log the full page content for debugging
      const fullText = await page.locator("body").textContent()
      console.log("Page content:", fullText?.substring(0, 1000))

      throw new Error(`API call failed: ${errorText}`)
    }

    expect(hasComponentNames || hasSuccess).toBeTruthy()
  })

  test("should toggle between simple and multi-phase modes", async ({
    page,
  }) => {
    const multiPhaseButton = page.locator('button:has-text("Multi-Phase")')

    // Should start in multi-phase mode (default)
    await expect(multiPhaseButton).toContainText("Multi-Phase")
    await expect(multiPhaseButton).toContainText("Recommended")

    // Click to toggle to simple mode
    await multiPhaseButton.click()

    // Should now show Simple
    await expect(page.locator('button:has-text("Simple")')).toBeVisible()
    await expect(
      page.locator('button:has-text("Multi-Phase")'),
    ).not.toBeVisible()

    // Click again to toggle back
    await page.locator('button:has-text("Simple")').click()

    // Should be back to multi-phase
    await expect(multiPhaseButton).toBeVisible()
  })

  test("should show animation preview after upload", async ({ page }) => {
    const filePath = path.resolve(
      __dirname,
      "../../../../packages/dynamicAssets/lotties/animationData/RocketLaunchPadUpAndRight/RocketLaunchUpAndRightRed.json",
    )

    const fileInput = page.locator('input[type="file"]')
    await fileInput.setInputFiles(filePath)

    // Wait for animation preview
    await page.waitForTimeout(2000)

    // Check that Lottie player or canvas is present
    const hasLottiePlayer =
      (await page.locator('[class*="lottie"]').count()) > 0
    const hasCanvas = (await page.locator("canvas").count()) > 0
    const hasSvg = (await page.locator("svg").count()) > 0

    expect(hasLottiePlayer || hasCanvas || hasSvg).toBeTruthy()
  })
})
