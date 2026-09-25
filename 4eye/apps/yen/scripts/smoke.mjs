/**
 * Hit the yen routes that have historically been the slow / broken ones.
 * Uses SITE_ACCESS_* from apps/yen/.env when the gate is on.
 *
 *   pnpm --filter yen test:smoke
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const APP_ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3400);
const BASE = process.env.YEN_SMOKE_BASE || `http://127.0.0.1:${PORT}`;

function loadEnv() {
  const envPath = join(APP_ROOT, "..", ".env");
  try {
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const eq = trimmed.indexOf("=");
      const key = trimmed.slice(0, eq);
      const value = trimmed.slice(eq + 1);
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    /* .env is optional when the gate is off */
  }
}

function authHeaders() {
  const user = process.env.SITE_ACCESS_USER?.trim();
  const password = process.env.SITE_ACCESS_PASSWORD;
  if (!user || password === undefined || password === "") return {};
  const token = Buffer.from(`${user}:${password}`, "utf8").toString("base64");
  return { Authorization: `Basic ${token}` };
}

const ROUTES = [
  "/",
  "/4eye",
  "/4eye/appRealm/character",
  "/4eye/appRealm/profile",
  "/4eye/technical/data",
  "/4eye/technical/performance",
  "/docs",
  "/integration-layer",
  "/vision",
  "/apps/command-center",
];

const FAILURE_NEEDLES = [
  "Something broke on this page",
  "yen failed to render",
  "Module not found",
  "Application error",
];

loadEnv();

const headers = { "User-Agent": "yen-smoke", ...authHeaders() };
let failed = 0;

for (const path of ROUTES) {
  const url = `${BASE}${path}`;
  const started = Date.now();
  try {
    const res = await fetch(url, { headers, redirect: "manual" });
    const body = await res.text();
    const ms = Date.now() - started;
    const hit = FAILURE_NEEDLES.find((n) => body.includes(n));
    if (res.status !== 200 || hit) {
      failed += 1;
      console.error(
        `FAIL ${res.status} ${path} ${ms}ms${hit ? ` (${hit})` : ""}`,
      );
    } else {
      console.log(`ok   ${res.status} ${path} ${ms}ms ${body.length}b`);
    }
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${path} ${err.message}`);
  }
}

if (failed) {
  console.error(`\nyen smoke: ${failed} route(s) failed against ${BASE}`);
  process.exit(1);
}

console.log(`\nyen smoke: ${ROUTES.length} routes ok at ${BASE}`);
