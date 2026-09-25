import React from "react"

import { InputAdornment, Box, TextField, useTheme } from "@mui/material"
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk"

// Internationalization eventually needed, examples exist out there
export function PhoneNumberInput({ onChange, value, error, helperText }: any) {
  const theme = useTheme()
  const formatPhoneNumber = (v: any) => {
    // Added a utility function to expanse common for format phone number but it
    // doesn't format as you're typing like this one where it starts formatting at 4 digits
    // Likely will switch to a shared phone number input anyway
    if (!v) return v
    const phoneNumber = v.replace(/[^\d]/g, "")
    const phoneNumberLength = phoneNumber.length
    if (phoneNumberLength < 4) return phoneNumber
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const phoneNumber = event.target.value
      onChange(phoneNumber.replace(/[^\d]/g, ""))
    }
  }
  const fieldIcon = (
    <PhoneInTalkIcon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  )

  return (
    <TextField
      id="phone-number-input"
      type="tel"
      label="Phone number"
      aria-describedby="Phone number please"
      size="small"
      placeholder="(816) 314-0123"
      fullWidth
      required
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      variant="outlined"
      autoComplete="tel"
      error={error}
      helperText={helperText}
      InputProps={{
        // eslint-disable-next-line react/no-children-prop
        startAdornment: (
          <InputAdornment
            children={
              <Box height="18px" width="18px">
                {fieldIcon}
              </Box>
            }
            position="start"
          />
        ),
      }}
      value={formatPhoneNumber(value)}
      onChange={handleChange}
    />
  )
}
