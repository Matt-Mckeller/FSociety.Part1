'use client';

import React from 'react';
import { TextField, InputAdornment, Box, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string | null;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function EmailInput({
  value,
  onChange,
  error,
  helperText,
  autoFocus = false,
  placeholder = 'you@example.com',
  disabled = false,
}: EmailInputProps) {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      id="email-input"
      label="Email Address"
      type="email"
      size="small"
      placeholder={placeholder}
      required
      fullWidth
      autoFocus={autoFocus}
      disabled={disabled}
      variant="outlined"
      autoComplete="email"
      error={error}
      helperText={helperText}
      value={value}
      onChange={handleChange}
      slotProps={{
        input: {
        startAdornment: (
          <InputAdornment position="start">
            <Box
              sx={{
                height: "18px",
                width: "18px",
                display: "flex",
                alignItems: "center"
              }}>
              <EmailIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
            </Box>
          </InputAdornment>
        ),
        },
      }}
    />
  );
}
