# yen — public launch briefing (research + strategy)

Prepared: Aug 2026. Research current as of Aug 2026. **Not legal advice; I am not a lawyer.**

---

## 0. What I checked in the repo (so the recommendations are concrete)

- Routes present in `apps/yen/src/app`: `4eye`, `4eye-extension`, `4up`, `apps`, `concepts`, `docs`, `donate`, `equipment`, `live`, `photos`, `posts`, `social`, `surfaces`, `videos`, `vision`.
- **Missing entirely**: `/about`, `/contact`, `/privacy`, `/terms`, `/feedback`, `/changelog`, `robots.ts`, `sitemap.ts`, RSS.
- Root `metadata` in `layout.tsx` is `title: "yen"` + one description. **No `metadataBase`, no `openGraph`, no `twitter` card.** Every link shared to X/Slack/Discord/iMessage will unfurl as a bare URL with no image.
- Docs corpus: **520 pre-rendered HTML files** in `src/generated/docs`, plus a `docs-index.json` that already carries `source`, freshness-in-words, and a score band. That index is a real asset — it's most of a curation layer already.
- **116 of 520 docs contain `href="....md"` links** that resolve to nothing on the web. That's a 22% broken-link rate, and it's the single most visible "this was dumped, not published" signal.
- No analytics/tracking of any kind currently installed (grepped for Plausible, PostHog, GA, Fathom, Hotjar, Clarity, Umami — zero hits). This is a clean starting position and worth protecting.
- `/donate` exists. That matters legally (see §4, §5): it makes the "is this a commercial website" question easy to answer *yes*.

---

# PART 1 — RESEARCH BRIEFING

## 1. Launching a large personal site publicly for feedback

### The consensus that actually holds up

**The single-day "big bang" launch is no longer the default, and for a first-ever public release it's actively the wrong shape.** Indie playbooks now describe launch as a ~30-day window rather than a day, with staged channel drops rather than simultaneous ones ([buildinpublic.so launch playbook](https://www.buildinpublic.so/blog/launch)). The mainstream framing is: soft launch when you're still validating; hard launch only when demand is already proven and you have resources to sustain momentum ([SaaSify](https://saasify.sh/should-you-soft-launch-or-go-big-choosing-the-right-strategy-for-your-micro-saas/)). yen is squarely in the first bucket.

> ⚠️ **Skepticism flag.** Most 2025–2026 "launch playbook" articles are themselves SEO content marketing for launch-adjacent tools, and their numbers ("50–150 trial signups", "3.1% vs 23.1% conversion", "89% of PH founders wouldn't launch again") trace back to vendor blogs or unverifiable studies. Treat the *directional* advice as sound and the *numbers* as marketing. The primary sources below are the ones worth trusting.

### Show HN — the only primary source that matters

HN's own [Show HN guidelines](https://news.ycombinator.com/showhn.html) are short and disqualifying in ways people miss:

- On topic: "things people can run on their computers or hold in their hands." **Off topic: "blog posts, sign-up pages, newsletters, lists, and other reading material. Those can't be tried out, so can't be Show HNs."**
- "The project should be non-trivial. Don't post quickly-generated one-offs; anybody can do that now. **Share something that is deeply personal and interesting to you. Explain how and why.**"
- "Please make it easy for users to try your thing out, ideally without barriers such as signups or emails."
- "Please don't ask friends to upvote or comment."

**Read against yen, this is decisive:** the docs corpus, the character sheet, the media library, and the landing page are all *reading material* — off topic for Show HN. **The mounted interactive application is the only Show HN-eligible artifact on the site.** If yen goes to HN, it should go as the app, with yen as the surrounding context, not as "here is my personal site."

Secondary guides converge on the operational details, and they're consistent enough to trust: post Tue–Thu US morning; post your own first comment immediately with the backstory and the hard parts; be present and replying for the first 2–4 hours; expect the thread to be permanent ([Okara](https://okara.ai/blog/how-to-launch-on-hacker-news), [Favors.dev](https://favors.dev/blog/show-hn-launch-guide), [DEV](https://dev.to/iris1031/how-to-launch-on-hacker-news-the-show-hn-guide-real-data-461e)). The last point is the one to internalize: **HN comments are indexed and permanent.** A rough Show HN of a not-quite-ready site becomes a durable first-page search result for your name.

### Reddit

Reddit's site-wide norm is the 10% rule — no more than ~1 in 10 of your posts/comments should be self-promotional — and subreddit moderators check account history. r/SideProject explicitly allows self-promotion but requires you to **show the real thing, not a waitlist or email gate**; r/startups is far stricter ([r/SideProject rules summary](https://www.mediafa.st/subreddit/sideproject), [GoGlobal](https://www.goglobal.to/resources/marketing-on-r-sideproject-2026)). One widely-circulated (self-reported, unverified) analysis claims the dominant removal trigger is *asking for something in the first three sentences* — "would love your feedback, check it out" ([Indie Hackers](https://www.indiehackers.com/post/analyzed-500-reddit-posts-that-got-banned-73-failed-for-the-same-reason-and-it-s-not-what-you-think-Y5JloVysPICuN2rOliIT)). Whether or not the exact mechanism is right, the reformulation is free: lead with the story or the lesson, mention the link at the end.

### Product Hunt

The honest 2026 read: **not the first move.** The audience shifted toward curious browsers rather than buyers; the featured rate collapsed after the Jan 2024 algorithm change; and real self-reported outcomes are modest (3rd place of the day → 1,305 visitors, 210 signups, $543 — [Indie Hackers](https://www.indiehackers.com/post/i-placed-3rd-on-product-hunt-and-earned-543-f64ccd556e)). The recommendation across sources is to hold PH until you have testimonials and a specific product to point at ([PH launch guide](https://www.buildinpublic.so/blog/product-hunt-launch-guide), [DEV](https://dev.to/indiehackerksa/why-product-hunt-no-longer-works-for-indie-founders-aom)). **yen has no single product to hunt.** Skip PH entirely for v1.

### What typically goes wrong

1. **Launching reading material into channels that want runnable things.** Guaranteed off-topic flag on HN, guaranteed indifference elsewhere.
2. **Not being present.** Every source agrees: posting and then disappearing for four hours kills the thread and wastes the one shot.
3. **Shipping before it survives contact with strangers.** HN and Reddit both punish this, and the record is permanent.
4. **Asking "what do you think?"** — see §2. This produces compliments, not information.
5. **Delaying forever.** The counter-risk is real: most pre-launch delay is procrastination rationalized as preparation. The gate criteria in Part 2 exist to make "ready" falsifiable rather than a feeling.

---

## 2. Collecting useful feedback at launch

### Expect far less than you think

Published 2025–2026 benchmarks, with the caveat that most come from survey vendors:

| Mechanism | Typical response rate |
|---|---|
| Always-on feedback widget | 0.1–2% of sessions ([Feeqd](https://feeqd.com/blog/feedback-widget-vs-survey)); one vendor dataset puts widget *surveys* at 7.6% median ([TruRating, citing Survicate n=3,095](https://trurating.com/blog/response-rate-for-customer-satisfaction-surveys/)) |
| Exit-intent prompt | 3–8% |
| Scroll/mid-session trigger | 5–12% |
| Post-action prompt (after a real action) | 15–25% |
| General website survey | 5–15% ([SurveyMonkey](https://www.surveymonkey.com/learn/customer-feedback/website-feedback-survey/)) |

**Concretely: 1,000 launch-day visitors with a good widget yields roughly 5–20 submissions, most of them one line long.** Plan for that number, not for a spreadsheet of insight.

### The quality problem is bigger than the volume problem

Two well-established results should shape the design:

- **Self-selected feedback is not a sample.** People who click a feedback button are the ones with something to say — great for surfacing broken things, useless for "is this working overall" ([Retently](https://www.retently.com/blog/feedback-button-vs-popup-survey/)). Do not read widget sentiment as a verdict on yen.
- **Asking people to evaluate your idea produces polite lies.** *The Mom Test*'s three rules: talk about their life not your idea; ask about specifics in the past, not hypotheticals about the future; talk less and listen more ([full text](https://inkubator.si/wp-content/uploads/2020/05/The-Mom-Test-by-@robfitz.pdf)). "Would you use this?" is worthless; "tell me about the last time you looked for something like this and what you did" is gold. This applies with full force to friends-and-family review, which is the phase most likely to generate false confidence.

**Corollary that matters a lot here:** the highest-value feedback for yen will not come from a widget. It will come from **5–8 moderated sessions where you watch someone use the site and say nothing.** Nielsen's result — 5 users surface ~85% of usability issues in qualitative testing, and 3 small tests beat 1 big one — is the relevant one, and it is specifically a *qualitative* claim, not a statistical one ([NN/g](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/), [NN/g on the qual/quant distinction](https://www.nngroup.com/articles/5-test-users-qual-quant/)).

### What to actually build

1. **One `/feedback` route** — a real page with a real form, linkable from anywhere, no JS widget required, works if someone emails you the URL. This is the durable asset.
2. **One persistent, unobtrusive entry point** in the footer and in the docs shell. Not a modal, not an exit-intent popup on a personal site — those read as desperate on a portfolio.
3. **Three questions, max, and make the first one open.** The highest-signal set for a site whose problem is *legibility*:
   - "What did you think this site was, before you clicked around?"
   - "What were you looking for, and did you find it?"
   - "What made you stop reading?"
   These are past-tense and behavioral — Mom Test compliant. Skip NPS; it's meaningless at n=12 and reads as corporate.
4. **A visible "who I want feedback from and about what"** paragraph. Framing the ask narrows the response and raises quality far more than any widget tuning.

### Privacy implications of the measurement stack

This is where the choice of tool has legal consequences, and the split is clean:

**Session recording (Hotjar, Microsoft Clarity, FullStory) requires opt-in consent in the EU/UK/EEA/CH.** It is not "strictly necessary," and ePrivacy Art. 5(3) consent operates independently of GDPR's legal bases — **there is no legitimate-interest exception for placing the cookies** ([analysis](https://kukie.io/blog/hotjar-cookie-consent-privacy), [Flow](https://www.flowconsent.com/en/blog/hotjar-cookies-gdpr-compliance)). Microsoft now enforces this itself: **since 31 Oct 2025, Clarity runs in a degraded "no-consent mode" for EEA/UK/CH visitors unless your site sends a valid consent signal** ([Clarity consent mode](https://kukie.io/blog/microsoft-clarity-consent-mode-setup)). Using session replay therefore means: a consent management platform, a cookie banner, a DPA with the vendor, aggressive input masking, and disclosure in your privacy policy.

**Cookieless analytics (Plausible, Fathom, Pirsch, Simple Analytics) most likely requires no banner.** These store nothing on the device, so the argument is that Art. 5(3) is never triggered at all; an independent legal assessment commissioned by Plausible concludes exactly that ([assessment](https://plausible.io/blog/legal-assessment-gdpr-eprivacy)), and a survey of DPA positions finds **no EU DPA taking the position that cookieless analytics needs a banner** ([web-tracking.eu](https://web-tracking.eu/blog/analytics-without-consent-banner-dpa-positions)).

> ⚠️ **Conflict, flagged honestly.** There is a well-argued minority position that Art. 5(3) covers *any* "gaining access to information already stored" on the device — including reading the User-Agent — citing the WP29 fingerprinting opinion, which would mean even cookieless tools need consent ([Plausible GitHub discussion #1963](https://github.com/plausible/analytics/discussions/1963)). No regulator has enforced this reading against a cookieless analytics tool. **Practical call: the residual risk to a solo US publisher is very low, and much lower than the risk of shipping session replay without a CMP.**

**Recommendation: cookieless analytics only for v1. No session recording. No Google Analytics.** GA4 unambiguously needs a banner, a consent flow, and a DPA. Given yen's audience skews privacy-aware (HN, AI builders), a "no cookies, no tracking, here's the aggregate dashboard" stance is a *feature*, not a compromise — and it removes an entire compliance surface you'd otherwise have to maintain alone.

---

## 3. Publishing a large auto-generated documentation corpus

### How mature docs sites handle stale content

The pattern is remarkably consistent across Docusaurus, GitLab, and the docs-tooling literature:

- **A banner on every non-current page**, stating support status and linking to the current version. Docusaurus builds this in as `banner: 'unmaintained' | 'unreleased' | 'none'` ([Docusaurus versioning](https://docusaurus.io/docs/versioning)). "A legacy page without a warning banner is one of the most expensive documentation mistakes because it appears trustworthy" ([versioning guide](https://faqpages.com/versioning-documentation-guide)).
- **Explicit status in the title**, not just metadata — GitLab appends `(deprecated)` then `(removed)` to page titles and keeps the marker for a fixed window before deletion ([GitLab styleguide](https://docs.gitlab.com/development/documentation/styleguide/deprecations_and_removals/)).
- **Archived content removed from primary navigation**, kept reachable, and demoted or excluded from search.
- **Keep the number of live versions small** — Docusaurus suggests under 10, and points archived versions at immutable build snapshots rather than rebuilding them.
- **Redirect removed pages to something with real context**, never to the homepage.

**Applied to yen:** the corpus isn't versioned software docs — it's a personal archive. The honest framing is *archive*, not *documentation*. Every page needs a header that says, in plain language: **what this is, when it was written, what repository it came from, and that it describes plans rather than shipped software.** `docs-index.json` already carries `source` and a freshness field, so the data to render this exists.

### The SEO risk — real, but not the one people fear

Google's [spam policies](https://developers.google.com/search/docs/essentials/spam-policies) define **scaled content abuse** as "many pages generated for the primary purpose of manipulating search rankings and not helping users… **no matter how it's created**." The controlling question is intent, and Google's [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) makes it the "Why": content made primarily to help people is fine; content made primarily to attract search visits is not.

**yen's docs were written for the author, not for Google. That is a strong defense against a spam action.** A manual penalty is unlikely.

The realistic risks are subtler and more relevant:

1. **Quality-signal dilution.** Google's helpful-content questions are explicitly *site-level* as well as page-level — "is the content mass-produced… so that individual pages don't get as much attention or care?", "does it appear sloppy or hastily produced?", "does the content have any spelling or stylistic issues?" 520 unedited planning documents with a 22% broken-link rate answer those questions badly, and that assessment attaches to the whole domain.
2. **Index bloat.** If 520 archive pages get indexed alongside ~15 pages you actually care about, the ratio of low-value to valuable indexed URLs is 35:1, and the low-value pages become what the domain is "about" ([index bloat overview](https://patrickstox.com/technical-seo/how-search-works/indexing/index-bloat/)).
3. **First impressions.** More concretely than any of the above: someone searching your name lands on `yen.../docs/frontend-planning__compliance` instead of the home page.

Site reputation abuse is **not** relevant here — it requires publishing *third-party* content to exploit a host's ranking signals, and it's enforced by manual action only ([Google, Nov 2024](https://developers.google.cn/search/blog/2024/11/site-reputation-abuse), [Search Engine Land](https://searchengineland.com/google-site-reputation-abuse-policy-publishers-453251)). Everything on yen is first-party.

### Mitigation, in priority order

1. **`noindex` the entire docs corpus at v1.** Meta tag or `X-Robots-Tag` header. Then hand-pick ~10–20 genuinely good documents and remove the `noindex` from those individually. This inverts the default from "publish everything, prune later" to "publish what's good."
2. **Do NOT block them in `robots.txt`.** Google does not support `noindex` in robots.txt, and a robots-blocked page can't be crawled, so the `noindex` is never seen and the URL can linger in the index anyway ([Google: block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)). Keep them crawlable, keep them noindexed.
3. **Curate the sitemap.** Ship a `sitemap.ts` containing only the pages you want ranked — the ~15 real routes plus the curated docs. Never auto-generate it from the file tree.
4. **Fix the 116 broken `.md` links** — rewrite to internal doc routes where a target exists, strip the link where it doesn't. This is a mechanical script and it's the highest visible-quality-per-hour fix on the whole site.
5. **Search must be scoped.** `docs-search.json` is already there; make sure archive results are visually distinguished from live-product docs.
6. **Don't mass-delete.** Google explicitly lists "removing a lot of older content primarily because you believe it will help your search rankings" as a warning sign. Noindex + curate; don't purge.

> ⚠️ **Conflict, flagged.** SEO blogs routinely claim noindexing saves crawl budget. Google's own documentation says the opposite — Googlebot must crawl a page to see the `noindex`, so it saves no crawl at all. Crawl budget is also a non-issue below a few thousand URLs. **Use `noindex` for index quality, not for crawl efficiency**, and ignore crawl-budget advice entirely at this scale.

---

## 4. Legal and reputational hygiene

**I am not a lawyer. This is orientation, not advice.** If any specific passage names a real person in a way that could hurt them, that passage is worth a one-hour consult, not a web search.

### Defamation — the actual elements

A US libel plaintiff generally must show: a **false statement of fact**, that was **published**, about an **identifiable person**, causing **actual harm**, made with **fault** ([Authors Guild](https://authorsguild.org/resource/writing-about-real-people-libel-defamation-rights-of-privacy-and-publicity/), [media law basics for bloggers](https://www.andydehnart.com/blog/media-law-basics-for-bloggers-newsletter-writers/)).

Practical consequences:

- **Truth is an absolute defense.** Substantially true statements cannot be libel.
- **The fault standard is lower for private individuals** — negligence, meaning you knew or should have known it was false — versus *actual malice* for public figures. **Naming a private individual is the higher-risk case, not the lower one.** This is the opposite of most people's intuition.
- **Opinion is protected, but the label isn't magic.** "Most defamation lawsuits are won or lost on whether the challenged statement is fact or opinion" ([CSH Law](https://www.cshlaw.com/resources/opinion-or-false-statement-of-fact-why-this-distinction-often-decides-defamation-cases/)). Prefacing with "I think" does not protect a statement whose core is a verifiable falsehood ([Justia](https://www.justia.com/injury/defamation/online-defamation-and-social-media/)). Statements about someone's *conduct* read as factual; statements about their character read as opinion.
- **Opinions grounded in disclosed facts are much safer** than opinions that imply you know undisclosed damaging facts.
- **Section 230 does not protect your own writing.** It protects you from liability for what *others* post. Everything on yen is yours.
- **Anti-SLAPP statutes** exist in many states and can allow early dismissal plus fee recovery for speech on matters of public concern. Coverage varies by state; don't count on it.

### Right of publicity — mostly not your problem

Right of publicity protects against **commercial** appropriation of name/likeness — advertising, endorsement, merchandise. There's no federal statute; it's a state patchwork, with ~30 states having statutes and the rest common law ([INTA](https://www.inta.org/topics/right-of-publicity/), [Venable](https://www.venable.com/insights/publications/ip-quick-bytes/the-right-of-publicity-2025)). Newsworthiness, artistic/creative expression, and consent are recognized defenses.

**Writing about someone in a personal narrative is not a right-of-publicity problem.** It *becomes* one if you imply endorsement — e.g. logos or names of people/companies presented as backers on a page that also solicits money. **`/donate` makes this worth one careful pass.**

### The claims more likely to bite than defamation

- **Public disclosure of private facts** — publishing true but private information that a reasonable person would find highly offensive and that isn't of legitimate public concern. Note that this is a claim where **truth is not a defense**. If someone else disclosed the fact publicly themselves, the expectation of privacy is largely gone.
- **False light** — portraying someone in a highly offensive misleading way, even without a strictly false statement.
- **Confidentiality obligations.** 520 documents auto-imported from years of private planning repositories were written with no expectation of publication. They may contain former employers' business information, NDA-covered material, other people's health/financial/relationship details, contact information, or credentials. **This is the highest-probability concrete problem on the entire site, and it is not a legal-theory problem — it's an audit problem.**

### Practical checklist before publishing the corpus

- [ ] Automated scan of all 520 docs for: full names, `@` handles, email addresses, phone numbers, employer names, dollar amounts tied to named people, and words like "confidential"/"NDA"/"internal only".
- [ ] Manual review of every hit. Default to **initials, role descriptions, or removal** — "a former collaborator" costs you nothing narratively.
- [ ] Anywhere you make a claim about another person's *conduct*, either (a) verify it, (b) rewrite it as disclosed-facts-plus-opinion, or (c) cut it. Statements about your own experience and feelings are near-zero risk; statements about what someone else *did* are the risk.
- [ ] Personal history about yourself, including financial recovery, is legally safe to publish. Consider separately whether it's *strategically* what you want permanently indexed against your name — that's a reputational judgment, not a legal one. Publishing it deliberately, in your own framing, on a page you control, is generally better than having it surface in fragments.
- [ ] A visible `/contact` with a stated takedown-request path. Most disputes are resolved by a polite email and a quick edit; making that easy is the cheapest insurance available.

---

## 5. Minimum trust surface expected in 2026

| Element | Verdict | Why |
|---|---|---|
| **About** | **Required** | Google's helpful-content guidance names an About page and author background as trust signals. For a personal site it's the entire premise. |
| **Contact** | **Required** | Trust signal, takedown channel, and the only route by which the good feedback arrives. |
| **Privacy policy** | **Required** | **CalOPPA applies to any operator of a commercial website collecting PII from California residents — no revenue floor, no user-count minimum.** A one-person site with a contact form is covered ([TermsBox](https://termsbox.com/blog/california-privacy-act), [CalOPPA guide](https://kukie.io/blog/guide-to-caloppa)). `/donate` plus a contact form settles it. Must be conspicuously linked with the word "Privacy," and must state: categories collected, third parties, how users review/change info, how you announce changes, effective date, and your Do Not Track response. |
| **Terms** | **Recommended** | Low effort. Disclaimer of warranties, the fact that docs describe unshipped plans, acceptable use for anything interactive. |
| **Content license** | **Recommended, and unusually valuable here** | 520 archive documents with no license is an ambiguity that costs you goodwill with exactly your target audience. Pick one — CC BY-NC 4.0, CC BY 4.0, or explicit "all rights reserved" — and state it in the footer. |
| **Changelog** | **Recommended** | For a "published for feedback" site, a changelog is the proof that feedback goes somewhere. It converts a static portfolio into something people return to. Highest ratio of trust-per-effort on this list. |
| **RSS / feed** | **Recommended** | Your audience — HN readers, AI builders — disproportionately uses feed readers, and it's the only follow mechanism that doesn't require a platform account. Feed for `/posts` at minimum. |
| **Social preview cards** | **Required, currently absent** | 1200×630 (1.91:1), PNG or JPEG, under ~1MB (under 300KB for WhatsApp), absolute HTTPS URL, plus `og:image:width`/`og:image:height` and `twitter:card=summary_large_image` — without the last one Discord renders an 80×80 thumbnail ([env.dev cheat sheet](https://env.dev/guides/opengraph-image-sizes), [Pixola](https://www.pixola.ai/blog/complete-guide-open-graph-images)). Keep key content in the center ~66%. Next.js `opengraph-image.tsx` generates these per-route; use it. |
| **Status page** | **Not needed** | Reserve for services with uptime commitments. |
| **AI/automation disclosure** | **Recommended** | Google explicitly suggests disclosing when automation substantially generated content and explaining why. The docs corpus is auto-imported; a one-line note on the archive index is honest, costs nothing, and preempts the most obvious criticism. |
| **`llms.txt`** | **Optional** | Emerging, not established. Cheap; skip if time-constrained. |

---

# PART 2 — RECOMMENDED LAUNCH STRATEGY

## The core judgment

**yen has a legibility problem, not a quality problem.** Six product showcases, an app, an RPG character sheet, a media library, and 520 archive documents under one roof — a stranger's first question is "what *is* this?", and if the site doesn't answer it in five seconds, nothing else on it gets read. Every phase below is organized around fixing that before exposure scales.

Three opinionated calls, stated plainly:

1. **Do not launch the docs corpus as a headline feature.** It is the single biggest source of quality-signal dilution, legal exposure, and confusion, and the smallest source of upside. Ship it noindexed, framed explicitly as an archive, and de-emphasized in navigation.
2. **Do not go to Hacker News with "my personal site."** It's off-topic per HN's own rules. Go later, with the mounted app, or don't go.
3. **The personal material is your differentiator, not your liability** — but only if you frame it deliberately. Published on your terms with an About page around it, it's a strength. Discovered in fragments through a search result for a planning doc, it's not.

---

## Phase 0 — Private hardening (1–2 weeks, no audience)

**Purpose: make the site safe and coherent before any stranger sees it.**

Work items:
- Full-corpus PII/third-party/confidentiality scan and manual review (§4 checklist). **Non-negotiable, and do it first — it's the only irreversible risk.**
- Fix the 116 broken `.md` links.
- `noindex` on all 520 docs; hand-select ~10–20 to index.
- Add `robots.ts` and a **curated** `sitemap.ts`.
- Add `metadataBase`, per-route `openGraph`/`twitter` metadata, and a default OG image.
- Write `/about`, `/contact`, `/privacy`, `/terms`, and pick a content license.
- Add an archive banner component to every doc page: what it is, when written, source repo, "describes plans, not shipped software."
- Install cookieless analytics (Plausible or Fathom). No session recording, no GA.
- Build `/feedback` with the three questions from §2.
- Write the one-paragraph answer to "what is yen?" and put it above the fold on the home page. If you can't write it in three sentences, that's the finding.

**Gate to Phase 1 — all must be true:**
- [ ] Zero unreviewed third-party names in the published corpus.
- [ ] Zero broken links in indexed pages.
- [ ] `/about`, `/contact`, `/privacy`, `/terms` live; privacy link contains the word "Privacy" and appears sitewide.
- [ ] Every route produces a correct social card (verified in an unfurl test).
- [ ] The home page answers "what is this" in under five seconds, tested on someone who hasn't seen it.
- [ ] Mobile: home, one app page, one doc, and the mounted app all usable on a phone.

---

## Phase 1 — Moderated sessions (1 week, 5–8 people)

**Purpose: find the 85% of usability problems while the audience is zero.**

Not "friends and family review." **Moderated sessions**: screen share, one task, you stay silent. Tasks: "find out what yen is," "find something Matthew built and tell me what it does," "find out who Matthew is." Recruit 5–8 people spanning your stated audiences (a gamer, an executive, an AI builder, a learner). Some can be friends — the format neutralizes the politeness bias that makes friend feedback useless, because you're watching behavior instead of collecting opinions.

Apply the Mom Test rules ruthlessly: never ask "what do you think?", never explain the site before they use it, ask only about what they just did.

**Gate to Phase 2:**
- [ ] 5+ sessions completed.
- [ ] Every participant correctly described what yen is within 60 seconds unaided.
- [ ] No participant hit a dead end, a broken page, or a "wait, is this real or planned?" confusion they couldn't resolve.
- [ ] Top 5 issues fixed and re-tested with 2 fresh people.

---

## Phase 2 — Quiet public (2–3 weeks, indexable, unpromoted)

**Purpose: real strangers, low stakes, permanent record building slowly.**

The site is live, indexed, and linked from your existing profiles. **No launch post.** Share the URL directly with 20–40 individuals — one message each, personalized, naming the specific thing you want them to look at. Direct outreach outperforms broadcast for early feedback and produces responses you can actually follow up on.

Ship the changelog now and use it. Every fix from Phase 1 goes in it.

**Gate to Phase 3:**
- [ ] ≥100 real sessions with no critical bug reports.
- [ ] ≥10 pieces of substantive unsolicited feedback.
- [ ] Search Console clean: indexed page count roughly matches your curated sitemap, not 520+.
- [ ] The changelog has real entries, demonstrating that feedback moves things.
- [ ] You have re-read the site as a stranger once more and still stand behind every sentence about another person.

---

## Phase 3 — Community launch (1 week, staggered)

**Purpose: first real audience, in channels that tolerate reading material.**

- **Day 0:** X/LinkedIn post. Lead with the story — years of work, first time public, here's what I want to know. Personal narrative is the strongest asset you have; use it.
- **Day 2–3:** r/SideProject. Story-first, link last, no ask in the first three sentences, reply to everything.
- **Day 4–5:** Indie Hackers, if the framing fits.
- **Throughout:** be present. Blocking two hours after each post is the single highest-leverage thing in this entire phase.

Expect: dozens to low hundreds of visitors per channel, and 5–20 pieces of feedback total. **Anything more is a bonus, not the plan.** Judge this phase by feedback quality, not traffic.

---

## Phase 4 — Show HN (only if the app qualifies)

Gate is strict, and it's HN's gate, not mine:
- [ ] The mounted app runs in-browser with no signup, no email gate.
- [ ] It's non-trivial and it's the thing being submitted — yen is context, not the pitch.
- [ ] You can write a first comment about how it works, what was hard, and why you built it.
- [ ] You can be at a keyboard for four consecutive hours on a Tue/Wed/Thu morning.

If any box is unchecked, **don't post.** A weak Show HN is a permanent indexed result. There is no cost to waiting and a real cost to going early.

**Skip Product Hunt entirely for v1.**

---

## Day one vs. hold back

### Ship on day one
- Home page with a three-sentence answer to "what is yen"
- The mounted interactive app (your strongest, most demonstrable artifact)
- 2–3 product showcases — the best ones, not all six
- The character sheet / personal profile (differentiator, and it makes the site memorable)
- Media library, curated — best work only
- `/about`, `/contact`, `/privacy`, `/terms`, license, changelog, RSS
- `/feedback` with three behavioral questions
- Docs: **noindexed archive**, reachable from the footer and an archive index, with banners — plus ~10–20 curated, indexed, genuinely good documents promoted as real content
- Cookieless analytics, social cards, curated sitemap

### Hold for v2
- The remaining 3–4 product showcases (weakest first impressions do the most damage)
- Un-noindexing the bulk corpus — earn it by improving pages, one at a time
- Any session recording or behavioral analytics (and if you ever add it: CMP + banner + DPA + masking, no shortcuts)
- Product Hunt
- Newsletter/email capture (nothing to send yet; adding it before you have a cadence just creates an obligation you'll break)
- Comments, accounts, anything with a moderation burden
- Full-text search across the whole archive
- `llms.txt`, structured data beyond the basics, i18n expansion

### Explicitly do not ship
- Any doc naming a private individual in connection with their conduct, unverified
- Anything that reads as endorsement near `/donate`
- An uncurated auto-generated sitemap
- Google Analytics

---

## The one-line version

Spend two weeks making the site safe and legible, five sessions watching strangers use it, three weeks live-but-quiet, then launch to communities that read — and hold Hacker News until the app alone can carry it.
