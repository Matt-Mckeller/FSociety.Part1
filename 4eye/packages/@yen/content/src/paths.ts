/**
 * Path strips — the same chip display, different rankings of where to go.
 *
 * The home strip used to be one hardcoded primary path. Visitors need different
 * doors depending on why they showed up: structure, content, teach, build, the
 * person, or a deep-read of the docs. Each variant keeps the same chip chrome;
 * only the set and the label change.
 */

import { WEB4_INTRO_HREF } from "./walkthroughs";

export interface PathStop {
  label: string;
  href: string;
  accent: string;
}

export interface PathVariant {
  id: string;
  /** Short name in the type dropdown. */
  label: string;
  /** One line under the chips — why this ranking exists. */
  blurb: string;
  stops: PathStop[];
  /** Optional dashed chip after the main row (e.g. Vision). */
  aside?: PathStop;
}

export const PATH_VARIANTS: PathVariant[] = [
  {
    id: "structure",
    label: "Structure",
    blurb: "Structure first · content pulls — the cold path into the system.",
    stops: [
      { label: "Web 4", href: WEB4_INTRO_HREF, accent: "#7c3aed" },
      { label: "Profile", href: "/4eye/appRealm/profile", accent: "#0c4a39" },
      { label: "Plans", href: "/4eye-extension", accent: "#0891b2" },
      { label: "EDU", href: "/apps/expanse-edu", accent: "#14b8a6" },
      { label: "Videos", href: "/videos", accent: "#ef4444" },
    ],
    aside: { label: "Vision", href: "/vision", accent: "#5b21b6" },
  },
  {
    id: "content",
    label: "Content",
    blurb: "Engagement pull — watch, read, and show up live before picking an app.",
    stops: [
      { label: "Videos", href: "/videos", accent: "#ef4444" },
      { label: "Live", href: "/live", accent: "#dc2626" },
      { label: "Posts", href: "/posts", accent: "#ea580c" },
      { label: "Photos", href: "/photos", accent: "#d97706" },
      { label: "Series", href: "/#walkthrough", accent: "#7c3aed" },
    ],
  },
  {
    id: "teach",
    label: "Teach",
    blurb: "Learning concept first — then EDU, the workshop, and the docs that explain them.",
    stops: [
      { label: "Learning", href: "/concepts/learning", accent: "#0f766e" },
      { label: "EDU", href: "/apps/expanse-edu", accent: "#14b8a6" },
      { label: "Workshop", href: "/#group-workshop", accent: "#b45309" },
      { label: "Learning tips", href: "/docs#learning-tips", accent: "#0891b2" },
      { label: "Docs", href: "/docs", accent: "#0ea5e9" },
    ],
  },
  {
    id: "build",
    label: "Build",
    blurb: "Workshop ideas, systems underneath, and gear — for people who came to make something.",
    stops: [
      { label: "Workshop", href: "/#group-workshop", accent: "#b45309" },
      { label: "Systems", href: "/#group-systems", accent: "#1e293b" },
      { label: "Integration", href: "/integration-layer", accent: "#7c3aed" },
      { label: "Equipment", href: "/equipment", accent: "#16a34a" },
      { label: "Surfaces", href: "/surfaces", accent: "#64748b" },
    ],
  },
  {
    id: "person",
    label: "Person",
    blurb: "Matthew first — profile, character, vision, and what he is pointed at.",
    stops: [
      { label: "Profile", href: "/4eye/appRealm/profile", accent: "#0c4a39" },
      { label: "Character", href: "/4eye/appRealm/character", accent: "#4F46E5" },
      { label: "Vision", href: "/vision", accent: "#5b21b6" },
      { label: "Goals", href: "/4eye/appRealm/profile", accent: "#ff5c7a" },
      { label: "Donate", href: "/donate", accent: "#ca8a04" },
    ],
  },
  {
    id: "deep-read",
    label: "Deep read",
    blurb: "Years of documentation — start ranked, then search and sort.",
    stops: [
      { label: "Web 4", href: WEB4_INTRO_HREF, accent: "#7c3aed" },
      { label: "Docs", href: "/docs", accent: "#0ea5e9" },
      { label: "Highlights", href: "/docs#docs-highlights", accent: "#0891b2" },
      { label: "Top ranked", href: "/docs#docs-top", accent: "#6366f1" },
      { label: "Vision", href: "/vision", accent: "#5b21b6" },
    ],
  },
];

export const DEFAULT_PATH_ID = "structure";

export function getPathVariant(id: string): PathVariant {
  return PATH_VARIANTS.find((p) => p.id === id) ?? PATH_VARIANTS[0];
}
