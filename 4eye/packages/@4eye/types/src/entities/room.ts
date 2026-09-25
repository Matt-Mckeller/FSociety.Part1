/**
 * Room Entity
 * 
 * A room is a container for live sessions and recorded content.
 * Rooms are created by organizations and can be shared via invite codes.
 */

/**
 * Room entity representing a session container.
 * 
 * @example
 * ```typescript
 * const room: Room = {
 *   id: 'uuid',
 *   name: 'Sunday Service',
 *   inviteCode: 'ABCD1234',
 *   isActive: true,
 *   isRecordingEnabled: true,
 *   isChatEnabled: true,
 *   createdById: 'user-uuid',
 *   createdAt: '2024-01-01T00:00:00Z',
 *   updatedAt: '2024-01-01T00:00:00Z'
 * };
 * ```
 */
export interface Room {
  /** Unique identifier */
  id: string;
  /** Room display name */
  name: string;
  /** Optional description */
  description?: string;
  /** Invite code for joining (e.g., ABCD1234) */
  inviteCode: string;
  /** Organization ID if room belongs to an org */
  organizationId?: string;
  /** Whether recording is enabled for sessions */
  isRecordingEnabled: boolean;
  /** Whether chat is enabled during sessions */
  isChatEnabled: boolean;
  /** Whether room is active (can host sessions) */
  isActive: boolean;
  /** User ID who created the room */
  createdById: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
}
