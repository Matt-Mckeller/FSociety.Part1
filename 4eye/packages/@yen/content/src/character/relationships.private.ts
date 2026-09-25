/**
 * Planner-only annotations about named people.
 *
 * WHY THIS FILE EXISTS, AND WHY NOTHING IMPORTS IT
 *
 * These values used to sit inline in `relationships.ts`. The rendering
 * component was changed to gate them behind a flag, which stopped them being
 * *displayed* — and the strings still shipped, verbatim, inside the JavaScript
 * bundle that every visitor downloads. A conditional in a component is a
 * display rule, not a privacy boundary: the data has already crossed to the
 * client by the time the condition is evaluated. `view-source` does not care
 * what the component decided.
 *
 * So the values live here instead, in a module with **no importers**. Nothing
 * in the bundle graph references it, so nothing about it reaches a browser.
 * Nothing has been deleted or reworded — this is a move, and it is reversed by
 * adding one import.
 *
 * To use these in a local planner run, import `PRIVATE_ANNOTATIONS` where the
 * entries are read and merge by id. Do not commit that import.
 */

export interface PrivateAnnotation {
  /** Free-text read on the person. */
  notes?: string;
  /** Goals attributed to the partner seat. */
  queenGoals?: string[];
  /** One-sided goals toward this person. */
  mmGoals?: string[];
}

export const PRIVATE_ANNOTATIONS: Record<string, PrivateAnnotation> = {
  "rel-queen": {
    notes:
      "Queen seat — fishing construct. Desired writing/body/goals; identity not locked. Remap when associations click. Do not treat as empty because the room is quiet.",
    queenGoals: [
      "Keep the king looking in the light and dark as she desires",
      "Attain more power and knowledge",
      "Amplify the king",
      "Utilize love to amplify learning and engagement for the king",
    ],
    mmGoals: [
      "Prevent Her Revenge. Ensure she's aligned properly for when her butterfly wings open — because I'd like to survive personally.",
      "Win Her",
      "Use Her",
      "Dominate",
    ],
  },
  "rel-emily": {
    notes:
      "Deep LoveFormula example. Gifted AGI Ribs (core + pair) and Rib Clip marketing combo. Taking over Pur Meow logo under 4up. Create/teach/help/kid tension. Relationship ambiguity stays soft.",
    mmGoals: [
      "Give her the ribs — structure that holds while she builds",
      "Pur Meow Team",
      "Combo the gift with the marketing / video clip mark",
    ],
  },
  "rel-xemocat": {
    notes: "Love-example under cover username. Protected legal name withheld. Remap-ready.",
  },
  "rel-redhead": {
    notes: "Shallow sample — first cute female dev coworker energy. Curiosity, not the plan.",
  },
  "rel-6": {
    notes: "Self-anchor on the graph.",
  },
};
