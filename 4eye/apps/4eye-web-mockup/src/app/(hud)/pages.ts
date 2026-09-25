export interface PageMeta {
  slug: string;
  title: string;
  href: string;
  summary: string;
}

export const PAGES: PageMeta[] = [
  {
    slug: "home",
    title: "Home",
    href: "/",
    summary: "Marketing plan overview and entry point.",
  },
  {
    slug: "learn",
    title: "Learn",
    href: "/learn",
    summary: "The high-level project suite.",
  },
  {
    slug: "projects",
    title: "Projects",
    href: "/projects",
    summary: "Top features, projects, and planning model.",
  },
  {
    slug: "money",
    title: "Money",
    href: "/money",
    summary: "Revenue model, pricing, and financial strategy.",
  },
  {
    slug: "why",
    title: "Why",
    href: "/why",
    summary: "Hooks, value statements, offerings, and home page flow.",
  },
  {
    slug: "gamification",
    title: "Gamification",
    href: "/gamification",
    summary: "Engagement, rewards, and progression mechanics.",
  },
  {
    slug: "who",
    title: "Who",
    href: "/who",
    summary: "Where the product is headed.",
  },
];
