/**
 * @four-eye/types — Shared TypeScript interfaces
 * 
 * This package contains all shared type definitions for the 4eye platform:
 * - Entity types (User, Room, Session, Transcript, etc.)
 * - Input types for mutations
 * - AI response types with JSDoc (for C8 typed AI responses)
 * 
 * @packageDocumentation
 */

// Domain entities
export * from './entities';

// Input types for mutations
export * from './inputs';

// AI response types (C8 — Typed AI Response System) + AI behavior settings
export * from './ai';

// Visual symbols (markers for entities)
export * from './symbols';

// Domain (top-level scope/lens)
export * from './domain';

// Selected chat input context shape
export * from './context';

// Goals + Projects
export * from './goals';

// Profile context (stub, expanded later)
export * from './profile';

// Targeting (Actor / Target role assignments)
export * from './targeting';

// Planning — shared ECS Entity model (Entity, Trait, Relationship, GoalLink,
// Work/ViewMode, TileSpec, registry) + zod schemas
export * from './planning';

