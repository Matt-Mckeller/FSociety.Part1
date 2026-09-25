import type {
  HeroProps,
  BulletListProps,
  QuoteProps,
  CallToActionProps,
} from "@4eye/web/components/layout";

export const hero: HeroProps = {
  eyebrow: "Culture",
  title: "The Future of Work",
  subtitle: "Expanse Culture — work that actually fits your life.",
};

export const pillars: BulletListProps = {
  eyebrow: "Culture Pillars",
  title: "What changes",
  items: [
    "Work when you want",
    "Work how much you want",
    "Positively gamified culture",
    "+Engagement, +Flexibility, +AI Integration",
    "Happier workforce, more engagement, more flexibility",
  ],
};

export const quotes: QuoteProps[] = [
  {
    quote:
      "AI makes you 10x+ more productive, so why work 80 hours a day for the same benefits?",
    attribution: "Expanse",
  },
  {
    quote:
      "Every classroom, every company, every process, every website, every city, every government, every building, every process — everything in this world can be remade, even better than it was before.",
  },
];

export const cta: CallToActionProps = {
  title: "Bring this to your team",
  actionLabel: "See Projects",
  actionHref: "/projects",
  secondaryLabel: "Marketing Content",
  secondaryHref: "/learn",
};
