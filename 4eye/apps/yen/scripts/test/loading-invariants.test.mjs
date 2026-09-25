import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const APP_ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");

function read(rel) {
  return readFileSync(join(APP_ROOT, rel), "utf8");
}

describe("loading screens stay off the MUI barrel", () => {
  it("docs loading is CSS-only yen boot", () => {
    const src = read("src/app/docs/loading.tsx");
    assert.equal(src.includes("@mui"), false);
    assert.match(src, /YenBootScreen/);
  });

  it("4eye loading does not re-export the HUD MUI skeleton", () => {
    const src = read("src/app/4eye/loading.tsx");
    assert.equal(src.includes("@mui"), false);
    assert.equal(src.includes("app/(hud)/loading"), false);
    assert.match(src, /FourEyeBootScreen/);
  });

  it("4eye layout is a server wrapper around HudLayout", () => {
    const src = read("src/app/4eye/layout.tsx");
    assert.equal(src.includes("export { HudLayout as default }"), false);
    assert.match(src, /four-eye-shell/);
    assert.match(src, /HudLayout/);
  });

  it("does not install a root loading.tsx that hydrates against the home page", () => {
    assert.equal(existsSync(join(APP_ROOT, "src/app/loading.tsx")), false);
  });

  it("keeps the skip link inside Providers so body has one child", () => {
    const src = read("src/app/layout.tsx");
    const providers = src.indexOf("<Providers>");
    const skip = src.indexOf('href="#main"');
    const close = src.indexOf("</Providers>");
    assert.ok(providers !== -1 && skip !== -1 && close !== -1);
    assert.ok(providers < skip && skip < close);
  });
});
