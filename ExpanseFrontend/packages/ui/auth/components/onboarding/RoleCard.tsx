'use client'

import React from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme,
  alpha,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { RoleCardProps } from '../../types/onboarding'

export function RoleCard({
  role,
  selected = false,
  disabled = false,
  onClick,
}: RoleCardProps) {
  const theme = useTheme()
  const isDisabled = disabled || role.disabled

  const handleClick = () => {
    if (!isDisabled && onClick) {
      onClick()
    }
  }

  return (
    <Card
      sx={{
        position: 'relative',
        border: 2,
        borderColor: selected
          ? theme.palette.primary.main
          : theme.palette.divider,
        backgroundColor: isDisabled
          ? alpha(theme.palette.action.disabled, 0.1)
          : selected
          ? alpha(theme.palette.primary.main, 0.05)
          : theme.palette.background.paper,
        opacity: isDisabled ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
        '&:hover': !isDisabled
          ? {
              borderColor: theme.palette.primary.main,
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[4],
            }
          : {},
      }}
    >
      <CardActionArea
        onClick={handleClick}
        disabled={isDisabled}
        sx={{ height: '100%' }}
      >
        <CardContent sx={{ p: 2.5 }}>
          <Stack spacing={1.5}>
            {/* Header with icon and badges */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ lineHeight: 1 }}
                >
                  {role.icon}
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: isDisabled
                      ? theme.palette.text.disabled
                      : theme.palette.text.primary,
                  }}
                >
                  {role.title}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                {role.comingSoon && (
                  <Chip
                    label="Coming Soon"
                    size="small"
                    sx={{
                      backgroundColor: alpha(theme.palette.warning.main, 0.2),
                      color: theme.palette.warning.dark,
                      fontWeight: 500,
                      fontSize: '0.7rem',
                    }}
                  />
                )}
                {selected && (
                  <CheckCircleIcon
                    sx={{
                      color: theme.palette.primary.main,
                      fontSize: 24,
                    }}
                  />
                )}
              </Stack>
            </Stack>

            {/* Description */}
            <Typography
              variant="body2"
              color={isDisabled ? 'text.disabled' : 'text.secondary'}
            >
              {role.description}
            </Typography>

            {/* Features */}
            <Stack direction="row" flexWrap="wrap" gap={0.75}>
              {role.features.slice(0, 4).map((feature) => (
                <Chip
                  key={feature}
                  label={feature}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.7rem',
                    height: 24,
                    borderColor: isDisabled
                      ? theme.palette.action.disabled
                      : theme.palette.divider,
                    color: isDisabled
                      ? theme.palette.text.disabled
                      : theme.palette.text.secondary,
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
