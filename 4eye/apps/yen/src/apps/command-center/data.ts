/**
 * The data the Strategic Compass reads, and the shapes it reads it through.
 *
 * In the Command Center these come from `StrategicContext` and `RoadmapContext`,
 * but both contexts only re-export the JSON unchanged — the compass never uses
 * the provider. Importing the JSON directly keeps the port to the compass and
 * its data rather than dragging two contexts and the app shell along with it.
 */

import corporateVisionData from "./data/corporateVision.json";
import legendData from "./data/legend.json";
import strategicCompassData from "./data/strategicCompass.json";
import operatingPrinciplesData from "./data/operatingPrinciples.json";
import roadmapData from "./data/roadmap.json";

export { corporateVisionData, legendData, strategicCompassData, operatingPrinciplesData, roadmapData };

/** A thing the strategy steers by. */
export interface NavigationalVariable {
  id: string;
  title: string;
  description?: string;
  type: "advantage" | "opportunity" | "strategy" | "insight";
}

/**
 * Only the part of the roadmap the compass touches. The full type in the
 * Command Center carries phases, milestones, projects and ongoing items; the
 * compass reads none of them.
 */
export interface Roadmap {
  navigationalVariables?: NavigationalVariable[];
}
