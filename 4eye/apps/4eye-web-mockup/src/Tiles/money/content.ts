import type {
  HeroProps,
  BulletListProps,
  CallToActionProps,
} from "@4eye/web/components/layout";

export const hero: HeroProps = {
  eyebrow: "Money",
  title: "Revenue model and financial strategy",
  subtitle: "How 4eye creates value and sustains growth.",
};

export const model: BulletListProps = {
  eyebrow: "Revenue Model",
  title: "How we earn",
  items: [
    "Subscription tiers for learners and institutions",
    "Marketplace revenue from Lottie creators and asset packs",
    "Gamification premium upgrades and coin bundles",
    "Enterprise licensing for schools and organizations",
  ],
};

export const cta: CallToActionProps = {
  title: "See our full project suite",
  actionLabel: "Projects",
  actionHref: "/projects",
  secondaryLabel: "Why",
  secondaryHref: "/why",
};
