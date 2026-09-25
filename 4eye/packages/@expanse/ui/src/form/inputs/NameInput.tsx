'use client';

import React from 'react';
import { TextField, InputAdornment, Box, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export interface NameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string | null;
  autoFocus?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function NameInput({
  value,
  onChange,
  error,
  helperText,
  autoFocus,
  label = 'Full Name',
  placeholder = 'John Doe',
  disabled = false,
  required = true,
}: NameInputProps) {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      id="name-input"
      label={label}
      type="text"
      size="small"
      placeholder={placeholder}
      required={required}
      fullWidth
      autoFocus={autoFocus}
      disabled={disabled}
      variant="outlined"
      autoComplete="name"
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
              <PersonIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
            </Box>
          </InputAdornment>
        ),
        },
      }}
    />
  );
}
