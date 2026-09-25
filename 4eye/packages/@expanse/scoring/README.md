# @expanse/scoring

The **Learn / Earn / Compete** scoring system, packaged as reusable
infrastructure. Turns raw signals into a headline growth score using swappable,
brand-aligned variants — and is structured so the **same contracts power the
frontend (offline) and a future backend service** with no rewrite.

> Infrastructure rule: this package depends on **nothing** in `@4eye/*`.

---

## The model

```
Learn  (headline / growth)
├── Earn     (a.k.a. "Reward")
│   ├── knowledge · entertainment · novelty · bonding · relationship · currency
└── Compete
    ├── rankPercentile · winRate · streak
(+ optional direct `mastery`)
```

Pipeline per component: `raw → normalize([0,1]) → × weight → ×100 → sum`.
Weights are sum-normalized defensively, so any variant yields a clean 0–100.

### Perceived value (the user's perspective)

Alongside the objective Learn score, the package computes **perceived value** —
how worthwhile an experience *felt* to the end user, which can diverge from what
was objectively delivered. Two ideas drive it:

```
Perceived value
├── Felt-quality signals (0–100 each)
│   ├── effort · enjoyment · relevance · progress · recognition · trust
└── Expectation framing
    └── base vs. expectation → delight / disappointment (±20% swing)
```

Value is *reference-dependent*: the same base reads higher when it beats the
user's expectation and lower when it falls short. Compute it with
`computePerceivedValue(input, variant)` or the `usePerceivedValue` hook.

```ts
import { computePerceivedValue, getScoringVariant } from "@expanse/scoring";

const result = computePerceivedValue(
  { signals: { effort: 60, enjoyment: 85, relevance: 80, progress: 75, recognition: 70, trust: 80 }, expectation: 45 },
  getScoringVariant("connection"),
);
// → { perceived, base, expectation, expectationGap, delightFactor, perceivedContributions }
```

---

## Layers (import as subpaths)

| Subpath | Contents | React? |
|---|---|---|
| `@expanse/scoring/model` | Type contracts (`ScoringInput`, `ScoringVariant`, `LearnScoreResult`, `PerceivedValueInput`, `PerceivedValueResult`, …) | no |
| `@expanse/scoring/engine` | `normalize`, `computeScores`, `computeReward/Compete/Mastery`, `computePerceivedValue` | no |
| `@expanse/scoring/variants` | `SCORING_VARIANTS`, `getScoringVariant`, `SCORING_VARIANT_LIST` | no |
| `@expanse/scoring/service` | `ScoringService` port + `localScoringService` + `createRemoteScoringService` | no |
| `@expanse/scoring/react` | `useScoring`, `ScoringProvider`, `useScoreResult`, `usePerceivedValue`, `usePerceivedValueResult` | **yes** (peer) |
| `@expanse/scoring/samples` | Placeholder input fixtures | no |

The root `@expanse/scoring` re-exports all layers.

---

## Frontend usage (offline, default)

```tsx
import { useScoring } from "@expanse/scoring/react";

function ScoreCard({ input }) {
  const result = useScoring(input, "growth"); // pure, memoized, no backend
  return <Bar value={result.learn} />;
}
```

Or compute directly, no React:

```ts
import { computeScores, getScoringVariant } from "@expanse/scoring";

const result = computeScores(input, getScoringVariant("achiever"));
```

---

## Backend-ready service layer

Depend on the `ScoringService` port, not a concrete implementation:

```tsx
import { ScoringProvider } from "@expanse/scoring/react";
// default → localScoringService (in-process engine, fully offline)
<ScoringProvider>
  <App />            {/* useScoreResult() resolves locally */}
</ScoringProvider>
```

When the backend scoring API exists, swap the service — **no call-site changes**:

```tsx
import { createRemoteScoringService } from "@expanse/scoring/service";

const remote = createRemoteScoringService(transport); // transport = your fetch/Apollo wrapper
<ScoringProvider service={remote}>
  <App />
</ScoringProvider>
```

Planned endpoints the remote adapter targets:

```
POST {basePath}/score      body: ScoreRequest   → LearnScoreResult
POST {basePath}/perceived-value  body: PerceivedValueRequest → PerceivedValueResult
GET  {basePath}/variants                          → ScoringVariantSummary[]
```

The NestJS `api` can also import `@expanse/scoring/engine` directly for
server-authoritative compute — the engine is framework-agnostic.

---

## Variants

`balanced` (default) · `growth` (Improve) · `connection` (Heal) ·
`achiever` (Win) · `explorer` (Innovate). Each re-weights the same signals;
the engine never changes. Add one in `variants/registry.ts`.
