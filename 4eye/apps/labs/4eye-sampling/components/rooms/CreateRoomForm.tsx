'use client';

import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  CircularProgress,
} from '@mui/material';
import { CreateRoomInput } from '@4eye/core';

interface CreateRoomFormProps {
  formData: CreateRoomInput;
  validationErrors: Partial<Record<keyof CreateRoomInput, string>>;
  isSubmitting: boolean;
  onFieldChange: <K extends keyof CreateRoomInput>(field: K, value: CreateRoomInput[K]) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function CreateRoomForm({
  formData,
  validationErrors,
  isSubmitting,
  onFieldChange,
  onSubmit,
  onCancel,
}: CreateRoomFormProps) {
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
        value={formData.name}
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
        helperText="Optional: Briefly describe the purpose of this room"
        disabled={isSubmitting}
      />
      <Box sx={{ mt: 3 }}>
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
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            ml: 6,
            display: 'block'
          }}>
          Allow sessions to be recorded for later review
        </Typography>
      </Box>
      <Box sx={{ mt: 2 }}>
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
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            ml: 6,
            display: 'block'
          }}>
          Allow participants to chat during sessions
        </Typography>
      </Box>
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : 'Create Room'}
        </Button>
      </Box>
    </Box>
  );
}
