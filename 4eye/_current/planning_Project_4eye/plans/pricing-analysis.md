# Pricing Analysis

> Comprehensive cost breakdown, pricing strategy, and profitability analysis for 4eye.ai

**Last updated:** March 2026
**Source:** [decisions.md](decisions.md) | [Plan.md](../Plan.md)

---

## Overview

4eye serves multiple verticals (Learning, Education, Religion, Professional) with a unified pricing structure. Costs are calculated per session rather than per vertical, as the core AI pipelines are shared.

**Example calculations below use 1-hour session benchmarks** — actual costs vary by content length and feature usage.

---

## Current AI Model Landscape (March 2026)

### Available Models by Provider

| Provider | Flagship | Cost-Optimized | Notes |
|----------|----------|----------------|-------|
| **OpenAI** | GPT-5.2 | GPT-5.2-mini | Best reasoning, multimodal |
| **Anthropic** | Claude 4.5 Opus | Claude 4.5 Haiku | Excellent for nuanced text |
| **Google** | Gemini 2 Pro | Gemini 2 Flash | Best value, 1M context |
| **Meta** | Llama 4 | Llama 4 Light | Self-hosted option |

### Model Pricing Comparison (per 1M tokens)

| Model | Input | Output | Best For |
|-------|-------|--------|----------|
| **GPT-5.2** | $1.50 | $6.00 | Summaries, complex analysis |
| **GPT-5.2-mini** | $0.08 | $0.30 | Chat, high-volume tasks |
| **Claude 4.5 Opus** | $2.00 | $10.00 | Theological depth, feedback |
| **Claude 4.5 Haiku** | $0.10 | $0.50 | Fast chat, translations |
| **Gemini 2 Pro** | $0.50 | $2.00 | Long context (1M tokens) |
| **Gemini 2 Flash** | $0.03 | $0.12 | Bulk processing, cheapest |

> **Strategy:** Use GPT-5.2-mini/Gemini 2 Flash for high-volume tasks (chat, translations), reserve GPT-5.2/Claude 4.5 Opus for quality-critical tasks (summaries, feedback).

> **Note:** Prices have dropped ~60% from 2024 due to efficiency improvements and competition.

---

## API Cost Reference (March 2026)

### Speech-to-Text Providers

| Provider | Model | Pricing | Cost/Min | Cost/Hour | Use Case |
|----------|-------|---------|----------|-----------|----------|
| **Google Cloud STT** | Enhanced + Diarization | $0.009/15s + $0.012 diarization | $0.048 | **$2.88** | Live streaming |
| **OpenAI Whisper** | whisper-1 | $0.006/min | $0.006 | **$0.36** | Batch uploads |

**Google STT Calculation:**
- Base: $0.006/15 seconds = $0.024/min
- Enhanced model: +$0.003/15s = +$0.012/min
- Speaker diarization: +$0.003/15s = +$0.012/min
- **Total: $0.048/min = $2.88/hour**

### Translation

| Provider | Model | Pricing | Notes |
|----------|-------|---------|-------|
| **Google Cloud Translation** | Neural | $20/1M characters | Primary (fast, reliable) |
| **GPT-5.2-mini** | via API | $0.08/1M in + $0.30/1M out | Reading level adaptation |
| **Gemini 2 Flash** | via API | $0.03/1M in + $0.12/1M out | Bulk translation fallback |

**Translation Cost Calculation:**
- Average session: ~8,000 words/hour = ~40,000 characters (~10,000 tokens)
- Google Translate: 40,000 chars × $0.00002 = **$0.80/language/hour**
- Reading level adaptation (GPT-5.2-mini): 10,000 tokens × $0.00000038 = **$0.004/adaptation**
- 3 languages average: **$2.40/hour** (Google Translate only)
- With reading level adaptation (20% of segments): +$0.08/hour
- **Estimated: ~$1.25/hour** (lower than previous due to GPT-5.2-mini)

### AI Generation (Summaries, Recaps, Feedback)

| Task | Model | Input Tokens | Output Tokens | Cost/Session |
|------|-------|--------------|---------------|--------------|
| Summary | GPT-5.2 | ~4,000 | ~500 | $0.009 |
| Recap | GPT-5.2 | ~4,000 | ~1,000 | $0.012 |
| Feedback | Claude 4.5 Opus | ~4,000 | ~800 | $0.016 |
| **Total** | | | | **~$0.04/session** |

**Calculation (GPT-5.2):**
- GPT-5.2: $1.50/1M input, $6.00/1M output
- Summary: (4000 × $0.0000015) + (500 × $0.000006) = $0.006 + $0.003 = $0.009
- Recap: (4000 × $0.0000015) + (1000 × $0.000006) = $0.006 + $0.006 = $0.012

> **80% cost reduction** from 2024 GPT-4-turbo ($0.20) to 2026 GPT-5.2 ($0.04)

### Speaker Feedback (F13)

| Component | Model | Input Tokens | Output Tokens | Cost |
|-----------|-------|--------------|---------------|------|
| Feedback Analysis | Claude 4.5 Opus | ~10,000 | ~2,000 | **~$0.04** |

**Calculation (Claude 4.5 Opus):**
- Input: 10,000 × $0.000002 = $0.02
- Output: 2,000 × $0.00001 = $0.02
- **Total: ~$0.04/speaker/session**

### Positive Speech Transform (F11)

| Component | Model | Input Tokens | Output Tokens | Cost |
|-----------|-------|--------------|---------------|------|
| Detection (per segment) | Claude 4.5 Opus | ~200 | ~100 | ~$0.0014 |
| Transformation | Claude 4.5 Opus | ~300 | ~200 | ~$0.0026 |

**Estimation per 1-hour session:**
- ~100 segments checked for detection: 100 × $0.0014 = $0.14
- ~5% flagged, transformed: 5 × $0.0026 = $0.013
- **Total: ~$0.15/session**

### Cross-Source Comparison (F10)

| Component | Model | Input Tokens | Output Tokens | Cost |
|-----------|-------|--------------|---------------|------|
| Comparison per topic | GPT-5.2 | ~1,000 | ~1,500 | ~$0.015 |

**Estimation per session:**
- Average 3 comparable topics: 3 × $0.015 = **~$0.045/session**

### Image Generation (Visuals)

| Provider | Model | Cost/Image | Images/Session | Cost/Session |
|----------|-------|------------|----------------|--------------|
| **DALL-E 3** | Standard 1024x1024 | $0.040 | ~8 avg (max 12) | **~$0.32** |
| **DALL-E 3** | HD 1024x1024 | $0.080 | ~8 avg | ~$0.64 |
| **Imagen 3** | Standard | $0.040 | ~8 avg | ~$0.32 |

**Visual Generation Logic:**
- ~1 visual per 8 minutes of content
- 1-hour session: ~7-8 visuals
- Max cap: 12 visuals per session

> Recommend DALL-E 3 Standard or Imagen 3 for cost efficiency.

### AI Chat Conversations

| Component | Model | Tokens | Cost | Notes |
|-----------|-------|--------|------|-------|
| User question + context | GPT-5.2-mini | ~500 input | $0.00004 | Includes transcript context |
| AI response | GPT-5.2-mini | ~400 output | $0.00012 | Fast, high quality |
| **Per exchange** | | | **$0.00016** | One Q&A pair |

**Chat Cost Comparison (per exchange):**
| Model | Input (500) | Output (400) | Total |
|-------|-------------|--------------|-------|
| GPT-4-turbo (2024) | $0.005 | $0.012 | $0.017 |
| GPT-4o (2024) | $0.00125 | $0.004 | $0.0053 |
| **GPT-5.2-mini (2026)** | $0.00004 | $0.00012 | **$0.00016** |
| Gemini 2 Flash | $0.000015 | $0.000048 | $0.00006 |

> **99% cost reduction** from 2024 GPT-4-turbo to 2026 GPT-5.2-mini!

**Chat Usage Patterns (Research-Based):**

| User Type | Conversations/Mo | Exchanges/Convo | Total Exchanges | Monthly Cost |
|-----------|------------------|-----------------|-----------------|-------------|
| Light | 5 | 5 | 25 | $0.004 |
| Medium | 15 | 8 | 120 | $0.019 |
| Heavy | 30 | 10 | 300 | $0.048 |

**Expected Distribution:** 60% light, 30% medium, 10% heavy
**Weighted Average Cost:** (0.6 × $0.004) + (0.3 × $0.019) + (0.1 × $0.048) = **$0.013/user/mo**

> **Note:** With GPT-5.2-mini, chat is essentially free. Unlimited chat for all paid tiers.

### Storage

| Provider | Type | Cost | Notes |
|----------|------|------|-------|
| **Google Cloud Storage** | Standard | $0.020/GB/mo | Audio/video files |
| **Google Cloud Storage** | Nearline | $0.010/GB/mo | Archive |

**Storage Calculation:**
- 1 hour audio (128kbps): ~58 MB
- 1 hour video (720p): ~1.5 GB
- Average (assume 80% audio, 20% video): ~350 MB/hour
- Monthly cost per hour stored: 0.35 GB × $0.02 = **$0.007/hour**
- Rounded up for retrieval costs: **$0.01/hour**

---

## Total Cost Per Hour

### Live Session (Full Features - Pro/Org)

| Component | Calculation | Cost/Hour |
|-----------|-------------|-----------|
| Google Cloud STT | $0.048 × 60 min | $2.88 |
| Translation (3 lang avg) | $0.80 × 3 × 0.54 efficiency | $1.30 |
| Summary | GPT-5.2 | $0.009 |
| Recap | GPT-5.2 | $0.012 |
| Feedback | Claude 4.5 Opus (~$0.04/speaker avg) | $0.04 |
| Positive Speech | Claude 4.5 Opus | $0.15 |
| Cross-Source | GPT-5.2 (3 topics avg) | $0.045 |
| Visuals (8 images) | $0.04 × 8 | $0.32 |
| Storage | 0.35 GB × $0.02 | $0.01 |
| **Infrastructure overhead** | ~10% buffer | $0.48 |
| **Total Live Cost** | | **$5.25/hour** |

*Note: Full features (Visuals, Recaps, Cross-Source, Positive Speech) only apply to Pro tier / Org subscriptions.*

### Uploaded Session (Batch - Pro/Org)

| Component | Calculation | Cost/Hour |
|-----------|-------------|-----------|
| OpenAI Whisper | $0.006 × 60 min | $0.36 |
| Pyannote diarization | Self-hosted, ~$0.05 compute | $0.05 |
| Translation (3 lang avg) | Same as live | $1.25 |
| Summary | GPT-5.2 | $0.009 |
| Recap | GPT-5.2 | $0.012 |
| Feedback | Claude 4.5 Opus | $0.04 |
| Positive Speech | Claude 4.5 Opus | $0.15 |
| Cross-Source | GPT-5.2 (3 topics) | $0.045 |
| Visuals (8 images) | $0.04 × 8 | $0.32 |
| Storage | Same as live | $0.01 |
| **Infrastructure overhead** | ~10% buffer | $0.22 |
| **Total Batch Cost** | | **$2.45/hour** |

### Blended Cost Assumption

**Organizations (70% live, 30% batch):**
- Blended cost: (0.70 × $5.25) + (0.30 × $2.45) = **$4.41/hour**

**Individuals (20% live, 80% batch):**
- Blended cost: (0.20 × $5.25) + (0.80 × $2.45) = **$3.01/hour**

> This individual blend ($3.01/hr) ensures Plus and Pro tiers remain profitable.

---

## Pricing Tiers

### Organization Plans

| Tier | Price | Congregation | Hours/Mo | Rooms | Revenue/Hr | Cost/Hr | Margin/Hr | Monthly Margin |
|------|-------|--------------|----------|-------|------------|---------|-----------|----------------|
| **Starter** | $99 | ≤100 | 10 | 2 | $9.90 | $4.41 | $5.49 | $54.90 |
| **Growth** | $249 | ≤500 | 30 | 5 | $8.30 | $4.41 | $3.89 | $116.70 |
| **Scale** | $599 | ≤2000 | 60 | 15 | $9.98 | $4.41 | $5.57 | $334.20 |
| **Enterprise** | $1,199 | ≤5000 | 120 | Unlimited | $9.99 | $4.41 | $5.58 | $669.60 |

**Overage Rate:** $8/hour (margin: $3.59/hr)

### Individual Plans

**Free / Guest Access:**
- **Guests of organizations** automatically get free access when joining via invite link
- **Standalone free tier** is toggleable via `FREE_TIER_ENABLED` env var (default: `false`)
- Free features: View transcripts, 5 chat Q&A/mo, source language only, 7-day history

**Individual Usage Pattern:** Individuals primarily upload recordings (80%) rather than host live sessions (20%).
- Individual blend: 0.8 × $2.45 + 0.2 × $5.25 = **$3.01/hr**

| Plan | Price | STT Hours | Session Type | Chat | Monthly Cost | Monthly Margin |
|------|-------|-----------|--------------|------|--------------|----------------|
| **Chat** | $4.99 | 0 | View only | Unlimited | $0.01 | **+$4.98** ✓ |
| **Plus** | $49.99 | 10 | Upload + Live | Unlimited | $30.10 | **+$19.89** ✓ |
| **Pro** | $99.99 | 25 | Upload + Live | Unlimited | $75.25 | **+$24.74** ✓ |

**Cost Breakdown by Tier:**

| Plan | STT Cost | Translation | AI Features | Chat | Total |
|------|----------|-------------|-------------|------|-------|
| Free/Guest | $0 (view only) | $0 | $0 | $0.01 | $0.01 |
| Chat | $0 | $0 | $0 | $0.01 | $0.01 |
| Plus | $30.10 (10hr @ $3.01) | incl. | incl. | incl. | $30.10 |
| Pro | $75.25 (25hr @ $3.01) | incl. | incl. | incl. | $75.25 |

*Note: Plus/Pro costs include full AI features (Visuals, Recaps, Feedback, Cross-Source, Positive Speech).*

> **All tiers profitable.** Chat: 99.7% margin, Plus: 40% margin, Pro: 25% margin.

**Tier Strategy:**

| Tier | Purpose | Margin |
|------|---------|--------|
| **Free/Guest** | Org attendees, trial users | Covered by org |
| **Chat** | Engaged individuals, not attending org | **99.7%** ✓ |
| **Plus** | Power users wanting personal STT access | **40%** ✓ |
| **Pro** | Teachers, scholars, content creators | **25%** ✓ |

> **Key Insight:** Guests at organizations get free access (covered by org subscription). All individual plans are profitable.

---

## Profitability Scenarios

### Scenario A: 100 Organizations (Year 1 Target)

**Organizations:**
| Tier | Customers | Monthly Rev | Monthly Cost | Monthly Profit |
|------|-----------|-------------|--------------|----------------|
| Starter | 50 | $4,950 | $2,040 | $2,910 |
| Growth | 30 | $7,470 | $3,672 | $3,798 |
| Scale | 15 | $8,985 | $3,672 | $5,313 |
| Enterprise | 5 | $5,995 | $2,448 | $3,547 |
| **Subtotal Orgs** | **100** | **$27,400** | **$11,832** | **$15,568** |

**Individuals:**
| Tier | Customers | Monthly Rev | Monthly Cost | Monthly Profit |
|------|-----------|-------------|--------------|----------------|
| Guest (via orgs) | 500 | $0 | $5 | -$5 (covered by orgs) |
| Chat | 400 | $1,996 | $4 | **+$1,992** |
| Plus | 60 | $2,999 | $1,728 | **+$1,271** |
| Pro | 30 | $3,000 | $2,168 | **+$832** |
| **Subtotal Ind** | **990** | **$7,995** | **$3,905** | **+$4,090** |

| **Total Year 1** | | **$35,395** | **$15,737** | **$19,658** |

**Annual Profit (Scenario A):** ~$236,000 ✓

### Scenario B: 500 Organizations (Year 2 Target)

**Organizations:**
| Tier | Customers | Monthly Rev | Monthly Cost | Monthly Profit |
|------|-----------|-------------|--------------|----------------|
| Starter | 200 | $19,800 | $7,940 | $11,860 |
| Growth | 180 | $44,820 | $21,438 | $23,382 |
| Scale | 80 | $47,920 | $19,056 | $28,864 |
| Enterprise | 40 | $47,960 | $19,056 | $28,904 |
| **Subtotal Orgs** | **500** | **$160,500** | **$67,490** | **$93,010** |

**Individuals:**
| Tier | Customers | Monthly Rev | Monthly Cost | Monthly Profit |
|------|-----------|-------------|--------------|----------------|
| Guest (via orgs) | 4,000 | $0 | $40 | -$40 (covered by orgs) |
| Chat | 3,500 | $17,465 | $35 | **+$17,430** |
| Plus | 500 | $24,995 | $14,400 | **+$10,595** |
| Pro | 250 | $24,998 | $18,063 | **+$6,935** |
| **Subtotal Ind** | **8,250** | **$67,458** | **$32,538** | **+$34,920** |

| **Total Year 2** | | **$227,958** | **$100,028** | **$127,930** |

**Annual Profit (Scenario B):** ~$1.54M ✓

### Scenario C: All Profitable Individual Model

With all tiers now profitable, even heavy STT users contribute:

| Year | Org Profit | Individual Profit | Total Profit |
|------|------------|-------------------|--------------|
| Year 1 | $186,816 | $49,080 | **~$236,000** |
| Year 2 | $1,116,120 | $419,040 | **~$1.54M** |

> **Key Takeaway:** All individual plans are now profitable. No more loss leaders required.

---

## Usage Assumptions

### Typical Usage Patterns

| Congregation Size | Services/Week | Avg Duration | Monthly Hours | Recommended Tier |
|-------------------|---------------|--------------|---------------|------------------|
| Small (<100) | 1-2 | 1 hr | 4-8 | Starter (10 hrs) |
| Medium (100-500) | 2-3 | 1.5 hrs | 12-18 | Growth (30 hrs) |
| Large (500-2000) | 3-5 | 1.5 hrs | 18-30 | Scale (60 hrs) |
| Mega (2000+) | 5-10 | 2 hrs | 40-80 | Enterprise (120 hrs) |

### Feature Usage by Plan

| Feature | Guest | Chat | Plus | Pro | Org |
|---------|-------|------|------|-----|-----|
| **Transcription** | | | | | |
| View transcripts | ✓ | ✓ | ✓ | ✓ | ✓ |
| Upload sessions | - | - | ✓ | ✓ | ✓ |
| Live real-time | - | - | ✓ | ✓ | ✓ |
| **Translation** | | | | | |
| Source language | ✓ | ✓ | ✓ | ✓ | ✓ |
| Target languages | 1 | 1 | All | All | All |
| Reading levels | Std | Std | All | All | All |
| **AI Chat** | | | | | |
| Basic Q&A | 5/mo | ✓ | ✓ | ✓ | ✓ |
| Sermon analysis | - | ✓ | ✓ | ✓ | ✓ |
| Cross-reference | - | - | ✓ | ✓ | ✓ |
| Study guides | - | - | - | ✓ | ✓ |
| **Content** | | | | | |
| History | 7 days | Full | Full | Full | Full |
| Recordings | - | - | ✓ | ✓ | ✓ |
| Visuals | - | - | - | ✓ | ✓ |
| Summaries/Recaps | - | - | - | ✓ | ✓ |
| Export | - | - | ✓ | ✓ | ✓ |
| Cross-source | - | - | - | ✓ | ✓ |

---

## Pricing Rationale

### Why These Price Points?

**Organizations ($99-$1,199):**
- **Value-based:** An organization with 200 members, avg $50/person = $10,000/mo revenue
- If 4eye retains/attracts 2-3 members, that's $100-150/mo value
- **Willingness to pay:** Organizations budget 1-5% of revenue for technology
- **Competitive:** Lower than enterprise solutions (KUDO $1,000+, Verbit $2,000+)
- **Accessible:** Higher than consumer apps but justified by multi-user value

**Individuals ($4.99-$99.99):**
- **All tiers profitable:** No more loss leaders — every paying customer contributes
- **Chat tier:** $4.99 with **$4.98 margin (99.7%)** — essentially pure profit
- **Plus tier:** $49.99 with **$21.19 margin (42%)** — batch-heavy users
- **Pro tier:** $99.99 with **$27.74 margin (28%)** — power users profitable
- **Competitive:** Chat undercuts Otter.ai ($8+), Plus competitive with Descript ($12+)
- **Conversion path:** Guest → Chat → Plus/Pro → advocate for org subscription
- **Key insight:** Individuals use 80% batch STT (cheap) vs 20% live (expensive)

### Growth Levers

1. **Overage revenue:** Organizations exceeding hours pay $8/hr (55% margin)
2. **Tier upgrades:** As organizations grow, they upgrade tiers
3. **Add-on services:** Custom integrations, priority support, training
4. **Regional expansion:** Enterprise accounts with multiple locations

---

## Cost Reduction Opportunities

| Opportunity | Potential Savings | Timeline |
|-------------|-------------------|----------|
| Self-host Whisper | -$0.30/hr batch | Phase 2 |
| Cached translations | -20% translation costs | Phase 1 |
| Batch visual generation | -$0.05/hr | Phase 2 |
| Negotiated API rates | -10-20% at scale | Year 2 |
| Regional STT providers | Variable | Phase 3 |

---

## Environment Variables

```env
# Pricing configuration
FREE_TIER_ENABLED=false
FREE_TIER_HOURS=2
OVERAGE_RATE_PER_HOUR=8.00

# Cost tracking
COST_ALERT_THRESHOLD_DAILY=500
COST_ALERT_THRESHOLD_MONTHLY=10000
```

---

## Summary

| Metric | Value |
|--------|-------|
| **Org blend cost/hr (70% live)** | $3.97 |
| **Individual blend cost/hr (80% batch)** | $2.63 |
| **Chat cost per user/mo** | $0.01 |
| **Target org revenue/hour** | $8.30-$9.99 |
| **Org gross margin** | 52-60% |
| **Chat tier margin** | **99.7%** ($4.98 profit) |
| **Plus tier margin** | **42%** ($21.19 profit) |
| **Pro tier margin** | **28%** ($27.74 profit) |
| **Break-even customers** | ~25 organizations |
| **Year 1 target profit** | ~$236,000 |
| **Year 2 target profit** | ~$1.54M |

### Model Selection Summary

| Task | Recommended Model | Fallback | Cost |
|------|-------------------|----------|------|
| Chat conversations | GPT-5.2-mini | Gemini 2 Flash | $0.00016/exchange |
| Reading level adaptation | GPT-5.2-mini | Claude 4.5 Haiku | ~$0.004/segment |
| Summaries & Recaps | GPT-5.2 | Claude 4.5 Opus | $0.02/session |
| Speaker feedback | Claude 4.5 Opus | GPT-5.2 | $0.016/session |
| Translation | Google Translate | Gemini 2 Flash | $0.80/language/hr |
| Live STT | Google Cloud STT | - | $2.88/hr |
| Batch STT | OpenAI Whisper | - | $0.36/hr |
| Image generation | DALL-E 3 | Imagen 3 | $0.04/image |
