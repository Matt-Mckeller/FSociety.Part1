'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useRooms } from './context';
import { CreateRoomInput, UpdateRoomInput, Room } from './types';

// Default values for create room form
const defaultCreateRoomValues: CreateRoomInput = {
  name: '',
  description: '',
  isRecordingEnabled: true,
  isChatEnabled: true,
};

// Hook for create room form state and actions
export function useCreateRoomForm() {
  const router = useRouter();
  const { createRoom, isSubmitting, error, clearError } = useRooms();
  const [formData, setFormData] = useState<CreateRoomInput>(defaultCreateRoomValues);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof CreateRoomInput, string>>>({});

  const updateField = useCallback(<K extends keyof CreateRoomInput>(
    field: K,
    value: CreateRoomInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [validationErrors]);

  const validate = useCallback((): boolean => {
    const errors: Partial<Record<keyof CreateRoomInput, string>> = {};

    if (!formData.name || formData.name.trim().length < 3) {
      errors.name = 'Room name must be at least 3 characters';
    }
    if (formData.name && formData.name.length > 100) {
      errors.name = 'Room name is too long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const submit = useCallback(async (): Promise<Room | null> => {
    clearError();

    if (!validate()) {
      return null;
    }

    try {
      const room = await createRoom({
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
        isRecordingEnabled: formData.isRecordingEnabled,
        isChatEnabled: formData.isChatEnabled,
      });
      router.push(`/rooms/${room.id}`);
      return room;
    } catch {
      return null;
    }
  }, [createRoom, formData, validate, router, clearError]);

  const reset = useCallback(() => {
    setFormData(defaultCreateRoomValues);
    setValidationErrors({});
    clearError();
  }, [clearError]);

  const cancel = useCallback(() => {
    reset();
    router.push('/rooms');
  }, [reset, router]);

  return {
    formData,
    updateField,
    validationErrors,
    isSubmitting,
    error,
    submit,
    reset,
    cancel,
  };
}

// Hook for update room form state and actions
export function useUpdateRoomForm(room: Room | undefined) {
  const { updateRoom, regenerateInviteCode, deleteRoom, isSubmitting, error, clearError } = useRooms();
  const router = useRouter();

  const [formData, setFormData] = useState<UpdateRoomInput>({
    name: room?.name ?? '',
    description: room?.description ?? '',
    isRecordingEnabled: room?.isRecordingEnabled ?? true,
    isChatEnabled: room?.isChatEnabled ?? true,
    isActive: room?.isActive ?? true,
  });

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof UpdateRoomInput, string>>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const clearMessages = useCallback(() => {
    clearError();
    setSuccess(null);
  }, [clearError]);

  const updateField = useCallback(<K extends keyof UpdateRoomInput>(
    field: K,
    value: UpdateRoomInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [validationErrors]);

  const validate = useCallback((): boolean => {
    const errors: Partial<Record<keyof UpdateRoomInput, string>> = {};

    if (formData.name !== undefined && formData.name.trim().length < 3) {
      errors.name = 'Room name must be at least 3 characters';
    }
    if (formData.name && formData.name.length > 100) {
      errors.name = 'Room name is too long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const submit = useCallback(async (): Promise<Room | null> => {
    if (!room) return null;
    clearMessages();

    if (!validate()) {
      return null;
    }

    try {
      const updatedRoom = await updateRoom(room.id, {
        name: formData.name?.trim(),
        description: formData.description?.trim(),
        isRecordingEnabled: formData.isRecordingEnabled,
        isChatEnabled: formData.isChatEnabled,
        isActive: formData.isActive,
      });
      setIsDirty(false);
      setSuccess('Room updated successfully');
      return updatedRoom;
    } catch {
      return null;
    }
  }, [room, updateRoom, formData, validate, clearMessages]);

  const handleRegenerateCode = useCallback(async (): Promise<Room | null> => {
    if (!room) return null;
    clearMessages();

    try {
      const updatedRoom = await regenerateInviteCode(room.id);
      setSuccess('Invite code regenerated');
      return updatedRoom;
    } catch {
      return null;
    }
  }, [room, regenerateInviteCode, clearMessages]);

  const handleDelete = useCallback(async (): Promise<boolean> => {
    if (!room) return false;
    clearMessages();

    try {
      const result = await deleteRoom(room.id);
      return result;
    } catch {
      return false;
    }
  }, [room, deleteRoom, clearMessages]);

  const resetForm = useCallback(() => {
    if (room) {
      setFormData({
        name: room.name,
        description: room.description ?? '',
        isRecordingEnabled: room.isRecordingEnabled,
        isChatEnabled: room.isChatEnabled,
        isActive: room.isActive,
      });
      setIsDirty(false);
    }
    setValidationErrors({});
    clearMessages();
  }, [room, clearMessages]);

  // Sync form data when room changes
  const syncWithRoom = useCallback((newRoom: Room) => {
    setFormData({
      name: newRoom.name,
      description: newRoom.description ?? '',
      isRecordingEnabled: newRoom.isRecordingEnabled,
      isChatEnabled: newRoom.isChatEnabled,
      isActive: newRoom.isActive,
    });
    setIsDirty(false);
  }, []);

  return {
    formData,
    updateField,
    validationErrors,
    isDirty,
    isSubmitting,
    error,
    success,
    submit,
    resetForm,
    syncWithRoom,
    handleRegenerateCode,
    handleDelete,
    clearMessages,
  };
}
