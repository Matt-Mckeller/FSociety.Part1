'use client';

import React, { useState } from 'react';
import { TextField, InputAdornment, Box, IconButton, Typography, useTheme } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

export interface PasswordRequirement {
  key: string;
  label: string;
  test: (value: string) => boolean;
}

export const defaultPasswordRequirements: PasswordRequirement[] = [
  { key: 'length', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { key: 'uppercase', label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { key: 'lowercase', label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { key: 'number', label: 'One number', test: (v) => /[0-9]/.test(v) },
];

export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helperText?: string | null;
  showRequirements?: boolean;
  requirements?: PasswordRequirement[];
  autoComplete?: 'current-password' | 'new-password';
  label?: string;
  disabled?: boolean;
}

function PasswordRequirementsDisplay({ 
  value, 
  requirements 
}: { 
  value: string; 
  requirements: PasswordRequirement[];
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
      {requirements.map((req) => {
        const passes = req.test(value);
        return (
          <Box key={req.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {passes ? (
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 16 }} />
            ) : (
              <InfoIcon sx={{ color: 'text.disabled', fontSize: 16 }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '12px',
                color: passes ? 'text.primary' : 'text.secondary',
              }}
            >
              {req.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export function PasswordInput({
  value,
  onChange,
  error,
  helperText,
  showRequirements = false,
  requirements = defaultPasswordRequirements,
  autoComplete = 'current-password',
  label = 'Password',
  disabled = false,
}: PasswordInputProps) {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleToggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const shouldShowRequirements = showRequirements && (isFocused || (error && value.length > 0));

  return (
    <Box>
      <TextField
        id="password-input"
        label={label}
        type={showPassword ? 'text' : 'password'}
        size="small"
        placeholder="••••••••"
        required
        fullWidth
        disabled={disabled}
        variant="outlined"
        autoComplete={autoComplete}
        error={error}
        helperText={!showRequirements ? helperText : undefined}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
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
                <LockIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleVisibility}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
          },
        }}
      />
      {shouldShowRequirements && (
        <PasswordRequirementsDisplay value={value} requirements={requirements} />
      )}
    </Box>
  );
}
