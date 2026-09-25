/**
 * Planning — shared ECS Entity model
 *
 * Pure types + zod schemas for the Entity System: Entity base, composable
 * Traits, single polymorphic Relationship edge, GoalLink, Work model + ViewMode,
 * the Entity Tile system (TileSpec), and the per-type registry.
 *
 * Consumed as source by 4eye-web-mockup (Command Center, planning tiles) and
 * the website Projects page.
 *
 * @packageDocumentation
 */

export * from "./entity";
export * from "./trait";
export * from "./relationship";
export * from "./goal-link";
export * from "./work";
export * from "./tile";
export * from "./registry";
export * from "./schemas";
