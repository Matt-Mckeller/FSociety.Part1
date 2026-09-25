# Product & Technical Decisions

> Consolidated decisions made during planning. Reference for all sub-plans.

---

## Pricing

### Organization Plans (USA)

| Tier | Price | Congregation | Hours/Mo | Rooms |
|------|-------|--------------|----------|-------|
| **Starter** | $99/mo | ≤100 | 10 | 2 |
| **Growth** | $249/mo | ≤500 | 30 | 5 |
| **Scale** | $599/mo | ≤2000 | 60 | 15 |
| **Enterprise** | $1,199/mo | ≤5000 | 120 | Unlimited |
| **Custom** | Contact | Unlimited | Custom | Unlimited |

**Overage**: $8/hr beyond included hours

### Individual Plans (USA)

| Plan | Price | STT Hours | Session Type | Features |
|------|-------|-----------|--------------|----------|
| **Chat** | $4.99/mo | 0 | View only | Unlimited AI chat, full history, content analysis |
| **Plus** | $49.99/mo | 10 | Upload + Live | All languages, reading levels, recordings, cross-reference |
| **Pro** | $99.99/mo | 25 | Upload + Live | + Visuals, summaries, cross-source, study guides |

> **Note:** All individual tiers are profitable. Chat: 99.7% margin, Plus: 42% margin, Pro: 28% margin.

### Free/Guest Access

**Guest Access (automatic):** Users attending sessions at subscribing organizations automatically get guest-level access at no cost. The organization's subscription covers their usage.

**Standalone Free Tier (toggleable):** Controlled by `FREE_TIER_ENABLED` environment variable:

| Setting | Value | Notes |
|---------|-------|-------|
| Env Variable | `FREE_TIER_ENABLED` | `true` or `false` |
| Default | `false` | Disabled at launch |
| Runtime Toggle | Phase 2 | Admin UI for runtime control |

**Guest/Free Limits:**
| Limit | Value |
|-------|-------|
| STT Hours | 0 (view transcripts only) |
| AI Chat | 5 Q&A exchanges/month |
| Languages | Source only (no translation) |
| Reading Levels | Standard only |
| History | 7 days |
| Recordings | No |
| Visuals | No |
| Summaries/Recaps | No |
| Export | No |

### Regional Pricing
- Prices above are USA baseline
- Regional adjustments TBD (PPP-based discounts for developing regions)

---

## Data Model Decisions

### Organizations & Rooms
- Organization is **not required** for users (individuals can subscribe independently)
- Users can belong to **multiple organizations**
- Rooms can belong to **multiple organizations** (shared venues)
- Only organizations can create rooms (individuals cannot)
- Room ownership: **co-owned** by host and organization

### Users & Guests
- Guests are **anonymous** (session token only, no User record)
- Guest → Member upgrade does **not** link past attendance
- Users can have **multiple roles** across organizations

### Sessions & Recordings
- Sessions can be **live** or **uploaded** (audio/video files)
- Recording is **optional** per session
- One session can have **multiple recordings** (start/stop)
- Uploaded sessions go through same pipeline (transcription, translation, etc.)
- **Single source language** per session (no multi-language input)

### Subscriptions
- Subscriptions exist at **both** user and organization level
- Organization subscription covers all org members within limits
- Individual subscription for users not in an organization

### Speakers
- Speakers can be **named entities without accounts** (e.g., "Guest Speaker John")
- **Speaker diarization** auto-detects speaker changes ("Speaker 1", "Speaker 2")
- Host **manually labels** speakers post-session ("Speaker 1" → "Pastor John")
- Labels persist per room — auto-suggested in future sessions
- Voice fingerprinting deferred to Phase 2

---

## Compliance & Data Handling

### Retention
- **Soft delete** on: User, Recording, Organization
- **Hard delete** on: Chat messages older than configured period
- Retention period: **Organization-configurable** (30/90/365 days/forever)

### Audit
- Audit log for: speech transforms, billing events, consent changes
- No general "who edited what" audit trail

### Transcripts
- Save transcripts: **Yes**, with configurable retention
- PII handling: **Optional AI-based redaction** (user choice)
- Religious content flagged as **GDPR Special Category Data**

### User Rights
- Data export: **Yes** (GDPR Art. 20)
- Account deletion: **Soft delete → hard delete after 30 days** (GDPR Art. 17)
- Recording consent: **Explicit opt-in banner** per session

---

## Technical Decisions

### Phase 1 Audio/Video Input
- Browser microphone capture (MediaRecorder API)
- Audio file upload (mp3, wav, m4a)
- Video file upload (mp4, webm)
- YouTube URL input (test + user feature)

### Speech Processing
- **Primary STT**: OpenAI Whisper API (excellent accuracy, simple API key auth)
- **Alternative STT**: Google Cloud Speech-to-Text (native streaming + diarization, requires GCP setup)
- **Diarization**: pyannote-audio (post-processing for speaker labels)
- **Strategy**: Provider-agnostic abstraction layer — start with Whisper, swap providers as needed
- Cost: Whisper $0.006/min, Google STT ~$0.048/min

### Translation Pipeline
- **Primary**: Google Cloud Translation (fast: <100ms, cheap: $20/1M chars)
- **Reading Level Adaptation**: GPT-5.2-mini via C5 (for CHILD/ACADEMIC levels)
- **Strategy**: On-demand with caching (not pre-generating all combos)
- STANDARD level: Google Translate only
- CHILD/ACADEMIC: Google Translate → GPT-5.2-mini rewrite

### UI Internationalization
- **Library**: next-intl (purpose-built for Next.js App Router)
- **Locales**: en, es, pt, fr, ar, zh (same as translation)
- **RTL**: Logical CSS properties + MUI RTL plugin

### Visuals
- Generated **during live session** (real-time)
- AI determines optimal timing for image generation

### Mobile
- **React Native** apps for iOS and Android
- Web remains responsive for browser access

### Admin Hierarchy
- Organizations can have **multiple admins/hosts**
- Hosts can belong to **multiple organizations**

### White-labeling
- **Not Phase 1** — defer to enterprise tier later

### Codebase Architecture
- **Shared codebase** for web (Next.js) and mobile (React Native)
- Shared: Context, providers, reducers, API layer, business logic
- Separate: UI components only where necessary (platform-specific)

### Languages (MVP)
- **5 translation languages** at launch
- Candidates: Spanish, Portuguese, French, Arabic, Mandarin (finalize later)

### Reading Levels
- **3 levels**: Child / Standard / Academic

### Notifications (MVP)
- **In-app only** — no email, push, or SMS in Phase 1

### Payment
- **Stripe** for all billing and subscriptions

---

## Feature Scope

### Video Features
- Video uploads supported
- Save video clips to session/chat
- Replay feature for recorded sessions

### YouTube Integration
- **Dual-purpose**: dev testing + user-facing feature
- Users can import YouTube URLs for transcription/translation

---

## Cost Estimates (Reference)

> **Detailed analysis:** See [pricing-analysis.md](pricing-analysis.md) for full calculations.

| Session Type | Total Cost/Hour |
|--------------|-----------------|
| **Live** (Google STT) | $4.90 |
| **Batch** (Whisper) | $2.18 |
| **Blended** (70/30) | $4.08 |

### AI Models Used
| Task | Model | Notes |
|------|-------|-------|
| Chat | GPT-5.2-mini | $0.00016/exchange |
| Summaries | GPT-5.2 | $0.009/session |
| Recaps | GPT-5.2 | $0.012/session |
| Feedback | Claude 4.5 Opus | ~$0.04/speaker/session, nuanced analysis |
| Positive Speech | Claude 4.5 Opus | Detection + transform, ~$0.15/session |
| Visual Concepts | GPT-5.2-mini | Extraction, minimal cost |
| Visual Images | DALL-E 3 | $0.04/image, ~$0.32/session (8 avg) |
| Cross-Source | GPT-5.2 | ~$0.015/topic, ~$0.045/session (3 topics) |
| Translation | Google Translate + GPT-5.2-mini | Adaptation as needed |

### Quick Reference
- Google STT: $0.048/min ($2.88/hr)
- Whisper: $0.006/min ($0.36/hr)
- Translation: ~$0.80/language/hr
- Chat: ~$0.01/user/mo (GPT-5.2-mini)
- Visuals: $0.04/image
- Overage rate: $8/hr (margin: $4.03)
