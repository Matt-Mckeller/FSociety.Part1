'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import {
  MY_ROOMS_QUERY,
  ROOM_QUERY,
  ROOM_BY_INVITE_CODE_QUERY,
  CREATE_ROOM_MUTATION,
  UPDATE_ROOM_MUTATION,
  REGENERATE_INVITE_CODE_MUTATION,
  DELETE_ROOM_MUTATION,
} from './graphql';
import { Room, CreateRoomInput, UpdateRoomInput } from './types';

// State types
interface RoomsState {
  rooms: Room[];
  selectedRoom: Room | null;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
}

type RoomsAction =
  | { type: 'SET_ROOMS'; payload: Room[] }
  | { type: 'SET_SELECTED_ROOM'; payload: Room | null }
  | { type: 'ADD_ROOM'; payload: Room }
  | { type: 'UPDATE_ROOM'; payload: Room }
  | { type: 'REMOVE_ROOM'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'CLEAR_ERROR' };

const initialState: RoomsState = {
  rooms: [],
  selectedRoom: null,
  isLoading: false,
  error: null,
  isSubmitting: false,
};

function roomsReducer(state: RoomsState, action: RoomsAction): RoomsState {
  switch (action.type) {
    case 'SET_ROOMS':
      return { ...state, rooms: action.payload, isLoading: false };
    case 'SET_SELECTED_ROOM':
      return { ...state, selectedRoom: action.payload };
    case 'ADD_ROOM':
      return { ...state, rooms: [...state.rooms, action.payload] };
    case 'UPDATE_ROOM':
      return {
        ...state,
        rooms: state.rooms.map((r) => (r.id === action.payload.id ? action.payload : r)),
        selectedRoom: state.selectedRoom?.id === action.payload.id ? action.payload : state.selectedRoom,
      };
    case 'REMOVE_ROOM':
      return {
        ...state,
        rooms: state.rooms.filter((r) => r.id !== action.payload),
        selectedRoom: state.selectedRoom?.id === action.payload ? null : state.selectedRoom,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isSubmitting: false };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

// Context types
interface RoomsContextType {
  // State
  rooms: Room[];
  selectedRoom: Room | null;
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;

  // Actions
  createRoom: (input: CreateRoomInput) => Promise<Room>;
  updateRoom: (id: string, input: UpdateRoomInput) => Promise<Room>;
  deleteRoom: (id: string) => Promise<boolean>;
  regenerateInviteCode: (roomId: string) => Promise<Room>;
  selectRoom: (room: Room | null) => void;
  clearError: () => void;
  refetchRooms: () => void;
}

const RoomsContext = createContext<RoomsContextType | null>(null);

// Provider component
interface RoomsProviderProps {
  children: ReactNode;
}

export function RoomsProvider({ children }: RoomsProviderProps) {
  const [state, dispatch] = useReducer(roomsReducer, initialState);

  // Fetch rooms query
  const { refetch: refetchRoomsQuery } = useQuery<{ myRooms: Room[] }>(MY_ROOMS_QUERY, {
    onCompleted: (data) => {
      dispatch({ type: 'SET_ROOMS', payload: data.myRooms });
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    },
  });

  // Mutations
  const [createRoomMutation] = useMutation<{ createRoom: Room }>(CREATE_ROOM_MUTATION);
  const [updateRoomMutation] = useMutation<{ updateRoom: Room }>(UPDATE_ROOM_MUTATION);
  const [deleteRoomMutation] = useMutation<{ deleteRoom: boolean }>(DELETE_ROOM_MUTATION);
  const [regenerateCodeMutation] = useMutation<{ regenerateInviteCode: Room }>(REGENERATE_INVITE_CODE_MUTATION);

  // Action handlers
  const createRoom = useCallback(
    async (input: CreateRoomInput): Promise<Room> => {
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      try {
        const { data } = await createRoomMutation({
          variables: { input },
          refetchQueries: [{ query: MY_ROOMS_QUERY }],
        });

        if (!data?.createRoom) {
          throw new Error('Failed to create room');
        }

        dispatch({ type: 'ADD_ROOM', payload: data.createRoom });
        dispatch({ type: 'SET_SUBMITTING', payload: false });
        return data.createRoom;
      } catch (err) {
        const message = err instanceof ApolloError ? err.message : 'Failed to create room';
        dispatch({ type: 'SET_ERROR', payload: message });
        throw err;
      }
    },
    [createRoomMutation]
  );

  const updateRoom = useCallback(
    async (id: string, input: UpdateRoomInput): Promise<Room> => {
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      try {
        const { data } = await updateRoomMutation({
          variables: { id, input },
        });

        if (!data?.updateRoom) {
          throw new Error('Failed to update room');
        }

        dispatch({ type: 'UPDATE_ROOM', payload: data.updateRoom });
        dispatch({ type: 'SET_SUBMITTING', payload: false });
        return data.updateRoom;
      } catch (err) {
        const message = err instanceof ApolloError ? err.message : 'Failed to update room';
        dispatch({ type: 'SET_ERROR', payload: message });
        throw err;
      }
    },
    [updateRoomMutation]
  );

  const deleteRoom = useCallback(
    async (id: string): Promise<boolean> => {
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      try {
        const { data } = await deleteRoomMutation({
          variables: { id },
          refetchQueries: [{ query: MY_ROOMS_QUERY }],
        });

        if (data?.deleteRoom) {
          dispatch({ type: 'REMOVE_ROOM', payload: id });
        }

        dispatch({ type: 'SET_SUBMITTING', payload: false });
        return data?.deleteRoom ?? false;
      } catch (err) {
        const message = err instanceof ApolloError ? err.message : 'Failed to delete room';
        dispatch({ type: 'SET_ERROR', payload: message });
        throw err;
      }
    },
    [deleteRoomMutation]
  );

  const regenerateInviteCode = useCallback(
    async (roomId: string): Promise<Room> => {
      dispatch({ type: 'SET_SUBMITTING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });

      try {
        const { data } = await regenerateCodeMutation({
          variables: { roomId },
        });

        if (!data?.regenerateInviteCode) {
          throw new Error('Failed to regenerate invite code');
        }

        dispatch({ type: 'UPDATE_ROOM', payload: data.regenerateInviteCode });
        dispatch({ type: 'SET_SUBMITTING', payload: false });
        return data.regenerateInviteCode;
      } catch (err) {
        const message = err instanceof ApolloError ? err.message : 'Failed to regenerate code';
        dispatch({ type: 'SET_ERROR', payload: message });
        throw err;
      }
    },
    [regenerateCodeMutation]
  );

  const selectRoom = useCallback((room: Room | null) => {
    dispatch({ type: 'SET_SELECTED_ROOM', payload: room });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const refetchRooms = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    refetchRoomsQuery();
  }, [refetchRoomsQuery]);

  const value: RoomsContextType = {
    rooms: state.rooms,
    selectedRoom: state.selectedRoom,
    isLoading: state.isLoading,
    error: state.error,
    isSubmitting: state.isSubmitting,
    createRoom,
    updateRoom,
    deleteRoom,
    regenerateInviteCode,
    selectRoom,
    clearError,
    refetchRooms,
  };

  return <RoomsContext.Provider value={value}>{children}</RoomsContext.Provider>;
}

// Hook to use rooms context
export function useRooms(): RoomsContextType {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRooms must be used within a RoomsProvider');
  }
  return context;
}

// Hook for single room by ID (standalone, doesn't require provider)
export function useRoom(id: string) {
  const { data, loading, error, refetch } = useQuery<{ room: Room | null }>(ROOM_QUERY, {
    variables: { id },
    skip: !id,
  });

  return {
    room: data?.room ?? null,
    isLoading: loading,
    error: error?.message ?? null,
    refetch,
  };
}

// Hook for room by invite code (standalone, doesn't require provider)
export function useRoomByInviteCode(inviteCode: string) {
  const { data, loading, error } = useQuery<{ roomByInviteCode: Room | null }>(
    ROOM_BY_INVITE_CODE_QUERY,
    {
      variables: { inviteCode },
      skip: !inviteCode,
    }
  );

  return {
    room: data?.roomByInviteCode ?? null,
    isLoading: loading,
    error: error?.message ?? null,
  };
}
