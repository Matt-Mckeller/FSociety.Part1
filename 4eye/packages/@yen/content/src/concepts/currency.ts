/**
 * Currency & coins — first-class concept page content.
 *
 * Migrated out of the Web 4 monolith so technical / workshop surfaces can link
 * here instead of deep-anchoring into a long essay. The essay stays available
 * as archive; this module is the readable destination for the economy story.
 */

export const CURRENCY_CONCEPT = {
  id: "currency",
  title: "Currency & coins",
  eyebrow: "Economy",
  accent: "#7c3aed",
  href: "/concepts/currency",
  lede:
    "What earns, what it is worth, and how a currency inside a learning product avoids becoming a slot machine.",
  nameNote:
    "Working names have been xCoins and yCoins — not locked. yCoins reads cleaner; x and y both gesture at the human axis. Call them coins until the name earns itself.",
  summary: [
    "Coins are a core loop of the product: earn as you go, hold them in a wallet, see them on the HUD, spend them in classrooms and on features.",
    "Earn from rewardable activity (completed work, reviews, feedback, exploration). Spend on rewards, recognition, feature unlocks, and AI credit top-ups inside the apps.",
    "There is not one coin. Different systems can mint different kinds — the wallet and HUD still need to make the balance legible.",
  ],
  flow: [
    {
      step: 1,
      title: "Observe rewardable activity",
      blurb: "LMS or product events (submissions, completions) are noted and tracked.",
    },
    {
      step: 2,
      title: "Student reviews activity",
      blurb: "The learner sees what counted, before anything is claimed.",
    },
    {
      step: 3,
      title: "Redeem for rewards",
      blurb: "Rewardable events convert into coins, loot, and recognition.",
    },
    {
      step: 4,
      title: "Purchase and explore",
      blurb: "Spend in classroom stores, unlock features, buy more runway (e.g. AI credits).",
    },
  ],
  principles: [
    {
      title: "Visible rules",
      blurb: "What earns and what it costs must be stated plainly enough to argue with — same bar as gamification.",
    },
    {
      title: "Not a slot machine",
      blurb: "Currency inside learning is utility and recognition, not random dopamine. Rewards track work, not spins.",
    },
    {
      title: "Wallet on the HUD",
      blurb: "Balance lives where the person already looks — status chrome, not a buried ledger page.",
    },
    {
      title: "Classroom first",
      blurb: "Expanse EDU is the concrete proving ground: observe → reward → redeem → fly.",
    },
  ],
  seeAlso: [
    { label: "Money (revenue model)", href: "/4eye/money" },
    { label: "Gamification (running)", href: "/4eye/gamification" },
    { label: "Command Center · reward system", href: "/mounted/command-center/docs/documentation?section=reward-system" },
    { label: "Donate · future currency stance", href: "/donate#currency" },
    { label: "Web 4 intro (video)", href: "/videos#web4-plan-walkthrough" },
  ],
  shots: [
    { src: "/media/docs-shots/4eye-money.png", alt: "Money surface in 4eye" },
    {
      src: "/media/docs/web4__web-4-projects-story-whoami-whoarewe/31.png",
      alt: "Core product flow and economy foundation — observe, reward, fly",
    },
    {
      src: "/media/docs/web4__web-4-projects-story-whoami-whoarewe/32.png",
      alt: "Rewards concepts — redeeming and purchasing",
    },
  ],
} as const;

export type CurrencyConcept = typeof CURRENCY_CONCEPT;
