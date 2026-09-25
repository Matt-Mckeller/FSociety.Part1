/**
 * Sessions Module
 * 
 * Session domain logic, hooks, and GraphQL operations for 4eye.
 */

// GraphQL operations
export {
  // Fragments
  TRANSCRIPT_SEGMENT_FRAGMENT,
  TRANSCRIPT_FRAGMENT,
  TRANSCRIPT_WITH_SEGMENTS_FRAGMENT,
  // Queries
  TRANSCRIPT_BY_SESSION_QUERY,
  TRANSCRIPT_QUERY,
  TRANSCRIPT_FULL_TEXT_QUERY,
  // Mutations
  CREATE_TRANSCRIPT_MUTATION,
  ADD_TRANSCRIPT_SEGMENT_MUTATION,
  DELETE_TRANSCRIPT_MUTATION,
  // Subscriptions
  TRANSCRIPT_SEGMENT_ADDED_SUBSCRIPTION,
  TRANSCRIPT_COMPLETED_SUBSCRIPTION,
} from './graphql';

// Hooks
export * from './hooks';

// Types
export type * from './types';
