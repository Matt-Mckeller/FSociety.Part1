import { gql } from '@apollo/client';

// Queries
export const MY_ROOMS_QUERY = gql`
  query MyRooms {
    myRooms {
      id
      name
      description
      inviteCode
      isRecordingEnabled
      isChatEnabled
      isActive
      createdAt
    }
  }
`;

export const ROOM_QUERY = gql`
  query Room($id: String!) {
    room(id: $id) {
      id
      name
      description
      inviteCode
      isRecordingEnabled
      isChatEnabled
      isActive
      createdById
      createdAt
      updatedAt
    }
  }
`;

export const ROOM_BY_INVITE_CODE_QUERY = gql`
  query RoomByInviteCode($inviteCode: String!) {
    roomByInviteCode(inviteCode: $inviteCode) {
      id
      name
      description
      isActive
    }
  }
`;

// Mutations
export const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      id
      name
      description
      inviteCode
      isRecordingEnabled
      isChatEnabled
      isActive
      createdAt
    }
  }
`;

export const UPDATE_ROOM_MUTATION = gql`
  mutation UpdateRoom($id: String!, $input: UpdateRoomInput!) {
    updateRoom(id: $id, input: $input) {
      id
      name
      description
      isRecordingEnabled
      isChatEnabled
      isActive
      updatedAt
    }
  }
`;

export const REGENERATE_INVITE_CODE_MUTATION = gql`
  mutation RegenerateInviteCode($roomId: String!) {
    regenerateInviteCode(roomId: $roomId) {
      id
      inviteCode
    }
  }
`;

export const DELETE_ROOM_MUTATION = gql`
  mutation DeleteRoom($id: String!) {
    deleteRoom(id: $id)
  }
`;
