/**
 * Rooms GraphQL Queries
 * 
 * @module core/api/rooms
 */

import { gql } from '@apollo/client';

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
