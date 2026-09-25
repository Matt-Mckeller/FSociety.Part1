/**
 * Builds the other applications with their own toolchains and drops the output
 * into `public/apps/<id>/`, where the site serves them unchanged.
 *
 * The point is that these apps are not ported. Command Center is MUI 5 and
 * react-router; yen is MUI 9 and the App Router. Converting them would mean
 * touching hundreds of call sites per app and risking a layout regression in
 * every one. Building each with its own dependencies and serving the result
 * sidesteps all of that: each app keeps its own React tree, its own MUI, its
 * own router, and contributes nothing to yen's bundles.
 *
 * The route at /apps/<id> frames the built app full-height, so it is reachable
 * from inside the site while still being the same application.
 *
 * Apps are skipped rather than fatal when their dependencies are missing, so a
 * clone without every sibling repo installed still builds the site.
 */

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS = resolve(APP_ROOT, "../../..");
/*
  Served from `public/mounted/`, not `public/apps/`. The site has real Next
  routes under `/apps/<id>`, so a static directory at the same URL is shadowed
  by the route — the frame requests its own page and the browser aborts the
  recursion. Separate namespaces keep the route and the built app distinct.
*/
const OUT_ROOT = join(APP_ROOT, "public/mounted");

/**
 * `builder` is how the app produces static output:
 *   vite — `vite build --base=<mount>`, which rewrites asset URLs for us.
 *   next-export — a Next app already configured to emit a static `out/`.
 */
const APPS = [
  {
    id: "command-center",
    dir: "ExpanseFrontend/apps/command-center",
    builder: "vite",
    /*
      The app's `public/assets` is a symlink into `packages/staticAssets`, which
      Vite dereferences and copies whole — 209 MB of output for 5 MB of app.

      Both entries below were checked against the source before removing them:
      `films` has no reference anywhere in `src`, and the animations directory is
      reachable only through `SLIDE_ANIMATIONS_PATH`, which is exported and never
      consumed. The presentation slides the app does read are kept.

      If either is wired up later, drop it from this list and the assets return.
    */
    prune: ["films", "assets/expanseEdu/presentation/animations"],
  },
  {
    id: "expanse-edu",
    dir: "ExpanseFrontend/apps/expanseEdu",
    builder: "next-export",
  },
  {
    id: "4wing",
    dir: "ExpanseFrontend/apps/4wing/product-website",
    builder: "next-export",
  },
  {
    id: "4wing-pitch",
    dir: "ExpanseFrontend/apps/4wing/pitch-deck-v2",
    builder: "next-export",
  },
  {
    id: "4wing-brand",
    dir: "ExpanseFrontend/apps/4wing/brand-design",
    builder: "next-export",
  },
  {
    id: "4wing-docs",
    dir: "ExpanseFrontend/apps/4wing/documentation-website",
    builder: "next-export",
  },
  {
    id: "symbol-grid",
    dir: "ExpanseFrontend/apps/symbol-grid",
    builder: "next-export",
  },
  {
    id: "presentation",
    dir: "ExpanseFrontend/apps/presentationApp",
    builder: "next-export",
  },
  {
    id: "communication-planner",
    dir: "ExpanseFrontend/apps/communication-planner",
    builder: "next-export",
  },
  {
    id: "storybook",
    dir: "4eye/apps/4eye-web-mockup",
    builder: "storybook",
    /*
      `studio-assets` is another symlink into a package — 122 MB of scene-studio
      source assets, against ~23 MB for the whole rest of Storybook. Pruned, the
      scene-studio stories lose their imagery; every other story is unaffected.
      Drop this entry if those stories become the point.
    */
    prune: ["studio-assets"],
  },
  {
    /*
      The second Storybook. There are nine `.storybook` directories across
      ~/Projects, but only two are whole-catalogue books worth publishing: this
      one and the 4eye app's above. The rest belong to individual @expanse
      packages and are development tools for one library each.

      This one covers the other side of the estate — 260 stories over the
      ExpanseFrontend ui, brandCore and dynamicAssets packages plus the 4up
      screens.

      It lands at ~199 MB, and no `prune` entry can fix that: ~130 MB of it is
      five animated GIFs that stories genuinely import, so Rollup emits them and
      removing them would break the stories rather than trimming dead weight.
      The real fix is to compress or lazily load them in ExpanseFrontend. Worth
      doing before this is deployed anywhere metered; `public/mounted/` is
      gitignored, so nothing about it reaches the repository either way.

      Checked for anything that should not be public before adding it: every
      context in `src/mocks` is a Storybook stub with placeholder values, and no
      story carries client or personal data. The one story that did touch
      personal material — PersonalNext/Resume — imports a component that was
      deleted from personalNext, and is excluded in that book's own main.ts.
    */
    id: "storybook-expanse",
    dir: "ExpanseFrontend/apps/storybook",
    builder: "storybook",
  },
];

/*
  Apps that cannot be mounted this way, and why. Kept here rather than in a
  commit message because the reason is a property of the app, not of a change:

  expanse-services      15 pages query GraphQL through Apollo at build time.
                        Static export prerenders them with no server to answer,
                        so they fail. Needs a running API, not a config change.
  lottie-studio         throws "Element type is invalid" during prerender — a
                        real runtime fault in the app, not an export problem.
*/

const results = [];

/**
 * Finds an executable in the nearest `node_modules/.bin` at or above `from`.
 *
 * These repositories do not agree on a package manager. The pnpm ones give
 * every app its own `.bin`, while the npm-workspaces ones hoist a single copy
 * to the workspace root — so `<app>/node_modules/.bin/storybook` exists in one
 * and never in the other. Walking up finds it either way, and finds the app's
 * own copy first where there is one, which matters: these repos run Next 14
 * through 16 and Storybook 7 through 8, and building an app with the wrong
 * major fails in ways that look like application bugs.
 *
 * Stops at PROJECTS rather than at the filesystem root, so a stray global
 * install outside the workspace can never be picked up silently.
 */
function findBin(from, name) {
  let dir = from;
  for (;;) {
    const candidate = join(dir, "node_modules/.bin", name);
    if (existsSync(candidate)) return candidate;
    if (dir === PROJECTS) return null;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function dirSize(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    total += entry.isDirectory() ? dirSize(full) : statSync(full).size;
  }
  return total;
}

for (const app of APPS) {
  const src = join(PROJECTS, app.dir);
  const out = join(OUT_ROOT, app.id);
  const mount = `/mounted/${app.id}/`;

  if (!existsSync(src)) {
    console.warn(`  ! ${app.id}: source missing at ${app.dir}, skipped`);
    results.push({ id: app.id, status: "missing" });
    continue;
  }
  if (!existsSync(join(src, "node_modules"))) {
    console.warn(`  ! ${app.id}: dependencies not installed, skipped`);
    results.push({ id: app.id, status: "no-deps" });
    continue;
  }

  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  try {
    if (app.builder === "vite") {
      // Deliberately not `npm run build` — that script runs `tsc` first, and a
      // pre-existing type error in an app we are not modifying should not stop
      // the site from building. Vite's own transform is what produces output.
      const bin = findBin(src, "vite");
      if (!bin) throw new Error("no vite binary found at or above the app");

      execFileSync(bin, ["build", `--base=${mount}`, "--outDir", out, "--emptyOutDir"], {
        cwd: src,
        stdio: "pipe",
      });
    } else if (app.builder === "next-export") {
      const bin = findBin(src, "next");
      if (!bin) throw new Error("no next binary found at or above the app");

      execFileSync(bin, ["build"], {
        cwd: src,
        stdio: "pipe",
        env: { ...process.env, YEN_MOUNT_PATH: `/mounted/${app.id}` },
      });

      const exported = join(src, "out");
      if (!existsSync(exported)) {
        throw new Error("build produced no out/ — the app is not statically exportable");
      }
      cpSync(exported, out, { recursive: true });
    } else if (app.builder === "storybook") {
      // Storybook emits relative asset URLs, so the output works at any mount
      // path without being told where it will live.
      const bin = findBin(src, "storybook");
      if (!bin) throw new Error("no storybook binary found at or above the app");

      /*
        `--disable-telemetry` and `CI` are not optional here. After a failed
        build Storybook asks on stdin whether to send a crash report, and with
        `stdio: "pipe"` there is nobody to answer — the build then fails with a
        deprecation warning as its only visible output, which is a genuinely
        terrible thing to debug. Both settings make it non-interactive.
      */
      execFileSync(bin, ["build", "-o", out, "--quiet", "--disable-telemetry"], {
        cwd: src,
        stdio: "pipe",
        env: { ...process.env, CI: "true" },
      });
    } else {
      throw new Error(`unknown builder: ${app.builder}`);
    }
  } catch (err) {
    console.warn(`  ! ${app.id}: build failed, skipped`);
    /*
      The LAST lines, not the first. These toolchains open with deprecation
      notices and progress chatter and put the actual error at the end, so
      printing the head reliably showed a punycode warning and nothing else.
      Blank lines are dropped so the six-line budget is spent on content.
    */
    const output = String(err.stderr || "") + String(err.stdout || "") || err.message;
    console.warn(
      output
        .split("\n")
        .filter((line) => line.trim())
        .slice(-6)
        .map((line) => `    ${line}`)
        .join("\n"),
    );
    results.push({ id: app.id, status: "failed" });
    continue;
  }

  const before = dirSize(out) / 1048576;
  for (const p of app.prune ?? []) {
    rmSync(join(out, p), { recursive: true, force: true });
  }

  const mb = dirSize(out) / 1048576;
  if (app.prune?.length) {
    console.log(`    pruned ${(before - mb).toFixed(0)} MB of unreferenced assets`);
  }
  results.push({ id: app.id, status: "built", mb });
  console.log(`  · ${app.id}: built ${mb.toFixed(1)} MB -> public/mounted/${app.id}/`);
}

const built = results.filter((r) => r.status === "built");
console.log(
  `\nmounted apps: ${built.length} of ${APPS.length} built` +
    (built.length ? ` (${built.reduce((n, r) => n + r.mb, 0).toFixed(1)} MB total)` : "") +
    " -> public/mounted/\n",
);
