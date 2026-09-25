import type {
  HeroProps,
  BulletListProps,
  QuoteProps,
  CallToActionProps,
} from "@4eye/web/components/layout";

export const hero: HeroProps = {
  eyebrow: "Strategy",
  title: "Marketing Strategy",
  subtitle:
    "Top areas, top strategies, and the positioning that ties it all together.",
};

export const topAreas: BulletListProps = {
  eyebrow: "Top Marketing Areas",
  title: "Where we focus",
  items: [
    "Mental Health & Healing",
    "Growth & Learning",
    "Internationalization & ESL Support",
    "Accessibility",
    "Rewards, Gamification, and Motivation",
    "Culture, Stories, and Identity",
    "Communication & Mind Mastery",
    "Protection From AI",
  ],
};

export const topStrategies: BulletListProps = {
  eyebrow: "Top Strategies",
  title: "How we go to market",
  items: ["Influencers"],
};

export const positioningQuote: QuoteProps = {
  quote:
    "Protect yourself from AI, learn how it can guide you, and learn how to master your own mind.",
  attribution: "Positioning",
};

export const cta: CallToActionProps = {
  title: "See how it shows up on the home page",
  actionLabel: "Why",
  actionHref: "/why",
  secondaryLabel: "Marketing Content",
  secondaryHref: "/learn",
};
