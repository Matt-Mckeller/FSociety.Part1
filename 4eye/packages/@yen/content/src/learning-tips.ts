/**
 * Top learning tips — Color, Spatial, Cyphertext, Improved Navigation.
 *
 * Sourced from the Web 4 plan (§ Improved Navigation & Human Guidance) and the
 * old Command Center strategic-focus surface. Meant for Docs Lenses and a
 * short video chain, not as a restatement of the whole essay.
 */

const WEB4 = "/docs/web4/web-4-projects-story-whoami-whoarewe";

export interface LearningTip {
  id: string;
  title: string;
  blurb: string;
  href: string;
  tags: string[];
  /** Running demo when one exists. */
  seeAlso?: { label: string; href: string };
}

export const LEARNING_TIPS: LearningTip[] = [
  {
    id: "color-is-powerful",
    title: "Color is Powerful",
    blurb:
      "Organisation, retention, mood, and identity — colour as UX law, used carefully because it trains people.",
    href: `${WEB4}#color-is-powerful-learn-ux-ux-law`,
    tags: ["Learn", "UX", "UX_LAW"],
  },
  {
    id: "spatial-is-powerful",
    title: "Spatial is Powerful",
    blurb:
      "Position carries meaning. Group more with less space; minimaps and HUD bars are the proof.",
    href: `${WEB4}#spatial-is-powerful-cyphertext-is-powerful`,
    tags: ["Learn", "UX", "ImportantForTheFuture"],
    seeAlso: {
      label: "HUD resource bars (Storybook)",
      href: "/apps/storybook",
    },
  },
  {
    id: "cyphertext-is-powerful",
    title: "Cyphertext is Powerful",
    blurb:
      "Words that compress, unlock, and group — opacity and position as tools for memory and teaching.",
    href: `${WEB4}#spatial-is-powerful-cyphertext-is-powerful`,
    tags: ["Learn", "UX"],
  },
  {
    id: "improved-navigation",
    title: "Improved Navigation & Human Guidance",
    blurb:
      "Strategic focus nesting and human guidance — the compass reading that used to live at Command Center /insights/strategic-focus.",
    href: `${WEB4}#improved-navigation-amp-human-guidance`,
    tags: ["Learn", "Navigation"],
    seeAlso: {
      label: "Command Center strategic focus",
      href: "/apps/command-center",
    },
  },
];
