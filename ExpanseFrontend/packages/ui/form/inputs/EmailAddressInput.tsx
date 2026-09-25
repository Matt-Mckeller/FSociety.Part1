import React from "react"

import { InputAdornment, Box, TextField, Theme, useTheme } from "@mui/material"

import EmailIcon from "@mui/icons-material/Email"

export function EmailAddressInput({
  onChange,
  value,
  error,
  helperText,
  autoFocus,
  placeholder,
}: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  const theme = useTheme()
  const fieldIcon = (
    <EmailIcon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  )

  return (
    <TextField
      id="email-address-input"
      label="Email Address"
      type="email"
      aria-describedby="Email address input"
      size="small"
      // placeholder={placeholder || 'mmo@expanseservices.com'}
      placeholder={placeholder || "mmo@gmail.com"}
      required
      fullWidth
      autoFocus={autoFocus || false}
      // color={theme.palette.mode === 'dark' ? 'info' : 'primary'}
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      variant="outlined"
      autoComplete="email"
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
      value={value}
      onChange={handleChange}
    />
  )
}
