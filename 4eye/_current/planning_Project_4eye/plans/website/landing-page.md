# W1 — Landing Page

> Marketing homepage for 4eye.ai — hero, features, pricing, CTA.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Route

| Route | Component | Auth |
|-------|-----------|------|
| `/` | LandingPage | Public |

---

## Page Sections

### 1. Hero
```tsx
<Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
  <Container>
    <Typography variant="h1">Learn Better. Understand Everything.</Typography>
    <Typography variant="h5" color="text.secondary">
      AI-powered learning that transforms any audio into personalized learning experiences.
      Transcription. Translation. Quizzes. Visual learning. Any language. Any level.
    </Typography>
    <Button variant="contained" size="large" href="/signup">Get Started Free</Button>
    <Button variant="outlined" size="large" href="#demo">See Demo</Button>
  </Container>
</Box>
```

### 2. Features Grid
| Feature | Icon | Description |
|---------|------|-------------|
| Live Transcription | Mic | Real-time speech to text |
| Translation | Translate | 50+ languages instantly |
| Reading Levels | School | Child, Standard, Academic |
| Learning Modes | Psychology | Triadic understanding, visual learning |
| AI Quizzes | Quiz | Auto-generated exercises and tests |
| Summaries & Recaps | Article | Key points, highlights, structured notes |
| Visual Generation | Image | AI images for comprehension and memory |
| Recordings | PlayCircle | Save, replay, and study anytime |

### 3. Use Cases (Verticals)
| Use Case | Description |
|----------|-------------|
| **Education** | Lectures, classrooms, tutoring — with auto-generated quizzes |
| **Professional** | Conferences, training, meetings — with action items |
| **Religion** | Sermons, study groups — with cross-faith comparison |
| **Personal Learning** | Podcasts, videos, self-study — build your knowledge |

### 4. How It Works
```
1. Record or join a live session
2. Get real-time transcript in any language
3. AI generates learning aids: summaries, quizzes, visuals
4. Master the content with active recall exercises
```

### 5. Pricing Preview
Link to full pricing page. Show tier highlights:

**Individual Plans:**
- **Free**: Limited sessions, basic transcription
- **Plus**: $29.99/mo — 10 hrs STT, learning modes, quizzes
- **Pro**: $59.99/mo — 25 hrs STT, visuals, full features

**Organization Plans:**
- **Starter**: $99/mo — Small teams (≤50 users)
- **Growth**: $249/mo — Growing organizations (≤200 users)
- **Scale**: $599/mo — Large organizations (≤1000 users)
- **Enterprise**: Custom — Unlimited, SSO, custom integrations

### 6. CTA Section
```tsx
<Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
  <Typography variant="h3">Ready to transform how you learn?</Typography>
  <Button variant="contained" color="secondary" href="/signup">
    Get Started Free
  </Button>
</Box>
```

### 7. Footer
- Links: About, Pricing, Contact, Privacy, Terms
- Social: Twitter, LinkedIn, YouTube
- © 2026 4eye.ai

---

## SEO

```tsx
export const metadata: Metadata = {
  title: '4eye.ai — AI-Powered Learning Platform',
  description: 'Transform any audio into personalized learning. Live transcription, translation, AI quizzes, visual learning modes. Learn better, understand everything.',
  keywords: ['ai learning', 'transcription', 'translation', 'learning modes', 'quizzes', 'education technology'],
  openGraph: {
    title: '4eye.ai — Learn Better. Understand Everything.',
    description: 'AI-powered learning that transforms audio into personalized learning experiences.',
    url: 'https://4eye.ai',
    type: 'website',
  },
};
```

---

## Components

| Component | Purpose |
|-----------|--------|
| Hero | Above-fold headline + CTA |
| FeatureCard | Icon + title + description |
| HowItWorks | Numbered steps with illustrations |
| PricingPreview | 3 tier cards with highlights |
| CTASection | Full-width colored CTA |
| Footer | Links, social, copyright |

---

## Mobile Considerations
- Stack hero text/buttons vertically
- 2-column → 1-column feature grid
- Sticky header with hamburger menu
- Touch-friendly button sizes (min 48px)

---

## Dependencies
- None (static page)
- W5 (for pricing link)

## Acceptance Criteria
- [ ] Hero section with clear value prop
- [ ] Features grid responsive
- [ ] Pricing preview links to full pricing
- [ ] CTA buttons link to /signup
- [ ] Mobile-responsive layout
- [ ] SEO meta tags configured
- [ ] Lighthouse score > 90
