/**
 * Seeding — store interface + stub implementation (D-S8).
 *
 * The UI and provider depend ONLY on {@link SeedStore}. Today the concrete
 * impl is {@link StubStore} (in-memory, hydrated from the fixture). When the
 * shared entity store from `_current.md` lands, swap the impl here — no UI
 * or provider changes required.
 */

import type { CreateState } from "./CreateProvider";
import {
  GOALS,
  GOAL_LINKS,
  PROJECTS,
  SCENES,
  SEEDS,
  SEQUENCES,
} from "./seed-data";

export interface SeedStore {
  /** Hydrate full state. */
  load(): Promise<CreateState>;
  /** Persist full state (stub: no-op). */
  save(state: CreateState): Promise<void>;
}

/** In-memory store backed by the bundled fixture. */
export class StubStore implements SeedStore {
  async load(): Promise<CreateState> {
    return {
      projects: structuredClone(PROJECTS),
      sequences: structuredClone(SEQUENCES),
      scenes: structuredClone(SCENES),
      goals: structuredClone(GOALS),
      seeds: structuredClone(SEEDS),
      goalLinks: structuredClone(GOAL_LINKS),
      selectedProjectId: PROJECTS[0]?.id,
      selectedSequenceId: SEQUENCES[0]?.id,
      selectedSceneId: SCENES[0]?.id,
    };
  }

  async save(): Promise<void> {
    // no-op in the stub; real impl persists to the shared entity store.
  }
}

/** Synchronous initial state for SSR / Storybook (no async flash). */
export function initialCreateState(): CreateState {
  return {
    projects: structuredClone(PROJECTS),
    sequences: structuredClone(SEQUENCES),
    scenes: structuredClone(SCENES),
    goals: structuredClone(GOALS),
    seeds: structuredClone(SEEDS),
    goalLinks: structuredClone(GOAL_LINKS),
    selectedProjectId: PROJECTS[0]?.id,
    selectedSequenceId: SEQUENCES[0]?.id,
    selectedSceneId: SCENES[0]?.id,
  };
}
