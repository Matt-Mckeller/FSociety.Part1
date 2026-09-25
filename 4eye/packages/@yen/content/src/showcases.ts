/**
 * Detail for apps that are real but still live in their original repo.
 *
 * Kept out of `./apps` deliberately. That module is imported by every page, so
 * anything added to it ships in every bundle; this prose is only ever needed by
 * the one `/apps/[slug]` route, which imports this module directly.
 */

import {
  COMMUNICATION_INTENTS,
  publicIntents,
  type CommunicationIntent,
} from "./communication-intents";

export interface ShowcaseConcept {
  title: string;
  /** What the concept is, in one or two sentences. */
  blurb: string;
}

export interface ShowcaseDocLink {
  title: string;
  href: string;
  /** Why this document is the right next click. */
  blurb: string;
}

export interface AppShowcase {
  /** Where the source lives today, relative to the Projects root. */
  source: string;
  /** Stack, one line. */
  stack: string;
  /** Rough size, so the tile is not the only signal of substance. */
  scale: string;
  /** What it does. Only claims that hold up against the source. */
  highlights: string[];
  /** What porting it here would involve. */
  portNote: string;
  /**
   * Why the entry carries the rarity its registry entry claims.
   *
   * Only set on entries with a `rarity`. A rarity with no argument behind it is
   * a sticker; this is the argument, and it should be checkable.
   */
  valueNote?: string;
  /**
   * Named ideas that make this app distinct — denser than a bullet list,
   * lighter than sending someone into a full plan document.
   */
  concepts?: ShowcaseConcept[];
  /**
   * Published documentation worth reading for this app. Prefer yen `/docs/...`
   * routes so the links stay inside the site.
   */
  docs?: ShowcaseDocLink[];
  /**
   * Relationship / communication intents already filtered for public render.
   * Dark entries never appear here — see `communication-intents.ts`.
   */
  intents?: CommunicationIntent[];
}

export const SHOWCASES: Record<string, AppShowcase> = {
  lottie: {
    source: "ExpanseFrontend/apps/lottie-studio + scripts/lottie",
    stack: "React frontend, Node backend, shared types",
    scale: "Studio app plus a four-stage naming pipeline",
    highlights: [
      "AI-assisted naming, metadata generation and theme creation for animations.",
      "Pipeline scripts: analyze, generate names, apply names, validate.",
      "Theme generation turns one animation into a family, so a single asset has variants that stay recognisably the same asset.",
      "Plan documents already ingested and readable under Documentation.",
    ],
    portNote:
      "The docs are already in. The studio front end is small and would move cleanly; the walkthrough video slot is still waiting on your recording.",
    valueNote:
      "Everything else here produces software — useful, and worth nothing on its own once you stop running it. This produces assets: an animation with a stable name, a generated theme family, and provenance is a thing a person can own, display on their profile, and hand to someone else. That is the only output in the set that keeps its value outside the system that made it, which is what legendary is reserved for.",
  },
  "expanse-services": {
    source: "ExpanseFrontend/apps/expanse-services",
    stack: "Next 14 + React 18",
    scale: "154 components",
    highlights: [
      "Company site for software development services — not a personal resume (converted from PersonalNext; domain expanseservices.com).",
      "Shop for fixed-price services and reusable components, with public pricing and account-gated checkout.",
      "Coin wallet: Stripe buys coins, coins buy work — a lightweight economy instead of opaque consulting quotes.",
      "Culture and workforce angle: flexible, gamified engagement and AI-augmented productivity (“Future of Work”).",
      "Portfolio mixes client delivery (Clever, LexisNexis, MDU, NRG, REM) with internal products (4eye, Command Center, Lottie).",
      "Planned boosts beyond a typical agency site: store, gamification demos, AI chat / knowledge base, EN+ES i18n.",
      "Already a Next app on the same major as yen, so it ports by moving rather than rewriting — blocked here by GraphQL-at-build until an API runs.",
    ],
    concepts: [
      {
        title: "Services company, not portfolio",
        blurb:
          "The public face of Expanse as a business line: sell software work and components under the company brand. Personal resume content is deliberately retired.",
      },
      {
        title: "Fixed-price shop + coin economy",
        blurb:
          "Browse prices without an account; pay with coins purchased through Stripe. That is the wedge — transparent catalog commerce instead of “schedule a call for a quote.”",
      },
      {
        title: "Culture as product surface",
        blurb:
          "Work-when-you-want / how-much-you-want, positively gamified culture, and AI as a 10× productivity lever. Same motivation model is planned for hiring people onto project segments.",
      },
      {
        title: "Fastest path to revenue",
        blurb:
          "Among the product family, this is the consulting and shop front aimed at money soonest — website, enrollment, automated marketing — while EDU and 4eye carry the longer product bets.",
      },
      {
        title: "Old vs new posture",
        blurb:
          "Marketing voice that treats outdated sites and processes as the problem to remake — every company, website, and workflow can be rebuilt better.",
      },
    ],
    portNote:
      "Same major Next version as yen. Cheapest substantial port on the list once a GraphQL API answers at build time (fifteen pages fail static export without one). Email templates for launch live with this source tree.",
    docs: [
      {
        title: "Expanse Services — Software Development (milestone)",
        href: "/docs/milestones/expanse-services",
        blurb: "One-page overview: MVP (website, automated marketing, enrollment) and boosts (shop, gamification).",
      },
      {
        title: "Website relaunch plan",
        href: "/docs/frontend-planning/expanse-services-website-plan",
        blurb: "Full product plan: branding, coin economy, shop, AI chat, i18n, and the PersonalNext → company-site conversion.",
      },
      {
        title: "Backend plan",
        href: "/docs/frontend-planning/expanse-services-backend-plan",
        blurb: "Coin e-commerce, orders, AI chat, and how Services extends the existing Expanse backend.",
      },
      {
        title: "Website update plan",
        href: "/docs/frontend-planning/expanse-services-website-update-plan",
        blurb: "Portfolio mix, gamification showcase, booking flow, and alignment with corporate vision.",
      },
      {
        title: "Personal → business conversion",
        href: "/docs/frontend-planning/website-business-conversion-plan",
        blurb: "What to keep, remove, or revoice when PersonalNext becomes the Expanse Services site.",
      },
      {
        title: "Culture page",
        href: "/docs/product-plans/culture-page-expanse-services",
        blurb: "Future-of-work culture notes that define the Expanse Services tone.",
      },
    ],
  },
  "communication-planner": {
    source: "ExpanseFrontend/apps/communication-planner",
    stack: "Next.js · MUI",
    scale: "Framed from its own repo",
    highlights: [
      "Clarifies channels, timing, and relationship intent — not a CRM dump.",
      "Yen frames the real app; the embed build swaps in a public demo session.",
      "Dark names stay out of this site — they never leave the local planner.",
    ],
    portNote:
      "Mounted at /apps/communication-planner. A static route wins over this showcase when the page file is present.",
  },
};

/** Showcase for communication-planner with public intents attached at read time. */
export function getShowcase(id: string): AppShowcase | undefined {
  const base = SHOWCASES[id];
  if (!base) return undefined;
  if (id === "communication-planner") {
    return {
      ...base,
      intents: publicIntents(COMMUNICATION_INTENTS),
    };
  }
  return base;
}

export function showcaseIds(): string[] {
  return Object.keys(SHOWCASES);
}
