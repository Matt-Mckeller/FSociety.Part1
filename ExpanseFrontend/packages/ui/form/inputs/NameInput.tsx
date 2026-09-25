import React from "react"
import Person2Icon from "@mui/icons-material/Person2"
import { InputAdornment, Box, TextField, useTheme } from "@mui/material"

export function NameInput({
  onChange,
  value,
  error,
  helperText,
  autofocus,
}: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  const theme = useTheme()
  const fieldIcon = (
    <Person2Icon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  )

  return (
    <TextField
      id="full-name-input"
      label="Full Name"
      size="small"
      aria-describedby="Full name input"
      placeholder="Linx Xpander"
      autoFocus={autofocus || false}
      required
      fullWidth
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      variant="outlined"
      autoComplete="name"
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
