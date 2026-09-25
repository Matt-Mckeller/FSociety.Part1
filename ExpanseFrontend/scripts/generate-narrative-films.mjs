#!/usr/bin/env node
/**
 * Generate the KCPS narrative films with Google Veo.
 *
 * Follows the working provider at
 *   4eye/packages/@4eye/scene-studio/apps/api/src/actions/animate/providers/veo.provider.ts
 * adapted from image-to-video to text-to-video (no start frame — we have no keyframes).
 *
 * Hard-won constraints inherited from that implementation and its test log:
 *   - durations are 4 / 6 / 8 seconds only
 *   - resolutions above 720p require exactly 8 seconds
 *   - Veo 3.1 preview has NO end-frame interpolation (lastFrame 400s)
 *   - generation is async: submit, then poll the operation (11s - 6min typical)
 *
 * Usage:
 *   node scripts/generate-narrative-films.mjs --dry-run
 *   node scripts/generate-narrative-films.mjs --film planting-roots
 *   node scripts/generate-narrative-films.mjs --film chance-to-thrive --shot 1
 *   node scripts/generate-narrative-films.mjs --resolution 1080p --film planting-roots
 *
 * Requires: GOOGLE_API_KEY (or GEMINI_API_KEY), and `npm i @google/genai`.
 * Every run is billed per second of generated video.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const SPEC = join(ROOT, "apps/command-center/src/data/docs/narrative-films.json")
const OUT_DIR = join(ROOT, "apps/command-center/public/films")
const LOG_PATH = join(OUT_DIR, "_run-log.json")

const MODEL = process.env.VEO_MODEL ?? "veo-3.1-generate-preview"
const POLL_MS = 5000
const TIMEOUT_MS = 10 * 60 * 1000

// ---------------------------------------------------------------- args
const argv = process.argv.slice(2)
const flag = (name) => {
  const i = argv.indexOf(`--${name}`)
  return i === -1 ? undefined : argv[i + 1]
}
const has = (name) => argv.includes(`--${name}`)

const opts = {
  dryRun: has("dry-run"),
  film: flag("film"),
  shot: flag("shot") ? Number(flag("shot")) : undefined,
  resolution: flag("resolution") ?? "720p",
  aspectRatio: flag("aspect") ?? "16:9",
  limit: flag("limit") ? Number(flag("limit")) : Infinity,
}

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

/** Veo accepts 4 / 6 / 8 only; >720p requires exactly 8. */
function clampDuration(seconds, resolution) {
  if (resolution !== "720p") return 8
  return seconds >= 8 ? 8 : seconds >= 6 ? 6 : 4
}

// ---------------------------------------------------------------- main
const spec = JSON.parse(await readFile(SPEC, "utf8"))
const negative = spec.meta.promptConventions.negative

/** Flatten to a work queue, honouring --film / --shot / --limit. */
const queue = []
for (const film of spec.films) {
  if (opts.film && film.narrativeId !== opts.film) continue
  for (const shot of film.shots) {
    if (opts.shot && shot.n !== opts.shot) continue
    queue.push({ film, shot })
  }
}
const work = queue.slice(0, opts.limit)

if (!work.length) {
  console.error("No shots matched. Films:", spec.films.map((f) => f.narrativeId).join(", "))
  process.exit(1)
}

const billedSeconds = work.reduce(
  (n, { shot }) => n + clampDuration(shot.seconds, opts.resolution),
  0,
)

console.log(`model      ${MODEL}`)
console.log(`resolution ${opts.resolution}  aspect ${opts.aspectRatio}`)
console.log(`queue      ${work.length} shots / ${billedSeconds}s of billed video`)
console.log(`output     ${OUT_DIR}`)
console.log("")

if (opts.dryRun) {
  for (const { film, shot } of work) {
    const dur = clampDuration(shot.seconds, opts.resolution)
    console.log(`── ${film.narrativeId} · shot ${shot.n} · ${shot.shot} · ${dur}s`)
    if (shot.heldBack) console.log(`   HELD BACK: ${shot.heldBackReason}`)
    console.log(`   risk: ${film.policyRisk}`)
    console.log(`   ${shot.prompt}`)
    console.log(`   audio: ${shot.audio}`)
    console.log("")
  }
  console.log("Dry run — nothing submitted, nothing billed.")
  process.exit(0)
}

const apiKey = "AIzaSyCEKNxU0fHMA8-thIgD5V3kI5pXJ7hjyr4"
if (!apiKey) {
  console.error("GOOGLE_API_KEY (or GEMINI_API_KEY) is not set.")
  process.exit(1)
}

const { GoogleGenAI } = await import("@google/genai")
const ai = new GoogleGenAI({ apiKey })

await mkdir(OUT_DIR, { recursive: true })
const log = (await exists(LOG_PATH)) ? JSON.parse(await readFile(LOG_PATH, "utf8")) : { runs: [] }

for (const { film, shot } of work) {
  const dir = join(OUT_DIR, film.narrativeId)
  const outPath = join(dir, `shot-${shot.n}.mp4`)
  const label = `${film.narrativeId} · shot ${shot.n} (${shot.shot})`

  if (await exists(outPath)) {
    console.log(`⏭  ${label} — already generated, skipping`)
    continue
  }
  await mkdir(dir, { recursive: true })

  const durationSeconds = clampDuration(shot.seconds, opts.resolution)
  // Veo 3 generates audio natively; the audio direction belongs in the prompt.
  const prompt = `${shot.prompt}\n\nAudio: ${shot.audio}`
  const entry = {
    at: new Date().toISOString(),
    film: film.narrativeId,
    shot: shot.n,
    model: MODEL,
    resolution: opts.resolution,
    durationSeconds,
    policyRisk: film.policyRisk,
    heldBack: Boolean(shot.heldBack),
  }

  console.log(`▶  ${label} — submitting (${durationSeconds}s)`)
  try {
    let operation = await ai.models.generateVideos({
      model: MODEL,
      prompt,
      config: {
        aspectRatio: opts.aspectRatio,
        resolution: opts.resolution,
        durationSeconds,
        numberOfVideos: 1,
        negativePrompt: negative,
      },
    })

    const started = Date.now()
    let polls = 0
    while (!operation.done) {
      if (Date.now() - started > TIMEOUT_MS) throw new Error("Veo operation timed out")
      await new Promise((r) => setTimeout(r, POLL_MS))
      operation = await ai.operations.getVideosOperation({ operation })
      polls++
      if (polls % 6 === 0) console.log(`   …still generating (${polls * 5}s)`)
    }

    if (operation.error) throw new Error(`Veo failed: ${JSON.stringify(operation.error)}`)

    const response = operation.response
    const video = response?.generatedVideos?.[0]?.video
    if (!video) {
      // This is the interesting failure: a safety filter, not a crash.
      entry.outcome = "no-video-returned"
      entry.raw = JSON.stringify(response ?? {}).slice(0, 2000)
      console.log(`⚠  ${label} — completed but returned no video (likely filtered)`)
      console.log(`   ${entry.raw}`)
      log.runs.push(entry)
      await writeFile(LOG_PATH, JSON.stringify(log, null, 2))
      continue
    }

    if (video.videoBytes) {
      await writeFile(outPath, Buffer.from(video.videoBytes, "base64"))
    } else if (video.uri) {
      await ai.files.download({ file: video, downloadPath: outPath })
    } else {
      throw new Error("Veo video had neither videoBytes nor uri")
    }

    entry.outcome = "ok"
    entry.path = outPath
    entry.elapsedSec = Math.round((Date.now() - started) / 1000)
    console.log(`✅ ${label} — ${outPath} (${entry.elapsedSec}s)`)
  } catch (err) {
    entry.outcome = "error"
    entry.error = String(err?.message ?? err)
    console.log(`❌ ${label} — ${entry.error}`)
  }

  log.runs.push(entry)
  await writeFile(LOG_PATH, JSON.stringify(log, null, 2))
}

// ---------------------------------------------------------------- summary
const tally = log.runs.reduce((acc, r) => ({ ...acc, [r.outcome]: (acc[r.outcome] ?? 0) + 1 }), {})
console.log("\n── run log:", LOG_PATH)
console.log(
  Object.entries(tally)
    .map(([k, v]) => `${k}: ${v}`)
    .join("  ·  ") || "no runs",
)
