import type {
  HeroProps,
  BulletListProps,
  FeatureCardGridProps,
  QuoteProps,
  CallToActionProps,
} from "@4eye/web/components/layout";

export const hero: HeroProps = {
  eyebrow: "Why",
  title: "Unlock your potential, and multiply yourself.",
  subtitle: "A walkthrough of the home page experience and its core hooks.",
};

export const hooks: BulletListProps = {
  eyebrow: "Hook Lines",
  title: "Value statements",
  items: [
    "Amplify your human",
    "Improve your relationships",
    "Improve your communication — and get what you want in life.",
    "Improve your humans",
    "Improve yourself",
  ],
};

export const progress: BulletListProps = {
  eyebrow: "4Eye, The Human AI",
  title: "Learn. Earn. Enjoy.",
  items: [
    { primary: "Learn More.", secondary: "Maximize learning across every context." },
    { primary: "Earn More.", secondary: "Apply skills, climb levels, gain rewards." },
    { primary: "Enjoy More.", secondary: "Engagement that doubles as entertainment." },
  ],
};

export const goals: FeatureCardGridProps = {
  eyebrow: "Our Offerings",
  title: "Goal sections",
  subtitle:
    "Grow, Heal, Protect, Learn, Achieve, Earn — choose what aligns with you.",
  columns: { xs: 12, sm: 6 },
  items: [
    { title: "Learn Optimally", description: "Tailored to your style and goals." },
    { title: "Amplify Humans", description: "Make every person more capable." },
    {
      title: "Multiply your Mind",
      description: "Stack tools that compound your thinking.",
    },
    {
      title: "Master AI",
      description: "Lead the tools instead of being led by them.",
    },
  ],
};

export const maximizedLearning: BulletListProps = {
  eyebrow: "Maximized Learning",
  title: "Anywhere learning happens",
  items: ["In Person or Online", "School", "Online", "Life", "Work", "Groups & Events"],
};

export const futureTypes: BulletListProps = {
  eyebrow: "The Future Of…",
  title: "Choose your interest type",
  subtitle:
    "Toggle between perspectives to see the future that aligns with you.",
  items: ["School", "Learning", "Healing", "Work", "Life"],
};

export const transitionQuote: QuoteProps = {
  quote: "Won, you have. Welcome to 4eye.",
  attribution: "Transition Out",
};

export const hudRequirements: BulletListProps = {
  eyebrow: "Requirement",
  title: "4eye Chat appears on HUD",
  items: [
    "4eye asks whether the user wants to select a role or navigate directly to a screen.",
    "Accepts any input type and recommends selecting a role first.",
    "Explains that users gain coins from interactions across the site.",
    "Coins can be used to claim rewards after sign-up via the Game Menu.",
    "Game Menu flashes on the HUD when first available to a new user.",
    "Navigation is restricted during this introductory phase.",
  ],
};

export const offerings: FeatureCardGridProps = {
  title: "Top Offerings",
  items: [
    {
      title: "Accessibility",
      description: "Inclusive design that meets every user where they are.",
    },
    {
      title: "Control Your Mind",
      description:
        "Learn how you think, figure out who you are, act with intention.",
    },
    {
      title: "Rewards & Incentives",
      description: "Gamification and rewards from sponsors at every level.",
    },
    {
      title: "Improve Communication",
      description:
        "Better conversations, higher wages, more influence with intent.",
    },
    {
      title: "Improved Atmosphere",
      description: "Think positively, understand others, understand yourself.",
    },
    {
      title: "Competition & Battles",
      description: "Optional regional, local, and classroom leaderboards.",
    },
    {
      title: "Mental Health & Healing",
      description: "Tips, tactics, and animations that support mood shifts.",
    },
    {
      title: "Internationalization & ESL",
      description: "Live translations and content tailored to each member.",
    },
    {
      title: "Vision & Glasses",
      description: "Future-facing visual experiences.",
    },
    {
      title: "Food & Daily Life Support",
      description: "Real-world support woven into your routine.",
    },
    {
      title: "Become an Entrepreneur",
      description: "Build content, brand, business — uncover AI by playing.",
    },
  ],
};

export const communicationValue: BulletListProps = {
  eyebrow: "Improve Communication",
  title: "What you gain",
  items: [
    "Make conversation more interesting and teach friends",
    "Earn higher wages with AI communication skills",
    "Influence people toward your goals",
  ],
};

export const atmosphereValue: BulletListProps = {
  eyebrow: "Improved Atmosphere",
  title: "Improve your ability to…",
  items: ["Think positively", "Understand others", "Understand yourself"],
};

export const cta: CallToActionProps = {
  title: "Ready to amplify your human?",
  subtitle: "Join 4eye and start earning, learning, and enjoying.",
  actionLabel: "Sign Up",
  actionHref: "/signup",
  secondaryLabel: "Who",
  secondaryHref: "/who",
};

// =============================================================================
// Learning AI (moved from security-privacy)
// =============================================================================

export const learningAiFeatures: FeatureCardGridProps = {
  title: "Learning AI features",
  subtitle: "Live mode, interactivity, accessibility, and engagement built in.",
  columns: { xs: 12, sm: 6, md: 4 },
  items: [
    {
      title: "Live Mode",
      description: "View slide content as HTML, interactively, presented by you.",
    },
    {
      title: "Interactivity",
      description:
        "Translate, expand, summarize, and research right from the slide.",
    },
    {
      title: "Accessibility",
      description: "Language translations and concise modes for every learner.",
    },
    {
      title: "Enhanced Learning",
      description:
        "Visual transformations, stories, custom learning components, and content creation.",
    },
    {
      title: "Increased Engagement",
      description:
        "Interactive content with competition, growth, and recognition.",
    },
    {
      title: "Improved Mood",
      description: "Rewards, recognition, and high-quality engaging content.",
    },
  ],
};

export const customization: BulletListProps = {
  eyebrow: "Tailored to you",
  title: "What we help you with",
  items: [
    "Reading and writing skills — leveled up",
    "AI Skill — improve how you work with AI",
    "Tell a story of where you want to be in life",
    "Update your status from sad to happy",
    "Push yourself to master subjects from all angles",
    "Recognized accomplishments and shareable profiles",
  ],
};

export const gamified: BulletListProps = {
  eyebrow: "Gamified Integration",
  title: "Just by playing",
  items: [
    "Be immersed in a positive learning environment",
    "Learn what popular figures of all time valued",
    "Improve communication and social networking",
    "Learn associative and symbolic thinking",
    "Earn in-game currency and crypto rewards",
  ],
};

export const appeals: BulletListProps = {
  eyebrow: "Strategy & Appeals",
  title: "How we connect",
  items: [
    "Emotional appeal",
    "Made for your students — catered to their interests and age groups",
    "Internationalization",
    "Boredom + ESL framing for empathy with disengaged learners",
  ],
};

export const audience: BulletListProps = {
  eyebrow: "Target Audience Angles",
  title: "Who we’re talking to",
  items: [
    "Teachers learning AI for their present and their future",
    "Students learning AI for their present and their future",
    "All users learning Web & AI naturally by using the app",
  ],
};

export const social: BulletListProps = {
  eyebrow: "Social & Social Media",
  title: "Reach & community",
  subtitle: "Placeholder — fill in social channels, audience reach, and community plays.",
  items: [
    "TBD — platform mix and primary channels",
    "TBD — community formats (creators, classrooms, study groups)",
    "TBD — sharing & invitation loops",
  ],
};

// =============================================================================
// Offering groupings (for accordion view on the Offerings tab)
// =============================================================================

export interface OfferingGroup {
  id: string;
  title: string;
  summary: string;
  items: { title: string; description: string }[];
}

export const offeringGroups: OfferingGroup[] = [
  {
    id: "mind-and-communication",
    title: "Mind & Communication",
    summary: "Sharper thinking, better conversations, more influence.",
    items: [
      {
        title: "Control Your Mind",
        description:
          "Learn how you think, figure out who you are, act with intention.",
      },
      {
        title: "Improve Communication",
        description:
          "Better conversations, higher wages, more influence with intent.",
      },
      {
        title: "Improved Atmosphere",
        description:
          "Think positively, understand others, understand yourself.",
      },
    ],
  },
  {
    id: "health-and-healing",
    title: "Health & Healing",
    summary: "Mood-shifting tools woven into your daily life.",
    items: [
      {
        title: "Mental Health & Healing",
        description:
          "Tips, tactics, and animations that support mood shifts.",
      },
      {
        title: "Food & Daily Life Support",
        description: "Real-world support woven into your routine.",
      },
    ],
  },
  {
    id: "growth-and-rewards",
    title: "Growth & Rewards",
    summary: "Compete, climb, earn — and turn play into income.",
    items: [
      {
        title: "Rewards & Incentives",
        description: "Gamification and rewards from sponsors at every level.",
      },
      {
        title: "Competition & Battles",
        description:
          "Optional regional, local, and classroom leaderboards.",
      },
      {
        title: "Become an Entrepreneur",
        description:
          "Build content, brand, business — uncover AI by playing.",
      },
    ],
  },
  {
    id: "reach-and-accessibility",
    title: "Reach & Accessibility",
    summary: "A product that meets every user where they are.",
    items: [
      {
        title: "Accessibility",
        description:
          "Inclusive design that meets every user where they are.",
      },
      {
        title: "Internationalization & ESL",
        description:
          "Live translations and content tailored to each member.",
      },
      {
        title: "Vision & Glasses",
        description: "Future-facing visual experiences.",
      },
    ],
  },
];
