/**
 * The crown's shape, derived from the registry rather than authored.
 *
 * The crown is not decoration bolted onto the home page — it is a reading of
 * the page. Its five points are the five products, in the same order and at the
 * same angles the compass already places them, and its bands are the five
 * groups of the application grid, stacked in the order the grid presents them.
 * So the transform is honest: nothing appears that was not already on screen,
 * and every part of the crown answers "what is this?" by pointing at something.
 *
 * Deliberately free of React and of `three`. Both the 3D scene and the flat
 * fallback read this, and the fallback must not drag a renderer along with it.
 */

import { APP_GROUPS, appsInGroup, type AppEntry } from "@yen/content";

/**
 * The products, in registry order.
 *
 * There are five, which is why the crown has five points — the silhouette was
 * chosen to fit the set rather than the set trimmed to fit a silhouette. If a
 * sixth product is ever registered the crown grows a point; nothing here needs
 * changing for that to work.
 */
export const CROWN_PRODUCTS: AppEntry[] = appsInGroup("products");

export interface CrownSpire {
  app: AppEntry;
  /**
   * Radians around the vertical axis, 0 = front-centre.
   *
   * The compass places its first point at the top of the dial and steps
   * clockwise; in three dimensions that top point is the one facing the reader.
   * Keeping the same ordering is what makes the transform read as *these
   * objects moving* rather than as one picture dissolving into another.
   */
  angle: number;
  /** Height as a fraction of the tallest spire. */
  height: number;
}

/**
 * Front-centre is tallest and the shoulders fall away — the same silhouette as
 * the 2D crown, whose five tips sit at y = 56, 50, 40, 50, 56.
 */
export const SPIRES: CrownSpire[] = CROWN_PRODUCTS.map((app, i, all) => {
  const turn = i / all.length;
  /** 0 at the front, 1 directly behind. */
  const fromFront = Math.min(turn, 1 - turn) * 2;
  return {
    app,
    angle: turn * Math.PI * 2,
    height: 1 - 0.42 * fromFront,
  };
});

export interface CrownBand {
  id: string;
  title: string;
  /** The group's lead accent — the colour its first tile already carries. */
  accent: string;
  /** How far up the crown the band sits, 0 (base) to 1 (below the tips). */
  rise: number;
  /** Band radius as a fraction of the base radius. */
  radius: number;
  /** How many applications the band stands for. Shown in the picker. */
  count: number;
}

/**
 * One band per group, flaring outward as it rises — a coronet, not a cone.
 *
 * The stack is the grid read upward, so the order inverts: About sits at the
 * base, narrow and quiet, and the Products band is the widest and highest. The
 * spires then stand on the Products band, which is the whole argument of the
 * page in one shape — everything underneath supports the products, and the
 * products are the points.
 *
 * The alternative, products at the base tapering to About at the crest, was
 * tried and reads backwards: it puts the least important group where the eye
 * lands and leaves the five spires standing outside the stack with nothing
 * holding them up.
 */
export const BANDS: CrownBand[] = APP_GROUPS.map((group, i, all) => {
  const apps = appsInGroup(group.id);
  /** 0 for the first group in the grid, 1 for the last. */
  const step = all.length > 1 ? i / (all.length - 1) : 0;
  return {
    id: group.id,
    title: group.title,
    accent: apps[0]?.accent ?? "#7c3aed",
    rise: 0.94 - step * 0.82,
    radius: 1 - step * 0.3,
    count: apps.length,
  };
});

/** The band the spires stand on — the first group in the grid, at the crest. */
export const CREST_BAND: CrownBand = BANDS[0];

/**
 * The regalia palette.
 *
 * Shared with the 2D crown's `amethyst` variant so the flat fallback and the
 * rendered object are the same object. Changing a colour here changes both.
 */
export const CROWN_COLORS = {
  /** Body, tip to base. */
  stoneLight: "#d8b4fe",
  stone: "#a855f7",
  stoneDeep: "#4c1d95",
  black: "#0a0a0f",
  /** Flame, edge to core. */
  flameEdge: "#b06cff",
  flameCore: "#7a2cff",
  /** The LED trace and the mounted stone. */
  led: "#f3e8ff",
  diamond: "#e9d5ff",
} as const;
