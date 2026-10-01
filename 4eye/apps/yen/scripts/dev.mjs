/**
 * Local yen boot. `package.json` used to run the docs indexer and the photo
 * converter, then Next — every time, in series. That meant ~500 markdown files
 * and ~300 ffmpeg conversions before the port bound, even when nothing in
 * either corpus had changed and even when you only wanted the home page.
 *
 * This script:
 *   1. Reuses an already-bound :3400 instead of colliding with it.
 *   2. Regenerates docs and photos only when their output is missing, in
 *      parallel. Pass `--fresh` (or `npm run dev:fresh`) to rebuild both.
 *   3. Starts Next on Turbopack by default. `--webpack` is the escape hatch
 *      if a workspace package still needs the webpack loader path.
 */

import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createConnection } from "node:net";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.env.PORT || 3400);
const fresh = process.argv.includes("--fresh") || process.env.YEN_FRESH === "1";
const webpack =
  process.argv.includes("--webpack") || process.env.YEN_WEBPACK === "1";

const DOCS_INDEX = join(APP_ROOT, "src/generated/docs-index.json");
const DOCS_HTML = join(APP_ROOT, "src/generated/docs");
const PHOTOS_JSON = join(APP_ROOT, "src/generated/photos.json");
const NEXT_BIN = join(APP_ROOT, "node_modules/next/dist/bin/next");

function loadDotEnv() {
  const envPath = join(APP_ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const eq = trimmed.indexOf("=");
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv();

function portOpen(port) {
  return new Promise((resolveOpen) => {
    const socket = createConnection({ port, host: "127.0.0.1" });
    socket.setTimeout(400);
    socket.on("connect", () => {
      socket.destroy();
      resolveOpen(true);
    });
    socket.on("timeout", () => {
      socket.destroy();
      resolveOpen(false);
    });
    socket.on("error", () => resolveOpen(false));
  });
}

function runNode(script, extraEnv = {}) {
  return new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, [join(APP_ROOT, "scripts", script)], {
      cwd: APP_ROOT,
      stdio: "inherit",
      env: { ...process.env, ...extraEnv },
    });
    child.on("exit", (code) => {
      if (code === 0) resolveRun();
      else reject(new Error(`${script} exited ${code}`));
    });
  });
}

function authHeaders() {
  const user = process.env.SITE_ACCESS_USER?.trim();
  const password = process.env.SITE_ACCESS_PASSWORD;
  if (!user || password === undefined || password === "") return {};
  const token = Buffer.from(`${user}:${password}`).toString("base64");
  return { Authorization: `Basic ${token}` };
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

/**
 * First request to a route in `next dev` pays the compile. Hitting the
 * product paths after the port binds means the visitor is not the one
 * staring at a blank tab for twelve seconds.
 */
async function warmupRoutes() {
  const headers = { "User-Agent": "yen-warmup", ...authHeaders() };
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/`, {
        headers,
        redirect: "manual",
      });
      if (res.status === 200 || res.status === 401) {
        ready = true;
        break;
      }
    } catch {
      /* not listening yet */
    }
    await sleep(500);
  }
  if (!ready) return;

  const routes = [
    "/4eye",
    "/docs",
    "/4eye/appRealm/character",
    "/4eye/technical/data",
    "/integration-layer",
  ];
  for (const path of routes) {
    const started = Date.now();
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}${path}`, {
        headers,
        redirect: "manual",
      });
      console.log(
        `yen: warmed ${path} ${res.status} ${((Date.now() - started) / 1000).toFixed(1)}s`,
      );
    } catch (err) {
      console.warn(`yen: warmup ${path} failed (${err.message})`);
    }
  }
}

if (!existsSync(NEXT_BIN)) {
  console.error("yen: next is not installed. Run npm install from the 4eye workspace root.");
  process.exit(1);
}

if (await portOpen(PORT)) {
  let yen = false;
  try {
    const res = await fetch(`http://127.0.0.1:${PORT}/`, { redirect: "manual" });
    yen = res.status === 200 || res.status === 401 || res.status === 307 || res.status === 308;
  } catch {
    yen = false;
  }
  if (yen) {
    console.log(`yen already running at http://localhost:${PORT}`);
    process.exit(0);
  }
  console.error(
    `yen: port ${PORT} is in use by something else. Stop that process, or set PORT.`,
  );
  process.exit(1);
}

const skipDocs = !fresh && existsSync(DOCS_INDEX) && existsSync(DOCS_HTML);
const skipPhotos = !fresh && existsSync(PHOTOS_JSON);

console.log(
  `yen dev\n` +
    `  docs:    ${skipDocs ? "cached" : "generating"}\n` +
    `  photos:  ${skipPhotos ? "cached" : "generating"}\n` +
    `  bundler: ${webpack ? "webpack" : "turbopack"}\n` +
    `  bind:    0.0.0.0:${PORT}\n` +
      `  url:     http://localhost:${PORT}\n`,
);

const started = Date.now();
await Promise.all([
  runNode("build-docs-index.mjs", skipDocs ? { SKIP_DOCS_INDEX: "1" } : {}),
  runNode("build-photo-manifest.mjs", skipPhotos ? { SKIP_PHOTO_MANIFEST: "1" } : {}),
]);
console.log(`yen: generate ${((Date.now() - started) / 1000).toFixed(1)}s\n`);

const args = ["dev", "-p", String(PORT), "--hostname", "0.0.0.0"];
if (!webpack) args.push("--turbo");

const next = spawn(process.execPath, [NEXT_BIN, ...args], {
  cwd: APP_ROOT,
  stdio: "inherit",
  env: process.env,
});

warmupRoutes().catch((err) => {
  console.warn(`yen: warmup skipped (${err.message})`);
});

const stop = (signal) => {
  if (!next.killed) next.kill(signal);
};

process.on("SIGINT", () => stop("SIGINT"));
process.on("SIGTERM", () => stop("SIGTERM"));

next.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
