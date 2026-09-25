export interface Room {
  id: string;
  name: string;
  description?: string;
  inviteCode: string;
  isRecordingEnabled: boolean;
  isChatEnabled: boolean;
  isActive: boolean;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomInput {
  name: string;
  description?: string;
  organizationId?: string;
  isRecordingEnabled?: boolean;
  isChatEnabled?: boolean;
}

export interface UpdateRoomInput {
  name?: string;
  description?: string;
  isRecordingEnabled?: boolean;
  isChatEnabled?: boolean;
  isActive?: boolean;
}
