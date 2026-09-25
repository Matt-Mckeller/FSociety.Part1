/**
 * Shared planning model — in-memory store.
 *
 * Pure, framework-free store for entities + relationships + goal links, built
 * on the shared ECS types from `@4eye/types` (planning module). Consumed by the
 * Command Center tile, the in-app Planning tile, and the website Projects page.
 *
 * This is intentionally separate from `Tiles/create/model/*` (owned elsewhere);
 * it is the shared, generic model the Entity System plan describes.
 */

import type {
  Entity,
  GoalLink,
  Relationship,
} from "@4eye/types";

export interface PlanningData {
  entities: Entity[];
  relationships: Relationship[];
  goalLinks: GoalLink[];
}

/**
 * Minimal read-oriented store. Reducer/mutation wiring is added by the tile
 * (React Context + useReducer); this class is the pure data access layer.
 */
export class PlanningStore {
  private readonly entitiesById = new Map<string, Entity>();
  private readonly relationships: Relationship[];
  private readonly goalLinks: GoalLink[];

  constructor(data: PlanningData) {
    for (const e of data.entities) this.entitiesById.set(e.id, e);
    this.relationships = data.relationships;
    this.goalLinks = data.goalLinks;
  }

  getEntity(id: string): Entity | undefined {
    return this.entitiesById.get(id);
  }

  allEntities(): Entity[] {
    return [...this.entitiesById.values()];
  }

  entitiesOfType(type: string): Entity[] {
    return this.allEntities().filter((e) => e.type === type);
  }

  /** Outgoing edges from an entity, optionally filtered by relationType. */
  edgesFrom(id: string, relationType?: string): Relationship[] {
    return this.relationships.filter(
      (r) => r.fromId === id && (!relationType || r.relationType === relationType),
    );
  }

  /** Child entities of `id` for a given relationType (e.g. "epic-of"). */
  children(id: string, relationType: string): Entity[] {
    return this.edgesFrom(id, relationType)
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((r) => this.entitiesById.get(r.toId))
      .filter((e): e is Entity => Boolean(e));
  }

  /** Goal links attached to a given entity, strongest first. */
  goalLinksFor(entityId: string): GoalLink[] {
    return this.goalLinks
      .filter((g) => g.entityId === entityId)
      .sort((a, b) => b.weight - a.weight);
  }

  /** All entities linked TO a given goal/priority id, strongest first. */
  goalLinksForGoal(goalId: string): GoalLink[] {
    return this.goalLinks
      .filter((g) => g.goalId === goalId)
      .sort((a, b) => b.weight - a.weight);
  }
}
