'use client'

import React, { useState, useMemo } from 'react'
import {
  Alert,
  Box,
  Stack,
  TextField,
  Typography,
  useTheme,
  Button,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import { AgeGateProps } from '../../types/onboarding'

const COPPA_AGE = 13
const MAX_AGE = 120
const MIN_YEAR = 1900

function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function AgeGate({
  onVerified,
  minAge = 0,
  showCOPPANotice = true,
  error: externalError,
}: AgeGateProps) {
  const theme = useTheme()
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showMinorNotice, setShowMinorNotice] = useState(false)

  const age = useMemo(() => {
    if (!dateOfBirth) return null
    return calculateAge(dateOfBirth.toDate())
  }, [dateOfBirth])

  const isMinor = age !== null && age < COPPA_AGE
  const isTooYoung = age !== null && age < minAge
  const isValidAge = age !== null && age >= 0 && age <= MAX_AGE

  const handleDateChange = (newDate: Dayjs | null) => {
    setDateOfBirth(newDate)
    setError(null)
    setShowMinorNotice(false)

    if (newDate) {
      const calculatedAge = calculateAge(newDate.toDate())
      if (calculatedAge < 0 || calculatedAge > MAX_AGE) {
        setError('Please enter a valid date of birth')
      } else if (calculatedAge < COPPA_AGE && showCOPPANotice) {
        setShowMinorNotice(true)
      }
    }
  }

  const handleContinue = () => {
    if (!dateOfBirth) {
      setError('Date of birth is required')
      return
    }

    if (!isValidAge) {
      setError('Please enter a valid date of birth')
      return
    }

    if (isTooYoung) {
      setError(`You must be at least ${minAge} years old to create an account`)
      return
    }

    onVerified(isMinor, dateOfBirth.toDate())
  }

  const maxDate = dayjs()
  const minDate = dayjs().year(MIN_YEAR).month(0).date(1)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={3}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h5" component="h2" fontWeight={600}>
              When were you born?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We need this to personalize your experience and ensure compliance with privacy regulations.
            </Typography>
          </Stack>

          {/* Date Picker */}
          <DatePicker
            label="Date of Birth"
            value={dateOfBirth}
            onChange={handleDateChange}
            maxDate={maxDate}
            minDate={minDate}
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!(error || externalError),
                helperText: error || externalError,
              },
            }}
          />

          {/* Age display */}
          {age !== null && isValidAge && (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Age: {age} years old
            </Typography>
          )}

          {/* COPPA Notice for minors */}
          {showMinorNotice && showCOPPANotice && (
            <Alert
              severity="warning"
              icon={<WarningAmberIcon />}
              sx={{
                '& .MuiAlert-icon': {
                  color: theme.palette.warning.main,
                },
              }}
            >
              <Typography variant="body2" fontWeight={500} gutterBottom>
                Parental Consent Required
              </Typography>
              <Typography variant="body2">
                Because you're under 13, we need permission from your parent or guardian 
                before you can create an account. We'll send them an email to verify.
              </Typography>
            </Alert>
          )}

          {/* Continue button */}
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            disabled={!dateOfBirth || !isValidAge || isTooYoung}
            fullWidth
            sx={{
              height: 48,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Continue
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  )
}
