# Research Results: Open-Source Social Media Automation (Self-Host)

## Executive Summary (1-3 min read)

**Top 3 Recommendations:**

1. **Mixpost** — Actively maintained, self-hosted scheduler with multi-platform support
2. **Socioboard** — Full suite OSS social media management (teams, analytics)
3. **PostyBirb** — Creator-focused multi-site posting tool (great for media workflows)

Runner-up: **Huginn / n8n / Activepieces** — General automation/orchestration platforms you can wire for social posting via API connectors

**Decision: DOWNLOAD**
**Reasoning:** These projects are mature, GitHub-hosted, and suitable for owner-controlled deployments. Choose Mixpost for straightforward scheduling, Socioboard for a broader team feature set, and PostyBirb for media-heavy creators.

## Solution Comparison Table

| Project      | License  | Active Dev | Platforms (examples)             | Scheduling | Teams | Analytics | Stack           |
| ------------ | -------- | ---------- | -------------------------------- | ---------- | ----- | --------- | --------------- |
| Mixpost      | AGPL-3   | ✅         | X, Facebook, Instagram, TikTok   | ✅         | ⚠️    | ⚠️        | PHP/Laravel     |
| Socioboard   | Apache2  | ✅         | X, Facebook, Instagram, LinkedIn | ✅         | ✅    | ✅        | Node/Angular    |
| PostyBirb    | MIT      | ✅         | Art sites + social networks      | ✅         | ⚠️    | ❌        | Electron/Node   |
| Huginn       | MIT      | ✅         | Any via agents/APIs              | ⚠️         | ⚠️    | ❌        | Ruby on Rails   |
| n8n          | FairCode | ✅         | Any via nodes/APIs               | ⚠️         | ✅    | ⚠️        | Node/TypeScript |
| Activepieces | GPL-3    | ✅         | Any via pieces/APIs              | ⚠️         | ✅    | ⚠️        | Node/NestJS     |

Legend: ✅ = native/strong; ⚠️ = partial/indirect; ❌ = not built-in

## Feature Matrix

| Feature                     | Mixpost | Socioboard | PostyBirb | Huginn | n8n | Activepieces |
| --------------------------- | ------- | ---------- | --------- | ------ | --- | ------------ |
| Multi-account posting       | ✅      | ✅         | ✅        | ⚠️     | ✅  | ✅           |
| Content calendar            | ✅      | ✅         | ⚠️        | ❌     | ⚠️  | ⚠️           |
| Bulk upload                 | ✅      | ✅         | ⚠️        | ❌     | ✅  | ✅           |
| Best time to post           | ⚠️      | ✅         | ❌        | ❌     | ⚠️  | ⚠️           |
| Approval workflow           | ⚠️      | ✅         | ❌        | ❌     | ✅  | ✅           |
| Team roles/permissions      | ⚠️      | ✅         | ❌        | ❌     | ✅  | ✅           |
| Basic analytics             | ⚠️      | ✅         | ❌        | ❌     | ⚠️  | ⚠️           |
| Extensible via API/webhooks | ✅      | ✅         | ✅        | ✅     | ✅  | ✅           |
| Self-host Docker            | ✅      | ✅         | ⚠️        | ✅     | ✅  | ✅           |

## Quick Project Profiles

### Mixpost

- Repo: `https://github.com/mixpost/mixpost`
- Highlights: self-host scheduler, unlimited scheduling, clean UI, Laravel-based
- Deploy: Docker or PHP stack; requires platform API keys

### Socioboard

- Repo: `https://github.com/socioboard/Socioboard`
- Highlights: dashboard, teams, analytics, engagement tools; enterprise-leaning OSS
- Deploy: Docker/Kubernetes; multiple microservices

### PostyBirb

- Repo: `https://github.com/SHNecro/SHPostyBirb`
- Highlights: creator-centric multi-site poster; great for images/media
- Deploy: Desktop app (Electron) or self-run builds

### Huginn (automation agents)

- Repo: `https://github.com/huginn/huginn`
- Highlights: IFTTT-style agents; can poll CMS feeds and post via APIs
- Deploy: Docker; requires building API agents for each network

### n8n / Activepieces (workflow automation)

- Repos: `https://github.com/n8n-io/n8n`, `https://github.com/activepieces/activepieces`
- Highlights: visual workflows; schedule + compose nodes to post to networks
- Deploy: Docker; bring-your-own platform tokens

## Implementation Guides

### Mixpost (Docker quick start)

```bash
git clone https://github.com/mixpost/mixpost.git
cd mixpost
cp .env.example .env
docker compose up -d
# then open the app URL, create admin, and add platform API keys
```

### Socioboard (Docker quick start)

```bash
git clone https://github.com/socioboard/Socioboard.git
cd Socioboard
docker compose -f docker-compose.yml up -d
# access the web UI and connect networks
```

### Huginn (schedule CMS -> social)

```bash
docker run -d --name huginn -p 3000:3000 huginn/huginn
# configure RSS/Webhook agents -> transform -> HTTP POST to platform APIs via middleware
```

### n8n (cron -> post)

```bash
docker run -d -p 5678:5678 -e N8N_HOST=localhost n8nio/n8n
# create Cron node -> content generation -> HTTP nodes or official social nodes
```

## Recommendations

- **Fastest path to own scheduler:** Mixpost
- **Team features + analytics:** Socioboard
- **Creator/media workflows:** PostyBirb
- **Custom pipelines/integrations:** n8n or Activepieces; Huginn for agent-style automations

## Notes & Considerations

- Social network APIs and terms change frequently; verify latest posting capabilities (especially Threads, TikTok, Instagram Stories/Reels).
- Some platforms require Business accounts/permissions for auto-publish.
- For AI content, pair with local LLMs or external APIs; feed outputs into Mixpost/n8n.

## References

- Mixpost — `https://github.com/mixpost/mixpost`
- Socioboard — `https://github.com/socioboard/Socioboard`
- PostyBirb — `https://github.com/SHNecro/SHPostyBirb`
- Huginn — `https://github.com/huginn/huginn`
- n8n — `https://github.com/n8n-io/n8n`
- Activepieces — `https://github.com/activepieces/activepieces`

---

_Open-source options suitable for self-hosting and productization of social posting workflows._
