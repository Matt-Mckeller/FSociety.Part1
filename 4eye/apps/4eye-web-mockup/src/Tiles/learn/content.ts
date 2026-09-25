import type {
  HeroProps,
  FeatureCardGridProps,
  QuoteProps,
  CallToActionProps,
} from "@4eye/web/components/layout";

export const hero: HeroProps = {
  eyebrow: "Learn",
  title: "Learn your way",
  subtitle:
    "A map of the project suite — pick the product line that matches how you like to learn. For the shared classroom loop underneath (practice, quests, streaks), start at Learning in The workshop.",
};

export const projects: FeatureCardGridProps = {
  title: "What each path is for",
  items: [
    {
      title: "Expanse",
      description: "The shared operating layer the other products sit on.",
    },
    {
      title: "4eye Learning AI",
      description: "Live mode, interactivity, and accessibility — learning with assistance in the loop.",
    },
    {
      title: "School Next Generation",
      description: "Homework and school culture for the next generation of classrooms.",
    },
    {
      title: "Gamification Integrations",
      description: "Rewards, XP, growth, and the Lottie marketplace that makes progress feel tangible.",
    },
    {
      title: "Mental Health",
      description: "Mood, healing, and well-being as first-class product focus.",
    },
    {
      title: "Communication",
      description: "Helping people communicate better with each other and with AI.",
    },
    {
      title: "Marketing / 4up",
      description: "AI chat for content, brand, and pipelines — how the suite talks to the world.",
    },
  ],
};

// Folded in from the retired `/marketing-content` page — the marketing
// strategy / hooks / audience direction lives alongside Learn now so the
// minimap stays focused.
export const marketingQuote: QuoteProps = {
  quote:
    "Hooks, copy lines, audience angles, and content directions — generate SEO words, engage audio, connect data points and emotion.",
};

export const cta: CallToActionProps = {
  title: "Read the Learning loop, then open the product",
  actionLabel: "Learning concept",
  actionHref: "/concepts/learning",
  secondaryLabel: "Open Expanse EDU",
  secondaryHref: "/apps/expanse-edu",
};
