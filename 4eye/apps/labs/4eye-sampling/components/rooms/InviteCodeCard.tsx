'use client';

import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { ContentCopy, Refresh } from '@mui/icons-material';

interface InviteCodeCardProps {
  inviteCode: string;
  isSubmitting: boolean;
  showRegenerateButton: boolean;
  onRegenerateCode: () => void;
}

export function InviteCodeCard({
  inviteCode,
  isSubmitting,
  showRegenerateButton,
  onRegenerateCode,
}: InviteCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const inviteLink = typeof window !== 'undefined' ? `${window.location.origin}/join/${inviteCode}` : `/join/${inviteCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Invite Link
      </Typography>
      <TextField
        fullWidth
        value={inviteLink}
        sx={{ mb: 2 }}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy} edge="end">
                  <ContentCopy />
                </IconButton>
              </InputAdornment>
            ),
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" onClick={handleCopy} startIcon={<ContentCopy />}>
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
        {showRegenerateButton && (
          <Button
            variant="outlined"
            color="warning"
            onClick={onRegenerateCode}
            disabled={isSubmitting}
            startIcon={<Refresh />}
          >
            Regenerate Code
          </Button>
        )}
      </Box>
    </Paper>
  );
}
