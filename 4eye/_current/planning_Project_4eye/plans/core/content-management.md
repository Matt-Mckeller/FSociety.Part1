# C7 — Content Management System

## Purpose

Establish a content management strategy that starts with JSON files and React Context providers, then evolves into a custom CMS admin UI. This approach enables rapid development while maintaining flexibility for the future CMS.

## Phased Approach

### Phase 1: JSON + Provider (MVP)

Content stored in JSON files, served through React Context providers with TypeScript type safety.

### Phase 3: Custom CMS Admin UI

Full admin interface for content management. (Intentionally skipping Phase 2 — no intermediate database-backed CMS.)

---

## Phase 1: JSON + Provider Architecture

### Content Directory Structure

```
ExpanseFrontend/
└── content/
    ├── en/                           # English content
    │   ├── landing.json              # Landing page content
    │   ├── onboarding.json           # Onboarding flows
    │   ├── legal/
    │   │   ├── privacy.json
    │   │   └── terms.json
    │   ├── features/
    │   │   ├── transcription.json
    │   │   ├── translation.json
    │   │   └── summaries.json
    │   └── verticals/
    │       ├── religion.json
    │       ├── education.json
    │       └── professional.json
    │
    ├── es/                           # Spanish content
    │   └── ... (same structure)
    │
    ├── _schema/                      # JSON Schema definitions
    │   ├── landing.schema.json
    │   └── onboarding.schema.json
    │
    └── index.ts                      # Content exports
```

### TypeScript Types

```typescript
// libs/types/src/content/index.ts

export interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    cta: {
      primary: { text: string; href: string };
      secondary: { text: string; href: string };
    };
  };
  features: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    avatar?: string;
  }>;
  pricing: {
    title: string;
    tiers: Array<{
      name: string;
      price: number;
      interval: 'month' | 'year';
      features: string[];
      cta: string;
      highlighted?: boolean;
    }>;
  };
}

export interface VerticalContent {
  id: string;
  name: string;
  displayName: string;
  description: string;
  terminology: {
    host: string;
    participant: string;
    session: string;
    room: string;
  };
  prompts: {
    summary: string;
    recap: string;
    feedback: string;
    positiveTransform: string;
  };
  features: {
    crossSourceComparison: boolean;
    visualGeneration: boolean;
    liveTranslation: boolean;
  };
}

export type SupportedLocale = 'en' | 'es' | 'fr' | 'de' | 'pt';
```

### Content Provider

```typescript
// apps/4eye/providers/ContentProvider.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { LandingContent, VerticalContent, SupportedLocale } from '@expanse/types';

interface ContentContextValue {
  locale: SupportedLocale;
  landing: LandingContent;
  vertical: VerticalContent;
  t: (key: string) => string;  // Simple translation helper
}

const ContentContext = createContext<ContentContextValue | null>(null);

interface ContentProviderProps {
  children: ReactNode;
  locale: SupportedLocale;
  landing: LandingContent;
  vertical: VerticalContent;
}

export function ContentProvider({ children, locale, landing, vertical }: ContentProviderProps) {
  const t = (key: string): string => {
    // Simple dot-notation accessor for nested content
    const keys = key.split('.');
    let value: any = { landing, vertical };
    for (const k of keys) {
      value = value?.[k];
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <ContentContext.Provider value={{ locale, landing, vertical, t }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return context;
}
```

### Loading Content (Server Components)

```typescript
// apps/4eye/lib/content.ts
import { cache } from 'react';
import type { LandingContent, VerticalContent, SupportedLocale } from '@expanse/types';

export const getContent = cache(async <T>(
  locale: SupportedLocale,
  path: string
): Promise<T> => {
  // In development, import directly from file system
  // In production, could be from CDN, API, or bundled
  const content = await import(`@content/${locale}/${path}.json`);
  return content.default as T;
});

export const getLandingContent = (locale: SupportedLocale) =>
  getContent<LandingContent>(locale, 'landing');

export const getVerticalContent = (locale: SupportedLocale, vertical: string) =>
  getContent<VerticalContent>(locale, `verticals/${vertical}`);
```

### Usage in Layout

```typescript
// apps/4eye/app/[locale]/layout.tsx
import { ContentProvider } from '@/providers/ContentProvider';
import { getLandingContent, getVerticalContent } from '@/lib/content';
import type { SupportedLocale } from '@expanse/types';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: SupportedLocale };
}) {
  const landing = await getLandingContent(locale);
  const vertical = await getVerticalContent(locale, 'religion'); // or from user preference

  return (
    <ContentProvider locale={locale} landing={landing} vertical={vertical}>
      {children}
    </ContentProvider>
  );
}
```

### Usage in Components

```typescript
// apps/4eye/components/Hero.tsx
'use client';

import { useContent } from '@/providers/ContentProvider';

export function Hero() {
  const { landing } = useContent();

  return (
    <section>
      <h1>{landing.hero.title}</h1>
      <p>{landing.hero.subtitle}</p>
      <button>{landing.hero.cta.primary.text}</button>
    </section>
  );
}
```

---

## Phase 3: Custom CMS Admin UI

### Architecture

```
apps/
├── 4eye/           # Main app (consumes content via API)
├── api/            # Backend (serves content from DB)
└── cms/            # Admin UI (manages content) — NEW
    ├── app/
    │   ├── content/
    │   │   ├── [type]/
    │   │   │   └── [id]/
    │   │   └── page.tsx
    │   ├── media/
    │   └── settings/
    └── components/
        ├── ContentEditor/
        ├── MediaLibrary/
        └── Preview/
```

### Key Features

1. **Visual Editor** — WYSIWYG editing for rich content
2. **Schema Validation** — TypeScript-defined schemas enforced
3. **Version History** — Track and rollback changes
4. **Preview** — Live preview before publishing
5. **Media Library** — Upload and manage images/videos
6. **Localization** — Side-by-side translation editing
7. **Role-Based Access** — Who can edit what

### Database Schema (TypeORM)

```typescript
@Entity()
export class ContentEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;  // 'landing', 'vertical', 'legal', etc.

  @Column()
  locale: string;

  @Column()
  slug: string;

  @Column('jsonb')
  data: Record<string, any>;

  @Column({ default: 'draft' })
  status: 'draft' | 'published' | 'archived';

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @ManyToOne(() => User)
  author: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### Migration Path (Phase 1 → Phase 3)

1. **Export JSON to DB** — Script to seed database from JSON files
2. **Update Provider** — ContentProvider fetches from API instead of JSON
3. **Dual Mode** — Feature flag to switch between JSON and DB sources
4. **Deprecate JSON** — Once CMS is stable, JSON becomes backup/seed only

---

## Content Categories

| Category | Examples | Phase 1 Location |
|----------|----------|------------------|
| Marketing | Landing page, features, pricing | `content/{locale}/landing.json` |
| Vertical Config | Terminology, prompts, feature flags | `content/{locale}/verticals/*.json` |
| Legal | Privacy, terms, compliance | `content/{locale}/legal/*.json` |
| Onboarding | Flows, tooltips, guides | `content/{locale}/onboarding.json` |
| UI Strings | Labels, buttons, errors | `content/{locale}/ui.json` |

## Integration with i18n (F3)

Content management complements but doesn't replace i18n:
- **CMS Content:** Long-form, rich content (landing pages, legal docs)
- **i18n Strings:** UI labels, error messages, short strings
- Both use the same locale structure

## Dependencies

- C6 Data Model Overview (for Phase 3 entities)
- C2 GraphQL API (for Phase 3 API)

## Outputs

### Phase 1
- [ ] Content directory structure created
- [ ] TypeScript types for all content categories
- [ ] ContentProvider implemented
- [ ] JSON files for landing, verticals, legal
- [ ] Content loading utilities

### Phase 3
- [ ] CMS admin app scaffolded
- [ ] ContentEntry entity and migrations
- [ ] GraphQL mutations for content CRUD
- [ ] Visual editor component
- [ ] Migration script from JSON to DB
