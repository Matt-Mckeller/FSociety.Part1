'use client';

import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  CircularProgress,
} from '@mui/material';
import { UpdateRoomInput } from '@4eye/core';

interface RoomSettingsFormProps {
  formData: UpdateRoomInput;
  validationErrors: Partial<Record<keyof UpdateRoomInput, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
  onFieldChange: <K extends keyof UpdateRoomInput>(field: K, value: UpdateRoomInput[K]) => void;
  onSubmit: () => void;
}

export function RoomSettingsForm({
  formData,
  validationErrors,
  isSubmitting,
  isDirty,
  onFieldChange,
  onSubmit,
}: RoomSettingsFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Room Name"
        margin="normal"
        value={formData.name || ''}
        onChange={(e) => onFieldChange('name', e.target.value)}
        error={!!validationErrors.name}
        helperText={validationErrors.name}
        disabled={isSubmitting}
      />

      <TextField
        fullWidth
        label="Description"
        margin="normal"
        multiline
        rows={3}
        value={formData.description || ''}
        onChange={(e) => onFieldChange('description', e.target.value)}
        disabled={isSubmitting}
      />

      <Divider sx={{ my: 3 }} />

      <FormControlLabel
        control={
          <Switch
            checked={formData.isRecordingEnabled ?? true}
            onChange={(e) => onFieldChange('isRecordingEnabled', e.target.checked)}
            disabled={isSubmitting}
          />
        }
        label="Enable Recording"
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.isChatEnabled ?? true}
            onChange={(e) => onFieldChange('isChatEnabled', e.target.checked)}
            disabled={isSubmitting}
          />
        }
        label="Enable Chat"
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.isActive ?? true}
            onChange={(e) => onFieldChange('isActive', e.target.checked)}
            disabled={isSubmitting}
          />
        }
        label="Room Active"
      />

      <Box sx={{ mt: 3 }}>
        <Button type="submit" variant="contained" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Save Changes'}
        </Button>
      </Box>
    </Box>
  );
}
