import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("should load without errors", async ({ page }) => {
    // Listen for console errors
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text())
      }
    })

    // Navigate to homepage
    await page.goto("/")

    // Wait for page to load
    await page.waitForLoadState("networkidle")

    // Check page title exists
    await expect(page).toHaveTitle(/.+/)

    // Check header is visible
    const header = page.locator("header")
    await expect(header).toBeVisible()

    // Check no critical errors (filter out expected ones)
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("404"),
    )
    expect(criticalErrors).toHaveLength(0)
  })

  test("should display main content", async ({ page }) => {
    await page.goto("/")
    await page.waitForLoadState("networkidle")

    // Check body has content
    const body = page.locator("body")
    await expect(body).not.toBeEmpty()
  })
})
