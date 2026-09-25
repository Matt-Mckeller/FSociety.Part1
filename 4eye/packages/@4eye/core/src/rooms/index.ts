/**
 * Rooms Module
 * 
 * Room domain logic, context, and hooks for 4eye.
 */

// Room context and provider
export { RoomsProvider, useRooms, useRoom, useRoomByInviteCode } from './context';

// GraphQL operations
export {
  MY_ROOMS_QUERY,
  ROOM_QUERY,
  ROOM_BY_INVITE_CODE_QUERY,
  CREATE_ROOM_MUTATION,
  UPDATE_ROOM_MUTATION,
  REGENERATE_INVITE_CODE_MUTATION,
  DELETE_ROOM_MUTATION,
} from './graphql';

// Form hooks
export { useCreateRoomForm, useUpdateRoomForm } from './hooks';

// Types
export type { Room, CreateRoomInput, UpdateRoomInput } from './types';
