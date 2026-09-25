# Plan — Extract Scoring into `@expanse/scoring`

Status: **in progress** · Owner: platform · Last updated: 2026-05-31

Extract the Learn / Earn / Compete scoring system out of `@4eye/core/scoring`
(+ its types in `@4eye/types/scoring`) into a dedicated, reusable
`@expanse/scoring` package, structured so the **same contracts power both the
frontend (offline, local compute) and a future backend scoring service** with
no rewrite.

---

## 1. Why

The scoring engine is pure, generic infrastructure (normalize → weight → blend).
Per [`PACKAGE_ARCHITECTURE.md`](../technical/PACKAGE_ARCHITECTURE.md), reusable
infrastructure belongs in `@expanse/*`, not in the 4eye-specific `@4eye/core`.
Today it is buried under the Apollo surface of `@4eye/core` and its types are
split into `@4eye/types`, which couples the engine to 4eye domain packages.

Goals:

1. **One home.** Engine, normalizers, variant registry, types, React hook, and
   a backend-ready service abstraction all live in `@expanse/scoring`.
2. **Clean layering.** `@expanse/scoring` depends on **nothing** in `@4eye/*`
   (infra never imports domain). Confirmed: no `@expanse` package imports
   `@4eye` today — we keep it that way.
3. **Backend-ready, frontend-first.** A `ScoringService` port lets the app
   compute locally now (zero backend) and swap in a remote adapter later
   without touching call sites.
4. **Well-typed contracts.** Framework-agnostic `model/` layer that the web
   app, mobile, Storybook, **and** the NestJS `api` can all import.

---

## 2. Target package structure

```
packages/@expanse/scoring/
├── package.json            # @expanse/scoring, peer react, zero runtime deps
├── tsconfig.json
├── README.md
└── src/
    ├── index.ts            # root barrel (re-exports every layer)
    ├── model/              # ── pure contracts (isomorphic, ZERO deps) ──
    │   ├── index.ts
    │   ├── signals.ts      #   signal keys + raw input shapes (ScoringInput)
    │   ├── normalizer.ts   #   NormalizerConfig / NormalizerKind
    │   ├── weights.ts      #   ScoringWeights / ScoringNormalizers
    │   ├── variant.ts      #   ScoringVariant / ScoringVariantId / theme
    │   ├── result.ts       #   LearnScoreResult / ComponentScore / contributions
    │   └── meta.ts         #   ScoreSignalMeta + REWARD/COMPETE_SIGNAL_META
    ├── engine/             # ── pure compute (isomorphic, ZERO deps) ──
    │   ├── index.ts
    │   ├── normalizers.ts  #   normalize(value, config) -> [0,1]
    │   └── engine.ts       #   computeReward/Compete/Mastery/Scores
    ├── variants/           # ── default config registry (data) ──
    │   ├── index.ts
    │   └── registry.ts     #   SCORING_VARIANTS + getScoringVariant
    ├── service/            # ── backend-ready abstraction ──
    │   ├── index.ts
    │   ├── types.ts        #   ScoringService port + ScoreRequest/Response DTOs
    │   ├── localScoringService.ts   #   engine-backed, works OFFLINE (default)
    │   └── remoteScoringService.ts  #   transport-injected placeholder for api
    ├── react/              # ── React surface (peer dep) ──
    │   ├── index.ts
    │   ├── useScoring.ts        #   sync, memoized local compute (common case)
    │   ├── ScoringProvider.tsx  #   context supplying a ScoringService
    │   └── useScoreResult.ts    #   async hook over the injected service
    └── samples/            # ── example inputs (placeholders for real data) ──
        ├── index.ts
        └── profiles.ts     #   named ScoringInput fixtures for stories/docs/tests
```

### Layer dependency rules

```
model  ──>  (nothing)
engine ──>  model
variants ─> model
service ──> model, engine, variants
react  ──>  model, engine, variants, service, react (peer)
samples ──> model
```

- `model/`, `engine/`, `variants/`, `service/` are **React-free** → importable
  by the NestJS `api` and any non-React consumer.
- Only `react/` imports React (declared as a peer dependency).
- Subpath imports supported via path-map: `@expanse/scoring/model`,
  `/engine`, `/service`, `/react`, etc. Root `@expanse/scoring` re-exports all.

---

## 3. Backend / frontend split (the service layer)

The engine is pure and runs anywhere. The **`ScoringService` port** is the seam
between "compute it here" and "ask the backend":

```ts
interface ScoringService {
  score(req: ScoreRequest): Promise<LearnScoreResult>;
  listVariants(): Promise<ScoringVariantSummary[]>;
}
```

- **`LocalScoringService`** (default) computes synchronously via the engine and
  resolves immediately. **No backend required** — this is what ships first.
- **`createRemoteScoringService(transport)`** is a documented placeholder: it
  accepts an injected transport (fetch / GraphQL / Apollo) and maps to the
  future `POST /scoring/score` + `GET /scoring/variants` endpoints. It throws a
  clear "not wired yet" error until the app supplies a transport.
- The React `ScoringProvider` defaults to the local service, so UIs work with
  zero configuration and can later be pointed at the backend by swapping the
  provider's `service` prop — **no call-site changes**.

### Future backend (api) integration — out of scope for this change

When the NestJS scoring module is built it will:

1. Import `@expanse/scoring/engine` + `@expanse/scoring/variants` directly
   (server-authoritative compute) — the package is already framework-agnostic.
2. Expose `score` / `variants` GraphQL/REST operations using the shared DTOs in
   `@expanse/scoring/service`.
3. The web app flips `ScoringProvider service={createRemoteScoringService(...)}`.

No engine code changes are needed for any of this — that is the point of the
split.

---

## 4. Migration steps

1. **Scaffold** `packages/@expanse/scoring` (package.json, tsconfig) mirroring
   the existing `@expanse/*` convention.
2. **Move types** from `@4eye/types/src/scoring/index.ts` into
   `@expanse/scoring/src/model/*` (split by concern), preserving every exported
   name + JSDoc.
3. **Move engine** files (`normalizers.ts`, `engine.ts`, `variants.ts`,
   `useScoring.ts`) into the new layout; rewrite their imports to the local
   `model/` instead of `@4eye/types`.
4. **Add** the `service/`, `react/ScoringProvider`, `useScoreResult`, and
   `samples/` pieces.
5. **Hard cut consumers** (no shims):
   - Delete `export * from './scoring'` from `@4eye/core/src/index.ts`.
   - Delete `export * from './scoring'` from `@4eye/types/src/index.ts`.
   - Delete the old `packages/@4eye/core/src/scoring/` directory and
     `packages/@4eye/types/src/scoring/`.
   - Update the one real consumer
     (`apps/4eye-web-mockup/.../__tests__/scoring.test.ts`) to import from
     `@expanse/scoring`.
6. **Wire aliases** in all four places:
   - `tsconfig.base.json` paths (`@expanse/scoring` + `/*`).
   - `apps/4eye-web-mockup/tsconfig.json` (replace `@4eye/core/scoring`).
   - `apps/4eye-web-mockup/vitest.config.ts`.
   - `apps/4eye-web-mockup/.storybook/main.ts`.
7. **Stories** (`apps/4eye-web-mockup`): interactive playground + variant
   comparison + normalizer-curve visualizer (see §5).
8. **Docs**: package `README.md` + this plan + a note in
   `PACKAGE_ARCHITECTURE.md`'s package table.

---

## 5. Storybook (in `apps/4eye-web-mockup`, port 6311)

Visualization components live **in the app** (MUI-based), keeping the package
UI-free. Stories, white background per house style:

- **Playground** — per-signal sliders + variant selector → live Learn / Earn /
  Compete / Mastery bars with per-signal contribution breakdown.
- **Variant comparison** — one input scored across all five variants, side by
  side, to show how weighting changes the headline.
- **Normalizer curves** — plots `linear` / `log` / `sigmoid` so the diminishing-
  returns design is legible.

---

## 6. Validation

- Standalone `tsc` for workspace packages is broken by design (TS6059); validate
  via the **consuming app**: `apps/4eye-web-mockup` `get_errors` + `pnpm vitest
  run`.
- The existing scoring unit tests must pass unchanged (only their import paths
  change).

---

## 7. Risks / notes

- **Layering**: `@expanse/scoring` must never import `@4eye/*`. The moved types
  were already self-contained, so this holds.
- **Variant brand themes** (`improve` / `win` / `heal` …) are generic enough to
  live in infra; they are UI accent hints, not domain logic. If a stricter split
  is ever wanted, the registry can move to `@4eye` while the engine stays — the
  service layer already supports injecting variants.
- **No back-compat shim** by request: any new code imports `@expanse/scoring`.
