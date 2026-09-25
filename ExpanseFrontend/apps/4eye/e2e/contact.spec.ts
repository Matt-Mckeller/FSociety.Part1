import { test, expect } from "@playwright/test"

test.describe("Contact Page", () => {
  test("should load without errors", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text())
      }
    })

    await page.goto("/contact")
    await page.waitForLoadState("networkidle")

    // Check page loaded
    await expect(page).toHaveTitle(/.+/)

    // Filter out expected errors
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("404"),
    )
    expect(criticalErrors).toHaveLength(0)
  })
})
