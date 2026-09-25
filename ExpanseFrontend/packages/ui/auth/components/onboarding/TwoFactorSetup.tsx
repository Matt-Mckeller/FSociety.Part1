'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Link,
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { TwoFactorSetupProps } from '../../types/onboarding'

const CODE_LENGTH = 6
const RESEND_COOLDOWN = 60 // seconds
const MAX_ATTEMPTS = 3

export function TwoFactorSetup({
  email,
  onComplete,
  onResendCode,
  maxAttempts = MAX_ATTEMPTS,
  codeSent = false,
  loading = false,
  error: externalError,
}: TwoFactorSetupProps) {
  const theme = useTheme()
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [resendCooldown])

  // Auto-focus input
  useEffect(() => {
    if (codeSent && inputRef.current) {
      inputRef.current.focus()
    }
  }, [codeSent])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH)
    setCode(value)
    setError(null)
  }

  const handleVerify = async () => {
    if (code.length !== CODE_LENGTH) {
      setError(`Please enter all ${CODE_LENGTH} digits`)
      return
    }

    if (attempts >= maxAttempts) {
      setError('Too many attempts. Please request a new code.')
      return
    }

    setIsVerifying(true)
    
    // Simulate verification (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // For demo, accept any 6-digit code
    // In production, this would validate against the server
    const isValid = code.length === CODE_LENGTH

    if (isValid) {
      setIsVerified(true)
      setTimeout(() => onComplete(), 1000)
    } else {
      setAttempts(attempts + 1)
      setError(`Invalid code. ${maxAttempts - attempts - 1} attempts remaining.`)
    }
    
    setIsVerifying(false)
  }

  const handleResend = () => {
    if (resendCooldown > 0) return
    
    setCode('')
    setError(null)
    setAttempts(0)
    setResendCooldown(RESEND_COOLDOWN)
    
    if (onResendCode) {
      onResendCode()
    }
  }

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3')

  if (isVerified) {
    return (
      <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
        <Stack spacing={2} alignItems="center">
          <CheckCircleIcon
            sx={{
              fontSize: 64,
              color: theme.palette.success.main,
            }}
          />
          <Typography variant="h5" fontWeight={600}>
            Verified!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your email has been verified successfully.
          </Typography>
        </Stack>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={3}>
        {/* Header */}
        <Stack spacing={1} alignItems="center" textAlign="center">
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1,
            }}
          >
            <EmailIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Typography variant="h5" component="h2" fontWeight={600}>
            Verify Your Email
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We've sent a {CODE_LENGTH}-digit verification code to
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {maskedEmail}
          </Typography>
        </Stack>

        {/* Code Input */}
        <TextField
          inputRef={inputRef}
          value={code}
          onChange={handleCodeChange}
          placeholder="000000"
          disabled={loading || isVerifying || attempts >= maxAttempts}
          error={!!(error || externalError)}
          helperText={error || externalError}
          inputProps={{
            maxLength: CODE_LENGTH,
            style: {
              textAlign: 'center',
              fontSize: '1.5rem',
              letterSpacing: '0.5rem',
              fontWeight: 600,
            },
          }}
          fullWidth
        />

        {/* Verify Button */}
        <Button
          variant="contained"
          size="large"
          onClick={handleVerify}
          disabled={
            code.length !== CODE_LENGTH ||
            loading ||
            isVerifying ||
            attempts >= maxAttempts
          }
          fullWidth
          sx={{
            height: 48,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          {isVerifying ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Verify Code'
          )}
        </Button>

        {/* Resend */}
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Didn't receive the code?{' '}
          {resendCooldown > 0 ? (
            <span>Resend in {resendCooldown}s</span>
          ) : (
            <Link
              component="button"
              onClick={handleResend}
              sx={{ cursor: 'pointer', fontWeight: 500 }}
            >
              Resend code
            </Link>
          )}
        </Typography>

        {/* Lockout warning */}
        {attempts >= maxAttempts && (
          <Alert severity="error">
            Too many failed attempts. Please request a new verification code.
          </Alert>
        )}
      </Stack>
    </Box>
  )
}
