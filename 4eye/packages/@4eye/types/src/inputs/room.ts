/**
 * Room Input Types
 * 
 * Input types for room mutations.
 */

/**
 * Input for creating a room.
 */
export interface CreateRoomInput {
  /** Room name */
  name: string;
  /** Optional description */
  description?: string;
  /** Organization ID if room belongs to an org */
  organizationId?: string;
  /** Enable recording for sessions */
  isRecordingEnabled?: boolean;
  /** Enable chat during sessions */
  isChatEnabled?: boolean;
}

/**
 * Input for updating a room.
 */
export interface UpdateRoomInput {
  /** Room name */
  name?: string;
  /** Optional description */
  description?: string;
  /** Enable recording for sessions */
  isRecordingEnabled?: boolean;
  /** Enable chat during sessions */
  isChatEnabled?: boolean;
  /** Room active status */
  isActive?: boolean;
}
