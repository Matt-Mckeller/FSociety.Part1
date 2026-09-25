'use client';

import { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface DangerZoneProps {
  roomName: string;
  isSubmitting: boolean;
  onDelete: () => void;
}

export function DangerZone({ roomName, isSubmitting, onDelete }: DangerZoneProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setDialogOpen(false);
  };

  return (
    <>
      <Paper sx={{ p: 3, border: '1px solid', borderColor: 'error.main' }}>
        <Typography variant="h6" color="error" gutterBottom>
          Danger Zone
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 2
          }}>
          Deleting a room is permanent. All sessions and recordings will be lost.
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => setDialogOpen(true)}
          disabled={isSubmitting}
        >
          Delete Room
        </Button>
      </Paper>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete Room?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete &quot;{roomName}&quot;? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
