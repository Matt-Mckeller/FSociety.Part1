/**
 * Rooms GraphQL Mutations
 * 
 * @module core/api/rooms
 */

import { gql } from '@apollo/client';

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
