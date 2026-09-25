# Plan — yen: review, harden, polish, publish

**Date:** 2026-08-11
**Surface:** `4eye/apps/yen` — port 3400 · `packages/@yen/content` · the mounted `@4eye/web`
**Occasion:** first public release, for feedback
**Research appendix:** `_current/plans/yen-public-launch-briefing.md` (sourced, 2026 practice)
**Supersedes for sequencing:** `yen-release-polish-v2.md` §4 launch order. That plan
optimised for *completeness*. This one optimises for *survivable first contact*.

---

## 0. The judgment, before the detail

yen is not short of work. It is 383 prerendered pages, 520 documents, six product
surfaces, a mounted application and a character model — years of real output, and
most of it is genuinely good.

It has three problems that only appear the moment it becomes public, and none of
them are quality problems:

1. **The privacy model is fail-open.** The docs pipeline is a recursive glob over
   fourteen directories of personal planning repositories. Everything publishes
   unless someone remembered to exclude it. Two of the excludes were added *after*
   something was found. That is a curation habit, not a gate.
2. **Content authored for a private planner is rendering on a public route.** The
   relationship model, the life timeline and the communication intents were
   written as tools for thinking. They read very differently under a stranger's eye.
3. **A stranger cannot tell what this is in five seconds.** The first viewport
   shows an animated headline reading "Future", eight competing destinations, and
   a status banner. It is optimised for someone who already knows.

Everything below is ordered by that: stop the irreversible things first, then make
the site legible, then make it pretty, then publish it carefully.

**The asymmetry that sets the order:** a bad launch is recoverable. Published
private information is not. Search engines cache, archive.org snapshots, people
screenshot. Phase 0 is the only part of this plan that is genuinely urgent.

---

## 1. What was actually checked

Read-only audit across four tracks, each verified against source rather than
inferred:

| Track | Method | Key artifact |
|---|---|---|
| Sensitive information | Full read of `@yen/content`, the character model, both build scripts, git-tracked `public/`, secret-pattern scan | 16 findings, 6 launch-blocking |
| UI / UX | Read of every home-page component, all routes, CSS strategy, a11y, metadata, budgets | 10 highest-value fixes |
| Launch strategy | Web research, 2026 sources, primary docs where they exist | Research appendix |
| Verification | Direct re-check of the four highest-stakes claims | One correction, below |

**Correction made during verification.** The UI audit reported every route
massively over bundle budget (`/page` at 2477 kB against 150). That number came
from `.next/` with no `BUILD_ID` — a **dev build**, whose chunks are unminified.
`check-bundle-size.mjs` reads whatever manifest is present and does not know the
difference. This is not a regression; it is an unguarded measurement. Real budget
state is unknown until a production build runs. Two consequences, both in the plan:
re-measure before drawing conclusions (§4.6), and make the script refuse to grade
a dev build (§4.7).

---

## 2. Phase 0 — the privacy gate (launch blocking)

Nothing else in this plan matters until this phase is closed. Do it first, do it
completely, and do not partially publish while it is open.

### 2.1 The docs pipeline is the largest exposure

`apps/yen/scripts/build-docs-index.mjs` walks fourteen source roots and publishes
**every `.md` file over 80 characters** it finds. Exclusions are per-source lists
of filenames and directory names.

| Surface | Model | Default |
|---|---|---|
| Binary documents | `PUBLIC_BINARIES` allowlist | fail-**closed** ✅ |
| Photos | `ALBUMS` / `LOOSE` allowlist | fail-**closed** ✅ |
| **Markdown — 520 documents** | recursive walk + sparse excludes | fail-**open** ❌ |

The binaries got an allowlist because someone thought about a 180 MB pitch deck.
Markdown never got the same treatment, and markdown is where the writing is.

Sources include `4eyeWebPlan/Hidden/`, `Planning/other_dated_documentation/`,
`Planning/roadmap/` and `ExpanseFrontend/docs/planning/` — years of directories
whose whole purpose was that nobody else would read them. The script's own comments
(L415–424) name shareholder agreements and investor follow-ups as things in those
trees. The excludes cover two filenames and two directory names.

Sampling the committed search index confirms what the model predicts. A non-exhaustive
regex over 520 rows returns 21 hits, including:

| Slug | Title |
|---|---|
| `milestones/global` | *Notes to self* |
| `frontend-planning/message-1-update-plan` | *Reality Reframe — Marriage & Children* |
| `frontend-planning/expanse-edu-financials-migration` | references `FinancialInformationExpanseEDUAndProjections.xlsx` |
| `expanse-edu/equity` | *"I am still figuring out … how much to distribute"* |
| `expanse-edu/investors-advisors-collaborators` | list of potential investors and advisors |

A regex finds the obvious cases. It does not find the sentence in the middle of
page 300 that mentions a former employer's client. **Nobody has read all 520
documents**, and that is the actual finding.

**Fix — invert the default.**

1. Add a `publish: true` requirement. A document ships if its frontmatter opts in,
   *or* its collection is marked `curated: true` **and** its slug is on that
   collection's allowlist. Everything else is skipped and counted.
2. Add global deny patterns that no collection can override: `_private`,
   `Hidden`, `personal`, `finance`, `_redaction`, `Stories`, `PersonStoryline`.
   Belt and braces — the allowlist should already stop these.
3. Print a build summary: `published N · skipped M · newly-seen K`. **Fail the
   build on `newly-seen > 0`** unless `DOCS_ACCEPT_NEW=1`. A document that appears
   in a source directory should never reach the web because someone ran `dev`.
4. Remove `4eyeWebPlan/Hidden` from `SOURCES` outright. A directory named Hidden
   does not belong in a publish pipeline regardless of contents.

This is the single highest-leverage change in the plan. It converts an ongoing
obligation to remember into a mechanism.

### 2.2 Relationship goals — remove before anything is public

`packages/@yen/content/src/character/relationships.ts` L110–114:

```ts
mmGoals: [
  "Prevent Her Revenge. Ensure she's aligned properly for when her butterfly
   wings open — because I'd like to survive personally.",
  "Win Her",
  "Use Her",
  "Dominate",
],
```

This renders. `Relationships.tsx` L232–256 in `@4eye/web` prints an `MM GOALS`
heading and maps the array, with no privacy filter, at `/4eye/appRealm/profile`
and `/4eye/appRealm/character` — both publicly reachable from yen.

The entry is attached to a partner/queen seat tied to a **named real person**
(see 2.3). Published, four words — *Win, Use, Dominate, Revenge* — attached to a
real woman's name is the thing that defines the site. Not the 520 documents, not
the application. That.

There is no framing that fixes it and no privacy tier that makes it safe to ship.
It is a private-planner artifact.

**Fix:** delete the `mmGoals` values from every entry. Keep the field in the type
if the private model still needs it, but add a public filter so the panel cannot
render it, and verify the two routes with the app running.

### 2.3 Real names

| Name | Where | What is said |
|---|---|---|
| **Emiru** | `communication-intents.ts` L49–59 (`privacy: "soft"` → **publishes**) | *"Inference to fish + legitimate remapping. Desired writing/body/goals"*; queen/king framing |
| **Emily Cart** | `relationships.ts` | named partner, gifts, brand takeover |
| **Bonnie** | `communication-intents.ts` | *"Clarify interest and the shape of a real conversation"* |
| **Amelia** | `communication-intents.ts` | correctly held `dark`, excluded by `publicIntents()` — source still in repo |
| **Lulu · Janna · Annie** | `build-photo-manifest.mjs` L49, L69 | album directory names and blurbs |
| **"Redhead Shorty"** | `relationships.ts` | former coworker |

Emiru is a public figure; the others appear to be private individuals. The
research appendix (§4) makes a point worth repeating here: **naming a private
individual carries the higher legal standard, not the lower one** — negligence
rather than actual malice. And truth is a complete defence to defamation but
is *not* a defence to public disclosure of private facts.

Set that aside. The practical version is simpler: none of these people agreed
to appear on a website, and the material is about desire and intent toward them.

**Fix:** no real names of private individuals in public content. Replace with
initials, role labels, or fictional placeholders. `publicIntents()` should filter
`privacy !== "public"` rather than only excluding `dark` — `soft` is currently
shipping. Rename the photo album directories or map them to neutral display
labels in the manifest.

### 2.4 Life timeline

`character/life-timeline.ts` renders through `TimelineArtView` on the public
profile, and includes DID recognition and divorce (L110–111), `MM.Solve(MentalHealth.90%~~)`
(L196–197), `MM.LivesInCar` (L281–282), and `Cyberwarfare / Playing World War 4 IRL`
(L124–125).

This is a different category from 2.2 and 2.3, and deserves a different answer.
Nothing here harms another person, and the arc — including the hard parts — is
arguably the most compelling thing on the site. Personal history told deliberately
is a strength.

But medical history and housing circumstances published as RPG timeline nodes are
not *told*, they are *listed*. The framing does the opposite of what it should:
it makes the hardest facts of a life read as flavour text.

**Fix:** curate rather than delete. Add `publicSafe: boolean` to timeline nodes and
default it false. Opt in the professional and project arc for v1. For the personal
arc, write two or three sentences of prose that say what happened in the author's
own words, and put that on `/about`. That is worth more than thirty nodes, and it
is the version that gets read charitably.

### 2.5 The remaining blockers

| # | Finding | Evidence | Fix |
|---|---|---|---|
| a | `docs-search.json` is **git-tracked** — 85 KB, 520 titles and summaries | `git ls-files apps/yen/public/` | Untrack, gitignore, generate at build. It is a build artifact and it is currently the fastest way to read the whole corpus index without visiting the site |
| b | `dark` privacy rows render, merely labelled | `EngagementLens.tsx` L917–944 — *"Dark rows shown but excluded from soft-public ranking later"* | Filter `dark` out server-side. A row labelled hidden is not hidden |
| c | Photo manifest copies from `~/Projects/Media` at build | `build-photo-manifest.mjs` | Album contents are not under version control and can change between builds. Add a manifest-diff report to the build; review before production |
| d | 115 of 520 published docs contain `href="*.md"` links that 404 | `rg -l 'href="[^"]*\.md"' src/generated/docs` | Rewrite intra-corpus `.md` links to slugs; strip the rest. See §5.2 |

### 2.6 Make the gate real

Checklists decay. Add `pnpm privacy:audit` as a script and a CI step, failing on:

- new documents in any scanned source that are not on an allowlist
- any name from a `FORBIDDEN_NAMES` list appearing in `@yen/content` or generated docs
- secret patterns (`sk-`, `ghp_`, `AKIA`, `Bearer `, `private_key`) anywhere in `public/` or `src/generated/`
- any entry with `privacy !== "public"` reachable from a public route

**Note on secrets, since it deserves saying:** the scan came back clean. No `.env`
files under `apps/yen` or `packages/@yen`, no key patterns, and `next.config.mjs`
exposes exactly one client variable (`NEXT_PUBLIC_4EYE_BASE_PATH`). `FOURUP_ORIGIN`
is correctly server-side. Credential hygiene is not the problem here; personal
information is.

---

## 3. Phase 1 — the trust surface, and what is worth adding

Currently absent, all of it: `/about`, `/contact`, `/privacy`, `/terms`, `/feedback`,
`/changelog`, `robots.ts`, `sitemap.ts`, a favicon, and any Open Graph metadata.
Root metadata is `title: "yen"` and one description.

Every link shared to X, Slack, Discord or iMessage currently unfurls as a bare URL
with no image. For a site whose entire launch mechanism is *people sharing a link*,
this is the cheapest high-value work available.

### 3.1 Ship these

| Route / file | Why it earns its place |
|---|---|
| **`/about`** | The most valuable missing page. Who Matthew is, what this is, why it exists, what state it is in, what he wants from a reader. This is where the personal arc belongs, in prose — see §2.4 |
| **`/contact`** | A public site with no way to reach the author reads as abandoned |
| **`/privacy`** | Required, not optional, the moment there is analytics or a contact form. CalOPPA has no revenue floor; must be linked with the word "Privacy" |
| **`/feedback`** | The site is being published *for feedback*. There is currently nowhere to give it |
| **`/changelog`** or a status page | Turns "unfinished" into "actively built" — the same facts, a completely different read |
| **`LICENSE` + a stated content license** | 520 archive documents with no license is an ambiguity that costs goodwill with exactly this audience |
| **`app/icon.png`, `opengraph-image.tsx`** | Favicon and 1200×630 card. Add `metadataBase`, `openGraph`, `twitter: summary_large_image` |
| **`robots.ts`, `sitemap.ts`** | Sitemap from the app registry + the *curated* doc set only. See §5.1 |

### 3.2 Information worth adding that does not exist yet

Beyond the trust pages, four things came up repeatedly as gaps a reader will feel:

1. **A plain-language "what is this" paragraph** above the animated headline. Not
   the lede — the lede is good but it is written for someone who already has
   context. One sentence a stranger can repeat to someone else.
2. **Provenance on the docs corpus.** "These are working documents written between
   2023 and 2026, imported as-is, not edited for publication." One line, and it
   reframes 520 rough documents from *sloppy* to *archive*. This is the single
   highest-value sentence on the site.
3. **A statement of what feedback is wanted.** "I want to know what confused you"
   gets useful replies; "let me know what you think" gets compliments.
4. **An `apps/yen/README.md`.** There is no developer-facing entry point. What it
   is, how to run it, what the scripts do, what the privacy gate is and why you
   must not bypass it. Especially the last one.

---

## 4. Phase 2 — UI polish, highest value first

Ordered by perceived-quality gain per unit of effort. The first five are worth
more than everything after them combined.

### 4.1 Make the first viewport legible

The `h1` animates to read **"Future"**. The site name appears only in `<title>`.
There is no wordmark anywhere.

Add a visible wordmark and a plain subtitle. Hold the headline static on first
paint and animate on scroll or interaction — the effect is good, it is just
currently spending the one moment where comprehension matters most. Keep the
cypher; move it one beat later.

### 4.2 One primary call to action

`SiteHeader.tsx` L56–115 offers four buttons plus four linked stat tiles: eight
destinations before scroll. The nominal primary — "Watch the site intro" — points
at a placeholder video, so the most prominent action on the site currently does
nothing.

One filled primary. Everything else becomes a text link. Do not make the primary
a placeholder; point it at real content until the recording exists.

### 4.3 Reorder the home page

Current: Header → PathStrip → **ProfilePreview** → SeriesHighlights → Vision → AppGrid.

"Start here · walkthroughs" is the fourth section. The onboarding copy is already
written and it is buried under a section about the author. Move `SeriesHighlights`
above `ProfilePreview`: orient the visitor, *then* introduce yourself.

### 4.4 Persistent navigation

There is no global header on inner pages, no footer anywhere. `PageShell` offers
only "← All applications". Getting from `/docs` to `/videos` requires going home.

A thin top bar in `PageShell` — wordmark · Videos · Docs · Profile · About — is
roughly forty lines and fixes the "every page is an island" feeling site-wide.
A footer carrying the trust links from §3.1 completes it.

### 4.5 `not-found.tsx` and `error.tsx`

Neither exists. A first public release attracts mistyped URLs, and a bare Next 404
on a personal site reads as broken hosting. Custom 404 with links home, to docs,
to videos; an error boundary with retry.

### 4.6 Re-measure the bundles

Run a real production build and `pnpm budget`. The prior numbers are unknown, not
bad — see §1. Only after that is there anything to fix.

### 4.7 Then the consistency work

| Item | Evidence | Fix |
|---|---|---|
| Three parallel CSS systems | MUI `sx`, plain CSS (`docs.css`, `home.css`), and inline objects — 32 in `SeriesHighlights.tsx`, 36 in `social/page.tsx`, 20 in `VisionGoalsBand.tsx` | Extract `.yen-band` / `.yen-card` / `.yen-eyebrow` on theme CSS variables |
| Hardcoded stone palette | `#e7e5e4`, `#1c1917`, `#78716c` bypass the theme in the home middle bands and all of `docs.css` | Move to tokens. Half the home page currently cannot support dark mode |
| Four typography scales | h1 is 34–56px in the hero, 42px in docs, 32–44px in `PageShell`, 34px inline on social | One scale |
| Three card implementations | AppGrid (MUI), Series (inline), Docs (CSS) — same "card with accent edge" pattern | One component |
| Duplicate `h1` on `/social` | `PageShell.tsx` L77–88 plus `social/page.tsx` L71–72 | Demote to `h2`; audit `/vision` and `/live` for the same |
| Empty `alt` on meaningful images | `ProfilePreview.tsx` L516, `docs/[...slug]/page.tsx` L118, `EquipmentBoard.tsx` L71 | Real alt text |
| Cypher headline is click-only | `CypherHeadline.tsx` L114–124 — `onClick` on a `Typography`, no `tabIndex` or key handler | Keyboard accessible, or move to a button |
| No skip link, no focus rings on inline home links | — | Add both |
| Compass hidden below laptop | `SiteHeader.tsx` L76 | Mobile loses the main wayfinding device; needs at least a static fallback |

`prefers-reduced-motion` is already handled in `CypherHeadline`, `CrownStage`,
`CompassInner` and `EvolveStagePlayer`. That is good work and needs no change.

---

## 5. Phase 3 — the documentation corpus

520 documents against roughly 15 real routes is a 35:1 ratio. Left alone, the
archive becomes what the domain is *about* — to search engines and to readers.

### 5.1 Noindex the bulk, promote a curated set

- `noindex` on the corpus by default; hand-pick 10–20 documents that are genuinely
  good and index those as real content.
- Do **not** use `robots.txt` for this. Google does not support `noindex` there,
  and a blocked page cannot be crawled to see the tag. Meta tag, not robots.
- Do **not** mass-delete. Google names sudden large deletions as a signal in its
  own right, and the archive has real value.
- Sitemap lists curated documents only.

### 5.2 Fix the 22% broken-link rate

115 of 520 documents link to `*.md` paths that 404 on the web. This is the most
visible "dumped, not published" signal in the corpus and it is mechanical to fix:
rewrite intra-corpus links to slugs during the build, strip the rest to plain text,
and report the count.

### 5.3 Frame the archive honestly

The staleness banners already exist and the wording in `yen-unified-release.md` §6
is right — *"Later work has improved on this, but details here are still worth
reading."* What is missing is the corpus-level statement from §3.2(2). Add it to
`/docs` and to every article header.

### 5.4 Article reading chrome

The index page is strong: search, topic filter, score bands, age bands, curated
highlights. The article page drops all of it — no rail, no search, no table of
contents, no prev/next. A reader who clicks into document 300 of 520 has no way
onward except the back button.

Add a slim `DocsFindNav`, a generated table of contents from the prerendered
headings, and prev/next within the collection.

---

## 6. Phase 4 — how to actually publish it

Full reasoning and sources in the research appendix. The short version:

| Phase | What | Gate to the next |
|---|---|---|
| **0 · Harden** | §2 complete, §3 shipped, §4.1–4.5 done | `pnpm privacy:audit` green; production build within budget; a stranger can state what the site is |
| **1 · Watch five people** | 5–8 moderated sessions, screen shared, you silent | No two people get lost in the same place |
| **2 · Quiet public** | Live and indexed, unpromoted. Direct outreach to 20–40 people by name | Two weeks with no correction needed |
| **3 · Community** | Staggered: X, then r/SideProject, then Indie Hackers | — |
| **4 · Show HN** | The **mounted application only**, with yen as context | Runs with no signup, and you are free for four uninterrupted hours |

Three findings worth pulling forward:

- **HN's own Show HN rules disqualify most of yen.** "Off topic: blog posts,
  sign-up pages, newsletters, lists, and other reading material." The docs, the
  profile, the media library and the landing page are all reading material. The
  application is the only eligible artifact. And HN threads are permanently
  indexed against your name — a weak Show HN is not a neutral outcome.
- **Skip Product Hunt for v1.** No single product to hunt, and the honest 2026
  numbers do not justify the effort.
- **Moderated sessions beat a feedback widget by a wide margin.** Widgets get
  0.1–2% of sessions and the responses are self-selected. Five people watched in
  silence will surface most of what is wrong.

**Feedback capture:** a `/feedback` route asking two specific questions — *what
were you looking for?* and *where did you get stuck?* — plus an email address.
Cookieless analytics only (Plausible or Fathom); no session recording, no GA4.
Session recording requires opt-in consent in the EU/UK and buys little here.
The site currently has zero tracking, which is a clean position worth keeping.

---

## 7. Held for v2

Naming these matters as much as the plan — the failure mode for this release is
that it never ships.

- Un-noindexing the bulk corpus
- Weaker product showcases (ship the best two or three)
- Session recording, email capture, Product Hunt
- Mounting 4up as a zone (`FOURUP_ORIGIN` stays unset; `/4up` degrades to yen's own page)
- The animated integration panels
- Dark mode for docs
- The orphaned `/4eye/sample` route — delete or link, do not leave floating

---

## 8. Release gate

```
pnpm privacy:audit           → green, zero newly-seen documents
pnpm build                   → production, BUILD_ID present
pnpm budget                  → all routes within budget (real numbers)
pnpm typecheck               → strict, clean
```

Manual, in a real browser:

- `/4eye/appRealm/profile` and `/4eye/appRealm/character` — no `MM GOALS`, no dark rows, no real names
- Shared link to Slack and X renders a card with an image
- 404 on a nonsense URL returns the custom page
- Home first viewport on a phone: wordmark, one sentence, one button
- `/docs` article 300 — can you get anywhere from here
- `rg -c 'href="[^"]*\.md"' src/generated/docs` → 0

---

## 9. Decisions needed before Phase 0 can close

1. **`mmGoals`** — deleted, or retained in a private-only model? Recommendation:
   delete the values. The field can stay.
2. **Real names** — confirm every private individual is replaced. Emiru is a
   public figure, which changes the legal analysis but not the judgment.
3. **Life timeline** — which nodes are `publicSafe`? Recommendation: professional
   and project arc yes, medical and housing no, replaced by prose on `/about`.
4. **The docs allowlist** — 520 down to what? Recommendation: start at zero and
   opt in by collection, beginning with `expanse-edu`, `technical`, `roadmap`
   and `web4`, which are product documentation rather than personal planning.
5. **Content license** — all rights reserved, or CC BY for the archive?
6. **Donate page testimony section** — keep as written, or soften for v1? The
   earlier decision to cut the conditional-demand framing was right, and the
   reasoning in `yen-unified-release.md` §10 still holds.

---

## 10. Reversible quick wins — the first sitting

Everything in this section is revertible with `git revert`. **No source data is
deleted and no content is rewritten.** The privacy items add filters at the render
boundary, so the private model in `@yen/content` stays exactly as authored — the
public surface simply stops reading from it. That is the property that makes these
safe to do before the §9 decisions are made.

Ordered so that if the sitting gets cut short, the most valuable work is done.

### Wave 1 — close the exposures (gate, don't delete)

| # | Change | File | Reversibility |
|---|---|---|---|
| 1 | Filter `mmGoals` out of the public render | `Relationships.tsx` L232 — wrap the block in a `publicSafe` check | Data untouched; flip one flag to restore |
| 2 | `publicIntents()` returns `privacy === "public"` only | `communication-intents.ts` — currently excludes `dark` but ships `soft`, which is how Emiru and Bonnie publish | One predicate |
| 3 | Filter `dark` rows server-side | `EngagementLens.tsx` L917–944 — they currently render, merely labelled hidden | One filter |
| 4 | Drop `4eyeWebPlan/Hidden` from `SOURCES` | `build-docs-index.mjs` L123 | Delete one array entry to restore |
| 5 | Untrack `docs-search.json`, gitignore it | `apps/yen/public/` — 85 KB, 520 titles + summaries, currently in git | It is a build artifact; regenerates on `pnpm docs` |

Wave 1 does **not** close Phase 0. The docs pipeline is still fail-open and the
520 documents are still unread — that is §2.1 and it is real work. What Wave 1 does
is stop the four things that are exposed *right now* through no decision of anyone's.

### Wave 2 — the trust surface (pure additions)

Nothing here modifies existing behaviour; each is a new file.

| # | Change | File |
|---|---|---|
| 6 | `metadataBase`, `openGraph`, `twitter: summary_large_image`, title template `%s — yen` | `app/layout.tsx` |
| 7 | Favicon + 1200×630 social card | `app/icon.png`, `app/opengraph-image.tsx` |
| 8 | Custom 404 with links home / docs / videos | `app/not-found.tsx` |
| 9 | Error boundary with retry | `app/error.tsx` |
| 10 | `robots.ts` + `sitemap.ts` from the app registry (docs excluded until curated) | `app/robots.ts`, `app/sitemap.ts` |

Item 6 alone changes every link anyone shares from a bare URL into a card. For a
launch whose whole mechanism is people sharing a link, it is the highest
value-per-line change in the plan.

### Wave 3 — visible polish

| # | Change | Evidence |
|---|---|---|
| 11 | Reorder home: `SeriesHighlights` above `ProfilePreview` | `page.tsx` L16–31 — two lines swapped; "Start here" stops being the fourth section |
| 12 | Wordmark + one plain sentence above the animated `h1` | `SiteHeader.tsx` / `CypherHeadline.tsx` — the site name currently appears only in `<title>` |
| 13 | Hold the cypher static on first paint, animate after | `CypherHeadline.tsx` L121–160 — keeps the effect, stops it costing the comprehension moment |
| 14 | Demote the duplicate `h1` on `/social` to `h2` | `social/page.tsx` L71–72 against `PageShell.tsx` L77–88 |
| 15 | Real `alt` text on three images | `ProfilePreview.tsx` L516, `docs/[...slug]/page.tsx` L118, `EquipmentBoard.tsx` L71 |
| 16 | Skip link to `#main` | `app/layout.tsx` |
| 17 | Keyboard access on the cypher headline | `CypherHeadline.tsx` L114–124 — `onClick` on a `Typography` with no `tabIndex` |

### Wave 4 — mechanical corpus + tooling

| # | Change | Why |
|---|---|---|
| 18 | Rewrite intra-corpus `.md` links to slugs; strip the rest | 115 of 520 published docs currently contain links that 404 — a 22% broken-link rate, and the most visible "dumped, not published" signal |
| 19 | One-line corpus provenance note on `/docs` and every article header | "Working documents written 2023–2026, imported as-is, not edited for publication." Reframes rough documents from sloppy to archive |
| 20 | `check-bundle-size.mjs` exits with a warning if `.next/BUILD_ID` is absent | It currently grades dev builds as if they were production — the source of the false 2477 kB reading in §1 |

### Explicitly not in this sitting

These are the irreversible or decision-dependent ones. They wait for §9.

- Deleting or rewriting any `@yen/content` values, including `mmGoals` (Wave 1 #1
  gates it; deletion is a separate call)
- Replacing real names with placeholders — needs the §9.2 decision
- Curating the 520-document allowlist — needs the §9.4 decision
- `publicSafe` on life-timeline nodes and the `/about` prose — needs §9.3
- Rewriting the hero CTA structure beyond the wordmark (§4.2 changes what the
  primary action *is*, which is a content decision)

### What the sitting found — a gate at the render is not a gate

Wave 1 was written as "add filters at the render boundary, so the private model
stays exactly as authored and the public surface simply stops reading from it."
That was implemented, and then verified against the built output:

```
rg -F "Use Her" .next/server .next/static     → 2 hits
rg -F "Prevent Her Revenge" .next/…           → 2 hits
rg -F "fishing construct" .next/…             → 2 hits
```

**The filters worked and the data shipped anyway.** `relationships.ts` and
`communication-intents.ts` are imported by client components, so the whole seed
array is serialised into the JavaScript every visitor downloads. By the time
`SHOW_PRIVATE_ANNOTATIONS` or `publicIntents()` is evaluated, the strings have
already crossed to the browser. A conditional in a component decides what is
*painted*; it has no bearing on what is *sent*. `view-source` does not care what
the component decided.

This is worth stating plainly because it is the same mistake the codebase had
already made twice, in different words: `EngagementLens` rendered dark rows with
a label saying they were hidden, and the docs pipeline relied on remembering to
exclude. In all three cases the mechanism described a policy instead of
enforcing one.

**The fix that actually holds:** move the values into modules with no importers
— `relationships.private.ts` and `communication-intents.private.ts`. Nothing in
the bundle graph references them, so nothing about them can reach a browser.
Values are unchanged and unreworded; this is a move, reversed by adding one
import. Verified after a clean rebuild:

| String | Before | After |
|---|---|---|
| `Use Her`, `Dominate`, `Prevent Her Revenge` | present | **0** |
| `fishing construct`, `butterfly wings` | present | **0** |
| `Bonnie`, `Amelia` | present | **0** |
| `remapping notes` (dark KB row) | present | **0** |

**The generalisation, for the rest of Phase 0:** anything that must not be
public cannot live in a module the client bundle imports, no matter what guards
it. That applies to the life timeline (§2.4) and to the profiles seed below.

### Still shipping — needs the §9.2 decision

The names themselves remain, because removing them is the decision that was
explicitly held back:

| String in the built output | Count | Source |
|---|---|---|
| `Emily Cart` | 13 | `relationships.ts` `name`, `equipment.ts` item lore, profiles seed |
| `Emiru` | 7 | profiles seed, profile ids |
| `Redhead Shorty` | 5 | `relationships.ts` `name`, profiles seed |

Larger than the audit reported: `4eye-web-mockup/src/Tiles/profiles/store/seed-data.ts`
carries **four complete `Profile` objects for real people** — Emily Cart (L324),
Redhead Shorty (L451), xEmoCat (L510), Emiru (L574) — each ~130 lines, each
selectable in the profile switcher, and at least one carrying a physical
description of a former coworker (L471). That is a bigger surface than the
relationship annotations were, and deleting four profiles changes a shipped
feature rather than hiding a field, so it was left alone.

### Landed in this sitting

All twenty items, plus two pre-existing breaks found by verifying:

- **`pnpm build` was broken.** `@expanse/hud/…/HudStateProvider.tsx` uses
  `createContext` and `useReducer` with no `"use client"`, unlike all five
  sibling providers in the same directory. Fixed — one directive, one right
  answer. This is why no real bundle numbers existed: the build could not reach
  the budget check.
- **Real budget numbers, for the first time.** Seven routes over: `/page` 215.4
  against 150, `/videos` 200.9/200, `/social` 165.9/140, `/vision` 164.5/140,
  `/photos` 161.7/140, `/integration-layer` 157.9/150, `/apps/sample-privacy`
  153.3/140. Three of those were never touched in this sitting, so the overage
  is accumulated weight now visible rather than anything introduced here. Home
  is the largest gap and the place to look first. **Do not raise the budgets
  before investigating** — that converts the one working regression detector
  into decoration.
- **Not fixed, deliberately:** `@4eye/icons` exports two different
  `CommunicationIcon` glyphs (`lenses.tsx:116` and `attributes.tsx:180`), which
  fails `pnpm typecheck`. Choosing a winner silently swaps an icon somewhere,
  so it wants a decision rather than a guess.
- Docs rebuild: **342 links repointed, 94 unwrapped across 116 documents**;
  `rg 'href="[^"]*\.md"'` now returns zero. Corpus is 517 documents after
  dropping `Hidden`.

### Verification after the sitting

```
pnpm build                   → production, BUILD_ID present
pnpm budget                  → real numbers for the first time
pnpm typecheck               → strict, clean
rg -c 'href="[^"]*\.md"' src/generated/docs   → 0
git ls-files apps/yen/public/docs-search.json → empty
```

In a browser: open a relationship card on `/4eye/appRealm/character` — no `MM GOALS`
section. Paste the site URL into Slack — a card with an image. Hit a nonsense URL —
the custom 404.
