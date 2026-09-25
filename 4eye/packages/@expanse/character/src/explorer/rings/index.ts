/**
 * Ring variant registry for the character compass.
 *
 * Each entry in {@link RING_SCHEDULE} defines which ring variant to
 * show and for how long (ms). Durations are aligned to the variant's
 * internal cycle so transitions always happen at a quiet moment
 * (rings fully faded / completed).
 */

import type { JSX } from "react";
import { StarWarsRings } from "./StarWarsRings";
import { SaturnRings } from "./SaturnRings";
import { MatrixSearchRings } from "./MatrixSearchRings";
import { PacmanChomperRings } from "./PacmanChomperRings";
import { CometNavigatorRings } from "./CometNavigatorRings";

export const RING_SCHEDULE = [
  { id: "starwars", duration: 21_000 }, // 3× 7 s burst cycles  — big bang opener
  { id: "saturn",   duration: 10_400 }, // 4× 2.6 s pulses      — calm orbital
  { id: "matrix",   duration: 15_200 }, // erratic scan + slow green guide ring
  { id: "pacman",   duration:  8_800 }, // 4× 2.2 s chomping orbits
  { id: "comet",    duration: 12_000 }, // 4× 3 s comet orbits + scatter pulses
] as const;

export type RingVariantId = (typeof RING_SCHEDULE)[number]["id"];

export const RING_RENDERERS: Record<RingVariantId, () => JSX.Element> = {
  starwars: StarWarsRings,
  saturn:   SaturnRings,
  matrix:   MatrixSearchRings,
  pacman:   PacmanChomperRings,
  comet:    CometNavigatorRings,
};

export const RING_LABELS: Record<RingVariantId, string> = {
  starwars: "Star Wars · Big Bang",
  saturn:   "Saturn · Calm Pulse",
  matrix:   "Matrix · Search Scan",
  pacman:   "Pac-Man · Chomper",
  comet:    "Comet · Navigator",
};

export {
  StarWarsRings,
  SaturnRings,
  MatrixSearchRings,
  PacmanChomperRings,
  CometNavigatorRings,
};
