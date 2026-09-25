/**
 * Communication-planner seats, for the planner only.
 *
 * WHY THIS FILE EXISTS, AND WHY NOTHING IMPORTS IT
 *
 * These entries used to live in `communication-intents.ts`, which is bundled
 * and shipped to the browser. `publicIntents()` filtered them at render time,
 * which meant the page did not *show* them — and the array still travelled to
 * every visitor inside the JavaScript, names and all, readable in devtools. A
 * runtime filter is a display rule; it is not a boundary.
 *
 * Six real people are named here, with what is wanted from each. There is no
 * framing of that which is safe to publish by accident.
 *
 * Nothing is deleted or reworded. The entries are unchanged and live in a
 * module with no importers, so nothing about them reaches a browser. Import
 * `PRIVATE_COMMUNICATION_INTENTS` locally when working on the planner; do not
 * commit that import.
 */

import type { CommunicationIntent } from "./communication-intents";

export const PRIVATE_COMMUNICATION_INTENTS: CommunicationIntent[] = [
  {
    id: "intent-emiru",
    name: "QueenSeat",
    username: "queenseat",
    profileId: "PROFILE_EMIRU",
    intent:
      "Inference to fish + legitimate remapping. Desired writing/body/goals — identity not locked. Queen aims: light/dark for the king as she desires, team, amplify him via love → learning, power/knowledge, shared World/Food/Health.",
    framing: "creator",
    privacy: "soft",
    mediums: ["stream", "social"],
    notes:
      "Queen seat. Amplify the king · team · World/Food/Health. Cats · combined life. Remap when associations click. Sampling stays soft/secondary.",
  },
  {
    id: "intent-emily",
    name: "Emily Cart",
    username: "emily_88",
    profileId: "PROFILE_EMILY",
    intent:
      "Deep LoveFormula-aligned bond — teach, create, help, gift AGI Ribs, hand Pur Meow under 4up, clarify kid/career and relationship.",
    framing: "desired",
    privacy: "soft",
    mediums: ["content", "games", "social", "video"],
    agiMark: "is AGI RIB",
    notes:
      "Grow/create content, teach/raise gamers, help food/children, learning + games. Received ribs + Rib Clip. Pur Meow logo takeover under 4up. Relationship ambiguity stays friends-soft.",
  },
  {
    id: "intent-xemocat",
    name: "xEmoCat",
    username: "xEmoCat",
    profileId: "PROFILE_XEMOCAT",
    intent: "Love-example seat under cover username. Bond without outing the protected name.",
    framing: "desired",
    privacy: "soft",
    mediums: ["social"],
    notes: "Protected name withheld on purpose. Remap-ready when identity clarifies.",
  },
  {
    id: "intent-redhead",
    name: "Redhead Shorty",
    username: "redhead_shorty",
    profileId: "PROFILE_REDHEAD",
    intent: "Shallow sample — warm work-crush energy, not a life plan.",
    framing: "peer",
    privacy: "soft",
    mediums: ["work"],
    agiMark: "maybe was PC AGI",
    notes: "First cute female dev coworker read. Keep shallow.",
  },
  {
    id: "intent-bonnie",
    name: "Bonnie",
    profileId: "PROFILE_BONNIE",
    intent: "Clarify interest and the shape of a real conversation.",
    framing: "desired",
    privacy: "soft",
    mediums: ["social"],
  },
  {
    id: "intent-amelia",
    name: "Amelia",
    intent:
      "Held dark. Multiple mediums already crossed; framing not locked for publish.",
    framing: "marriage-lesson",
    privacy: "dark",
    mediums: ["multiple"],
    notes:
      "Do not render on public yen. Options still open: peer, info-gatherer, coincidence, marriage-lesson. Raise privacy only after Matthew locks framing.",
  },
];
