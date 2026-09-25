import { chromium } from "playwright";

const outDir = "/private/tmp/claude-501/-Users-mm-Projects-4eye/c76c7be2-18d9-4923-af9b-ed26c2089c8a/scratchpad";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1600 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:3311/appRealm/character", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(3000);

// Core tab (mood)
const coreTab = page.getByRole("tab", { name: /core/i }).first();
if (await coreTab.count()) {
  await coreTab.click();
  await page.waitForTimeout(800);
}
await page.screenshot({ path: `${outDir}/character-core.png`, fullPage: true });

// Gear tab (equipment + perks)
const gearTab = page.getByRole("tab", { name: /gear/i }).first();
if (await gearTab.count()) {
  await gearTab.click();
  await page.waitForTimeout(800);
}
await page.screenshot({ path: `${outDir}/character-gear.png`, fullPage: true });

console.log("ERRORS:", JSON.stringify(errors, null, 2));

await browser.close();
