'use client'

import React from 'react'
import {
  Alert,
  Box,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { RoleCard } from './RoleCard'
import { ROLE_CONFIGS, RoleSelectorProps, UserRole } from '../../types/onboarding'

const EXPLANATION_TEXT =
  'Your role selection helps us optimize your experience. We\'ll personalize your dashboard, recommend relevant content, and enable features that matter most to you. You can select multiple roles if they apply.'

export function RoleSelector({
  selectedRoles,
  onChange,
  disabledRoles = [],
  showExplanation = true,
  error,
}: RoleSelectorProps) {
  const theme = useTheme()

  const handleRoleClick = (roleId: UserRole) => {
    const roleConfig = ROLE_CONFIGS.find((r) => r.id === roleId)
    if (roleConfig?.disabled || disabledRoles.includes(roleId)) {
      return
    }

    const isSelected = selectedRoles.includes(roleId)
    if (isSelected) {
      onChange(selectedRoles.filter((r) => r !== roleId))
    } else {
      onChange([...selectedRoles, roleId])
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          Select Your Role(s)
        </Typography>
        
        {showExplanation && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="flex-start"
            sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.02)',
            }}
          >
            <InfoOutlinedIcon
              sx={{
                color: theme.palette.info.main,
                fontSize: 20,
                mt: 0.25,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {EXPLANATION_TEXT}
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* Role Cards */}
      <Stack spacing={2}>
        {ROLE_CONFIGS.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            selected={selectedRoles.includes(role.id)}
            disabled={disabledRoles.includes(role.id)}
            onClick={() => handleRoleClick(role.id)}
          />
        ))}
      </Stack>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Selection summary */}
      {selectedRoles.length > 0 && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: 'center' }}
        >
          {selectedRoles.length} role{selectedRoles.length > 1 ? 's' : ''} selected
        </Typography>
      )}
    </Box>
  )
}
