/**
 * Learning — first-class workshop concept page.
 *
 * Readable destination for the classroom loop (same role CurrencyBoard plays
 * for the economy). Expanse EDU remains the running product; this page explains
 * what you are looking at before you open it.
 */

export const LEARNING_CONCEPT = {
  id: "learning",
  title: "Learning",
  eyebrow: "Classroom loop",
  accent: "#0f766e",
  href: "/concepts/learning",
  lede:
    "How knowledge sticks in Expanse EDU: practice that returns on a schedule, goals you can argue with, and streaks that reward showing up — not spinning a slot.",
  summary: [
    "Learning is the point of the product. Coins, quests, and gear exist to make practice visible and motivating — they are not the destination.",
    "The classroom loop is simple on purpose: do work → see what counted → return before you forget → level up when the rules say so.",
    "If a reward rule cannot be stated plainly enough to argue with, it does not belong in a learning product.",
  ],
  flow: [
    {
      step: 1,
      title: "Encounter",
      blurb: "A lesson, quest, or classroom task introduces something worth keeping.",
    },
    {
      step: 2,
      title: "Practice on a schedule",
      blurb: "Spaced return — come back before memory fades, not only when a grade is due.",
    },
    {
      step: 3,
      title: "See what counted",
      blurb: "Streaks, XP, and coins make progress legible on the HUD — same bar as gamification.",
    },
    {
      step: 4,
      title: "Cement and move on",
      blurb: "Mastery unlocks the next quest tier. Recognition stays tied to real work.",
    },
  ],
  principles: [
    {
      title: "Engage is not learn",
      blurb:
        "Audio, novelty, and spectacle can raise engagement. They only count as learning when recall and transfer improve.",
    },
    {
      title: "Visible rules",
      blurb:
        "What earns XP, what breaks a streak, and what a quest requires must be readable — same honesty bar as Currency & coins.",
    },
    {
      title: "Classroom first",
      blurb:
        "Expanse EDU is the proving ground: teachers set the work, students run the loop, the store and HUD stay in sync.",
    },
    {
      title: "Many paths in",
      blurb:
        "Learn your way is the suite map — different products for different learners. This page is the shared loop underneath.",
    },
  ],
  tips: [
    {
      title: "Color carries memory",
      blurb: "Used carefully, colour organises and retains — it trains people, so treat it as UX law.",
    },
    {
      title: "Space carries meaning",
      blurb: "Position groups ideas. Minimaps and HUD bars prove that layout can teach without a paragraph.",
    },
    {
      title: "Compressed words stick",
      blurb: "Short labels that unlock meaning (cyphertext) beat walls of prose when you need recall.",
    },
  ],
  seeAlso: [
    { label: "Expanse EDU (running)", href: "/apps/expanse-edu" },
    { label: "Learn your way", href: "/4eye/learn" },
    { label: "Gamification", href: "/4eye/gamification" },
    { label: "Currency & coins", href: "/concepts/currency" },
    { label: "Top learning tips (Docs)", href: "/docs#learning-tips" },
    { label: "Command Center docs", href: "/mounted/command-center/docs" },
  ],
} as const;
