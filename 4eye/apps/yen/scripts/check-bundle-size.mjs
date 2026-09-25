/**
 * First-load JS budget check. Run after `next build`.
 *
 * Sums the gzipped size of every chunk the app build manifest lists for a
 * route — the same set the browser must fetch before the page is interactive,
 * and the same number Next prints as "First Load JS".
 *
 * Budgets are set from what the stack actually costs, not from a round number:
 * ~87 kB of the total is the React + Next runtime shared by every route, and
 * MUI plus the Expanse theme account for most of the rest. A budget below that
 * floor would only ever be theatre.
 */

import { gzipSync } from "node:zlib";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

if (process.env.SKIP_BUNDLE_BUDGET === "1") {
  console.log("bundle budget: skipped (SKIP_BUNDLE_BUDGET=1)\n");
  process.exit(0);
}

const NEXT_DIR = ".next";

/*
  kB, gzipped. Per-route because content routes legitimately cost more than
  stubs, and a single shared number would either block real content or be too
  loose to catch anything.

  The gate exists to catch regressions of the barrel-import kind — a route
  jumping 100+ kB overnight — not to police a few kB of markup. Raise a budget
  when the route genuinely grew; investigate when it jumped.
*/
const CONTENT_ROUTE = 150; // renders a real dataset
const LEAN_ROUTE = 140; // stub, or a short page

/*
  The mounted 4eye application is a different class of thing from the rest of
  the site: three.js, framer-motion, gsap and a full HUD. Its routes land
  between 380 and 650 kB and that is inherent, not a regression.

  This is exactly what per-route splitting buys. Someone reading /donate
  downloads ~130 kB; only someone actually opening 4eye pays for the 3D rig.
  Holding /4eye/* to the site budget would mean gutting the application.
*/
const MOUNTED_APP = 800;

/*
  Heaviest route in the mounted app is /4eye/(websiteRealm)/projects at ~750 kB
  — ProjectsTile composes the entity-tile planning views, the strategy sections
  and the home slides in one page. If the app ever needs slimming, that is the
  first place to look; nothing about it is a regression today.
*/

/*
  A ported application running on its own route. Larger than a content page
  because it is interactive and carries its own data, but nowhere near the 4eye
  budget — no 3D, no animation rig. The Strategic Compass sits at ~171 kB: MUI
  and the theme are most of it, with ~24 kB of vision, pillar, principle and
  roadmap JSON on top.

  Kept separate from MOUNTED_APP so a real regression here still trips. If a
  ported app ever needs 800 kB, that is worth noticing rather than absorbing.
*/
const PORTED_APP = 220;

/*
  The video library is a media application rather than a page: a custom player,
  version and language pickers, a synchronised commentary window, presentation
  mode and the tag filter. The rest of the site's routes sit on a 133 kB shell;
  this one earns its extra weight, and it is the only route that carries it.
*/
const MEDIA_ROUTE = 200;

const PREFIX_BUDGETS = [
  ["/4eye/", MOUNTED_APP],
  ["/apps/command-center", PORTED_APP],
];

const BUDGETS = {
  "/page": CONTENT_ROUTE, // header + full grid
  "/layout": 200, // root layout: theme + providers, shared by everything
  "/equipment/page": CONTENT_ROUTE, // 23 item cards, each with an inline glyph
  "/integration-layer/page": CONTENT_ROUTE, // 8 layers × 4 cards
  "/surfaces/page": CONTENT_ROUTE, // 38-row surface inventory
  "/posts/page": CONTENT_ROUTE, // long-form entries with their own layout
  "/apps/[slug]/page": CONTENT_ROUTE, // showcase detail for every unported app
  "/videos/page": MEDIA_ROUTE,
  "/4eye/layout": MOUNTED_APP,
  default: LEAN_ROUTE,
};

function budgetFor(page) {
  if (BUDGETS[page]) return BUDGETS[page];
  for (const [prefix, value] of PREFIX_BUDGETS) {
    if (page.startsWith(prefix)) return value;
  }
  return BUDGETS.default;
}

/*
  Refuse to grade a development build.

  `next dev` writes the same `app-build-manifest.json` this script reads, but
  with unminified chunks — so running `pnpm budget` against a dev server's
  output reports every route at fifteen to twenty times its real size and looks
  exactly like a catastrophic regression. It cost a review cycle before anyone
  noticed the numbers came from `next dev`.

  `BUILD_ID` is written by `next build` and by nothing else, which makes its
  absence the cheap, reliable discriminator.
*/
if (!existsSync(join(NEXT_DIR, "BUILD_ID"))) {
  console.error(
    "\nNo .next/BUILD_ID — this is a development build.\n" +
      "Dev chunks are unminified, so these numbers would be meaningless.\n" +
      "Run `pnpm build` first.\n",
  );
  process.exit(1);
}

const manifest = JSON.parse(
  readFileSync(join(NEXT_DIR, "app-build-manifest.json"), "utf8"),
);

let failed = false;
const rows = [];

for (const [page, files] of Object.entries(manifest.pages)) {
  // Async chunks are fetched on demand and are not part of first load.
  const bytes = files
    .filter((f) => f.endsWith(".js"))
    .reduce((sum, f) => sum + gzipSync(readFileSync(join(NEXT_DIR, f))).length, 0);

  const kb = bytes / 1024;
  const budget = budgetFor(page);
  const over = kb > budget;
  if (over) failed = true;

  rows.push({ page, kb: kb.toFixed(1), budget, status: over ? "OVER" : "ok" });
}

rows.sort((a, b) => Number(b.kb) - Number(a.kb));

console.log("\nFirst-load JS (gzipped)\n");
for (const r of rows) {
  console.log(
    `  ${r.status === "OVER" ? "✗" : "✓"} ${r.page.padEnd(28)} ${String(r.kb).padStart(7)} kB   budget ${r.budget} kB`,
  );
}

if (failed) {
  console.error("\nOver budget. Check for a barrel import in a server component;\nthat is what caused the last regression.\n");
  process.exit(1);
}
console.log("\nAll routes within budget.\n");
